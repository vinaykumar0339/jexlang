//
//  JexEvaluator.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

// MARK: - Evaluator
public class JexEvaluator {

    private var context: [String: JexValue] = [:]
    private var funcsMap: [String: FuncImpl] = [:]
    private var transformMap: [String: TransformImpl] = [:]
    
    private var globalScope: Scope = createGlobalScope()
    
    private lazy var evalVisitor: EvalVisitor = {
        let evaluatorContext = EvaluatorContext(jexEvaluator: self)
        return EvalVisitor(
            scope: globalScope,
            ctx: evaluatorContext,
            funcsMap: self.funcsMap,
            transformsMap: self.transformMap
        )
    }()
    
    private func convertContextToJexValue(context: [String: AnyObject]) -> [String: JexValue] {
        var jexContext: [String: JexValue] = [:]
        if (!context.isEmpty) {
            for (key, value) in context {
                jexContext[key] = JexValueFactory.from(value)
            }
        }
        return jexContext;
    }
    
    private func convertJexValueToAnyObject(jexValueMap: [String: JexValue]) -> [String: AnyObject] {
        var context: [String: AnyObject] = [:]
        for (key, value) in jexValueMap {
            context[key] = value.toObject() as AnyObject
        }
        return context
    }
    
    private func addAllContextValuesIntoGlobalScope(context: [String: JexValue]) throws {
        for (key, value) in context {
            try globalScope.declareVariable(key, value: value, isConst: false)
        }
    }
    
    private var cacheParsedTrees: [String: JexLangParser.ProgramContext] = [:]
    private var cacheExpressions: Bool = false
    
    // Holding strong references. If we put this as local variable inside parseExpression. then after completing the function (outside function) self instance is deallocating.
    private var lexer: JexLangLexer!
    private var tokens: CommonTokenStream!
    private var parser: JexLangParser!

    public init(
        context initialContext: [String: AnyObject]? = nil,
        funcsMap initialFuncs: [String: FuncImpl]? = nil,
        transformMap initialTransforms: [String: TransformImpl]? = nil
    ) throws {

        if let initialContext = initialContext {
            self.context = convertContextToJexValue(context: initialContext)
        }

        if let initialFuncs = initialFuncs {
            self.funcsMap = initialFuncs
        }

        if let initialTransforms = initialTransforms {
            self.transformMap = initialTransforms
        }

        try self.addAllContextValuesIntoGlobalScope(context: self.context)

        let evaluatorContext = EvaluatorContext(jexEvaluator: self)
        self.evalVisitor = EvalVisitor(
            scope: globalScope,
            ctx: evaluatorContext,
            funcsMap: self.funcsMap,
            transformsMap: self.transformMap
        )
    }


    // MARK: - Parse (with caching)
    private func parseExpression(expr: String) throws -> JexLangParser.ProgramContext {
        if cacheExpressions, let cached = cacheParsedTrees[expr] {
            return cached
        }
        
        let input = ANTLRInputStream(expr)
        self.lexer = JexLangLexer(input)
        self.tokens = CommonTokenStream(lexer)
        self.parser = try JexLangParser(tokens)
        let errorListener = JexLangErrorListener()

        // --- Error handling setup ---
        lexer.removeErrorListeners()
        parser.removeErrorListeners()

        lexer.addErrorListener(errorListener)
        parser.addErrorListener(errorListener)
        errorListener.clear()

        // --- Parse ---
        let tree = try parser.program()

        // --- Validate syntax errors ---
        if errorListener.hasErrors() {
            throw errorListener.getSyntaxErrors()[0]
        }

        if cacheExpressions {
            cacheParsedTrees[expr] = tree
        }

        return tree
    }

    // MARK: - Evaluate
    public func evaluate(
        expr: String,
        programScopeVariables: [String: Any]? = nil
    ) throws -> AnyObject? {
        return try catchNSException {
            let programContext = try self.parseExpression(expr: expr)

            // Evaluate using the retained parser context
            let value = self.evalVisitor.visit(programContext)

            return value.toObject()
        }
    }
    
    public func setCacheExpressions(_ cacheExpressions: Bool) {
        self.cacheExpressions = cacheExpressions
    }
    
    public func getCacheExpressions() -> Bool {
        return self.cacheExpressions
    }
    
    public func setContextValue(_ key: String, _ value: AnyObject) throws {
        let jexValue = JexValueFactory.from(value)
        self.context[key] = jexValue
        try self.globalScope.assignVariable(key, value: jexValue)
    }
    
    public func setContextValue(_ key: String, _ value: JexValue) throws {
        self.context[key] = value
        try self.globalScope.assignVariable(key, value: value)
    }
    
    public func declareGlobalVariable(_ key: String, value: AnyObject, isConst: Bool = false) throws -> JexValue {
        let jexValue = JexValueFactory.from(value)
        self.context[key] = jexValue
        try self.globalScope.assignVariable(key, value: jexValue)
        return jexValue
    }
    
    public func declareGlobalVariable(_ key: String, value: JexValue, isConst: Bool = false) throws -> JexValue {
        self.context[key] = value
        try self.globalScope.assignVariable(key, value: value)
        return value
    }
    
    public func setContextOrDeclareContextValue(
        _ key: String,
        _ value: AnyObject,
        isConst: Bool = false
    ) throws -> JexValue {
        let jexValue = JexValueFactory.from(value)
        self.context[key] = jexValue
        if (self.globalScope.hasVariable(key)) {
            try self.globalScope.assignVariable(key, value: jexValue)
        } else {
            try self.globalScope.declareVariable(key, value: jexValue, isConst: isConst)
        }
        return jexValue
    }
    
    public func resetContext() throws {
        self.context.removeAll()
        self.globalScope = createGlobalScope()
        try addAllContextValuesIntoGlobalScope(context: self.context)
        self.evalVisitor = EvalVisitor(
            scope: self.globalScope,
            ctx: EvaluatorContext(jexEvaluator: self),
            funcsMap: self.funcsMap,
            transformsMap: self.transformMap
        )
    }
    
    public func resetFunctions() {
        self.funcsMap.removeAll()
        self.evalVisitor = EvalVisitor(
            scope: self.globalScope,
            ctx: EvaluatorContext(jexEvaluator: self),
            funcsMap: self.funcsMap,
            transformsMap: self.transformMap
        )
    }
    
    public func resetTransforms() {
        self.transformMap.removeAll()
        self.evalVisitor = EvalVisitor(
            scope: self.globalScope,
            ctx: EvaluatorContext(jexEvaluator: self),
            funcsMap: self.funcsMap,
            transformsMap: self.transformMap
        )
    }
    
    public func getContextValue(_ name: String) -> AnyObject? {
        let jexValue = self.context[name] ?? nil
        if let jexValue = jexValue {
            return jexValue.toObject()
        }
        return nil
    }
    
    public func getContextValue(_ name: String, _ asJexValue: Bool) -> JexValue? {
        let jexValue = self.context[name] ?? nil
        if let jexValue = jexValue {
            return jexValue
        }
        return nil
    }
    
    public func getGlobalScopeVariables() -> [String: AnyObject] {
        guard let globalVariables = self.evalVisitor.getGlobalScopeVariables() else {
            return [:]
        }
        return self.convertJexValueToAnyObject(jexValueMap: globalVariables)
    }
    
    public func addFunction(
        name: String,
        function: @escaping FuncImpl
    ) {
        funcsMap[name] = function
        evalVisitor.addFunction(name: name, fn: function)
    }
    
    public func getAllFunctions() -> [String: FuncImpl]{
        return self.evalVisitor.getAllFunctions()
    }
    
    public func hasFunction(name: String) -> Bool {
        return self.evalVisitor.hasFunction(name)
    }
    
    public func addTransform(
        name: String,
        transform: @escaping TransformImpl
    ) {
        transformMap[name] = transform
        evalVisitor.addTransform(name: name, transform: transform)
    }
    
    public func getAllTransforms() -> [String: TransformImpl] {
        return self.evalVisitor.getAllTransforms()
    }
    
    public func hasTransform(name: String) -> Bool {
        return self.evalVisitor.hasTransform(name)
    }
    
    public func addFunctions(functions: [String: FuncImpl]) {
        for (name, function) in functions {
            self.addFunction(name: name, function: function)
        }
    }
    
    public func addTransforms(transforms: [String: TransformImpl]) {
        for (name, transform) in transforms {
            self.addTransform(name: name, transform: transform)
        }
    }
    
    public func clearCachedParsedExpression() {
        self.cacheParsedTrees.removeAll()
    }
}


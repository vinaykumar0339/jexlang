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
    
    private func convertContextToJexValue(context: [String: Any]) -> [String: JexValue] {
        var jexContext: [String: JexValue] = [:]
        if (!context.isEmpty) {
            for (key, value) in context {
                jexContext[key] = JexValueFactory.from(value)
            }
        }
        return jexContext;
    }
    
    private func convertJexValueToAny(jexValueMap: [String: JexValue]) -> [String: Any] {
        var context: [String: Any] = [:]
        for (key, value) in jexValueMap {
            context[key] = value.toObject()
        }
        return context
    }
    
    private func addAllContextValuesIntoGlobalScope(context: [String: JexValue]) throws {
        for (key, value) in context {
            globalScope.declareVariable(key, value: value, isConst: false)
        }
    }
    
    private var cacheParsedTrees: [String: JexLangParser.ProgramContext] = [:]
    private var cacheExpressions: Bool = false
    
    // Holding strong references. If we put this as local variable inside parseExpression. then after completing the function (outside function) self instance is deallocating.
    private var lexer: JexLangLexer!
    private var tokens: CommonTokenStream!
    private var parser: JexLangParser!

    public init(
        context initialContext: [String: Any]? = nil,
        funcsMap initialFuncs: [String: FuncImpl]? = nil,
        transformMap initialTransforms: [String: TransformImpl]? = nil
    ) throws {

        try catchNSException { [weak self] in
            guard let self = self else { return }
            if let initialContext = initialContext {
                self.context = self.convertContextToJexValue(context: initialContext)
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
                scope: self.globalScope,
                ctx: evaluatorContext,
                funcsMap: self.funcsMap,
                transformsMap: self.transformMap
            )
        }
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
    ) throws -> Any {
        return try catchNSException {
            let programContext = try self.parseExpression(expr: expr)
            if let programScopeVariables = programScopeVariables {
                self.evalVisitor.setProgramScopeContext(context: programScopeVariables)
            }
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
    
    public func setContextValue(_ key: String, _ value: Any) throws {
        return try catchNSException {
            let jexValue = JexValueFactory.from(value)
            self.context[key] = jexValue
            self.globalScope.assignVariable(key, value: jexValue)
        }
    }
    
    public func setContextValue(_ key: String, _ value: JexValue) throws {
        return try catchNSException {
            self.context[key] = value
            self.globalScope.assignVariable(key, value: value)
        }
    }
    
    @discardableResult
    public func declareContextValue(_ key: String, value: Any?, isConst: Bool = false) throws -> JexValue {
        return try catchNSException {
            let jexValue = JexValueFactory.from(value)
            self.context[key] = jexValue
            self.globalScope.declareVariable(key, value: jexValue, isConst: isConst)
            return jexValue
        }
    }
    
    @discardableResult
    public func declareContextValue(_ key: String, value: JexValue, isConst: Bool = false) throws -> JexValue {
        return try catchNSException {
            self.context[key] = value
            self.globalScope.declareVariable(key, value: value, isConst: isConst)
            return value
        }
    }
    
    @discardableResult
    public func setContextOrDeclareContextValue(
        _ key: String,
        _ value: Any,
        isConst: Bool = false
    ) throws -> JexValue {
        return try catchNSException {
            let jexValue = JexValueFactory.from(value)
            self.context[key] = jexValue
            if (self.globalScope.hasVariable(key)) {
                self.globalScope.assignVariable(key, value: jexValue)
            } else {
                self.globalScope.declareVariable(key, value: jexValue, isConst: isConst)
            }
            return jexValue
        }
    }
    
    public func resetContext() throws {
        return try catchNSException { [weak self] in
            guard let self = self else { return }
            self.context.removeAll()
            self.globalScope = createGlobalScope()
            try self.addAllContextValuesIntoGlobalScope(context: self.context)
            self.evalVisitor = EvalVisitor(
                scope: self.globalScope,
                ctx: EvaluatorContext(jexEvaluator: self),
                funcsMap: self.funcsMap,
                transformsMap: self.transformMap
            )
        }
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
    
    public func getContextValue(_ name: String) -> Any? {
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
    
    public func getGlobalScopeVariables() -> [String: Any] {
        guard let globalVariables = self.evalVisitor.getGlobalScopeVariables() else {
            return [:]
        }
        return self.convertJexValueToAny(jexValueMap: globalVariables)
    }
    
    public func addFunction(
        name: String,
        function: @escaping FuncImpl
    ) {
        funcsMap[name] = function
        evalVisitor.addFunction(name: name, fn: function)
    }
    
    public func removeFunction(name: String) {
        funcsMap.removeValue(forKey: name)
        evalVisitor.removeFunction(name: name)
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
    
    public func removeTransform(name: String) {
        transformMap.removeValue(forKey: name)
        evalVisitor.removeTransform(name: name)
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


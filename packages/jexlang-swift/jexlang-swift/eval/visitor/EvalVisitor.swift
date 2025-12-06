//
//  EvalVisitor.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

public class EvalVisitor: JexLangBaseVisitor<JexValue> {
    
    private final let funcRegistry: MapFuncRegistry;
    private final let transformRegistry: MapTransformRegistry;
    private var scope: Scope;
    private var evaluatorContext: EvaluatorContext
    
    private var programScopeContext: [String: AnyObject] = [:];
    
    init(
        scope: Scope? = nil,
        ctx: EvaluatorContext,
        funcsMap: [String: FuncImpl]? = [:],
        transformsMap: [String: TransformImpl]? = [:]
    ) {
        self.scope = scope ?? createGlobalScope()
        
        var funcHashMap = Functions.makeBultins()
        if let funcsMap = funcsMap {
            funcHashMap.merge(funcsMap) { (_, new) in new }
        }
        self.funcRegistry = MapFuncRegistry(funcHashMap);
        
        
        var transformHashMap = Transforms.makeBuiltins()
        if let transformsMap = transformsMap {
            transformHashMap.merge(transformsMap) { (_, new) in new }
        }
        self.transformRegistry = MapTransformRegistry(transformHashMap);
        self.evaluatorContext = ctx
        super.init()
    }
    
    public func addFunction(name: String, fn: FuncImpl) {
        self.funcRegistry.set(name, fn)
    }
    
    public func removeFunction(name: String) {
        self.funcRegistry.remove(name)
    }
    
    public func getAllFunctions() -> [String: FuncImpl] {
        return self.funcRegistry.getAll()
    }
    
    public func hasFunction(_ name: String) -> Bool {
        return self.funcRegistry.has(name)
    }
    
    public func addTransform(name: String, transform: TransformImpl) {
        self.transformRegistry.set(name, transform)
    }
    
    public func removeTransform(name: String) {
        self.transformRegistry.remove(name)
    }
    
    public func getAllTransforms() -> [String: TransformImpl] {
        return self.transformRegistry.getAll()
    }
    
    public func hasTransform(_ name: String) -> Bool {
        return self.transformRegistry.has(name)
    }
    
    public func setProgramScopeContext(context: [String: AnyObject]) {
        self.programScopeContext = context;
    }
    
    public func getProgramScopeContext() -> [String: AnyObject] {
        return self.programScopeContext;
    }
    
    public func resetProgramScopeContext() {
        self.programScopeContext = [:];
    }
    
    public func getGlobalScopeVariables() -> [String: JexValue]? {
        if let globalScope = self.scope.resolveScope(ofType: .global) {
            return globalScope.getAllVariables()
        }
        return nil
    }
    
    public override func visit(_ tree: (any ParseTree)?) -> JexValue {
        if let tree = tree {
            return super.visit(tree) ?? JexNil()
        }
        return JexNil()
    }
    
    private func setScopeToParent() {
        let parentScope = self.scope.getParentScope()
        if let parentScope = parentScope {
            self.scope = parentScope
        }
    }
    
    public override func visitProgram(_ ctx: JexLangParser.ProgramContext) -> JexValue {
        
        // create a new scope per program
        self.scope = Scope(parentScope: self.scope, scopeType: .program);
        
        // initialize the program scope with the provided context variable
        for (key, value) in programScopeContext {
            // Force crash.
            try! scope.declareVariable(key, value: JexValueFactory.from(value), isConst: false) // create as non-const variable
        }
        
        var result: JexValue = JexNil()
        
        for (_, statement) in ctx.statement().enumerated() {
            result = self.visit(statement);
        }
        
        // Exit the program scope.
        self.setScopeToParent()
        // Reset the program scope context
        self.resetProgramScopeContext()
        
        return result
    }
    
    public override func visitStatement(_ ctx: JexLangParser.StatementContext) -> JexValue? {
        if let varDeclaration = ctx.varDeclaration() {
            return self.visit(varDeclaration)
        } else if let block = ctx.block() {
            return self.visit(block)
        } else if let expressionStatement = ctx.expressionStatement() {
            return self.visit(expressionStatement)
        } else if let emptyStatement = ctx.emptyStatement() {
            return self.visit(emptyStatement)
        }
        
        return JexNil()
    }
    
    public override func visitVarDeclaration(_ ctx: JexLangParser.VarDeclarationContext) -> JexValue {
        let varName = ctx.IDENTIFIER()!.getText();
        var varValue: JexValue = JexNil()
        
        if let singleExpression = ctx.singleExpression() {
            varValue = self.visit(singleExpression)
        }
        
        let isConst = ctx.CONST() != nil
        let isGlobal = ctx.GLOBAL() != nil
        
        if let globalScope = self.scope.resolveScope(ofType: .global) {
            if (isGlobal) {
                try! globalScope.declareVariable(varName, value: varValue, isConst: isConst)
            }
            return varValue
        }
        
        try! self.scope.declareVariable(varName, value: varValue, isConst: isConst)
        return varValue
        
    }
    
    public override func visitExpressionStatement(_ ctx: JexLangParser.ExpressionStatementContext) -> JexValue {
        return self.visit(ctx.expressionSequence());
    }
    
    
    public override func visitEmptyStatement(_ ctx: JexLangParser.EmptyStatementContext) -> JexValue {
        return JexNil()
    }
    
    public override func visitExpressionSequence(_ ctx: JexLangParser.ExpressionSequenceContext) -> JexValue? {
        var result: JexValue? = nil
        for singleExpression in ctx.singleExpression() {
            result = self.visit(singleExpression)
        }
        return result != nil ? result : JexNil()
    }
    
    public override func visitBlock(_ ctx: JexLangParser.BlockContext) -> JexValue {
        // Create a new scope for the block
        self.scope = Scope(parentScope: self.scope, scopeType: .block)
        
        var value: JexValue = JexNil()
        
        for statement in ctx.statement() {
            value = self.visit(statement)
        }
        
        // Exit the block scope.
        self.setScopeToParent()
        return value
    }
    
    // Literals
    public override func visitLiteralExpression(_ ctx: JexLangParser.LiteralExpressionContext) -> JexValue {
        return self.visit(ctx.literal())
    }
    
    public override func visitNumberLiteral(_ ctx: JexLangParser.NumberLiteralContext) -> JexValue {
        if let number = try? JexValueFactory.fromNumber(number: toNumber(value: JexString(value: ctx.getText()), ctx: "number literal")) {
            return number
        }
        return JexNil()
    }
    
    public override func visitBooleanLiteral(_ ctx: JexLangParser.BooleanLiteralContext) -> JexValue {
        return JexBoolean(value: ctx.getText().lowercased() == "true")
    }
    
    public override func visitStringLiteral(_ ctx: JexLangParser.StringLiteralContext) -> JexValue {
        let text = ctx.getText()
        return JexString(value: String(text[text.index(after: text.startIndex)..<text.index(before: text.endIndex)])) // Remove quotes
    }
    
    public override func visitNullLiteral(_ ctx: JexLangParser.NullLiteralContext) -> JexValue {
        return JexNil()
    }
    
    // End Literals
    
    public override func visitAdditiveExpression(_ ctx: JexLangParser.AdditiveExpressionContext) -> JexValue {
        
        let left = self.visit(ctx.singleExpression(0))
        let right = self.visit(ctx.singleExpression(1))
        if (ctx.PLUS() != nil) {
            // If either operand is a string, perform string concatenation
            if (left.isString() || right.isString()) {
                if let leftString = try? toString(value: left, ctx: "additive expression"), let rightString = try? toString(value: right, ctx: "additive expression") {
                    return JexValueFactory.fromString(string: leftString + rightString)
                }
            }
            
            if let lefNum = try? toNumber(value: left, ctx: "additive expression"), let rightNum = try? toNumber(value: right, ctx: "additive expression") {
                return JexValueFactory.fromNumber(number: NSNumber(value: lefNum.doubleValue + rightNum.doubleValue))
            }
            
        } else if (ctx.MINUS() != nil) {
            if let lefNum = try? toNumber(value: left, ctx: "additive expression"), let rightNum = try? toNumber(value: right, ctx: "additive expression") {
                return JexValueFactory.fromNumber(number: NSNumber(value: lefNum.doubleValue - rightNum.doubleValue))
            }
        }
        
        return JexNil()
    }
    
    public override func visitParenthesizedExpression(_ ctx: JexLangParser.ParenthesizedExpressionContext) -> JexValue {
        self.visit(ctx.expressionSequence())
    }
    
    public override func defaultResult() -> JexValue {
        return JexNil()
    }
    
    public override func visitIfExpression(_ ctx: JexLangParser.IfExpressionContext) -> (any JexValue)? {
        var condition: JexValue = JexBoolean(value: false)
        if let expressionSequenceContext = ctx.expressionSequence() {
            condition = self.visit(expressionSequenceContext)
        }
        
        if let isBool = (try? toBoolean(value: condition, ctx: "if expression")), isBool == true {
            return self.visit(ctx.block())
        } else if let elseIfStatement = ctx.elseIfStatement() {
            return self.visit(elseIfStatement)
        }
        
        return JexNil()
    }
}

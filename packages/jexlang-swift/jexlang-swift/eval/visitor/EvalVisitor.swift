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
    
    public func addFunction(name: String, fn: @escaping FuncImpl) {
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
    
    public func addTransform(name: String, transform: @escaping TransformImpl) {
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
    
    public override func visitExpressionSequence(_ ctx: JexLangParser.ExpressionSequenceContext) -> JexValue {
        var result: JexValue = JexNil()
        for singleExpression in ctx.singleExpression() {
            result = self.visit(singleExpression)
        }
        return result
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
    
    // MARK: Literals
    public override func visitLiteralExpression(_ ctx: JexLangParser.LiteralExpressionContext) -> JexValue {
        return self.visit(ctx.literal())
    }
    
    public override func visitNumberLiteral(_ ctx: JexLangParser.NumberLiteralContext) -> JexValue {
        return JexValueFactory.fromNumber(number: try! toNumber(value: JexString(value: ctx.getText()), ctx: "number literal"))
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
    
    public override func visitArrayLiteralExpression(_ ctx: JexLangParser.ArrayLiteralExpressionContext) -> JexValue {
        return self.visit(ctx.arrayLiteral())
    }
    
    public override func visitArrayLiteral(_ ctx: JexLangParser.ArrayLiteralContext) -> JexValue {
        var elements = [JexValue]()
        for elementCtx in ctx.arrayElement() {
            elements.append(self.visit(elementCtx))
        }
        return JexValueFactory.fromArray(array: elements)
    }
    
    public override func visitArrayElement(_ ctx: JexLangParser.ArrayElementContext) -> JexValue {
        return self.visit(ctx.singleExpression())
    }
    
    public override func visitObjectLiteralExpression(_ ctx: JexLangParser.ObjectLiteralExpressionContext) -> JexValue {
        return self.visit(ctx.objectLiteral())
    }
    
    public override func visitObjectLiteral(_ ctx: JexLangParser.ObjectLiteralContext) -> JexValue {
        var properties = [String: JexValue]()
        for propertyCtx in ctx.objectProperty() {
            let prop = self.visit(propertyCtx)
            if
                prop.isObject(),
                let propObject = try? prop.asObject(context: "visit object literal")
            {
                properties.merge(propObject) { (_, new) in new }
            } // ignore if the response is not an object.
        }
        return JexValueFactory.fromObject(value: properties)
    }
    
    public override func visitPropertyExpressionObjectProperty(_ ctx: JexLangParser.PropertyExpressionObjectPropertyContext) -> JexValue {
        let propertyName = self.visit(ctx.objectPropertyName())
        let propertyValue = self.visit(ctx.singleExpression())
        
        var object = [String: JexValue]()
        let key = toString(value: propertyName, ctx: "property expression object property")
        object[key] = propertyValue
        
        return JexValueFactory.fromObject(value: object)
    }
    
    public override func visitComputedPropertyExpressionObjectProperty(_ ctx: JexLangParser.ComputedPropertyExpressionObjectPropertyContext) -> JexValue {
        let propertyName = self.visit(ctx.singleExpression(0))
        let propertyValue = self.visit(ctx.singleExpression(1))
        
        var object = [String: JexValue]()
        let key = toString(value: propertyName, ctx: "computed property expression object property")
        object[key] = propertyValue
        
        return JexValueFactory.fromObject(value: object)
    }
    
    public override func visitShorthandPropertyExpressionObjectProperty(_ ctx: JexLangParser.ShorthandPropertyExpressionObjectPropertyContext) -> JexValue {
        guard let propertyName = ctx.IDENTIFIER()?.getText() else {
            return JexValueFactory.fromObject(value: [String: JexValue]())
        }
        
        let propertyValue = self.scope.getVariable(propertyName)
        
        return JexValueFactory.fromObject(value: [
            propertyName: propertyValue
        ]) // don't throw any error if it didn't find the variable just set the null value
    }
    
    public override func visitObjectPropertyName(_ ctx: JexLangParser.ObjectPropertyNameContext) -> (any JexValue)? {
        guard let s = ctx.STRING() else {
            return JexString(value: ctx.getText()) // Return string representation of the identifier or number
        }
        
        let text = ctx.getText()
        return JexString(value: String(text[text.index(after: text.startIndex)..<text.index(before: text.endIndex)])) // Remove quotes
    }
    
    // MARK: Repeat
    public override func visitRepeatExpression(_ ctx: JexLangParser.RepeatExpressionContext) -> JexValue {
        let iterable = self.visit(ctx.expressionSequence())
        
        guard let block = ctx.block() else {
            return JexNil()
        }
        
        if (
            iterable.isNumber()
        ) {
            return handleNumericRepeat(number: iterable as! JexNumber, block:   block)
        } else if (iterable.isString()) {
            return handleStringRepeat(string: iterable as! JexString, block: block)
        } else if (iterable.isArray()) {
            return handleArrayRepeat(array: iterable as! JexArray, block: block)
        } else if (iterable.isObject()) {
            return handleObjectRepeat(object: iterable as! JexObject, block: block)
        }
        
        return JexNil()
    }
    
    private func handleNumericRepeat(number: JexNumber, block: JexLangParser.BlockContext) -> JexValue {
        
        let times = number.asNumber(context: "repeat expression").intValue
        
        if (times < 0) {
            NSException.raise(jexLangError: JexLangRuntimeError(message: "Cannot repeat a block negative times: \(times)"))
        }
        
        // Create a new scope for the repeat block
        self.scope = Scope(parentScope: self.scope, scopeType: .block)
        
        var result: JexValue = JexNil()
        
        for time in 0..<times {
            try! self.scope.declareAndAssignVariable("$index", value: JexValueFactory.fromNumber(int: time), isConst: false)
            try! self.scope.declareVariable("$it", value: JexValueFactory.fromNumber(int: time), isConst: false)
            result = self.visit(block)
        }
        
        // Exit the block scope.
        self.setScopeToParent()
        return result;
    }
    
    private func handleArrayRepeat(array: JexArray, block: JexLangParser.BlockContext) -> JexValue {
        let arrayValue = array.asArray(context: "repeat expression")
        
        var result: JexValue = JexNil()
        
        // Create a new scope for the repeat block
        self.scope = Scope(parentScope: self.scope, scopeType: .block)
        
        for (i, _) in arrayValue.enumerated() {
            try! self.scope.declareAndAssignVariable("$index", value: JexValueFactory.fromNumber(int: i), isConst: false)
            try! self.scope.declareVariable("$it", value: arrayValue[i], isConst: false)
            result = self.visit(block)
        }
        
        // Exit the block scope.
        self.setScopeToParent()
        return result
    }
    
    private func handleObjectRepeat(object: JexObject, block: JexLangParser.BlockContext) -> JexValue {
        let objectValue = object.asObject(context: "repeat expression")
        let keys: [String] = Array(objectValue.keys)
        
        var result: JexValue = JexNil()
        
        // Create a new scope for the repeat block
        self.scope = Scope(parentScope: self.scope, scopeType: .block)
        
        for key in keys {
            try! self.scope.declareAndAssignVariable("$key", value: JexValueFactory.fromString(string: key), isConst: false)
            try! self.scope.declareVariable("$value", value: objectValue[key]!, isConst: false)
            try! self.scope.declareVariable("$it", value: objectValue[key]!, isConst: false)
            result = self.visit(block)
        }
        
        // Exit the block scope.
        self.setScopeToParent()
        return result
    }
    
    private func handleStringRepeat(string: JexString, block: JexLangParser.BlockContext) -> JexValue {
        let stringValue = string.asString(context: "repeat expression")
        let times = stringValue.count
        
        var result: JexValue = JexNil()
        
        // Create a new scope for the repeat block
        self.scope = Scope(parentScope: self.scope, scopeType: .block)
        
        for (i, c) in stringValue.enumerated() {
            try! self.scope.declareAndAssignVariable("$index", value: JexValueFactory.fromNumber(int: i), isConst: false)
            try! self.scope.declareVariable("$it", value: JexValueFactory.fromString(string: "\(c)"), isConst: false)
            result = self.visit(block)
        }
        
        // Exit the block scope.
        self.setScopeToParent()
        return result;
    }
    
    public override func visitIdentifierExpression(_ ctx: JexLangParser.IdentifierExpressionContext) -> JexValue {
        guard let identifier = ctx.IDENTIFIER()?.getText() else {
            return JexNil()
        }
        if (self.scope.hasVariable(identifier)) {
            return self.scope.getVariable(identifier)
        }
        NSException.raise(jexLangError: UndefinedVariableError(variableName: identifier))
        return JexNil()
    }
    
    public override func visitParenthesizedExpression(_ ctx: JexLangParser.ParenthesizedExpressionContext) -> JexValue {
        self.visit(ctx.expressionSequence())
    }
    
    public override func visitAssignmentExpression(_ ctx: JexLangParser.AssignmentExpressionContext) -> JexValue {
        let varValue = self.visit(ctx.singleExpression())
        if let varName = ctx.IDENTIFIER()?.getText() {
            try! self.scope.assignVariable(varName, value: varValue)
        }
        return varValue;
    }
    
    public override func visitBracketPropertyAssignment(_ ctx: JexLangParser.BracketPropertyAssignmentContext) -> JexValue {
        let objectValue = self.visit(ctx.singleExpression(0))
        let propertyKey = self.visit(ctx.singleExpression(1))
        let propertyValue = self.visit(ctx.singleExpression(2))
        
        if (objectValue.isObject()) {
            var objectValue = try! objectValue.asObject(context: "bracket property assignment")
            let key = toString(value: propertyKey, ctx: "bracket property assignment")
            objectValue[key] = propertyValue
            return JexValueFactory.fromObject(value: objectValue)
        } else if (objectValue.isArray()) {
            var arrayValue = try! objectValue.asArray(context: "bracket property assignment")
            let indexNumber = try! toNumber(value: propertyKey, ctx: "bracket property assignment")
            
            let doubleValue = indexNumber.doubleValue
            
            var index = doubleValue.isNaN ? -1 : Int(doubleValue)
            
            if index < 0 {
                index = arrayValue.count + index
            }
            
            if index >= 0 && index < arrayValue.count {
                arrayValue[index] = propertyValue
                return JexValueFactory.fromArray(array: arrayValue)
            }
            
            // if out of bounds just return JexNull, don't throw any errors.
            return JexNil()
        }
        
        NSException.raise(jexLangError: JexLangRuntimeError(message: "Cannot assign property to non-object/non-array in bracket property assignment"))
        return JexNil()
    }
    
    public override func visitDotPropertyAssignment(_ ctx: JexLangParser.DotPropertyAssignmentContext) -> JexValue {
        let objectValue = self.visit(ctx.singleExpression(0))
        let propertyKey = self.visit(ctx.singleExpression(1))
        let propertyValue = self.visit(ctx.singleExpression(2))
        
        if objectValue.isObject()
        {
            var objectValue = try! objectValue.asObject(context: "dot property assignment")
            let key = toString(value: propertyKey, ctx: "dot property assignment")
            objectValue[key] = propertyValue
            return JexValueFactory.fromObject(value: objectValue)
        } else if
            objectValue.isArray()
         {
            var arrayValue = try! objectValue.asArray(context: "dot property assignment")
            let indexNumber = try! toNumber(value: propertyKey, ctx: "dot property assignment")
            let doubleValue = indexNumber.doubleValue
            
            var index = doubleValue.isNaN ? -1 : Int(doubleValue)
            
            if index < 0 {
                index = arrayValue.count + index
            }
            
            if index >= 0 && index < arrayValue.count {
                arrayValue[index] = propertyValue
                return JexValueFactory.fromArray(array: arrayValue)
            }
            
            // if out of bounds just return JexNull, don't throw any errors.
            return JexNil()
        }
        
        NSException.raise(jexLangError: JexLangRuntimeError(message: "Cannot assign property to non-object/non-array in dot property assignment"))
        return JexNil()
    }
    
    public override func visitTernaryExpression(_ ctx: JexLangParser.TernaryExpressionContext) -> JexValue {
        let condition = self.visit(ctx.singleExpression(0))
        
        if
            // empty array and objects are falsy
            toBoolean(value: condition, ctx: "ternary expression")
        {
            return self.visit(ctx.singleExpression(1))
        } else {
            return self.visit(ctx.singleExpression(2))
        }
    }
    
    public override func visitShortTernaryExpression(_ ctx: JexLangParser.ShortTernaryExpressionContext) -> JexValue {
        let condition = self.visit(ctx.singleExpression(0));
        if
            // empty array and objects are falsy
            toBoolean(value: condition, ctx: "short ternary expression")
        {
            return condition
        } else {
            return self.visit(ctx.singleExpression(1))
        }
    }
    
    public override func visitTransformExpression(_ ctx: JexLangParser.TransformExpressionContext) -> JexValue {
        let input = self.visit(ctx.singleExpression())
        
        guard let transformName = ctx.IDENTIFIER()?.getText() else {
            NSException.raise(jexLangError: JexLangRuntimeError(message: "Expected transform name. But not found."))
            return JexNil()
        }
        
        if (self.transformRegistry.has(transformName)) {
            return self.transformRegistry.transform(transformName, input, self.evaluatorContext)
        }

        // if transform not found lets check in functions
        if
            let functionName = ctx.IDENTIFIER()?.getText(),
            self.funcRegistry.has(functionName)
        {
            return self.funcRegistry.call(functionName, self.evaluatorContext, [input])
        }
        
        NSException.raise(jexLangError: UndefinedTransformError(transformName: transformName))
        return JexNil()
    }
    
    public override func visitPowerExpression(_ ctx: JexLangParser.PowerExpressionContext) -> JexValue {
        let left = self.visit(ctx.singleExpression(0))
        let right = self.visit(ctx.singleExpression(1))
        
        let base = try! toNumber(value: left, ctx: "power expression")
        let exponent = try! toNumber(value: right, ctx: "power expression")
        return JexNumber(value: pow(base.doubleValue, exponent.doubleValue))
    }
    
    // MARK: Multiple
    public override func visitMultiplicativeExpression(_ ctx: JexLangParser.MultiplicativeExpressionContext) -> JexValue {
        let left = self.visit(ctx.singleExpression(0))
        let right = self.visit(ctx.singleExpression(1))
        
        let leftNum = try! toNumber(value: left, ctx: "multiplicative expression")
        let rightNum = try! toNumber(value: right, ctx: "multiplicative expression")
        
        if let _ = ctx.MULTIPLY() {
            return JexValueFactory.fromNumber(double: leftNum.doubleValue * rightNum.doubleValue)
        } else if let _ = ctx.DIVIDE() {
            return JexValueFactory.fromNumber(double: leftNum.doubleValue / rightNum.doubleValue)
        } else if let _ = ctx.MODULO() {
            return JexValueFactory.fromNumber(double: leftNum.doubleValue.truncatingRemainder(dividingBy: rightNum.doubleValue))
        }
        
        NSException.raise(jexLangError: JexLangRuntimeError(message: "Unknown multiplicative operator \(String(describing: ctx.getChild(1)))"))
        return JexNil()
    }
    
    // MARK: Additive
    public override func visitAdditiveExpression(_ ctx: JexLangParser.AdditiveExpressionContext) -> JexValue {
        
        let left = self.visit(ctx.singleExpression(0))
        let right = self.visit(ctx.singleExpression(1))
        if (ctx.PLUS() != nil) {
            // If either operand is a string, perform string concatenation
            if (left.isString() || right.isString()) {
                let leftString = toString(value: left, ctx: "additive expression")
                let rightString = toString(value: right, ctx: "additive expression")
                return JexValueFactory.fromString(string: leftString + rightString)
            }
            
            let lefNum = try! toNumber(value: left, ctx: "additive expression")
            let rightNum = try! toNumber(value: right, ctx: "additive expression")
            return JexValueFactory.fromNumber(number: NSNumber(value: lefNum.doubleValue + rightNum.doubleValue))
            
        } else if (ctx.MINUS() != nil) {
            let lefNum = try! toNumber(value: left, ctx: "additive expression")
            let rightNum = try! toNumber(value: right, ctx: "additive expression")
            return JexValueFactory.fromNumber(number: NSNumber(value: lefNum.doubleValue - rightNum.doubleValue))
        }
        
        NSException.raise(jexLangError: JexLangRuntimeError(message: "Unknown additive operator  \(String(describing: ctx.getChild(1)))"))
        return JexNil()
    }
    
    // MARK: Relational Expression
    public override func visitRelationalExpression(_ ctx: JexLangParser.RelationalExpressionContext) -> JexValue {
        let left = self.visit(ctx.singleExpression(0))
        let right = self.visit(ctx.singleExpression(1))
        
        if let _ = ctx.LT() {
            return JexBoolean(value: jsRelational(left: left, right: right, op: .LESS_THAN))
        } else if let _ = ctx.GT() {
            return JexBoolean(value: jsRelational(left: left, right: right, op: .GREATER_THAN))
        } else if let _ = ctx.LTE() {
            return JexBoolean(value: jsRelational(left: left, right: right, op: .LESS_THAN_EQUAL))
        } else if let _ = ctx.GTE() {
            return JexBoolean(value: jsRelational(left: left, right: right, op: .GREATER_THAN_EQUAL))
        }
        
        return JexNil()
    }
    
    // MARK: Equality Expression
    public override func visitEqualityExpression(_ ctx: JexLangParser.EqualityExpressionContext) -> JexValue {
        let left = self.visit(ctx.singleExpression(0))
        let right = self.visit(ctx.singleExpression(1))
        
        if let _ = ctx.EQ() {
            return JexBoolean(value: left.isEqual(to: right))
        } else if let _ = ctx.NEQ() {
            return JexBoolean(value: !left.isEqual(to: right))
        }
        
        return JexNil()
    }
    
    private func asSafeBool(_ value: JexValue) -> Bool {
        if value.isNil() { return false }
        if value.isBoolean() { return (try? value.asBoolean(context: "logical")) ?? false }
        if value.isNumber() { return ((try? value.asNumber(context: "logical"))?.doubleValue ?? 0) != 0 }
        return false
    }
    
    // MARK: Logical 'and' Expression
    public override func visitLogicalAndExpression(_ ctx: JexLangParser.LogicalAndExpressionContext) -> JexValue {
        if let _ = ctx.AND() {
            let left = self.visit(ctx.singleExpression(0))
            let leftBoolean: Bool = toBoolean(value: left, ctx: "and")
            if (!leftBoolean) { // short-circuit if left is falsy
                return JexBoolean(value: false)
            }
            let right = self.visit(ctx.singleExpression(1))
            let rightBoolean = toBoolean(value: right, ctx: "and")
            return JexBoolean(value: rightBoolean)
        }
        
        return JexNil()
    }
    
    // MARK: Logical 'or' Expression
    public override func visitLogicalOrExpression(_ ctx: JexLangParser.LogicalOrExpressionContext) -> JexValue {
        if let _ = ctx.OR() {
            let left = self.visit(ctx.singleExpression(0))
            let leftBoolean: Bool = toBoolean(value: left, ctx: "or")
            if (leftBoolean) { // short-circuit if left is truthy
                return JexBoolean(value: true)
            }
            let right = self.visit(ctx.singleExpression(1))
            let rightBoolean = toBoolean(value: right, ctx: "or")
            return JexBoolean(value: rightBoolean)
        }
        return JexNil()
    }
    
    // MARK: Unary Expression
    public override func visitUnaryExpression(_ ctx: JexLangParser.UnaryExpressionContext) -> JexValue {
        let jexValue = self.visit(ctx.singleExpression())
        
        if let _ = ctx.PLUS() {
            let number = try! toNumber(value: jexValue, ctx: "unary expression")
            return JexValueFactory.fromNumber(double: number.doubleValue)
        } else if let _ = ctx.MINUS() {
            let number = try! toNumber(value: jexValue, ctx: "unary expression")
            return JexValueFactory.fromNumber(double: -number.doubleValue)
        } else if let _ = ctx.NOT() {
            let bool = toBoolean(value: jexValue, ctx: "unary expression")
            return JexValueFactory.fromBoolean(value: bool)
        }
        
        return JexNil()
    }
    
    public override func visitSquareRootExpression(_ ctx: JexLangParser.SquareRootExpressionContext) -> JexValue {
        let jexValue = self.visit(ctx.singleExpression())
        let number = try! toNumber(value: jexValue, ctx: "unary expression")
        
        if number.doubleValue < 0 {
            NSException.raise(jexLangError: JexLangRuntimeError(message: "Cannot compute square root of negative number"))
            return JexNil()
        }
        return JexValueFactory.fromNumber(double: sqrt(number.doubleValue))
    }
    
    public override func visitMemberDotExpression(_ ctx: JexLangParser.MemberDotExpressionContext) -> JexValue {
        let obj = self.visit(ctx.singleExpression())
        let propertyName = self.visit(ctx.objectPropertyName())
        
        if !propertyName.isString() {
            NSException.raise(jexLangError: JexLangRuntimeError(message: "Invalid property name: \(propertyName)"))
            return JexNil()
        }
        
        if obj.isObject(),
           propertyName.isString() {
            let object = try! obj.asObject(context: "member dot expression")
            let propertyName = try! propertyName.asString(context: "member dot expression")
            return object[propertyName] ?? JexNil()
        }
        
        return JexNil() // don't throw any error if the object is null or not an object just return null to further chain.
    }
    
    public override func visitMemberIndexExpression(_ ctx: JexLangParser.MemberIndexExpressionContext) -> JexValue {
        let obj = self.visit(ctx.singleExpression())
        let propertyKey = self.visit(ctx.expressionSequence())
        
        if !propertyKey.isString() {
            // TODO: Need to throw error
            return JexNil()
        }
        
        if obj.isObject(),
           propertyKey.isString()
        {
            let object = try! obj.asObject(context: "member index expression")
            let propertyName = try! propertyKey.asString(context: "member index expression")
            return object[propertyName] ?? JexNil()
        } else if
            obj.isArray()
        {
            let arrayValue = try! obj.asArray(context: "member index expression")
            let indexNumber = try! toNumber(value: propertyKey, ctx: "member index expression")
            let doubleValue = indexNumber.doubleValue
            
            var index = doubleValue.isNaN ? -1 : Int(doubleValue)
            
            if index < 0 {
                index = arrayValue.count + index
            }
            
            if index >= 0 && index < arrayValue.count {
                return arrayValue[index]
            }
            
            // out of bounds -> return nil
            return JexNil()
        }
        
        return JexNil() // don't throw any error if the object is null or not an object just return null to further chain.
    }
    
    public override func visitFunctionCallExpression(_ ctx: JexLangParser.FunctionCallExpressionContext) -> JexValue {
        guard let functionName = ctx.IDENTIFIER()?.getText() else {
            NSException.raise(jexLangError: JexLangRuntimeError(message: "Missing function name"))
            return JexNil()
        }
        if
            self.funcRegistry.has(functionName)
        {
            var args = [JexValue]()
            let arguments = self.visit(ctx.arguments())
            if
                arguments.isArray(),
                let arrayValue = try? arguments.asArray(context: "function call arguments")
            {
                args = arrayValue
            }
            return self.funcRegistry.call(functionName, self.evaluatorContext, args)
        }
        
        NSException.raise(jexLangError: UndefinedFunctionError(functionName: functionName))
        return JexNil()
    }
    
    public override func visitArguments(_ ctx: JexLangParser.ArgumentsContext) -> JexValue {
        var args = [JexValue]()
        for argCtx in ctx.argument() {
            args.append(self.visit(argCtx))
        }
        return JexValueFactory.fromArray(array: args)
    }
    
    public override func visitArgument(_ ctx: JexLangParser.ArgumentContext) -> JexValue {
        if let singleExpression = ctx.singleExpression() {
            return self.visit(singleExpression)
        } else if let identifier = ctx.IDENTIFIER()?.getText() {
            if (self.scope.hasVariable(identifier)) {
                return self.scope.getVariable(identifier)
            }
            NSException.raise(jexLangError: UndefinedVariableError(variableName: identifier))
            return JexNil()
        }
        
        NSException.raise(jexLangError: JexLangRuntimeError(message: "Unknown argument type: \(ctx.getText())"))
        return JexNil()
    }
    
    public override func visitPrefixExpression(_ ctx: JexLangParser.PrefixExpressionContext) -> JexValue {
        let expr = ctx.singleExpression();
        
        // Handle identifier expression (variables)
        if let expr = expr as? JexLangParser.IdentifierExpressionContext {
            if let varName = expr.IDENTIFIER()?.getText() {
                if (!self.scope.hasVariable(varName)) {
                    NSException.raise(jexLangError: UndefinedVariableError(variableName: varName))
                    return JexNil()
                }
                
                let jexValue = self.scope.getVariable(varName)
                let number = try! toNumber(value: jexValue, ctx: "prefix expression")
                let newValue = JexNumber(value:
                    ctx.INCREMENT() != nil ? number.doubleValue + 1 : number.doubleValue - 1
                )
                try! self.scope.assignVariable(varName, value: newValue)
                return newValue // return the original value before increment/decrement
            }
        }
        // Handle property access expression (obj.pro or obj[prop])
        else if let expr = expr as? JexLangParser.MemberDotExpressionContext {
            let object = self.visit(expr.singleExpression())
            let propertyName = self.visit(expr.objectPropertyName())
            if (
                !object.isObject()
            ) {
                NSException.raise(jexLangError: JexLangRuntimeError(message: "Cannot use prefix operator on a non-object property"))
                return JexNil()
            }
            var objectValue = try! object.asObject(context: "Prefix Expression")
            let properyKey = try! propertyName.asString(context: "Prefix Expression")
            let currentValue = try! toNumber(value: objectValue[properyKey] ?? JexNil(), ctx: "Prefix Expression")
            
            let newValue = ctx.INCREMENT() != nil ? currentValue.doubleValue + 1 : currentValue.doubleValue - 1
            let jexNewValue = JexValueFactory.fromDouble(double: newValue)
            objectValue[properyKey] = jexNewValue;
            
            return jexNewValue;
        } else if let expr = expr as? JexLangParser.MemberIndexExpressionContext {
            let object = self.visit(expr.singleExpression())
            let propertyName = self.visit(expr.expressionSequence())
            
            if object.isArray()
            {
                var arrayValue = try! object.asArray(context: "Prefix Expression")
                let indexNumber = try! toNumber(value: propertyName, ctx: "Prefix Expression")
                let doubleValue = indexNumber.doubleValue
                
                var index = doubleValue.isNaN ? -1 : Int(doubleValue)
                
                if index < 0 {
                    index = arrayValue.count + index
                }
                
                if
                    index >= 0 && index < arrayValue.count
                {
                    let currentValue = try! toNumber(value: arrayValue[index], ctx: "Prefix Expression")
                    let newValue = ctx.INCREMENT() != nil ? currentValue.doubleValue + 1 : currentValue.doubleValue - 1
                    let jexNewValue = JexValueFactory.fromDouble(double: newValue)
                    arrayValue[index] = jexNewValue
                    return jexNewValue
                }
            } else if
                object.isObject()
            {
                var objectValue = try! object.asObject(context: "Prefix Expression")
                let properyKey = toString(value: propertyName, ctx: "Prefix Expression")
                let currentValue = try! toNumber(value: objectValue[properyKey] ?? JexNil(), ctx: "Prefix Expression")
                let newValue = ctx.INCREMENT() != nil ? currentValue.doubleValue + 1 : currentValue.doubleValue - 1
                let jexNewValue = JexValueFactory.fromDouble(double: newValue)
                objectValue[properyKey] = jexNewValue
                return jexNewValue
            }
        } else {
            // For other expressions, we'll just calculate but not store.
            let value = self.visit(expr)
            let number = try! toNumber(value: value, ctx: "prefix expression")
            if let _ = ctx.DECREMENT() {
                return JexNumber(value: number.doubleValue - 1)
            } else if let _ = ctx.INCREMENT() {
                return JexNumber(value: number.doubleValue + 1)
            }
        }
        
        return JexNil()
    }
    
    public override func visitPostfixExpression(_ ctx: JexLangParser.PostfixExpressionContext) -> JexValue {
        let expr = ctx.singleExpression();
        
        // Handle identifier expression (variables)
        if let expr = expr as? JexLangParser.IdentifierExpressionContext {
            if let varName = expr.IDENTIFIER()?.getText() {
                if (!self.scope.hasVariable(varName)) {
                    NSException.raise(jexLangError: UndefinedVariableError(variableName: varName))
                    return JexNil()
                }
                
                let jexValue = self.scope.getVariable(varName)
                let number = try! toNumber(value: jexValue, ctx: "prefix expression")
                let newValue = JexNumber(value:
                    ctx.INCREMENT() != nil ? number.doubleValue + 1 : number.doubleValue - 1
                )
                try! self.scope.assignVariable(varName, value: newValue)
                return jexValue; // return the original value before increment/decrement
            }
        }
        // Handle property access expression (obj.pro or obj[prop])
        else if let expr = expr as? JexLangParser.MemberDotExpressionContext {
            let object = self.visit(expr.singleExpression())
            let propertyName = self.visit(expr.objectPropertyName())
            if (
                !object.isObject()
            ) {
                NSException.raise(jexLangError: JexLangRuntimeError(message: "Cannot use postfix operator on a non-object property"))
                return JexNil()
            }
            if
                object.isObject(),
                var objectValue = try? object.asObject(context: "Prefix Expression"),
                let properyKey = try? propertyName.asString(context: "Prefix Expression"),
                let currentValue = try? toNumber(value: objectValue[properyKey] ?? JexNil(), ctx: "Prefix Expression")
            {
                let newValue = ctx.INCREMENT() != nil ? currentValue.doubleValue + 1 : currentValue.doubleValue - 1
                let jexNewValue = JexValueFactory.fromDouble(double: newValue)
                objectValue[properyKey] = jexNewValue;
                return JexNumber(value: currentValue); // return the original value before increment/decrement
            }
        } else if let expr = expr as? JexLangParser.MemberIndexExpressionContext {
            let object = self.visit(expr.singleExpression())
            let propertyName = self.visit(expr.expressionSequence())
            
            if object.isArray()
            {
                var arrayValue = try! object.asArray(context: "Prefix Expression")
                let indexNumber = try! toNumber(value: propertyName, ctx: "Prefix Expression")
                let doubleValue = indexNumber.doubleValue
                
                var index = doubleValue.isNaN ? -1 : Int(doubleValue)
                
                if index < 0 {
                    index = arrayValue.count + index
                }
                
                if
                    index >= 0 && index < arrayValue.count
                {
                    let currentValue = try! toNumber(value: arrayValue[index], ctx: "Prefix Expression")
                    let newValue = ctx.INCREMENT() != nil ? currentValue.doubleValue + 1 : currentValue.doubleValue - 1
                    let jexNewValue = JexValueFactory.fromDouble(double: newValue)
                    arrayValue[index] = jexNewValue
                    return JexNumber(value: currentValue); // return the original value before increment/decrement
                }
            } else if
                object.isObject()
            {
                var objectValue = try! object.asObject(context: "Prefix Expression")
                let properyKey = toString(value: propertyName, ctx: "Prefix Expression")
                let currentValue = try! toNumber(value: objectValue[properyKey] ?? JexNil(), ctx: "Prefix Expression")
                
                let newValue = ctx.INCREMENT() != nil ? currentValue.doubleValue + 1 : currentValue.doubleValue - 1
                let jexNewValue = JexValueFactory.fromDouble(double: newValue)
                objectValue[properyKey] = jexNewValue
                return JexNumber(value: currentValue); // return the original value before increment/decrement
            }
        } else {
            // For other expressions, we'll just calculate but not store.
            let value = self.visit(expr)
            if let number = try? toNumber(value: value, ctx: "postfix expression") {
                if let _ = ctx.DECREMENT() {
                    return JexNumber(value: number.doubleValue - 1)
                } else if let _ = ctx.INCREMENT() {
                    return JexNumber(value: number.doubleValue + 1)
                }
            }
        }
        
        return JexNil()
    }
    
    public override func visitErrorNode(_ node: ErrorNode) -> JexValue {
        let location = SyntaxErrorLocation(
            line: node.getSymbol()?.getLine() ?? 0,
            column: node.getSymbol()?.getCharPositionInLine() ?? 0,
            offendingSymbol: node.getText()
        )

        var errorMessage: String

        if let symbol = node.getSymbol() {
            let tokenType = symbol.getType()
            let tokenText = escapeTokenText(node.getText())

            if tokenType >= 0 {
                errorMessage = "Unexpected token '\(tokenText)'"
            } else {
                errorMessage = "Invalid syntax near '\(tokenText)'"
            }

            if symbol.getLine() > 0 {
                errorMessage += " at line \(symbol.getLine()):\(symbol.getCharPositionInLine() + 1)"
            }
        } else {
            errorMessage = "Syntax error encountered: \(node.getText())"
        }
        
        // TODO: throw error says transform name not found
        return JexNil()
    }
    
    private func escapeTokenText(_ text: String?) -> String {
        guard let text = text else { return "" }

        return text
            .replacingOccurrences(of: "\n", with: "\\n")
            .replacingOccurrences(of: "\r", with: "\\r")
            .replacingOccurrences(of: "\t", with: "\\t")
    }
    
    public override func defaultResult() -> JexValue {
        return JexNil()
    }
    
    public override func visitIfExpression(_ ctx: JexLangParser.IfExpressionContext) -> (any JexValue)? {
        var condition: JexValue = JexBoolean(value: false)
        if let expressionSequenceContext = ctx.expressionSequence() {
            condition = self.visit(expressionSequenceContext)
        }
        
        if toBoolean(value: condition, ctx: "if expression") {
            return self.visit(ctx.block())
        } else if let elseIfStatement = ctx.elseIfStatement() {
            return self.visit(elseIfStatement)
        }
        
        return JexNil()
    }
    
    public override func visitElseIfClause(_ ctx: JexLangParser.ElseIfClauseContext) -> (any JexValue)? {
        let condition = self.visit(ctx.expressionSequence())
        
        // empty array and objects are falsy
        if toBoolean(value: condition, ctx: "else if expression")
        {
            return self.visit(ctx.block())
        } else if let elseIfStatement = ctx.elseIfStatement() {
            return self.visit(elseIfStatement)
        }
        
        return JexNil()
    }
    
    public override func visitElseClause(_ ctx: JexLangParser.ElseClauseContext) -> (any JexValue)? {
        return self.visit(ctx.block())
    }
    
}

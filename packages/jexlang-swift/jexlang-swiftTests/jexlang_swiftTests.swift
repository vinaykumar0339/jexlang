//
//  jexlang_swiftTests.swift
//  jexlang-swiftTests
//
//  Created by Vinay Kumar on 03/10/25.
//

import Testing
@testable import jexlang_swift

func makeEvaluator() throws -> JexEvaluator {
    return try JexEvaluator()
}

@Suite("JexEvaluator Tests")
struct jexlang_swiftTests {
    
    var evaluator: JexEvaluator!
    
    init() throws {
        self.evaluator = try makeEvaluator()
    }
    
    @Suite("Constructor Tests")
    struct ConstructorTests {
        
        var evaluator: JexEvaluator!
        
        init() throws {
            self.evaluator = try makeEvaluator()
        }
        
        @Test("Test Constructor with Default Parameters")
        func testConstructor_DefaultParameters() throws {
            #expect(evaluator != nil)
            #expect(evaluator.getGlobalScopeVariables().count >= 0)
        }
        
        @Test("Test Constructor with Custom Context")
        func testConstructor_CustomContext() throws {
            var context = [String: AnyObject]()
            context["x"] = 10 as AnyObject
            context["y"] = 20 as AnyObject
            
            let evaluator = try JexEvaluator(
                context: context
            )
            #expect(evaluator.getContextValue("x") as! Int == 10)
            #expect(evaluator.getContextValue("y") as! Int == 20)
        }
        
        @Test("Test Constructor with Custom Functions")
        func testConstructor_CustomFunctions() throws {
            let customFunc: FuncImpl = { ctx, args in
                JexValueFactory.fromString(string: "test")
            }
            
            let funcs = [
                "customFunc": customFunc
            ]
            
            let evaluator = try JexEvaluator(
                funcsMap: funcs
            )
            
            #expect(evaluator.hasFunction(name: "customFunc"))
        }
        
        @Test("Test Constructor with Custom Transforms")
        func testConstructor_CustomTransforms() throws {
            let customTransform: TransformImpl = { input, _ in
                input
            }
            
            let transforms: [String: TransformImpl] = [
                "customTransform": customTransform
            ]
            
            let evaluator = try JexEvaluator(
                transformMap: transforms
            )
            
            #expect(evaluator.hasTransform(name: "customTransform"))
        }
    }
    
    @Suite("Evaluate Tests")
    struct EvaluateTests {
        var evaluator: JexEvaluator!
        
        init() throws {
            self.evaluator = try makeEvaluator()
        }
        
        @Test("should evaluate simple literal expressions")
        func testEvaluate_Literals() throws {
            #expect(try evaluator.evaluate(expr: "42") as! Int == 42)
            #expect(try evaluator.evaluate(expr: "true") as! Bool == true)
            #expect(try evaluator.evaluate(expr: "\"hello\"") as! String == "hello")
            #expect(try evaluator.evaluate(expr: "null") == nil)
        }
        
        @Test("hould evaluate arithmetic expressions")
        func testEvaluate_Arithmetic() throws {
            #expect(try evaluator.evaluate(expr: "2 + 3") as! Int == 5)
            #expect(try evaluator.evaluate(expr: "10 - 4") as! Int == 6)
            #expect(try evaluator.evaluate(expr: "5 * 3") as! Int == 15)
            #expect(try evaluator.evaluate(expr: "10 / 2") as! Int == 5)
        }
        
        @Test("should evaluate with program scope context")
        func testEvaluate_ProgramScopeContext() throws {
            
            let result = try evaluator.evaluate(expr: "x + y", programScopeVariables: [
                "x": 5,
                "y": 10
            ]) as! Int;
            
            #expect(result == 15)
        }
        
        @Test("should handle context variables")
        func testEvaluate_ContextVariables() throws {
            try evaluator.declareContextValue("value", value: 0, isConst: false);
            
            try evaluator.setContextValue("value", 100);
            
            #expect(try evaluator.evaluate(expr: "value") as! Int == 100)
        }
    }
    
    @Suite("evaluate sync function tests")
    struct EvaluateSyncFunctionTests {
        
        var evaluator: JexEvaluator!
        
        init() throws {
            self.evaluator = try makeEvaluator()
        }
        
        @Test("should evaluate synchronously")
        func testEvaluate_AsyncFunctionCalls() throws {
            #expect(try evaluator.evaluate(expr: "2 + 3") as! Int == 5)
        }
        
        @Test("should work with program scope context")
        func testEvaluate_AsyncFunctionWithContext() throws {
            let ctx = [
                "a": 4,
                "b": 5
            ]
            
            let result = try evaluator.evaluate(expr: "a * b", programScopeVariables: ctx) as! Int;
            
            #expect(result == 20)
        }
    }
    
    @Suite("context management")
    struct ContextManagementTests {
        var evaluator: JexEvaluator!
        
        init() throws {
            self.evaluator = try makeEvaluator()
        }
        
        @Test("should set context value only if already declared")
        func testSetContextValueOnlyIfDeclared() throws {
            // declare first
            try evaluator.declareContextValue("key", value: "initial")
            #expect(evaluator.getContextValue("key") as! String == "initial")
            
            // set new value
            try evaluator.setContextValue("key", "value")
            #expect(evaluator.getContextValue("key") as! String == "value")
        }
        
        @Test("should throw error when setting undeclared variable")
        func testSetContextValueThrowsForUndeclared() {
            #expect(throws: JexLangRuntimeError.self, performing: {
                try evaluator.setContextValue("undeclared", "value")
            })
        }
        
        @Test("should declare context value")
        func testDeclareContextValue() throws {
            try evaluator.declareContextValue("newVar", value: 42)
            #expect(evaluator.getContextValue("newVar") as! Int == 42)
        }
        
        @Test("should declare const context value and reject reassignment")
        func testDeclareConstContextValue() throws {
            try evaluator.declareContextValue("constVar", value: 100, isConst: true)
            #expect(evaluator.getContextValue("constVar") as! Int == 100)
            
            // reassign should fail
            #expect(throws: JexLangRuntimeError.self, performing: {
                try evaluator.setContextValue("constVar", 200)
            })
        }
        
        @Test("should set or declare context value")
        func testSetOrDeclareContextValue() async throws {
            // declare new
            try evaluator.setContextOrDeclareContextValue("var1", 10)
            #expect(evaluator.getContextValue("var1") as! Int == 10)
            
            // update existing
            try evaluator.setContextOrDeclareContextValue("var1", 20)
            #expect(evaluator.getContextValue("var1") as! Int == 20)
        }
        
        @Test("should return null for undefined context value")
        func testGetUndefinedContextValue() throws {
            #expect(evaluator.getContextValue("nonexistent") == nil)
        }
        
        @Test("should reset context and clear variables")
        func nametestResetContext() throws {
            try evaluator.declareContextValue("key", value: "initial")
            try evaluator.setContextValue("key", "value")
            
            try evaluator.resetContext();
            
            // should return null after reset
            #expect(evaluator.getContextValue("nonexistent") == nil)
        }
        
        @Test("should get global scope variables (e.g., PI, E)")
        func testGetGlobalScopeVariables() throws {
            let vars = evaluator.getGlobalScopeVariables()
            
            #expect(vars != nil)
            #expect(vars.keys.contains("PI"))
            #expect(vars.keys.contains("E"))
            
            #expect(vars["PI"] as! Double == Double.pi)
            #expect(vars["E"] as! Double == Darwin.M_E)
            
        }
        
    }
    
    @Suite("function management")
    struct FunctionManagementTesst {
        
        var evaluator: JexEvaluator!
        
        init() throws {
            self.evaluator = try makeEvaluator()
        }
        
        @Test("should add a function")
        func testAddFunction() throws {
            let testFunc: FuncImpl = { (ctx, args) in
                JexValueFactory.from("test")
            }
            
            evaluator.addFunction(name: "testFunc", function: testFunc)
            #expect(evaluator.hasFunction(name: "testFunc"))
        }
        
        @Test("should add multiple functions")
        func testAddMultipleFunctions() throws {
            let funcs: [String: FuncImpl] = [
                "func1": { (ctx, args) in
                    JexValueFactory.from(1)
                },
                "func2": { (ctx, args) in
                    JexValueFactory.from(2)
                }
            ]
            
            evaluator.addFunctions(functions: funcs)
            #expect(evaluator.hasFunction(name: "func1"))
            #expect(evaluator.hasFunction(name: "func2"))
        }
        
        @Test("should remove a function")
        func testRemoveFunction() throws {
            let testFunc: FuncImpl = { (ctx, args) in
                JexValueFactory.from("test")
            }
            
            evaluator.addFunction(name: "testFunc", function: testFunc)
            #expect(evaluator.hasFunction(name: "testFunc"))
            
            evaluator.removeFunction(name: "testFunc")
            #expect(evaluator.hasFunction(name: "testFunc") == false)
        }
        
        @Test("should get all functions")
        func testGetAllFunctions() throws {
            let testFunc: FuncImpl = { (ctx, args) in
                JexValueFactory.from("test")
            }
            
            evaluator.addFunction(name: "testFunc", function: testFunc)
            
            let allFuncs = evaluator.getAllFunctions()
            
            #expect(allFuncs != nil)
            #expect(allFuncs.keys.contains("testFunc"))
            #expect(allFuncs["testFunc"] != nil)
        }
        
        @Test("should reset function")
        func testResetFunctions() throws {
            let testFunc: FuncImpl = { (ctx, args) in
                JexValueFactory.from("test")
            }
            
            evaluator.addFunction(name: "testFunc", function: testFunc)
            #expect(evaluator.hasFunction(name: "testFunc"))
            
            evaluator.resetFunctions()
            #expect(evaluator.hasFunction(name: "testFunc") == false)
        }
    }
    
    @Suite("transform managemen")
    struct TransformManagementTests {
        
        var evaluator: JexEvaluator!
        
        init() throws {
            self.evaluator = try makeEvaluator()
        }
        
        @Test("should add a transform")
        func testAddTransform() throws {
            let testTransform: TransformImpl = { input, _ in input }
            
            evaluator.addTransform(name: "testTransform", transform: testTransform)
            #expect(evaluator.hasTransform(name: "testTransform"))
        }
        
        @Test("should add multiple transforms")
        func testAddMultipleTransforms() throws {
            let transforms: [String: TransformImpl] = [
                "testTransform1": { input, _ in input },
                "testTransform2": { input, _ in input }
            ]
            
            evaluator.addTransforms(transforms: transforms)
            
            #expect(evaluator.hasTransform(name: "testTransform1"))
            #expect(evaluator.hasTransform(name: "testTransform2"))
                
        }
        
        @Test("should remove a transform")
        func testRemoveTransform() throws {
            let testTransform: TransformImpl = { input, _ in input }
            
            evaluator.addTransform(name: "testTransform", transform: testTransform)
            #expect(evaluator.hasTransform(name: "testTransform"))
            
            evaluator.removeTransform(name: "testTransform")
            #expect(!evaluator.hasTransform(name: "testTransform"))
        }
        
        @Test("should get all transforms")
        func testGetAllTransforms() throws {
            let testTransform: TransformImpl = { input, _ in input }
            
            evaluator.addTransform(name: "testTransform", transform: testTransform)
            
            let allTransforms = evaluator.getAllTransforms()
            
            #expect(allTransforms != nil)
            #expect(allTransforms.keys.contains("testTransform"))
            #expect(allTransforms["testTransform"] != nil)
            
        }
        
        @Test("should reset transforms")
        func testResetTransforms() throws {
            let testTransform: TransformImpl = { input, _ in input }
            
            evaluator.addTransform(name: "testTransform", transform: testTransform)
            #expect(evaluator.hasTransform(name: "testTransform"))
            
            evaluator.resetTransforms()
            
            #expect(!evaluator.hasTransform(name: "testTransform"))
        }
    }
    
    @Suite("caching")
    struct CachingTests {
        
        var evaluator: JexEvaluator!
        
        init() throws {
            self.evaluator = try makeEvaluator()
        }
        
        
        @Test("should enable expression caching")
        func testEnableExpressionCaching() {
            evaluator.setCacheExpressions(true)
            #expect(evaluator.getCacheExpressions())
        }
        
        @Test("should disable expression caching")
        func testDisableExpressionCaching() {
            evaluator.setCacheExpressions(true)
            evaluator.setCacheExpressions(false)
            #expect(!evaluator.getCacheExpressions())
        }
        
        @Test("should cache parsed expressions when enabled")
        func testCacheParsedExpressions() throws {
            evaluator.setCacheExpressions(true)
            let expr = "2 + 3"
            
            // First evaluation parses and caches
            #expect(try evaluator.evaluate(expr: expr) as! Int == 5)
            
            // Second evaluation should hit cache
            #expect(try evaluator.evaluate(expr: expr) as! Int == 5)
        }
        
        @Test("should clear cached parsed expressions")
        func testClearCachedParsedExpressions() throws {
            evaluator.setCacheExpressions(true)
            _ = try evaluator.evaluate(expr: "2 + 3")
            
            evaluator.clearCachedParsedExpression()
            
            // After clearing, evaluation still works
            #expect(try evaluator.evaluate(expr: "2 + 3") as! Int == 5)
        }
    }
    
    @Suite("error handling")
    struct nameErrorHandlingTests {
        
        var evaluator: JexEvaluator!
        
        init() throws {
            self.evaluator = try makeEvaluator()
        }
        
        @Test("should throw syntax errors for invalid expressions")
        func testSyntaxErrors() {
            #expect(throws: ExceptionError.self) {
                try evaluator.evaluate(expr: "2 +")
            }
            #expect(throws: ExceptionError.self) {
                try evaluator.evaluate(expr: "(")
            }
        }
        
        @Test("should handle multiple syntax errors")
        func testMultipleSyntaxErrors() async throws {
            #expect(throws: ExceptionError.self, performing: {
                try evaluator.evaluate(expr: "(((")
            })
        }
    }
    
    @Suite("integration tests")
    struct IntegrationTests {
        
        var evaluator: JexEvaluator!
        
        init() throws {
            self.evaluator = try makeEvaluator()
        }
        
        @Test("should handle complex expressions")
        func testComplexExpressions() throws {
            #expect(try evaluator.evaluate(expr: "(10 + 5) * 2 - 3") as! Int == 27)
        }
        
        @Test("should work with variables and functions together")
        func testVariablesAndFunctions() throws {
            // Declare and set variable
            try evaluator.declareContextValue("x", value: 0, isConst: false)
            try evaluator.setContextValue("x", 5)
            
            // Add a function: double(val) => val * 2
            evaluator.addFunction(name: "double") { ctx, args in
                let val = toNumber(value: args[0], ctx: "bracket property assignment")
                return JexValueFactory.from(val.int64Value * 2)
            }
            
            #expect(try evaluator.evaluate(expr: "double(x) + 10") as! Int == 20)
        }
        
        @Test("should support chained operations")
        func testChainedOperations() throws {
            // Declare and set an array variable
            
            try evaluator.declareContextValue("arr", value: 0, isConst: false)
            try evaluator.setContextValue("arr", ["a", "b", "c"])
            
            // Assuming evaluator has a built-in `length` function for arrays
            #expect(try evaluator.evaluate(expr: "length(arr)") as! Int == 3)
        }
    }
    
    @Suite("additive expressions")
    struct AdditiveExpressionsTests {

        let evaluator = try! JexEvaluator()

        @Test("simple addition")
        func testSimpleAddition() throws {
            #expect(try evaluator.evaluate(expr: "1 + 2") as? Int == 3)
        }

        @Test("addition with negative number")
        func testAdditionWithNegative() throws {
            #expect(try evaluator.evaluate(expr: "5 + -3") as? Int == 2)
        }

        @Test("multiple additions")
        func testMultipleAdditions() throws {
            #expect(try evaluator.evaluate(expr: "1 + 2 + 3 + 4") as? Int == 10)
        }

        @Test("addition and subtraction")
        func testAdditionAndSubtraction() throws {
            #expect(try evaluator.evaluate(expr: "10 + 5 - 3 + 2 - 1") as? Int == 13)
        }

        @Test("addition with parentheses")
        func testAdditionWithParentheses() throws {
            #expect(try evaluator.evaluate(expr: "(1 + 2) + (3 + 4)") as? Int == 10)
        }

        @Test("string and number addition")
        func testStringAndNumberAddition() throws {
            #expect(try evaluator.evaluate(expr: "\"The answer is: \" + 42") as? String == "The answer is: 42")
            #expect(try evaluator.evaluate(expr: "42 + \" is the answer\"") as? String == "42 is the answer")
            #expect(try evaluator.evaluate(expr: "\"10\" + 5") as? String == "105")
            #expect(try evaluator.evaluate(expr: "5 + \"10\"") as? String == "510")
            #expect(try evaluator.evaluate(expr: "\"1\" + 100 + \"0\"") as? String == "11000")
            #expect(try evaluator.evaluate(expr: "\"2.0\" + 3.5") as? String == "2.03.5")
            #expect(try evaluator.evaluate(expr: "3.5 + \"2.0\"") as? String == "3.52.0")
            #expect(try evaluator.evaluate(expr: "\"2.0\" + 2 + 100") as? String == "2.02100")
            #expect(try evaluator.evaluate(expr: "2 + 2 + \"2.0\"") as? String == "42.0")
            #expect(try evaluator.evaluate(expr: "\"2.0\" + (2 + 100)") as? String == "2.0102")
        }

        @Test("string concatenation")
        func testStringConcatenation() throws {
            #expect(try evaluator.evaluate(expr: "\"Hello, \" + \"world!\"") as? String == "Hello, world!")
            #expect(try evaluator.evaluate(expr: "\"Foo\" + \"Bar\" + \"Baz\"") as? String == "FooBarBaz")
            #expect(try evaluator.evaluate(expr: "\"The answer is: \" + \"42\"") as? String == "The answer is: 42")

            #expect(throws: ExceptionError.self) {
                try evaluator.evaluate(expr: "\"Value: \" - 100")
            }
        }
    }

    @Suite("equality expressions")
    struct EqualityExpressionsTests {

        let evaluator = try! JexEvaluator()

        @Test("null equality and inequality")
        func testNullEquality() throws {
            #expect((try evaluator.evaluate(expr: "null == null")) as! Bool == true)
            #expect((try evaluator.evaluate(expr: "null != null")) as! Bool == false)

            #expect((try evaluator.evaluate(expr: "null == 0")) as! Bool == false)
            #expect((try evaluator.evaluate(expr: "null != 0")) as! Bool == true)

            #expect((try evaluator.evaluate(expr: "null == false")) as! Bool == false)
            #expect((try evaluator.evaluate(expr: "null != false")) as! Bool == true)
        }

        @Test("boolean equality and inequality")
        func testBooleanEquality() throws {
            #expect((try evaluator.evaluate(expr: "true == true")) as! Bool == true)
            #expect((try evaluator.evaluate(expr: "false == false")) as! Bool == true)

            #expect((try evaluator.evaluate(expr: "true != false")) as! Bool == true)
            #expect((try evaluator.evaluate(expr: "false != true")) as! Bool == true)

            #expect((try evaluator.evaluate(expr: "true == false")) as! Bool == false)
            #expect((try evaluator.evaluate(expr: "false == true")) as! Bool == false)
        }

        @Test("boolean with numbers")
        func testBooleanWithNumbers() throws {
            #expect((try evaluator.evaluate(expr: "true == 1")) as! Bool == true)
            #expect((try evaluator.evaluate(expr: "1 == true")) as! Bool == true)

            #expect((try evaluator.evaluate(expr: "true == -1")) as! Bool == false)
            #expect((try evaluator.evaluate(expr: "-1 == true")) as! Bool == false)

            #expect((try evaluator.evaluate(expr: "false == 0")) as! Bool == true)
            #expect((try evaluator.evaluate(expr: "0 == false")) as! Bool == true)

            #expect((try evaluator.evaluate(expr: "true != 0")) as! Bool == true)
            #expect((try evaluator.evaluate(expr: "0 != true")) as! Bool == true)

            #expect((try evaluator.evaluate(expr: "false != 1")) as! Bool == true)
            #expect((try evaluator.evaluate(expr: "1 != false")) as! Bool == true)

            #expect((try evaluator.evaluate(expr: "true == 0")) as! Bool == false)
            #expect((try evaluator.evaluate(expr: "0 == true")) as! Bool == false)

            #expect((try evaluator.evaluate(expr: "false == 1")) as! Bool == false)
            #expect((try evaluator.evaluate(expr: "1 == false")) as! Bool == false)
        }

        @Test("boolean with strings")
        func testBooleanWithStrings() throws {
            
            #expect((try evaluator.evaluate(expr: "true == \"true\"")) as! Bool == false)
            #expect((try evaluator.evaluate(expr: "\"true\" == true")) as! Bool == false)

            #expect((try evaluator.evaluate(expr: "false == \"false\"")) as! Bool == false)
            #expect((try evaluator.evaluate(expr: "\"false\" == false")) as! Bool == false)

            #expect((try evaluator.evaluate(expr: "true != \"false\"")) as! Bool == true)
            #expect((try evaluator.evaluate(expr: "\"false\" != true")) as! Bool == true)

            #expect((try evaluator.evaluate(expr: "false != \"true\"")) as! Bool == true)
            #expect((try evaluator.evaluate(expr: "\"true\" != false")) as! Bool == true)
            
            #expect((try evaluator.evaluate(expr: "true == \"false\"")) as! Bool == false)
            #expect((try evaluator.evaluate(expr: "\"false\" == true")) as! Bool == false)
            
            #expect((try evaluator.evaluate(expr: "false == \"true\"")) as! Bool == false)
            #expect((try evaluator.evaluate(expr: "\"true\" == false")) as! Bool == false)

            #expect((try evaluator.evaluate(expr: "true == \"1\"")) as! Bool == true)
            #expect((try evaluator.evaluate(expr: "\"1\" == true")) as! Bool == true)

            #expect((try evaluator.evaluate(expr: "false == \"0\"")) as! Bool == true)
            #expect((try evaluator.evaluate(expr: "\"0\" == false")) as! Bool == true)

            #expect((try evaluator.evaluate(expr: "true == \"0\"")) as! Bool == false)
            #expect((try evaluator.evaluate(expr: "\"0\" == true")) as! Bool == false)

            #expect((try evaluator.evaluate(expr: "false == \"1\"")) as! Bool == false)
            #expect((try evaluator.evaluate(expr: "\"1\" == false")) as! Bool == false)
        }

        @Test("number equality")
        func testNumberEquality() throws {
            #expect((try evaluator.evaluate(expr: "5 == 5")) as! Bool == true)
            #expect((try evaluator.evaluate(expr: "5 == 3")) as! Bool == false)
        }

        @Test("number inequality")
        func testNumberInequality() throws {
            #expect((try evaluator.evaluate(expr: "5 != 3")) as! Bool == true)
            #expect((try evaluator.evaluate(expr: "5 != 5")) as! Bool == false)
        }

        @Test("string equality")
        func testStringEquality() throws {
            #expect((try evaluator.evaluate(expr: "\"test\" == \"test\"")) as! Bool == true)
            #expect((try evaluator.evaluate(expr: "\"test\" == \"TEST\"")) as! Bool == false)
        }

        @Test("string inequality")
        func testStringInequality() throws {
            #expect((try evaluator.evaluate(expr: "\"hello\" != \"world\"")) as! Bool == true)
            #expect((try evaluator.evaluate(expr: "\"hello\" != \"hello\"")) as! Bool == false)
        }

        @Test("mixed equality")
        func testMixedEquality() throws {
            #expect((try evaluator.evaluate(expr: "5 == \"5\"")) as! Bool == true)
            #expect((try evaluator.evaluate(expr: "\"5\" == 5")) as! Bool == true)
            #expect((try evaluator.evaluate(expr: "0 == false")) as! Bool == true)
        }

        @Test("mixed inequality")
        func testMixedInequality() throws {
            #expect((try evaluator.evaluate(expr: "5 != \"5\"")) as! Bool == false)
            #expect((try evaluator.evaluate(expr: "\"5\" != 5")) as! Bool == false)
            #expect((try evaluator.evaluate(expr: "0 != false")) as! Bool == false)
        }
    }

}

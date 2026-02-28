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
            var context = [String: Any]()
            context["x"] = 10
            context["y"] = 20
            
            let evaluator = try JexEvaluator(
                context: context
            )
            #expect(evaluator.getContextValue("x") as? Int == 10)
            #expect(evaluator.getContextValue("y") as? Int == 20)
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
            #expect(try evaluator.evaluate(expr: "42") as? Int == 42)
            #expect(try evaluator.evaluate(expr: "true") as? Bool == true)
            #expect(try evaluator.evaluate(expr: "\"hello\"") as? String == "hello")
            #expect(try evaluator.evaluate(expr: "null") as? NSNull == nil)
        }
        
        @Test("hould evaluate arithmetic expressions")
        func testEvaluate_Arithmetic() throws {
            #expect(try evaluator.evaluate(expr: "2 + 3") as? Int == 5)
            #expect(try evaluator.evaluate(expr: "10 - 4") as? Int == 6)
            #expect(try evaluator.evaluate(expr: "5 * 3") as? Int == 15)
            #expect(try evaluator.evaluate(expr: "10 / 2") as? Int == 5)
        }
        
        @Test("should evaluate with program scope context")
        func testEvaluate_ProgramScopeContext() throws {
            
            let result = try evaluator.evaluate(expr: "x + y", programScopeVariables: [
                "x": 5,
                "y": 10
            ]) as? Int;
            
            #expect(result == 15)
        }
        
        @Test("should handle context variables")
        func testEvaluate_ContextVariables() throws {
            try evaluator.declareContextValue("value", value: 0, isConst: false);
            
            try evaluator.setContextValue("value", 100);
            
            #expect(try evaluator.evaluate(expr: "value") as? Int == 100)
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
            #expect(try evaluator.evaluate(expr: "2 + 3") as? Int == 5)
        }
        
        @Test("should work with program scope context")
        func testEvaluate_AsyncFunctionWithContext() throws {
            let ctx = [
                "a": 4,
                "b": 5
            ]
            
            let result = try evaluator.evaluate(expr: "a * b", programScopeVariables: ctx) as? Int;
            
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
            #expect(evaluator.getContextValue("key") as? String == "initial")
            
            // set new value
            try evaluator.setContextValue("key", "value")
            #expect(evaluator.getContextValue("key") as? String == "value")
        }
        
        @Test("should throw error when setting undeclared variable")
        func testSetContextValueThrowsForUndeclared() {
            #expect(throws: ExceptionError.self, performing: {
                try evaluator.setContextValue("undeclared", "value")
            })
        }
        
        @Test("should declare context value")
        func testDeclareContextValue() throws {
            try evaluator.declareContextValue("newVar", value: 42)
            #expect(evaluator.getContextValue("newVar") as? Int == 42)
        }
        
        @Test("should declare const context value and reject reassignment")
        func testDeclareConstContextValue() throws {
            try evaluator.declareContextValue("constVar", value: 100, isConst: true)
            #expect(evaluator.getContextValue("constVar") as? Int == 100)
            
            // reassign should fail
            #expect(throws: ExceptionError.self, performing: {
                try evaluator.setContextValue("constVar", 200)
            })
        }
        
        @Test("should set or declare context value")
        func testSetOrDeclareContextValue() async throws {
            // declare new
            try evaluator.setContextOrDeclareContextValue("var1", 10)
            #expect(evaluator.getContextValue("var1") as? Int == 10)
            
            // update existing
            try evaluator.setContextOrDeclareContextValue("var1", 20)
            #expect(evaluator.getContextValue("var1") as? Int == 20)
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
            
            #expect(vars["PI"] as? Double == Double.pi)
            #expect(vars["E"] as? Double == Darwin.M_E)
            
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
            #expect(try evaluator.evaluate(expr: expr) as? Int == 5)
            
            // Second evaluation should hit cache
            #expect(try evaluator.evaluate(expr: expr) as? Int == 5)
        }
        
        @Test("should clear cached parsed expressions")
        func testClearCachedParsedExpressions() throws {
            evaluator.setCacheExpressions(true)
            _ = try evaluator.evaluate(expr: "2 + 3")
            
            evaluator.clearCachedParsedExpression()
            
            // After clearing, evaluation still works
            #expect(try evaluator.evaluate(expr: "2 + 3") as? Int == 5)
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
            #expect(try evaluator.evaluate(expr: "(10 + 5) * 2 - 3") as? Int == 27)
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
            
            #expect(try evaluator.evaluate(expr: "double(x) + 10") as? Int == 20)
        }
        
        @Test("should support chained operations")
        func testChainedOperations() throws {
            // Declare and set an array variable
            
            try evaluator.declareContextValue("arr", value: 0, isConst: false)
            try evaluator.setContextValue("arr", ["a", "b", "c"])
            
            // Assuming evaluator has a built-in `length` function for arrays
            #expect(try evaluator.evaluate(expr: "length(arr)") as? Int == 3)
        }
    }
    
    @Suite("additive expressions")
    struct AdditiveExpressionsTests {

        var evaluator: JexEvaluator!
        
        init() throws {
            self.evaluator = try makeEvaluator()
        }

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

        var evaluator: JexEvaluator!
        
        init() throws {
            self.evaluator = try makeEvaluator()
        }

        @Test("null equality and inequality")
        func testNullEquality() throws {
            #expect((try evaluator.evaluate(expr: "null == null")) as? Bool == true)
            #expect((try evaluator.evaluate(expr: "null != null")) as? Bool == false)

            #expect((try evaluator.evaluate(expr: "null == 0")) as? Bool == false)
            #expect((try evaluator.evaluate(expr: "null != 0")) as? Bool == true)

            #expect((try evaluator.evaluate(expr: "null == false")) as? Bool == false)
            #expect((try evaluator.evaluate(expr: "null != false")) as? Bool == true)
        }

        @Test("boolean equality and inequality")
        func testBooleanEquality() throws {
            #expect((try evaluator.evaluate(expr: "true == true")) as? Bool == true)
            #expect((try evaluator.evaluate(expr: "false == false")) as? Bool == true)

            #expect((try evaluator.evaluate(expr: "true != false")) as? Bool == true)
            #expect((try evaluator.evaluate(expr: "false != true")) as? Bool == true)

            #expect((try evaluator.evaluate(expr: "true == false")) as? Bool == false)
            #expect((try evaluator.evaluate(expr: "false == true")) as? Bool == false)
        }

        @Test("boolean with numbers")
        func testBooleanWithNumbers() throws {
            #expect((try evaluator.evaluate(expr: "true == 1")) as? Bool == true)
            #expect((try evaluator.evaluate(expr: "1 == true")) as? Bool == true)

            #expect((try evaluator.evaluate(expr: "true == -1")) as? Bool == false)
            #expect((try evaluator.evaluate(expr: "-1 == true")) as? Bool == false)

            #expect((try evaluator.evaluate(expr: "false == 0")) as? Bool == true)
            #expect((try evaluator.evaluate(expr: "0 == false")) as? Bool == true)

            #expect((try evaluator.evaluate(expr: "true != 0")) as? Bool == true)
            #expect((try evaluator.evaluate(expr: "0 != true")) as? Bool == true)

            #expect((try evaluator.evaluate(expr: "false != 1")) as? Bool == true)
            #expect((try evaluator.evaluate(expr: "1 != false")) as? Bool == true)

            #expect((try evaluator.evaluate(expr: "true == 0")) as? Bool == false)
            #expect((try evaluator.evaluate(expr: "0 == true")) as? Bool == false)

            #expect((try evaluator.evaluate(expr: "false == 1")) as? Bool == false)
            #expect((try evaluator.evaluate(expr: "1 == false")) as? Bool == false)
        }

        @Test("boolean with strings")
        func testBooleanWithStrings() throws {
            
            #expect((try evaluator.evaluate(expr: "true == \"true\"")) as? Bool == false)
            #expect((try evaluator.evaluate(expr: "\"true\" == true")) as? Bool == false)

            #expect((try evaluator.evaluate(expr: "false == \"false\"")) as? Bool == false)
            #expect((try evaluator.evaluate(expr: "\"false\" == false")) as? Bool == false)

            #expect((try evaluator.evaluate(expr: "true != \"false\"")) as? Bool == true)
            #expect((try evaluator.evaluate(expr: "\"false\" != true")) as? Bool == true)

            #expect((try evaluator.evaluate(expr: "false != \"true\"")) as? Bool == true)
            #expect((try evaluator.evaluate(expr: "\"true\" != false")) as? Bool == true)
            
            #expect((try evaluator.evaluate(expr: "true == \"false\"")) as? Bool == false)
            #expect((try evaluator.evaluate(expr: "\"false\" == true")) as? Bool == false)
            
            #expect((try evaluator.evaluate(expr: "false == \"true\"")) as? Bool == false)
            #expect((try evaluator.evaluate(expr: "\"true\" == false")) as? Bool == false)

            #expect((try evaluator.evaluate(expr: "true == \"1\"")) as? Bool == true)
            #expect((try evaluator.evaluate(expr: "\"1\" == true")) as? Bool == true)

            #expect((try evaluator.evaluate(expr: "false == \"0\"")) as? Bool == true)
            #expect((try evaluator.evaluate(expr: "\"0\" == false")) as? Bool == true)

            #expect((try evaluator.evaluate(expr: "true == \"0\"")) as? Bool == false)
            #expect((try evaluator.evaluate(expr: "\"0\" == true")) as? Bool == false)

            #expect((try evaluator.evaluate(expr: "false == \"1\"")) as? Bool == false)
            #expect((try evaluator.evaluate(expr: "\"1\" == false")) as? Bool == false)
        }

        @Test("number equality")
        func testNumberEquality() throws {
            #expect((try evaluator.evaluate(expr: "5 == 5")) as? Bool == true)
            #expect((try evaluator.evaluate(expr: "5 == 3")) as? Bool == false)
        }

        @Test("number inequality")
        func testNumberInequality() throws {
            #expect((try evaluator.evaluate(expr: "5 != 3")) as? Bool == true)
            #expect((try evaluator.evaluate(expr: "5 != 5")) as? Bool == false)
        }

        @Test("string equality")
        func testStringEquality() throws {
            #expect((try evaluator.evaluate(expr: "\"test\" == \"test\"")) as? Bool == true)
            #expect((try evaluator.evaluate(expr: "\"test\" == \"TEST\"")) as? Bool == false)
        }

        @Test("string inequality")
        func testStringInequality() throws {
            #expect((try evaluator.evaluate(expr: "\"hello\" != \"world\"")) as? Bool == true)
            #expect((try evaluator.evaluate(expr: "\"hello\" != \"hello\"")) as? Bool == false)
        }

        @Test("mixed equality")
        func testMixedEquality() throws {
            #expect((try evaluator.evaluate(expr: "5 == \"5\"")) as? Bool == true)
            #expect((try evaluator.evaluate(expr: "\"5\" == 5")) as? Bool == true)
            #expect((try evaluator.evaluate(expr: "0 == false")) as? Bool == true)
        }

        @Test("mixed inequality")
        func testMixedInequality() throws {
            #expect((try evaluator.evaluate(expr: "5 != \"5\"")) as? Bool == false)
            #expect((try evaluator.evaluate(expr: "\"5\" != 5")) as? Bool == false)
            #expect((try evaluator.evaluate(expr: "0 != false")) as? Bool == false)
        }
        
        @Test("array equality with Lists")
        func testArrayEquality() throws {
            #expect((try evaluator.evaluate(expr: "[1, 2, 3] == [1, 2, 3]") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "[1, 2, 3] == [1, 2, 4]") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "[1, 2, 3] != [1, 2, 4]") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "[1, 2, 3] != [1, 2, 3]") as? Bool) == true)
            
            // reference equality
            let list = [1, 2, 3]
            let jexArrayList = JexValueFactory.fromArray(value: list)
            try evaluator.declareContextValue("list", value: jexArrayList, isConst: false)
            #expect(try evaluator.evaluate(expr: "list == list") as? Bool == true)
            try evaluator.declareContextValue("plainList", value: list, isConst: false)
            #expect(try evaluator.evaluate(expr: "plainList == plainList") as? Bool == true)
            
            let list2 = [1, 2, 3]
            let jexArrayList2 = JexValueFactory.fromArray(value: list)
            try evaluator.declareContextValue("list2", value: jexArrayList2, isConst: false)
            #expect(try evaluator.evaluate(expr: "list != list2") as? Bool == true)
            try evaluator.declareContextValue("plainList2", value: list2, isConst: false)
            #expect(try evaluator.evaluate(expr: "plainList != plainList2") as? Bool == true)
            
            try evaluator.declareContextValue("list3", value: jexArrayList, isConst: false)
            #expect(try evaluator.evaluate(expr: "list == list3") as? Bool == true)
            
            try evaluator.declareContextValue("plainList3", value: list)
            #expect(try evaluator.evaluate(expr: "plainList == plainList3") as? Bool == false)
        }
        
        @Test("object equality with Maps")
        func testObjectEquality() throws {

            // value equality (objects are NOT deeply equal)
            #expect((try evaluator.evaluate(expr: "{\"a\":1,\"b\":2} == {\"a\":1,\"b\":2}") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "{\"a\":1,\"b\":2} == {\"a\":1,\"b\":3}") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "{\"a\":1,\"b\":2} != {\"a\":1,\"b\":3}") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "{\"a\":1,\"b\":2} != {\"a\":1,\"b\":2}") as? Bool) == true)

            // reference equality — JexObject
            let obj: [String: Any] = [
                "a": 1,
                "b": 2
            ]
            let jexObject = JexValueFactory.fromObject(value: obj)

            try evaluator.declareContextValue("obj", value: jexObject, isConst: false)
            #expect(try evaluator.evaluate(expr: "obj == obj") as? Bool == true)

            // reference equality — plain Swift dictionary
            try evaluator.declareContextValue("hashObj", value: obj, isConst: false)
            #expect(try evaluator.evaluate(expr: "hashObj == hashObj") as? Bool == true)

            // different instances with same values
            let obj2: [String: Any] = [
                "a": 1,
                "b": 2
            ]
            let jexObject2 = JexValueFactory.fromObject(value: obj2)

            try evaluator.declareContextValue("obj2", value: jexObject2, isConst: false)
            #expect(try evaluator.evaluate(expr: "obj != obj2") as? Bool == true)

            try evaluator.declareContextValue("hashObj2", value: obj2, isConst: false)
            #expect(try evaluator.evaluate(expr: "hashObj != hashObj2") as? Bool == true)

            // same reference again
            try evaluator.declareContextValue("obj3", value: jexObject, isConst: false)
            #expect(try evaluator.evaluate(expr: "obj == obj3") as? Bool == true)

            try evaluator.declareContextValue("hashObj3", value: obj, isConst: false)
            #expect(try evaluator.evaluate(expr: "hashObj == hashObj3") as? Bool == false)
        }

    }
    
    @Suite("logical expressions")
    struct LogicalExpressionsTests {
        
        var evaluator: JexEvaluator!
        
        init() throws {
            self.evaluator = try makeEvaluator()
        }

        @Test("logical AND operator")
        func testLogicalAnd() throws {
            #expect((try evaluator.evaluate(expr: "true && true") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "true && false") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "false && true") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "false && false") as? Bool) == false)

            #expect((try evaluator.evaluate(expr: "true and true") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "true and false") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "false and true") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "false and false") as? Bool) == false)
        }

        @Test("logical OR operator")
        func testLogicalOr() throws {
            #expect((try evaluator.evaluate(expr: "true || true") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "true || false") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "false || true") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "false || false") as? Bool) == false)

            #expect((try evaluator.evaluate(expr: "true or true") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "true or false") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "false or true") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "false or false") as? Bool) == false)
        }

        @Test("logical operators with non-boolean values")
        func testLogicalOperatorsWithNonBoolean() throws {
            #expect((try evaluator.evaluate(expr: "1 && 0") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "1 || 0") as? Bool) == true)

            #expect((try evaluator.evaluate(expr: "\"hello\" && \"\"") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "\"hello\" || \"\"") as? Bool) == true)

            #expect((try evaluator.evaluate(expr: "0 and 1") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "0 or 1") as? Bool) == true)

            #expect((try evaluator.evaluate(expr: "\"\" and \"hello\"") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "\"\" or \"hello\"") as? Bool) == true)
        }

        @Test("combined logical expressions")
        func testCombinedLogicalExpressions() throws {
            #expect((try evaluator.evaluate(expr: "true && false || true") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "false || false && true") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "(true || false) && (false || true)") as? Bool) == true)

            #expect((try evaluator.evaluate(expr: "true and false or true") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "false or false and true") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "(true or false) and (false or true)") as? Bool) == true)
        }
    }

    @Suite("relational expressions")
    struct RelationalExpressionsTests {
        
        var evaluator: JexEvaluator!
        
        init() throws {
            self.evaluator = try makeEvaluator()
        }

        @Test("greater than operator")
        func testGreaterThan() throws {
            #expect((try evaluator.evaluate(expr: "5 > 3") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "2 > 4") as? Bool) == false)
        }

        @Test("less than operator")
        func testLessThan() throws {
            #expect((try evaluator.evaluate(expr: "3 < 5") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "4 < 2") as? Bool) == false)
        }

        @Test("greater than or equal operator")
        func testGreaterThanOrEqual() throws {
            #expect((try evaluator.evaluate(expr: "5 >= 5") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "6 >= 4") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "3 >= 7") as? Bool) == false)
        }

        @Test("less than or equal operator")
        func testLessThanOrEqual() throws {
            #expect((try evaluator.evaluate(expr: "5 <= 5") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "4 <= 6") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "7 <= 3") as? Bool) == false)
        }

        @Test("relational operators with strings")
        func testRelationalOperatorsWithStrings() throws {
            #expect((try evaluator.evaluate(expr: "\"apple\" < \"banana\"") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "\"grape\" > \"orange\"") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "\"cat\" <= \"cat\"") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "\"dog\" >= \"elephant\"") as? Bool) == false)
        }

        @Test("numbers and strings comparison")
        func testNumbersAndStringsComparison() throws {
            #expect((try evaluator.evaluate(expr: "5 > \"3\"") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "\"4\" < 6") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "7 >= \"7\"") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "\"8\" <= 10") as? Bool) == true)
        }

        @Test("stringified numbers comparison")
        func testStringifiedNumbersComparison() throws {
            #expect((try evaluator.evaluate(expr: "\"10\" > \"2\"") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "\"3\" < \"12\"") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "\"5\" >= \"5\"") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "\"7\" <= \"6\"") as? Bool) == false)
        }

        @Test("numbers, strings and booleans comparison")
        func testNumbersStringsAndBooleansComparison() throws {
            #expect((try evaluator.evaluate(expr: "1 < \"2\"") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "\"3\" > 2") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "0 <= \"0\"") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "\"1\" >= 2") as? Bool) == false)

            #expect((try evaluator.evaluate(expr: "true > \"0\"") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "\"1\" < false") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "false <= \"0\"") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "\"1\" >= true") as? Bool) == true)
        }
    }
    
    @Suite("multiplicative expressions")
    struct MultiplicativeExpressionsTests {
        
        var evaluator: JexEvaluator!
        
        init() throws {
            self.evaluator = try makeEvaluator()
        }

        @Test("simple multiplication")
        func testSimpleMultiplication() throws {
            #expect((try evaluator.evaluate(expr: "2 * 3") as? Int) == 6)
        }

        @Test("simple division")
        func testSimpleDivision() throws {
            #expect((try evaluator.evaluate(expr: "8 / 2") as? Int) == 4)
        }

        @Test("multiplication and division")
        func testMultiplicationAndDivision() throws {
            #expect((try evaluator.evaluate(expr: "10 * 2 / 5 * 3") as? Int) == 12)
        }

        @Test("multiplicative expressions with parentheses")
        func testMultiplicativeExpressionsWithParentheses() throws {
            #expect((try evaluator.evaluate(expr: "(2 + 3) * (4 - 1) / 5") as? Int) == 3)
        }
    }

    @Suite("unary expressions")
    struct UnaryExpressionsTests {
        
        var evaluator: JexEvaluator!
        
        init() throws {
            self.evaluator = try makeEvaluator()
        }

        @Test("unary plus operator")
        func testUnaryPlusOperator() throws {
            #expect((try evaluator.evaluate(expr: "+5") as? Int) == 5)
            #expect((try evaluator.evaluate(expr: "+-3") as? Int) == -3)
        }

        @Test("unary minus operator")
        func testUnaryMinusOperator() throws {
            #expect((try evaluator.evaluate(expr: "-5") as? Int) == -5)
            #expect((try evaluator.evaluate(expr: "-(-3)") as? Int) == 3)
        }

        @Test("logical NOT operator")
        func testLogicalNotOperator() throws {
            #expect((try evaluator.evaluate(expr: "!true") as? Bool) == false)
            #expect((try evaluator.evaluate(expr: "!false") as? Bool) == true)
        }
    }
    
    @Suite("square root expressions")
    struct SquareRootExpressionsTests {
        
        var evaluator: JexEvaluator!
        
        init() throws {
            self.evaluator = try makeEvaluator()
        }

        @Test("square root of a positive number")
        func testSquareRootOfPositiveNumber() throws {
            #expect((try evaluator.evaluate(expr: "sqrt(16)") as? Int) == 4)
            #expect((try evaluator.evaluate(expr: "sqrt(2.25)") as? Double) == 1.5)

            #expect((try evaluator.evaluate(expr: "√16") as? Int) == 4)
            #expect((try evaluator.evaluate(expr: "√2.25") as? Double) == 1.5)
            #expect((try evaluator.evaluate(expr: "√100") as? Int) == 10)
        }

        @Test("square root of zero")
        func testSquareRootOfZero() throws {
            #expect((try evaluator.evaluate(expr: "sqrt(0)") as? Int) == 0)
            #expect((try evaluator.evaluate(expr: "√0") as? Int) == 0)
        }

        @Test("square root of a negative number")
        func testSquareRootOfNegativeNumber() throws {
            #expect(throws: ExceptionError.self) {
                try evaluator.evaluate(expr: "sqrt(-4)")
            }

            #expect(throws: ExceptionError.self) {
                try evaluator.evaluate(expr: "√-9")
            }
        }
    }
    
    @Suite("literal expressions")
    struct LiteralExpressionsTests {
        
        var evaluator: JexEvaluator!
        
        init() throws {
            self.evaluator = try makeEvaluator()
        }

        @Test("should evaluate numeric literals")
        func testNumericLiterals() throws {
            #expect((try evaluator.evaluate(expr: "123") as? Int) == 123)
            #expect((try evaluator.evaluate(expr: "45.67") as? Double) == 45.67)
        }

        @Test("should evaluate string literals")
        func testStringLiterals() throws {
            #expect((try evaluator.evaluate(expr: "\"hello\"") as? String) == "hello")
            #expect((try evaluator.evaluate(expr: "'world'") as? String) == "world")

            #expect((try evaluator.evaluate(expr: "\"true\"") as? String) == "true")
            #expect((try evaluator.evaluate(expr: "\"false\"") as? String) == "false")
        }

        @Test("should evaluate boolean literals")
        func testBooleanLiterals() throws {
            #expect((try evaluator.evaluate(expr: "true") as? Bool) == true)
            #expect((try evaluator.evaluate(expr: "false") as? Bool) == false)
        }

        @Test("should evaluate null literal")
        func testNullLiteral() throws {
            let result = try evaluator.evaluate(expr: "null") as? NSNull
            #expect(result == nil)
        }

        @Test("should evaluate array literals")
        func testArrayLiterals() throws {
            
            #expect((try evaluator.evaluate(expr: "[1, 2, 3]") as? [Int]) == [1, 2, 3])
            #expect((try evaluator.evaluate(expr: "[\"a\", \"b\", \"c\"]") as? [String]) == ["a", "b", "c"])

            let dynamicArray: [Any?] = [10, "test", true, nil]
            try evaluator.declareContextValue("dynamicArray", value: dynamicArray, isConst: false)

            let evaluatedArray =
                try evaluator.evaluate(
                    expr: "[dynamicArray[0], dynamicArray[1], dynamicArray[2], dynamicArray[3]]"
                ) as? [Any?]
            #expect(deepEqual(evaluatedArray, dynamicArray))

            let index1 = 0
            let index2 = 1
            let index3 = 2
            let index4 = 3

            try evaluator.declareContextValue("index1", value: index1, isConst: false)
            try evaluator.declareContextValue("index2", value: index2, isConst: false)
            try evaluator.declareContextValue("index3", value: index3, isConst: false)
            try evaluator.declareContextValue("index4", value: index4, isConst: false)

            let evaluatedArrayWithIndexes =
                try evaluator.evaluate(
                    expr: """
                    [
                        dynamicArray[index1],
                        dynamicArray[index2],
                        dynamicArray[index3],
                        dynamicArray[index4]
                    ]
                    """
                ) as? [Any?]

            #expect(deepEqual(evaluatedArrayWithIndexes, dynamicArray))
        }

        @Test("should evaluate object literals")
        func testObjectLiterals() throws {

            let expected1: [String: Any] = [
                "key": "value",
                "num": 42
            ]

            let result1 =
                try evaluator.evaluate(
                    expr: #"{"key": "value", "num": 42}"#
                ) as? [String: Any]

            #expect(deepEqual(result1, expected1))

            let expected2: [String: Any] = [
                "a": 1,
                "b": 2,
                "c": 3
            ]

            let result2 =
                try evaluator.evaluate(
                    expr: #"{"a": 1, "b": 2, "c": 3}"#
                ) as? [String: Any]

            #expect(deepEqual(result2, expected2))

            let dynamicObject: [String: Any] = [
                "name": "Test",
                "value": 100,
                "isActive": true,
                "computed": true
            ]

            let isValueKeyValue = 100
            let isActiveKey = "isActive"
            let computed = true

            try evaluator.declareContextValue("dynamicObject", value: dynamicObject, isConst: false)
            try evaluator.declareContextValue("isValueKeyValue", value: isValueKeyValue, isConst: false)
            try evaluator.declareContextValue("isActiveKey", value: isActiveKey, isConst: false)
            try evaluator.declareContextValue("computed", value: computed, isConst: false)

            let objLiteral = """
            {
                "name": dynamicObject.name,
                "value": isValueKeyValue,
                [isActiveKey]: dynamicObject.isActive,
                computed
            }
            """

            let evaluatedObject =
                try evaluator.evaluate(expr: objLiteral) as? [String: Any]

            #expect(deepEqual(evaluatedObject, dynamicObject))
        }
    }

    @Suite("Member Expressions")
    struct MemberExpressionsTests {

        var evaluator: JexEvaluator

        init() throws {
            self.evaluator = try JexEvaluator()
        }

        // MARK: - Object member access
        @Test("should access object properties")
        func testAccessObjectProperties() throws {

            let obj: [String: Any?] = [
                "a": 1,
                "b": 2,
                "c": 3
            ]

            try evaluator.declareContextValue("obj", value: obj, isConst: false)

            #expect(try evaluator.evaluate(expr: "obj.a") as? Int == 1)
            #expect(try evaluator.evaluate(expr: "obj.b") as? Int == 2)
            #expect(try evaluator.evaluate(expr: "obj.c") as? Int == 3)

            let dynamicKey = "b"
            try evaluator.declareContextValue("dynamicKey", value: dynamicKey, isConst: false)

            #expect(try evaluator.evaluate(expr: "obj[dynamicKey]") as? Int == 2)
        }

        // MARK: - Array element access
        @Test("should access array elements")
        func testAccessArrayElements() throws {

            let arr: [Any?] = [10, 20, 30, 40]
            try evaluator.declareContextValue("arr", value: arr, isConst: false)

            #expect(try evaluator.evaluate(expr: "arr[0]") as? Int == 10)
            #expect(try evaluator.evaluate(expr: "arr[1]") as? Int == 20)
            #expect(try evaluator.evaluate(expr: "arr[2]") as? Int == 30)
            #expect(try evaluator.evaluate(expr: "arr[3]") as? Int == 40)
            #expect(try evaluator.evaluate(expr: "arr[4]") as? NSNull == nil)

            // negative indexing
            #expect(try evaluator.evaluate(expr: "arr[-1]") as? Int == 40)
            #expect(try evaluator.evaluate(expr: "arr[-2]") as? Int == 30)
            #expect(try evaluator.evaluate(expr: "arr[-3]") as? Int == 20)
            #expect(try evaluator.evaluate(expr: "arr[-4]") as? Int == 10)
            #expect(try evaluator.evaluate(expr: "arr[-5]") as? NSNull == nil)

            let index = 2
            try evaluator.declareContextValue("index", value: index, isConst: false)

            #expect(try evaluator.evaluate(expr: "arr[index]") as? Int == 30)
        }
    }
    
    @Suite("Complex Member Access Expressions")
    struct ComplexMemberAccessExpressionsTests {

        var evaluator: JexEvaluator

        init() throws {
            self.evaluator = try JexEvaluator()
        }

        // MARK: - Nested object properties

        @Test("should access nested object properties")
        func testAccessNestedObjectProperties() throws {

            let address: [String: Any?] = [
                "city": "New York",
                "zip": 10001
            ]

            let user: [String: Any?] = [
                "name": "John",
                "address": address
            ]

            let obj: [String: Any?] = [
                "user": user
            ]

            try evaluator.declareContextValue("obj", value: obj, isConst: false)

            #expect(try evaluator.evaluate(expr: "obj.user.name") as? String == "John")
            #expect(try evaluator.evaluate(expr: "obj.user.address.city") as? String == "New York")
            #expect(try evaluator.evaluate(expr: "obj.user.address.zip") as? Int == 10001)
        }

        // MARK: - Nested array elements

        @Test("should access nested array elements")
        func testAccessNestedArrayElements() throws {

            let arr: [[Any?]] = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ]

            try evaluator.declareContextValue("arr", value: arr, isConst: false)

            #expect(try evaluator.evaluate(expr: "arr[0][0]") as? Int == 1)
            #expect(try evaluator.evaluate(expr: "arr[1][2]") as? Int == 6)
            #expect(try evaluator.evaluate(expr: "arr[2][1]") as? Int == 8)
            #expect(try evaluator.evaluate(expr: "arr[-1][-1]") as? Int == 9)
        }

        // MARK: - Array of objects

        @Test("should access array of objects")
        func testAccessArrayOfObjects() throws {

            let users: [[String: Any?]] = [
                ["name": "Alice", "age": 25],
                ["name": "Bob", "age": 30],
                ["name": "Charlie", "age": 35]
            ]

            try evaluator.declareContextValue("users", value: users, isConst: false)

            #expect(try evaluator.evaluate(expr: "users[0].name") as? String == "Alice")
            #expect(try evaluator.evaluate(expr: "users[1].age") as? Int == 30)
            #expect(try evaluator.evaluate(expr: "users[2].name") as? String == "Charlie")
            #expect(try evaluator.evaluate(expr: "users[-1].age") as? Int == 35)
        }

        // MARK: - Object with array properties

        @Test("should access object with array properties")
        func testAccessObjectWithArrayProperties() throws {

            let data: [String: Any?] = [
                "scores": [95, 87, 92],
                "names": ["Test1", "Test2", "Test3"]
            ]

            try evaluator.declareContextValue("data", value: data, isConst: false)

            #expect(try evaluator.evaluate(expr: "data.scores[0]") as? Int == 95)
            #expect(try evaluator.evaluate(expr: "data.scores[2]") as? Int == 92)
            #expect(try evaluator.evaluate(expr: "data.names[1]") as? String == "Test2")
            #expect(try evaluator.evaluate(expr: "data.scores[-1]") as? Int == 92)
        }

        // MARK: - Mixed bracket and dot notation

        @Test("should handle mixed bracket and dot notation")
        func testMixedBracketAndDotNotation() throws {

            let item1: [String: Any?] = [
                "id": 1,
                "values": [10, 20, 30]
            ]

            let item2: [String: Any?] = [
                "id": 2,
                "values": [40, 50, 60]
            ]

            let complex: [String: Any?] = [
                "items": [item1, item2]
            ]

            try evaluator.declareContextValue("complex", value: complex, isConst: false)

            #expect(try evaluator.evaluate(expr: "complex.items[0].id") as? Int == 1)
            #expect(try evaluator.evaluate(expr: "complex.items[0].values[1]") as? Int == 20)
            #expect(try evaluator.evaluate(expr: "complex.items[1].values[2]") as? Int == 60)
            #expect(try evaluator.evaluate(expr: "complex[\"items\"][0][\"id\"]") as? Int == 1)
        }

        // MARK: - Expressions inside member access

        @Test("should evaluate expressions within member access")
        func testEvaluateExpressionsWithinMemberAccess() throws {

            let data: [String: Any?] = [
                "values": [100, 200, 300, 400]
            ]

            try evaluator.declareContextValue("data", value: data, isConst: false)
            try evaluator.declareContextValue("idx", value: 1, isConst: false)

            #expect(try evaluator.evaluate(expr: "data.values[1 + 1]") as? Int == 300)
            #expect(try evaluator.evaluate(expr: "data.values[idx]") as? Int == 200)
            #expect(try evaluator.evaluate(expr: "data.values[idx + 2]") as? Int == 400)
        }

        // MARK: - Deeply nested structures

        @Test("should handle deeply nested structures")
        func testHandleDeeplyNestedStructures() throws {

            let deep: [String: Any?] = [
                "level1": [
                    "level2": [
                        "level3": [
                            "array": [
                                ["value": "found"]
                            ]
                        ]
                    ]
                ]
            ]

            try evaluator.declareContextValue("deep", value: deep, isConst: false)

            #expect(
                try evaluator.evaluate(expr: "deep.level1.level2.level3.array[0].value") as? String
                == "found"
            )
        }

        // MARK: - Non-existent nested properties

        @Test("should return nil for non-existent nested properties")
        func testReturnNilForNonExistentNestedProperties() throws {

            let obj: [String: Any?] = [
                "a": ["b": 1]
            ]

            try evaluator.declareContextValue("obj", value: obj, isConst: false)

            #expect(try evaluator.evaluate(expr: "obj.a.c") as? NSNull == nil)
            #expect(try evaluator.evaluate(expr: "obj.x.y.z") as? NSNull == nil)
        }
    }
    
    @Suite("Parenthesized Expressions")
    struct ParenthesizedExpressionsTests {

        var evaluator: JexEvaluator

        init() throws {
            self.evaluator = try JexEvaluator()
        }

        @Test("should evaluate expressions within parentheses")
        func testEvaluateExpressionsWithinParentheses() throws {

            #expect(try evaluator.evaluate(expr: "(2 + 3)") as? Int == 5)
            #expect(try evaluator.evaluate(expr: "((1 + 2) * (3 + 4))") as? Int == 21)
            #expect(try evaluator.evaluate(expr: "((10 - 2) / (4 + 4))") as? Int == 1)
        }
    }
    
    @Suite("Power Expressions")
    struct PowerExpressionsTests {

        var evaluator: JexEvaluator

        init() throws {
            self.evaluator = try JexEvaluator()
        }

        // MARK: - Basic exponentiation

        @Test("should evaluate exponentiation")
        func testEvaluateExponentiation() throws {

            #expect(try evaluator.evaluate(expr: "2 ^ 3") as? Int == 8)
            #expect(try evaluator.evaluate(expr: "5 ^ 0") as? Int == 1)
            #expect(try evaluator.evaluate(expr: "4 ^ 1.5") as? Int == 8)
        }

        // MARK: - Chained exponentiation (right-associative)

        @Test("should handle chained exponentiation")
        func testHandleChainedExponentiation() throws {

            // 2^(3^2) = 2^9 = 512
            #expect(try evaluator.evaluate(expr: "2 ^ 3 ^ 2") as? Int == 512)

            // 3^(2^2) = 3^4 = 81
            #expect(try evaluator.evaluate(expr: "3 ^ 2 ^ 2") as? Int == 81)
        }

        // MARK: - Exponentiation with parentheses

        @Test("should evaluate exponentiation with parentheses")
        func testEvaluateExponentiationWithParentheses() throws {

            // (2^3)^2 = 8^2 = 64
            #expect(try evaluator.evaluate(expr: "(2 ^ 3) ^ 2") as? Int == 64)

            // 2^(3^2) = 2^9 = 512
            #expect(try evaluator.evaluate(expr: "2 ^ (3 ^ 2)") as? Int == 512)
        }
    }
    
    @Suite("Ternary Expressions")
    struct TernaryExpressionsTests {

        var evaluator: JexEvaluator

        init() throws {
            self.evaluator = try JexEvaluator()
        }

        @Test("should evaluate simple ternary expressions")
        func testSimpleTernaryExpressions() throws {
            #expect(try evaluator.evaluate(expr: "true ? 1 : 2") as? Int == 1)
            #expect(try evaluator.evaluate(expr: "false ? 1 : 2") as? Int == 2)
        }

        @Test("should evaluate nested ternary expressions")
        func testNestedTernaryExpressions() throws {
            #expect(try evaluator.evaluate(expr: "true ? (false ? 1 : 2) : 3") as? Int == 2)
            #expect(try evaluator.evaluate(expr: "false ? 1 : (true ? 2 : 3)") as? Int == 2)
        }

        @Test("should handle complex ternary expressions")
        func testComplexTernaryExpressions() throws {
            #expect(try evaluator.evaluate(expr: "(5 > 3) ? (10 + 5) : (20 - 5)") as? Int == 15)
            #expect(try evaluator.evaluate(expr: "(2 + 2 == 5) ? \"yes\" : \"no\"") as? String == "no")
        }

        @Test("should handle ternary expressions with different data types")
        func testTernaryExpressionsWithDifferentDataTypes() throws {
            #expect(try evaluator.evaluate(expr: "true ? 42 : 0") as? Int == 42)
            #expect(try evaluator.evaluate(expr: "false ? 42 : 0") as? Int == 0)
            #expect(try evaluator.evaluate(expr: "true ? \"hello\" : \"world\"") as? String == "hello")
            #expect(try evaluator.evaluate(expr: "false ? \"hello\" : \"world\"") as? String == "world")
            #expect(try evaluator.evaluate(expr: "true ? true : false") as? Bool == true)
            #expect(try evaluator.evaluate(expr: "false ? true : false") as? Bool == false)
            #expect(try evaluator.evaluate(expr: "true ? null : 42") as? NSNull == nil)
            #expect(try evaluator.evaluate(expr: "false ? 42 : null") as? NSNull == nil)

            #expect(deepEqual(try evaluator.evaluate(expr: "true ? [1, 2, 3] : [4, 5, 6]"), [1, 2, 3]))
            #expect(deepEqual(try evaluator.evaluate(expr: "false ? [1, 2, 3] : [4, 5, 6]"), [4, 5, 6]))

            let objA: [String: Any?] = ["a": 1]
            let objB: [String: Any?] = ["b": 2]
            #expect(deepEqual(try evaluator.evaluate(expr: "true ? {\"a\": 1} : {\"b\": 2}"), objA))
            #expect(deepEqual(try evaluator.evaluate(expr: "false ? {\"a\": 1} : {\"b\": 2}"), objB))
        }

        @Test("should handle ternary expressions with mixed data types")
        func testTernaryExpressionsWithMixedDataTypes() throws {
            #expect(try evaluator.evaluate(expr: "true ? 42 : \"string\"") as? Int == 42)
            #expect(try evaluator.evaluate(expr: "false ? 42 : \"string\"") as? String == "string")
            #expect(deepEqual(try evaluator.evaluate(expr: "true ? [1, 2] : {\"a\": 1}"), [1,2]))
            let obj: [String: Any?] = ["a": 1]
            #expect(deepEqual(try evaluator.evaluate(expr: "false ? [1, 2] : {\"a\": 1}"), obj))
            #expect(try evaluator.evaluate(expr: "true ? null : false") as? NSNull == nil)
            #expect(try evaluator.evaluate(expr: "false ? null : false") as? Bool == false)
        }

        @Test("should handle ternary expressions with context variables")
        func testTernaryExpressionsWithContextVariables() throws {
            try evaluator.declareContextValue("x", value: 10, isConst: false)
            try evaluator.declareContextValue("y", value: 20, isConst: false)
            try evaluator.declareContextValue("arr", value: [1,2,3], isConst: false)
            try evaluator.declareContextValue("obj", value: ["name": "test"], isConst: false)

            #expect(try evaluator.evaluate(expr: "x > y ? x : y") as? Int == 20)
            #expect(deepEqual(try evaluator.evaluate(expr: "x < y ? arr : obj"), [1,2,3]))
            #expect(try evaluator.evaluate(expr: "x == 10 ? arr[0] : obj.name") as? Int == 1)
            #expect(try evaluator.evaluate(expr: "y != 20 ? nil : \"found\"") as? String == "found")
        }

        @Test("should handle nested ternary expressions with different data types")
        func testNestedTernaryExpressionsWithDifferentDataTypes() throws {
            #expect(try evaluator.evaluate(expr: "true ? (false ? \"a\" : \"b\") : (true ? \"c\" : \"d\")") as? String == "b")
            #expect(try evaluator.evaluate(expr: "false ? (true ? 1 : 2) : (false ? 3 : 4)") as? Int == 4)
            #expect(deepEqual(try evaluator.evaluate(expr: "true ? (true ? [1] : [2]) : (true ? [3] : [4])"), [1]))
            #expect(deepEqual(try evaluator.evaluate(expr: "false ? nil : (true ? {\"x\": 1} : {\"y\": 2})"), ["x": 1]))
        }

        @Test("should handle ternary expressions with complex conditions")
        func testTernaryExpressionsWithComplexConditions() throws {
            let users: [[String: Any?]] = [
                ["name": "Alice", "age": 25],
                ["name": "Bob", "age": 30]
            ]
            try evaluator.declareContextValue("users", value: users, isConst: false)

            #expect(try evaluator.evaluate(expr: "users[0].age > 20 ? users[0].name : \"unknown\"") as? String == "Alice")
            #expect(try evaluator.evaluate(expr: "users[1].age < 25 ? users[1] : null") as? NSNull == nil)
            #expect(deepEqual(try evaluator.evaluate(expr: "length(users) > 1 ? users : []"), users))
        }

        @Test("should handle ternary expressions with arithmetic operations")
        func testTernaryExpressionsWithArithmeticOperations() throws {
            #expect(try evaluator.evaluate(expr: "5 > 3 ? (10 + 5) : (20 - 5)") as? Int == 15)
            #expect(try evaluator.evaluate(expr: "2 * 3 == 6 ? (100 / 10) : (50 * 2)") as? Int == 10)
            #expect(try evaluator.evaluate(expr: "10 % 2 == 0 ? \"even\" : \"odd\"") as? String == "even")
        }

        @Test("should handle ternary expressions with logical operations")
        func testTernaryExpressionsWithLogicalOperations() throws {
            #expect(try evaluator.evaluate(expr: "true && false ? \"yes\" : \"no\"") as? String == "no")
            #expect(try evaluator.evaluate(expr: "true || false ? 1 : 0") as? Int == 1)
            #expect(deepEqual(try evaluator.evaluate(expr: "!false ? [1, 2] : [3, 4]"), [1,2]))
            #expect(deepEqual(try evaluator.evaluate(expr: "(5 > 3) && (10 < 20) ? {\"result\": true} : {\"result\": false}"), ["result": true]))
        }
    }
    
    @Suite("Elvis Operator")
    struct ElvisOperatorTests {

        var evaluator: JexEvaluator

        init() throws {
            self.evaluator = try JexEvaluator()
        }

        @Test("should return left operand if truthy")
        func testElvisOperatorLeftTruthy() throws {
            #expect(try evaluator.evaluate(expr: "42 ?: 0") as? Int == 42)
            #expect(try evaluator.evaluate(expr: "\"hello\" ?: \"world\"") as? String == "hello")
            #expect(try evaluator.evaluate(expr: "true ?: false") as? Bool == true)
        }

        @Test("should return right operand if left is falsy")
        func testElvisOperatorLeftFalsy() throws {
            #expect(try evaluator.evaluate(expr: "0 ?: 42") as? Int == 42)
            #expect(try evaluator.evaluate(expr: "\"\" ?: \"default\"") as? String == "default")
            #expect(try evaluator.evaluate(expr: "false ?: true") as? Bool == true)
            #expect(try evaluator.evaluate(expr: "null ?: \"fallback\"") as? String == "fallback")
        }

        @Test("should work with context variables")
        func testElvisOperatorWithContextVariables() throws {
            try evaluator.declareContextValue("name", value: "", isConst: false)
            #expect(try evaluator.evaluate(expr: "name ?: \"Anonymous\"") as? String == "Anonymous")
            try evaluator.declareContextValue("name", value: "John", isConst: false)
            #expect(try evaluator.evaluate(expr: "name ?: \"Anonymous\"") as? String == "John")
        }

        @Test("should work with nested elvis operators")
        func testElvisOperatorWithNestedOperators() throws {
            #expect(try evaluator.evaluate(expr: "null ?: \"\" ?: \"default\"") as? String == "default")
            #expect(try evaluator.evaluate(expr: "0 ?: false ?: 100") as? Int == 100)
        }

        @Test("should work with complex expressions")
        func testElvisOperatorWithComplexExpressions() throws {
            let user: [String: Any?] = ["name": "", "age": 0]
            try evaluator.declareContextValue("user", value: user, isConst: false)
            #expect(try evaluator.evaluate(expr: "user.name ?: \"Unknown\"") as? String == "Unknown")
            #expect(try evaluator.evaluate(expr: "user.age ?: 18") as? Int == 18)
        }
    }
    
    @Suite("Identifier Expressions")
    struct IdentifierExpressionsTests {

        var evaluator: JexEvaluator

        init() throws {
            self.evaluator = try JexEvaluator()
        }

        @Test("should evaluate identifiers from context")
        func testEvaluateIdentifiersFromContext() throws {
            try evaluator.declareContextValue("x", value: 10, isConst: false)
            try evaluator.declareContextValue("y", value: 20, isConst: false)
            try evaluator.declareContextValue("name", value: "Test", isConst: false)

            #expect(try evaluator.evaluate(expr: "x") as? Int == 10)
            #expect(try evaluator.evaluate(expr: "y") as? Int == 20)
            #expect(try evaluator.evaluate(expr: "name") as? String == "Test")
        }

        @Test("should throw error for undefined identifiers")
        func testThrowErrorForUndefinedIdentifiers() throws {
            #expect(throws: ExceptionError.self, performing: {
                try evaluator.evaluate(expr: "undefinedVar")
            })
            #expect(throws: ExceptionError.self, performing: {
                try evaluator.evaluate(expr: "anotherUndefined")
            })
        }

        @Test("should evaluate number identifier")
        func testEvaluateNumberIdentifier() throws {
            try evaluator.declareContextValue("num", value: 42, isConst: false)
            #expect(try evaluator.evaluate(expr: "num") as? Int == 42)

            try evaluator.declareContextValue("decimal", value: 3.14, isConst: false)
            #expect(try evaluator.evaluate(expr: "decimal") as? Double == 3.14)

            try evaluator.declareContextValue("negative", value: -100, isConst: false)
            #expect(try evaluator.evaluate(expr: "negative") as? Int == -100)
        }

        @Test("should evaluate string identifier")
        func testEvaluateStringIdentifier() throws {
            try evaluator.declareContextValue("str", value: "hello", isConst: false)
            #expect(try evaluator.evaluate(expr: "str") as? String == "hello")

            try evaluator.declareContextValue("empty", value: "", isConst: false)
            #expect(try evaluator.evaluate(expr: "empty") as? String == "")
        }

        @Test("should evaluate boolean identifier")
        func testEvaluateBooleanIdentifier() throws {
            try evaluator.declareContextValue("isTrue", value: true, isConst: false)
            #expect(try evaluator.evaluate(expr: "isTrue") as? Bool == true)

            try evaluator.declareContextValue("isFalse", value: false, isConst: false)
            #expect(try evaluator.evaluate(expr: "isFalse") as? Bool == false)
        }

        @Test("should evaluate null identifier")
        func testEvaluateNullIdentifier() throws {
            try evaluator.declareContextValue("nullValue", value: nil, isConst: false)
            #expect(try evaluator.evaluate(expr: "nullValue") as? NSNull == nil)
        }

        @Test("should evaluate array identifier")
        func testEvaluateArrayIdentifier() throws {
            try evaluator.declareContextValue("arr", value: [1, 2, 3], isConst: false)
            #expect(deepEqual(try evaluator.evaluate(expr: "arr"), [1, 2, 3]))

            try evaluator.declareContextValue("emptyArr", value: [Any](), isConst: false)
            #expect(deepEqual(try evaluator.evaluate(expr: "emptyArr"), [Any]()))

            try evaluator.declareContextValue("mixedArr", value: [1, "test", true, nil], isConst: false)
            #expect(deepEqual(try evaluator.evaluate(expr: "mixedArr"), [1, "test", true, nil]))
        }

        @Test("should evaluate object identifier")
        func testEvaluateObjectIdentifier() throws {
            let obj: [String: Any?] = ["key": "value"]
            try evaluator.declareContextValue("obj", value: obj, isConst: false)
            #expect(deepEqual(try evaluator.evaluate(expr: "obj"), obj))

            let emptyObj: [String: Any?] = [:]
            try evaluator.declareContextValue("emptyObj", value: emptyObj, isConst: false)
            #expect(deepEqual(try evaluator.evaluate(expr: "emptyObj"), emptyObj))

            let complexObj: [String: Any?] = [
                "name": "test",
                "count": 42,
                "active": true,
                "data": nil
            ]
            try evaluator.declareContextValue("complexObj", value: complexObj, isConst: false)
            #expect(deepEqual(try evaluator.evaluate(expr: "complexObj"), complexObj))
        }

        @Test("should evaluate nested object identifier")
        func testEvaluateNestedObjectIdentifier() throws {
            let level2: [String: Any?] = ["value": "deep"]
            let level1: [String: Any?] = ["level2": level2]
            let nested: [String: Any?] = ["level1": level1]
            try evaluator.declareContextValue("nested", value: nested, isConst: false)
            #expect(deepEqual(try evaluator.evaluate(expr: "nested"), nested))
        }

        @Test("should evaluate array of objects identifier")
        func testEvaluateArrayOfObjectsIdentifier() throws {
            let user1: [String: Any?] = ["name": "Alice", "age": 25]
            let user2: [String: Any?] = ["name": "Bob", "age": 30]
            let users: [[String: Any?]] = [user1, user2]
            try evaluator.declareContextValue("users", value: users, isConst: false)
            #expect(deepEqual(try evaluator.evaluate(expr: "users"), users))
        }
    }
    
    @Suite("Var Declaration Expressions")
    struct VarDeclarationExpressionsTests {

        var evaluator: JexEvaluator

        init() throws {
            self.evaluator = try JexEvaluator()
        }

        @Test("should declare variable with let keyword")
        func testDeclareVariableWithLetKeyword() throws {
            #expect(try evaluator.evaluate(expr: "let x = 10; x;") as? Int == 10)
            #expect(try evaluator.evaluate(expr: "let y = 5.54; y;") as? Double == 5.54)
            #expect(try evaluator.evaluate(expr: "let name = \"Test\"; name;") as? String == "Test")
            #expect(try evaluator.evaluate(expr: "let isTrue = false; isTrue;") as? Bool == false)
            #expect(deepEqual(try evaluator.evaluate(expr: "let arr = [1, 2, 3]; arr;"), [1, 2, 3]))
            #expect(deepEqual(try evaluator.evaluate(expr: "let mixed = [1, \"two\", true, null]; mixed;"), [1, "two", true, nil]))

            let expectedObj: [String: Any?] = ["key": "value"]
            #expect(deepEqual(try evaluator.evaluate(expr: "let obj = {\"key\": \"value\"}; obj;"), expectedObj))

            let expectedNestedObj: [String: Any?] = ["a": ["b": 2]]
            #expect(deepEqual(try evaluator.evaluate(expr: "let nested = {\"a\": {\"b\": 2}}; nested;"), expectedNestedObj))
        }

        @Test("should declare variable with const keyword")
        func testDeclareVariableWithConstKeyword() throws {
            #expect(try evaluator.evaluate(expr: "const x = 20; x;") as? Int == 20)
            #expect(try evaluator.evaluate(expr: "const greeting = \"Hello\"; greeting;") as? String == "Hello")
            #expect(try evaluator.evaluate(expr: "const isValid = true; isValid;") as? Bool == true)
            #expect(deepEqual(try evaluator.evaluate(expr: "const nums = [4, 5, 6]; nums;"), [4, 5, 6]))

            let expectedSettings: [String: Any?] = ["theme": "dark"]
            #expect(deepEqual(try evaluator.evaluate(expr: "const settings = {\"theme\": \"dark\"}; settings;"), expectedSettings))
        }

        @Test("should throw error for redeclaration of variable")
        func testThrowErrorForRedeclarationOfVariable() throws {
            #expect(throws: ExceptionError.self, performing: {
                try evaluator.evaluate(expr: "let x = 10; let x = 20;")
            })
            #expect(throws: ExceptionError.self, performing: {
                try evaluator.evaluate(expr: "const y = 5; const y = 15;")
            })
        }

        @Test("should throw error for reassignment of const variable")
        func testThrowErrorForReassignmentOfConstVariable() throws {
            #expect(throws: ExceptionError.self, performing: {
                try evaluator.evaluate(expr: "const z = 30; z = 40;")
            })
        }

        @Test("should allow reassignment of let variable")
        func testAllowReassignmentOfLetVariable() throws {
            #expect(try evaluator.evaluate(expr: "let a = 1; a = 2; a;") as? Int == 2)
        }

        @Test("should handle variable scope correctly")
        func testHandleVariableScopeCorrectly() throws {
            #expect(try evaluator.evaluate(expr: """
                let x = 10;
                {
                    let x = 20;
                    x;
                }
            """) as? Int == 20)

            #expect(try evaluator.evaluate(expr: """
                let y = 5;
                {
                    let y = 15;
                }
                y;
            """) as? Int == 5)
        }

        @Test("should create a variable in the global scope by declaring with global keyword")
        func testCreateGlobalVariable() throws {
            _ = try evaluator.evaluate(expr: "global let gVar = 100;")
            #expect(try evaluator.getGlobalScopeVariables()["gVar"] as? Int == 100)

            _ = try evaluator.evaluate(expr: "global const gConst = \"global\";")
            #expect(try evaluator.getGlobalScopeVariables()["gConst"] as? String == "global")
        }

        @Test("should allow access to global variables from local scope")
        func testAccessGlobalVariablesFromLocalScope() throws {
            _ = try evaluator.evaluate(expr: "global let gNum = 50;")
            #expect(try evaluator.evaluate(expr: """
                {
                    let localNum = gNum + 25;
                    localNum;
                }
            """) as? Int == 75)
        }

        @Test("global scope variables redeclaration is allowed and it should not throw error")
        func testGlobalScopeVariablesRedeclaration() throws {
            _ = try evaluator.evaluate(expr: "global let gVar = 200; global let gVar = 300;")
            #expect(try evaluator.getGlobalScopeVariables()["gVar"] as? Int == 300)
            #expect(try evaluator.evaluate(expr: "global let gVar = 400;") != nil)


            _ = try evaluator.evaluate(expr: "global const gConst = \"first\"; global const gConst = \"second\";")
            #expect(try evaluator.getGlobalScopeVariables()["gConst"] as? String == "second")
            #expect(try evaluator.evaluate(expr: "global const gConst = \"third\";") != nil)
            

        }
    }
    
    @Suite("block statements")
    struct BlockStatementsTests {

        var evaluator: JexEvaluator

        init() throws {
            self.evaluator = try JexEvaluator()
        }

        @Test("should evaluate block statements correctly")
        func testEvaluateBlockStatementsCorrectly() throws {
            let result = try evaluator.evaluate(expr: """
            {
                let x = 10;
                let y = 20;
                x + y;
            }
            """)
            #expect(result as? Int == 30)
        }

        @Test("should maintain variable scope within blocks")
        func testMaintainVariableScopeWithinBlocks() {
            #expect(throws: ExceptionError.self) {
                try evaluator.evaluate(expr: """
                {
                    let x = 5;
                }
                x;
                """)
            }
        }

        @Test("should allow nested blocks")
        func testAllowNestedBlocks() throws {
            let result = try evaluator.evaluate(expr: """
            {
                let x = 2;
                {
                    let y = 3;
                    x * y;
                }
            }
            """)
            #expect(result as? Int == 6)
        }

        @Test("should access outer scope variables within inner blocks")
        func testAccessOuterScopeVariablesWithinInnerBlocks() throws {
            let result = try evaluator.evaluate(expr: """
            let a = 4;
            {
                let b = 5;
                a + b;
            }
            """)
            #expect(result as? Int == 9)
        }

        @Test("should not allow inner block variables to leak to outer scope")
        func testNotAllowInnerBlockVariablesToLeakToOuterScope() {
            #expect(throws: ExceptionError.self) {
                try evaluator.evaluate(expr: """
                {
                    let m = 7;
                }
                m;
                """)
            }
        }

        @Test("should handle multiple statements in a block")
        func testHandleMultipleStatementsInABlock() throws {
            let result = try evaluator.evaluate(expr: """
            {
                let x = 1;
                x = x + 1;
                x = x * 3;
                x;
            }
            """)
            #expect(result as? Int == 6)
        }

        @Test("should handle blocks with only variable declarations")
        func testHandleBlocksWithOnlyVariableDeclarations() throws {
            let result = try evaluator.evaluate(expr: """
            {
                let x = 10;
                const y = 20;
            }
            """)
            #expect(result as? Int == 20)
        }

        @Test("should handle blocks with global variable declarations")
        func testHandleBlocksWithGlobalVariableDeclarations() throws {
            _ = try evaluator.evaluate(expr: """
            {
                global let gVar = 123;
                global const gConst = "block";
            }
            """)

            let globals = evaluator.getGlobalScopeVariables()
            #expect(globals["gVar"] as? Int == 123)
            #expect(globals["gConst"] as? String == "block")
        }

        @Test("should handle blocks with nested variable declarations")
        func testHandleBlocksWithNestedVariableDeclarations() throws {
            let result = try evaluator.evaluate(expr: """
            {
                let x = 5;
                {
                    let y = 10;
                    {
                        let z = 15;
                        x + y + z;
                    }
                }
            }
            """)
            #expect(result as? Int == 30)
        }

        @Test("should return last evaluated expression in the block")
        func testReturnLastEvaluatedExpressionInTheBlock() throws {
            let result = try evaluator.evaluate(expr: """
            {
                let x = 3;
                let y = 4;
                x * y;
            }
            """)
            #expect(result as? Int == 12)
        }

        @Test("should handle async execution within blocks")
        func testHandleAsyncExecutionWithinBlocks() throws {
            let asyncFunc: FuncImpl = { _, _ in
                Thread.sleep(forTimeInterval: 0.01)
                return JexValueFactory.fromNumber(int: 5)
            }

            evaluator.addFunction(name: "asyncFunc", function: asyncFunc)

            let result = try evaluator.evaluate(expr: """
            {
                let abc = asyncFunc();
                let bcc = 10;
                abc + bcc;
            }
            """)
            #expect(result as? Int == 15)
        }
    }

    // MARK: - Repeat Expressions Tests

    @Suite("Repeat Expressions")
    struct RepeatExpressionsTests {
        
        var evaluator: JexEvaluator
        
        init() throws {
            self.evaluator = try JexEvaluator()
        }
        
        @Suite("Numeric Repeat")
        struct NumericRepeatTests {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should repeat block specified number of times")
            func testRepeatBlockSpecifiedNumberOfTimes() throws {
                #expect(try evaluator.evaluate(expr: """
                    let sum = 0;
                    repeat (5) {
                        sum = sum + 1;
                    }
                    sum;
                    """) as? Int == 5)
            }
            
            @Test("should provide $index variable in numeric repeat")
            func testNumericRepeatIndexVariable() throws {
                #expect(try evaluator.evaluate(expr: """
                    let total = 0;
                    repeat (3) {
                        total = total + $index;
                    }
                    total;
                    """) as? Int == 3)
            }
            
            @Test("should provide $it variable equal to $index in numeric repeat")
            func testNumericRepeatItVariable() throws {
                #expect(try evaluator.evaluate(expr: """
                    let sum = 0;
                    repeat (4) {
                        sum = sum + $it;
                    }
                    sum;
                    """) as? Int == 6)
            }
            
            @Test("should handle zero iterations")
            func testNumericRepeatZeroIterations() throws {
                #expect(try evaluator.evaluate(expr: """
                    let count = 0;
                    repeat (0) {
                        count = count + 1;
                    }
                    count;
                    """) as? Int == 0)
            }
            
            @Test("should throw error for negative iterations")
            func testNumericRepeatNegativeIterations() {
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: """
                        repeat (-5) {
                            let x = 1;
                        }
                        """)
                }
            }
            
            @Test("should return last evaluated result from block")
            func testNumericRepeatLastEvaluatedResult() throws {
                #expect(try evaluator.evaluate(expr: """
                    repeat (3) {
                        $index * 2;
                    }
                    """) as? Int == 4)
            }
        }
        
        @Suite("Array Repeat")
        struct ArrayRepeatTests {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should iterate over array elements")
            func testArrayRepeatIteration() throws {
                #expect(try evaluator.evaluate(expr: """
                    let arr = [10, 20, 30];
                    let sum = 0;
                    repeat (arr) {
                        sum = sum + $it;
                    }
                    sum;
                    """) as? Int == 60)
            }
            
            @Test("should provide $index variable in array repeat")
            func testArrayRepeatIndexVariable() throws {
                #expect(try evaluator.evaluate(expr: """
                    let arr = ["a", "b", "c"];
                    let indices = 0;
                    repeat (arr) {
                        indices = indices + $index;
                    }
                    indices;
                    """) as? Int == 3)
            }
            
            @Test("should provide $it variable with current element")
            func testArrayRepeatItVariable() throws {
                #expect(try evaluator.evaluate(expr: """
                    let arr = [5, 10, 15];
                    let product = 1;
                    repeat (arr) {
                        product = product * $it;
                    }
                    product;
                    """) as? Int == 750)
            }
            
            @Test("should handle empty array")
            func testArrayRepeatEmptyArray() throws {
                #expect(try evaluator.evaluate(expr: """
                    let arr = [];
                    let count = 0;
                    repeat (arr) {
                        count = count + 1;
                    }
                    count;
                    """) as? Int == 0)
            }
            
            @Test("should return last evaluated result from array iteration")
            func testArrayRepeatLastResult() throws {
                let result = try evaluator.evaluate(expr: """
                    let arr = [1, 2, 3, 4];
                    repeat (arr) {
                        $it * 10;
                    }
                    """) as? Int
                
                #expect([10, 20, 30, 40].contains(result ?? 0))
            }
        }
        
        @Suite("Object Repeat")
        struct ObjectRepeatTests {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should iterate over object properties")
            func testObjectRepeatIteration() throws {
                #expect(try evaluator.evaluate(expr: """
                    let obj = {"a": 1, "b": 2, "c": 3};
                    let sum = 0;
                    repeat (obj) {
                        sum = sum + $it;
                    }
                    sum;
                    """) as? Int == 6)
            }
            
            @Test("should provide $key variable in object repeat")
            func testObjectRepeatKeyVariable() throws {
                let result = try evaluator.evaluate(expr: """
                    let obj = {"x": 10, "y": 20};
                    let keys = "";
                    repeat (obj) {
                        keys = keys + $key;
                    }
                    keys;
                    """) as? String
                
                #expect(result == "xy" || result == "yx")
            }
            
            @Test("should provide $value variable equal to $it")
            func testObjectRepeatValueVariable() throws {
                #expect(try evaluator.evaluate(expr: """
                    let obj = {"a": 5, "b": 10};
                    let total = 0;
                    repeat (obj) {
                        total = total + $value;
                    }
                    total;
                    """) as? Int == 15)
            }
            
            @Test("should handle empty object")
            func testObjectRepeatEmptyObject() throws {
                #expect(try evaluator.evaluate(expr: """
                    let obj = {};
                    let count = 0;
                    repeat (obj) {
                        count = count + 1;
                    }
                    count;
                    """) as? Int == 0)
            }
            
            @Test("should return last evaluated result from object iteration")
            func testObjectRepeatLastResult() throws {
                let result = try evaluator.evaluate(expr: """
                    let obj = {"a": 1, "b": 2};
                    repeat (obj) {
                        $it * 100;
                    }
                    """) as? Int
                
                #expect(result == 100 || result == 200)
            }
        }
        
        @Suite("String Repeat")
        struct StringRepeatTests {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should iterate over string characters")
            func testStringRepeatIteration() throws {
                #expect(try evaluator.evaluate(expr: """
                    let str = "abc";
                    let combined = "";
                    repeat (str) {
                        combined = combined + $it;
                    }
                    combined;
                    """) as? String == "abc")
            }
            
            @Test("should provide $index variable in string repeat")
            func testStringRepeatIndexVariable() throws {
                #expect(try evaluator.evaluate(expr: """
                    let str = "test";
                    let indices = 0;
                    repeat (str) {
                        indices = indices + $index;
                    }
                    indices;
                    """) as? Int == 6)
            }
            
            @Test("should handle empty string")
            func testStringRepeatEmpty() throws {
                #expect(try evaluator.evaluate(expr: """
                    let str = "";
                    let count = 0;
                    repeat (str) {
                        count = count + 1;
                    }
                    count;
                    """) as? Int == 0)
            }
            
            @Test("should return last evaluated result from string iteration")
            func testStringRepeatLastResult() throws {
                #expect(try evaluator.evaluate(expr: """
                    let str = "xyz";
                    repeat (str) {
                        $it;
                    }
                    """) as? String == "z")
            }
        }
        
        @Suite("Null and Undefined Handling")
        struct NullUndefinedTests {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should return null for null iterable")
            func testRepeatNullIterable() throws {
                let result = try evaluator.evaluate(expr: """
                    repeat (null) {
                        let x = 1;
                    }
                    """)
                #expect(result as? NSNull == nil)
            }
            
            @Test("should handle null from expression")
            func testRepeatNullExpression() throws {
                try evaluator.declareContextValue("nullValue", value: nil, isConst: false)
                let result = try evaluator.evaluate(expr: """
                    repeat (nullValue) {
                        let x = 1;
                    }
                    """)
                #expect(result as? NSNull == nil)
            }
        }
        
        @Suite("Nested Repeat Expressions")
        struct NestedRepeatTests {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should handle nested numeric repeats")
            func testNestedNumericRepeat() throws {
                #expect(try evaluator.evaluate(expr: """
                    let sum = 0;
                    repeat (3) {
                        repeat (2) {
                            sum = sum + 1;
                        }
                    }
                    sum;
                    """) as? Int == 6)
            }
            
            @Test("should handle nested array repeats")
            func testNestedArrayRepeat() throws {
                #expect(try evaluator.evaluate(expr: """
                    let matrix = [[1, 2], [3, 4]];
                    let total = 0;
                    repeat (matrix) {
                        repeat ($it) {
                            total = total + $it;
                        }
                    }
                    total;
                    """) as? Int == 10)
            }
        }
        
        @Suite("Scope and Variable Shadowing")
        struct ScopeAndShadowingTests {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should create new scope for repeat block")
            func testRepeatBlockScopeIsolation() {
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: """
                        repeat (1) {
                            let blockVar = 5;
                        }
                        blockVar;
                        """)
                }
            }
            
            @Test("should access outer scope variables")
            func testRepeatAccessOuterScope() throws {
                #expect(try evaluator.evaluate(expr: """
                    let outer = 10;
                    repeat (2) {
                        outer = outer + 5;
                    }
                    outer;
                    """) as? Int == 20)
            }
            
            @Test("should not leak $index and $it variables")
            func testRepeatVariableLeakage() {
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: """
                        repeat (3) {
                            let x = $index;
                        }
                        $index;
                        """)
                }
                
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: """
                        repeat ([1, 2]) {
                            let y = $it;
                        }
                        $it;
                        """)
                }
            }
        }
        
        @Suite("Async Repeat Expressions")
        struct AsyncRepeatTests {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should handle async operations in numeric repeat")
            func testAsyncNumericRepeat() throws {
                let asyncFunc: FuncImpl = { _, _ in
                    JexValueFactory.fromNumber(int: 5)
                }
                evaluator.addFunction(name: "asyncFunc", function: asyncFunc)
                
                #expect(try evaluator.evaluate(expr: """
                    let sum = 0;
                    repeat(2) {
                        let asyncVal = asyncFunc();
                        sum = sum + asyncVal;
                    }
                    sum;
                    """) as? Int == 10)
            }
            
            @Test("should handle async operations in array repeat")
            func testAsyncArrayRepeat() throws {
                let asyncDouble: FuncImpl = { _, args in
                    Thread.sleep(forTimeInterval: 0.005)
                    let val = toNumber(value: args[0], ctx: "asyncDouble")
                    return JexValueFactory.fromNumber(double: val.doubleValue * 2)
                }
                evaluator.addFunction(name: "asyncDouble", function: asyncDouble)
                
                #expect(try evaluator.evaluate(expr: """
                    let arr = [1, 2, 3];
                    let sum = 0;
                    repeat (arr) {
                        sum = sum + asyncDouble($it);
                    }
                    sum;
                    """) as? Int == 12)
            }
            
            @Test("should handle async operations in object repeat")
            func testAsyncObjectRepeat() throws {
                let asyncValue: FuncImpl = { _, args in
                    let val = toNumber(value: args[0], ctx: "asyncValue")
                    return JexValueFactory.fromNumber(double: val.doubleValue + 10)
                }
                evaluator.addFunction(name: "asyncValue", function: asyncValue)
                
                #expect(try evaluator.evaluate(expr: """
                    let obj = {"a": 1, "b": 2};
                    let sum = 0;
                    repeat (obj) {
                        sum = sum + asyncValue($it);
                    }
                    sum;
                    """) as? Int == 23)
            }
            
            @Test("should handle async operations in string repeat")
            func testAsyncStringRepeat() throws {
                let asyncCharCode: FuncImpl = { _, args in
                    let str = toString(value: args[0], ctx: "asyncCharCode")
                    let charCode = str.unicodeScalars.first?.value ?? 0
                    return JexValueFactory.fromNumber(int: Int(charCode))
                }
                evaluator.addFunction(name: "asyncCharCode", function: asyncCharCode)
                
                #expect(try evaluator.evaluate(expr: """
                    let str = "abc";
                    let total = 0;
                    repeat (str) {
                        total = total + asyncCharCode($it);
                    }
                    total;
                    """) as? Int == 294)
            }
        }
    }

    // MARK: - If-Else Expressions Tests

    @Suite("If-Else Expressions")
    struct IfElseExpressionsTests {
        
        var evaluator: JexEvaluator
        
        init() throws {
            self.evaluator = try JexEvaluator()
        }
        
        @Suite("Basic If Expressions")
        struct BasicIfExpressions {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should execute if block when condition is true")
            func testExecuteIfBlockWhenConditionIsTrue() throws {
                #expect(try evaluator.evaluate(expr: """
                    if (true) {
                        42;
                    }
                    """) as? Int == 42)
            }
            
            @Test("should return null when condition is false and no else")
            func testReturnNullWhenConditionFalseNoElse() throws {
                let result = try evaluator.evaluate(expr: """
                    if (false) {
                        42;
                    }
                    """)
                #expect(result as? NSNull == nil)
            }
            
            @Test("should evaluate condition expressions")
            func testEvaluateConditionExpressions() throws {
                #expect(try evaluator.evaluate(expr: """
                    if (5 > 3) {
                        "greater";
                    }
                    """) as? String == "greater")
            }
            
            @Test("should handle falsy values")
            func testHandleFalsyValues() throws {
                #expect(try evaluator.evaluate(expr: "if (0) { \"yes\"; }") as? NSNull == nil)
                #expect(try evaluator.evaluate(expr: "if (\"\") { \"yes\"; }") as? NSNull == nil)
                #expect(try evaluator.evaluate(expr: "if (null) { \"yes\"; }") as? NSNull == nil)
                #expect(try evaluator.evaluate(expr: "if (false) { \"yes\"; }") as? NSNull == nil)
            }
            
            @Test("should handle truthy values")
            func testHandleTruthyValues() throws {
                #expect(try evaluator.evaluate(expr: "if (1) { \"yes\"; }") as? String == "yes")
                #expect(try evaluator.evaluate(expr: "if (\"hello\") { \"yes\"; }") as? String == "yes")
                #expect(try evaluator.evaluate(expr: "if (true) { \"yes\"; }") as? String == "yes")
                #expect(try evaluator.evaluate(expr: "if ([1]) { \"yes\"; }") as? String == "yes")
                #expect(try evaluator.evaluate(expr: "if ({\"a\": 1}) { \"yes\"; }") as? String == "yes")
            }
            
            @Test("should handle empty arrays and objects as falsy")
            func testHandleEmptyArraysObjectsAsFalsy() throws {
                #expect(try evaluator.evaluate(expr: "if ([]) { \"yes\"; }") as? NSNull == nil)
                #expect(try evaluator.evaluate(expr: "if ({}) { \"yes\"; }") as? NSNull == nil)
            }
        }
        
        @Suite("If-Else Expressions")
        struct IfElseExpressions {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should execute else block when condition is false")
            func testExecuteElseBlockWhenConditionFalse() throws {
                #expect(try evaluator.evaluate(expr: """
                    if (false) {
                        "if";
                    } else {
                        "else";
                    }
                    """) as? String == "else")
            }
            
            @Test("should execute if block when condition is true")
            func testExecuteIfBlockWhenConditionTrue() throws {
                #expect(try evaluator.evaluate(expr: """
                    if (true) {
                        "if";
                    } else {
                        "else";
                    }
                    """) as? String == "if")
            }
            
            @Test("should handle complex expressions in blocks")
            func testHandleComplexExpressionsInBlocks() throws {
                #expect(try evaluator.evaluate(expr: """
                    if (10 > 5) {
                        let x = 20;
                        x * 2;
                    } else {
                        let y = 10;
                        y * 3;
                    }
                    """) as? Int == 40)
            }
        }
        
        @Suite("If-Else-If Expressions")
        struct IfElseIfExpressions {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should execute first true condition")
            func testExecuteFirstTrueCondition() throws {
                #expect(try evaluator.evaluate(expr: """
                    if (false) {
                        "first";
                    } else if (true) {
                        "second";
                    } else {
                        "third";
                    }
                    """) as? String == "second")
            }
            
            @Test("should execute else when all conditions are false")
            func testExecuteElseWhenAllFalse() throws {
                #expect(try evaluator.evaluate(expr: """
                    if (false) {
                        "first";
                    } else if (false) {
                        "second";
                    } else {
                        "third";
                    }
                    """) as? String == "third")
            }
            
            @Test("should handle multiple else-if clauses")
            func testHandleMultipleElseIfClauses() throws {
                try evaluator.declareContextValue("score", value: 85, isConst: false)
                #expect(try evaluator.evaluate(expr: """
                    if (score >= 90) {
                        "A";
                    } else if (score >= 80) {
                        "B";
                    } else if (score >= 70) {
                        "C";
                    } else {
                        "F";
                    }
                    """) as? String == "B")
            }
            
            @Test("should return null when all conditions are false and no else")
            func testReturnNullWhenAllFalseNoElse() throws {
                let result = try evaluator.evaluate(expr: """
                    if (false) {
                        "first";
                    } else if (false) {
                        "second";
                    }
                    """)
                #expect(result as? NSNull == nil)
            }
            
            @Test("should stop at first true condition")
            func testStopAtFirstTrueCondition() throws {
                try evaluator.declareContextValue("counter", value: 0, isConst: false)
                #expect(try evaluator.evaluate(expr: """
                    if (false) {
                        counter = counter + 1;
                        "first";
                    } else if (true) {
                        counter = counter + 10;
                        "second";
                    } else if (true) {
                        counter = counter + 100;
                        "third";
                    }
                    counter;
                    """) as? Int == 10)
            }
        }
        
        @Suite("Nested If Expressions")
        struct NestedIfExpressions {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should handle nested if statements")
            func testHandleNestedIfStatements() throws {
                #expect(try evaluator.evaluate(expr: """
                    if (true) {
                        if (true) {
                            "nested";
                        }
                    }
                    """) as? String == "nested")
            }
            
            @Test("should handle nested if-else statements")
            func testHandleNestedIfElseStatements() throws {
                #expect(try evaluator.evaluate(expr: """
                    if (true) {
                        if (false) {
                            "inner-if";
                        } else {
                            "inner-else";
                        }
                    } else {
                        "outer-else";
                    }
                    """) as? String == "inner-else")
            }
            
            @Test("should handle deeply nested conditions")
            func testHandleDeeplyNestedConditions() throws {
                try evaluator.declareContextValue("x", value: 5, isConst: false)
                try evaluator.declareContextValue("y", value: 10, isConst: false)
                #expect(try evaluator.evaluate(expr: """
                    if (x < y) {
                        if (x > 0) {
                            if (y > 5) {
                                "all conditions met";
                            }
                        }
                    }
                    """) as? String == "all conditions met")
            }
        }
        
        @Suite("If Expressions with Variables")
        struct IfExpressionsWithVariables {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should access outer scope variables")
            func testAccessOuterScopeVariables() throws {
                #expect(try evaluator.evaluate(expr: """
                    let x = 10;
                    if (x > 5) {
                        x * 2;
                    }
                    """) as? Int == 20)
            }
            
            @Test("should modify outer scope variables")
            func testModifyOuterScopeVariables() throws {
                #expect(try evaluator.evaluate(expr: """
                    let count = 0;
                    if (true) {
                        count = count + 5;
                    }
                    count;
                    """) as? Int == 5)
            }
            
            @Test("should declare variables in if block scope")
            func testDeclareVariablesInIfBlockScope() {
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: """
                        if (true) {
                            let blockVar = 10;
                        }
                        blockVar;
                        """)
                }
            }
            
            @Test("should handle variable declarations in different branches")
            func testHandleVariableDeclarationsInDifferentBranches() throws {
                try evaluator.declareContextValue("flag", value: true, isConst: false)
                #expect(try evaluator.evaluate(expr: """
                    let result = 0;
                    if (flag) {
                        let temp = 10;
                        result = temp;
                    } else {
                        let temp = 20;
                        result = temp;
                    }
                    result;
                    """) as? Int == 10)
            }
        }
        
        @Suite("Async If Expressions")
        struct AsyncIfExpressions {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should handle async condition evaluation")
            func testAsyncConditionEvaluation() throws {
                let asyncCheck: FuncImpl = { _, _ in
                    Thread.sleep(forTimeInterval: 0.01)
                    return JexValueFactory.from(true)
                }
                evaluator.addFunction(name: "asyncCheck", function: asyncCheck)
                
                #expect(try evaluator.evaluate(expr: """
                    if (asyncCheck()) {
                        "async-true";
                    } else {
                        "async-false";
                    }
                    """) as? String == "async-true")
            }
        }
        
        @Suite("Sync If Expressions")
        struct SyncIfExpressions {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should handle multiple sync operations in if block")
            func testMultipleSyncOperationsInIfBlock() throws {
                #expect(try evaluator.evaluate(expr: """
                    let total = 0;
                    if (true) {
                        total = total + 10;
                        total = total * 2;
                        total = total + 5;
                    }
                    total;
                    """) as? Int == 25)
            }
            
            @Test("should handle sync expressions with context variables")
            func testSyncExpressionsWithContextVariables() throws {
                try evaluator.declareContextValue("multiplier", value: 3, isConst: false)
                try evaluator.declareContextValue("base", value: 10, isConst: false)
                #expect(try evaluator.evaluate(expr: """
                    if (multiplier > 2) {
                        base * multiplier;
                    } else {
                        base;
                    }
                    """) as? Int == 30)
            }
            
            @Test("should handle sync function calls in conditions")
            func testSyncFunctionCallsInConditions() throws {
                let syncCheck: FuncImpl = { _, args in
                    let val = toNumber(value: args[0], ctx: "syncCheck")
                    return JexValueFactory.from(val.int64Value % 2 == 0)
                }
                evaluator.addFunction(name: "syncCheck", function: syncCheck)
                
                #expect(try evaluator.evaluate(expr: """
                    if (syncCheck(10)) {
                        "even";
                    } else {
                        "odd";
                    }
                    """) as? String == "even")
            }
        }
    }

    // MARK: - Prefix Expressions Tests

    @Suite("Prefix Expressions")
    struct PrefixExpressionsTests {
        
        var evaluator: JexEvaluator
        
        init() throws {
            self.evaluator = try JexEvaluator()
        }
        
        @Suite("Prefix Increment/Decrement with Variables")
        struct PrefixIncrementDecrementVariables {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should increment variable with prefix operator")
            func testPrefixIncrementVariable() throws {
                try evaluator.declareContextValue("x", value: 5, isConst: false)
                #expect(try evaluator.evaluate(expr: "++x") as? Int == 6)
                #expect(try evaluator.evaluate(expr: "x") as? Int == 6)
            }
            
            @Test("should decrement variable with prefix operator")
            func testPrefixDecrementVariable() throws {
                try evaluator.declareContextValue("y", value: 10, isConst: false)
                #expect(try evaluator.evaluate(expr: "--y") as? Int == 9)
                #expect(try evaluator.evaluate(expr: "y") as? Int == 9)
            }
            
            @Test("should return new value after prefix increment")
            func testNewValueAfterPrefixIncrement() throws {
                try evaluator.declareContextValue("count", value: 0, isConst: false)
                #expect(try evaluator.evaluate(expr: "++count") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "++count") as? Int == 2)
                #expect(try evaluator.evaluate(expr: "count") as? Int == 2)
            }
            
            @Test("should return new value after prefix decrement")
            func testNewValueAfterPrefixDecrement() throws {
                try evaluator.declareContextValue("count", value: 5, isConst: false)
                #expect(try evaluator.evaluate(expr: "--count") as? Int == 4)
                #expect(try evaluator.evaluate(expr: "--count") as? Int == 3)
                #expect(try evaluator.evaluate(expr: "count") as? Int == 3)
            }
            
            @Test("should handle multiple prefix operations")
            func testMultiplePrefixOperations() throws {
                try evaluator.declareContextValue("a", value: 0, isConst: false)
                try evaluator.declareContextValue("b", value: 0, isConst: false)
                #expect(try evaluator.evaluate(expr: "++a + ++b") as? Int == 2)
                #expect(try evaluator.evaluate(expr: "a") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "b") as? Int == 1)
            }
            
            @Test("should throw error for undefined variable")
            func testPrefixUndefinedVariable() {
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "++undefinedVar")
                }
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "--undefinedVar")
                }
            }
        }
        
        @Suite("Prefix Increment/Decrement with Array Elements")
        struct PrefixIncrementDecrementArray {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should increment array element with positive index")
            func testPrefixIncrementPositiveIndex() throws {
                try evaluator.declareContextValue("arr", value: [1, 2, 3], isConst: false)
                #expect(try evaluator.evaluate(expr: "++arr[0]") as? Int == 2)
                #expect(try evaluator.evaluate(expr: "arr[0]") as? Int == 2)
            }
            
            @Test("should decrement array element with positive index")
            func testPrefixDecrementPositiveIndex() throws {
                try evaluator.declareContextValue("arr", value: [10, 20, 30], isConst: false)
                #expect(try evaluator.evaluate(expr: "--arr[1]") as? Int == 19)
                #expect(try evaluator.evaluate(expr: "arr[1]") as? Int == 19)
            }
            
            @Test("should increment array element with negative index")
            func testPrefixIncrementNegativeIndex() throws {
                try evaluator.declareContextValue("arr", value: [5, 10, 15], isConst: false)
                #expect(try evaluator.evaluate(expr: "++arr[-1]") as? Int == 16)
                #expect(try evaluator.evaluate(expr: "arr[-1]") as? Int == 16)
                #expect(try evaluator.evaluate(expr: "arr[2]") as? Int == 16)
            }
            
            @Test("should decrement array element with negative index")
            func testPrefixDecrementNegativeIndex() throws {
                try evaluator.declareContextValue("arr", value: [100, 200, 300], isConst: false)
                #expect(try evaluator.evaluate(expr: "--arr[-2]") as? Int == 199)
                #expect(try evaluator.evaluate(expr: "arr[-2]") as? Int == 199)
                #expect(try evaluator.evaluate(expr: "arr[1]") as? Int == 199)
            }
            
            @Test("should handle prefix operations with expression as index")
            func testPrefixExpressionAsIndex() throws {
                try evaluator.declareContextValue("arr", value: [1, 2, 3, 4, 5], isConst: false)
                try evaluator.declareContextValue("idx", value: 2, isConst: false)
                #expect(try evaluator.evaluate(expr: "++arr[idx + 1]") as? Int == 5)
                #expect(try evaluator.evaluate(expr: "arr[3]") as? Int == 5)
            }
            
            @Test("should return null for out of bounds array index")
            func testOutOfBoundsArrayIndex() throws {
                try evaluator.declareContextValue("arr", value: [1, 2, 3], isConst: false)
                let result = try evaluator.evaluate(expr: "++arr[10]")
                #expect(result as? NSNull == nil)
            }
            
            @Test("should handle nested array increment")
            func testNestedArrayIncrement() throws {
                let matrix: [[Int]] = [[1, 2], [3, 4]]
                try evaluator.declareContextValue("matrix", value: matrix, isConst: false)
                #expect(try evaluator.evaluate(expr: "++matrix[0][1]") as? Int == 3)
                #expect(try evaluator.evaluate(expr: "matrix[0][1]") as? Int == 3)
            }
        }
        
        @Suite("Prefix Increment/Decrement with Object Properties")
        struct PrefixIncrementDecrementObject {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should increment object property with dot notation")
            func testPrefixIncrementDotNotation() throws {
                let obj: [String: Any] = ["count": 5]
                try evaluator.declareContextValue("obj", value: obj, isConst: false)
                #expect(try evaluator.evaluate(expr: "++obj.count") as? Int == 6)
                #expect(try evaluator.evaluate(expr: "obj.count") as? Int == 6)
            }
            
            @Test("should decrement object property with dot notation")
            func testPrefixDecrementDotNotation() throws {
                let obj: [String: Any] = ["value": 20]
                try evaluator.declareContextValue("obj", value: obj, isConst: false)
                #expect(try evaluator.evaluate(expr: "--obj.value") as? Int == 19)
                #expect(try evaluator.evaluate(expr: "obj.value") as? Int == 19)
            }
            
            @Test("should increment object property with bracket notation")
            func testPrefixIncrementBracketNotation() throws {
                let obj: [String: Any] = ["score": 10]
                try evaluator.declareContextValue("obj", value: obj, isConst: false)
                #expect(try evaluator.evaluate(expr: "++obj[\"score\"]") as? Int == 11)
                #expect(try evaluator.evaluate(expr: "obj.score") as? Int == 11)
            }
            
            @Test("should decrement object property with bracket notation")
            func testPrefixDecrementBracketNotation() throws {
                let obj: [String: Any] = ["points": 50]
                try evaluator.declareContextValue("obj", value: obj, isConst: false)
                #expect(try evaluator.evaluate(expr: "--obj[\"points\"]") as? Int == 49)
                #expect(try evaluator.evaluate(expr: "obj.points") as? Int == 49)
            }
            
            @Test("should handle prefix operations with dynamic property names")
            func testDynamicPropertyName() throws {
                let obj: [String: Any] = ["x": 5, "y": 10]
                try evaluator.declareContextValue("obj", value: obj, isConst: false)
                try evaluator.declareContextValue("key", value: "x", isConst: false)
                #expect(try evaluator.evaluate(expr: "++obj[key]") as? Int == 6)
                #expect(try evaluator.evaluate(expr: "obj.x") as? Int == 6)
            }
            
            @Test("should handle nested object property increment")
            func testNestedObjectPropertyIncrement() throws {
                let user: [String: Any] = ["age": 25]
                let data: [String: Any] = ["user": user]
                try evaluator.declareContextValue("data", value: data, isConst: false)
                #expect(try evaluator.evaluate(expr: "++data.user.age") as? Int == 26)
                #expect(try evaluator.evaluate(expr: "data.user.age") as? Int == 26)
            }
            
            @Test("should throw error for non-object property access")
            func testNonObjectPropertyAccessThrows() throws {
                try evaluator.declareContextValue("num", value: 42, isConst: false)
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "++num.prop")
                }
            }
        }
    }

    // MARK: - Postfix Expressions Tests

    @Suite("Postfix Expressions")
    struct PostfixExpressionsTests {
        
        var evaluator: JexEvaluator
        
        init() throws {
            self.evaluator = try JexEvaluator()
        }
        
        @Suite("Postfix Increment/Decrement with Variables")
        struct PostfixIncrementDecrementVariables {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should increment variable with postfix operator")
            func testPostfixIncrementVariable() throws {
                try evaluator.declareContextValue("x", value: 5, isConst: false)
                #expect(try evaluator.evaluate(expr: "x++") as? Int == 5)
                #expect(try evaluator.evaluate(expr: "x") as? Int == 6)
            }
            
            @Test("should decrement variable with postfix operator")
            func testPostfixDecrementVariable() throws {
                try evaluator.declareContextValue("y", value: 10, isConst: false)
                #expect(try evaluator.evaluate(expr: "y--") as? Int == 10)
                #expect(try evaluator.evaluate(expr: "y") as? Int == 9)
            }
            
            @Test("should return old value after postfix increment")
            func testOldValueAfterPostfixIncrement() throws {
                try evaluator.declareContextValue("count", value: 0, isConst: false)
                #expect(try evaluator.evaluate(expr: "count++") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "count") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "count++") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "count") as? Int == 2)
            }
            
            @Test("should return old value after postfix decrement")
            func testOldValueAfterPostfixDecrement() throws {
                try evaluator.declareContextValue("count", value: 5, isConst: false)
                #expect(try evaluator.evaluate(expr: "count--") as? Int == 5)
                #expect(try evaluator.evaluate(expr: "count") as? Int == 4)
                #expect(try evaluator.evaluate(expr: "count--") as? Int == 4)
                #expect(try evaluator.evaluate(expr: "count") as? Int == 3)
            }
            
            @Test("should handle multiple postfix operations")
            func testMultiplePostfixOperations() throws {
                try evaluator.declareContextValue("a", value: 0, isConst: false)
                try evaluator.declareContextValue("b", value: 0, isConst: false)
                #expect(try evaluator.evaluate(expr: "a++ + b++") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "a") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "b") as? Int == 1)
            }
            
            @Test("should handle mix of prefix and postfix")
            func testMixPrefixPostfix() throws {
                try evaluator.declareContextValue("x", value: 5, isConst: false)
                #expect(try evaluator.evaluate(expr: "++x + x++") as? Int == 12) // 6 + 6, then x = 7
                #expect(try evaluator.evaluate(expr: "x") as? Int == 7)
            }
            
            @Test("should throw error for undefined variable")
            func testUndefinedVariablePostfix() {
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "undefinedVar++")
                }
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "undefinedVar--")
                }
            }
        }
        
        @Suite("Postfix Increment/Decrement with Array Elements")
        struct PostfixIncrementDecrementArray {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should increment array element with positive index")
            func testPostfixIncrementPositiveIndex() throws {
                try evaluator.declareContextValue("arr", value: [1, 2, 3], isConst: false)
                #expect(try evaluator.evaluate(expr: "arr[0]++") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "arr[0]") as? Int == 2)
            }
            
            @Test("should decrement array element with positive index")
            func testPostfixDecrementPositiveIndex() throws {
                try evaluator.declareContextValue("arr", value: [10, 20, 30], isConst: false)
                #expect(try evaluator.evaluate(expr: "arr[1]--") as? Int == 20)
                #expect(try evaluator.evaluate(expr: "arr[1]") as? Int == 19)
            }
            
            @Test("should increment array element with negative index")
            func testPostfixIncrementNegativeIndex() throws {
                try evaluator.declareContextValue("arr", value: [5, 10, 15], isConst: false)
                #expect(try evaluator.evaluate(expr: "arr[-1]++") as? Int == 15)
                #expect(try evaluator.evaluate(expr: "arr[-1]") as? Int == 16)
                #expect(try evaluator.evaluate(expr: "arr[2]") as? Int == 16)
            }
            
            @Test("should decrement array element with negative index")
            func testPostfixDecrementNegativeIndex() throws {
                try evaluator.declareContextValue("arr", value: [100, 200, 300], isConst: false)
                #expect(try evaluator.evaluate(expr: "arr[-2]--") as? Int == 200)
                #expect(try evaluator.evaluate(expr: "arr[-2]") as? Int == 199)
                #expect(try evaluator.evaluate(expr: "arr[1]") as? Int == 199)
            }
            
            @Test("should handle postfix operations with expression as index")
            func testPostfixExpressionAsIndex() throws {
                try evaluator.declareContextValue("arr", value: [1, 2, 3, 4, 5], isConst: false)
                try evaluator.declareContextValue("idx", value: 2, isConst: false)
                #expect(try evaluator.evaluate(expr: "arr[idx + 1]++") as? Int == 4)
                #expect(try evaluator.evaluate(expr: "arr[3]") as? Int == 5)
            }
            
            @Test("should handle postfix with computed index expression")
            func testPostfixComputedIndex() throws {
                try evaluator.declareContextValue("arr", value: [10, 20, 30, 40], isConst: false)
                #expect(try evaluator.evaluate(expr: "arr[1 + 1]++") as? Int == 30)
                #expect(try evaluator.evaluate(expr: "arr[2]") as? Int == 31)
            }
            
            @Test("should return null for out of bounds array index")
            func testPostfixOutOfBounds() throws {
                try evaluator.declareContextValue("arr", value: [1, 2, 3], isConst: false)
                let result = try evaluator.evaluate(expr: "arr[10]++")
                #expect(result as? NSNull == nil)
            }
            
            @Test("should handle nested array decrement")
            func testPostfixNestedArrayDecrement() throws {
                let matrix: [[Int]] = [[1, 2], [3, 4]]
                try evaluator.declareContextValue("matrix", value: matrix, isConst: false)
                #expect(try evaluator.evaluate(expr: "matrix[1][0]--") as? Int == 3)
                #expect(try evaluator.evaluate(expr: "matrix[1][0]") as? Int == 2)
            }
        }
        
        @Suite("Postfix Increment/Decrement with Object Properties")
        struct PostfixIncrementDecrementObject {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should increment object property with dot notation")
            func testPostfixIncrementDotNotation() throws {
                let obj: [String: Any] = ["count": 5]
                try evaluator.declareContextValue("obj", value: obj, isConst: false)
                #expect(try evaluator.evaluate(expr: "obj.count++") as? Int == 5)
                #expect(try evaluator.evaluate(expr: "obj.count") as? Int == 6)
            }
            
            @Test("should decrement object property with dot notation")
            func testPostfixDecrementDotNotation() throws {
                let obj: [String: Any] = ["value": 20]
                try evaluator.declareContextValue("obj", value: obj, isConst: false)
                #expect(try evaluator.evaluate(expr: "obj.value--") as? Int == 20)
                #expect(try evaluator.evaluate(expr: "obj.value") as? Int == 19)
            }
            
            @Test("should increment object property with bracket notation")
            func testPostfixIncrementBracketNotation() throws {
                let obj: [String: Any] = ["score": 10]
                try evaluator.declareContextValue("obj", value: obj, isConst: false)
                #expect(try evaluator.evaluate(expr: "obj[\"score\"]++") as? Int == 10)
                #expect(try evaluator.evaluate(expr: "obj.score") as? Int == 11)
            }
            
            @Test("should decrement object property with bracket notation")
            func testPostfixDecrementBracketNotation() throws {
                let obj: [String: Any] = ["points": 50]
                try evaluator.declareContextValue("obj", value: obj, isConst: false)
                #expect(try evaluator.evaluate(expr: "obj[\"points\"]--") as? Int == 50)
                #expect(try evaluator.evaluate(expr: "obj.points") as? Int == 49)
            }
            
            @Test("should handle postfix operations with dynamic property names")
            func testPostfixDynamicProperty() throws {
                let obj: [String: Any] = ["x": 5, "y": 10]
                try evaluator.declareContextValue("obj", value: obj, isConst: false)
                try evaluator.declareContextValue("key", value: "y", isConst: false)
                #expect(try evaluator.evaluate(expr: "obj[key]++") as? Int == 10)
                #expect(try evaluator.evaluate(expr: "obj.y") as? Int == 11)
            }
            
            @Test("should handle nested object property decrement")
            func testPostfixNestedObjectProperty() throws {
                let user: [String: Any] = ["age": 25]
                let data: [String: Any] = ["user": user]
                try evaluator.declareContextValue("data", value: data, isConst: false)
                #expect(try evaluator.evaluate(expr: "data.user.age--") as? Int == 25)
                #expect(try evaluator.evaluate(expr: "data.user.age") as? Int == 24)
            }
            
            @Test("should throw error for non-object property access")
            func testPostfixNonObjectPropertyAccess() throws {
                try evaluator.declareContextValue("str", value: "test", isConst: false)
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "str.length++")
                }
            }
        }
        
        @Suite("Complex Postfix/Prefix Scenarios")
        struct PostfixPrefixComplex {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should handle array of objects with postfix")
            func testArrayOfObjectsPostfix() throws {
                let users: [[String: Any]] = [
                    ["score": 10],
                    ["score": 20]
                ]
                try evaluator.declareContextValue("users", value: users, isConst: false)
                #expect(try evaluator.evaluate(expr: "users[0].score++") as? Int == 10)
                #expect(try evaluator.evaluate(expr: "users[0].score") as? Int == 11)
            }
            
            @Test("should handle object with array property and prefix")
            func testObjectWithArrayPrefix() throws {
                let data: [String: Any] = ["values": [5, 10, 15]]
                try evaluator.declareContextValue("data", value: data, isConst: false)
                #expect(try evaluator.evaluate(expr: "++data.values[1]") as? Int == 11)
                #expect(try evaluator.evaluate(expr: "data.values[1]") as? Int == 11)
            }
            
            @Test("should handle negative index with postfix in nested array")
            func testNegativeIndexNestedArray() throws {
                let matrix: [[Int]] = [[1, 2], [3, 4], [5, 6]]
                try evaluator.declareContextValue("matrix", value: matrix, isConst: false)
                #expect(try evaluator.evaluate(expr: "matrix[-1][-1]++") as? Int == 6)
                #expect(try evaluator.evaluate(expr: "matrix[-1][-1]") as? Int == 7)
                #expect(try evaluator.evaluate(expr: "matrix[2][1]") as? Int == 7)
            }
            
            @Test("should handle expression in both array and object access")
            func testExpressionArrayObject() throws {
                let items: [[String: Any]] = [
                    ["count": 0],
                    ["count": 5]
                ]
                let complex: [String: Any] = ["items": items]
                try evaluator.declareContextValue("complex", value: complex, isConst: false)
                try evaluator.declareContextValue("idx", value: 0, isConst: false)
                #expect(try evaluator.evaluate(expr: "complex.items[idx + 1].count++") as? Int == 5)
                #expect(try evaluator.evaluate(expr: "complex.items[1].count") as? Int == 6)
            }
        }
    }

    // MARK: - Function Call Expressions Tests

    @Suite("Function Call Expressions")
    struct FunctionCallExpressionsTests {
        
        var evaluator: JexEvaluator
        
        init() throws {
            self.evaluator = try JexEvaluator()
        }
        
        @Suite("Math Functions")
        struct MathFunctions {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should evaluate abs function")
            func testEvaluateAbsFunction() throws {
                // number input
                #expect(try evaluator.evaluate(expr: "abs(-5)") as? Int == 5)
                #expect(try evaluator.evaluate(expr: "abs(3.14)") as? Double == 3.14)
                #expect(try evaluator.evaluate(expr: "abs(-10.5)") as? Double == 10.5)
                #expect(try evaluator.evaluate(expr: "abs(10.0)") as? Int == 10)
                #expect(try evaluator.evaluate(expr: "abs(0)") as? Int == 0)
                
                // string input
                #expect(try evaluator.evaluate(expr: "abs(\"-7\")") as? Int == 7)
                #expect(try evaluator.evaluate(expr: "abs(\"4.2\")") as? Double == 4.2)
                #expect(try evaluator.evaluate(expr: "abs(\"-0\")") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "abs(\"0\")") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "abs(\"-10.0\")") as? Int == 10)
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "abs(\"invalid\")")
                }
                
                // boolean input
                #expect(try evaluator.evaluate(expr: "abs(true)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "abs(false)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "abs(-false)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "abs(-true)") as? Int == 1)
                
                // null input
                #expect(try evaluator.evaluate(expr: "abs(null)") as? Int == 0)
            }
            
            @Test("should evaluate ceil function")
            func testEvaluateCeilFunction() throws {
                // number input
                #expect(try evaluator.evaluate(expr: "ceil(4.2)") as? Int == 5)
                #expect(try evaluator.evaluate(expr: "ceil(4.8)") as? Int == 5)
                #expect(try evaluator.evaluate(expr: "ceil(-4.2)") as? Int == -4)
                #expect(try evaluator.evaluate(expr: "ceil(0)") as? Int == 0)
                
                // string input
                #expect(try evaluator.evaluate(expr: "ceil(\"4.2\")") as? Int == 5)
                #expect(try evaluator.evaluate(expr: "ceil(\"4.8\")") as? Int == 5)
                #expect(try evaluator.evaluate(expr: "ceil(\"-4.2\")") as? Int == -4)
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "ceil(\"invalid\")")
                }
                
                // boolean input
                #expect(try evaluator.evaluate(expr: "ceil(true)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "ceil(false)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "ceil(0.3)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "ceil(-0.3)") as? Int == 0)
                
                // null input
                #expect(try evaluator.evaluate(expr: "ceil(null)") as? Int == 0)
            }
            
            @Test("should evaluate floor function")
            func testEvaluateFloorFunction() throws {
                // number input
                #expect(try evaluator.evaluate(expr: "floor(4.2)") as? Int == 4)
                #expect(try evaluator.evaluate(expr: "floor(4.8)") as? Int == 4)
                #expect(try evaluator.evaluate(expr: "floor(-4.2)") as? Int == -5)
                #expect(try evaluator.evaluate(expr: "floor(0)") as? Int == 0)
                
                // string input
                #expect(try evaluator.evaluate(expr: "floor(\"4.2\")") as? Int == 4)
                #expect(try evaluator.evaluate(expr: "floor(\"4.8\")") as? Int == 4)
                #expect(try evaluator.evaluate(expr: "floor(\"-4.2\")") as? Int == -5)
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "floor(\"invalid\")")
                }
                
                // boolean input
                #expect(try evaluator.evaluate(expr: "floor(true)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "floor(false)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "floor(0.7)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "floor(-0.3)") as? Int == -1)
                
                // null input
                #expect(try evaluator.evaluate(expr: "floor(null)") as? Int == 0)
            }
            
            @Test("should evaluate round function")
            func testEvaluateRoundFunction() throws {
                // number input
                #expect(try evaluator.evaluate(expr: "round(4.2)") as? Int == 4)
                #expect(try evaluator.evaluate(expr: "round(4.8)") as? Int == 5)
                #expect(try evaluator.evaluate(expr: "round(4.5)") as? Int == 5)
                #expect(try evaluator.evaluate(expr: "round(0)") as? Int == 0)
                
                // string input
                #expect(try evaluator.evaluate(expr: "round(\"4.2\")") as? Int == 4)
                #expect(try evaluator.evaluate(expr: "round(\"4.8\")") as? Int == 5)
                #expect(try evaluator.evaluate(expr: "round(\"4.5\")") as? Int == 5)
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "round(\"invalid\")")
                }
                
                // boolean input
                #expect(try evaluator.evaluate(expr: "round(true)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "round(false)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "round(0.5)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "round(-0.5)") as? Int == 0)
                
                // null input
                #expect(try evaluator.evaluate(expr: "round(null)") as? Int == 0)
            }
            
            @Test("should evaluate trunc function")
            func testEvaluateTruncFunction() throws {
                // number input
                #expect(try evaluator.evaluate(expr: "trunc(4.9)") as? Int == 4)
                #expect(try evaluator.evaluate(expr: "trunc(-4.9)") as? Int == -4)
                #expect(try evaluator.evaluate(expr: "trunc(0)") as? Int == 0)
                
                // string input
                #expect(try evaluator.evaluate(expr: "trunc(\"4.9\")") as? Int == 4)
                #expect(try evaluator.evaluate(expr: "trunc(\"-4.9\")") as? Int == -4)
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "trunc(\"invalid\")")
                }
                
                // boolean input
                #expect(try evaluator.evaluate(expr: "trunc(true)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "trunc(false)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "trunc(0.9)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "trunc(-0.9)") as? Int == 0)
                
                // null input
                #expect(try evaluator.evaluate(expr: "trunc(null)") as? Int == 0)
            }
            
            @Test("should evaluate min function")
            func testEvaluateMinFunction() throws {
                // number input
                #expect(try evaluator.evaluate(expr: "min(1, 2, 3)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "min(5, -2, 10)") as? Int == -2)
                #expect(try evaluator.evaluate(expr: "min(3.14, 2.71, 1.41)") as? Double == 1.41)
                #expect(try evaluator.evaluate(expr: "min(0)") as? Int == 0)
                
                // string input
                #expect(try evaluator.evaluate(expr: "min(\"1\", \"2\", \"3\")") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "min(\"5\", \"-2\", \"10\")") as? Int == -2)
                #expect(try evaluator.evaluate(expr: "min(\"3.14\", \"2.71\", \"1.41\")") as? Double == 1.41)
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "min(\"invalid\", \"1\")")
                }
                
                // boolean input
                #expect(try evaluator.evaluate(expr: "min(true, false)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "min(false, false)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "min(true, true)") as? Int == 1)
                
                // mixed input
                #expect(try evaluator.evaluate(expr: "min(3, \"2\", true, false)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "min(5, \"3\", false)") as? Int == 0)
                
                // null input
                #expect(try evaluator.evaluate(expr: "min(null, 1, 2)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "min(null)") as? Int == 0)
            }
            
            @Test("should evaluate max function")
            func testEvaluateMaxFunction() throws {
                // number input
                #expect(try evaluator.evaluate(expr: "max(1, 2, 3)") as? Int == 3)
                #expect(try evaluator.evaluate(expr: "max(5, -2, 10)") as? Int == 10)
                #expect(try evaluator.evaluate(expr: "max(3.14, 2.71, 1.41)") as? Double == 3.14)
                #expect(try evaluator.evaluate(expr: "max(0)") as? Int == 0)
                
                // string input
                #expect(try evaluator.evaluate(expr: "max(\"1\", \"2\", \"3\")") as? Int == 3)
                #expect(try evaluator.evaluate(expr: "max(\"5\", \"-2\", \"10\")") as? Int == 10)
                #expect(try evaluator.evaluate(expr: "max(\"3.14\", \"2.71\", \"1.41\")") as? Double == 3.14)
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "max(\"invalid\", \"1\")")
                }
                
                // boolean input
                #expect(try evaluator.evaluate(expr: "max(true, false)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "max(false, false)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "max(true, true)") as? Int == 1)
                
                // mixed input
                #expect(try evaluator.evaluate(expr: "max(3, \"2\", true, false)") as? Int == 3)
                #expect(try evaluator.evaluate(expr: "max(1, \"2\", true)") as? Int == 2)
                
                // null input
                #expect(try evaluator.evaluate(expr: "max(null, -1, 0)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "max(null)") as? Int == 0)
            }
            
            @Test("should evaluate pow function")
            func testEvaluatePowFunction() throws {
                // number input
                #expect(try evaluator.evaluate(expr: "pow(2, 3)") as? Int == 8)
                #expect(try evaluator.evaluate(expr: "pow(5, 2)") as? Int == 25)
                #expect(try evaluator.evaluate(expr: "pow(10, 0)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "pow(0, 5)") as? Int == 0)
                
                // string input
                #expect(try evaluator.evaluate(expr: "pow(\"2\", \"3\")") as? Int == 8)
                #expect(try evaluator.evaluate(expr: "pow(\"5\", \"2\")") as? Int == 25)
                #expect(try evaluator.evaluate(expr: "pow(\"10\", \"0\")") as? Int == 1)
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "pow(\"invalid\", 2)")
                }
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "pow(2, \"invalid\")")
                }
                
                // boolean input
                #expect(try evaluator.evaluate(expr: "pow(true, false)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "pow(false, true)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "pow(true, true)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "pow(false, false)") as? Int == 1)
                
                // mixed input
                #expect(try evaluator.evaluate(expr: "pow(2, \"3\")") as? Int == 8)
                #expect(try evaluator.evaluate(expr: "pow(\"5\", 2)") as? Int == 25)
                #expect(try evaluator.evaluate(expr: "pow(true, 3)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "pow(5, false)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "pow(false, 3)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "pow(5, true)") as? Int == 5)
                
                // null input
                #expect(try evaluator.evaluate(expr: "pow(null, 3)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "pow(5, null)") as? Int == 1)
            }
            
            @Test("should evaluate sqrt function")
            func testEvaluateSqrtFunction() throws {
                // number input
                #expect(try evaluator.evaluate(expr: "sqrt(16)") as? Int == 4)
                #expect(try evaluator.evaluate(expr: "sqrt(2.25)") as? Double == 1.5)
                #expect(try evaluator.evaluate(expr: "sqrt(0)") as? Int == 0)
                
                // string input
                #expect(try evaluator.evaluate(expr: "sqrt(\"16\")") as? Int == 4)
                #expect(try evaluator.evaluate(expr: "sqrt(\"2.25\")") as? Double == 1.5)
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "sqrt(\"invalid\")")
                }
                
                // boolean input
                #expect(try evaluator.evaluate(expr: "sqrt(true)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "sqrt(false)") as? Int == 0)
                
                // null input
                #expect(try evaluator.evaluate(expr: "sqrt(null)") as? Int == 0)
                
                // negative number should throw
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "sqrt(-4)")
                }
            }
            
            @Test("should evaluate cbrt function")
            func testEvaluateCbrtFunction() throws {
                // number input
                #expect(try evaluator.evaluate(expr: "cbrt(8)") as? Int == 2)
                #expect(try evaluator.evaluate(expr: "cbrt(27)") as? Int == 3)
                #expect(try evaluator.evaluate(expr: "cbrt(0)") as? Int == 0)
                #expect(try evaluator.evaluate(expr: "cbrt(-8)") as? Int == -2)
                
                // string input
                #expect(try evaluator.evaluate(expr: "cbrt(\"8\")") as? Int == 2)
                #expect(try evaluator.evaluate(expr: "cbrt(\"27\")") as? Int == 3)
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "cbrt(\"invalid\")")
                }
                
                // boolean input
                #expect(try evaluator.evaluate(expr: "cbrt(true)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "cbrt(false)") as? Int == 0)
                
                // null input
                #expect(try evaluator.evaluate(expr: "cbrt(null)") as? Int == 0)
            }
            
            @Test("should evaluate random function")
            func testEvaluateRandomFunction() throws {
                let result = try evaluator.evaluate(expr: "random()") as? Double
                #expect(result != nil)
                #expect((result ?? -1) >= 0)
                #expect((result ?? 2) < 1)
            }
            
            @Test("should evaluate sign function")
            func testEvaluateSignFunction() throws {
                // number input
                #expect(try evaluator.evaluate(expr: "sign(5)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "sign(-5)") as? Int == -1)
                #expect(try evaluator.evaluate(expr: "sign(0)") as? Int == 0)
                
                // string input
                #expect(try evaluator.evaluate(expr: "sign(\"5\")") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "sign(\"-5\")") as? Int == -1)
                #expect(try evaluator.evaluate(expr: "sign(\"0\")") as? Int == 0)
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "sign(\"invalid\")")
                }
                
                // boolean input
                #expect(try evaluator.evaluate(expr: "sign(true)") as? Int == 1)
                #expect(try evaluator.evaluate(expr: "sign(false)") as? Int == 0)
                
                // null input
                #expect(try evaluator.evaluate(expr: "sign(null)") as? Int == 0)
            }
        }
    }

    // MARK: - Transform Expressions Tests

    @Suite("Transform Expressions")
    struct TransformExpressionsTests {
        
        var evaluator: JexEvaluator
        
        init() throws {
            self.evaluator = try JexEvaluator()
        }
        
        @Suite("Built-in Transforms")
        struct BuiltInTransformsTests {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Suite("String Transforms")
            struct StringTransformsTests {
                
                var evaluator: JexEvaluator
                
                init() throws {
                    self.evaluator = try JexEvaluator()
                }
                
                @Test("should transform with upper")
                func testUpperTransform() throws {
                    #expect(try evaluator.evaluate(expr: "\"hello\" | upper") as? String == "HELLO")
                    #expect(try evaluator.evaluate(expr: "\"HeLLo WoRLd\" | upper") as? String == "HELLO WORLD")
                    #expect(try evaluator.evaluate(expr: "123 | upper") as? String == "123")
                    #expect(try evaluator.evaluate(expr: "true | upper") as? String == "TRUE")
                    #expect(try evaluator.evaluate(expr: "null | upper") as? String == "NULL")
                }
                
                @Test("should transform with lower")
                func testLowerTransform() throws {
                    #expect(try evaluator.evaluate(expr: "\"HELLO\" | lower") as? String == "hello")
                    #expect(try evaluator.evaluate(expr: "\"HeLLo WoRLd\" | lower") as? String == "hello world")
                    #expect(try evaluator.evaluate(expr: "123 | lower") as? String == "123")
                    #expect(try evaluator.evaluate(expr: "true | lower") as? String == "true")
                    #expect(try evaluator.evaluate(expr: "null | lower") as? String == "null")
                }
                
                @Test("should transform with capitalize")
                func testCapitalizeTransform() throws {
                    #expect(try evaluator.evaluate(expr: "\"hello world\" | capitalize") as? String == "Hello World")
                    #expect(try evaluator.evaluate(expr: "\"HELLO WORLD\" | capitalize") as? String == "Hello World")
                    #expect(try evaluator.evaluate(expr: "\"hello\" | capitalize") as? String == "Hello")
                    #expect(try evaluator.evaluate(expr: "\"a b c\" | capitalize") as? String == "A B C")
                    #expect(try evaluator.evaluate(expr: "123 | capitalize") as? String == "123")
                    #expect(try evaluator.evaluate(expr: "true | capitalize") as? String == "True")
                    #expect(try evaluator.evaluate(expr: "null | capitalize") as? String == "Null")
                }
                
                @Test("should transform with trim")
                func testTrimTransform() throws {
                    #expect(try evaluator.evaluate(expr: "\"  hello  \" | trim") as? String == "hello")
                    #expect(try evaluator.evaluate(expr: "\"hello\" | trim") as? String == "hello")
                    #expect(try evaluator.evaluate(expr: "\"  \" | trim") as? String == "")
                    #expect(try evaluator.evaluate(expr: "123 | trim") as? String == "123")
                    #expect(try evaluator.evaluate(expr: "true | trim") as? String == "true")
                    #expect(try evaluator.evaluate(expr: "null | trim") as? String == "null")
                }
                
                @Test("should chain string transforms")
                func testChainedStringTransforms() throws {
                    #expect(try evaluator.evaluate(expr: "\"  HELLO world  \" | trim | lower") as? String == "hello world")
                    #expect(try evaluator.evaluate(expr: "\"hello\" | upper | trim") as? String == "HELLO")
                    #expect(try evaluator.evaluate(expr: "\"  hello world  \" | trim | capitalize") as? String == "Hello World")
                }
            }
            
            @Suite("Numeric Transforms")
            struct NumericTransformsTests {
                
                var evaluator: JexEvaluator
                
                init() throws {
                    self.evaluator = try JexEvaluator()
                }
                
                @Test("should transform with abs")
                func testAbsTransform() throws {
                    #expect(try evaluator.evaluate(expr: "-5 | abs") as? Int == 5)
                    #expect(try evaluator.evaluate(expr: "3.14 | abs") as? Double == 3.14)
                    #expect(try evaluator.evaluate(expr: "-10.5 | abs") as? Double == 10.5)
                    #expect(try evaluator.evaluate(expr: "0 | abs") as? Int == 0)
                    #expect(try evaluator.evaluate(expr: "\"-7\" | abs") as? Int == 7)
                    #expect(try evaluator.evaluate(expr: "true | abs") as? Int == 1)
                    #expect(try evaluator.evaluate(expr: "false | abs") as? Int == 0)
                    #expect(try evaluator.evaluate(expr: "null | abs") as? Int == 0)
                }
                
                @Test("should transform with floor")
                func testFloorTransform() throws {
                    #expect(try evaluator.evaluate(expr: "4.2 | floor") as? Int == 4)
                    #expect(try evaluator.evaluate(expr: "4.8 | floor") as? Int == 4)
                    #expect(try evaluator.evaluate(expr: "-4.2 | floor") as? Int == -5)
                    #expect(try evaluator.evaluate(expr: "0 | floor") as? Int == 0)
                    #expect(try evaluator.evaluate(expr: "\"4.7\" | floor") as? Int == 4)
                    #expect(try evaluator.evaluate(expr: "true | floor") as? Int == 1)
                    #expect(try evaluator.evaluate(expr: "null | floor") as? Int == 0)
                }
                
                @Test("should transform with ceil")
                func testCeilTransform() throws {
                    #expect(try evaluator.evaluate(expr: "4.2 | ceil") as? Int == 5)
                    #expect(try evaluator.evaluate(expr: "4.8 | ceil") as? Int == 5)
                    #expect(try evaluator.evaluate(expr: "-4.2 | ceil") as? Int == -4)
                    #expect(try evaluator.evaluate(expr: "0 | ceil") as? Int == 0)
                    #expect(try evaluator.evaluate(expr: "\"4.1\" | ceil") as? Int == 5)
                    #expect(try evaluator.evaluate(expr: "true | ceil") as? Int == 1)
                    #expect(try evaluator.evaluate(expr: "null | ceil") as? Int == 0)
                }
                
                @Test("should transform with round")
                func testRoundTransform() throws {
                    #expect(try evaluator.evaluate(expr: "4.2 | round") as? Int == 4)
                    #expect(try evaluator.evaluate(expr: "4.8 | round") as? Int == 5)
                    #expect(try evaluator.evaluate(expr: "4.5 | round") as? Int == 5)
                    #expect(try evaluator.evaluate(expr: "0 | round") as? Int == 0)
                    #expect(try evaluator.evaluate(expr: "\"4.6\" | round") as? Int == 5)
                    #expect(try evaluator.evaluate(expr: "true | round") as? Int == 1)
                    #expect(try evaluator.evaluate(expr: "null | round") as? Int == 0)
                }
                
                @Test("should chain numeric transforms")
                func testChainedNumericTransforms() throws {
                    #expect(try evaluator.evaluate(expr: "-4.7 | abs | floor") as? Int == 4)
                    #expect(try evaluator.evaluate(expr: "4.3 | ceil | abs") as? Int == 5)
                    #expect(try evaluator.evaluate(expr: "-4.8 | abs | round") as? Int == 5)
                }
            }
            
            @Suite("Length Transform")
            struct LengthTransformTests {
                
                var evaluator: JexEvaluator
                
                init() throws {
                    self.evaluator = try JexEvaluator()
                }
                
                @Test("should transform array with length")
                func testArrayLength() throws {
                    #expect(try evaluator.evaluate(expr: "[1,2,3] | length") as? Int == 3)
                    #expect(try evaluator.evaluate(expr: "[] | length") as? Int == 0)
                    #expect(try evaluator.evaluate(expr: "[1,2,3,4,5] | length") as? Int == 5)
                }
                
                @Test("should transform string with length")
                func testStringLength() throws {
                    #expect(try evaluator.evaluate(expr: "\"hello\" | length") as? Int == 5)
                    #expect(try evaluator.evaluate(expr: "\"\" | length") as? Int == 0)
                    #expect(try evaluator.evaluate(expr: "\"hello world\" | length") as? Int == 11)
                }
                
                @Test("should transform object with length")
                func testObjectLength() throws {
                    #expect(try evaluator.evaluate(expr: "{\"a\":1,\"b\":2} | length") as? Int == 2)
                    #expect(try evaluator.evaluate(expr: "{} | length") as? Int == 0)
                    #expect(try evaluator.evaluate(expr: "{\"x\":1,\"y\":2,\"z\":3} | length") as? Int == 3)
                }
                
                @Test("should return 0 for other types")
                func testLengthOtherTypes() throws {
                    #expect(try evaluator.evaluate(expr: "123 | length") as? Int == 0)
                    #expect(try evaluator.evaluate(expr: "true | length") as? Int == 0)
                    #expect(try evaluator.evaluate(expr: "null | length") as? Int == 0)
                }
            }
            
            @Suite("Type Conversion Transforms")
            struct TypeConversionTransformsTests {
                
                var evaluator: JexEvaluator
                
                init() throws {
                    self.evaluator = try JexEvaluator()
                }
                
                @Test("should transform with number")
                func testNumberTransform() throws {
                    #expect(try evaluator.evaluate(expr: "\"42\" | number") as? Int == 42)
                    #expect(try evaluator.evaluate(expr: "\"3.14\" | number") as? Double == 3.14)
                    #expect(try evaluator.evaluate(expr: "true | number") as? Int == 1)
                    #expect(try evaluator.evaluate(expr: "false | number") as? Int == 0)
                    #expect(try evaluator.evaluate(expr: "null | number") as? Int == 0)
                    #expect(throws: ExceptionError.self) {
                        try evaluator.evaluate(expr: "\"invalid\" | number")
                    }
                }
                
                @Test("should transform with string")
                func testStringTransform() throws {
                    #expect(try evaluator.evaluate(expr: "42 | string") as? String == "42")
                    #expect(try evaluator.evaluate(expr: "3.14 | string") as? String == "3.14")
                    #expect(try evaluator.evaluate(expr: "true | string") as? String == "true")
                    #expect(try evaluator.evaluate(expr: "null | string") as? String == "null")
                    #expect(try evaluator.evaluate(expr: "[1, 2, 3] | string") as? String == "[1, 2, 3]")
                }
                
                @Test("should transform with boolean")
                func testBooleanTransform() throws {
                    #expect(try evaluator.evaluate(expr: "1 | boolean") as? Bool == true)
                    #expect(try evaluator.evaluate(expr: "0 | boolean") as? Bool == false)
                    #expect(try evaluator.evaluate(expr: "\"hello\" | boolean") as? Bool == true)
                    #expect(try evaluator.evaluate(expr: "\"\" | boolean") as? Bool == false)
                    #expect(try evaluator.evaluate(expr: "null | boolean") as? Bool == false)
                    #expect(try evaluator.evaluate(expr: "[1] | boolean") as? Bool == true)
                    #expect(try evaluator.evaluate(expr: "[] | boolean") as? Bool == false)
                    #expect(try evaluator.evaluate(expr: "{\"a\":1} | boolean") as? Bool == true)
                    #expect(try evaluator.evaluate(expr: "{} | boolean") as? Bool == false)
                }
                
                @Test("should transform with int")
                func testIntTransform() throws {
                    #expect(try evaluator.evaluate(expr: "\"42\" | int") as? Int == 42)
                    #expect(try evaluator.evaluate(expr: "\"3.14\" | int") as? Int == 3)
                    #expect(try evaluator.evaluate(expr: "5.9 | int") as? Int == 5)
                    #expect(try evaluator.evaluate(expr: "-4.7 | int") as? Int == -4)
                }
                
                @Test("should transform with float")
                func testFloatTransform() throws {
                    let result1 = try evaluator.evaluate(expr: "\"3.14\" | float") as? Double
                    #expect(abs((result1 ?? 0) - 3.140000104904175) < 0.001)
                    #expect(try evaluator.evaluate(expr: "\"42\" | float") as? Double == 42.0)
                    #expect(try evaluator.evaluate(expr: "5 | float") as? Double == 5.0)
                }
                
                @Test("should transform with double")
                func testDoubleTransform() throws {
                    #expect(try evaluator.evaluate(expr: "\"3.14159\" | double") as? Double == 3.14159)
                    #expect(try evaluator.evaluate(expr: "\"42\" | double") as? Double == 42.0)
                    #expect(try evaluator.evaluate(expr: "5 | double") as? Double == 5.0)
                }
                
                @Test("should chain type conversions")
                func testChainedTypeConversions() throws {
                    #expect(try evaluator.evaluate(expr: "\"3.7\" | number | int") as? Int == 3)
                    #expect(try evaluator.evaluate(expr: "42 | string | upper") as? String == "42")
                    #expect(try evaluator.evaluate(expr: "\"5.5\" | float | round") as? Int == 6)
                }
            }
        }
        
        @Suite("Custom Transforms")
        struct CustomTransformTests {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should add and use custom transform")
            func testCustomTransform() throws {
                evaluator.addTransform(name: "double") { input, _ in
                    JexValueFactory.from(toNumber(value: input, ctx: "double").doubleValue * 2)
                }
                #expect(try evaluator.evaluate(expr: "5 | double") as? Int == 10)
                #expect(try evaluator.evaluate(expr: "3.5 | double") as? Double == 7)
            }
            
            @Test("should add and use custom string transform")
            func testCustomStringTransform() throws {
                evaluator.addTransform(name: "reverse") { input, _ in
                    JexValueFactory.from(String(toString(value: input, ctx: "reverse").reversed()))
                }
                #expect(try evaluator.evaluate(expr: "\"hello\" | reverse") as? String == "olleh")
                #expect(try evaluator.evaluate(expr: "\"abc\" | reverse") as? String == "cba")
            }
            
            @Test("should add and use custom array transform")
            func testCustomArrayTransform() throws {
                evaluator.addTransform(name: "sort") { input, _ in
                    if let arr = input.toObject() as? [Any] {
                        let sorted = arr.compactMap { toNumber(value: JexValueFactory.from($0), ctx: "sort").doubleValue }
                            .sorted()
                        return JexValueFactory.from(sorted)
                    }
                    return input
                }
                
                #expect(deepEqual(try evaluator.evaluate(expr: "[3,1,4,1,5] | sort"), [1.0, 1.0, 3.0, 4.0, 5.0]))
                #expect(deepEqual(try evaluator.evaluate(expr: "[10,2,8,5] | sort"), [2.0, 5.0, 8.0, 10.0]))
            }
            
            @Test("should use custom transform with context")
            func testTransformWithContext() throws {
                evaluator.addTransform(name: "prefix") { input, ctx in
                    let prefix = ctx.getJexEvaluator().getContextValue("prefix") as? String ?? ""
                    return JexValueFactory.from(prefix + toString(value: input, ctx: "prefix"))
                }
                try evaluator.declareContextValue("prefix", value: "Hello: ", isConst: false)
                
                #expect(try evaluator.evaluate(expr: "\"World\" | prefix") as? String == "Hello: World")
            }
            
            @Test("should mix built-in and custom transforms")
            func testMixedTransformChain() throws {
                evaluator.addTransform(name: "square") { input, _ in
                    let n = toNumber(value: input, ctx: "square").doubleValue
                    return JexValueFactory.from(n * n)
                }
                
                #expect(try evaluator.evaluate(expr: "4.7 | floor | square") as? Int == 16)
                #expect(try evaluator.evaluate(expr: "-3 | abs | square") as? Int == 9)
            }
            
            @Test("should remove custom transform")
            func testRemoveTransform() throws {
                evaluator.addTransform(name: "t") { input, _ in input }
                #expect(evaluator.hasTransform(name: "t"))
                
                evaluator.removeTransform(name: "t")
                #expect(!evaluator.hasTransform(name: "t"))
                
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "5 | t")
                }
            }
            
            @Test("should reset custom transforms")
            func testResetTransforms() throws {
                evaluator.addTransform(name: "t1") { input, _ in input }
                evaluator.addTransform(name: "t2") { input, _ in input }
                
                evaluator.resetTransforms()
                
                #expect(!evaluator.hasTransform(name: "t1"))
                #expect(!evaluator.hasTransform(name: "t2"))
            }
        }
        
        @Suite("Transform Expressions with Variables")
        struct TransformWithVariablesTests {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should transform variable value")
            func testVariableTransform() throws {
                try evaluator.declareContextValue("name", value: "john", isConst: false)
                #expect(try evaluator.evaluate(expr: "name | upper") as? String == "JOHN")
            }
            
            @Test("should transform array variable")
            func testArrayVariableTransform() throws {
                try evaluator.declareContextValue("arr", value: [1, 2, 3, 4, 5], isConst: false)
                #expect(try evaluator.evaluate(expr: "arr | length") as? Int == 5)
            }
            
            @Test("should transform object variable")
            func testObjectVariableTransform() throws {
                try evaluator.declareContextValue("obj", value: ["a": 1, "b": 2, "c": 3], isConst: false)
                #expect(try evaluator.evaluate(expr: "obj | length") as? Int == 3)
            }
            
            @Test("should transform member access")
            func testMemberAccessTransform() throws {
                try evaluator.declareContextValue("user", value: ["name": "alice"], isConst: false)
                #expect(try evaluator.evaluate(expr: "user.name | upper") as? String == "ALICE")
            }
            
            @Test("should transform array element")
            func testArrayIndexTransform() throws {
                try evaluator.declareContextValue("items", value: ["hello", "world"], isConst: false)
                #expect(try evaluator.evaluate(expr: "items[0] | upper") as? String == "HELLO")
            }
        }
        
        @Suite("Transform Expressions with Expressions")
        struct TransformInExpressionsTests {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should transform arithmetic result")
            func testArithmeticTransform() throws {
                #expect(try evaluator.evaluate(expr: "(2 + 3) | string") as? String == "5")
                #expect(try evaluator.evaluate(expr: "(10 / 3) | floor") as? Int == 3)
            }
            
            @Test("should transform ternary result")
            func testTernaryTransform() throws {
                #expect(try evaluator.evaluate(expr: "(true ? \"hello\" : \"world\") | upper") as? String == "HELLO")
                #expect(try evaluator.evaluate(expr: "(false ? 10 : 20) | string") as? String == "20")
            }
            
            @Test("should transform function result")
            func testFunctionTransform() throws {
                #expect(try evaluator.evaluate(expr: "abs(-5) | string") as? String == "5")
                #expect(try evaluator.evaluate(expr: "min(1,2,3) | double") as? Double == 1.0)
            }
        }
        
        @Suite("Fallback to Functions")
        struct TransformFallbackTests {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should use function if transform not found")
            func testFallbackToFunction() throws {
                evaluator.addFunction(name: "triple") { _, args in
                    JexValueFactory.from(toNumber(value: args[0], ctx: "triple").int64Value * 3)
                }
                #expect(try evaluator.evaluate(expr: "5 | triple") as? Int == 15)
            }
            
            @Test("should prefer transform over function")
            func testTransformWins() throws {
                evaluator.addTransform(name: "multiply") { input, _ in
                    JexValueFactory.from(toNumber(value: input, ctx: "multiply").int64Value * 2)
                }
                evaluator.addFunction(name: "multiply") { _, args in
                    JexValueFactory.from(toNumber(value: args[0], ctx: "multiply").int64Value * 3)
                }
                
                #expect(try evaluator.evaluate(expr: "5 | multiply") as? Int == 10)
            }
            
            @Test("should throw if neither exists")
            func testMissingTransformAndFunction() {
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "5 | nonexistent")
                }
            }
        }
        
        @Suite("Complex Transform Scenarios")
        struct ComplexTransformTests {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should handle multiple chained transforms")
            func testMultipleChained() throws {
                #expect(try evaluator.evaluate(expr: "\"  hello world  \" | trim | upper | length") as? Int == 11)
                #expect(try evaluator.evaluate(expr: "4.7 | abs | floor | string") as? String == "4")
            }
            
            @Test("should transform inside expressions")
            func testTransformInsideExpression() throws {
                try evaluator.declareContextValue("text", value: "hello", isConst: false)
                #expect(try evaluator.evaluate(expr: "(text | upper) + \" WORLD\"") as? String == "HELLO WORLD")
            }
            
            @Test("should transform in conditional expressions")
            func testTransformInConditional() throws {
                #expect(try evaluator.evaluate(expr: "(\"hello\" | length) > 3 ? \"long\" : \"short\"") as? String == "long")
            }
            
            @Test("should handle transforms in repeat expressions")
            func testRepeatTransform() throws {
                let result = try evaluator.evaluate(expr: """
                    let arr = ["hello", "world"];
                    let result = "";
                    repeat(arr) {
                        result = result + ($it | upper) + " ";
                    }
                    result | trim;
                    """)
                #expect(result as? String == "HELLO WORLD")
            }
            
            @Test("should handle nested transforms")
            func testNestedTransforms() throws {
                evaluator.addTransform(name: "wrap") { input, _ in
                    JexValueFactory.from("[" + toString(value: input, ctx: "wrap") + "]")
                }
                #expect(try evaluator.evaluate(expr: "\"hello\" | upper | wrap") as? String == "[HELLO]")
            }
            
            @Test("should handle array comprehension-like patterns")
            func testArrayComprehension() throws {
                let result = try evaluator.evaluate(expr: """
                    let words = ["hello","world","test"];
                    let upper = [];
                    repeat(words) {
                        push(upper, $it | upper);
                    }
                    upper;
                    """)
                
                #expect(deepEqual(result, ["HELLO", "WORLD", "TEST"]))
            }
        }
        
        @Suite("Transform Error Handling")
        struct TransformErrorHandlingTests {
            
            var evaluator: JexEvaluator
            
            init() throws {
                self.evaluator = try JexEvaluator()
            }
            
            @Test("should handle transform errors")
            func testTransformError() throws {
                evaluator.addTransform(name: "err") { input, ctx in
                    NSException.raise(jexLangError: JexLangRuntimeError(message: "Transform error"))
                    return JexNull()
                }
                
                #expect(throws: ExceptionError.self) {
                    try evaluator.evaluate(expr: "5 | err")
                }
            }
        }
    }
}

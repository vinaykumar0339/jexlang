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
    
}

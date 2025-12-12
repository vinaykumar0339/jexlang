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
            assertEquals(42, try evaluator.evaluate(expr: "42"))
            assertEquals(true, try evaluator.evaluate(expr: "true"))
            assertEquals("hello", try evaluator.evaluate(expr: "\"hello\""))
            assertNil(try evaluator.evaluate(expr: "null"))
        }
        
        @Test("hould evaluate arithmetic expressions")
        func testEvaluate_Arithmetic() throws {
            assertEquals(5, try evaluator.evaluate(expr: "2 + 3"));
            assertEquals(6, try evaluator.evaluate(expr: "10 - 4"));
            assertEquals(15, try evaluator.evaluate(expr: "5 * 3"));
            assertEquals(5, try evaluator.evaluate(expr: "10 / 2"));
        }
        
        @Test("should evaluate with program scope context")
        func testEvaluate_ProgramScopeContext() throws {

            let result = try evaluator.evaluate(expr: "x + y", programScopeVariables: [
                "x": 5,
                "y": 10
            ]);

            assertEquals(15, result);
        }
        
        @Test("should handle context variables")
        func testEvaluate_ContextVariables() throws {
            try evaluator.declareContextValue("value", value: 0, isConst: false);

            try evaluator.setContextValue("value", 100);

            assertEquals(100, try evaluator.evaluate(expr: "value"));
        }
    }
    
}

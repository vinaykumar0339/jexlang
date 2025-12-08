package io.github.vinaykumar0339.evaluator;

import io.github.vinaykumar0339.Utils;
import io.github.vinaykumar0339.eval.errors.JexLangRuntimeError;
import io.github.vinaykumar0339.functions.FuncImpl;
import io.github.vinaykumar0339.transforms.TransformImpl;
import io.github.vinaykumar0339.types.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.nio.file.DirectoryNotEmptyException;
import java.util.*;

import static java.util.Arrays.asList;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("JexEvaluator Tests")
public class JexEvaluatorTestCase {

    private JexEvaluator evaluator;

    @BeforeEach
    public void setup() {
        evaluator = new JexEvaluator(
                new HashMap<>(),
                new HashMap<>(),
                new HashMap<>()
        );
    }

    @Nested
    @DisplayName("Constructor Tests")
    class ConstructorTests {
        @Test
        @DisplayName("Test Constructor with Default Parameters")
        void testConstructor_DefaultParameters() {
            assertNotNull(evaluator);
            assertNotNull(evaluator.getGlobalScopeVariables());
        }

        @Test
        @DisplayName("Test Constructor with Custom Context")
        void testConstructor_CustomContext() {
            Map<String, Object> context = new HashMap<>();
            context.put("x", 10);
            context.put("y", 20);

            JexEvaluator evaluator = new JexEvaluator(
                    context,
                    new HashMap<>(),
                    new HashMap<>()
            );
            assertEquals(10, evaluator.getContextValue("x"));
            assertEquals(20, evaluator.getContextValue("y"));
        }

        @Test
        @DisplayName("Test Constructor with Custom Functions")
        void testConstructor_CustomFunctions() {
            FuncImpl customFunc = (ctx, args) -> JexValue.from("test");

            Map<String, FuncImpl> funcs = new HashMap<>();
            funcs.put("customFunc", customFunc);

            JexEvaluator evaluator = new JexEvaluator(new HashMap<>(), funcs, new HashMap<>());

            assertTrue(evaluator.hasFunction("customFunc"));
        }

        @Test
        @DisplayName("Test Constructor with Custom Transforms")
        void testConstructor_CustomTransforms() {
            TransformImpl customTransform = (input, ctx) -> input;

            Map<String, TransformImpl> transforms = new HashMap<>();
            transforms.put("customTransform", customTransform);

            JexEvaluator evaluator = new JexEvaluator(new HashMap<>(), new HashMap<>(), transforms);

            assertTrue(evaluator.hasTransform("customTransform"));
        }
    }

    @Nested
    @DisplayName("Evaluate Tests")
    class EvaluateTests {

        @Test
        @DisplayName("should evaluate simple literal expressions")
        void testEvaluate_Literals() {
            assertEquals(42, evaluator.evaluate("42"));
            assertEquals(true, evaluator.evaluate("true"));
            assertEquals("hello", evaluator.evaluate("\"hello\""));
            assertNull(evaluator.evaluate("null"));
        }

        @Test
        @DisplayName("should evaluate arithmetic expressions")
        void testEvaluate_Arithmetic() {
            assertEquals(5, evaluator.evaluate("2 + 3"));
            assertEquals(6, evaluator.evaluate("10 - 4"));
            assertEquals(15, evaluator.evaluate("5 * 3"));
            assertEquals(5, evaluator.evaluate("10 / 2"));
        }

        @Test
        @DisplayName("should evaluate with program scope context")
        void testEvaluate_ProgramScopeContext() {
            Map<String, Object> ctx = Map.of("x", 5, "y", 10);

            Object result = evaluator.evaluate("x + y", ctx);

            assertEquals(15, result);
        }

        @Test
        @DisplayName("should handle context variables")
        void testEvaluate_ContextVariables() {
            evaluator.declareContextValue("value", 0, false);

            evaluator.setContextValue("value", 100);

            assertEquals(100, evaluator.evaluate("value"));
        }
    }

    @Nested
    @DisplayName("evaluate sync function tests")
    class EvaluateSyncFunctionTests {
        @Test
        @DisplayName("should evaluate synchronously")
        void testEvaluate_AsyncFunctionCalls() {
            assertEquals(5, evaluator.evaluate("2 + 3"));
        }

        @Test
        @DisplayName("should work with program scope context")
        void testEvaluate_AsyncFunctionWithContext() {
            Map<String, Object> ctx = Map.of("a", 4, "b", 5);

            Object result = evaluator.evaluate("a * b", ctx);

            assertEquals(20, result);
        }

    }

    // TODO: Here in future if i enhance the library to support async functions, then add tests here

    @Nested
    @DisplayName("context management")
    class ContextManagementTests {

        @Test
        @DisplayName("should set context value only if already declared")
        void testSetContextValueOnlyIfDeclared() {
            // declare first
            evaluator.declareContextValue("key", "initial", false);
            assertEquals("initial", evaluator.getContextValue("key"));

            // set new value
            evaluator.setContextValue("key", "value");
            assertEquals("value", evaluator.getContextValue("key"));
        }

        @Test
        @DisplayName("should throw error when setting undeclared variable")
        void testSetContextValueThrowsForUndeclared() {
            assertThrows(
                    RuntimeException.class,
                    () -> evaluator.setContextValue("undeclared", "value")
            );
        }

        @Test
        @DisplayName("should declare context value")
        void testDeclareContextValue() {
            evaluator.declareContextValue("newVar", 42, false);
            assertEquals(42, evaluator.getContextValue("newVar"));
        }

        @Test
        @DisplayName("should declare const context value and reject reassignment")
        void testDeclareConstContextValue() {
            evaluator.declareContextValue("constVar", 100, true);
            assertEquals(100, evaluator.getContextValue("constVar"));

            // reassign should fail
            assertThrows(
                    RuntimeException.class,
                    () -> evaluator.setContextValue("constVar", 200)
            );
        }

        @Test
        @DisplayName("should set or declare context value")
        void testSetOrDeclareContextValue() {
            // declare new
            evaluator.setContextOrDeclareContextValue("var1", 10, false);
            assertEquals(10, evaluator.getContextValue("var1"));

            // update existing
            evaluator.setContextOrDeclareContextValue("var1", 20, false);
            assertEquals(20, evaluator.getContextValue("var1"));
        }

        @Test
        @DisplayName("should return null for undefined context value")
        void testGetUndefinedContextValue() {
            assertNull(evaluator.getContextValue("nonexistent"));
        }

        @Test
        @DisplayName("should reset context and clear variables")
        void testResetContext() {
            evaluator.declareContextValue("key", "initial", false);
            evaluator.setContextValue("key", "value");

            evaluator.resetContext();

            // should return null after reset
            assertNull(evaluator.getContextValue("key"));
        }

        @Test
        @DisplayName("should get global scope variables (e.g., PI, E)")
        void testGetGlobalScopeVariables() {
            Map<String, Object> vars = evaluator.getGlobalScopeVariables();

            assertNotNull(vars);
            assertTrue(vars.containsKey("PI"));
            assertTrue(vars.containsKey("E"));

            assertEquals(Math.PI, vars.get("PI"));
            assertEquals(Math.E, vars.get("E"));
        }
    }

    @Nested
    @DisplayName("function management")
    class FunctionManagementTests {

        @Test
        @DisplayName("should add a function")
        void testAddFunction() {
            FuncImpl testFunc = (ctx, args) -> JexValue.from("test");

            evaluator.addFunction("testFunc", testFunc);
            assertTrue(evaluator.hasFunction("testFunc"));
        }

        @Test
        @DisplayName("should add multiple functions")
        void testAddMultipleFunctions() {
            Map<String, FuncImpl> funcs = new HashMap<>();
            funcs.put("func1", (ctx, args) -> JexValue.from(1));
            funcs.put("func2", (ctx, args) -> JexValue.from(2));

            evaluator.addFunctions(funcs);

            assertTrue(evaluator.hasFunction("func1"));
            assertTrue(evaluator.hasFunction("func2"));
        }

        @Test
        @DisplayName("should remove a function")
        void testRemoveFunction() {
            FuncImpl testFunc = (ctx, args) -> JexValue.from("test");

            evaluator.addFunction("testFunc", testFunc);
            assertTrue(evaluator.hasFunction("testFunc"));

            evaluator.removeFunction("testFunc");
            assertFalse(evaluator.hasFunction("testFunc"));
        }

        @Test
        @DisplayName("should get all functions")
        void testGetAllFunctions() {
            FuncImpl testFunc = (ctx, args) -> JexValue.from("test");

            evaluator.addFunction("testFunc", testFunc);

            Map<String, FuncImpl> allFuncs = evaluator.getAllFunctions();

            assertNotNull(allFuncs);
            assertTrue(allFuncs.containsKey("testFunc"));
            assertNotNull(allFuncs.get("testFunc"));
        }

        @Test
        @DisplayName("should reset functions")
        void testResetFunctions() {
            FuncImpl testFunc = (ctx, args) -> JexValue.from("test");

            evaluator.addFunction("testFunc", testFunc);
            assertTrue(evaluator.hasFunction("testFunc"));

            evaluator.resetFunctions();
            assertFalse(evaluator.hasFunction("testFunc"));
        }
    }

    @Nested
    @DisplayName("transform management")
    class TransformManagementTests {

        @Test
        @DisplayName("should add a transform")
        void testAddTransform() {
            TransformImpl testTransform = (input, ctx) -> input;

            evaluator.addTransform("testTransform", testTransform);
            assertTrue(evaluator.hasTransform("testTransform"));
        }

        @Test
        @DisplayName("should add multiple transforms")
        void testAddMultipleTransforms() {
            Map<String, TransformImpl> transforms = new HashMap<>();
            transforms.put("transform1", (input, ctx) -> input);
            transforms.put("transform2", (input, ctx) -> input);

            evaluator.addTransforms(transforms);

            assertTrue(evaluator.hasTransform("transform1"));
            assertTrue(evaluator.hasTransform("transform2"));
        }

        @Test
        @DisplayName("should remove a transform")
        void testRemoveTransform() {
            TransformImpl testTransform = (input, ctx) -> input;

            evaluator.addTransform("testTransform", testTransform);
            assertTrue(evaluator.hasTransform("testTransform"));

            evaluator.removeTransform("testTransform");
            assertFalse(evaluator.hasTransform("testTransform"));
        }

        @Test
        @DisplayName("should get all transforms")
        void testGetAllTransforms() {
            TransformImpl testTransform = (input, ctx) -> input;

            evaluator.addTransform("testTransform", testTransform);

            Map<String, TransformImpl> allTransforms = evaluator.getAllTransforms();

            assertNotNull(allTransforms);
            assertTrue(allTransforms.containsKey("testTransform"));
            assertNotNull(allTransforms.get("testTransform"));
        }

        @Test
        @DisplayName("should reset transforms")
        void testResetTransforms() {
            TransformImpl testTransform = (input, ctx) -> input;

            evaluator.addTransform("testTransform", testTransform);
            assertTrue(evaluator.hasTransform("testTransform"));

            evaluator.resetTransforms();

            assertFalse(evaluator.hasTransform("testTransform"));
        }
    }

    @Nested
    @DisplayName("caching")
    class CachingTests {

        @Test
        @DisplayName("should enable expression caching")
        void testEnableExpressionCaching() {
            evaluator.setCacheExpressions(true);
            assertTrue(evaluator.getCacheExpressions());
        }

        @Test
        @DisplayName("should disable expression caching")
        void testDisableExpressionCaching() {
            evaluator.setCacheExpressions(true);
            evaluator.setCacheExpressions(false);
            assertFalse(evaluator.getCacheExpressions());
        }

        @Test
        @DisplayName("should cache parsed expressions when enabled")
        void testCacheParsedExpressions() {
            evaluator.setCacheExpressions(true);
            String expr = "2 + 3";

            // First evaluation parses and caches
            assertEquals(5, evaluator.evaluate(expr));

            // Second evaluation should hit cache
            assertEquals(5, evaluator.evaluate(expr));
        }

        @Test
        @DisplayName("should clear cached parsed expressions")
        void testClearCachedParsedExpressions() {
            evaluator.setCacheExpressions(true);
            evaluator.evaluate("2 + 3");

            evaluator.clearCachedParsedExpressions();

            // After clearing, evaluation still works
            assertEquals(5, evaluator.evaluate("2 + 3"));
        }
    }

    @Nested
    @DisplayName("error handling")
    class ErrorHandlingTests {

        @Test
        @DisplayName("should throw syntax errors for invalid expressions")
        void testSyntaxErrors() {
            assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("2 +"));
            assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("("));
        }

        @Test
        @DisplayName("should handle multiple syntax errors")
        void testMultipleSyntaxErrors() {
            assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("((("));
        }
    }

    @Nested
    @DisplayName("integration tests")
    class IntegrationTests {

        @Test
        @DisplayName("should handle complex expressions")
        void testComplexExpressions() {
            assertEquals(27, evaluator.evaluate("(10 + 5) * 2 - 3"));
        }

        @Test
        @DisplayName("should work with variables and functions together")
        void testVariablesAndFunctions() {
            // Declare and set variable
            evaluator.declareContextValue("x", 0, false);
            evaluator.setContextValue("x", 5);

            // Add a function: double(val) => val * 2
            evaluator.addFunction("double", (ctx, args) -> {
                Number val = args[0].asInteger("double");
                return JexValue.from(val.longValue() * 2);
            });

            assertEquals(20, evaluator.evaluate("double(x) + 10"));
        }

        @Test
        @DisplayName("should support chained operations")
        void testChainedOperations() {
            // Declare and set an array variable
            evaluator.declareContextValue("arr", 0, false);
            evaluator.setContextValue("arr", new ArrayList<>(asList(1, 2, 3)));

            // Assuming evaluator has a built-in `length` function for arrays
            assertEquals(3, evaluator.evaluate("length(arr)"));
        }
    }

    @Nested
    @DisplayName("additive expressions")
    class AdditiveExpressionsTests {

        @Test
        @DisplayName("simple addition")
        void testSimpleAddition() {
            Object result = evaluator.evaluate("1 + 2");
            assertEquals(3, result);
        }

        @Test
        @DisplayName("addition with negative number")
        void testAdditionWithNegative() {
            Object result = evaluator.evaluate("5 + -3");
            assertEquals(2, result);
        }

        @Test
        @DisplayName("multiple additions")
        void testMultipleAdditions() {
            Object result = evaluator.evaluate("1 + 2 + 3 + 4");
            assertEquals(10, result);
        }

        @Test
        @DisplayName("addition and subtraction")
        void testAdditionAndSubtraction() {
            Object result = evaluator.evaluate("10 + 5 - 3 + 2 - 1");
            assertEquals(13, result);
        }

        @Test
        @DisplayName("addition with parentheses")
        void testAdditionWithParentheses() {
            Object result = evaluator.evaluate("(1 + 2) + (3 + 4)");
            assertEquals(10, result);
        }

        @Test
        @DisplayName("string and number addition")
        void testStringAndNumberAddition() {
            assertEquals("The answer is: 42", evaluator.evaluate("\"The answer is: \" + 42"));
            assertEquals("42 is the answer", evaluator.evaluate("42 + \" is the answer\""));
            assertEquals("105", evaluator.evaluate("\"10\" + 5"));
            assertEquals("510", evaluator.evaluate("5 + \"10\""));
            assertEquals("11000", evaluator.evaluate("\"1\" + 100 + \"0\""));
            assertEquals("2.03.5", evaluator.evaluate("\"2.0\" + 3.5"));
            assertEquals("3.52.0", evaluator.evaluate("3.5 + \"2.0\""));
            assertEquals("2.02100", evaluator.evaluate("\"2.0\" + 2 + 100"));
            assertEquals("42.0", evaluator.evaluate("2 + 2 + \"2.0\""));
            assertEquals("2.0102", evaluator.evaluate("\"2.0\" + (2 + 100)"));
        }

        @Test
        @DisplayName("string concatenation")
        void testStringConcatenation() {
            assertEquals("Hello, world!", evaluator.evaluate("\"Hello, \" + \"world!\""));
            assertEquals("FooBarBaz", evaluator.evaluate("\"Foo\" + \"Bar\" + \"Baz\""));
            assertEquals("The answer is: 42", evaluator.evaluate("\"The answer is: \" + \"42\""));

            // invalid operation (string - number) should throw
            assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("\"Value: \" - 100"));
        }
    }

    @Nested
    @DisplayName("equality expressions")
    class EqualityExpressionsTests {

        @Test
        @DisplayName("null equality and inequality")
        void testNullEquality() {
            assertEquals(Boolean.TRUE, evaluator.evaluate("null == null"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("null != null"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("null == 0"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("null != 0"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("null == false"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("null != false"));
        }

        @Test
        @DisplayName("boolean equality and inequality")
        void testBooleanEquality() {
            assertEquals(Boolean.TRUE, evaluator.evaluate("true == true"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("false == false"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("true != false"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("false != true"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("true == false"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("false == true"));
        }

        @Test
        @DisplayName("boolean with numbers")
        void testBooleanWithNumbers() {
            assertEquals(Boolean.TRUE, evaluator.evaluate("true == 1"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("1 == true"));

            assertEquals(Boolean.FALSE, evaluator.evaluate("true == -1"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("-1 == true"));

            assertEquals(Boolean.TRUE, evaluator.evaluate("false == 0"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("0 == false"));

            assertEquals(Boolean.TRUE, evaluator.evaluate("true != 0"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("0 != true"));

            assertEquals(Boolean.TRUE, evaluator.evaluate("false != 1"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("1 != false"));

            assertEquals(Boolean.FALSE, evaluator.evaluate("true == 0"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("0 == true"));

            assertEquals(Boolean.FALSE, evaluator.evaluate("false == 1"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("1 == false"));
        }

        @Test
        @DisplayName("boolean with strings")
        void testBooleanWithStrings() {
            assertEquals(Boolean.FALSE, evaluator.evaluate("true == \"true\""));
            assertEquals(Boolean.FALSE, evaluator.evaluate("\"true\" == true"));

            assertEquals(Boolean.FALSE, evaluator.evaluate("false == \"false\""));
            assertEquals(Boolean.FALSE, evaluator.evaluate("\"false\" == false"));

            assertEquals(Boolean.TRUE, evaluator.evaluate("true != \"false\""));
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"false\" != true"));

            assertEquals(Boolean.TRUE, evaluator.evaluate("false != \"true\""));
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"true\" != false"));

            assertEquals(Boolean.FALSE, evaluator.evaluate("true == \"false\""));
            assertEquals(Boolean.FALSE, evaluator.evaluate("\"false\" == true"));

            assertEquals(Boolean.FALSE, evaluator.evaluate("false == \"true\""));
            assertEquals(Boolean.FALSE, evaluator.evaluate("\"true\" == false"));

            assertEquals(Boolean.TRUE, evaluator.evaluate("true == \"1\""));
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"1\" == true"));

            assertEquals(Boolean.TRUE, evaluator.evaluate("false == \"0\""));
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"0\" == false"));

            assertEquals(Boolean.FALSE, evaluator.evaluate("true == \"0\""));
            assertEquals(Boolean.FALSE, evaluator.evaluate("\"0\" == true"));

            assertEquals(Boolean.FALSE, evaluator.evaluate("false == \"1\""));
            assertEquals(Boolean.FALSE, evaluator.evaluate("\"1\" == false"));

            assertEquals(Boolean.TRUE, evaluator.evaluate("true != \"0\""));
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"0\" != true"));

            assertEquals(Boolean.TRUE, evaluator.evaluate("false != \"1\""));
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"1\" != false"));
        }

        @Test
        @DisplayName("equality operator with numbers")
        void testNumberEquality() {
            assertEquals(Boolean.TRUE, evaluator.evaluate("5 == 5"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("5 == 3"));
        }

        @Test
        @DisplayName("inequality operator with numbers")
        void testNumberInequality() {
            assertEquals(Boolean.TRUE, evaluator.evaluate("5 != 3"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("5 != 5"));
        }

        @Test
        @DisplayName("equality operator with strings")
        void testStringEquality() {
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"test\" == \"test\""));
            assertEquals(Boolean.FALSE, evaluator.evaluate("\"test\" == \"TEST\""));
        }

        @Test
        @DisplayName("inequality operator with strings")
        void testStringInequality() {
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"hello\" != \"world\""));
            assertEquals(Boolean.FALSE, evaluator.evaluate("\"hello\" != \"hello\""));
        }

        @Test
        @DisplayName("equality operator with mixed types")
        void testMixedEquality() {
            assertEquals(Boolean.TRUE, evaluator.evaluate("5 == \"5\""));
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"5\" == 5"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("0 == false"));
        }

        @Test
        @DisplayName("inequality operator with mixed types")
        void testMixedInequality() {
            assertEquals(Boolean.FALSE, evaluator.evaluate("5 != \"5\""));
            assertEquals(Boolean.FALSE, evaluator.evaluate("\"5\" != 5"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("0 != false"));
        }

        @Test
        @DisplayName("array equality with Lists")
        void testArrayEquality() {
            assertEquals(Boolean.FALSE, evaluator.evaluate("[1, 2, 3] == [1, 2, 3]"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("[1, 2, 3] == [1, 2, 4]"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("[1, 2, 3] != [1, 2, 4]"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("[1, 2, 3] != [1, 2, 3]"));

            // reference equality
            List<Integer> list = Arrays.asList(1, 2, 3);
            JexArray jexArrayList = JexValue.fromArray(list);
            evaluator.declareContextValue("list", jexArrayList, false);
            assertEquals(Boolean.TRUE, evaluator.evaluate("list == list"));
            evaluator.declareContextValue("plainList", list, false);
            assertEquals(Boolean.TRUE, evaluator.evaluate("plainList == plainList"));

            List<Integer> list2 = Arrays.asList(1, 2, 3);
            JexArray jexArrayList2 = JexValue.fromArray(list2);
            evaluator.declareContextValue("list2", jexArrayList2, false);
            assertEquals(Boolean.TRUE, evaluator.evaluate("list != list2"));
            evaluator.declareContextValue("plainList2", list2, false);
            assertEquals(Boolean.TRUE, evaluator.evaluate("plainList != plainList2"));

            evaluator.declareContextValue("list3", jexArrayList, false);
            assertEquals(Boolean.TRUE, evaluator.evaluate("list == list3"));
            evaluator.declareContextValue("plainList3", list, false);
            assertEquals(Boolean.FALSE, evaluator.evaluate("plainList == plainList3"));
        }

        @Test
        @DisplayName("object equality with Maps")
        void testObjectEquality() {
            assertEquals(Boolean.FALSE, evaluator.evaluate("{\"a\":1,\"b\":2} == {\"a\":1,\"b\":2}"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("{\"a\":1,\"b\":2} == {\"a\":1,\"b\":3}"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("{\"a\":1,\"b\":2} != {\"a\":1,\"b\":3}"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("{\"a\":1,\"b\":2} != {\"a\":1,\"b\":2}"));

            // reference equality
            Map<String, Object> obj = new HashMap<>();
            obj.put("a", 1);
            obj.put("b", 2);
            JexObject jexObject = JexValue.fromObject(obj);
            evaluator.declareContextValue("obj", jexObject, false);
            assertEquals(Boolean.TRUE, evaluator.evaluate("obj == obj"));
            evaluator.declareContextValue("hashObj", obj, false);
            assertEquals(Boolean.TRUE, evaluator.evaluate("hashObj == hashObj"));

            Map<String, Object> obj2 = new HashMap<>();
            obj2.put("a", 1);
            obj2.put("b", 2);
            JexObject jexObject2 = JexValue.fromObject(obj2);
            evaluator.declareContextValue("obj2", jexObject2, false);
            assertEquals(Boolean.TRUE, evaluator.evaluate("obj != obj2"));
            evaluator.declareContextValue("hashObj2", obj2, false);
            assertEquals(Boolean.TRUE, evaluator.evaluate("hashObj != hashObj2"));

            evaluator.declareContextValue("obj3", jexObject, false);
            assertEquals(Boolean.TRUE, evaluator.evaluate("obj == obj3"));
            evaluator.declareContextValue("hashObj3", obj, false);
            assertEquals(Boolean.FALSE, evaluator.evaluate("hashObj == hashObj3"));
        }
    }

    @Nested
    @DisplayName("logical expressions")
    class  LogicalExpressionsTests {
        @Test
        @DisplayName("logical AND operator")
        void testLogicalAnd() {
            assertEquals(Boolean.TRUE, evaluator.evaluate("true && true"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("true && false"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("false && true"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("false && false"));

            assertEquals(Boolean.TRUE, evaluator.evaluate("true and true"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("true and false"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("false and true"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("false and false"));
        }

        @Test
        @DisplayName("logical OR operator")
        void testLogicalOr() {
            assertEquals(Boolean.TRUE, evaluator.evaluate("true || true"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("true || false"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("false || true"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("false || false"));

            assertEquals(Boolean.TRUE, evaluator.evaluate("true or true"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("true or false"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("false or true"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("false or false"));
        }

        @Test
        @DisplayName("logical operators with non-boolean values")
        void testLogicalOperatorsWithNonBoolean() {
            assertEquals(Boolean.FALSE, evaluator.evaluate("1 && 0"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("1 || 0"));

            assertEquals(Boolean.FALSE, evaluator.evaluate("\"hello\" && \"\""));
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"hello\" || \"\""));

            assertEquals(Boolean.FALSE, evaluator.evaluate("0 and 1"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("0 or 1"));

            assertEquals(Boolean.FALSE, evaluator.evaluate("\"\" and \"hello\""));
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"\" or \"hello\""));
        }

        @Test
        @DisplayName("combined logical expressions")
        void testCombinedLogicalExpressions() {

            assertEquals(Boolean.TRUE, evaluator.evaluate("true && false || true"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("false || false && true"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("(true || false) && (false || true)"));

            assertEquals(Boolean.TRUE, evaluator.evaluate("true and false or true"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("false or false and true"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("(true or false) and (false or true)"));
        }

    }

    @Nested
    @DisplayName("relational expressions")
    class RelationalExpressionsTests {
        @Test
        @DisplayName("greater than operator")
        void testGreaterThan() {
            assertEquals(Boolean.TRUE, evaluator.evaluate("5 > 3"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("2 > 4"));
        }

        @Test
        @DisplayName("less than operator")
        void testLessThan() {
            assertEquals(Boolean.TRUE, evaluator.evaluate("3 < 5"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("4 < 2"));
        }

        @Test
        @DisplayName("greater than or equal operator")
        void testGreaterThanOrEqual() {
            assertEquals(Boolean.TRUE, evaluator.evaluate("5 >= 5"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("6 >= 4"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("3 >= 7"));
        }

        @Test
        @DisplayName("less than or equal operator")
        void testLessThanOrEqual() {
            assertEquals(Boolean.TRUE, evaluator.evaluate("5 <= 5"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("4 <= 6"));
            assertEquals(Boolean.FALSE, evaluator.evaluate("7 <= 3"));
        }

        @Test
        @DisplayName("relational operators with strings")
        void testRelationalOperatorsWithStrings() {
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"apple\" < \"banana\""));
            assertEquals(Boolean.FALSE, evaluator.evaluate("\"grape\" > \"orange\""));
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"cat\" <= \"cat\""));
            assertEquals(Boolean.FALSE, evaluator.evaluate("\"dog\" >= \"elephant\""));
        }

        @Test
        @DisplayName("numbers and strings comparison")
        void testNumbersAndStringsComparison() {
            assertEquals(Boolean.TRUE, evaluator.evaluate("5 > \"3\""));
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"4\" < 6"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("7 >= \"7\""));
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"8\" <= 10"));
        }

        @Test
        @DisplayName("stringified numbers comparison")
        void testStringifiedNumbersComparison() {
            assertEquals(Boolean.FALSE, evaluator.evaluate("\"10\" > \"2\""));
            assertEquals(Boolean.FALSE, evaluator.evaluate("\"3\" < \"12\""));
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"5\" >= \"5\""));
            assertEquals(Boolean.FALSE, evaluator.evaluate("\"7\" <= \"6\""));
        }

        @Test
        @DisplayName("numbers, strings and booleans comparison")
        void testNumbersStringsAndBooleansComparison() {
            assertEquals(Boolean.TRUE, evaluator.evaluate("1 < \"2\""));
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"3\" > 2"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("0 <= \"0\""));
            assertEquals(Boolean.FALSE, evaluator.evaluate("\"1\" >= 2"));

            assertEquals(Boolean.TRUE, evaluator.evaluate("true > \"0\""));
            assertEquals(Boolean.FALSE, evaluator.evaluate("\"1\" < false"));
            assertEquals(Boolean.TRUE, evaluator.evaluate("false <= \"0\""));
            assertEquals(Boolean.TRUE, evaluator.evaluate("\"1\" >= true"));
        }
    }

    @Nested
    @DisplayName("multiplicative expressions")
    class MultiplicativeExpressionsTests {
        @Test
        @DisplayName("simple multiplication")
        void testSimpleMultiplication() {
            Object result = evaluator.evaluate("2 * 3");
            assertEquals(6, result);
        }

        @Test
        @DisplayName("simple division")
        void testSimpleDivision() {
            Object result = evaluator.evaluate("8 / 2");
            assertEquals(4, result);
        }

        @Test
        @DisplayName("multiplication and division")
        void testMultiplicationAndDivision() {
            Object result = evaluator.evaluate("10 * 2 / 5 * 3");
            assertEquals(12, result);
        }

        @Test
        @DisplayName("multiplicative expressions with parentheses")
        void testMultiplicativeExpressionsWithParentheses() {
            Object result = evaluator.evaluate("(2 + 3) * (4 - 1) / 5");
            assertEquals(3, result);
        }
    }

    @Nested
    @DisplayName("unary expressions")
    class UnaryExpressionsTests {
        @Test
        @DisplayName("unary plus operator")
        void testUnaryPlusOperator() {
            Object result1 = evaluator.evaluate("+5");
            assertEquals(5, result1);

            Object result2 = evaluator.evaluate("+-3");
            assertEquals(-3, result2);
        }

        @Test
        @DisplayName("unary minus operator")
        void testUnaryMinusOperator() {
            Object result1 = evaluator.evaluate("-5");
            assertEquals(-5, result1);

            Object result2 = evaluator.evaluate("-(-3)");
            assertEquals(3, result2);
        }

        @Test
        @DisplayName("logical NOT operator")
        void testLogicalNotOperator() {
            Object result1 = evaluator.evaluate("!true");
            assertEquals(false, result1);

            Object result2 = evaluator.evaluate("!false");
            assertEquals(true, result2);
        }
    }

    @Nested
    @DisplayName("square root expressions")
    class SquareRootExpressionsTests {
        @Test
        @DisplayName("square root of a positive number")
        void testSquareRootOfPositiveNumber() {
            assertEquals(4, evaluator.evaluate("sqrt(16)"));
            assertEquals(1.5, evaluator.evaluate("sqrt(2.25)"));

            assertEquals(4, evaluator.evaluate("√16"));
            assertEquals(1.5, evaluator.evaluate("√2.25"));
            assertEquals(10, evaluator.evaluate("√100"));
        }

        @Test
        @DisplayName("square root of zero")
        void testSquareRootOfZero() {
            assertEquals(0, evaluator.evaluate("sqrt(0)"));
            assertEquals(0, evaluator.evaluate("√0"));
        }

        @Test
        @DisplayName("square root of a negative number")
        void testSquareRootOfNegativeNumber() {
            assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("sqrt(-4)"));
            assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("√-9"));
        }
    }

    @Nested
    @DisplayName("literal expressions")
    class LiteralExpressionsTests {
        @Test
        @DisplayName("should evaluate numeric literals")
        void testNumericLiterals() {
            assertEquals(123, evaluator.evaluate("123"));
            assertEquals(45.67, evaluator.evaluate("45.67"));
        }

        @Test
        @DisplayName("should evaluate string literals")
        void testStringLiterals() {
            assertEquals("hello", evaluator.evaluate("\"hello\""));
            assertEquals("world", evaluator.evaluate("'world'"));

            assertEquals("true", evaluator.evaluate("\"true\""));
            assertEquals("false", evaluator.evaluate("\"false\""));
        }

        @Test
        @DisplayName("should evaluate boolean literals")
        void testBooleanLiterals() {
            assertEquals(true, evaluator.evaluate("true"));
            assertEquals(false, evaluator.evaluate("false"));
        }

        @Test
        @DisplayName("should evaluate null literal")
        void testNullLiteral() {
            assertNull(evaluator.evaluate("null"));
        }

        @Test
        @DisplayName("should evaluate array literals")
        void  testArrayLiterals() {
            assertEquals(Arrays.asList(1, 2, 3), evaluator.evaluate("[1, 2, 3]"));
            assertEquals(Arrays.asList("a", "b", "c"), evaluator.evaluate("[\"a\", \"b\", \"c\"]"));

            List<Object> dynamicArray = Arrays.asList(10, "test", true, null);
            evaluator.declareContextValue("dynamicArray", dynamicArray, false);
            assertEquals(dynamicArray, evaluator.evaluate("[dynamicArray[0], dynamicArray[1], dynamicArray[2], dynamicArray[3]]"));

            int index1 = 0;
            int index2 = 1;
            int index3 = 2;
            int index4 = 3;
            evaluator.declareContextValue("index1", index1, false);
            evaluator.declareContextValue("index2", index2, false);
            evaluator.declareContextValue("index3", index3, false);
            evaluator.declareContextValue("index4", index4, false);
            assertEquals(dynamicArray, evaluator.evaluate("[dynamicArray[index1], dynamicArray[index2], dynamicArray[index3], dynamicArray[index4]]"));
        }

        @Test
        @DisplayName("should evaluate object literals")
        void testObjectLiterals() {
            Map<String, Object> expected1 = new HashMap<>();
            expected1.put("key", "value");
            expected1.put("num", 42);
            assertEquals(expected1, evaluator.evaluate("{\"key\": \"value\", \"num\": 42}"));

            Map<String, Object> expected2 = new HashMap<>();
            expected2.put("a", 1);
            expected2.put("b", 2);
            expected2.put("c", 3);
            assertEquals(expected2, evaluator.evaluate("{\"a\": 1, \"b\": 2, \"c\": 3}"));

            Map<String, Object> dynamicObject = new HashMap<>();
            dynamicObject.put("name", "Test");
            dynamicObject.put("value", 100);
            dynamicObject.put("isActive", true);
            dynamicObject.put("computed", true);

            int isValueKeyValue = 100;
            String isActiveKey = "isActive";
            boolean computed = true;

            evaluator.declareContextValue("dynamicObject", dynamicObject, false);
            evaluator.declareContextValue("isValueKeyValue", isValueKeyValue, false);
            evaluator.declareContextValue("isActiveKey", isActiveKey, false);
            evaluator.declareContextValue("computed", computed, false);

            String objLiteral = """
                {
                    "name": dynamicObject.name,
                    "value": isValueKeyValue,
                    [isActiveKey]: dynamicObject.isActive,
                    computed
                }
                """;

            assertEquals(dynamicObject, evaluator.evaluate(objLiteral));
        }
    }

    @Nested
    @DisplayName("member expressions")
    class MemberExpressionsTests {
        @Test
        @DisplayName("should access object properties")
        void testAccessObjectProperties() {
            Map<String, Object> obj = new HashMap<>();
            obj.put("a", 1);
            obj.put("b", 2);
            obj.put("c", 3);
            evaluator.declareContextValue("obj", obj, false);
            assertEquals(1, evaluator.evaluate("obj.a"));
            assertEquals(2, evaluator.evaluate("obj.b"));
            assertEquals(3, evaluator.evaluate("obj.c"));

            String dynamicKey = "b";
            evaluator.declareContextValue("dynamicKey", dynamicKey, false);
            assertEquals(2, evaluator.evaluate("obj[dynamicKey]"));

        }

        @Test
        @DisplayName("should access array elements")
        void testAccessArrayElements() {
            List<Integer> arr = Arrays.asList(10, 20, 30, 40);
            evaluator.declareContextValue("arr", arr, false);
            assertEquals(10, evaluator.evaluate("arr[0]"));
            assertEquals(20, evaluator.evaluate("arr[1]"));
            assertEquals(30, evaluator.evaluate("arr[2]"));
            assertEquals(40, evaluator.evaluate("arr[3]"));
            assertNull(evaluator.evaluate("arr[4]"));

            // negative indexing
            assertEquals(40, evaluator.evaluate("arr[-1]"));
            assertEquals(30, evaluator.evaluate("arr[-2]"));
            assertEquals(20, evaluator.evaluate("arr[-3]"));
            assertEquals(10, evaluator.evaluate("arr[-4]"));
            assertNull(evaluator.evaluate("arr[-5]"));

            int index = 2;
            evaluator.declareContextValue("index", index, false);
            assertEquals(30, evaluator.evaluate("arr[index]"));
        }
    }

    @Nested
    @DisplayName("complex member access expressions")
    class ComplexMemberAccessExpressionsTests {
        @Test
        @DisplayName("should access nested object properties")
        void testAccessNestedObjectProperties() {
            Map<String, Object> address = new HashMap<>();
            address.put("city", "New York");
            address.put("zip", 10001);

            Map<String, Object> user = new HashMap<>();
            user.put("name", "John");
            user.put("address", address);

            Map<String, Object> obj = new HashMap<>();
            obj.put("user", user);

            evaluator.declareContextValue("obj", obj, false);
            assertEquals("John", evaluator.evaluate("obj.user.name"));
            assertEquals("New York", evaluator.evaluate("obj.user.address.city"));
            assertEquals(10001, evaluator.evaluate("obj.user.address.zip"));
        }

        @Test
        @DisplayName("should access nested array elements")
        void testAccessNestedArrayElements() {
            List<List<Integer>> arr = Arrays.asList(
                    Arrays.asList(1, 2, 3),
                    Arrays.asList(4, 5, 6),
                    Arrays.asList(7, 8, 9)
            );
            evaluator.declareContextValue("arr", arr, false);
            assertEquals(1, evaluator.evaluate("arr[0][0]"));
            assertEquals(6, evaluator.evaluate("arr[1][2]"));
            assertEquals(8, evaluator.evaluate("arr[2][1]"));
            assertEquals(9, evaluator.evaluate("arr[-1][-1]"));
        }

        @Test
        @DisplayName("should access array of objects")
        void testAccessArrayOfObjects() {
            List<Map<String, Object>> users = new ArrayList<>();
            Map<String, Object> user1 = new HashMap<>();
            user1.put("name", "Alice");
            user1.put("age", 25);
            users.add(user1);
            Map<String, Object> user2 = new HashMap<>();
            user2.put("name", "Bob");
            user2.put("age", 30);
            users.add(user2);
            Map<String, Object> user3 = new HashMap<>();
            user3.put("name", "Charlie");
            user3.put("age", 35);
            users.add(user3);

            evaluator.declareContextValue("users", users, false);
            assertEquals("Alice", evaluator.evaluate("users[0].name"));
            assertEquals(30, evaluator.evaluate("users[1].age"));
            assertEquals("Charlie", evaluator.evaluate("users[2].name"));
            assertEquals(35, evaluator.evaluate("users[-1].age"));

        }

        @Test
        @DisplayName("should access object with array properties")
        void testAccessObjectWithArrayProperties() {
            Map<String, Object> data = new HashMap<>();
            data.put("scores", Arrays.asList(95, 87, 92));
            data.put("names", Arrays.asList("Test1", "Test2", "Test3"));
            evaluator.declareContextValue("data", data, false);
            assertEquals(95, evaluator.evaluate("data.scores[0]"));
            assertEquals(92, evaluator.evaluate("data.scores[2]"));
            assertEquals("Test2", evaluator.evaluate("data.names[1]"));
            assertEquals(92, evaluator.evaluate("data.scores[-1]"));
        }

        @Test
        @DisplayName("should handle mixed bracket and dot notation")
        void testMixedBracketAndDotNotation() {
            Map<String, Object> item1 = new HashMap<>();
            item1.put("id", 1);
            item1.put("values", Arrays.asList(10, 20, 30));
            Map<String, Object> item2 = new HashMap<>();
            item2.put("id", 2);
            item2.put("values", Arrays.asList(40, 50, 60));
            Map<String, Object> complex = new HashMap<>();
            complex.put("items", Arrays.asList(item1, item2));

            evaluator.declareContextValue("complex", complex, false);
            assertEquals(1, evaluator.evaluate("complex.items[0].id"));
            assertEquals(20, evaluator.evaluate("complex.items[0].values[1]"));
            assertEquals(60, evaluator.evaluate("complex.items[1].values[2]"));
            assertEquals(1, evaluator.evaluate("complex[\"items\"][0][\"id\"]"));
        }

        @Test
        @DisplayName("should evaluate expressions within member access")
        void testEvaluateExpressionsWithinMemberAccess() {
            Map<String, Object> data = new HashMap<>();
            data.put("values", Arrays.asList(100, 200, 300, 400));
            evaluator.declareContextValue("data", data, false);
            evaluator.declareContextValue("idx", 1, false);
            assertEquals(300, evaluator.evaluate("data.values[1 + 1]"));
            assertEquals(200, evaluator.evaluate("data.values[idx]"));
            assertEquals(400, evaluator.evaluate("data.values[idx + 2]"));
        }

        @Test
        @DisplayName("should handle deeply nested structures")
        void testHandleDeeplyNestedStructures() {
            Map<String, Object> valueObj = new HashMap<>();
            valueObj.put("value", "found");
            List<Map<String, Object>> array = List.of(valueObj);
            Map<String, Object> level3 = new HashMap<>();
            level3.put("array", array);
            Map<String, Object> level2 = new HashMap<>();
            level2.put("level3", level3);
            Map<String, Object> level1 = new HashMap<>();
            level1.put("level2", level2);
            Map<String, Object> deep = new HashMap<>();
            deep.put("level1", level1);
            evaluator.declareContextValue("deep", deep, false);
            assertEquals("found", evaluator.evaluate("deep.level1.level2.level3.array[0].value"));
        }

        @Test
        @DisplayName("should return null for non-existent nested properties")
        void testReturnNullForNonExistentNestedProperties() {
            Map<String, Object> aMap = new HashMap<>();
            aMap.put("b", 1);
            Map<String, Object> obj = new HashMap<>();
            obj.put("a", aMap);
            evaluator.declareContextValue("obj", obj, false);
            assertNull(evaluator.evaluate("obj.a.c"));
            assertNull(evaluator.evaluate("obj.x.y.z"));
        }
    }

    @Nested
    @DisplayName("parenthesized expressions")
    class ParenthesizedExpressionsTests {
        @Test
        @DisplayName("should evaluate expressions within parentheses")
        void testEvaluateExpressionsWithinParentheses() {
            assertEquals(5, evaluator.evaluate("(2 + 3)"));
            assertEquals(21, evaluator.evaluate("((1 + 2) * (3 + 4))"));
            assertEquals(1, evaluator.evaluate("((10 - 2) / (4 + 4))"));
        }
    }

    @Nested
    @DisplayName("power expressions")
    class PowerExpressionsTests {
        @Test
        @DisplayName("should evaluate exponentiation")
        void testEvaluateExponentiation() {
            assertEquals(8, evaluator.evaluate("2 ^ 3"));
            assertEquals(1, evaluator.evaluate("5 ^ 0"));
            assertEquals(8, evaluator.evaluate("4 ^ 1.5"));
        }

        @Test
        @DisplayName("should handle chained exponentiation")
        void testHandleChainedExponentiation() {
            assertEquals(512, evaluator.evaluate("2 ^ 3 ^ 2")); // 2^(3^2) = 2^9 = 512
            assertEquals(81, evaluator.evaluate("3 ^ 2 ^ 2"));  // 3^(2^2) = 3^4 = 81
        }

        @Test
        @DisplayName("should evaluate exponentiation with parentheses")
        void testEvaluateExponentiationWithParentheses() {
            assertEquals(64, evaluator.evaluate("(2 ^ 3) ^ 2")); // (2^3)^2 = 8^2 = 64
            assertEquals(512, evaluator.evaluate("2 ^ (3 ^ 2)")); // 2^(3^2) = 2^9 = 512
        }
    }

    @Nested
    @DisplayName("ternary expressions")
    class TernaryExpressionsTests {
        @Test
        @DisplayName("should evaluate simple ternary expressions")
        void testSimpleTernaryExpressions() {
            assertEquals(1, evaluator.evaluate("true ? 1 : 2"));
            assertEquals(2, evaluator.evaluate("false ? 1 : 2"));
        }

        @Test
        @DisplayName("should evaluate nested ternary expressions")
        void testNestedTernaryExpressions() {
            assertEquals(2, evaluator.evaluate("true ? (false ? 1 : 2) : 3"));
            assertEquals(2, evaluator.evaluate("false ? 1 : (true ? 2 : 3)"));
        }

        @Test
        @DisplayName("should handle complex ternary expressions")
        void testComplexTernaryExpressions() {
            assertEquals(15, evaluator.evaluate("(5 > 3) ? (10 + 5) : (20 - 5)"));
            assertEquals("no", evaluator.evaluate("(2 + 2 == 5) ? \"yes\" : \"no\""));
        }

        @Test
        @DisplayName("should handle ternary expressions with different data types")
        void testTernaryExpressionsWithDifferentDataTypes() {
            // Number results
            assertEquals(42, evaluator.evaluate("true ? 42 : 0"));
            assertEquals(0, evaluator.evaluate("false ? 42 : 0"));

            // String results
            assertEquals("hello", evaluator.evaluate("true ? \"hello\" : \"world\""));
            assertEquals("world", evaluator.evaluate("false ? \"hello\" : \"world\""));

            // Boolean results
            assertEquals(true, evaluator.evaluate("true ? true : false"));
            assertEquals(false, evaluator.evaluate("false ? true : false"));

            // Null results
            assertNull(evaluator.evaluate("true ? null : 42"));
            assertNull(evaluator.evaluate("false ? 42 : null"));

            // Array results
            assertEquals(Arrays.asList(1, 2, 3), evaluator.evaluate("true ? [1, 2, 3] : [4, 5, 6]"));
            assertEquals(Arrays.asList(4, 5, 6), evaluator.evaluate("false ? [1, 2, 3] : [4, 5, 6]"));

            // Object results
            Map<String, Object> objA = new HashMap<>();
            objA.put("a", 1);
            Map<String, Object> objB = new HashMap<>();
            objB.put("b", 2);
            assertEquals(objA, evaluator.evaluate("true ? {\"a\": 1} : {\"b\": 2}"));
            assertEquals(objB, evaluator.evaluate("false ? {\"a\": 1} : {\"b\": 2}"));
        }

        @Test
        @DisplayName("should handle ternary expressions with mixed data types")
        void testTernaryExpressionsWithMixedDataTypes() {
            assertEquals(42, evaluator.evaluate("true ? 42 : \"string\""));
            assertEquals("string", evaluator.evaluate("false ? 42 : \"string\""));
            assertEquals(Arrays.asList(1, 2), evaluator.evaluate("true ? [1, 2] : {\"a\": 1}"));
            Map<String, Object> obj = new HashMap<>();
            obj.put("a", 1);
            assertEquals(obj, evaluator.evaluate("false ? [1, 2] : {\"a\": 1}"));
            assertNull(evaluator.evaluate("true ? null : false"));
            assertEquals(false, evaluator.evaluate("false ? null : false"));

        }

        @Test
        @DisplayName("should handle ternary expressions with context variables")
        void testTernaryExpressionsWithContextVariables() {
            evaluator.declareContextValue("x", 10, false);
            evaluator.declareContextValue("y", 20, false);
            evaluator.declareContextValue("arr", Arrays.asList(1, 2, 3), false);
            Map<String, Object> obj = new HashMap<>();
            obj.put("name", "test");
            evaluator.declareContextValue("obj", obj, false);

            assertEquals(20, evaluator.evaluate("x > y ? x : y"));
            assertEquals(Arrays.asList(1, 2, 3), evaluator.evaluate("x < y ? arr : obj"));
            assertEquals(1, evaluator.evaluate("x == 10 ? arr[0] : obj.name"));
            assertEquals("found", evaluator.evaluate("y != 20 ? null : \"found\""));
        }

        @Test
        @DisplayName("should handle nested ternary expressions with different data types")
        void testNestedTernaryExpressionsWithDifferentDataTypes() {
            assertEquals("b", evaluator.evaluate("true ? (false ? \"a\" : \"b\") : (true ? \"c\" : \"d\")"));
            assertEquals(4, evaluator.evaluate("false ? (true ? 1 : 2) : (false ? 3 : 4)"));
            assertEquals(List.of(1), evaluator.evaluate("true ? (true ? [1] : [2]) : (true ? [3] : [4])"));
            Map<String, Object> obj = new HashMap<>();
            obj.put("x", 1);
            assertEquals(obj, evaluator.evaluate("false ? null : (true ? {\"x\": 1} : {\"y\": 2})"));
        }

        @Test
        @DisplayName("should handle ternary expressions with complex conditions")
        void testTernaryExpressionsWithComplexConditions() {
            List<Map<String, Object>> users = new ArrayList<>();
            Map<String, Object> user1 = new HashMap<>();
            user1.put("name", "Alice");
            user1.put("age", 25);
            users.add(user1);
            Map<String, Object> user2 = new HashMap<>();
            user2.put("name", "Bob");
            user2.put("age", 30);
            users.add(user2);
            evaluator.declareContextValue("users", users, false);
            assertEquals("Alice", evaluator.evaluate("users[0].age > 20 ? users[0].name : \"unknown\""));
            assertNull(evaluator.evaluate("users[1].age < 25 ? users[1] : null"));
            assertEquals(users, evaluator.evaluate("length(users) > 1 ? users : []"));
        }

        @Test
        @DisplayName("should handle ternary expressions with arithmetic operations")
        void testTernaryExpressionsWithArithmeticOperations() {
            assertEquals(15, evaluator.evaluate("5 > 3 ? (10 + 5) : (20 - 5)"));
            assertEquals(10, evaluator.evaluate("2 * 3 == 6 ? (100 / 10) : (50 * 2)"));
            assertEquals("even", evaluator.evaluate("10 % 2 == 0 ? \"even\" : \"odd\""));
        }

        @Test
        @DisplayName("should handle ternary expressions with logical operations")
        void testTernaryExpressionsWithLogicalOperations() {
            assertEquals("no", evaluator.evaluate("true && false ? \"yes\" : \"no\""));
            assertEquals(1, evaluator.evaluate("true || false ? 1 : 0"));
            assertEquals(Arrays.asList(1, 2), evaluator.evaluate("!false ? [1, 2] : [3, 4]"));
            Map<String, Object> resultObj = new HashMap<>();
            resultObj.put("result", true);
            assertEquals(resultObj, evaluator.evaluate("(5 > 3) && (10 < 20) ? {\"result\": true} : {\"result\": false}"));
        }
    }

    @Nested
    @DisplayName("elvis operator")
    class ElvisOperatorTests {
        @Test
        @DisplayName("should return left operand if truthy")
        void testElvisOperatorLeftTruthy() {
            assertEquals(42, evaluator.evaluate("42 ?: 0"));
            assertEquals("hello", evaluator.evaluate("\"hello\" ?: \"world\""));
            assertEquals(true, evaluator.evaluate("true ?: false"));
        }

        @Test
        @DisplayName("should return right operand if left is falsy")
        void testElvisOperatorLeftFalsy() {
            assertEquals(42, evaluator.evaluate("0 ?: 42"));
            assertEquals("default", evaluator.evaluate("\"\" ?: \"default\""));
            assertEquals(true, evaluator.evaluate("false ?: true"));
            assertEquals("fallback", evaluator.evaluate("null ?: \"fallback\""));
        }

        @Test
        @DisplayName("should work with context variables")
        void testElvisOperatorWithContextVariables() {
            evaluator.declareContextValue("name", "", false);
            assertEquals("Anonymous", evaluator.evaluate("name ?: \"Anonymous\""));
            evaluator.declareContextValue("name", "John", false);
            assertEquals("John", evaluator.evaluate("name ?: \"Anonymous\""));
        }

        @Test
        @DisplayName("should work with nested elvis operators")
        void testElvisOperatorWithNestedOperators() {
            assertEquals("default", evaluator.evaluate("null ?: \"\" ?: \"default\""));
            assertEquals(100, evaluator.evaluate("0 ?: false ?: 100"));
        }

        @Test
        @DisplayName("should work with complex expressions")
        void testElvisOperatorWithComplexExpressions() {
            Map<String, Object> user = new HashMap<>();
            user.put("name", "");
            user.put("age", 0);
            evaluator.declareContextValue("user", user, false);
            assertEquals("Unknown", evaluator.evaluate("user.name ?: \"Unknown\""));
            assertEquals(18, evaluator.evaluate("user.age ?: 18"));
        }
    }

    @Nested
    @DisplayName("identifier expressions")
    class IdentifierExpressionsTests {
        @Test
        @DisplayName("should evaluate identifiers from context")
        void testEvaluateIdentifiersFromContext() {
            evaluator.declareContextValue("x", 10, false);
            evaluator.declareContextValue("y", 20, false);
            evaluator.declareContextValue("name", "Test", false);

            assertEquals(10, evaluator.evaluate("x"));
            assertEquals(20, evaluator.evaluate("y"));
            assertEquals("Test", evaluator.evaluate("name"));
        }

        @Test
        @DisplayName("should throw error for undefined identifiers")
        void testThrowErrorForUndefinedIdentifiers() {
            assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("undefinedVar"));
            assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("anotherUndefined"));
        }

        @Test
        @DisplayName("should evaluate number identifier")
        void testEvaluateNumberIdentifier() {
            evaluator.declareContextValue("num", 42, false);
            assertEquals(42, evaluator.evaluate("num"));

            evaluator.declareContextValue("decimal", 3.14, false);
            assertEquals(3.14, evaluator.evaluate("decimal"));

            evaluator.declareContextValue("negative", -100, false);
            assertEquals(-100, evaluator.evaluate("negative"));
        }

        @Test
        @DisplayName("should evaluate string identifier")
        void testEvaluateStringIdentifier() {
            evaluator.declareContextValue("str", "hello", false);
            assertEquals("hello", evaluator.evaluate("str"));

            evaluator.declareContextValue("empty", "", false);
            assertEquals("", evaluator.evaluate("empty"));
        }

        @Test
        @DisplayName("should evaluate boolean identifier")
        void testEvaluateBooleanIdentifier() {
            evaluator.declareContextValue("isTrue", true, false);
            assertEquals(true, evaluator.evaluate("isTrue"));

            evaluator.declareContextValue("isFalse", false, false);
            assertEquals(false, evaluator.evaluate("isFalse"));
        }

        @Test
        @DisplayName("should evaluate null identifier")
        void testEvaluateNullIdentifier() {
            evaluator.declareContextValue("nullValue", null, false);
            assertNull(evaluator.evaluate("nullValue"));
        }

        @Test
        @DisplayName("should evaluate array identifier")
        void testEvaluateArrayIdentifier() {
            evaluator.declareContextValue("arr", Arrays.asList(1, 2, 3), false);
            assertEquals(Arrays.asList(1, 2, 3), evaluator.evaluate("arr"));

            evaluator.declareContextValue("emptyArr", new ArrayList<>(), false);
            assertEquals(new ArrayList<>(), evaluator.evaluate("emptyArr"));

            evaluator.declareContextValue("mixedArr", Arrays.asList(1, "test", true, null), false);
            assertEquals(Arrays.asList(1, "test", true, null), evaluator.evaluate("mixedArr"));
        }

        @Test
        @DisplayName("should evaluate object identifier")
        void testEvaluateObjectIdentifier() {
            Map<String, Object> obj = new HashMap<>();
            obj.put("key", "value");
            evaluator.declareContextValue("obj", obj, false);
            assertEquals(obj, evaluator.evaluate("obj"));

            Map<String, Object> emptyObj = new HashMap<>();
            evaluator.declareContextValue("emptyObj", emptyObj, false);
            assertEquals(emptyObj, evaluator.evaluate("emptyObj"));

            Map<String, Object> complexObj = new HashMap<>();
            complexObj.put("name", "test");
            complexObj.put("count", 42);
            complexObj.put("active", true);
            complexObj.put("data", null);

            evaluator.declareContextValue("complexObj", complexObj, false);
            assertEquals(complexObj, evaluator.evaluate("complexObj"));
        }

        @Test
        @DisplayName("should evaluate nested object identifier")
        void testEvaluateNestedObjectIdentifier() {
            Map<String, Object> level2 = new HashMap<>();
            level2.put("value", "deep");
            Map<String, Object> level1 = new HashMap<>();
            level1.put("level2", level2);
            Map<String, Object> nested = new HashMap<>();
            nested.put("level1", level1);
            evaluator.declareContextValue("nested", nested, false);
            assertEquals(nested, evaluator.evaluate("nested"));
        }

        @Test
        @DisplayName("should evaluate array of objects identifier")
        void testEvaluateArrayOfObjectsIdentifier() {
            List<Map<String, Object>> users = new ArrayList<>();
            Map<String, Object> user1 = new HashMap<>();
            user1.put("name", "Alice");
            user1.put("age", 25);
            users.add(user1);
            Map<String, Object> user2 = new HashMap<>();
            user2.put("name", "Bob");
            user2.put("age", 30);
            users.add(user2);
            evaluator.declareContextValue("users", users, false);
            assertEquals(users, evaluator.evaluate("users"));
        }
    }

    @Nested
    @DisplayName("var declaration expressions")
    class VarDeclarationExpressionsTests {
        @Test
        @DisplayName("should declare variable with let keyword")
        void testDeclareVariableWithLetKeyword() {
            assertEquals(10, evaluator.evaluate("let x = 10; x;"));
            assertEquals(5.54, evaluator.evaluate("let y = 5.54; y;"));
            assertEquals("Test", evaluator.evaluate("let name = \"Test\"; name;"));
            assertEquals(false, evaluator.evaluate("let isTrue = false; isTrue;"));
            assertEquals(Arrays.asList(1, 2, 3), evaluator.evaluate("let arr = [1, 2, 3]; arr;"));
            assertEquals(Arrays.asList(1, "two", true, null), evaluator.evaluate("let mixed = [1, \"two\", true, null]; mixed;"));
            Map<String, Object> expectedObj = new HashMap<>();
            expectedObj.put("key", "value");
            assertEquals(expectedObj, evaluator.evaluate("let obj = {\"key\": \"value\"}; obj;"));
            Map<String, Object> expectedNestedObj = new HashMap<>();
            Map<String, Object> levelA = new HashMap<>();
            levelA.put("b", 2);
            expectedNestedObj.put("a", levelA);
            assertEquals(expectedNestedObj, evaluator.evaluate("let nested = {\"a\": {\"b\": 2}}; nested;"));
        }

        @Test
        @DisplayName("should declare variable with const keyword")
        void testDeclareVariableWithConstKeyword() {
            assertEquals(20, evaluator.evaluate("const x = 20; x;"));
            assertEquals("Hello", evaluator.evaluate("const greeting = \"Hello\"; greeting;"));
            assertEquals(true, evaluator.evaluate("const isValid = true; isValid;"));
            assertEquals(Arrays.asList(4, 5, 6), evaluator.evaluate("const nums = [4, 5, 6]; nums;"));
            Map<String, Object> expectedSettings = new HashMap<>();
            expectedSettings.put("theme", "dark");
            assertEquals(expectedSettings, evaluator.evaluate("const settings = {\"theme\": \"dark\"}; settings;"));
        }

        @Test
        @DisplayName("should throw error for redeclaration of variable")
        void testThrowErrorForRedeclarationOfVariable() {
            assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("let x = 10; let x = 20;"));
            assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("const y = 5; const y = 15;"));
        }

        @Test
        @DisplayName("should throw error for reassignment of const variable")
        void testThrowErrorForReassignmentOfConstVariable() {
            assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("const z = 30; z = 40;"));
        }

        @Test
        @DisplayName("should allow reassignment of let variable")
        void testAllowReassignmentOfLetVariable() {
            assertEquals(2, evaluator.evaluate("let a = 1; a = 2; a;"));
        }

        @Test
        @DisplayName("should handle variable scope correctly")
        void testHandleVariableScopeCorrectly() {
            assertEquals(20, evaluator.evaluate("""
                        let x = 10;
                        {
                            let x = 20;
                            x;
                        }
                    """));
            assertEquals(5, evaluator.evaluate("""
                        let y = 5;
                        {
                            let y = 15;
                        }
                        y;
                    """));
        }

        @Test
        @DisplayName("should create a variable in the global scope by declaring with global keyword")
        void testCreateGlobalVariable() {
            evaluator.evaluate("global let gVar = 100;");
            assertEquals(100, evaluator.getGlobalScopeVariables().get("gVar"));

            evaluator.evaluate("global const gConst = \"global\";");
            assertEquals("global", evaluator.getGlobalScopeVariables().get("gConst"));
        }

        @Test
        @DisplayName("should allow access to global variables from local scope")
        void testAccessGlobalVariablesFromLocalScope() {
            evaluator.evaluate("global let gNum = 50;");
            assertEquals(75, evaluator.evaluate("""
                        {
                            let localNum = gNum + 25;
                            localNum;
                        }
                    """));
        }

        @Test
        @DisplayName("global scope variables redeclaration is allowed and it should not throw error")
        void testGlobalScopeVariablesRedeclaration() {
            evaluator.evaluate("global let gVar = 200; global let gVar = 300;");
            assertEquals(300, evaluator.getGlobalScopeVariables().get("gVar"));
            assertDoesNotThrow(() -> evaluator.evaluate("global let gVar = 400;"));

            evaluator.evaluate("global const gConst = \"first\"; global const gConst = \"second\";");
            assertEquals("second", evaluator.getGlobalScopeVariables().get("gConst"));
            assertDoesNotThrow(() -> evaluator.evaluate("global const gConst = \"third\";"));
        }
    }

    @Nested
    @DisplayName("block statements")
    class BlockStatementsTests {
        @Test
        @DisplayName("should evaluate block statements correctly")
        void testEvaluateBlockStatementsCorrectly() {
            assertEquals(30, evaluator.evaluate("""
                        {
                            let x = 10;
                            let y = 20;
                            x + y;
                        }
                    """));
        }

        @Test
        @DisplayName("should maintain variable scope within blocks")
        void testMaintainVariableScopeWithinBlocks() {
            assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("""
                        {
                            let x = 5;
                        }
                        x;
                    """));
        }

        @Test
        @DisplayName("should allow nested blocks")
        void testAllowNestedBlocks() {
            assertEquals(6, evaluator.evaluate("""
                        {
                            let x = 2;
                            {
                                let y = 3;
                                x * y;
                            }
                        }
                    """));
        }

        @Test
        @DisplayName("should access outer scope variables within inner blocks")
        void testAccessOuterScopeVariablesWithinInnerBlocks() {
            assertEquals(9, evaluator.evaluate("""
                        let a = 4;
                        {
                            let b = 5;
                            a + b;
                        }
                    """));
        }

        @Test
        @DisplayName("should not allow inner block variables to leak to outer scope")
        void testNotAllowInnerBlockVariablesToLeakToOuterScope() {
            assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("""
                        {
                            let m = 7;
                        }
                        m;
                    """));
        }

        @Test
        @DisplayName("should handle multiple statements in a block")
        void testHandleMultipleStatementsInABlock() {
            assertEquals(6, evaluator.evaluate("""
                        {
                            let x = 1;
                            x = x + 1;
                            x = x * 3;
                            x;
                        }
                    """));
        }

        @Test
        @DisplayName("should handle blocks with only variable declarations")
        void testHandleBlocksWithOnlyVariableDeclarations() {
            assertEquals(20, evaluator.evaluate("""
                        {
                            let x = 10;
                            const y = 20;
                        }
                    """));
        }

        @Test
        @DisplayName("should handle blocks with global variable declarations")
        void testHandleBlocksWithGlobalVariableDeclarations() {
            evaluator.evaluate("""
                        {
                            global let gVar = 123;
                            global const gConst = "block";
                        }
                    """);
            assertEquals(123, evaluator.getGlobalScopeVariables().get("gVar"));
            assertEquals("block", evaluator.getGlobalScopeVariables().get("gConst"));
        }

        @Test
        @DisplayName("should handle blocks with nested variable declarations")
        void testHandleBlocksWithNestedVariableDeclarations() {
            assertEquals(30, evaluator.evaluate("""
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
                    """));
        }

        @Test
        @DisplayName("should return last evaluated expression in the block")
        void testReturnLastEvaluatedExpressionInTheBlock() {
            assertEquals(12, evaluator.evaluate("""
                        {
                            let x = 3;
                            let y = 4;
                            x * y;
                        }
                    """));
        }

        @Test
        @DisplayName("should handle async execution within blocks")
        void testHandleAsyncExecutionWithinBlocks() {
            FuncImpl asyncFunc = (ctx, args) -> {;
                try {
                    Thread.sleep(10);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                return new JexNumber(5);
            };
            evaluator.addFunction("asyncFunc", asyncFunc);
            assertEquals(15, evaluator.evaluate("""
                        {
                            let abc = asyncFunc();
                            let bcc = 10;
                            abc + bcc;
                        }
                    """));
        }
    }

    @Nested
    @DisplayName("repeat expressions")
    class RepeatExpressionsTests {

        @Nested
        @DisplayName("numeric repeat")
        class NumericRepeatTests {

            @Test
            @DisplayName("should repeat block specified number of times")
            void testRepeatBlockSpecifiedNumberOfTimes() {
                assertEquals(5, evaluator.evaluate("""
                    let sum = 0;
                    repeat (5) {
                        sum = sum + 1;
                    }
                    sum;
                    """));
            }

            @Test
            @DisplayName("should provide $index variable in numeric repeat")
            void testNumericRepeatIndexVariable() {
                assertEquals(3, evaluator.evaluate("""
                    let total = 0;
                    repeat (3) {
                        total = total + $index;
                    }
                    total;
                    """));
            }

            @Test
            @DisplayName("should provide $it variable equal to $index in numeric repeat")
            void testNumericRepeatItVariable() {
                assertEquals(6, evaluator.evaluate("""
                    let sum = 0;
                    repeat (4) {
                        sum = sum + $it;
                    }
                    sum;
                    """));
            }

            @Test
            @DisplayName("should handle zero iterations")
            void testNumericRepeatZeroIterations() {
                assertEquals(0, evaluator.evaluate("""
                    let count = 0;
                    repeat (0) {
                        count = count + 1;
                    }
                    count;
                    """));
            }

            @Test
            @DisplayName("should throw error for negative iterations")
            void testNumericRepeatNegativeIterations() {
                assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("""
                    repeat (-5) {
                        let x = 1;
                    }
                    """));
            }

            @Test
            @DisplayName("should return last evaluated result from block")
            void testNumericRepeatLastEvaluatedResult() {
                assertEquals(4, evaluator.evaluate("""
                    repeat (3) {
                        $index * 2;
                    }
                    """));
            }
        }

        @Nested
        @DisplayName("array repeat")
        class ArrayRepeatTests {

            @Test
            @DisplayName("should iterate over array elements")
            void testArrayRepeatIteration() {
                assertEquals(60, evaluator.evaluate("""
                    let arr = [10, 20, 30];
                    let sum = 0;
                    repeat (arr) {
                        sum = sum + $it;
                    }
                    sum;
                    """));
            }

            @Test
            @DisplayName("should provide $index variable in array repeat")
            void testArrayRepeatIndexVariable() {
                assertEquals(3, evaluator.evaluate("""
                    let arr = ["a", "b", "c"];
                    let indices = 0;
                    repeat (arr) {
                        indices = indices + $index;
                    }
                    indices;
                    """));
            }

            @Test
            @DisplayName("should provide $it variable with current element")
            void testArrayRepeatItVariable() {
                assertEquals(750, evaluator.evaluate("""
                    let arr = [5, 10, 15];
                    let product = 1;
                    repeat (arr) {
                        product = product * $it;
                    }
                    product;
                    """));
            }

            @Test
            @DisplayName("should handle empty array")
            void testArrayRepeatEmptyArray() {
                assertEquals(0, evaluator.evaluate("""
                    let arr = [];
                    let count = 0;
                    repeat (arr) {
                        count = count + 1;
                    }
                    count;
                    """));
            }

            @Test
            @DisplayName("should return last evaluated result from array iteration")
            void testArrayRepeatLastResult() {
                Object result = evaluator.evaluate("""
                    let arr = [1, 2, 3, 4];
                    repeat (arr) {
                        $it * 10;
                    }
                    """);
                assertTrue(result.equals(10) || result.equals(20) || result.equals(30) || result.equals(40));
            }
        }

        @Nested
        @DisplayName("object repeat")
        class ObjectRepeatTests {

            @Test
            @DisplayName("should iterate over object properties")
            void testObjectRepeatIteration() {
                assertEquals(6, evaluator.evaluate("""
                    let obj = {"a": 1, "b": 2, "c": 3};
                    let sum = 0;
                    repeat (obj) {
                        sum = sum + $it;
                    }
                    sum;
                    """));
            }

            @Test
            @DisplayName("should provide $key variable in object repeat")
            void testObjectRepeatKeyVariable() {
                Object result = evaluator.evaluate("""
                    let obj = {"x": 10, "y": 20};
                    let keys = "";
                    repeat (obj) {
                        keys = keys + $key;
                    }
                    keys;
                    """);
                assertTrue(result.toString().matches("xy|yx"));
            }

            @Test
            @DisplayName("should provide $value variable equal to $it")
            void testObjectRepeatValueVariable() {
                assertEquals(15, evaluator.evaluate("""
                    let obj = {"a": 5, "b": 10};
                    let total = 0;
                    repeat (obj) {
                        total = total + $value;
                    }
                    total;
                    """));
            }

            @Test
            @DisplayName("should handle empty object")
            void testObjectRepeatEmptyObject() {
                assertEquals(0, evaluator.evaluate("""
                    let obj = {};
                    let count = 0;
                    repeat (obj) {
                        count = count + 1;
                    }
                    count;
                    """));
            }

            @Test
            @DisplayName("should return last evaluated result from object iteration")
            void testObjectRepeatLastResult() {
                Object result = evaluator.evaluate("""
                    let obj = {"a": 1, "b": 2};
                    repeat (obj) {
                        $it * 100;
                    }
                    """);
                assertTrue(result.equals(100) || result.equals(200));
            }
        }

        @Nested
        @DisplayName("string repeat")
        class StringRepeatTests {

            @Test
            @DisplayName("should iterate over string characters")
            void testStringRepeatIteration() {
                assertEquals("abc", evaluator.evaluate("""
                    let str = "abc";
                    let combined = "";
                    repeat (str) {
                        combined = combined + $it;
                    }
                    combined;
                    """));
            }

            @Test
            @DisplayName("should provide $index variable in string repeat")
            void testStringRepeatIndexVariable() {
                assertEquals(6, evaluator.evaluate("""
                    let str = "test";
                    let indices = 0;
                    repeat (str) {
                        indices = indices + $index;
                    }
                    indices;
                    """));
            }

            @Test
            @DisplayName("should handle empty string")
            void testStringRepeatEmpty() {
                assertEquals(0, evaluator.evaluate("""
                    let str = "";
                    let count = 0;
                    repeat (str) {
                        count = count + 1;
                    }
                    count;
                    """));
            }

            @Test
            @DisplayName("should return last evaluated result from string iteration")
            void testStringRepeatLastResult() {
                assertEquals("z", evaluator.evaluate("""
                    let str = "xyz";
                    repeat (str) {
                        $it;
                    }
                    """));
            }
        }

        @Nested
        @DisplayName("null and undefined handling")
        class NullUndefinedTests {

            @Test
            @DisplayName("should return null for null iterable")
            void testRepeatNullIterable() {
                assertNull(evaluator.evaluate("""
                    repeat (null) {
                        let x = 1;
                    }
                    """));
            }

            @Test
            @DisplayName("should handle null from expression")
            void testRepeatNullExpression() {
                evaluator.declareContextValue("nullValue", new JexNull(), false);
                assertNull(evaluator.evaluate("""
                    repeat (nullValue) {
                        let x = 1;
                    }
                    """));
            }
        }

        @Nested
        @DisplayName("nested repeat expressions")
        class NestedRepeatTests {

            @Test
            @DisplayName("should handle nested numeric repeats")
            void testNestedNumericRepeat() {
                assertEquals(6, evaluator.evaluate("""
                    let sum = 0;
                    repeat (3) {
                        repeat (2) {
                            sum = sum + 1;
                        }
                    }
                    sum;
                    """));
            }

            @Test
            @DisplayName("should handle nested array repeats")
            void testNestedArrayRepeat() {
                assertEquals(10, evaluator.evaluate("""
                    let matrix = [[1, 2], [3, 4]];
                    let total = 0;
                    repeat (matrix) {
                        repeat ($it) {
                            total = total + $it;
                        }
                    }
                    total;
                    """));
            }
        }

        @Nested
        @DisplayName("scope and variable shadowing")
        class ScopeAndShadowingTests {

            @Test
            @DisplayName("should create new scope for repeat block")
            void testRepeatBlockScopeIsolation() {
                assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("""
                    repeat (1) {
                        let blockVar = 5;
                    }
                    blockVar;
                    """));
            }

            @Test
            @DisplayName("should access outer scope variables")
            void testRepeatAccessOuterScope() {
                assertEquals(20, evaluator.evaluate("""
                    let outer = 10;
                    repeat (2) {
                        outer = outer + 5;
                    }
                    outer;
                    """));
            }

            @Test
            @DisplayName("should not leak $index and $it variables")
            void testRepeatVariableLeakage() {
                assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("""
                    repeat (3) {
                        let x = $index;
                    }
                    $index;
                    """));

                assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("""
                    repeat ([1, 2]) {
                        let y = $it;
                    }
                    $it;
                    """));
            }
        }

        @Nested
        @DisplayName("async repeat expressions")
        class AsyncRepeatTests {

            @Test
            @DisplayName("should handle async operations in numeric repeat")
            void testAsyncNumericRepeat() {
                FuncImpl asyncFunc = (ctx, args) -> new JexNumber(5);
                evaluator.addFunction("asyncFunc", asyncFunc);
                assertEquals(10, evaluator.evaluate("""
                    let sum = 0;
                    repeat(2) {
                        let asyncVal = asyncFunc();
                        sum = sum + asyncVal;
                    }
                    sum;
                    """));
            }

            @Test
            @DisplayName("should handle async operations in array repeat")
            void testAsyncArrayRepeat() {
                FuncImpl asyncDouble = (ctx, val) -> {
                    try {
                        Thread.sleep(5);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                    return new JexNumber(Utils.toNumber(val[0], "asyncDouble").doubleValue() * 2);
                };
                evaluator.addFunction("asyncDouble", asyncDouble);
                assertEquals(12, evaluator.evaluate("""
                    let arr = [1, 2, 3];
                    let sum = 0;
                    repeat (arr) {
                        sum = sum + asyncDouble($it);
                    }
                    sum;
                    """));
            }

            @Test
            @DisplayName("should handle async operations in object repeat")
            void testAsyncObjectRepeat() {
                FuncImpl asyncValue = (ctx, val) -> new JexNumber(Utils.toNumber(val[0], "asyncDouble").doubleValue() + 10);
                evaluator.addFunction("asyncValue", asyncValue);
                assertEquals(23, evaluator.evaluate("""
                    let obj = {"a": 1, "b": 2};
                    let sum = 0;
                    repeat (obj) {
                        sum = sum + asyncValue($it);
                    }
                    sum;
                    """));
            }

            @Test
            @DisplayName("should handle async operations in string repeat")
            void testAsyncStringRepeat() {
                FuncImpl asyncCharCode = (ctx, charVal) -> new JexNumber((int) Utils.toString(charVal[0], "asyncCharCode").charAt(0));
                evaluator.addFunction("asyncCharCode", asyncCharCode);
                assertEquals(294, evaluator.evaluate("""
                    let str = "abc";
                    let total = 0;
                    repeat (str) {
                        total = total + asyncCharCode($it);
                    }
                    total;
                    """));
            }
        }
    }

    @Nested
    @DisplayName("if-else expressions")
    class IfElseExpressionsTests {

        @Nested
        @DisplayName("basic if expressions")
        class BasicIfExpressions {

            @Test
            @DisplayName("should execute if block when condition is true")
            void testExecuteIfBlockWhenConditionIsTrue() {
                assertEquals(42, evaluator.evaluate("""
                    if (true) {
                        42;
                    }
                """));
            }

            @Test
            @DisplayName("should return null when condition is false and no else")
            void testReturnNullWhenConditionFalseNoElse() {
                assertNull(evaluator.evaluate("""
                    if (false) {
                        42;
                    }
                """));
            }

            @Test
            @DisplayName("should evaluate condition expressions")
            void testEvaluateConditionExpressions() {
                assertEquals("greater", evaluator.evaluate("""
                    if (5 > 3) {
                        "greater";
                    }
                """));
            }

            @Test
            @DisplayName("should handle falsy values")
            void testHandleFalsyValues() {
                assertNull(evaluator.evaluate("if (0) { \"yes\"; }"));
                assertNull(evaluator.evaluate("if (\"\") { \"yes\"; }"));
                assertNull(evaluator.evaluate("if (null) { \"yes\"; }"));
                assertNull(evaluator.evaluate("if (false) { \"yes\"; }"));
            }

            @Test
            @DisplayName("should handle truthy values")
            void testHandleTruthyValues() {
                assertEquals("yes", evaluator.evaluate("if (1) { \"yes\"; }"));
                assertEquals("yes", evaluator.evaluate("if (\"hello\") { \"yes\"; }"));
                assertEquals("yes", evaluator.evaluate("if (true) { \"yes\"; }"));
                assertEquals("yes", evaluator.evaluate("if ([1]) { \"yes\"; }"));
                assertEquals("yes", evaluator.evaluate("if ({\"a\": 1}) { \"yes\"; }"));
            }

            @Test
            @DisplayName("should handle empty arrays and objects as falsy")
            void testHandleEmptyArraysObjectsAsFalsy() {
                assertNull(evaluator.evaluate("if ([]) { \"yes\"; }"));
                assertNull(evaluator.evaluate("if ({}) { \"yes\"; }"));
            }
        }

        @Nested
        @DisplayName("if-else expressions")
        class IfElseExpressions {

            @Test
            @DisplayName("should execute else block when condition is false")
            void testExecuteElseBlockWhenConditionFalse() {
                assertEquals("else", evaluator.evaluate("""
                    if (false) {
                        "if";
                    } else {
                        "else";
                    }
                """));
            }

            @Test
            @DisplayName("should execute if block when condition is true")
            void testExecuteIfBlockWhenConditionTrue() {
                assertEquals("if", evaluator.evaluate("""
                    if (true) {
                        "if";
                    } else {
                        "else";
                    }
                """));
            }

            @Test
            @DisplayName("should handle complex expressions in blocks")
            void testHandleComplexExpressionsInBlocks() {
                assertEquals(40, evaluator.evaluate("""
                    if (10 > 5) {
                        let x = 20;
                        x * 2;
                    } else {
                        let y = 10;
                        y * 3;
                    }
                """));
            }
        }

        @Nested
        @DisplayName("if-else-if expressions")
        class IfElseIfExpressions {

            @Test
            @DisplayName("should execute first true condition")
            void testExecuteFirstTrueCondition() {
                assertEquals("second", evaluator.evaluate("""
                    if (false) {
                        "first";
                    } else if (true) {
                        "second";
                    } else {
                        "third";
                    }
                """));
            }

            @Test
            @DisplayName("should execute else when all conditions are false")
            void testExecuteElseWhenAllFalse() {
                assertEquals("third", evaluator.evaluate("""
                    if (false) {
                        "first";
                    } else if (false) {
                        "second";
                    } else {
                        "third";
                    }
                """));
            }

            @Test
            @DisplayName("should handle multiple else-if clauses")
            void testHandleMultipleElseIfClauses() {
                evaluator.declareContextValue("score", 85, false);
                assertEquals("B", evaluator.evaluate("""
                    if (score >= 90) {
                        "A";
                    } else if (score >= 80) {
                        "B";
                    } else if (score >= 70) {
                        "C";
                    } else {
                        "F";
                    }
                """));
            }

            @Test
            @DisplayName("should return null when all conditions are false and no else")
            void testReturnNullWhenAllFalseNoElse() {
                assertNull(evaluator.evaluate("""
                    if (false) {
                        "first";
                    } else if (false) {
                        "second";
                    }
                """));
            }

            @Test
            @DisplayName("should stop at first true condition")
            void testStopAtFirstTrueCondition() {
                evaluator.declareContextValue("counter", 0, false);
                assertEquals(10, evaluator.evaluate("""
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
                """));
            }
        }

        @Nested
        @DisplayName("nested if expressions")
        class NestedIfExpressions {

            @Test
            @DisplayName("should handle nested if statements")
            void testHandleNestedIfStatements() {
                assertEquals("nested", evaluator.evaluate("""
                    if (true) {
                        if (true) {
                            "nested";
                        }
                    }
                """));
            }

            @Test
            @DisplayName("should handle nested if-else statements")
            void testHandleNestedIfElseStatements() {
                assertEquals("inner-else", evaluator.evaluate("""
                    if (true) {
                        if (false) {
                            "inner-if";
                        } else {
                            "inner-else";
                        }
                    } else {
                        "outer-else";
                    }
                """));
            }

            @Test
            @DisplayName("should handle deeply nested conditions")
            void testHandleDeeplyNestedConditions() {
                evaluator.declareContextValue("x", 5, false);
                evaluator.declareContextValue("y", 10, false);
                assertEquals("all conditions met", evaluator.evaluate("""
                    if (x < y) {
                        if (x > 0) {
                            if (y > 5) {
                                "all conditions met";
                            }
                        }
                    }
                """));
            }
        }

        @Nested
        @DisplayName("if expressions with variables")
        class IfExpressionsWithVariables {

            @Test
            @DisplayName("should access outer scope variables")
            void testAccessOuterScopeVariables() {
                assertEquals(20, evaluator.evaluate("""
                    let x = 10;
                    if (x > 5) {
                        x * 2;
                    }
                """));
            }

            @Test
            @DisplayName("should modify outer scope variables")
            void testModifyOuterScopeVariables() {
                assertEquals(5, evaluator.evaluate("""
                    let count = 0;
                    if (true) {
                        count = count + 5;
                    }
                    count;
                """));
            }

            @Test
            @DisplayName("should declare variables in if block scope")
            void testDeclareVariablesInIfBlockScope() {
                assertThrows(JexLangRuntimeError.class, () -> evaluator.evaluate("""
                    if (true) {
                        let blockVar = 10;
                    }
                    blockVar;
                """));
            }

            @Test
            @DisplayName("should handle variable declarations in different branches")
            void testHandleVariableDeclarationsInDifferentBranches() {
                evaluator.declareContextValue("flag", true, false);
                assertEquals(10, evaluator.evaluate("""
                    let result = 0;
                    if (flag) {
                        let temp = 10;
                        result = temp;
                    } else {
                        let temp = 20;
                        result = temp;
                    }
                    result;
                """));
            }
        }

        @Nested
        @DisplayName("async if expressions")
        class AsyncIfExpressions {

            @Test
            @DisplayName("should handle async condition evaluation")
            void testAsyncConditionEvaluation() throws Exception {
                FuncImpl asyncCheck = (_ctx, _val) -> {;
                    try {
                        Thread.sleep(10);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                    return JexValue.fromBoolean(true);
                };
                evaluator.addFunction("asyncCheck", asyncCheck);
                assertEquals("async-true", evaluator.evaluate("""
                    if (asyncCheck()) {
                        "async-true";
                    } else {
                        "async-false";
                    }
                """));
            }

            // ... Additional async tests would follow the same pattern
            // converting JS async lambdas to FuncImpl with appropriate type handling
        }

        @Nested
        @DisplayName("sync if expressions")
        class SyncIfExpressions {

            @Test
            @DisplayName("should handle multiple sync operations in if block")
            void testMultipleSyncOperationsInIfBlock() {
                assertEquals(25, evaluator.evaluate("""
                    let total = 0;
                    if (true) {
                        total = total + 10;
                        total = total * 2;
                        total = total + 5;
                    }
                    total;
                """));
            }

            @Test
            @DisplayName("should handle sync expressions with context variables")
            void testSyncExpressionsWithContextVariables() {
                evaluator.declareContextValue("multiplier", 3, false);
                evaluator.declareContextValue("base", 10, false);
                assertEquals(30, evaluator.evaluate("""
                    if (multiplier > 2) {
                        base * multiplier;
                    } else {
                        base;
                    }
                """));
            }

            @Test
            @DisplayName("should handle sync function calls in conditions")
            void testSyncFunctionCallsInConditions() {
                FuncImpl syncCheck = (_ctx, val) -> JexValue.from(Utils.toNumber(val[0], "syncCheck").doubleValue() % 2 == 0);
                evaluator.addFunction("syncCheck", syncCheck);
                assertEquals("even", evaluator.evaluate("""
                    if (syncCheck(10)) {
                        "even";
                    } else {
                        "odd";
                    }
                """));
            }
        }
    }

    @Nested
    @DisplayName("prefix expressions")
    class PrefixExpressionsTests {

        @Nested
        @DisplayName("prefix increment/decrement with variables")
        class PrefixIncrementDecrementVariables {

            @Test
            @DisplayName("should increment variable with prefix operator")
            void testPrefixIncrementVariable() {
                evaluator.declareContextValue("x", 5, false);
                assertEquals(6, evaluator.evaluate("++x"));
                assertEquals(6, evaluator.evaluate("x"));
            }

            @Test
            @DisplayName("should decrement variable with prefix operator")
            void testPrefixDecrementVariable() {
                evaluator.declareContextValue("y", 10, false);
                assertEquals(9, evaluator.evaluate("--y"));
                assertEquals(9, evaluator.evaluate("y"));
            }

            @Test
            @DisplayName("should return new value after prefix increment")
            void testNewValueAfterPrefixIncrement() {
                evaluator.declareContextValue("count", 0, false);
                assertEquals(1, evaluator.evaluate("++count"));
                assertEquals(2, evaluator.evaluate("++count"));
                assertEquals(2, evaluator.evaluate("count"));
            }

            @Test
            @DisplayName("should return new value after prefix decrement")
            void testNewValueAfterPrefixDecrement() {
                evaluator.declareContextValue("count", 5, false);
                assertEquals(4, evaluator.evaluate("--count"));
                assertEquals(3, evaluator.evaluate("--count"));
                assertEquals(3, evaluator.evaluate("count"));
            }

            @Test
            @DisplayName("should handle multiple prefix operations")
            void testMultiplePrefixOperations() {
                evaluator.declareContextValue("a", 0, false);
                evaluator.declareContextValue("b", 0, false);
                assertEquals(2, evaluator.evaluate("++a + ++b"));
                assertEquals(1, evaluator.evaluate("a"));
                assertEquals(1, evaluator.evaluate("b"));
            }

            @Test
            @DisplayName("should throw error for undefined variable")
            void testPrefixUndefinedVariable() {
                assertThrows(Exception.class, () -> evaluator.evaluate("++undefinedVar"));
                assertThrows(Exception.class, () -> evaluator.evaluate("--undefinedVar"));
            }
        }

        @Nested
        @DisplayName("prefix increment/decrement with array elements")
        class PrefixIncrementDecrementArray {

            @Test
            @DisplayName("should increment array element with positive index")
            void testPrefixIncrementPositiveIndex() {
                List<Integer> arr = new ArrayList<>(List.of(1, 2, 3));
                evaluator.declareContextValue("arr", arr, false);
                assertEquals(2, evaluator.evaluate("++arr[0]"));
                assertEquals(2, evaluator.evaluate("arr[0]"));
            }

            @Test
            @DisplayName("should decrement array element with positive index")
            void testPrefixDecrementPositiveIndex() {
                List<Integer> arr = new ArrayList<>(List.of(10, 20, 30));
                evaluator.declareContextValue("arr", arr, false);
                assertEquals(19, evaluator.evaluate("--arr[1]"));
                assertEquals(19, evaluator.evaluate("arr[1]"));
            }

            @Test
            @DisplayName("should increment array element with negative index")
            void testPrefixIncrementNegativeIndex() {
                List<Integer> arr = new ArrayList<>(List.of(5, 10, 15));
                evaluator.declareContextValue("arr", arr, false);
                assertEquals(16, evaluator.evaluate("++arr[-1]"));
                assertEquals(16, evaluator.evaluate("arr[-1]"));
                assertEquals(16, evaluator.evaluate("arr[2]"));
            }

            @Test
            @DisplayName("should decrement array element with negative index")
            void testPrefixDecrementNegativeIndex() {
                List<Integer> arr = new ArrayList<>(List.of(100, 200, 300));
                evaluator.declareContextValue("arr", arr, false);
                assertEquals(199, evaluator.evaluate("--arr[-2]"));
                assertEquals(199, evaluator.evaluate("arr[-2]"));
                assertEquals(199, evaluator.evaluate("arr[1]"));
            }

            @Test
            @DisplayName("should handle prefix operations with expression as index")
            void testPrefixExpressionAsIndex() {
                List<Integer> arr = new ArrayList<>(List.of(1, 2, 3, 4, 5));
                evaluator.declareContextValue("arr", arr, false);
                evaluator.declareContextValue("idx", 2, false);
                assertEquals(5, evaluator.evaluate("++arr[idx + 1]"));
                assertEquals(5, evaluator.evaluate("arr[3]"));
            }

            @Test
            @DisplayName("should return null for out of bounds array index")
            void testOutOfBoundsArrayIndex() {
                List<Integer> arr = new ArrayList<>(List.of(1, 2, 3));
                evaluator.declareContextValue("arr", arr, false);
                assertNull(evaluator.evaluate("++arr[10]"));
            }

            @Test
            @DisplayName("should handle nested array increment")
            void testNestedArrayIncrement() {
                List<List<Integer>> matrix = new ArrayList<>();
                matrix.add(new ArrayList<>(List.of(1, 2)));
                matrix.add(new ArrayList<>(List.of(3, 4)));
                evaluator.declareContextValue("matrix", matrix, false);
                assertEquals(3, evaluator.evaluate("++matrix[0][1]"));
                assertEquals(3, evaluator.evaluate("matrix[0][1]"));
            }
        }

        @Nested
        @DisplayName("prefix increment/decrement with object properties")
        class PrefixIncrementDecrementObject {

            @Test
            @DisplayName("should increment object property with dot notation")
            void testPrefixIncrementDotNotation() {
                Map<String, Object> obj = new HashMap<>();
                obj.put("count", 5);
                evaluator.declareContextValue("obj", obj, false);
                assertEquals(6, evaluator.evaluate("++obj.count"));
                assertEquals(6, evaluator.evaluate("obj.count"));
            }

            @Test
            @DisplayName("should decrement object property with dot notation")
            void testPrefixDecrementDotNotation() {
                Map<String, Object> obj = new HashMap<>();
                obj.put("value", 20);
                evaluator.declareContextValue("obj", obj, false);
                assertEquals(19, evaluator.evaluate("--obj.value"));
                assertEquals(19, evaluator.evaluate("obj.value"));
            }

            @Test
            @DisplayName("should increment object property with bracket notation")
            void testPrefixIncrementBracketNotation() {
                Map<String, Object> obj = new HashMap<>();
                obj.put("score", 10);
                evaluator.declareContextValue("obj", obj, false);
                assertEquals(11, evaluator.evaluate("++obj[\"score\"]"));
                assertEquals(11, evaluator.evaluate("obj.score"));
            }

            @Test
            @DisplayName("should decrement object property with bracket notation")
            void testPrefixDecrementBracketNotation() {
                Map<String, Object> obj = new HashMap<>();
                obj.put("points", 50);
                evaluator.declareContextValue("obj", obj, false);
                assertEquals(49, evaluator.evaluate("--obj[\"points\"]"));
                assertEquals(49, evaluator.evaluate("obj.points"));
            }

            @Test
            @DisplayName("should handle prefix operations with dynamic property names")
            void testDynamicPropertyName() {
                Map<String, Object> obj = new HashMap<>();
                obj.put("x", 5);
                obj.put("y", 10);
                evaluator.declareContextValue("obj", obj, false);
                evaluator.declareContextValue("key", "x", false);
                assertEquals(6, evaluator.evaluate("++obj[key]"));
                assertEquals(6, evaluator.evaluate("obj.x"));
            }

            @Test
            @DisplayName("should handle nested object property increment")
            void testNestedObjectPropertyIncrement() {
                Map<String, Object> user = new HashMap<>();
                user.put("age", 25);
                Map<String, Object> data = new HashMap<>();
                data.put("user", user);
                evaluator.declareContextValue("data", data, false);
                assertEquals(26, evaluator.evaluate("++data.user.age"));
                assertEquals(26, evaluator.evaluate("data.user.age"));
            }

            @Test
            @DisplayName("should throw error for non-object property access")
            void testNonObjectPropertyAccessThrows() {
                evaluator.declareContextValue("num", 42, false);
                assertThrows(Exception.class, () -> evaluator.evaluate("++num.prop"));
            }
        }
    }

    @Nested
    @DisplayName("postfix expressions")
    class PostfixExpressionsTests {

        @Nested
        @DisplayName("postfix increment/decrement with variables")
        class PostfixIncrementDecrementVariables {

            @Test
            @DisplayName("should increment variable with postfix operator")
            void testPostfixIncrementVariable() {
                evaluator.declareContextValue("x", 5, false);
                assertEquals(5, evaluator.evaluate("x++"));
                assertEquals(6, evaluator.evaluate("x"));
            }

            @Test
            @DisplayName("should decrement variable with postfix operator")
            void testPostfixDecrementVariable() {
                evaluator.declareContextValue("y", 10, false);
                assertEquals(10, evaluator.evaluate("y--"));
                assertEquals(9, evaluator.evaluate("y"));
            }

            @Test
            @DisplayName("should return old value after postfix increment")
            void testOldValueAfterPostfixIncrement() {
                evaluator.declareContextValue("count", 0, false);
                assertEquals(0, evaluator.evaluate("count++"));
                assertEquals(1, evaluator.evaluate("count"));
                assertEquals(1, evaluator.evaluate("count++"));
                assertEquals(2, evaluator.evaluate("count"));
            }

            @Test
            @DisplayName("should return old value after postfix decrement")
            void testOldValueAfterPostfixDecrement() {
                evaluator.declareContextValue("count", 5, false);
                assertEquals(5, evaluator.evaluate("count--"));
                assertEquals(4, evaluator.evaluate("count"));
                assertEquals(4, evaluator.evaluate("count--"));
                assertEquals(3, evaluator.evaluate("count"));
            }

            @Test
            @DisplayName("should handle multiple postfix operations")
            void testMultiplePostfixOperations() {
                evaluator.declareContextValue("a", 0, false);
                evaluator.declareContextValue("b", 0, false);
                assertEquals(0, evaluator.evaluate("a++ + b++"));
                assertEquals(1, evaluator.evaluate("a"));
                assertEquals(1, evaluator.evaluate("b"));
            }

            @Test
            @DisplayName("should handle mix of prefix and postfix")
            void testMixPrefixPostfix() {
                evaluator.declareContextValue("x", 5, false);
                assertEquals(12, evaluator.evaluate("++x + x++")); // 6 + 6, then x = 7
                assertEquals(7, evaluator.evaluate("x"));
            }

            @Test
            @DisplayName("should throw error for undefined variable")
            void testUndefinedVariablePostfix() {
                assertThrows(Exception.class, () -> evaluator.evaluate("undefinedVar++"));
                assertThrows(Exception.class, () -> evaluator.evaluate("undefinedVar--"));
            }
        }

        @Nested
        @DisplayName("postfix increment/decrement with array elements")
        class PostfixIncrementDecrementArray {

            @Test
            @DisplayName("should increment array element with positive index")
            void testPostfixIncrementPositiveIndex() {
                List<Integer> arr = new ArrayList<>(List.of(1, 2, 3));
                evaluator.declareContextValue("arr", arr, false);
                assertEquals(1, evaluator.evaluate("arr[0]++"));
                assertEquals(2, evaluator.evaluate("arr[0]"));
            }

            @Test
            @DisplayName("should decrement array element with positive index")
            void testPostfixDecrementPositiveIndex() {
                List<Integer> arr = new ArrayList<>(List.of(10, 20, 30));
                evaluator.declareContextValue("arr", arr, false);
                assertEquals(20, evaluator.evaluate("arr[1]--"));
                assertEquals(19, evaluator.evaluate("arr[1]"));
            }

            @Test
            @DisplayName("should increment array element with negative index")
            void testPostfixIncrementNegativeIndex() {
                List<Integer> arr = new ArrayList<>(List.of(5, 10, 15));
                evaluator.declareContextValue("arr", arr, false);
                assertEquals(15, evaluator.evaluate("arr[-1]++"));
                assertEquals(16, evaluator.evaluate("arr[-1]"));
                assertEquals(16, evaluator.evaluate("arr[2]"));
            }

            @Test
            @DisplayName("should decrement array element with negative index")
            void testPostfixDecrementNegativeIndex() {
                List<Integer> arr = new ArrayList<>(List.of(100, 200, 300));
                evaluator.declareContextValue("arr", arr, false);
                assertEquals(200, evaluator.evaluate("arr[-2]--"));
                assertEquals(199, evaluator.evaluate("arr[-2]"));
                assertEquals(199, evaluator.evaluate("arr[1]"));
            }

            @Test
            @DisplayName("should handle postfix operations with expression as index")
            void testPostfixExpressionAsIndex() {
                List<Integer> arr = new ArrayList<>(List.of(1, 2, 3, 4, 5));
                evaluator.declareContextValue("arr", arr, false);
                evaluator.declareContextValue("idx", 2, false);
                assertEquals(4, evaluator.evaluate("arr[idx + 1]++"));
                assertEquals(5, evaluator.evaluate("arr[3]"));
            }

            @Test
            @DisplayName("should handle postfix with computed index expression")
            void testPostfixComputedIndex() {
                List<Integer> arr = new ArrayList<>(List.of(10, 20, 30, 40));
                evaluator.declareContextValue("arr", arr, false);
                assertEquals(30, evaluator.evaluate("arr[1 + 1]++"));
                assertEquals(31, evaluator.evaluate("arr[2]"));
            }

            @Test
            @DisplayName("should return null for out of bounds array index")
            void testPostfixOutOfBounds() {
                List<Integer> arr = new ArrayList<>(List.of(1, 2, 3));
                evaluator.declareContextValue("arr", arr, false);
                assertNull(evaluator.evaluate("arr[10]++"));
            }

            @Test
            @DisplayName("should handle nested array decrement")
            void testPostfixNestedArrayDecrement() {
                List<List<Integer>> matrix = new ArrayList<>();
                matrix.add(new ArrayList<>(List.of(1, 2)));
                matrix.add(new ArrayList<>(List.of(3, 4)));
                evaluator.declareContextValue("matrix", matrix, false);
                assertEquals(3, evaluator.evaluate("matrix[1][0]--"));
                assertEquals(2, evaluator.evaluate("matrix[1][0]"));
            }
        }

        @Nested
        @DisplayName("postfix increment/decrement with object properties")
        class PostfixIncrementDecrementObject {

            @Test
            @DisplayName("should increment object property with dot notation")
            void testPostfixIncrementDotNotation() {
                Map<String, Object> obj = new HashMap<>();
                obj.put("count", 5);
                evaluator.declareContextValue("obj", obj, false);
                assertEquals(5, evaluator.evaluate("obj.count++"));
                assertEquals(6, evaluator.evaluate("obj.count"));
            }

            @Test
            @DisplayName("should decrement object property with dot notation")
            void testPostfixDecrementDotNotation() {
                Map<String, Object> obj = new HashMap<>();
                obj.put("value", 20);
                evaluator.declareContextValue("obj", obj, false);
                assertEquals(20, evaluator.evaluate("obj.value--"));
                assertEquals(19, evaluator.evaluate("obj.value"));
            }

            @Test
            @DisplayName("should increment object property with bracket notation")
            void testPostfixIncrementBracketNotation() {
                Map<String, Object> obj = new HashMap<>();
                obj.put("score", 10);
                evaluator.declareContextValue("obj", obj, false);
                assertEquals(10, evaluator.evaluate("obj[\"score\"]++"));
                assertEquals(11, evaluator.evaluate("obj.score"));
            }

            @Test
            @DisplayName("should decrement object property with bracket notation")
            void testPostfixDecrementBracketNotation() {
                Map<String, Object> obj = new HashMap<>();
                obj.put("points", 50);
                evaluator.declareContextValue("obj", obj, false);
                assertEquals(50, evaluator.evaluate("obj[\"points\"]--"));
                assertEquals(49, evaluator.evaluate("obj.points"));
            }

            @Test
            @DisplayName("should handle postfix operations with dynamic property names")
            void testPostfixDynamicProperty() {
                Map<String, Object> obj = new HashMap<>();
                obj.put("x", 5);
                obj.put("y", 10);
                evaluator.declareContextValue("obj", obj, false);
                evaluator.declareContextValue("key", "y", false);
                assertEquals(10, evaluator.evaluate("obj[key]++"));
                assertEquals(11, evaluator.evaluate("obj.y"));
            }

            @Test
            @DisplayName("should handle nested object property decrement")
            void testPostfixNestedObjectProperty() {
                Map<String, Object> user = new HashMap<>();
                user.put("age", 25);
                Map<String, Object> data = new HashMap<>();
                data.put("user", user);
                evaluator.declareContextValue("data", data, false);
                assertEquals(25, evaluator.evaluate("data.user.age--"));
                assertEquals(24, evaluator.evaluate("data.user.age"));
            }

            @Test
            @DisplayName("should throw error for non-object property access")
            void testPostfixNonObjectPropertyAccess() {
                evaluator.declareContextValue("str", "test", false);
                assertThrows(Exception.class, () -> evaluator.evaluate("str.length++"));
            }
        }

        @Nested
        @DisplayName("complex postfix/prefix scenarios")
        class PostfixPrefixComplex {

            @Test
            @DisplayName("should handle array of objects with postfix")
            void testArrayOfObjectsPostfix() {
                List<Map<String, Object>> users = new ArrayList<>();
                users.add(new HashMap<>() {{ put("score", 10); }});
                users.add(new HashMap<>() {{ put("score", 20); }});
                evaluator.declareContextValue("users", users, false);
                assertEquals(10, evaluator.evaluate("users[0].score++"));
                assertEquals(11, evaluator.evaluate("users[0].score"));
            }

            @Test
            @DisplayName("should handle object with array property and prefix")
            void testObjectWithArrayPrefix() {
                Map<String, Object> data = new HashMap<>();
                data.put("values", new ArrayList<>(List.of(5, 10, 15)));
                evaluator.declareContextValue("data", data, false);
                assertEquals(11, evaluator.evaluate("++data.values[1]"));
                assertEquals(11, evaluator.evaluate("data.values[1]"));
            }

            @Test
            @DisplayName("should handle negative index with postfix in nested array")
            void testNegativeIndexNestedArray() {
                List<List<Integer>> matrix = new ArrayList<>();
                matrix.add(new ArrayList<>(List.of(1, 2)));
                matrix.add(new ArrayList<>(List.of(3, 4)));
                matrix.add(new ArrayList<>(List.of(5, 6)));
                evaluator.declareContextValue("matrix", matrix, false);
                assertEquals(6, evaluator.evaluate("matrix[-1][-1]++"));
                assertEquals(7, evaluator.evaluate("matrix[-1][-1]"));
                assertEquals(7, evaluator.evaluate("matrix[2][1]"));
            }

            @Test
            @DisplayName("should handle expression in both array and object access")
            void testExpressionArrayObject() {
                List<Map<String, Object>> items = new ArrayList<>();
                items.add(new HashMap<>() {{ put("count", 0); }});
                items.add(new HashMap<>() {{ put("count", 5); }});
                Map<String, Object> complex = new HashMap<>();
                complex.put("items", items);
                evaluator.declareContextValue("complex", complex, false);
                evaluator.declareContextValue("idx", 0, false);
                assertEquals(5, evaluator.evaluate("complex.items[idx + 1].count++"));
                assertEquals(6, evaluator.evaluate("complex.items[1].count"));
            }
        }
    }


}

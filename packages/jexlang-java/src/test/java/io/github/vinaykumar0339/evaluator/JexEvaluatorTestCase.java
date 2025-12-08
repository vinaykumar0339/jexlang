package io.github.vinaykumar0339.evaluator;

import io.github.vinaykumar0339.eval.errors.JexLangRuntimeError;
import io.github.vinaykumar0339.functions.FuncImpl;
import io.github.vinaykumar0339.transforms.TransformImpl;
import io.github.vinaykumar0339.types.JexArray;
import io.github.vinaykumar0339.types.JexObject;
import io.github.vinaykumar0339.types.JexValue;
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
}

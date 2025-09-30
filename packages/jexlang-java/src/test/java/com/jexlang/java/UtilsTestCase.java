package com.jexlang.java;

import com.jexlang.java.eval.errors.JexLangRuntimeError;
import com.jexlang.java.eval.errors.TypeMismatchError;
import com.jexlang.java.functions.FuncImpl;
import com.jexlang.java.types.JexValue;
import org.apache.commons.math3.util.FastMath;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@DisplayName("UtilsTestCase")
public class UtilsTestCase {

    @Nested
    @DisplayName("n1, n2, n3, and assertFinite")
    class NumericFunctions {

        @Test
        @DisplayName("n1 applies a unary function correctly")
        public void testN1() {
            FuncImpl func1 = Utils.n1(x -> x * x, "square");
            JexValue result1 = func1.apply(JexValue.fromNumber(3));
            Assertions.assertEquals(9.0, result1.asNumber("square").doubleValue());

            FuncImpl func2 = Utils.n1(x -> x * x, "square");
            JexValue result2 = func2.apply();
            Assertions.assertEquals(0, result2.asNumber("square").intValue());
        }

        @Test
        @DisplayName("n2 applies a binary function correctly")
        public void testN2() {
            FuncImpl func1 = Utils.n2(Double::sum, "addA", "addB");
            JexValue result1 = func1.apply(JexValue.fromNumber(3), JexValue.fromNumber(4));
            Assertions.assertEquals(7.0, result1.asNumber("add").doubleValue());

            FuncImpl func2 = Utils.n2(FastMath::pow, "base", "exponent");
            JexValue result2 = func2.apply(JexValue.fromNumber(10));
            Assertions.assertEquals(1.0, result2.asNumber("power").doubleValue());
        }

        @Test
        @DisplayName("n3 applies a ternary function correctly")
        public void testN3() {
            FuncImpl func = Utils.n3((a, b, c) -> a * b + c, "mulA", "mulB", "addC");
            JexValue result = func.apply(JexValue.fromNumber(2), JexValue.fromNumber(3), JexValue.fromNumber(4));
            Assertions.assertEquals(10.0, result.asNumber("ternary").doubleValue());

            FuncImpl func3 = Utils.n3((a, b, c) -> a * b + c, "mulA", "mulB", "addC");
            JexValue result3 = func3.apply(JexValue.fromNumber(5), JexValue.fromNumber(5));
            Assertions.assertEquals(25.0, result3.asNumber("ternary").doubleValue());

            FuncImpl func2 = Utils.n3((a, b, c) -> a * b + c, "mulA", "mulB", "addC");
            JexValue result2 = func2.apply(JexValue.fromNumber(5));
            Assertions.assertEquals(0.0, result2.asNumber("ternary").doubleValue());

            FuncImpl func4 = Utils.n3((a, b, c) -> a * b + c, "mulA", "mulB", "addC");
            JexValue result4 = func4.apply();
            Assertions.assertEquals(0.0, result4.asNumber("ternary").doubleValue());
        }

        @Test
        @DisplayName("assertFinite throws an error for non-finite values")
        public void testAssertFinite() {
            Assertions.assertThrows(JexLangRuntimeError.class, () -> Utils.assertFinite("test", Double.POSITIVE_INFINITY));
            Assertions.assertThrows(JexLangRuntimeError.class, () -> Utils.assertFinite("test", Double.NaN));
            Assertions.assertDoesNotThrow(() -> Utils.assertFinite("test", 42.0));
        }
    }

    @Nested
    @DisplayName("checkPositive")
    class checkPositive {

        @Test
        @DisplayName("throws exception for negative values when zero is not allowed")
        public void testNegativeValueWithoutZeroAllowed() {
            RuntimeException exception = Assertions.assertThrows(RuntimeException.class, () -> {
                Utils.checkPositive("testNegative", -1.0, false);
            });
            Assertions.assertEquals("testNegative domain error: expected x > 0, got -1.0", exception.getMessage());
        }

        @Test
        @DisplayName("throws exception for zero when zero is not allowed")
        public void testZeroWithoutZeroAllowed() {
            RuntimeException exception = Assertions.assertThrows(RuntimeException.class, () -> {
                Utils.checkPositive("testZero", 0.0, false);
            });
            Assertions.assertEquals("testZero domain error: expected x > 0, got 0.0", exception.getMessage());
        }

        @Test
        @DisplayName("does not throw exception for positive values when zero is not allowed")
        public void testPositiveValueWithoutZeroAllowed() {
            Assertions.assertDoesNotThrow(() -> {
                Utils.checkPositive("testPositive", 1.0, false);
            });
        }

        @Test
        @DisplayName("throws exception for negative values when zero is allowed")
        public void testNegativeValueWithZeroAllowed() {
            RuntimeException exception = Assertions.assertThrows(RuntimeException.class, () -> {
                Utils.checkPositive("testNegative", -1.0, true);
            });
            Assertions.assertEquals("testNegative domain error: expected x >= 0, got -1.0", exception.getMessage());
        }

        @Test
        @DisplayName("does not throw exception for zero when zero is allowed")
        public void testZeroWithZeroAllowed() {
            Assertions.assertDoesNotThrow(() -> {
                Utils.checkPositive("testZero", 0.0, true);
            });
        }

        @Test
        @DisplayName("does not throw exception for positive values when zero is allowed")
        public void testPositiveValueWithZeroAllowed() {
            Assertions.assertDoesNotThrow(() -> {
                Utils.checkPositive("testPositive", 1.0, true);
            });
        }
    }

    @Nested
    @DisplayName("getJexValueType")
    class getJexValueType {

        @Test
        @DisplayName("null is of type null")
        public void testWithNull() {
            Assertions.assertEquals(Utils.getJexValueType(null), "null");
        }

        @Test
        @DisplayName("array is of type array")
        public void testWithArray() {
            Assertions.assertEquals(Utils.getJexValueType(JexValue.fromArray(Arrays.asList(1, 2, 3))), "array");
            Assertions.assertEquals(Utils.getJexValueType(JexValue.fromArray(List.of())), "array");
        }

        @Test
        @DisplayName("object is of type object")
        public void testWithObject() {
            Assertions.assertEquals(
                    Utils.getJexValueType(JexValue.fromObject(Map.ofEntries(
                    Map.entry("key1", JexValue.fromString("value1")),
                    Map.entry("key2", JexValue.fromNumber(42))
            ))), "object");
            Assertions.assertEquals(Utils.getJexValueType(JexValue.fromObject(
                    Map.of()
            )), "object");
        }

        @Test
        @DisplayName("string is of type string")
        public void testWithString() {
            Assertions.assertEquals(Utils.getJexValueType(JexValue.fromString("hello")), "string");
            Assertions.assertEquals(Utils.getJexValueType(JexValue.fromString("")), "string");
        }

        @Test
        @DisplayName("boolean is of type boolean")
        public void testWithBoolean() {
            Assertions.assertEquals(Utils.getJexValueType(JexValue.fromBoolean(true)), "boolean");
            Assertions.assertEquals(Utils.getJexValueType(JexValue.fromBoolean(false)), "boolean");
        }

        @Test
        @DisplayName("number is of type number")
        public void testWithNumber() {
            Assertions.assertEquals(Utils.getJexValueType(JexValue.fromNumber(42)), "number");
            Assertions.assertEquals(Utils.getJexValueType(JexValue.fromNumber(3.14)), "number");
        }

        @Test
        @DisplayName("integer is of type integer")
        public void testWithInteger() {
            Assertions.assertEquals(Utils.getJexValueType(JexValue.fromInteger(42)), "integer");
            Assertions.assertEquals(Utils.getJexValueType(JexValue.fromInteger(-1)), "integer");
        }

        @Test
        @DisplayName("double is of type double")
        public void testWithDouble() {
            Assertions.assertEquals(Utils.getJexValueType(JexValue.fromDouble(3.14)), "double");
            Assertions.assertEquals(Utils.getJexValueType(JexValue.fromDouble(-0.001)), "double");
        }
    }

    @Nested
    @DisplayName("toBoolean")
    class toBoolean {

        @Test
        @DisplayName("null is converted to false")
        public void testWithNull() {
            Assertions.assertFalse(Utils.toBoolean(JexValue.fromNull(), "testWithNull"));
            Assertions.assertFalse(Utils.toBoolean(null, "testWithNull"));
        }

        @Test
        @DisplayName("boolean values are converted correctly")
        public void testWithBoolean() {
            Assertions.assertTrue(Utils.toBoolean(JexValue.fromBoolean(true), "testWithBoolean"));
            Assertions.assertFalse(Utils.toBoolean(JexValue.fromBoolean(false), "testWithBoolean"));
        }

        @Test
        @DisplayName("integers are converted correctly")
        public void testWithIntegers() {
            Assertions.assertTrue(Utils.toBoolean(JexValue.fromInteger(42), "testWithIntegers"));
            Assertions.assertTrue(Utils.toBoolean(JexValue.fromInteger(-1), "testWithIntegers"));
            Assertions.assertFalse(Utils.toBoolean(JexValue.fromInteger(0), "testWithIntegers"));
        }

        @Test
        @DisplayName("double values are converted correctly")
        public void testWithDoubles() {
            Assertions.assertTrue(Utils.toBoolean(JexValue.fromDouble(3.14), "testWithDoubles"));
            Assertions.assertTrue(Utils.toBoolean(JexValue.fromDouble(-0.001), "testWithDoubles"));
            Assertions.assertFalse(Utils.toBoolean(JexValue.fromDouble(0.0), "testWithDoubles"));
            Assertions.assertFalse(Utils.toBoolean(JexValue.fromDouble(Double.NaN), "testWithDoubles"));
        }

        @Test
        @DisplayName("numbers are converted correctly")
        public void testWithNumbers() {
            Assertions.assertTrue(Utils.toBoolean(JexValue.fromNumber(42), "testWithNumbers"));
            Assertions.assertTrue(Utils.toBoolean(JexValue.fromNumber(-1), "testWithNumbers"));
            Assertions.assertFalse(Utils.toBoolean(JexValue.fromNumber(0), "testWithNumbers"));
            Assertions.assertTrue(Utils.toBoolean(JexValue.fromNumber(3.14), "testWithDoubles"));
            Assertions.assertTrue(Utils.toBoolean(JexValue.fromNumber(-0.001), "testWithDoubles"));
            Assertions.assertFalse(Utils.toBoolean(JexValue.fromNumber(0.0), "testWithDoubles"));
            Assertions.assertFalse(Utils.toBoolean(JexValue.fromNumber(Double.NaN), "testWithNumbers"));
        }

        @Test
        @DisplayName("strings are converted correctly")
        public void testWithStrings() {
            Assertions.assertTrue(Utils.toBoolean(JexValue.fromString("hello"), "testWithStrings"));
            Assertions.assertFalse(Utils.toBoolean(JexValue.fromString(""), "testWithStrings"));
        }

        @Test
        @DisplayName("arrays are converted correctly")
        public void testWithArrays() {
            Assertions.assertTrue(Utils.toBoolean(JexValue.fromArray(List.of(JexValue.fromNumber(1))), "testWithArrays"));
            Assertions.assertFalse(Utils.toBoolean(JexValue.fromArray(List.of()), "testWithArrays"));
        }

        @Test
        @DisplayName("objects are converted correctly")
        public void testWithObjects() {
            Assertions.assertTrue(Utils.toBoolean(JexValue.fromObject(Map.of("key", JexValue.fromString("value"))), "testWithObjects"));
            Assertions.assertFalse(Utils.toBoolean(JexValue.fromObject(Map.of()), "testWithObjects"));
        }
    }

    @Nested
    @DisplayName("toNumber")
    class toNumber {

        @Test
        @DisplayName("null is converted to 0")
        public void testWithNull() {
            Assertions.assertEquals(0, Utils.toNumber(JexValue.fromNull(), "testWithNull"));
        }

        @Test
        @DisplayName("boolean values are converted correctly")
        public void testWithBoolean() {
            Assertions.assertEquals(1, Utils.toNumber(JexValue.fromBoolean(true), "testWithBoolean"));
            Assertions.assertEquals(0, Utils.toNumber(JexValue.fromBoolean(false), "testWithBoolean"));
        }

        @Test
        @DisplayName("integers are converted correctly")
        public void testWithIntegers() {
            Assertions.assertEquals(42, Utils.toNumber(JexValue.fromInteger(42), "testWithIntegers"));
            Assertions.assertEquals(-1, Utils.toNumber(JexValue.fromInteger(-1), "testWithIntegers"));
            Assertions.assertEquals(0, Utils.toNumber(JexValue.fromInteger(0), "testWithIntegers"));
        }

        @Test
        @DisplayName("double values are converted correctly")
        public void testWithDoubles() {
            Assertions.assertEquals(3.14, Utils.toNumber(JexValue.fromDouble(3.14), "testWithDoubles"));
            Assertions.assertEquals(-0.001, Utils.toNumber(JexValue.fromDouble(-0.001), "testWithDoubles"));
            Assertions.assertEquals(0.0, Utils.toNumber(JexValue.fromDouble(0.0), "testWithDoubles"));
        }

        @Test
        @DisplayName("strings are converted correctly")
        public void testWithStrings() {
            Assertions.assertEquals(42.0, Utils.toNumber(JexValue.fromString("42"), "testWithStrings"));
            Assertions.assertEquals(-3.14, Utils.toNumber(JexValue.fromString("-3.14"), "testWithStrings"));
            Assertions.assertThrows(TypeMismatchError.class, () -> {
                Utils.toNumber(JexValue.fromString("notANumber"), "testWithStrings");
            });
        }

        @Test
        @DisplayName("unsupported types throw TypeMismatchError")
        public void testWithUnsupportedTypes() {
            Assertions.assertThrows(TypeMismatchError.class, () -> {
                Utils.toNumber(JexValue.fromArray(List.of(JexValue.fromNumber(1))), "testWithUnsupportedTypes");
            });
            Assertions.assertThrows(TypeMismatchError.class, () -> {
                Utils.toNumber(JexValue.fromObject(Map.of("key", JexValue.fromString("value"))), "testWithUnsupportedTypes");
            });
        }
    }

    @Nested
    @DisplayName("toDouble")
    class toDouble {

        @Test
        @DisplayName("null is converted to 0.0")
        public void testWithNull() {
            Assertions.assertEquals(0.0, Utils.toDouble(JexValue.fromNull(), "testWithNull"));
        }

        @Test
        @DisplayName("boolean values are converted correctly")
        public void testWithBoolean() {
            Assertions.assertEquals(1.0, Utils.toDouble(JexValue.fromBoolean(true), "testWithBoolean"));
            Assertions.assertEquals(0.0, Utils.toDouble(JexValue.fromBoolean(false), "testWithBoolean"));
        }

        @Test
        @DisplayName("integers are converted correctly")
        public void testWithIntegers() {
            Assertions.assertEquals(42.0, Utils.toDouble(JexValue.fromInteger(42), "testWithIntegers"));
            Assertions.assertEquals(-1.0, Utils.toDouble(JexValue.fromInteger(-1), "testWithIntegers"));
            Assertions.assertEquals(0.0, Utils.toDouble(JexValue.fromInteger(0), "testWithIntegers"));
        }

        @Test
        @DisplayName("double values are converted correctly")
        public void testWithDoubles() {
            Assertions.assertEquals(3.14, Utils.toDouble(JexValue.fromDouble(3.14), "testWithDoubles"));
            Assertions.assertEquals(-0.001, Utils.toDouble(JexValue.fromDouble(-0.001), "testWithDoubles"));
            Assertions.assertEquals(0.0, Utils.toDouble(JexValue.fromDouble(0.0), "testWithDoubles"));
        }

        @Test
        @DisplayName("strings are converted correctly")
        public void testWithStrings() {
            Assertions.assertEquals(42.0, Utils.toDouble(JexValue.fromString("42"), "testWithStrings"));
            Assertions.assertEquals(-3.14, Utils.toDouble(JexValue.fromString("-3.14"), "testWithStrings"));
            Assertions.assertThrows(TypeMismatchError.class, () -> {
                Utils.toDouble(JexValue.fromString("notANumber"), "testWithStrings");
            });
        }

        @Test
        @DisplayName("unsupported types throw TypeMismatchError")
        public void testWithUnsupportedTypes() {
            Assertions.assertThrows(TypeMismatchError.class, () -> {
                Utils.toDouble(JexValue.fromArray(List.of(JexValue.fromNumber(1))), "testWithUnsupportedTypes");
            });
            Assertions.assertThrows(TypeMismatchError.class, () -> {
                Utils.toDouble(JexValue.fromObject(Map.of("key", JexValue.fromString("value"))), "testWithUnsupportedTypes");
            });
        }
    }

    @Nested
    @DisplayName("toInteger")
    class toInteger {

        @Test
        @DisplayName("null is converted to 0")
        public void testWithNull() {
            Assertions.assertEquals(0, Utils.toInteger(JexValue.fromNull(), "testWithNull"));
        }

        @Test
        @DisplayName("boolean values are converted correctly")
        public void testWithBoolean() {
            Assertions.assertEquals(1, Utils.toInteger(JexValue.fromBoolean(true), "testWithBoolean"));
            Assertions.assertEquals(0, Utils.toInteger(JexValue.fromBoolean(false), "testWithBoolean"));
        }

        @Test
        @DisplayName("integers are converted correctly")
        public void testWithIntegers() {
            Assertions.assertEquals(42, Utils.toInteger(JexValue.fromInteger(42), "testWithIntegers"));
            Assertions.assertEquals(-1, Utils.toInteger(JexValue.fromInteger(-1), "testWithIntegers"));
            Assertions.assertEquals(0, Utils.toInteger(JexValue.fromInteger(0), "testWithIntegers"));
        }

        @Test
        @DisplayName("double values are converted correctly if they are whole numbers")
        public void testWithDoubles() {
            Assertions.assertEquals(3, Utils.toInteger(JexValue.fromDouble(3.0), "testWithDoubles"));
            Assertions.assertEquals(-1, Utils.toInteger(JexValue.fromDouble(-1.0), "testWithDoubles"));
            Assertions.assertEquals(0, Utils.toInteger(JexValue.fromDouble(0.0), "testWithDoubles"));
        }

        @Test
        @DisplayName("double values throw TypeMismatchError if they are not whole numbers")
        public void testWithNonWholeDoubles() {
            Assertions.assertThrows(TypeMismatchError.class, () -> {
                Utils.toInteger(JexValue.fromDouble(3.14), "testWithNonWholeDoubles");
            });
            Assertions.assertThrows(TypeMismatchError.class, () -> {
                Utils.toInteger(JexValue.fromDouble(-0.001), "testWithNonWholeDoubles");
            });
        }

        @Test
        @DisplayName("strings are converted correctly if they represent whole numbers")
        public void testWithStrings() {
            Assertions.assertEquals(42, Utils.toInteger(JexValue.fromString("42"), "testWithStrings"));
            Assertions.assertEquals(-1, Utils.toInteger(JexValue.fromString("-1"), "testWithStrings"));
        }

        @Test
        @DisplayName("strings throw TypeMismatchError if they do not represent whole numbers")
        public void testWithNonWholeStrings() {
            Assertions.assertThrows(TypeMismatchError.class, () -> {
                Utils.toInteger(JexValue.fromString("3.14"), "testWithNonWholeStrings");
            });
            Assertions.assertThrows(TypeMismatchError.class, () -> {
                Utils.toInteger(JexValue.fromString("notANumber"), "testWithNonWholeStrings");
            });
        }

        @Test
        @DisplayName("unsupported types throw TypeMismatchError")
        public void testWithUnsupportedTypes() {
            Assertions.assertThrows(TypeMismatchError.class, () -> {
                Utils.toInteger(JexValue.fromArray(List.of(JexValue.fromNumber(1))), "testWithUnsupportedTypes");
            });
            Assertions.assertThrows(TypeMismatchError.class, () -> {
                Utils.toInteger(JexValue.fromObject(Map.of("key", JexValue.fromString("value"))), "testWithUnsupportedTypes");
            });
        }
    }

    @Nested
    @DisplayName("toString")
    class toString {

        @Test
        @DisplayName("null is converted to 'null'")
        public void testWithNull() {
            Assertions.assertEquals("null", Utils.toString(JexValue.fromNull(), "testWithNull"));
        }

        @Test
        @DisplayName("boolean values are converted correctly")
        public void testWithBoolean() {
            Assertions.assertEquals("true", Utils.toString(JexValue.fromBoolean(true), "testWithBoolean"));
            Assertions.assertEquals("false", Utils.toString(JexValue.fromBoolean(false), "testWithBoolean"));
        }

        @Test
        @DisplayName("integers are converted correctly")
        public void testWithIntegers() {
            Assertions.assertEquals("42", Utils.toString(JexValue.fromInteger(42), "testWithIntegers"));
            Assertions.assertEquals("-1", Utils.toString(JexValue.fromInteger(-1), "testWithIntegers"));
        }

        @Test
        @DisplayName("double values are converted correctly")
        public void testWithDoubles() {
            Assertions.assertEquals("3.14", Utils.toString(JexValue.fromDouble(3.14), "testWithDoubles"));
            Assertions.assertEquals("-0.001", Utils.toString(JexValue.fromDouble(-0.001), "testWithDoubles"));
        }

        @Test
        @DisplayName("numbers are converted correctly")
        public void testWithNumbers() {
            Assertions.assertEquals("42", Utils.toString(JexValue.fromNumber(42), "testWithNumbers"));
            Assertions.assertEquals("-1", Utils.toString(JexValue.fromNumber(-1), "testWithNumbers"));
            Assertions.assertEquals("0", Utils.toString(JexValue.fromNumber(0), "testWithNumbers"));
            Assertions.assertEquals("2.0", Utils.toString(JexValue.fromNumber(2.0), "testWithNumbers"));
            Assertions.assertEquals("3.14", Utils.toString(JexValue.fromNumber(3.14), "testWithNumbers"));
        }

        @Test
        @DisplayName("strings are converted correctly")
        public void testWithStrings() {
            Assertions.assertEquals("hello", Utils.toString(JexValue.fromString("hello"), "testWithStrings"));
            Assertions.assertEquals("", Utils.toString(JexValue.fromString(""), "testWithStrings"));
        }

        @Test
        @DisplayName("arrays are converted correctly")
        public void testWithArrays() {
            Assertions.assertEquals("[1, 2, 3]", Utils.toString(JexValue.fromArray(List.of(
                JexValue.fromInteger(1),
                JexValue.fromInteger(2),
                JexValue.fromInteger(3)
            )), "testWithArrays"));
            Assertions.assertEquals("[]", Utils.toString(JexValue.fromArray(List.of()), "testWithArrays"));
        }

        @Test
        @DisplayName("objects are converted correctly")
        public void testWithObjects() {

            String actual = Utils.toString(JexValue.fromObject(Map.of(
                    "key1", "value1",
                    "key2", 42
            )), "testWithObjects");

            Assertions.assertEquals("{\"key1\": \"value1\", \"key2\": \"42\"}", actual);

            Assertions.assertEquals("{}", Utils.toString(JexValue.fromObject(Map.of()), "testWithObjects"));
        }
    }

    @Nested
    @DisplayName("isEqual")
    class isEqual {

        @Test
        @DisplayName("null values are equal")
        public void testWithNull() {
            Assertions.assertTrue(Utils.isEqual(JexValue.fromNull(), JexValue.fromNull()));
            Assertions.assertFalse(Utils.isEqual(JexValue.fromNull(), JexValue.fromBoolean(true)));
            Assertions.assertFalse(Utils.isEqual(JexValue.fromBoolean(true), JexValue.fromNull()));
        }

        @Test
        @DisplayName("boolean values are compared correctly")
        public void testWithBoolean() {
            Assertions.assertTrue(Utils.isEqual(JexValue.fromBoolean(true), JexValue.fromBoolean(true)));
            Assertions.assertFalse(Utils.isEqual(JexValue.fromBoolean(true), JexValue.fromBoolean(false)));
        }

        @Test
        @DisplayName("numbers are compared correctly")
        public void testWithNumbers() {
            Assertions.assertTrue(Utils.isEqual(JexValue.fromNumber(42), JexValue.fromNumber(42.0)));
            Assertions.assertFalse(Utils.isEqual(JexValue.fromNumber(42), JexValue.fromNumber(43)));
        }

        @Test
        @DisplayName("strings are compared correctly")
        public void testWithStrings() {
            Assertions.assertTrue(Utils.isEqual(JexValue.fromString("hello"), JexValue.fromString("hello")));
            Assertions.assertFalse(Utils.isEqual(JexValue.fromString("hello"), JexValue.fromString("world")));
        }

        @Test
        @DisplayName("arrays are compared by reference")
        public void testWithArrays() {
            var array = JexValue.fromArray(List.of(JexValue.fromNumber(1), JexValue.fromNumber(2)));
            Assertions.assertTrue(Utils.isEqual(array, array));
            Assertions.assertFalse(Utils.isEqual(array, JexValue.fromArray(List.of(JexValue.fromNumber(1), JexValue.fromNumber(2)))));
        }

        @Test
        @DisplayName("objects are compared by reference")
        public void testWithObjects() {
            var object = JexValue.fromObject(Map.of("key", JexValue.fromString("value")));
            Assertions.assertTrue(Utils.isEqual(object, object));
            Assertions.assertFalse(Utils.isEqual(object, JexValue.fromObject(Map.of("key", JexValue.fromString("value")))));
        }

        @Test
        @DisplayName("mixed types are compared correctly")
        public void testWithMixedTypes() {
            Assertions.assertFalse(Utils.isEqual(JexValue.fromNumber(42), JexValue.fromString("42")));
            Assertions.assertTrue(Utils.isEqual(JexValue.fromNumber(42), JexValue.fromInteger(42)));
        }
    }

    @Nested
    @DisplayName("isLessThan")
    class isLessThan {

        @Test
        @DisplayName("null values are compared correctly")
        public void testWithNull() {
            Assertions.assertFalse(Utils.isLessThan(JexValue.fromNull(), JexValue.fromNull(), false));
            Assertions.assertTrue(Utils.isLessThan(JexValue.fromNull(), JexValue.fromNumber(1), false));
            Assertions.assertFalse(Utils.isLessThan(JexValue.fromNumber(1), JexValue.fromNull(), false));
        }

        @Test
        @DisplayName("boolean values are compared correctly")
        public void testWithBoolean() {
            Assertions.assertTrue(Utils.isLessThan(JexValue.fromBoolean(false), JexValue.fromBoolean(true), false));
            Assertions.assertFalse(Utils.isLessThan(JexValue.fromBoolean(true), JexValue.fromBoolean(false), false));
            Assertions.assertTrue(Utils.isLessThan(JexValue.fromBoolean(false), JexValue.fromBoolean(true), true));
        }

        @Test
        @DisplayName("numbers are compared correctly")
        public void testWithNumbers() {
            Assertions.assertTrue(Utils.isLessThan(JexValue.fromNumber(1), JexValue.fromNumber(2), false));
            Assertions.assertFalse(Utils.isLessThan(JexValue.fromNumber(2), JexValue.fromNumber(1), false));
            Assertions.assertTrue(Utils.isLessThan(JexValue.fromNumber(1), JexValue.fromNumber(1), true));
        }

        @Test
        @DisplayName("strings are compared correctly")
        public void testWithStrings() {
            Assertions.assertTrue(Utils.isLessThan(JexValue.fromString("apple"), JexValue.fromString("banana"), false));
            Assertions.assertFalse(Utils.isLessThan(JexValue.fromString("banana"), JexValue.fromString("apple"), false));
            Assertions.assertTrue(Utils.isLessThan(JexValue.fromString("apple"), JexValue.fromString("apple"), true));
        }

        @Test
        @DisplayName("mixed types are compared correctly")
        public void testWithMixedTypes() {
            Assertions.assertTrue(Utils.isLessThan(JexValue.fromNumber(1), JexValue.fromString("2"), false));
            Assertions.assertFalse(Utils.isLessThan(JexValue.fromString("2"), JexValue.fromNumber(1), false));
            Assertions.assertFalse(Utils.isLessThan(JexValue.fromBoolean(true), JexValue.fromNumber(0), false));
        }
    }

    @Nested
    @DisplayName("isGreaterThan")
    class isGreaterThan {

        @Test
        @DisplayName("null values are compared correctly")
        public void testWithNull() {
            Assertions.assertFalse(Utils.isGreaterThan(JexValue.fromNull(), JexValue.fromNull(), false));
            Assertions.assertFalse(Utils.isGreaterThan(JexValue.fromNull(), JexValue.fromNumber(1), false));
            Assertions.assertTrue(Utils.isGreaterThan(JexValue.fromNumber(1), JexValue.fromNull(), false));
        }

        @Test
        @DisplayName("boolean values are compared correctly")
        public void testWithBoolean() {
            Assertions.assertFalse(Utils.isGreaterThan(JexValue.fromBoolean(false), JexValue.fromBoolean(true), false));
            Assertions.assertTrue(Utils.isGreaterThan(JexValue.fromBoolean(true), JexValue.fromBoolean(false), false));
            Assertions.assertTrue(Utils.isGreaterThan(JexValue.fromBoolean(true), JexValue.fromBoolean(false), true));
        }

        @Test
        @DisplayName("numbers are compared correctly")
        public void testWithNumbers() {
            Assertions.assertFalse(Utils.isGreaterThan(JexValue.fromNumber(1), JexValue.fromNumber(2), false));
            Assertions.assertTrue(Utils.isGreaterThan(JexValue.fromNumber(2), JexValue.fromNumber(1), false));
            Assertions.assertTrue(Utils.isGreaterThan(JexValue.fromNumber(1), JexValue.fromNumber(1), true));
        }

        @Test
        @DisplayName("strings are compared correctly")
        public void testWithStrings() {
            Assertions.assertFalse(Utils.isGreaterThan(JexValue.fromString("apple"), JexValue.fromString("banana"), false));
            Assertions.assertTrue(Utils.isGreaterThan(JexValue.fromString("banana"), JexValue.fromString("apple"), false));
            Assertions.assertTrue(Utils.isGreaterThan(JexValue.fromString("apple"), JexValue.fromString("apple"), true));
        }

        @Test
        @DisplayName("mixed types are compared correctly")
        public void testWithMixedTypes() {
            Assertions.assertFalse(Utils.isGreaterThan(JexValue.fromNumber(1), JexValue.fromString("2"), false));
            Assertions.assertTrue(Utils.isGreaterThan(JexValue.fromString("2"), JexValue.fromNumber(1), false));
            Assertions.assertTrue(Utils.isGreaterThan(JexValue.fromBoolean(true), JexValue.fromNumber(0), false));
        }
    }

    @Nested
    class createGlobalScope {
        @Test
        @DisplayName("global scope contains mathematical constants")
        public void testGlobalScopeConstants() {
            var globalScope = Utils.createGlobalScope();
            Assertions.assertEquals(FastMath.PI, globalScope.getVariable("PI").asNumber("global"));
            Assertions.assertEquals(FastMath.E, globalScope.getVariable("E").asNumber("global"));
            Assertions.assertEquals(globalScope.getVariable("LN2").asNumber("global"), FastMath.log(2));
            Assertions.assertEquals(globalScope.getVariable("LN10").asNumber("global"), FastMath.log(10));
            Assertions.assertEquals(globalScope.getVariable("LOG2E").asNumber("global"), 1 / FastMath.log(2));
            Assertions.assertEquals(globalScope.getVariable("LOG10E").asNumber("global"), 1 / FastMath.log(10));
            Assertions.assertEquals(globalScope.getVariable("SQRT1_2").asNumber("global"), FastMath.sqrt(0.5));
            Assertions.assertEquals(globalScope.getVariable("SQRT2").asNumber("global"), FastMath.sqrt(2));
            Assertions.assertTrue(globalScope.getVariable("NON_EXISTENT").isNull());
            Assertions.assertEquals(Version.VERSION, globalScope.getVariable("VERSION").asString("global"));
            Assertions.assertEquals("java", globalScope.getVariable("__CLIENT_LANGUAGE").asString("global"));
        }
    }

}

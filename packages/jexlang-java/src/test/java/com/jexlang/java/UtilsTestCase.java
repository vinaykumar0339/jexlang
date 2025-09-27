package com.jexlang.java;

import com.jexlang.java.types.JexValue;
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

}

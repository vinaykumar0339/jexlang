package com.jexlang.java;

import com.jexlang.java.eval.errors.TypeMismatchError;
import com.jexlang.java.types.*;

public class Utils {

    public static String getJexValueType(JexValue value) {
        if (value == null) return "null";
        return value.getType();
    }

    public static Number toNumber(JexValue value, String ctx) {
        if (value instanceof JexNumber) {
            return ((JexNumber) value).asNumber(ctx);
        }
        if (value instanceof JexBoolean) {
            return ((JexBoolean) value).asBoolean(ctx) ? 1 : 0;
        }
        if (value instanceof JexString) {
            try {
                Number num = Double.parseDouble(((JexString) value).asString(ctx));
                if (!Double.isNaN(num.doubleValue())) {
                    return num;
                }
            } finally {
                // Ignore any exceptions and return null
            }
        }
        throw new TypeMismatchError("number conversion", "number", getJexValueType(value));
    }

    public static String toString(JexValue value, String ctx) {
        if (value instanceof JexNull) {
            return "null";
        }
        if (value instanceof JexString) {
            return ((JexString) value).asString(ctx);
        }
        if (value instanceof JexNumber) {
            return String.valueOf(((JexNumber) value).asNumber(ctx));
        }
        if (value instanceof JexBoolean) {
            return ((JexBoolean) value).asBoolean(ctx) ? "true" : "false";
        }
        if (value instanceof JexArray) {
            return "[" +
                String.join(", ", ((JexArray) value).asArray(ctx).stream()
                    .map(v -> toString(v, ctx))
                    .toList()) + "]";
        }
        if (value instanceof JexObject) {
            return "{" +
                ((JexObject) value).asObject(ctx).entrySet().stream()
                    .map(entry -> "\"" + entry.getKey() + "\": " + toString(entry.getValue(), ctx))
                    .collect(java.util.stream.Collectors.joining(", ")) + "}";
        }
        return value.asString(ctx);
    }
}

package com.jexlang.java;

import com.jexlang.java.eval.errors.JexLangRuntimeError;
import com.jexlang.java.eval.errors.TypeMismatchError;
import com.jexlang.java.functions.FuncImpl;
import com.jexlang.java.types.*;

public class Utils {

    /* ========= Helpers: adapters for arities ========= */

    public interface Unary { double apply(double x); }
    public interface Binary { double apply(double a, double b); }
    public interface Ternary { double apply(double a, double b, double c); }

    public static JexValue num(double v) { return Values.num(v); }
    public static JexValue str(String s) { return Values.str(s); }
    public static JexValue bool(boolean b) { return Values.bool(b); }

    public static JexValue nil() { return Values.nil(); }

    public static JexValue arr(java.util.List<JexValue> vs) { return Values.arr(vs); }

    public static JexValue obj(java.util.Map<String, JexValue> m) { return Values.obj(m); }

    public static void assertFinite(String name, double x) {
        if (!Double.isFinite(x)) throw new JexLangRuntimeError(name + " produced non-finite result");
    }

    public static FuncImpl n1(Unary f, String ctxName) {
        return (args) -> {
            double x = toNumber(args.length > 0 ? args[0] : JexValue.from(0), ctxName).doubleValue();
            double v = f.apply(x);
            assertFinite(ctxName, v);
            return num(v);
        };
    }

    public static FuncImpl n2(Binary f, String aCtx, String bCtx) {
        return (args) -> {
            double a = toNumber(args.length > 0 ? args[0] : JexValue.from(0), aCtx).doubleValue();
            double b = toNumber(args.length > 0 ? args[0] : JexValue.from(0), bCtx).doubleValue();
            double v = f.apply(a, b);
            assertFinite("binary", v);
            return num(v);
        };
    }

    public static FuncImpl n3(Ternary f, String aCtx, String bCtx, String cCtx) {
        return (args) -> {
            double a = toNumber(args.length > 0 ? args[0] : JexValue.from(0), aCtx).doubleValue();
            double b = toNumber(args.length > 0 ? args[0] : JexValue.from(0), bCtx).doubleValue();
            double c = toNumber(args.length > 0 ? args[0] : JexValue.from(0), cCtx).doubleValue();
            double v = f.apply(a, b, c);
            assertFinite("ternary", v);
            return num(v);
        };
    }

    public static void checkTrigDomain(String name, double x) {
        if ("asin".equals(name) || "acos".equals(name)) {
            if (x < -1.0 || x > 1.0) throw new RuntimeException(name + " domain error: expected x in [-1, 1], got " + x);
        }
    }

    public static void checkPositive(String name, double x, boolean allowZero) {
        if (allowZero ? x < 0.0 : x <= 0.0) {
            throw new RuntimeException(name + " domain error: expected " + (allowZero ? "x >= 0" : "x > 0") + ", got " + x);
        }
    }

    public static String getJexValueType(JexValue value) {
        if (value == null) return "null";
        return value.getType();
    }

    public static boolean toBoolean(JexValue v, String ctx) {
        if (v instanceof JexNull) return false;
        if (v instanceof JexBoolean) return v.asBoolean(ctx);
        if (v instanceof JexNumber) {
            double d = v.asNumber(ctx).doubleValue();
            return d != 0.0 && !Double.isNaN(d);
        }
        if (v instanceof JexString) return !v.asString(ctx).isEmpty();
        if (v instanceof JexArray) return !v.asArray(ctx).isEmpty();
        if (v instanceof JexObject) return !v.asObject(ctx).isEmpty();
        return v != null;
    }

    public static Number toNumber(JexValue value, String ctx) {
        if (value instanceof JexNull) {
            return 0;
        }
        if (value instanceof JexNumber) {
            return value.asNumber(ctx);
        }
        if (value instanceof JexBoolean) {
            return value.asBoolean(ctx) ? 1 : 0;
        }
        if (value instanceof JexString) {
            try {
                Number num = Double.parseDouble(value.asString(ctx));
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
            return value.asString(ctx);
        }
        if (value instanceof JexNumber) {
            return String.valueOf(value.asNumber(ctx));
        }
        if (value instanceof JexBoolean) {
            return value.asBoolean(ctx) ? "true" : "false";
        }
        if (value instanceof JexArray) {
            return "[" +
                String.join(", ", value.asArray(ctx).stream()
                    .map(v -> toString(v, ctx))
                    .toList()) + "]";
        }
        if (value instanceof JexObject) {
            return "{" +
                value.asObject(ctx).entrySet().stream()
                    .map(entry -> "\"" + entry.getKey() + "\": " + toString(entry.getValue(), ctx))
                    .collect(java.util.stream.Collectors.joining(", ")) + "}";
        }
        return value.asString(ctx);
    }
}

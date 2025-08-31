package com.jexlang.java;

import com.jexlang.java.eval.errors.JexLangRuntimeError;
import com.jexlang.java.eval.errors.TypeMismatchError;
import com.jexlang.java.functions.FuncImpl;
import com.jexlang.java.scopes.Scope;
import com.jexlang.java.types.*;
import org.apache.commons.math3.util.FastMath;

import java.util.Objects;

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

    public static boolean isEqual(JexValue value1, JexValue value2) {
        if (value1 == null && value2 == null) return true;
        if (value1 == null || value2 == null) return false;

        if (value1.isNull() && value2.isNull()) {
            return true;
        } else if (value1.isBoolean() && value2.isBoolean()) {
            return  value1.asBoolean("equality") == value2.asBoolean("equality");
        } else if (value1.isNumber() && value2.isNumber()) {
            return Double.compare(value1.asNumber("equality").doubleValue(), value2.asNumber("equality").doubleValue()) == 0;
        } else if (value1.isString() && value2.isString()) {
            return value1.asString("equality").equals(value2.asString("equality"));
        } else if (value1.isArray() && value2.isArray()) {
            return value1 == value2; // Check for reference type equality for arrays
        } else if (value1.isObject() && value2.isObject()) {
            return value1 == value2; // Check for reference type equality for objects
        } else if (value1.isNumber() || value2.isNumber()) {
            try {
                return toNumber(value1, "equality").equals(toNumber(value2, "equality"));
            } catch (Exception e) {
                return false;
            }
        }

        return false;
    }

    public static boolean isLessThan(JexValue value1, JexValue value2, boolean alsoEqual) {
        if (value1 == null) {
            value1 = new JexNumber(0);
        }

        if (value2 == null) {
            value2 = new JexNumber(0);
        }

        boolean isLess;
        if (!Objects.equals(value1.getType(), value2.getType())) {
            // check any one is number then try to convert other to number and then compare
            if (value1.isNumber() || value2.isNumber()) {
                try {
                    Number num1 = toNumber(value1, "comparison");
                    Number num2 = toNumber(value2, "comparison");
                    if (alsoEqual) {
                        isLess = Double.compare(num1.doubleValue(), num2.doubleValue()) <= 0;
                    } else {
                        isLess = Double.compare(num1.doubleValue(), num2.doubleValue()) < 0;
                    }
                } catch (Exception e) {
                    isLess = false;
                }
            } else {
                isLess = false;
            }
        } else {
            if (value1.isNumber() && value2.isNumber()) {
                if (alsoEqual) {
                    isLess = Double.compare(value1.asNumber("comparison").doubleValue(), value2.asNumber("comparison").doubleValue()) <= 0;
                } else {
                    isLess = Double.compare(value1.asNumber("comparison").doubleValue(), value2.asNumber("comparison").doubleValue()) < 0;
                }
            } else if (value1.isString() && value2.isString()) {
                if (alsoEqual) {
                    isLess = value1.asString("comparison").compareTo(value2.asString("comparison")) <= 0;
                } else {
                    isLess = value1.asString("comparison").compareTo(value2.asString("comparison")) < 0;
                }
            } else if (value1.isBoolean() && value2.isBoolean()) {
                if (alsoEqual) {
                    isLess = Boolean.compare(value1.asBoolean("comparison"), value2.asBoolean("comparison")) <= 0;
                } else {
                    isLess = Boolean.compare(value1.asBoolean("comparison"), value2.asBoolean("comparison")) < 0;
                }
            } else {
                isLess = false;
            }
        }

        return isLess;
    }

    public static boolean isGreaterThan(JexValue value1, JexValue value2, boolean alsoEqual) {
        if (value1 == null) {
            value1 = new JexNumber(0);
        }

        if (value2 == null) {
            value2 = new JexNumber(0);
        }

        boolean isGreater;
        if (!Objects.equals(value1.getType(), value2.getType())) {
            // check any one is number then try to convert other to number and then compare
            if (value1.isNumber() || value2.isNumber()) {
                try {
                    Number num1 = toNumber(value1, "comparison");
                    Number num2 = toNumber(value2, "comparison");
                    if (alsoEqual) {
                        isGreater = Double.compare(num1.doubleValue(), num2.doubleValue()) >= 0;
                    } else {
                        isGreater = Double.compare(num1.doubleValue(), num2.doubleValue()) > 0;
                    }
                } catch (Exception e) {
                    isGreater = false;
                }
            } else {
                isGreater = false;
            }
        } else {
            if (value1.isNumber() && value2.isNumber()) {
                if (alsoEqual) {
                    isGreater = Double.compare(value1.asNumber("comparison").doubleValue(), value2.asNumber("comparison").doubleValue()) >= 0;
                } else {
                    isGreater = Double.compare(value1.asNumber("comparison").doubleValue(), value2.asNumber("comparison").doubleValue()) > 0;
                }
            } else if (value1.isString() && value2.isString()) {
                if (alsoEqual) {
                    isGreater = value1.asString("comparison").compareTo(value2.asString("comparison")) >= 0;
                } else {
                    isGreater = value1.asString("comparison").compareTo(value2.asString("comparison")) > 0;
                }
            } else if (value1.isBoolean() && value2.isBoolean()) {
                if (alsoEqual) {
                    isGreater = Boolean.compare(value1.asBoolean("comparison"), value2.asBoolean("comparison")) >= 0;
                } else {
                    isGreater = Boolean.compare(value1.asBoolean("comparison"), value2.asBoolean("comparison")) > 0;
                }
            } else {
                isGreater = false;
            }
        }

        return isGreater;
    }

    public static Scope createGlobalScope() {
        Scope scope = new Scope(null, Scope.ScopeType.GLOBAL);
        // Add built-in functions and variables to the global scope

        scope.declareVariable("PI", new JexNumber(FastMath.PI), true);
        scope.declareVariable("E", new JexNumber(FastMath.E), true);
        scope.declareVariable("LN2", new JexNumber(FastMath.log(2)), true);
        scope.declareVariable("LN10", new JexNumber(FastMath.log(10)), true);
        scope.declareVariable("LOG2E", new JexNumber(1 / FastMath.log(2)), true);
        scope.declareVariable("LOG10E", new JexNumber(1 / FastMath.log(10)), true);
        scope.declareVariable("SQRT1_2", new JexNumber(FastMath.sqrt(0.5)), true);
        scope.declareVariable("SQRT2", new JexNumber(FastMath.sqrt(2)), true);
        return scope;
    }
}

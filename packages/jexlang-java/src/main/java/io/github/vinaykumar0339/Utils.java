package io.github.vinaykumar0339;

import io.github.vinaykumar0339.eval.errors.JexLangRuntimeError;
import io.github.vinaykumar0339.eval.errors.TypeMismatchError;
import io.github.vinaykumar0339.functions.FuncImpl;
import io.github.vinaykumar0339.scopes.Scope;
import io.github.vinaykumar0339.types.*;
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
        return (ctx, args) -> {
            double x = toNumber(args.length > 0 ? args[0] : JexValue.from(0), ctxName).doubleValue();
            double v = f.apply(x);
            return num(v);
        };
    }

    public static FuncImpl n2(Binary f, String aCtx, String bCtx) {
        return (ctx, args) -> {
            double a = toNumber(args.length > 0 ? args[0] : JexValue.from(0), aCtx).doubleValue();
            double b = toNumber(args.length > 1 ? args[1] : JexValue.from(0), bCtx).doubleValue();
            double v = f.apply(a, b);
            return num(v);
        };
    }

    public static FuncImpl n3(Ternary f, String aCtx, String bCtx, String cCtx) {
        return (ctx, args) -> {
            double a = toNumber(args.length > 0 ? args[0] : JexValue.from(0), aCtx).doubleValue();
            double b = toNumber(args.length > 1 ? args[1] : JexValue.from(0), bCtx).doubleValue();
            double c = toNumber(args.length > 2 ? args[2] : JexValue.from(0), cCtx).doubleValue();
            double v = f.apply(a, b, c);
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

    // Swift Library have throw syntax. so please use optional try in swift code.
    public static boolean toBoolean(JexValue v, String ctx) {
        if (v instanceof JexNull) return false;
        if (v instanceof JexBoolean) return v.asBoolean(ctx);
        if (v instanceof JexInteger) return v.asInteger(ctx) != 0 || (v.asInteger(ctx) == 1 && v.asInteger(ctx) != -1); // JS Compatible
        if (v instanceof JexDouble) {
            double d = v.asDouble(ctx);
            return ((d != 0.0 && !Double.isNaN(d)) || (d == 1.0)) && d != -1.0; // JS Compatible
        }
        if (v instanceof JexNumber) {
            double d = v.asNumber(ctx).doubleValue();
            return ((d != 0.0 && !Double.isNaN(d)) || d == 1.0) && d != -1.0; // JS Compatible
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
        if (value instanceof JexInteger) {
            return value.asInteger(ctx);
        }
        if (value instanceof JexDouble) {
            return value.asDouble(ctx);
        }
        if (value instanceof JexString) {
            try {
                Number num = Double.parseDouble(value.asString(ctx));
                if (!Double.isNaN(num.doubleValue())) {
                    return num;
                }
            } catch (Exception e) {
                // Ignore any exceptions and fall through to type mismatch error
            }
        }
        throw new TypeMismatchError("number conversion", "number", getJexValueType(value));
    }

    public static Double toDouble(JexValue value, String ctx) {
        Number num = toNumber(value, ctx);
        if (num instanceof Double || num instanceof Float) {
            return num.doubleValue();
        } else {
            return num.longValue() * 1.0;
        }
    }

    public static Integer toInteger(JexValue value, String ctx) {
        Number num = toNumber(value, ctx);
        if (num instanceof Double || num instanceof Float) {
            double d = num.doubleValue();
            if (d % 1 != 0) {
                throw new TypeMismatchError("integer conversion", "integer", "non-integer number");
            }
            return (int) d;
        } else {
            return num.intValue();
        }
    }

    // Swift Library have throw syntax. so please use optional try in swift code.
    public static String toString(JexValue value, String ctx) {
        if (value instanceof JexNull) {
            return "null";
        }
        if (value instanceof JexString) {
            return value.asString(ctx);
        }
        if (value instanceof JexInteger) {
            return String.valueOf(value.asInteger(ctx));
        }
        if (value instanceof JexDouble) {
            return String.valueOf(value.asDouble(ctx));
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
            StringBuilder jsonBuilder = new StringBuilder("{");
            var entries = value.asObject(ctx).entrySet();
            for (var iterator = entries.iterator(); iterator.hasNext(); ) {
                var entry = iterator.next();
                jsonBuilder.append("\"").append(entry.getKey()).append("\": ")
                        .append("\"").append(toString(entry.getValue(), ctx)).append("\"");
                if (iterator.hasNext()) {
                    jsonBuilder.append(", ");
                }
            }
            jsonBuilder.append("}");
            return jsonBuilder.toString();
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
        scope.declareVariable("VERSION", new JexString(Version.VERSION), true);
        scope.declareVariable("__CLIENT_LANGUAGE", new JexString("java"), true);
        return scope;
    }

    public static boolean jsEqual(JexValue a, JexValue b) {
        // 1. If both are null → true
        if (a.isNull() && b.isNull()) return true;

        // 2. null == undefined behavior (you can choose if you support undefined)
        // For now: null is only equal to null in JexLang.
        if (a.isNull() || b.isNull()) return false;

        // 3. If types match → direct compare
        if (a.isString() && b.isString()) {
            return a.asString("==").equals(b.asString("=="));
        }
        if (a.isBoolean() && b.isBoolean()) {
            return a.asBoolean("==") == b.asBoolean("==");
        }
        if (a.isNumber() && b.isNumber()) {
            double da = a.asNumber("==").doubleValue();
            double db = b.asNumber("==").doubleValue();
            return Double.compare(da, db) == 0;
        }
        if (a.isInteger() && b.isInteger()) {
            return a.asInteger("==").equals(b.asInteger("=="));
        }
        if (a.isDouble() && b.isDouble()) {
            return Double.compare(a.asDouble("=="), b.asDouble("==")) == 0;
        }
        if (a.isNumber() && b.isInteger()) {
            double da = a.asNumber("==").doubleValue();
            double db = b.asInteger("==").doubleValue();
            return Double.compare(da, db) == 0;
        }
        if (a.isInteger() && b.isNumber()) {
            double da = a.asInteger("==").doubleValue();
            double db = b.asNumber("==").doubleValue();
            return Double.compare(da, db) == 0;
        }
        if (a.isNumber() && b.isDouble()) {
            double da = a.asNumber("==").doubleValue();
            double db = b.asDouble("==");
            return Double.compare(da, db) == 0;
        }
        if (a.isDouble() && b.isNumber()) {
            double da = a.asDouble("==");
            double db = b.asNumber("==").doubleValue();
            return Double.compare(da, db) == 0;
        }
        if (a.isInteger() && b.isDouble()) {
            double da = a.asInteger("==").doubleValue();
            double db = b.asDouble("==");
            return Double.compare(da, db) == 0;
        }
        if (a.isDouble() && b.isInteger()) {
            double da = a.asDouble("==");
            double db = b.asInteger("==").doubleValue();
            return Double.compare(da, db) == 0;
        }

        // 4. boolean → number conversion
        if (a.isBoolean()) {
            return jsEqual(JexValue.fromNumber(a.asBoolean("==") ? 1 : 0), b);
        }
        if (b.isBoolean()) {
            return jsEqual(a, JexValue.fromNumber(b.asBoolean("==") ? 1 : 0));
        }

        // 5. string ↔ number conversion
        if (a.isString() && b.isNumber()) {
            try {
                double num = Double.parseDouble(a.asString("=="));
                return jsEqual(JexValue.fromNumber(num), b);
            } catch (NumberFormatException e) {
                return false;
            }
        }
        if (a.isNumber() && b.isString()) {
            try {
                double num = Double.parseDouble(b.asString("=="));
                return jsEqual(a, JexValue.fromNumber(num));
            } catch (NumberFormatException e) {
                return false;
            }
        }
        if (a.isString() && b.isInteger()) {
            try {
                int num = Integer.parseInt(a.asString("=="));
                return jsEqual(JexValue.fromInteger(num), b);
            } catch (NumberFormatException e) {
                return false;
            }
        }
        if (a.isInteger() && b.isString()) {
            try {
                int num = Integer.parseInt(b.asString("=="));
                return jsEqual(a, JexValue.fromInteger(num));
            } catch (NumberFormatException e) {
                return false;
            }
        }
        if (a.isString() && b.isDouble()) {
            try {
                double num = Double.parseDouble(a.asString("=="));
                return jsEqual(JexValue.fromDouble(num), b);
            } catch (NumberFormatException e) {
                return false;
            }
        }
        if (a.isDouble() && b.isString()) {
            try {
                double num = Double.parseDouble(b.asString("=="));
                return jsEqual(a, JexValue.fromDouble(num));
            } catch (NumberFormatException e) {
                return false;
            }
        }

        // 6. object → primitive conversion (like JS ToPrimitive)
        if (a.isObject() && !b.isObject()) {
            return jsEqual(toPrimitive(a), b);
        }
        if (b.isObject() && !a.isObject()) {
            return jsEqual(a, toPrimitive(b));
        }

        // 7. object == object → reference equality
        if (a.isObject() && b.isObject()) {
            return a == b;
        }

        // fallback
        return false;
    }

    private static JexValue toPrimitive(JexValue value) {
        if (value.isString()
                || value.isNumber()
                || value.isBoolean()
                || value.isNull()
                || value.isInteger()
                || value.isDouble()
        ) {
            return value;
        }

        if (value.isArray()) {
            StringBuilder sb = new StringBuilder();
            var list = value.asArray("ToPrimitive");
            for (int i = 0; i < list.size(); i++) {
                if (i > 0) sb.append(",");
                sb.append(list.get(i).asString("ToPrimitive"));
            }
            return JexValue.fromString(sb.toString());
        }

        if (value.isObject()) {
            return JexValue.fromString("[object Object]");
        }

        return JexValue.fromString(value.toString());
    }

    public enum JSRelationalOp {
        LESS_THAN,
        GREATER_THAN,
        LESS_THAN_EQUAL,
        GREATER_THAN_EQUAL
    }

    private static double jsToNumberForRelOp(JexValue v) {
        if (v == null || v.isNull()) return 0;

        if (v.isBoolean()) {
            return v.asBoolean("relOp") ? 1 : 0;
        }

        if (v.isNumber()) {
            return v.asNumber("relOp").doubleValue();
        }

        if (v.isInteger()) {
            return v.asInteger("relOp").doubleValue();
        }

        if (v.isDouble()) {
            return v.asDouble("relOp");
        }

        if (v.isString()) {
            try {
                return Double.parseDouble(v.asString("relOp"));
            } catch (Exception e) {
                return Double.NaN; // JS: Number("abc") => NaN
            }
        }

        // arrays and objects already converted by ToPrimitive → fall through
        return Double.NaN;
    }

    public static boolean jsRelational(JexValue left, JexValue right, JSRelationalOp op) {
        // 1. JS ToPrimitive
        JexValue a = toPrimitive(left);
        JexValue b = toPrimitive(right);

        // 2. If both primitives are strings → lexicographical comparison
        if (a.isString() && b.isString()) {
            int cmp = a.asString("relOp").compareTo(b.asString("relOp"));

            return switch (op) {
                case LESS_THAN            -> cmp < 0;
                case GREATER_THAN         -> cmp > 0;
                case LESS_THAN_EQUAL      -> cmp <= 0;
                case GREATER_THAN_EQUAL   -> cmp >= 0;
            };
        }

        // 3. Otherwise → convert both to number
        double numA = jsToNumberForRelOp(a);
        double numB = jsToNumberForRelOp(b);

        // 4. If either is NaN → comparison returns false
        if (Double.isNaN(numA) || Double.isNaN(numB)) {
            return false;
        }

        // 5. Numeric comparison
        return switch (op) {
            case LESS_THAN            -> numA <  numB;
            case GREATER_THAN         -> numA >  numB;
            case LESS_THAN_EQUAL      -> numA <= numB;
            case GREATER_THAN_EQUAL   -> numA >= numB;
        };
    }


}

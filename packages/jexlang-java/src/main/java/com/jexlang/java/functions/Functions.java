package com.jexlang.java.functions;

import com.jexlang.java.Utils;
import com.jexlang.java.eval.errors.TypeMismatchError;
import com.jexlang.java.types.*;

import java.util.*;
import org.apache.commons.math3.util.FastMath;

public class Functions {

    private static double trunc(double x) {
        // Java 8 lacks Math.trunc; emulate:
        return x < 0 ? FastMath.ceil(x) : FastMath.floor(x);
    }

    public static Map<String, FuncImpl> makeBuiltins() {
        return Map.ofEntries(
                // Math functions that work with numbers
                Map.entry("abs", Utils.n1(FastMath::abs, "abs function")),
                Map.entry("ceil", Utils.n1(FastMath::ceil, "ceil function")),
                Map.entry("floor", Utils.n1(FastMath::floor, "floor function")),
                Map.entry("round", Utils.n1(x -> (double) FastMath.round(x), "round function")),
                Map.entry("trunc", Utils.n1(Functions::trunc, "trunc function")),

                // Trigonometry
                Map.entry("sin", Utils.n1(FastMath::sin, "sin function")),
                Map.entry("cos", Utils.n1(FastMath::cos, "cos function")),
                Map.entry("tan", Utils.n1(FastMath::tan, "tan function")),
                Map.entry("asin", Utils.n1(FastMath::asin, "asin")),
                Map.entry("acos", Utils.n1(FastMath::acos, "acos")),
                Map.entry("atan", Utils.n1(FastMath::atan, "atan function")),
                // Note TS signature: atan2(y, x)
                Map.entry("atan2", Utils.n2(FastMath::atan2, "atan2:y function", "atan2:x function")),

                // Exponential & logarithmic
                Map.entry("exp", Utils.n1(FastMath::exp, "exp function")),
                Map.entry("log", Utils.n1(x -> {
                    Utils.checkPositive("log", x, false);
                    return Math.log(x);
                }, "log")),
                Map.entry("log10", Utils.n1(x -> {
                    Utils.checkPositive("log10", x, false);
                    return Math.log10(x);
                }, "log10")),
                Map.entry("log2", Utils.n1(x -> {
                    Utils.checkPositive("log2", x, false);
                    return Math.log(x) / Math.log(2.0);
                }, "log2")),
                Map.entry("sqrt", Utils.n1(x -> {
                    Utils.checkPositive("sqrt", x, true);
                    return Math.sqrt(x);
                }, "sqrt")),
                Map.entry("cbrt", Utils.n1(FastMath::cbrt, "cbrt function")),

                // Hyperbolic
                Map.entry("sinh", Utils.n1(FastMath::sinh, "sinh function")),
                Map.entry("cosh", Utils.n1(FastMath::cosh, "cosh function")),
                Map.entry("tanh", Utils.n1(FastMath::tanh, "tanh function")),
                Map.entry("asinh", Utils.n1(FastMath::asinh, "asinh function")),
                Map.entry("acosh", Utils.n1(FastMath::acosh, "acosh function")),
                Map.entry("atanh", Utils.n1(FastMath::atanh, "atanh")),

                // Utilities (variadic or mixed)
                Map.entry("min", (args) -> {
                    if (args.length == 0) throw new RuntimeException("min requires at least one argument");
                    double best = Double.POSITIVE_INFINITY;
                    for (int i = 0; i < args.length; i++) {
                        double v = Utils.toNumber(args[i], "min arg " + (i + 1)).doubleValue();
                        if (v < best) best = v;
                    }
                    Utils.assertFinite("min", best);
                    return Utils.num(best);
                }),
                Map.entry("max", (args) -> {
                    if (args.length == 0) throw new RuntimeException("max requires at least one argument");
                    double best = Double.NEGATIVE_INFINITY;
                    for (int i = 0; i < args.length; i++) {
                        double v = Utils.toNumber(args[i], "max arg " + (i + 1)).doubleValue();
                        if (v > best) best = v;
                    }
                    Utils.assertFinite("max", best);
                    return Utils.num(best);
                }),
                Map.entry("pow", Utils.n2(FastMath::pow, "pow base function", "pow exponent function")),
                Map.entry("random", (args) -> Utils.num(Math.random())),
                Map.entry("sign", Utils.n1(FastMath::signum, "sign function")),

                // Custom math
                Map.entry("deg", Utils.n1(x -> x * 180.0 / Math.PI, "deg function")),
                Map.entry("rad", Utils.n1(x -> x * Math.PI / 180.0, "rad function")),
                Map.entry("clamp", Utils.n3((v, lo, hi) -> {
                    if (lo > hi)
                        throw new RuntimeException("clamp: min (" + lo + ") cannot be greater than max (" + hi + ")");
                    return Math.min(Math.max(v, lo), hi);
                }, "clamp value", "clamp min", "clamp max")),
                Map.entry("lerp", Utils.n3((a, b, t) -> a + (b - a) * t, "lerp a", "lerp b", "lerp t")),

                // Conversions
                Map.entry("number", Utils.n1(x -> x, "number function")), // wrapper ensures toNumber semantics
                Map.entry("string", (args) -> Utils.str(Utils.toString(args[0], "string function"))),
                Map.entry("boolean", (args) -> Utils.bool(Utils.toBoolean(args[0], "boolean function"))),
                Map.entry("int", Utils.n1(FastMath::floor, "int function")),
                Map.entry("float", Utils.n1(x -> (float) x, "float function")), // alias for number
                Map.entry("double", Utils.n1(x -> x, "double function")), // alias for number

                // String functions
                Map.entry("length", (args) -> {
                    JexValue x = args[0];
                    if (x instanceof JexString) return Utils.num(x.asString("length method").length());
                    if (x instanceof JexArray) return Utils.num(x.asArray("length method").size());
                    throw new TypeMismatchError("length", "string or array", Utils.getJexValueType(x));
                }),
                Map.entry("upper", (args) -> Utils.str(Utils.toString(args[0], "upper method").toUpperCase())),
                Map.entry("lower", (args) -> Utils.str(Utils.toString(args[0], "lower method").toLowerCase())),
                Map.entry("trim", (args) -> Utils.str(Utils.toString(args[0], "trim method").trim())),

                // Array functions
                Map.entry("array", (args) -> new JexArray(new ArrayList<>(List.of(args)))),
                Map.entry("first", (args) -> {
                    JexValue arr = args[0];
                    if (!(arr instanceof JexArray))
                        throw new TypeMismatchError("first", "array", Utils.getJexValueType(arr));
                    List<JexValue> vs = ((JexArray) arr).asArray("first method");
                    return vs.isEmpty() ? new JexNull() : vs.get(0);
                }),
                Map.entry("last", (args) -> {
                    JexValue arr = args[0];
                    if (!(arr instanceof JexArray))
                        throw new TypeMismatchError("last", "array", Utils.getJexValueType(arr));
                    List<JexValue> vs = ((JexArray) arr).asArray("last method");
                    return vs.isEmpty() ? new JexNull() : vs.get(vs.size() - 1);
                }),
                Map.entry("sum", (args) -> {
                    JexValue arr = args[0];
                    if (!(arr instanceof JexArray))
                        throw new TypeMismatchError("sum", "array", Utils.getJexValueType(arr));
                    List<JexValue> vs = ((JexArray) arr).asArray("sum method");
                    if (vs.isEmpty()) return Utils.num(0.0);
                    double s = 0.0;
                    for (int i = 0; i < vs.size(); i++) s += Utils.toNumber(vs.get(i), "sum[" + i + "]").doubleValue();
                    Utils.assertFinite("sum", s);
                    return Utils.num(s);
                }),
                Map.entry("avg", (args) -> {
                    JexValue arr = args[0];
                    if (!(arr instanceof JexArray))
                        throw new TypeMismatchError("avg", "array", Utils.getJexValueType(arr));
                    List<JexValue> vs = ((JexArray) arr).asArray("avg method");
                    if (vs.isEmpty()) return new JexNull();
                    double s = 0.0;
                    for (int i = 0; i < vs.size(); i++) s += Utils.toNumber(vs.get(i), "avg[" + i + "]").doubleValue();
                    double v = s / vs.size();
                    Utils.assertFinite("avg", v);
                    return Utils.num(v);
                }));
    }

    public static MapFuncRegistry createDefaultFuncRegistry() {
        return new MapFuncRegistry(makeBuiltins());
    }
}

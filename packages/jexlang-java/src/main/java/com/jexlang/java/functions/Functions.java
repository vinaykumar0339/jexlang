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
                Map.entry("abs", Utils.n1(FastMath::abs, "abs")),
                Map.entry("ceil", Utils.n1(FastMath::ceil, "ceil")),
                Map.entry("floor", Utils.n1(FastMath::floor, "floor")),
                Map.entry("round", Utils.n1(x -> (double) FastMath.round(x), "round")),
                Map.entry("trunc", Utils.n1(Functions::trunc, "trunc")),

                // Trigonometry
                Map.entry("sin", Utils.n1(FastMath::sin, "sin")),
                Map.entry("cos", Utils.n1(FastMath::cos, "cos")),
                Map.entry("tan", Utils.n1(FastMath::tan, "tan")),
                Map.entry("asin", Utils.n1(x -> {
                    Utils.checkTrigDomain("asin", x);
                    return FastMath.asin(x);
                }, "asin")),
                Map.entry("acos", Utils.n1(x -> {
                    Utils.checkTrigDomain("acos", x);
                    return FastMath.acos(x);
                }, "acos")),
                Map.entry("atan", Utils.n1(FastMath::atan, "atan")),
                // Note TS signature: atan2(y, x)
                Map.entry("atan2", Utils.n2(FastMath::atan2, "atan2:y", "atan2:x")),

                // Exponential & logarithmic
                Map.entry("exp", Utils.n1(FastMath::exp, "exp")),
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
                Map.entry("cbrt", Utils.n1(FastMath::cbrt, "cbrt")),

                // Hyperbolic
                Map.entry("sinh", Utils.n1(FastMath::sinh, "sinh")),
                Map.entry("cosh", Utils.n1(FastMath::cosh, "cosh")),
                Map.entry("tanh", Utils.n1(FastMath::tanh, "tanh")),
                Map.entry("asinh", Utils.n1(FastMath::asinh, "asinh")),
                Map.entry("acosh", Utils.n1(x -> {
                    Utils.checkPositive("acosh", x, true);
                    return FastMath.acosh(x);
                }, "acosh")),
                Map.entry("atanh", Utils.n1(x -> {
                    if (x <= -1.0 || x >= 1.0)
                        throw new RuntimeException("atanh domain error: expected x in (-1, 1), got " + x);
                    return FastMath.atanh(x);
                }, "atanh")),

                // Utilities (variadic or mixed)
                Map.entry("min", (args) -> {
                    if (args.isEmpty()) throw new RuntimeException("min requires at least one argument");
                    double best = Double.POSITIVE_INFINITY;
                    for (int i = 0; i < args.size(); i++) {
                        double v = Utils.toNumber(args.get(i), "min arg " + (i + 1)).doubleValue();
                        if (v < best) best = v;
                    }
                    Utils.assertFinite("min", best);
                    return Utils.num(best);
                }),
                Map.entry("max", (args) -> {
                    if (args.isEmpty()) throw new RuntimeException("max requires at least one argument");
                    double best = Double.NEGATIVE_INFINITY;
                    for (int i = 0; i < args.size(); i++) {
                        double v = Utils.toNumber(args.get(i), "max arg " + (i + 1)).doubleValue();
                        if (v > best) best = v;
                    }
                    Utils.assertFinite("max", best);
                    return Utils.num(best);
                }),
                Map.entry("pow", Utils.n2(FastMath::pow, "pow base", "pow exponent")),
                Map.entry("random", (args) -> Utils.num(Math.random())),
                Map.entry("sign", Utils.n1(FastMath::signum, "sign")),

                // Custom math
                Map.entry("deg", Utils.n1(x -> x * 180.0 / Math.PI, "deg")),
                Map.entry("rad", Utils.n1(x -> x * Math.PI / 180.0, "rad")),
                Map.entry("clamp", Utils.n3((v, lo, hi) -> {
                    if (lo > hi)
                        throw new RuntimeException("clamp: min (" + lo + ") cannot be greater than max (" + hi + ")");
                    return Math.min(Math.max(v, lo), hi);
                }, "clamp value", "clamp min", "clamp max")),
                Map.entry("lerp", Utils.n3((a, b, t) -> a + (b - a) * t, "lerp a", "lerp b", "lerp t")),

                // Conversions
                Map.entry("number", Utils.n1(x -> x, "number")), // wrapper ensures toNumber semantics
                Map.entry("string", (args) -> Utils.str(Utils.toString(args.get(0), "string method"))),
                Map.entry("boolean", (args) -> Utils.bool(Utils.toBoolean(args.get(0), "boolean method"))),

                // String functions
                Map.entry("length", (args) -> {
                    JexValue x = args.get(0);
                    if (x instanceof JexString) return Utils.num(x.asString("length method").length());
                    if (x instanceof JexArray) return Utils.num(x.asArray("length method").size());
                    throw new TypeMismatchError("length", "string or array", Utils.getJexValueType(x));
                }),
                Map.entry("upper", (args) -> Utils.str(Utils.toString(args.get(0), "upper method").toUpperCase())),
                Map.entry("lower", (args) -> Utils.str(Utils.toString(args.get(0), "lower method").toLowerCase())),
                Map.entry("trim", (args) -> Utils.str(Utils.toString(args.get(0), "trim method").trim())),

                // Array functions
                Map.entry("array", (args) -> new JexArray(new ArrayList<>(args))),
                Map.entry("first", (args) -> {
                    JexValue arr = args.get(0);
                    if (!(arr instanceof JexArray))
                        throw new TypeMismatchError("first", "array", Utils.getJexValueType(arr));
                    List<JexValue> vs = ((JexArray) arr).asArray("first method");
                    return vs.isEmpty() ? new JexNull() : vs.get(0);
                }),
                Map.entry("last", (args) -> {
                    JexValue arr = args.get(0);
                    if (!(arr instanceof JexArray))
                        throw new TypeMismatchError("last", "array", Utils.getJexValueType(arr));
                    List<JexValue> vs = ((JexArray) arr).asArray("last method");
                    return vs.isEmpty() ? new JexNull() : vs.get(vs.size() - 1);
                }),
                Map.entry("sum", (args) -> {
                    JexValue arr = args.get(0);
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
                    JexValue arr = args.get(0);
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

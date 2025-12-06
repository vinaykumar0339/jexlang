package io.github.vinaykumar0339.functions;

import io.github.vinaykumar0339.Utils;
import io.github.vinaykumar0339.context.EvaluatorContext;
import io.github.vinaykumar0339.eval.errors.TypeMismatchError;
import io.github.vinaykumar0339.types.*;

import java.util.*;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;

import io.github.vinaykumar0339.types.JexArray;
import io.github.vinaykumar0339.types.JexNull;
import io.github.vinaykumar0339.types.JexString;
import io.github.vinaykumar0339.types.JexValue;
import org.apache.commons.math3.util.FastMath;

import static io.github.vinaykumar0339.Utils.toNumber;
import static io.github.vinaykumar0339.types.Values.doubleValue;
import static io.github.vinaykumar0339.types.Values.integer;

public class Functions {

    private static double trunc(double x) {
        return x < 0 ? FastMath.ceil(x) : FastMath.floor(x);
    }

    public static Map<String, FuncImpl> makeBuiltins() {
        return new HashMap<>(Map.ofEntries(
                Map.entry("abs", Utils.n1(FastMath::abs, "abs function")),
                Map.entry("ceil", Utils.n1(FastMath::ceil, "ceil function")),
                Map.entry("floor", Utils.n1(FastMath::floor, "floor function")),
                Map.entry("round", Utils.n1(x -> (double) FastMath.round(x), "round function")),
                Map.entry("trunc", Utils.n1(Functions::trunc, "trunc function")),

                Map.entry("sin", Utils.n1(FastMath::sin, "sin function")),
                Map.entry("cos", Utils.n1(FastMath::cos, "cos function")),
                Map.entry("tan", Utils.n1(FastMath::tan, "tan function")),
                Map.entry("asin", Utils.n1(FastMath::asin, "asin")),
                Map.entry("acos", Utils.n1(FastMath::acos, "acos")),
                Map.entry("atan", Utils.n1(FastMath::atan, "atan function")),
                Map.entry("atan2", Utils.n2(FastMath::atan2, "atan2:y function", "atan2:x function")),

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

                Map.entry("sinh", Utils.n1(FastMath::sinh, "sinh function")),
                Map.entry("cosh", Utils.n1(FastMath::cosh, "cosh function")),
                Map.entry("tanh", Utils.n1(FastMath::tanh, "tanh function")),
                Map.entry("asinh", Utils.n1(FastMath::asinh, "asinh function")),
                Map.entry("acosh", Utils.n1(FastMath::acosh, "acosh function")),
                Map.entry("atanh", Utils.n1(FastMath::atanh, "atanh")),

                Map.entry("min", (ctx, args) -> {
                    if (args.length == 0) throw new RuntimeException("min requires at least one argument");
                    double best = Double.POSITIVE_INFINITY;
                    for (int i = 0; i < args.length; i++) {
                        double v = Utils.toNumber(args[i], "min arg " + (i + 1)).doubleValue();
                        if (v < best) best = v;
                    }
                    Utils.assertFinite("min", best);
                    return Utils.num(best);
                }),
                Map.entry("max", (ctx, args) -> {
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
                Map.entry("random", (ctx, args) -> Utils.num(Math.random())),
                Map.entry("sign", Utils.n1(FastMath::signum, "sign function")),

                Map.entry("deg", Utils.n1(x -> x * 180.0 / Math.PI, "deg function")),
                Map.entry("rad", Utils.n1(x -> x * Math.PI / 180.0, "rad function")),
                Map.entry("clamp", Utils.n3((v, lo, hi) -> {
                    if (lo > hi)
                        throw new RuntimeException("clamp: min (" + lo + ") cannot be greater than max (" + hi + ")");
                    return Math.min(Math.max(v, lo), hi);
                }, "clamp value", "clamp min", "clamp max")),
                Map.entry("lerp", Utils.n3((a, b, t) -> a + (b - a) * t, "lerp a", "lerp b", "lerp t")),

                Map.entry("number", Utils.n1(x -> x, "number function")),
                Map.entry("string", (ctx, args) -> Utils.str(Utils.toString(args[0], "string function"))),
                Map.entry("boolean", (ctx, args) -> Utils.bool(Utils.toBoolean(args[0], "boolean function"))),
                Map.entry("int", (ctx, args) -> integer(toNumber(args.length > 0 ? args[0] : JexValue.from(0), "int transform").intValue())),
                Map.entry("float", (ctx, args) -> doubleValue(toNumber(args.length > 0 ? args[0] : JexValue.from(0), "float transform").floatValue())),
                Map.entry("double", (ctx, args) -> doubleValue(toNumber(args.length > 0 ? args[0] : JexValue.from(0), "double transform").doubleValue())),

                Map.entry("length", (ctx, args) -> {
                    JexValue x = args[0];
                    if (x instanceof JexString) return Utils.num(x.asString("length method").length());
                    if (x instanceof JexArray) return Utils.num(x.asArray("length method").size());
                    throw new TypeMismatchError("length", "string or array", Utils.getJexValueType(x));
                }),
                Map.entry("upper", (ctx, args) -> Utils.str(Utils.toString(args[0], "upper method").toUpperCase())),
                Map.entry("lower", (ctx, args) -> Utils.str(Utils.toString(args[0], "lower method").toLowerCase())),
                Map.entry("trim", (ctx, args) -> Utils.str(Utils.toString(args[0], "trim method").trim())),

                Map.entry("array", (ctx, args) -> new JexArray(new ArrayList<>(List.of(args)))),
                Map.entry("first", (ctx, args) -> {
                    JexValue arr = args[0];
                    if (!(arr instanceof JexArray))
                        throw new TypeMismatchError("first", "array", Utils.getJexValueType(arr));
                    List<JexValue> vs = ((JexArray) arr).asArray("first method");
                    return vs.isEmpty() ? new JexNull() : vs.get(0);
                }),
                Map.entry("push", (ctx, args) -> {
                    JexValue arr = args[0];
                    if (!(arr instanceof JexArray))
                        throw new TypeMismatchError("push", "array", Utils.getJexValueType(arr));
                    List<JexValue> vs = arr.asArray("push method");
                    vs.addAll(List.of(Arrays.copyOfRange(args, 1, args.length)));
                    return new JexArray(vs);
                }),
                Map.entry("pop", (ctx, args) -> {
                    JexValue arr = args[0];
                    if (!(arr instanceof JexArray))
                        throw new TypeMismatchError("pop", "array", Utils.getJexValueType(arr));
                    List<JexValue> vs = arr.asArray("pop method");
                    if (vs.isEmpty()) return new JexNull();
                    return vs.remove(vs.size() - 1);
                }),
                Map.entry("last", (ctx, args) -> {
                    JexValue arr = args[0];
                    if (!(arr instanceof JexArray))
                        throw new TypeMismatchError("last", "array", Utils.getJexValueType(arr));
                    List<JexValue> vs = arr.asArray("last method");
                    return vs.isEmpty() ? new JexNull() : vs.get(vs.size() - 1);
                }),
                Map.entry("sum", (ctx, args) -> {
                    JexValue arr = args[0];
                    if (!(arr instanceof JexArray))
                        throw new TypeMismatchError("sum", "array", Utils.getJexValueType(arr));
                    List<JexValue> vs = arr.asArray("sum method");
                    if (vs.isEmpty()) return Utils.num(0.0);
                    double s = 0.0;
                    for (int i = 0; i < vs.size(); i++) s += Utils.toNumber(vs.get(i), "sum[" + i + "]").doubleValue();
                    Utils.assertFinite("sum", s);
                    return Utils.num(s);
                }),
                Map.entry("avg", (ctx, args) -> {
                    JexValue arr = args[0];
                    if (!(arr instanceof JexArray))
                        throw new TypeMismatchError("avg", "array", Utils.getJexValueType(arr));
                    List<JexValue> vs = arr.asArray("avg method");
                    if (vs.isEmpty()) return new JexNull();
                    double s = 0.0;
                    for (int i = 0; i < vs.size(); i++) s += Utils.toNumber(vs.get(i), "avg[" + i + "]").doubleValue();
                    double v = s / vs.size();
                    Utils.assertFinite("avg", v);
                    return Utils.num(v);
                }),

                Map.entry("now", (ctx, args) -> Utils.num(System.currentTimeMillis())),
                Map.entry("today", (ctx, args) -> {
                    Calendar cal = Calendar.getInstance();
                    cal.set(Calendar.HOUR_OF_DAY, 0);
                    cal.set(Calendar.MINUTE, 0);
                    cal.set(Calendar.SECOND, 0);
                    cal.set(Calendar.MILLISECOND, 0);
                    return Utils.num(cal.getTimeInMillis());
                }),

                Map.entry("date", (ctx, args) -> {
                    if (args.length == 0) {
                        return Utils.num(System.currentTimeMillis());
                    }
                    JexValue timestamp = args[0];
                    return Utils.num(new Date(toNumber(timestamp, "date function").longValue()).getTime());
                }),

                Map.entry("year", (ctx, args) -> {
                    Calendar cal = Calendar.getInstance();
                    if (args.length > 0) {
                        cal.setTimeInMillis(toNumber(args[0], "year function").longValue());
                    }
                    return Utils.num(cal.get(Calendar.YEAR));
                }),

                Map.entry("month", (ctx, args) -> {
                    Calendar cal = Calendar.getInstance();
                    if (args.length > 0) {
                        cal.setTimeInMillis(toNumber(args[0], "month function").longValue());
                    }
                    return Utils.num(cal.get(Calendar.MONTH) + 1);
                }),

                Map.entry("day", (ctx, args) -> {
                    Calendar cal = Calendar.getInstance();
                    if (args.length > 0) {
                        cal.setTimeInMillis(toNumber(args[0], "day function").longValue());
                    }
                    return Utils.num(cal.get(Calendar.DAY_OF_MONTH));
                }),

                Map.entry("hour", (ctx, args) -> {
                    Calendar cal = Calendar.getInstance();
                    if (args.length > 0) {
                        cal.setTimeInMillis(toNumber(args[0], "hour function").longValue());
                    }
                    return Utils.num(cal.get(Calendar.HOUR_OF_DAY));
                }),

                Map.entry("minute", (ctx, args) -> {
                    Calendar cal = Calendar.getInstance();
                    if (args.length > 0) {
                        cal.setTimeInMillis(toNumber(args[0], "minute function").longValue());
                    }
                    return Utils.num(cal.get(Calendar.MINUTE));
                }),

                Map.entry("second", (ctx, args) -> {
                    Calendar cal = Calendar.getInstance();
                    if (args.length > 0) {
                        cal.setTimeInMillis(toNumber(args[0], "second function").longValue());
                    }
                    return Utils.num(cal.get(Calendar.SECOND));
                }),

                Map.entry("weekday", (ctx, args) -> {
                    Calendar cal = Calendar.getInstance();
                    if (args.length > 0) {
                        cal.setTimeInMillis(toNumber(args[0], "weekday function").longValue());
                    }
                    return Utils.num(cal.get(Calendar.DAY_OF_WEEK) - 1);
                }),

                Map.entry("addDays", (ctx, args) -> {
                    if (args.length < 2) throw new RuntimeException("addDays requires 2 arguments: timestamp, days");
                    Calendar cal = Calendar.getInstance();
                    cal.setTimeInMillis(toNumber(args[0], "addDays timestamp").longValue());
                    cal.add(Calendar.DAY_OF_MONTH, toNumber(args[1], "addDays days").intValue());
                    return Utils.num(cal.getTimeInMillis());
                }),

                Map.entry("addMonths", (ctx, args) -> {
                    if (args.length < 2) throw new RuntimeException("addMonths requires 2 arguments: timestamp, months");
                    Calendar cal = Calendar.getInstance();
                    cal.setTimeInMillis(toNumber(args[0], "addMonths timestamp").longValue());
                    cal.add(Calendar.MONTH, toNumber(args[1], "addMonths months").intValue());
                    return Utils.num(cal.getTimeInMillis());
                }),

                Map.entry("addYears", (ctx, args) -> {
                    if (args.length < 2) throw new RuntimeException("addYears requires 2 arguments: timestamp, years");
                    Calendar cal = Calendar.getInstance();
                    cal.setTimeInMillis(toNumber(args[0], "addYears timestamp").longValue());
                    cal.add(Calendar.YEAR, toNumber(args[1], "addYears years").intValue());
                    return Utils.num(cal.getTimeInMillis());
                }),

                Map.entry("addHours", (ctx, args) -> {
                    if (args.length < 2) throw new RuntimeException("addHours requires 2 arguments: timestamp, hours");
                    Calendar cal = Calendar.getInstance();
                    cal.setTimeInMillis(toNumber(args[0], "addHours timestamp").longValue());
                    cal.add(Calendar.HOUR_OF_DAY, toNumber(args[1], "addHours hours").intValue());
                    return Utils.num(cal.getTimeInMillis());
                }),

                Map.entry("addMinutes", (ctx, args) -> {
                    if (args.length < 2) throw new RuntimeException("addMinutes requires 2 arguments: timestamp, minutes");
                    Calendar cal = Calendar.getInstance();
                    cal.setTimeInMillis(toNumber(args[0], "addMinutes timestamp").longValue());
                    cal.add(Calendar.MINUTE, toNumber(args[1], "addMinutes minutes").intValue());
                    return Utils.num(cal.getTimeInMillis());
                }),

                Map.entry("daysBetween", (ctx, args) -> {
                    if (args.length < 2) throw new RuntimeException("daysBetween requires 2 arguments: timestamp1, timestamp2");
                    LocalDate date1 = new Date(toNumber(args[0], "daysBetween timestamp1").longValue())
                            .toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                    LocalDate date2 = new Date(toNumber(args[1], "daysBetween timestamp2").longValue())
                            .toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                    return Utils.num(Math.abs(ChronoUnit.DAYS.between(date1, date2)));
                }),

                Map.entry("isLeapYear", (ctx, args) -> {
                    if (args.length < 1) throw new RuntimeException("isLeapYear requires 1 argument: year");
                    int year = toNumber(args[0], "isLeapYear year").intValue();
                    return Utils.bool((year % 4 == 0 && year % 100 != 0) || year % 400 == 0);
                }),

                Map.entry("timestamp", (ctx, args) -> Utils.num((double) System.currentTimeMillis() / 1000))
        ));
    }

    public static MapFuncRegistry createDefaultFuncRegistry() {
        return new MapFuncRegistry(makeBuiltins());
    }
}

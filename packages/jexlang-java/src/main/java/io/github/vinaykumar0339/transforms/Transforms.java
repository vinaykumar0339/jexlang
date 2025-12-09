package io.github.vinaykumar0339.transforms;

import io.github.vinaykumar0339.Utils;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

import static io.github.vinaykumar0339.Utils.*;
import static io.github.vinaykumar0339.types.Values.doubleValue;
import static io.github.vinaykumar0339.types.Values.integer;

public class Transforms {

    public static Map<String, TransformImpl> makeBuiltins() {
        return Map.ofEntries(
                // String transforms
                Map.entry("upper", (v, ctx) -> str(Utils.toString(v, "upper transform").toUpperCase())),
                Map.entry("lower", (v, ctx) -> str(Utils.toString(v, "lower transform").toLowerCase())),
                Map.entry("capitalize", (v, ctx) -> {
                    String s = Utils.toString(v, "capitalize transform");
                    if (s.isEmpty()) return str(s);
                    String out = Arrays.stream(s.split(" "))
                            .map(w -> w.isEmpty() ? w : (w.substring(0, 1).toUpperCase() + (w.length() > 1 ? w.substring(1).toLowerCase() : "")))
                            .collect(Collectors.joining(" "));
                    return str(out);
                }),
                Map.entry("trim", (v, ctx) -> str(Utils.toString(v, "trim transform").trim())),

                // Numeric transforms
                Map.entry("abs", (v, ctx) -> num(Math.abs(toNumber(v, "abs transform").doubleValue()))),
                Map.entry("round", (v, ctx) -> num(Math.round(toNumber(v, "round transform").doubleValue()))),
                Map.entry("floor", (v, ctx) -> num(Math.floor(toNumber(v, "floor transform").doubleValue()))),
                Map.entry("ceil", (v, ctx) -> num(Math.ceil(toNumber(v, "ceil transform").doubleValue()))),

                // Array/object/string length
                Map.entry("length", (v, ctx) -> {
                    if (v.isArray()) return num((v).asArray("length transform").size());
                    if (v.isString()) return num((v).asString("length transform").length());
                    if (v.isObject()) return num((v).asObject("length transform").size());
                    return num(0);
                }),

                // Type transforms
                Map.entry("number", (v, ctx) -> num(toNumber(v, "number transform").doubleValue())),
                Map.entry("string", (v, ctx) -> str(Utils.toString(v, "string transform"))),
                Map.entry("boolean", (v, ctx) -> bool(toBoolean(v, "boolean transform"))),
                Map.entry("int", (v, ctx) -> integer(toNumber(v, "int transform").intValue())),
                Map.entry("float", (v, ctx) -> doubleValue(toNumber(v, "float transform").floatValue())),
                Map.entry("double", (v, ctx) -> doubleValue(toNumber(v, "double transform").doubleValue()))
        );
    }

    public static MapTransformRegistry createDefaultFuncRegistry() {
        return new MapTransformRegistry(makeBuiltins());
    }

}

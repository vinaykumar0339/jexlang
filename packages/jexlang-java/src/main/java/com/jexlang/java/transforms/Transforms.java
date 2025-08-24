package com.jexlang.java.transforms;

import com.jexlang.java.Utils;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

import static com.jexlang.java.Utils.*;

public class Transforms {

    public static Map<String, TransformImpl> makeBuiltins() {
        return Map.ofEntries(
                // String transforms
                Map.entry("upper", v -> str(Utils.toString(v, "upper").toUpperCase())),
                Map.entry("lower", v -> str(Utils.toString(v, "lower").toLowerCase())),
                Map.entry("capitalize", v -> {
                    String s = Utils.toString(v, "capitalize");
                    if (s.isEmpty()) return str(s);
                    String out = Arrays.stream(s.split(" "))
                            .map(w -> w.isEmpty() ? w : (w.substring(0, 1).toUpperCase() + (w.length() > 1 ? w.substring(1).toLowerCase() : "")))
                            .collect(Collectors.joining(" "));
                    return str(out);
                }),
                Map.entry("trim", v -> str(Utils.toString(v, "trim").trim())),

                // Numeric transforms
                Map.entry("abs", v -> num(Math.abs(toNumber(v, "abs").doubleValue()))),
                Map.entry("round", v -> num(Math.round(toNumber(v, "round").doubleValue()))),
                Map.entry("floor", v -> num(Math.floor(toNumber(v, "floor").doubleValue()))),
                Map.entry("ceil", v -> num(Math.ceil(toNumber(v, "ceil").doubleValue()))),

                // Array/object/string length
                Map.entry("length", v -> {
                    if (v.isArray()) return num((v).asArray("length transform").size());
                    if (v.isString()) return num((v).asString("length transform").length());
                    if (v.isString()) return num((v).asObject("length transform").size());
                    return num(0);
                }),

                // Type transforms
                Map.entry("number", v -> num(toNumber(v, "number").doubleValue())),
                Map.entry("string", v -> str(Utils.toString(v, "string"))),
                Map.entry("boolean", v -> bool(toBoolean(v, "boolean")))
        );
    }

    public static MapTransformRegistry createDefaultFuncRegistry() {
        return new MapTransformRegistry(makeBuiltins());
    }

}

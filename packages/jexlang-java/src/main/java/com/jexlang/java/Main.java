package com.jexlang.java;

import com.jexlang.java.evaluator.JexEvaluator;
import com.jexlang.java.transforms.TransformImpl;
import com.jexlang.java.types.JexValue;

import java.util.Map;

public class Main {
    private static final Map<String, Object> context = Map.ofEntries(
            Map.entry("x", 3),
            Map.entry("y", 4)
    );
    private static final Map<String, TransformImpl> transforms = Map.ofEntries(
            Map.entry("greet", (name) -> JexValue.fromString("Hello, " + name.asString("greet transform") + "!"))
    );
    public static void main(String[] args) {
        try {
            JexEvaluator evaluator = new JexEvaluator(context, null, transforms);

            evaluator.setCacheExpressions(true);

            System.out.println(
                    evaluator.evaluate("√(x^2 + y^2)")
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
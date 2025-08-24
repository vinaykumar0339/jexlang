package com.jexlang.java;

import com.jexlang.java.evaluator.JexEvaluator;
import com.jexlang.java.types.JexValue;

import java.util.Map;

public class Main {
    private static final Map<String, Object> context = Map.ofEntries(
            Map.entry("x", 3),
            Map.entry("y", 4)
    );
    public static void main(String[] args) {
        JexEvaluator evaluator = new JexEvaluator(context, null, null);

        evaluator.setCacheExpressions(true);

        System.out.println(
            evaluator.evaluate("√(x^2 + y^2);").asNumber("main()") // Should print 5
        );
    }
}
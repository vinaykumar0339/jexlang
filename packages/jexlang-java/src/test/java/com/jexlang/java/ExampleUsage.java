package com.jexlang.java;

import com.jexlang.java.evaluator.JexEvaluator;
import com.jexlang.java.functions.FuncImpl;
import com.jexlang.java.transforms.TransformImpl;
import com.jexlang.java.types.JexNull;
import com.jexlang.java.types.JexValue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;

/**
 * Example showing how to use JexLang in a Java application.
 * This file is provided for demonstration purposes only and is not part of the core library.
 */
public class ExampleUsage {
    private static final Map<String, Object> context = Map.ofEntries(
            Map.entry("x", 3),
            Map.entry("y", 4),
            Map.entry("user", Map.ofEntries(
                    Map.entry("name", "Alice"),
                    Map.entry("age", 30),
                    Map.entry("skills", new ArrayList<>(java.util.List.of("Java", "Python", "C++")))
            ))
    );
    
    private static final Map<String, TransformImpl> transforms = Map.ofEntries(
            Map.entry("greet", (name) -> JexValue.fromString("Hello, " + name.asString("greet transform") + "!"))
    );

    private static final Map<String, FuncImpl> funcs = Map.ofEntries(
            Map.entry("test", (args -> {
                System.out.println(Arrays.toString(args));
                return new JexNull();
            }))
    );

    // This main method is required for IntelliJ to show the play/run button
    public static void main(String[] args) {
        try {
            JexEvaluator evaluator = new JexEvaluator(context, funcs, transforms);
            evaluator.setCacheExpressions(true);

            long startTime = System.currentTimeMillis();
            
            // Example 1: Basic expression
            String basicExample = "x * y + 10";
            System.out.println("Example 1: " + basicExample);
            System.out.println("Result: " + evaluator.evaluate(basicExample));
            System.out.println();
            
            // Example 2: Working with objects
            String objectExample = "user.name + ' is ' + user.age + ' years old'";
            System.out.println("Example 2: " + objectExample);
            System.out.println("Result: " + evaluator.evaluate(objectExample));
            System.out.println();
            
            // Example 3: Using custom transform
            String transformExample = "'World' | greet";
            System.out.println("Example 3: " + transformExample);
            System.out.println("Result: " + evaluator.evaluate(transformExample));
            System.out.println();
            
            // Example 4: System constants
            String constantsExample = "{ \"version\": VERSION, \"language\": __CLIENT_LANGUAGE }";
            System.out.println("Example 4: " + constantsExample);
            System.out.println("Result: " + evaluator.evaluate(constantsExample));

            long endTime = System.currentTimeMillis();
            System.out.println("\nExecution time: " + (endTime - startTime) + " ms");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
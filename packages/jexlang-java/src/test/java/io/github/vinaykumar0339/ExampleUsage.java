package io.github.vinaykumar0339;

import io.github.vinaykumar0339.evaluator.JexEvaluator;
import io.github.vinaykumar0339.functions.FuncImpl;
import io.github.vinaykumar0339.transforms.TransformImpl;
import io.github.vinaykumar0339.types.JexNull;
import io.github.vinaykumar0339.types.JexValue;

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
            Map.entry("greet", ( name, context) -> JexValue.fromString("Hello, " + name.asString("greet transform") + "!"))
    );

    private static final Map<String, FuncImpl> funcs = Map.ofEntries(
            Map.entry("test", ((ctx, args) -> {
                System.out.println(Arrays.toString(args));
                return new JexNull();
            }))
    );

    // This main method is required for IntelliJ to show the play/run button
    public static void main(String[] args) {
        try {
            JexEvaluator evaluator = new JexEvaluator(context, funcs, transforms);
            evaluator.setCacheExpressions(true);

            evaluator.evaluate("""
                    let x = 10;
                    let y = 40;
                    global const z = x * PI
                    let p = z + y
                    let q = "123"
                    p + (q | number)
                    
                    let arr = [1, 2, 3]
                    push(arr, 4)
                    pop(arr)
                    arr
                    """);

            Object ret = evaluator.evaluate("""
                    let x = [1, 2, 3, 4, 5];
                    let y = 0
                    repeat(x) {
                        y = y + $it
                        2 | int
                    }
                    """);
            System.out.println(ret);
//            long startTime = System.currentTimeMillis();
            
            // Example 1: Basic expression
//            String basicExample = "x * y + 10";
//            System.out.println("Example 1: " + basicExample);
//            System.out.println("Result: " + evaluator.evaluate(basicExample));
//            System.out.println();
//
//            // Example 2: Working with objects
//            String objectExample = "user.name + ' is ' + user.age + ' years old'";
//            System.out.println("Example 2: " + objectExample);
//            System.out.println("Result: " + evaluator.evaluate(objectExample));
//            System.out.println();
//
//            // Example 3: Using custom transform
//            String transformExample = "'World' | greet";
//            System.out.println("Example 3: " + transformExample);
//            System.out.println("Result: " + evaluator.evaluate(transformExample));
//            System.out.println();
//
//            // Example 4: System constants
//            String constantsExample = "{ \"version\": VERSION, \"language\": __CLIENT_LANGUAGE }";
//            System.out.println("Example 4: " + constantsExample);
//            System.out.println("Result: " + evaluator.evaluate(constantsExample));
//
//            long endTime = System.currentTimeMillis();
//            System.out.println("\nExecution time: " + (endTime - startTime) + " ms");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
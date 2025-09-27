package com.jexlang.java;

import com.jexlang.java.evaluator.JexEvaluator;
import com.jexlang.java.functions.FuncImpl;
import com.jexlang.java.transforms.TransformImpl;
import com.jexlang.java.types.JexNull;
import com.jexlang.java.types.JexValue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;

public class Main {


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

    static JexEvaluator evaluator = new JexEvaluator(context, funcs, transforms);


    public static void main(String[] args) {
        try {

            evaluator.setCacheExpressions(true);

            long startTime = System.currentTimeMillis();
//            System.out.println(
//                    evaluator.evaluate("""
//                                            let user = {};
//                                            user;
////user.name
//
////        setTimeout(5000)
//        user.afsdf.sdfsf.sffsafsa > 100
//        global let name = "vinay";
//
//                                    global let name = "vin2";
//                                    name;
//                                            """)
//            );
            System.out.println(
                    evaluator.evaluate("""
                            const t = true;
                                   const f = false;
                                   let x = if (f) {
                                     const t2 ="sfgs"
                                     "true"
                                   } else if (t) {
                                     "false"
                                   } else if (f) {
                                     "vinay"
                                   } else if (f) {
                                     "sdf3"
                                   } else {
                                     "sdfsdfsdsdfsdfsdfsdds"
                                   }
                                   
                                   x
                            """, Map.of("currentGroupId", 5))
            );
            long endTime = System.currentTimeMillis();
            System.out.println("Execution time: " + (endTime - startTime) + " ms");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
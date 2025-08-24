package com.jexlang.java.visitors;

import com.jexlang.java.functions.FuncRegistry;
import com.jexlang.java.grammar.JexLangBaseVisitor;
import com.jexlang.java.transforms.TransformRegistry;
import com.jexlang.java.types.JexValue;

import java.util.HashMap;
import java.util.Map;

public class EvalVisitor extends JexLangBaseVisitor<JexValue> {
    private Map<String, JexValue> context = new HashMap<>();
    private FuncRegistry funcRegistry;
    private TransformRegistry transformRegistry;
}

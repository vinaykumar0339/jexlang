package com.jexlang.java.visitors;

import com.jexlang.java.functions.FuncImpl;
import com.jexlang.java.functions.FuncRegistry;
import com.jexlang.java.grammar.JexLangBaseVisitor;
import com.jexlang.java.scopes.ScopeStack;
import com.jexlang.java.transforms.TransformImpl;
import com.jexlang.java.transforms.TransformRegistry;
import com.jexlang.java.types.JexNull;
import com.jexlang.java.types.JexNumber;
import com.jexlang.java.types.JexValue;

import java.util.HashMap;
import java.util.Map;

public class EvalVisitor extends JexLangBaseVisitor<JexValue> {
    private Map<String, JexValue> context = new HashMap<>();
    private FuncRegistry funcRegistry;
    private TransformRegistry transformRegistry;

    private ScopeStack scopeStack = new ScopeStack();

    public EvalVisitor(
            Map<String, JexValue> context,
            Map<String, FuncImpl> funcsMap,
            Map<String, TransformImpl> transformsMap
    ) {
        super();

        if (context != null) {
            this.context = context;
        }

        this.context.putAll(mathConstants());
    }

    private Map<String, JexValue> mathConstants() {
        Map<String, JexValue> constants = new HashMap<>();
        constants.put("PI", new JexNumber(Math.PI));
        constants.put("E", new JexNumber(Math.E));
        constants.put("LN2", new JexNumber(Math.log(2)));
        constants.put("LN10", new JexNumber(Math.log(10)));
        constants.put("LOG2E", new JexNumber(1 / Math.log(2)));
        constants.put("LOG10E", new JexNumber(1 / Math.log(10)));
        constants.put("SQRT1_2", new JexNumber(Math.sqrt(0.5)));
        constants.put("SQRT2", new JexNumber(Math.sqrt(2)));
        return constants;
    }

    private void setContext(Map<String, JexValue> context) {
        if (context != null) {
            this.context = context;
        }
    }

    private void setVariable(String name, JexValue value) {
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("Variable name cannot be null or empty");
        }
        if (value == null) {
            throw new IllegalArgumentException("Variable value cannot be null if you want to set it use JexNull instead");
        }
        context.put(name, value);
    }
}

package com.jexlang.java.scopes;

import com.jexlang.java.types.JexValue;

import java.util.HashMap;
import java.util.Map;

public class Scope {
    private final Map<String, JexValue> variables = new HashMap<>();

    public void set(String name, JexValue value) {
        variables.put(name, value);
    }

    public JexValue get(String name) {
        return variables.get(name);
    }

    public boolean has(String name) {
        return variables.containsKey(name);
    }
}

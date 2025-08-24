package com.jexlang.java.functions;

import com.jexlang.java.types.JexValue;

public final class MapFuncRegistry implements FuncRegistry {
    private final java.util.Map<String, FuncImpl> map = new java.util.HashMap<>();
    public MapFuncRegistry set(String name, FuncImpl fn) { map.put(name, fn); return this; }
    public boolean has(String name) { return map.containsKey(name); }
    public JexValue call(String name, java.util.List<JexValue> args) {
        FuncImpl f = map.get(name);
        if (f == null) throw new RuntimeException("Unknown function: " + name);
        return f.apply(args);
    }
}


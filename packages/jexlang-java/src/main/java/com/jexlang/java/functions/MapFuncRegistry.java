package com.jexlang.java.functions;

import com.jexlang.java.types.JexValue;

import java.util.Map;

public final class MapFuncRegistry implements FuncRegistry {
    private final Map<String, FuncImpl> map;

    public MapFuncRegistry(Map<String, FuncImpl> funcMap) {
        this.map = funcMap;
    }

    public void set(String name, FuncImpl fn) { map.put(name, fn); }
    public boolean has(String name) { return map.containsKey(name); }
    public JexValue call(String name, JexValue... args) {
        FuncImpl f = map.get(name);
        if (f == null) throw new RuntimeException("Unknown function: " + name);
        return f.apply(args);
    }
}


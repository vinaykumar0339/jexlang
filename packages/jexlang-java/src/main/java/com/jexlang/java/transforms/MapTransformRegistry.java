package com.jexlang.java.transforms;

import com.jexlang.java.types.JexValue;

import java.util.Map;

public final class MapTransformRegistry implements TransformRegistry {
    private final Map<String, TransformImpl> map;

    public MapTransformRegistry(Map<String, TransformImpl> transformMap) {
        this.map = transformMap;
    }

    public void set(String name, TransformImpl fn) { map.put(name, fn); }
    public boolean has(String name) { return map.containsKey(name); }
    public JexValue transform(String name, JexValue input) {
        TransformImpl f = map.get(name);
        if (f == null) throw new RuntimeException("Unknown transform: " + name);
        return f.apply(input);
    }
}

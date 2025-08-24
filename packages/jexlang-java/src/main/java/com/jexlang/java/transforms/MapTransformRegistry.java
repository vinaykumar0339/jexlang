package com.jexlang.java.transforms;

import com.jexlang.java.types.JexValue;

public final class MapTransformRegistry implements TransformRegistry {
    private final java.util.Map<String, TransformImpl> map = new java.util.HashMap<>();
    public MapTransformRegistry set(String name, TransformImpl fn) { map.put(name, fn); return this; }
    public boolean has(String name) { return map.containsKey(name); }
    public JexValue transform(String name, JexValue input) {
        TransformImpl f = map.get(name);
        if (f == null) throw new RuntimeException("Unknown transform: " + name);
        return f.apply(input);
    }
}

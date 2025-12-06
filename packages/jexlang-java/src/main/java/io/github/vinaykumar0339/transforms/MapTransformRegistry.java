package io.github.vinaykumar0339.transforms;

import io.github.vinaykumar0339.context.EvaluatorContext;
import io.github.vinaykumar0339.types.JexValue;

import java.util.Map;

public final class MapTransformRegistry implements TransformRegistry {
    private final Map<String, TransformImpl> map;

    public MapTransformRegistry(Map<String, TransformImpl> transformMap) {
        this.map = transformMap;
    }

    public void set(String name, TransformImpl fn) { map.put(name, fn); }
    public Map<String, TransformImpl> getAll() { return map; }
    public boolean has(String name) { return map.containsKey(name); }
    public void remove(String name) { map.remove(name); }
    public JexValue transform(String name, JexValue input, EvaluatorContext ctx) {
        TransformImpl f = map.get(name);
        if (f == null) throw new RuntimeException("Unknown transform: " + name);
        return f.apply(input, ctx);
    }
}

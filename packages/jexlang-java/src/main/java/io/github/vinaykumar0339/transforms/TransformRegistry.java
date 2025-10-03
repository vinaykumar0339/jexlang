package io.github.vinaykumar0339.transforms;

import io.github.vinaykumar0339.types.JexValue;

public interface TransformRegistry {
    boolean has(String name);
    JexValue transform(String name, JexValue input);
}


package com.jexlang.java.transforms;

import com.jexlang.java.types.JexValue;

public interface TransformRegistry {
    boolean has(String name);
    JexValue transform(String name, JexValue input);
}


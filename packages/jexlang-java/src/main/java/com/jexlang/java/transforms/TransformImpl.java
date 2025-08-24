package com.jexlang.java.transforms;

import com.jexlang.java.types.JexValue;

@FunctionalInterface
public interface TransformImpl {
    JexValue apply(JexValue input);
}


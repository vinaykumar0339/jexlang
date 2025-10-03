package io.github.vinaykumar0339.transforms;

import io.github.vinaykumar0339.types.JexValue;

@FunctionalInterface
public interface TransformImpl {
    JexValue apply(JexValue input);
}


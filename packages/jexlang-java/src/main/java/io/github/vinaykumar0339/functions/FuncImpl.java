package io.github.vinaykumar0339.functions;

import io.github.vinaykumar0339.types.JexValue;

@FunctionalInterface
public interface FuncImpl {
    JexValue apply(JexValue... args);
}


package io.github.vinaykumar0339.functions;

import io.github.vinaykumar0339.types.JexValue;

public interface FuncRegistry {
    boolean has(String name);
    JexValue call(String name, JexValue... args);
}


package com.jexlang.java.functions;

import com.jexlang.java.types.JexValue;

@FunctionalInterface
public interface FuncImpl {
    JexValue apply(java.util.List<JexValue> args);
}


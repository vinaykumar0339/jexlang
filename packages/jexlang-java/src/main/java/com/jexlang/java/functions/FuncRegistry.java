package com.jexlang.java.functions;

import com.jexlang.java.types.JexValue;

public interface FuncRegistry {
    boolean has(String name);
    JexValue call(String name, java.util.List<JexValue> args);
}


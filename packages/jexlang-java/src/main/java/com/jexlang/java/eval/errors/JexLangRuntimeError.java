package com.jexlang.java.eval.errors;

public class JexLangRuntimeError extends Error {
    private final String name;

    public JexLangRuntimeError(String message) {
        super(message);
        this.name = "JexLangRuntimeError";
    }

    public String getName() {
        return name;
    }
}


package com.jexlang.java.eval.errors;

import javax.management.RuntimeErrorException;

public class JexLangRuntimeError extends RuntimeErrorException {
    private final String name;

    public JexLangRuntimeError(String message) {
        super(new Error(message));
        this.name = "JexLangRuntimeError";
    }

    public String getName() {
        return name;
    }
}


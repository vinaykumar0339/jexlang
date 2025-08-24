package com.jexlang.java.eval.errors;

public class DivisionByZeroError extends JexLangRuntimeError {
    public DivisionByZeroError() {
        super("Division by zero");
    }

    @Override
    public String getName() {
        return "DivisionByZeroError";
    }
}

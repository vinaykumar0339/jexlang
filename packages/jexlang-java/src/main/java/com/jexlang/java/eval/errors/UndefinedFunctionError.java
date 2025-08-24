package com.jexlang.java.eval.errors;

public class UndefinedFunctionError extends JexLangRuntimeError {
    private final String functionName;

    public UndefinedFunctionError(String functionName) {
        super("Undefined function: " + functionName);
        this.functionName = functionName;
    }

    public String getFunctionName() {
        return functionName;
    }
}

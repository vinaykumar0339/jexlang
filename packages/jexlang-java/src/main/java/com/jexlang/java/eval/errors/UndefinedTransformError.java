package com.jexlang.java.eval.errors;

public class UndefinedTransformError extends JexLangRuntimeError {
    private final String transformName;

    public UndefinedTransformError(String transformName) {
        super("Undefined transform: " + transformName);
        this.transformName = transformName;
    }

    public String getTransformName() {
        return transformName;
    }

    @Override
    public String getName() {
        return "UndefinedTransformError";
    }
}

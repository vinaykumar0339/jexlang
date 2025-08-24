package com.jexlang.java.eval.errors;

public class JexLangSyntaxError extends JexLangRuntimeError {

    private final SyntaxErrorLocation location;

    public JexLangSyntaxError(String message, SyntaxErrorLocation location) {
        super(message);
        this.location = location;
    }

    public SyntaxErrorLocation getLocation() {
        return location;
    }

    @Override
    public String getName() {
        return "JexLangSyntaxError";
    }
}

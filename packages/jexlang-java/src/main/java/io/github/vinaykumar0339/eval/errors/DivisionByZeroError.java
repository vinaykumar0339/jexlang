package io.github.vinaykumar0339.eval.errors;

public class DivisionByZeroError extends JexLangRuntimeError {
    public DivisionByZeroError() {
        super("Division by zero");
    }

    @Override
    public String getName() {
        return "DivisionByZeroError";
    }
}

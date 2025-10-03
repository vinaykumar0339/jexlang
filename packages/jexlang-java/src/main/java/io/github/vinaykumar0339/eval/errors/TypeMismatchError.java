package io.github.vinaykumar0339.eval.errors;

public class TypeMismatchError extends JexLangRuntimeError {
    private final String expected;
    private final String actual;

    public TypeMismatchError(String operation, String expected, String actual) {
        super("Type mismatch in operation '" + operation + "': expected " + expected + ", but got " + actual);
        this.expected = expected;
        this.actual = actual;
    }

    public String getExpected() {
        return expected;
    }

    public String getActual() {
        return actual;
    }
}

package io.github.vinaykumar0339.eval.errors;

public class UndefinedVariableError extends JexLangRuntimeError {
    private final String variableName;

    public UndefinedVariableError(String variableName) {
        super("Undefined variable: " + variableName);
        this.variableName = variableName;
    }

    public String getVariableName() {
        return variableName;
    }
}

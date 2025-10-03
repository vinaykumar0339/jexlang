package io.github.vinaykumar0339.eval.errors;

public class SyntaxErrorLocation {
    private int line;
    private int column;
    private String offendingSymbol;

    public SyntaxErrorLocation(int line, int column, String offendingSymbol) {
        this.line = line;
        this.column = column;
        this.offendingSymbol = offendingSymbol;
    }

    public int getLine() {
        return line;
    }

    public void setLine(int line) {
        this.line = line;
    }

    public int getColumn() {
        return column;
    }

    public void setColumn(int column) {
        this.column = column;
    }

    public String getOffendingSymbol() {
        return offendingSymbol;
    }

    public void setOffendingSymbol(String offendingSymbol) {
        this.offendingSymbol = offendingSymbol;
    }

    @Override
    public String toString() {
        return "SyntaxErrorLocation{" +
                "line=" + line +
                ", column=" + column +
                ", offendingSymbol='" + offendingSymbol + '\'' +
                '}';
    }
}

package com.jexlang.java.eval.errors;

public interface SyntaxErrorLocation {
    int line = 0;
    int column = 0;
    String offendingSymbol = "";
}

package io.github.vinaykumar0339.listeners;


import io.github.vinaykumar0339.eval.errors.JexLangSyntaxError;
import io.github.vinaykumar0339.eval.errors.SyntaxErrorLocation;
import org.antlr.v4.runtime.BaseErrorListener;
import org.antlr.v4.runtime.RecognitionException;
import org.antlr.v4.runtime.Recognizer;
import org.antlr.v4.runtime.Token;

import java.util.ArrayList;

public class JexLangErrorListener extends BaseErrorListener {

    private ArrayList<JexLangSyntaxError> syntaxErrors;
    @Override
    public void syntaxError(Recognizer<?, ?> recognizer, Object offendingSymbol, int line, int charPositionInLine, String msg, RecognitionException e) {

        // Extract offending text if available
        String offendingText = null;
        if (offendingSymbol instanceof Token t) {
            if (t.getText() != null) offendingText = t.getText();
        }

        String formattedMessage = formatErrorMessage(line, charPositionInLine, msg, offendingText);

        JexLangSyntaxError syntaxError = new JexLangSyntaxError(
                formattedMessage,
                new SyntaxErrorLocation(
                        line,
                        charPositionInLine,
                        offendingText
                )
        );

        syntaxErrors.add(syntaxError);
    }

    private String formatErrorMessage(int line, int charPositionInLine, String msg, String offendingTextOrNull) {
        String cleanMessage = msg
                .replaceAll("no viable alternative at input", "Unexpected")
                .replaceAll("extraneous input", "Unexpected")
                .replaceAll("mismatched input", "Unexpected")
                .replaceAll("expecting", "expected");

        if (offendingTextOrNull != null) {
            cleanMessage = cleanMessage.replaceAll(offendingTextOrNull, this.escapeString(offendingTextOrNull));
        }


        return "Syntax error at line " + line + ":" + (charPositionInLine) + ":" + cleanMessage;
    }


    private String escapeString(String str) {
        return str
                .replaceAll("\n", "\\\\n")
                .replaceAll("\r", "\\\\r")
                .replaceAll("\t", "\\\\t");
    }

    public boolean hasErrors() {
        return syntaxErrors != null && !syntaxErrors.isEmpty();
    }

    public ArrayList<JexLangSyntaxError> getSyntaxErrors() {
        return syntaxErrors;
    }

    public void clear() {
        if (syntaxErrors != null) {
            syntaxErrors.clear();
        } else {
            syntaxErrors = new ArrayList<>();
        }
    }

}

package com.jexlang.java.evaluator;

import com.jexlang.java.functions.FuncImpl;
import com.jexlang.java.grammar.JexLangLexer;
import com.jexlang.java.grammar.JexLangParser;
import com.jexlang.java.listeners.JexLangErrorListener;
import com.jexlang.java.transforms.TransformImpl;
import com.jexlang.java.types.JexValue;
import com.jexlang.java.visitors.EvalVisitor;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CodePointCharStream;
import org.antlr.v4.runtime.CommonTokenStream;

import java.util.HashMap;
import java.util.Map;

public class JexEvaluator {

    private Map<String, JexValue> context;
    private final Map<String, FuncImpl> funcsMap;
    private final Map<String, TransformImpl> transformMap;
    private final EvalVisitor evalVisitor;
    private final JexLangErrorListener errorListener;
    private final Map<String, JexLangParser.ProgramContext> cacheParsedTrees = new HashMap<>();
    private boolean cacheExpressions = false;

    private Map<String, JexValue> convertContextToJexValue(Map<String, Object> context) {
        Map<String, JexValue> jexContext = new HashMap<>();
        if (context != null) {
            for (Map.Entry<String, Object> entry : context.entrySet()) {
                jexContext.put(entry.getKey(), JexValue.from(entry.getValue()));
            }
        }
        return jexContext;
    }

    public JexEvaluator(
            Map<String, Object> context,
            Map<String, FuncImpl> funcsMap,
            Map<String, TransformImpl> transformMap
    ) {
        this.context = context != null ? convertContextToJexValue(context) : new HashMap<>();
        this.funcsMap = funcsMap != null ? funcsMap : new HashMap<>();
        this.transformMap = transformMap != null ? transformMap : new HashMap<>();
        this.evalVisitor = new EvalVisitor(this.context, funcsMap, transformMap);
        this.errorListener = new JexLangErrorListener();
    }

    private JexLangParser.ProgramContext parseExpression(String expr) {
        if (this.cacheParsedTrees.containsKey(expr) && this.cacheExpressions) {
            JexLangParser.ProgramContext cachedTree = this.cacheParsedTrees.get(expr);
            if (cachedTree != null) {
                return cachedTree;
            }
        }

        CodePointCharStream charStreams = CharStreams.fromString(expr);
        JexLangLexer lexer = new JexLangLexer(charStreams);
        CommonTokenStream tokens = new CommonTokenStream(lexer);
        JexLangParser parser = new JexLangParser(tokens);

        // Remove the default console error listener
        lexer.removeErrorListeners();

        // Add our custom error listener
        this.errorListener.clear();
        lexer.addErrorListener(this.errorListener);

        // Remove default console error listener from parser too
        parser.removeErrorListeners();
        parser.addErrorListener(this.errorListener);

        // Parse the expression
        JexLangParser.ProgramContext programContext = parser.program();

        // Check if we have any syntax errors
        if (this.errorListener.hasErrors()) {
            throw this.errorListener.getSyntaxErrors().get(0);
        }

        if (this.cacheExpressions) {
            this.cacheParsedTrees.put(expr, programContext);
        }

        return programContext;
    }

    public void setCacheExpressions(boolean cacheExpressions) {
        this.cacheExpressions = cacheExpressions;
    }

    public boolean getCacheExpressions(boolean cacheExpressions) {
        return this.cacheExpressions;
    }

    public JexValue evaluate(String expr) {
        JexLangParser.ProgramContext programContext = parseExpression(expr);
        return evalVisitor.visit(programContext);
    }

    public void setContext(Map<String, JexValue> context) {
        this.context = context != null ? context : new HashMap<>();
        this.evalVisitor.setContext(context);
    }

    public Map<String, JexValue> getContext() {
        return context;
    }

    public void addFunction(String name, FuncImpl function) {
        funcsMap.put(name, function);
        evalVisitor.addFunction(name, function);
    }

    public void addTransform(String name, TransformImpl transform) {
        transformMap.put(name, transform);
        evalVisitor.addTransform(name, transform);
    }

    public void addFunctions(Map<String, FuncImpl> functions) {
        if (functions != null) {
            for (Map.Entry<String, FuncImpl> entry : functions.entrySet()) {
                addFunction(entry.getKey(), entry.getValue());
            }
        }
    }

    public void addTransforms(Map<String, TransformImpl> transforms) {
        if (transforms != null) {
            for (Map.Entry<String, TransformImpl> entry : transforms.entrySet()) {
                addTransform(entry.getKey(), entry.getValue());
            }
        }
    }

    public void clearCachedParsedExpressions() {
        cacheParsedTrees.clear();
    }
}

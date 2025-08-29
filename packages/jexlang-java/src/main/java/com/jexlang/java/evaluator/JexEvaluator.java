package com.jexlang.java.evaluator;

import com.jexlang.java.Utils;
import com.jexlang.java.functions.FuncImpl;
import com.jexlang.java.grammar.JexLangLexer;
import com.jexlang.java.grammar.JexLangParser;
import com.jexlang.java.listeners.JexLangErrorListener;
import com.jexlang.java.scopes.Scope;
import com.jexlang.java.transforms.TransformImpl;
import com.jexlang.java.types.JexValue;
import com.jexlang.java.visitors.EvalVisitor;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CodePointCharStream;
import org.antlr.v4.runtime.CommonTokenStream;

import java.util.HashMap;
import java.util.Map;

public class JexEvaluator {

    private final Map<String, JexValue> context;
    private final Map<String, FuncImpl> funcsMap;
    private final Map<String, TransformImpl> transformMap;

    private final Scope globalScope = Utils.createGlobalScope();
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

    private void addAllContextValuesIntoGlobalScope(Map<String, JexValue> context) {
        if (context != null) {
            for (Map.Entry<String, JexValue> entry : context.entrySet()) {
                globalScope.declareVariable(entry.getKey(), entry.getValue(), false);
            }
        }
    }

    public JexEvaluator(
            Map<String, Object> context,
            Map<String, FuncImpl> funcsMap,
            Map<String, TransformImpl> transformMap
    ) {
        this.context = context != null ? convertContextToJexValue(context) : new HashMap<>();
        addAllContextValuesIntoGlobalScope(this.context);
        this.funcsMap = funcsMap != null ? funcsMap : new HashMap<>();
        this.transformMap = transformMap != null ? transformMap : new HashMap<>();
        this.evalVisitor = new EvalVisitor(this.globalScope, funcsMap, transformMap);
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

    public Object evaluate(String expr) {
        JexLangParser.ProgramContext programContext = parseExpression(expr);
        JexValue value = evalVisitor.visit(programContext);
        if (value != null) {
            return value.toObject();
        }
        return null;
    }

    public void setContextValue(String name, Object value) {
        JexValue jexValue = JexValue.from(value);
        this.context.put(name, jexValue);
        this.globalScope.assignVariable(name, jexValue);
    }

    public JexValue declareContextValue(String name, Object value, boolean isConst) {
        JexValue jexValue = JexValue.from(value);
        this.context.put(name, jexValue);
        this.globalScope.declareVariable(name, jexValue, isConst);
        return jexValue;
    }

    public Object getContextValue(String name) {
        JexValue value = this.context.get(name);
        if (value != null) {
            return value.toObject();
        }
        return null;
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

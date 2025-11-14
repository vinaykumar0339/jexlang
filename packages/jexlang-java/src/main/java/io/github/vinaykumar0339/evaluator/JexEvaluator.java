package io.github.vinaykumar0339.evaluator;

import io.github.vinaykumar0339.Utils;
import io.github.vinaykumar0339.context.EvaluatorContext;
import io.github.vinaykumar0339.functions.FuncImpl;
import io.github.vinaykumar0339.grammar.JexLangLexer;
import io.github.vinaykumar0339.grammar.JexLangParser;
import io.github.vinaykumar0339.listeners.JexLangErrorListener;
import io.github.vinaykumar0339.scopes.Scope;
import io.github.vinaykumar0339.transforms.TransformImpl;
import io.github.vinaykumar0339.types.JexValue;
import io.github.vinaykumar0339.visitors.EvalVisitor;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CodePointCharStream;
import org.antlr.v4.runtime.CommonTokenStream;

import java.util.HashMap;
import java.util.Map;

public class JexEvaluator {

    private final Map<String, JexValue> context;
    private final Map<String, FuncImpl> funcsMap;
    private final Map<String, TransformImpl> transformMap;

    private Scope globalScope = Utils.createGlobalScope();
    private EvalVisitor evalVisitor;
    private final JexLangErrorListener errorListener;
    private final Map<String, JexLangParser.ProgramContext> cacheParsedTrees = new HashMap<>();
    private boolean cacheExpressions = false;

    private EvaluatorContext getEvalContext() {
        return new EvaluatorContext(this);
    };

    private Map<String, JexValue> convertContextToJexValue(Map<String, Object> context) {
        Map<String, JexValue> jexContext = new HashMap<>();
        if (context != null) {
            for (Map.Entry<String, Object> entry : context.entrySet()) {
                jexContext.put(entry.getKey(), JexValue.from(entry.getValue()));
            }
        }
        return jexContext;
    }

    private Map<String, Object> convertJexValueToContext(Map<String, JexValue> jexValueMap) {
        Map<String, Object> context = new HashMap<>();
        for  (Map.Entry<String, JexValue> entry : jexValueMap.entrySet()) {
            context.put(entry.getKey(), entry.getValue().toObject());
        }
        return context;
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
        this.evalVisitor = new EvalVisitor(this.globalScope, getEvalContext(), funcsMap, transformMap);
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
        return evaluate(expr, Map.ofEntries());
    }

    public Object evaluate(
            String expr,
            Map<String, Object> programScopeVariables
    ) {
        JexLangParser.ProgramContext programContext = parseExpression(expr);
        evalVisitor.setProgramScopeContext(programScopeVariables);
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

    public JexValue setContextOrDeclareContextValue(String name, Object value, boolean isConst) {
        JexValue jexValue = JexValue.from(value);
        this.context.put(name, jexValue);
        if (this.globalScope.hasVariable(name)) {
            this.globalScope.assignVariable(name, jexValue);
        } else {
            this.globalScope.declareVariable(name, jexValue, isConst);
        }
        return jexValue;
    }

    public void resetContext() {
        this.context.clear();
        this.globalScope = Utils.createGlobalScope();
        addAllContextValuesIntoGlobalScope(this.context);
        this.evalVisitor = new EvalVisitor(this.globalScope, getEvalContext(), this.funcsMap, this.transformMap);
    }

    public void resetFunctions() {
        this.funcsMap.clear();
        this.evalVisitor = new EvalVisitor(this.globalScope, getEvalContext(), this.funcsMap, this.transformMap);
    }

    public void resetTransforms() {
        this.transformMap.clear();
        this.evalVisitor = new EvalVisitor(this.globalScope, getEvalContext(), this.funcsMap, this.transformMap);
    }

    public Object getContextValue(String name) {
        JexValue value = this.context.get(name);
        if (value != null) {
            return value.toObject();
        }
        return null;
    }

    public Map<String, Object> getGlobalScopeVariables() {
        Map<String, JexValue> globalVariables = this.evalVisitor.getGlobalScopeVariables();
        if (globalVariables != null) {
            return this.convertJexValueToContext(globalVariables);
        }
        return Map.of();
    }

    public void addFunction(String name, FuncImpl function) {
        funcsMap.put(name, function);
        evalVisitor.addFunction(name, function);
    }

    public Map<String, FuncImpl> getAllFunctions() {
        return this.evalVisitor.getAllFunctions();
    }

    public boolean hasFunction(String name) {
        return this.evalVisitor.hasFunction(name);
    }

    public Map<String, TransformImpl> getAllTransforms() {
        return this.evalVisitor.getAllTransforms();
    }

    public boolean hasTransform(String name) {
        return this.evalVisitor.hasTransform(name);
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

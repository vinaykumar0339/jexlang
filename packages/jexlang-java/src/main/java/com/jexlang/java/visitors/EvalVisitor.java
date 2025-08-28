package com.jexlang.java.visitors;

import com.jexlang.java.Utils;
import com.jexlang.java.eval.errors.*;
import com.jexlang.java.functions.FuncImpl;
import com.jexlang.java.functions.Functions;
import com.jexlang.java.functions.MapFuncRegistry;
import com.jexlang.java.grammar.JexLangBaseVisitor;
import com.jexlang.java.grammar.JexLangParser;
import com.jexlang.java.scopes.ScopeStack;
import com.jexlang.java.transforms.MapTransformRegistry;
import com.jexlang.java.transforms.TransformImpl;
import com.jexlang.java.transforms.Transforms;
import com.jexlang.java.types.*;
import org.antlr.v4.runtime.tree.ErrorNode;
import org.antlr.v4.runtime.tree.ParseTree;
import org.apache.commons.math3.util.FastMath;

import java.util.*;

public class EvalVisitor extends JexLangBaseVisitor<JexValue> {
    private Map<String, JexValue> context = new HashMap<>();
    private final MapFuncRegistry funcRegistry;
    private final MapTransformRegistry transformRegistry;

    private final ScopeStack scopeStack = new ScopeStack();

    public EvalVisitor(
            Map<String, JexValue> context,
            Map<String, FuncImpl> funcsMap,
            Map<String, TransformImpl> transformsMap
    ) {
        super();

        if (context != null) {
            this.context = context;
        }

        this.context.putAll(mathConstants());

        Map<String, FuncImpl> funcHashMap = new HashMap<>(Functions.makeBuiltins());
        if (funcsMap != null) {
            funcHashMap.putAll(funcsMap);
        }
        this.funcRegistry = new MapFuncRegistry(funcHashMap);

        Map<String, TransformImpl> transformHashMap = new HashMap<>(Transforms.makeBuiltins());
        if (transformsMap != null) {
            transformHashMap.putAll(transformsMap);
        }
        this.transformRegistry = new MapTransformRegistry(transformHashMap);
    }

    private Map<String, JexValue> mathConstants() {
        Map<String, JexValue> constants = new HashMap<>();
        constants.put("PI", new JexNumber(FastMath.PI));
        constants.put("E", new JexNumber(FastMath.E));
        constants.put("LN2", new JexNumber(FastMath.log(2)));
        constants.put("LN10", new JexNumber(FastMath.log(10)));
        constants.put("LOG2E", new JexNumber(1 / FastMath.log(2)));
        constants.put("LOG10E", new JexNumber(1 / FastMath.log(10)));
        constants.put("SQRT1_2", new JexNumber(FastMath.sqrt(0.5)));
        constants.put("SQRT2", new JexNumber(FastMath.sqrt(2)));
        return constants;
    }

    public void setContext(Map<String, JexValue> context) {
        if (context != null) {
            this.context = context;
        }
    }

    public void setVariable(String name, JexValue value) {
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("Variable name cannot be null or empty");
        }
        if (value == null) {
            // If the value is null, we set it to JexNull
            value = new JexNull();
        }
        context.put(name, value);
    }

    public void addFunction(String name, FuncImpl fn) {
        if (this.funcRegistry != null) {
            this.funcRegistry.set(name, fn);
        }
    }

    public void addTransform(String name, TransformImpl fn) {
        if (this.transformRegistry != null) {
            this.transformRegistry.set(name, fn);
        }
    }

    public Map<String, JexValue> getContext() {
        return Map.copyOf(context);
    }

    public void clearVariables() {
        context = this.mathConstants();
    }

    private void pushScope() {
        scopeStack.pushScope();
    }

    private void popScope() {
        scopeStack.popScope();
    }

    @Override
    public JexValue visit(ParseTree tree) {
        return super.visit(tree);
    }

    @Override
    public JexValue visitProgram(JexLangParser.ProgramContext ctx) {
        pushScope();

        JexValue result = null;

        try {
            for (int i = 0; i < ctx.statement().size(); i++) {
                result = this.visit(ctx.statement(i));
            }
        } finally {
            popScope();
        }

        return result;
    }

    @Override
    public JexValue visitStatement(JexLangParser.StatementContext ctx) {
        if (ctx.assignment() != null) {
            return this.visit(ctx.assignment());
        } else if (ctx.expression() != null) {
            return this.visit(ctx.expression());
        } else if (ctx.propertyAssignment() != null) {
            return this.visit(ctx.propertyAssignment());
        } else if (ctx.localDeclaration() != null) {
            return this.visit(ctx.localDeclaration());
        }

        return new JexNull();
    }

    @Override
    public JexValue visitLocalDeclaration(JexLangParser.LocalDeclarationContext ctx) {
        String variableName = ctx.IDENTIFIER().getText();
        JexValue value = this.visit(ctx.expression());

        if (value == null) {
            value = new JexNull(); // Default to JexNull if no value is provided
        }

        this.scopeStack.currentScope().set(variableName, value);
        return value;
    }

    @Override
    public JexValue visitAssignment(JexLangParser.AssignmentContext ctx) {
        String variableName = ctx.IDENTIFIER().getText();
        JexValue value = this.visit(ctx.expression());

        this.scopeStack.set(variableName, value);
        return value;
    }

    @Override
    public JexValue visitPowerExpression(JexLangParser.PowerExpressionContext ctx) {
        JexValue left = this.visit(ctx.expression(0));
        JexValue right = this.visit(ctx.expression(1));
        return new JexNumber(Math.pow(Utils.toNumber(left, "PowerExpression").doubleValue(),
                Utils.toNumber(right, "PowerExpression").doubleValue()));
    }

    @Override
    public JexValue visitSquareRootExpression(JexLangParser.SquareRootExpressionContext ctx) {
        JexValue value = this.visit(ctx.expression());

        Number number = Utils.toNumber(value, "SquareRootExpression");

        if (Double.isNaN(number.doubleValue())) {
            throw new JexLangRuntimeError("Cannot calculate square root of non-numeric value: " + value);
        }

        if (number.doubleValue() < 0) {
            throw new JexLangRuntimeError("Cannot calculate square root of negative number: " + number);
        }

        return new JexNumber(Math.sqrt(number.doubleValue()));
    }

    @Override
    public JexValue visitUnaryMinusExpression(JexLangParser.UnaryMinusExpressionContext ctx) {
        return new JexNumber(-Utils.toNumber(this.visit(ctx.expression()), "UnaryMinusExpression").doubleValue());
    }

    @Override
    public JexValue visitUnaryPlusExpression(JexLangParser.UnaryPlusExpressionContext ctx) {
        return new JexNumber(Utils.toNumber(this.visit(ctx.expression()), "UnaryPlusExpression").doubleValue());
    }

    @Override
    public JexValue visitMulDivModExpression(JexLangParser.MulDivModExpressionContext ctx) {
        JexValue left = this.visit(ctx.expression(0));
        JexValue right = this.visit(ctx.expression(1));
        String operator = ctx.getChild(1).getText();

        double leftValue = Utils.toNumber(left, "MulDivModExpression").doubleValue();
        double rightValue = Utils.toNumber(right, "MulDivModExpression").doubleValue();

        return switch (operator) {
            case "*" -> new JexNumber(leftValue * rightValue);
            case "/" -> {
                if (rightValue == 0) {
                    throw new DivisionByZeroError();
                }
                yield new JexNumber(leftValue / rightValue);
            }
            case "%" -> {
                if (rightValue == 0) {
                    throw new DivisionByZeroError();
                }
                yield new JexNumber(leftValue % rightValue);
            }
            default -> throw new JexLangRuntimeError("Unknown operator: " + operator);
        };
    }

    @Override
    public JexValue visitAddSubExpression(JexLangParser.AddSubExpressionContext ctx) {
        JexValue left = this.visit(ctx.expression(0));
        JexValue right = this.visit(ctx.expression(1));
        String operator = ctx.getChild(1).getText();

        // Handle string concatenation for +
        if (operator.equals("+") && (left.isString() || right.isString())) {
            String leftStr = Utils.toString(left, "AddSubExpression");
            String rightStr = Utils.toString(right, "AddSubExpression");
            return new JexString(leftStr + rightStr);
        }

        double leftValue = Utils.toNumber(left, "AddSubExpression").doubleValue();
        double rightValue = Utils.toNumber(right, "AddSubExpression").doubleValue();

        return switch (operator) {
            case "+" -> new JexNumber(leftValue + rightValue);
            case "-" -> new JexNumber(leftValue - rightValue);
            default -> throw new JexLangRuntimeError("Unknown operator: " + operator);
        };
    }

    @Override
    public JexValue visitComparatorExpression(JexLangParser.ComparatorExpressionContext ctx) {
        JexValue left = this.visit(ctx.expression(0));
        JexValue right = this.visit(ctx.expression(1));
        String operator = ctx.getChild(1).getText();

        double leftValue = Utils.toNumber(left, "ComparatorExpression").doubleValue();
        double rightValue = Utils.toNumber(right, "ComparatorExpression").doubleValue();

        return switch (operator) {
            case "<" -> new JexBoolean(leftValue < rightValue);
            case "<=" -> new JexBoolean(leftValue <= rightValue);
            case ">" -> new JexBoolean(leftValue > rightValue);
            case ">=" -> new JexBoolean(leftValue >= rightValue);
            case "==" -> new JexBoolean(leftValue == rightValue);
            case "!=" -> new JexBoolean(leftValue != rightValue);
            default -> throw new JexLangRuntimeError("Unknown operator: " + operator);
        };
    }

    @Override
    public JexValue visitParenthesizedExpression(JexLangParser.ParenthesizedExpressionContext ctx) {
        return this.visit(ctx.expression());
    }

    @Override
    public JexValue visitFunctionCallExpression(JexLangParser.FunctionCallExpressionContext ctx) {
        return this.visit(ctx.functionCall());
    }

    @Override
    public JexValue visitVariableExpression(JexLangParser.VariableExpressionContext ctx) {
        String variableName = ctx.IDENTIFIER().getText();

        if (this.scopeStack.has(variableName)) {
            return this.scopeStack.get(variableName);
        }

        if (context.containsKey(variableName)) {
            return context.get(variableName);
        }

        throw new UndefinedVariableError(variableName);
    }

    @Override
    public JexValue visitNumberExpression(JexLangParser.NumberExpressionContext ctx) {
        String numberText = ctx.NUMBER().getText();
        try {
            return new JexNumber(Double.parseDouble(numberText));
        } catch (NumberFormatException e) {
            throw new JexLangRuntimeError("Invalid number format: " + numberText);
        }
    }

    @Override
    public JexValue visitFunctionCall(JexLangParser.FunctionCallContext ctx) {
        String functionName = ctx.IDENTIFIER().getText();

        if (!this.funcRegistry.has(functionName)) {
            throw new UndefinedFunctionError(functionName);
        }

        ArrayList<JexValue> args = new ArrayList<>();

        if (ctx.argumentList() != null) {
            JexValue argList = this.visit(ctx.argumentList());
            if (argList instanceof JexArray) {
                args.addAll(argList.asArray("FunctionCall"));
            } else {
                throw new JexLangRuntimeError("Expected argument list to be an array, got: " + Utils.getJexValueType(argList));
            }
        }

        try {
            return this.funcRegistry.call(functionName, args.toArray(new JexValue[0]));
        } catch (Exception e) {
            throw new JexLangRuntimeError("Error calling function '" + functionName + "': " + e.getMessage());
        }
    }

    @Override
    public JexValue visitArgumentList(JexLangParser.ArgumentListContext ctx) {
        ArrayList<JexValue> args = new ArrayList<>();

        for (JexLangParser.ExpressionContext exprCtx : ctx.expression()) {
            JexValue argValue = this.visit(exprCtx);
            args.add(argValue);
        }

        return new JexArray(args);
    }

    @Override
    public JexValue visitStringExpression(JexLangParser.StringExpressionContext ctx) {
        String stringValue = ctx.STRING().getText();
        // Remove surrounding quotes
        stringValue = stringValue.substring(1, stringValue.length() - 1);
        return new JexString(stringValue);
    }

    @Override
    public JexValue visitDotPropertyAccessExpression(JexLangParser.DotPropertyAccessExpressionContext ctx) {
        JexValue object = this.visit(ctx.expression());
        String prop = ctx.IDENTIFIER().getText();
        if (object.isObject()) {
            Map<String, JexValue> jexObject = object.asObject("DotPropertyAccessExpression");
            return jexObject.getOrDefault(prop, new JexNull());
        } else {
            return new JexNull();
        }
    }

    @Override
    public JexValue visitDotPropertyAssignment(JexLangParser.DotPropertyAssignmentContext ctx) {
        JexValue object = this.visit(ctx.expression(0));
        String prop = ctx.IDENTIFIER().getText();
        JexValue value = this.visit(ctx.expression(1));

        if (object.isObject()) {
            Map<String, JexValue> jexObject = object.asObject("DotPropertyAssignment");
            jexObject.put(prop, value);
            return value;
        } else {
            return new JexNull();
        }

    }

    @Override
    public JexValue visitBracketPropertyAccessExpression(JexLangParser.BracketPropertyAccessExpressionContext ctx) {
        JexValue object = this.visit(ctx.expression(0));
        JexValue prop = this.visit(ctx.expression(1));

        // For Object Type
        if (object.isObject()) {
            Map<String, JexValue> jexObject = object.asObject("BracketPropertyAccessExpression");
            jexObject.put(Utils.toString(prop, "BracketPropertyAccessExpression"), new JexNull());
        } else if (object.isArray()) {
            List<JexValue> jexArray = object.asArray("BracketPropertyAccessExpression");
            if (prop.isNumber()) {
                int index = Utils.toNumber(prop, "BracketPropertyAccessExpression").intValue();
                int normalizedIndex = index < 0 ? jexArray.size() + index : index;
                if (normalizedIndex >= 0 && normalizedIndex < jexArray.size()) {
                    return jexArray.get(index);
                } else {
                    return new JexNull(); // Out of bounds access
                }
            } else {
                return new JexNull(); // Non-numeric index access
            }
        } else {
            return new JexNull();
        }

        return new JexNull(); // If object is not an array or object, return null
    }

    @Override
    public JexValue visitBracketPropertyAssignment(JexLangParser.BracketPropertyAssignmentContext ctx) {
        JexValue object = this.visit(ctx.expression(0));
        JexValue prop = this.visit(ctx.expression(1));
        JexValue value = this.visit(ctx.expression(2));

        // For Object Type
        if (object.isObject()) {
            Map<String, JexValue> jexObject = object.asObject("BracketPropertyAssignment");
            jexObject.put(Utils.toString(prop, "BracketPropertyAssignment"), value);
            return value;
        } else if (object.isArray()) {
            List<JexValue> jexArray = object.asArray("BracketPropertyAssignment");
            if (prop.isNumber()) {
                int index = Utils.toNumber(prop, "BracketPropertyAssignment").intValue();
                int normalizedIndex = index < 0 ? jexArray.size() + index : index;
                if (normalizedIndex >= 0 && normalizedIndex < jexArray.size()) {
                    jexArray.set(normalizedIndex, value);
                    return value;
                } else {
                    return new JexNull(); // Out of bounds access
                }
            } else {
                return new JexNull(); // Non-numeric index access
            }
        }

        return new JexNull(); // If object is not an array or object, return null
    }

    @Override
    public JexValue visitPrefixIncrementExpression(JexLangParser.PrefixIncrementExpressionContext ctx) {
        JexLangParser.ExpressionContext exprCtx = ctx.expression();
        if (!(exprCtx instanceof JexLangParser.VariableExpressionContext)) {
            throw new JexLangRuntimeError("Increment operator can only be applied to variables");
        }

        String variableName = ((JexLangParser.VariableExpressionContext) exprCtx).IDENTIFIER().getText();
        Number currentValue = null;

        if (this.scopeStack.has((variableName))) {
            JexValue value = this.scopeStack.get(variableName);
            currentValue = Utils.toNumber(value, "PrefixIncrementExpression");
            Number newValue = currentValue.doubleValue() + 1;
            this.scopeStack.set(variableName, new JexNumber(newValue));
            return new JexNumber(newValue);
        }

        // Fall back to global context
        if (context.containsKey(variableName)) {
            JexValue value = context.get(variableName);
            currentValue = Utils.toNumber(value, "PrefixIncrementExpression");
            Number newValue = currentValue.doubleValue() + 1;
            context.put(variableName, new JexNumber(newValue));
            return new JexNumber(newValue);
        }

        throw new UndefinedVariableError(variableName);
    }

    @Override
    public JexValue visitPrefixDecrementExpression(JexLangParser.PrefixDecrementExpressionContext ctx) {
        JexLangParser.ExpressionContext exprCtx = ctx.expression();
        if (!(exprCtx instanceof JexLangParser.VariableExpressionContext)) {
            throw new JexLangRuntimeError("Decrement operator can only be applied to variables");
        }

        String variableName = ((JexLangParser.VariableExpressionContext) exprCtx).IDENTIFIER().getText();
        Number currentValue = null;

        if (this.scopeStack.has((variableName))) {
            JexValue value = this.scopeStack.get(variableName);
            currentValue = Utils.toNumber(value, "PrefixDecrementExpression");
            Number newValue = currentValue.doubleValue() - 1;
            this.scopeStack.set(variableName, new JexNumber(newValue));
            return new JexNumber(newValue);
        }

        // Fall back to global context
        if (context.containsKey(variableName)) {
            JexValue value = context.get(variableName);
            currentValue = Utils.toNumber(value, "PrefixDecrementExpression");
            Number newValue = currentValue.doubleValue() - 1;
            context.put(variableName, new JexNumber(newValue));
            return new JexNumber(newValue);
        }

        throw new UndefinedVariableError(variableName);
    }

    @Override
    public JexValue visitPostfixIncrementExpression(JexLangParser.PostfixIncrementExpressionContext ctx) {
        JexLangParser.ExpressionContext exprCtx = ctx.expression();
        if (!(exprCtx instanceof JexLangParser.VariableExpressionContext)) {
            throw new JexLangRuntimeError("Increment operator can only be applied to variables");
        }

        String variableName = ((JexLangParser.VariableExpressionContext) exprCtx).IDENTIFIER().getText();
        Number currentValue = null;

        if (this.scopeStack.has((variableName))) {
            JexValue value = this.scopeStack.get(variableName);
            currentValue = Utils.toNumber(value, "PostfixIncrementExpression");
            Number newValue = currentValue.doubleValue() + 1;
            this.scopeStack.set(variableName, new JexNumber(newValue));
            return new JexNumber(currentValue.doubleValue()); // Return old value
        }

        // Fall back to global context
        if (context.containsKey(variableName)) {
            JexValue value = context.get(variableName);
            currentValue = Utils.toNumber(value, "PostfixIncrementExpression");
            Number newValue = currentValue.doubleValue() + 1;
            context.put(variableName, new JexNumber(newValue));
            return new JexNumber(currentValue.doubleValue()); // Return old value
        }

        throw new UndefinedVariableError(variableName);
    }

    @Override
    public JexValue visitPostfixDecrementExpression(JexLangParser.PostfixDecrementExpressionContext ctx) {
        JexLangParser.ExpressionContext exprCtx = ctx.expression();
        if (!(exprCtx instanceof JexLangParser.VariableExpressionContext)) {
            throw new JexLangRuntimeError("Decrement operator can only be applied to variables");
        }

        String variableName = ((JexLangParser.VariableExpressionContext) exprCtx).IDENTIFIER().getText();
        Number currentValue = null;

        if (this.scopeStack.has((variableName))) {
            JexValue value = this.scopeStack.get(variableName);
            currentValue = Utils.toNumber(value, "PostfixDecrementExpression");
            Number newValue = currentValue.doubleValue() - 1;
            this.scopeStack.set(variableName, new JexNumber(newValue));
            return new JexNumber(currentValue.doubleValue()); // Return old value
        }

        // Fall back to global context
        if (context.containsKey(variableName)) {
            JexValue value = context.get(variableName);
            currentValue = Utils.toNumber(value, "PostfixDecrementExpression");
            Number newValue = currentValue.doubleValue() - 1;
            context.put(variableName, new JexNumber(newValue));
            return new JexNumber(currentValue.doubleValue()); // Return old value
        }

        throw new UndefinedVariableError(variableName);
    }

    @Override
    public JexValue visitTernaryExpression(JexLangParser.TernaryExpressionContext ctx) {
        JexValue condition = this.visit(ctx.expression(0));
        JexValue trueExpr = this.visit(ctx.expression(1));
        JexValue falseExpr = this.visit(ctx.expression(2));

        if (condition instanceof JexBoolean) {
            return condition.asBoolean("TernaryExpression") ? trueExpr : falseExpr;
        }

        // If condition is not a boolean, treat it as truthy / falsy
        return !(condition instanceof JexNull) ? trueExpr : falseExpr;
    }

    @Override
    public JexValue visitShortTernaryExpression(JexLangParser.ShortTernaryExpressionContext ctx) {
        JexValue condition = this.visit(ctx.expression(0));
        JexValue falseExpr = this.visit(ctx.expression(1));
        return !(condition instanceof JexNull) ? condition : falseExpr;
    }

    @Override
    public JexValue visitBooleanExpression(JexLangParser.BooleanExpressionContext ctx) {
        return new JexBoolean(Boolean.parseBoolean(ctx.BOOLEAN().getText()));
    }

    @Override
    public JexValue visitObjectLiteral(JexLangParser.ObjectLiteralContext ctx) {
        Map<String, JexValue> obj = new HashMap<>();

        for (int i = 0; i < ctx.getChildCount(); i++) {
            JexValue value = this.visit(ctx.getChild(i));
            if (value != null && value.isObject()) {
                obj.putAll(value.asObject("ObjectLiteral"));
            }
        }

        return new JexObject(obj);
    }

    @Override
    public JexValue visitObjectProperty(JexLangParser.ObjectPropertyContext ctx) {
        Map<String, JexValue> obj = new HashMap<>(Map.ofEntries());
        String key = null;
        if (ctx.IDENTIFIER() != null) {
            String idText = ctx.IDENTIFIER().getText();
            if (this.scopeStack.has(idText)) {
                JexValue keyValue = this.scopeStack.get(idText);
                if (keyValue != null) {
                    key = Utils.toString(keyValue, "ObjectProperty");
                }
            } else if (this.context.containsKey(idText)) {
                JexValue keyValue = this.context.get(idText);
                if (keyValue != null) {
                    key = Utils.toString(keyValue, "ObjectProperty");
                }
            } else {
                key = idText; // Use the identifier as the key if not found in context or scope
            }
        } else if (ctx.STRING() != null) {
            // Use the string literal as the key
            key = ctx.STRING().getText();
            key = key.substring(1, key.length() - 1);
        }

        // lets not consider the empty strings and null keys
        if (key != null && !key.isEmpty()) {
            JexValue value = this.visit(ctx.expression());
            // Default to JexNull if no value is provided
            obj.put(key, Objects.requireNonNullElseGet(value, JexNull::new));
        }

        return new JexObject(obj);
    }

    @Override
    public JexValue visitObjectLiteralExpression(JexLangParser.ObjectLiteralExpressionContext ctx) {
        return this.visit(ctx.objectLiteral());
    }

    @Override
    public JexValue visitArrayLiteralExpression(JexLangParser.ArrayLiteralExpressionContext ctx) {
        return this.visit(ctx.arrayLiteral());
    }

    @Override
    public JexValue visitArrayLiteral(JexLangParser.ArrayLiteralContext ctx) {
        ArrayList<JexValue> elements = new ArrayList<>();

        for (int i = 0; i < ctx.expression().size(); i++) {
            ParseTree child = ctx.expression(i);
            JexValue element = this.visit(child);
            elements.add(element);
        }

        return new JexArray(elements);
    }

    @Override
    public JexValue visitTransformExpression(JexLangParser.TransformExpressionContext ctx) {
        JexValue input = this.visit(ctx.expression());
        String transformName = ctx.IDENTIFIER().getText();

        if (this.transformRegistry.has(transformName)) {
            try {
                return this.transformRegistry.transform(transformName, input);
            } catch (Exception e) {
                throw new JexLangRuntimeError("Error applying transform '" + transformName + "': " + e.getMessage());
            }
        }

        // Fall back to function registry
        if (this.funcRegistry.has(transformName)) {
            ArrayList<JexValue> args = new ArrayList<>();
            args.add(input);
            try {
                return this.funcRegistry.call(transformName, args.toArray(new JexValue[0]));
            } catch (Exception e) {
                throw new JexLangRuntimeError("Error calling function '" + transformName + "': " + e.getMessage());
            }
        }

        throw new UndefinedTransformError(transformName);

    }

    @Override
    public JexValue visitLogicalAndExpression(JexLangParser.LogicalAndExpressionContext ctx) {
        JexValue left = this.visit(ctx.expression(0));
        if (left instanceof JexBoolean && !left.asBoolean("LogicalAndExpression")) {
            return left; // Short-circuit if left is false
        }

        // Evaluate right only if left is true
        return this.visit(ctx.expression(1));
    }

    @Override
    public JexValue visitLogicalOrExpression(JexLangParser.LogicalOrExpressionContext ctx) {
        JexValue left = this.visit(ctx.expression(0));
        if (left instanceof JexBoolean && left.asBoolean("LogicalOrExpression")) {
            return left; // Short-circuit if left is true
        }

        // Evaluate right only if left is false
        return this.visit(ctx.expression(1));
    }

    @Override
    public JexValue visitErrorNode(ErrorNode node) {
        SyntaxErrorLocation location = new SyntaxErrorLocation(
                node.getSymbol() != null ? node.getSymbol().getLine() : 0,
                node.getSymbol() != null ? node.getSymbol().getCharPositionInLine() : 0,
                node.getText()
        );

        String errorMessage;

        if (node.getSymbol() != null) {
            int tokenType = node.getSymbol().getType();
            String tokenText = this.escapeTokenText(node.getText());

            if (tokenType >= 0) {
                errorMessage = "Unexpected token '" + tokenText + "'";
            } else {
                errorMessage = "Invalid syntax near '" + tokenText + "'";
            }

            if (node.getSymbol().getLine() > 0) {
                errorMessage += " at line " + node.getSymbol().getLine() +
                        ":" + (node.getSymbol().getCharPositionInLine() + 1);
            }
        } else {
            errorMessage = "Syntax error encountered: " + node.getText();
        }

        throw new JexLangSyntaxError(errorMessage, location);
    }

    private String escapeTokenText(String text) {
        if (text == null) {
            return ""; // Return empty string if text is null
        }

        return text.replaceAll("\n", "\\\\n") // Escape newlines
                .replaceAll("\r", "\\\\r") // Escape carriage returns
                .replaceAll("\t", "\\\\t"); // Escape tabs
    }

    @Override
    protected JexValue defaultResult() {
        return new JexNull();
    }
}

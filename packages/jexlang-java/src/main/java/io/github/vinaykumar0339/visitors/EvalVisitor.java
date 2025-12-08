package io.github.vinaykumar0339.visitors;

import io.github.vinaykumar0339.Utils;
import io.github.vinaykumar0339.context.EvaluatorContext;
import io.github.vinaykumar0339.eval.errors.*;
import io.github.vinaykumar0339.eval.errors.*;
import io.github.vinaykumar0339.functions.FuncImpl;
import io.github.vinaykumar0339.functions.Functions;
import io.github.vinaykumar0339.functions.MapFuncRegistry;
import io.github.vinaykumar0339.grammar.JexLangBaseVisitor;
import io.github.vinaykumar0339.grammar.JexLangParser;
import io.github.vinaykumar0339.scopes.Scope;
import io.github.vinaykumar0339.transforms.MapTransformRegistry;
import io.github.vinaykumar0339.transforms.TransformImpl;
import io.github.vinaykumar0339.transforms.Transforms;
import io.github.vinaykumar0339.types.*;
import io.github.vinaykumar0339.types.*;
import org.antlr.v4.runtime.tree.ErrorNode;
import org.antlr.v4.runtime.tree.ParseTree;

import java.util.*;

public class EvalVisitor extends JexLangBaseVisitor<JexValue> {
    private final MapFuncRegistry funcRegistry;
    private final MapTransformRegistry transformRegistry;
    private Scope scope;
    private final EvaluatorContext evaluatorContext;

    private Map<String, Object> programScopeContext = new HashMap<>();

    public EvalVisitor(
            Scope scope,
            EvaluatorContext ctx,
            Map<String, FuncImpl> funcsMap,
            Map<String, TransformImpl> transformsMap
    ) {
        super();

        this.scope = Objects.requireNonNullElseGet(scope, Utils::createGlobalScope);
        if (ctx == null) {
            throw new NullPointerException("ctx is null EvaluatorContext cannot be null");
        }
        this.evaluatorContext = ctx;

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

    public void addFunction(String name, FuncImpl fn) {
        if (this.funcRegistry != null) {
            this.funcRegistry.set(name, fn);
        }
    }

    public void removeFunction(String name) {
        if (this.funcRegistry != null) {
            this.funcRegistry.remove(name);
        }
    }

    public Map<String, FuncImpl> getAllFunctions() {
        if (this.funcRegistry != null) {
            return this.funcRegistry.getAll();
        }
        return Map.of();
    }

    public boolean hasFunction(String name) {
        if (this.funcRegistry != null) {
            return this.funcRegistry.has(name);
        }
        return false;
    }

    public Map<String, TransformImpl> getAllTransforms() {
        if (this.transformRegistry != null) {
            return this.transformRegistry.getAll();
        }
        return Map.of();
    }

    public boolean hasTransform(String name) {
        if (this.transformRegistry != null) {
            return this.transformRegistry.has(name);
        }
        return false;
    }

    public void addTransform(String name, TransformImpl fn) {
        if (this.transformRegistry != null) {
            this.transformRegistry.set(name, fn);
        }
    }

    public void removeTransform(String name) {
        if (this.transformRegistry != null) {
            this.transformRegistry.remove(name);
        }
    }

    public void setProgramScopeContext(Map<String, Object> context) {
        this.programScopeContext = context != null ? context : new HashMap<>();
    }

    public Map<String, Object> getProgramScopeContext() {
        return programScopeContext;
    }

    public void resetProgramScopeContext() {
        this.programScopeContext = null;
    }

    public Map<String, JexValue> getGlobalScopeVariables() {
        Scope globalScope = this.scope.resolveScope(Scope.ScopeType.GLOBAL);
        if (globalScope != null) {
            return globalScope.getAllVariables();
        }
        return null;
    }

    @Override
    public JexValue visit(ParseTree tree) {
        return super.visit(tree);
    }

    @Override
    public JexValue visitProgram(JexLangParser.ProgramContext ctx) {

        // create a new scope per program;
        this.scope = new Scope(this.scope, Scope.ScopeType.PROGRAM);
        // initialize the program scope with the provided context variables
        for (Map.Entry<String, Object> entry : this.programScopeContext.entrySet()) {
            this.scope.declareVariable(entry.getKey(), JexValue.from(entry.getValue()), false); // create as non-const variable
        }

        JexValue result = null;

        for (int i = 0; i < ctx.statement().size(); i++) {
            result = this.visit(ctx.statement(i));
        }

        // Exit the program scope.
        this.setScopeToParent();
        // Reset the program scope context
        this.resetProgramScopeContext();

        return result;
    }

    private void setScopeToParent() {
        Scope parentScope = this.scope.getParentScope();
        if (parentScope != null) {
            this.scope = parentScope;
        }
    }

    @Override
    public JexValue visitStatement(JexLangParser.StatementContext ctx) {
        if (ctx.varDeclaration() != null) {
            return this.visit(ctx.varDeclaration());
        } else if (ctx.block() != null) {
            return this.visit(ctx.block());
        } else if (ctx.expressionStatement() != null) {
            return this.visit(ctx.expressionStatement());
        } else if (ctx.emptyStatement() != null) {
            return this.visit(ctx.emptyStatement());
        }

        return new JexNull();
    }

    @Override
    public JexValue visitVarDeclaration(JexLangParser.VarDeclarationContext ctx) {
        String varName = ctx.IDENTIFIER().getText();
        JexValue varValue = ctx.singleExpression() != null ? this.visit(ctx.singleExpression()) : new JexNull();
        boolean isConst = ctx.CONST() != null;
        boolean isGlobal = ctx.GLOBAL() != null;
        Scope globalScope = this.scope.resolveScope(Scope.ScopeType.GLOBAL);
        if (isGlobal && globalScope != null) { // if variable declared as global scope then declare in global scope
            globalScope.declareVariable(varName, varValue, isConst);
            return varValue;
        }
        this.scope.declareVariable(varName, varValue, isConst); // otherwise in current scope
        return varValue;
    }

    @Override
    public JexValue visitLiteralExpression(JexLangParser.LiteralExpressionContext ctx) {
        return this.visit(ctx.literal());
    }

    @Override
    public JexValue visitBooleanLiteral(JexLangParser.BooleanLiteralContext ctx) {
        return JexValue.fromBoolean(Boolean.parseBoolean(ctx.getText()));
    }

    @Override
    public JexValue visitNumberLiteral(JexLangParser.NumberLiteralContext ctx) {
        return JexValue.fromNumber(Utils.toNumber(new JexString(ctx.getText()), "number literal"));
    }

    @Override
    public JexValue visitStringLiteral(JexLangParser.StringLiteralContext ctx) {
        return new JexString(ctx.getText().substring(1, ctx.getText().length() - 1)); // Remove quotes.
    }

    @Override
    public JexValue visitNullLiteral(JexLangParser.NullLiteralContext ctx) {
        return new JexNull();
    }

    @Override
    public JexValue visitBlock(JexLangParser.BlockContext ctx) {
        // Create a new scope for the block
        this.scope = new Scope(this.scope, Scope.ScopeType.BLOCK);

        JexValue result = null;

        for (int i = 0; i < ctx.statement().size(); i++) {
            result = this.visit(ctx.statement(i));
        }

        // Exit the block scope.
        this.setScopeToParent();

        return result;
    }

    @Override
    public JexValue visitRepeatExpression(JexLangParser.RepeatExpressionContext ctx) {
        JexValue iterable = this.visit(ctx.expressionSequence());

        if (iterable.isNumber()) {
            return this.handleNumericRepeat((JexNumber) iterable, ctx.block());
        } else if (iterable.isString()) {
            return this.handleStringRepeat((JexString) iterable, ctx.block());
        } else if (iterable.isArray()) {
            return this.handleArrayRepeat((JexArray) iterable, ctx.block());
        } else if (iterable.isObject()) {
            return this.handleObjectRepeat((JexObject) iterable, ctx.block());
        }

        return new JexNull();
    }

    private JexValue handleNumericRepeat(JexNumber number, JexLangParser.BlockContext block) {
        int times = number.asNumber("repeat expression").intValue();
        if (times < 0) {
            throw new JexLangRuntimeError("Cannot repeat a block negative times: " + times);
        }

        // Create a new scope for the repeat block
        this.scope = new Scope(this.scope, Scope.ScopeType.BLOCK);

        JexValue result = new JexNull();

        for (int i = 0; i < times; i++) {
            this.scope.declareAndAssignVariable("$index", JexValue.fromNumber(i), false);
            this.scope.declareAndAssignVariable("$it", JexValue.fromNumber(i), false);
            result = this.visit(block);
        }

        // Exit the block scope.
        this.setScopeToParent();

        return result;
    }

    private JexValue handleArrayRepeat(JexArray array, JexLangParser.BlockContext block) {
        List<JexValue> elements = array.asArray("repeat expression");
        int times = elements.size();

        // Create a new scope for the repeat block
        this.scope = new Scope(this.scope, Scope.ScopeType.BLOCK);

        JexValue result = new JexNull();

        for (int i = 0; i < times; i++) {
            this.scope.declareAndAssignVariable("$index", JexValue.fromNumber(i), false);
            this.scope.declareAndAssignVariable("$it", elements.get(i), false);
            result = this.visit(block);
        }

        // Exit the block scope.
        this.setScopeToParent();

        return result;
    }

    private JexValue handleObjectRepeat(JexObject object, JexLangParser.BlockContext block) {
        Map<String, JexValue> properties = object.asObject("repeat expression");

        // Create a new scope for the repeat block
        this.scope = new Scope(this.scope, Scope.ScopeType.BLOCK);

        JexValue result = new JexNull();
        for (Map.Entry<String, JexValue> entry : properties.entrySet()) {
            this.scope.declareAndAssignVariable("$key", JexValue.fromString(entry.getKey()), false);
            this.scope.declareAndAssignVariable("$value", entry.getValue(), false);
            this.scope.declareAndAssignVariable("$it", entry.getValue(), false);
            result = this.visit(block);
        }

        // Exit the block scope.
        this.setScopeToParent();

        return result;
    }

    private JexValue handleStringRepeat(JexString string, JexLangParser.BlockContext block) {
        String str = string.asString("repeat expression");
        int times = str.length();

        // Create a new scope for the repeat block
        this.scope = new Scope(this.scope, Scope.ScopeType.BLOCK);

        JexValue result = new JexNull();

        for (int i = 0; i < times; i++) {
            this.scope.declareAndAssignVariable("$index", JexValue.fromNumber(i), false);
            this.scope.declareAndAssignVariable("$it", JexValue.fromString(String.valueOf(str.charAt(i))), false);
            result = this.visit(block);
        }

        // Exit the block scope.
        this.setScopeToParent();

        return result;
    }

    @Override
    public JexValue visitEmptyStatement(JexLangParser.EmptyStatementContext ctx) {
        return new JexNull();
    }

    @Override
    public JexValue visitExpressionStatement(JexLangParser.ExpressionStatementContext ctx) {
        return this.visit(ctx.expressionSequence());
    }

    @Override
    public JexValue visitExpressionSequence(JexLangParser.ExpressionSequenceContext ctx) {
        JexValue result = null;
        for (JexLangParser.SingleExpressionContext exp: ctx.singleExpression()) {
            result = this.visit(exp);
        }
        return result != null ? result : new JexNull();
    }

    @Override
    public JexValue visitArrayLiteralExpression(JexLangParser.ArrayLiteralExpressionContext ctx) {
        return this.visit(ctx.arrayLiteral());
    }

    @Override
    public JexValue visitArrayLiteral(JexLangParser.ArrayLiteralContext ctx) {
        List<JexValue> elements = new ArrayList<>();
        for (JexLangParser.ArrayElementContext exprCtx : ctx.arrayElement()) {
            elements.add(this.visit(exprCtx));
        }
        return JexValue.fromArray(elements);
    }

    @Override
    public JexValue visitArrayElement(JexLangParser.ArrayElementContext ctx) {
        return this.visit(ctx.singleExpression());
    }

    @Override
    public JexValue visitObjectLiteralExpression(JexLangParser.ObjectLiteralExpressionContext ctx) {
        return this.visit(ctx.objectLiteral());
    }

    @Override
    public JexValue visitObjectLiteral(JexLangParser.ObjectLiteralContext ctx) {
        Map<String, JexValue> properties = new HashMap<>();
        for (JexLangParser.ObjectPropertyContext propCtx : ctx.objectProperty()) {
            JexValue prop = this.visit(propCtx);
            if (prop.isObject()) {
                properties.putAll(prop.asObject("object literal"));
            } // ignore if the response is not an object.
        }
        return JexValue.fromObject(properties);
    }

    @Override
    public JexValue visitPropertyExpressionObjectProperty(JexLangParser.PropertyExpressionObjectPropertyContext ctx) {
        JexValue propertyName = this.visit(ctx.objectPropertyName());
        JexValue propertyValue = this.visit(ctx.singleExpression());
        return new JexObject(Map.of(Utils.toString(propertyName, "property expression object property"), propertyValue));
    }

    @Override
    public JexValue visitComputedPropertyExpressionObjectProperty(JexLangParser.ComputedPropertyExpressionObjectPropertyContext ctx) {
        JexValue propertyName = this.visit(ctx.singleExpression(0));
        JexValue propertyValue = this.visit(ctx.singleExpression(1));
        return new JexObject(Map.of(Utils.toString(propertyName, "computed property expression object property"), propertyValue));
    }

    @Override
    public JexValue visitShorthandPropertyExpressionObjectProperty(JexLangParser.ShorthandPropertyExpressionObjectPropertyContext ctx) {
        String propertyName = ctx.IDENTIFIER().getText();
        JexValue propertyValue = this.scope.getVariable(propertyName);
        return new JexObject(Map.of(propertyName, propertyValue)); // don't throw any error if it didn't find the variable just set the null value
    }

    @Override
    public JexValue visitObjectPropertyName(JexLangParser.ObjectPropertyNameContext ctx) {
        if (ctx.STRING() != null) {
            return  new JexString(ctx.getText().substring(1, ctx.getText().length() - 1)); // Remove quotes.
        }

        return new JexString(ctx.getText()); // Return string representation of the identifier or number
    }

    @Override
    public JexValue visitIdentifierExpression(JexLangParser.IdentifierExpressionContext ctx) {
        String identifier = ctx.IDENTIFIER().getText();
        if (this.scope.hasVariable(identifier)) {
            return this.scope.getVariable(identifier);
        }
        throw new UndefinedVariableError(identifier);
    }

    @Override
    public JexValue visitParenthesizedExpression(JexLangParser.ParenthesizedExpressionContext ctx) {
        return this.visit(ctx.expressionSequence());
    }

    @Override
    public JexValue visitAssignmentExpression(JexLangParser.AssignmentExpressionContext ctx) {
        String varName = ctx.IDENTIFIER().getText();
        JexValue varValue = this.visit(ctx.singleExpression());
        this.scope.assignVariable(varName, varValue);
        return varValue;
    }

    @Override
    public JexValue visitBracketPropertyAssignment(JexLangParser.BracketPropertyAssignmentContext ctx) {
        JexValue objectValue = this.visit(ctx.singleExpression(0));
        JexValue propertyKey = this.visit(ctx.singleExpression(1));
        JexValue propertyValue = this.visit(ctx.singleExpression(2));

        if (objectValue != null && objectValue.isObject()) {
            Map<String, JexValue> obj = objectValue.asObject("bracket property assignment");
            obj.put(Utils.toString(propertyKey, "bracket property assignment"), propertyValue);
            return JexValue.fromObject(obj);
        } else if (objectValue != null && objectValue.isArray()) {
            JexValue[] obj = objectValue.asArray("bracket property assignment").toArray(new JexValue[0]);
            Number indexNumber = Utils.toNumber(propertyKey, "bracket property assignment");
            int normalizedIndex = Double.isNaN(indexNumber.doubleValue()) ? -1 : indexNumber.intValue();
            if (normalizedIndex < 0) {
                normalizedIndex = obj.length + normalizedIndex; // Handle negative indices
            }
            if (normalizedIndex >= 0 && normalizedIndex < obj.length) {
                obj[normalizedIndex] = propertyValue;
                return JexValue.fromArray(Arrays.asList(obj));
            }
            return new JexNull(); // if out of bounds just return JexNull, don't throw any errors.
        } else {
            throw new JexLangRuntimeError("Cannot assign property to non-object/non-array in bracket property assignment");
        }
    }

    @Override
    public JexValue visitDotPropertyAssignment(JexLangParser.DotPropertyAssignmentContext ctx) {
        JexValue objectValue = this.visit(ctx.singleExpression(0));
        JexValue propertyName = this.visit(ctx.objectPropertyName());
        JexValue propertyValue = this.visit(ctx.singleExpression(1));

        if (objectValue != null && objectValue.isObject()) {
            Map<String, JexValue> obj = objectValue.asObject("dot property assignment");
            obj.put(Utils.toString(propertyName, "dot property assignment"), propertyValue);
            return JexValue.fromObject(obj);
        } else if (objectValue != null && objectValue.isArray()) {
            JexValue[] obj = objectValue.asArray("dot property assignment").toArray(new JexValue[0]);
            Number indexNumber = Utils.toNumber(propertyName, "dot property assignment");
            int normalizedIndex = Double.isNaN(indexNumber.doubleValue()) ? -1 : indexNumber.intValue();
            if (normalizedIndex < 0) {
                normalizedIndex = obj.length + normalizedIndex; // Handle negative indices
            }
            if (normalizedIndex >= 0 && normalizedIndex < obj.length) {
                obj[normalizedIndex] = propertyValue;
                return JexValue.fromArray(Arrays.asList(obj));
            }
            return new JexNull(); // if out of bounds just return JexNull, don't throw any errors.
        } else {
            throw new JexLangRuntimeError("Cannot assign property to non-object/non-array in dot property assignment");
        }
    }

    @Override
    public JexValue visitTernaryExpression(JexLangParser.TernaryExpressionContext ctx) {
        JexValue condition = this.visit(ctx.singleExpression(0));
        // empty array and objects are falsy
        if (Utils.toBoolean(condition, "ternary expression")) {
            return this.visit(ctx.singleExpression(1));
        } else {
            return this.visit(ctx.singleExpression(2));
        }
    }

    @Override
    public JexValue visitShortTernaryExpression(JexLangParser.ShortTernaryExpressionContext ctx) {
        JexValue condition = this.visit(ctx.singleExpression(0));
        // empty array and objects are falsy
        if (Utils.toBoolean(condition, "ternary expression")) {
            return condition;
        } else {
            return this.visit(ctx.singleExpression(1));
        }
    }

    @Override
    public JexValue visitTransformExpression(JexLangParser.TransformExpressionContext ctx) {
        JexValue input = this.visit(ctx.singleExpression());
        String transformName = ctx.IDENTIFIER().getText();

        if (this.transformRegistry.has(transformName)) {
            return this.transformRegistry.transform(transformName, input, this.evaluatorContext);
        }

        // if transform not found lets check in functions
        if (this.funcRegistry.has(transformName)) {
            return this.funcRegistry.call(transformName, this.evaluatorContext, input);
        }

        throw new UndefinedTransformError(transformName);
    }

    @Override
    public JexValue visitPowerExpression(JexLangParser.PowerExpressionContext ctx) {
        JexValue left = this.visit(ctx.singleExpression(0));
        JexValue right = this.visit(ctx.singleExpression(1));

        Number base = Utils.toNumber(left, "power expression");
        Number exponent = Utils.toNumber(right, "power expression");

        return JexValue.fromNumber(Math.pow(base.doubleValue(), exponent.doubleValue()));
    }

    @Override
    public JexValue visitMultiplicativeExpression(JexLangParser.MultiplicativeExpressionContext ctx) {
        JexValue left = this.visit(ctx.singleExpression(0));
        JexValue right = this.visit(ctx.singleExpression(1));

        Number leftNum = Utils.toNumber(left, "multiplicative expression");
        Number rightNum = Utils.toNumber(right, "multiplicative expression");

        if (ctx.MULTIPLY() != null) {
            return JexValue.fromNumber(leftNum.doubleValue() * rightNum.doubleValue());
        } else if (ctx.DIVIDE() != null) {
            if (rightNum.doubleValue() == 0) {
                throw new DivisionByZeroError();
            }
            return JexValue.fromNumber(leftNum.doubleValue() / rightNum.doubleValue());
        } else if (ctx.MODULO() != null) {
            if (rightNum.doubleValue() == 0) {
                throw new DivisionByZeroError();
            }
            return JexValue.fromNumber(leftNum.doubleValue() % rightNum.doubleValue());
        }

        throw new JexLangRuntimeError("Unknown multiplicative operator " + ctx.getChild(1).getText());
    }

    @Override
    public JexValue visitAdditiveExpression(JexLangParser.AdditiveExpressionContext ctx) {
        JexValue left = this.visit(ctx.singleExpression(0));
        JexValue right = this.visit(ctx.singleExpression(1));

        if (ctx.PLUS() != null) {
            // If either operand is a string, perform string concatenation
            if (left.isString() || right.isString()) {
                return JexValue.fromString(Utils.toString(left, "additive expression") + Utils.toString(right, "additive expression"));
            }

            Number leftNum = Utils.toNumber(left, "additive expression");
            Number rightNum = Utils.toNumber(right, "additive expression");
            return JexValue.fromNumber(leftNum.doubleValue() + rightNum.doubleValue());
        } else if (ctx.MINUS() != null) {
            Number leftNum = Utils.toNumber(left, "additive expression");
            Number rightNum = Utils.toNumber(right, "additive expression");
            return JexValue.fromNumber(leftNum.doubleValue() - rightNum.doubleValue());
        }

        throw new JexLangRuntimeError("Unknown additive operator " + ctx.getChild(1).getText());
    }

    @Override
    public JexValue visitRelationalExpression(JexLangParser.RelationalExpressionContext ctx) {
        JexValue left = this.visit(ctx.singleExpression(0));
        JexValue right = this.visit(ctx.singleExpression(1));

        if (ctx.LT() != null) {
            return new JexBoolean(Utils.jsRelational(left, right, Utils.JSRelationalOp.LESS_THAN));
        } else if (ctx.GT() != null) {
            return new JexBoolean(Utils.jsRelational(left, right, Utils.JSRelationalOp.GREATER_THAN));
        } else if (ctx.LTE() != null) {
            return new JexBoolean(Utils.jsRelational(left, right, Utils.JSRelationalOp.LESS_THAN_EQUAL));
        } else if (ctx.GTE() != null) {
            return new JexBoolean(Utils.jsRelational(left, right, Utils.JSRelationalOp.GREATER_THAN_EQUAL));
        }

        throw new JexLangRuntimeError("Unknown relational operator " + ctx.getChild(1).getText());
    }

    @Override
    public JexValue visitEqualityExpression(JexLangParser.EqualityExpressionContext ctx) {
        JexValue left = this.visit(ctx.singleExpression(0));
        JexValue right = this.visit(ctx.singleExpression(1));

        if (ctx.EQ() != null) {
            return new JexBoolean(left.isEqual(right));
        } else if (ctx.NEQ() != null) {
            return new JexBoolean(!left.isEqual(right));
        }

        throw new JexLangRuntimeError("Unknown equality operator " + ctx.getChild(1).getText());
    }

    @Override
    public JexValue visitLogicalAndExpression(JexLangParser.LogicalAndExpressionContext ctx) {
        if (ctx.AND() != null) {
            JexValue left = this.visit(ctx.singleExpression(0));
            boolean leftBoolean = Utils.toBoolean(left, "and");
            if (!leftBoolean) { // short-circuit if left is falsy
                return new JexBoolean(false);
            }
            JexValue right = this.visit(ctx.singleExpression(1));
            boolean rightBool = Utils.toBoolean(right, "and");
            return new JexBoolean(rightBool);
        }

        throw new JexLangRuntimeError("Unknown logical operator " + ctx.getChild(1).getText());
    }

    @Override
    public JexValue visitLogicalOrExpression(JexLangParser.LogicalOrExpressionContext ctx) {
        if (ctx.OR() != null) {
            JexValue left = this.visit(ctx.singleExpression(0));
            boolean leftBoolean = Utils.toBoolean(left, "or");
            if (leftBoolean) { // short-circuit if left is truthy
                return new JexBoolean(true);
            }
            JexValue right = this.visit(ctx.singleExpression(1));
            boolean rightBool = Utils.toBoolean(right, "or");
            return new JexBoolean(rightBool);
        }

        throw new JexLangRuntimeError("Unknown logical operator " + ctx.getChild(1).getText());
    }

    @Override
    public JexValue visitUnaryExpression(JexLangParser.UnaryExpressionContext ctx) {
        JexValue value = this.visit(ctx.singleExpression());

        if (ctx.MINUS() != null) {
            return JexValue.fromNumber(-Utils.toNumber(value, "unary expression").doubleValue());
        } else if (ctx.PLUS() != null) {
            return JexValue.fromNumber(+Utils.toNumber(value, "unary expression").doubleValue());
        } else if (ctx.NOT() != null) {
            boolean boolValue = Utils.toBoolean(value, "unary expression");
            return JexValue.fromBoolean(!boolValue);
        }

        throw new JexLangRuntimeError("Unknown unary operator " + ctx.getChild(0).getText());
    }

    @Override
    public JexValue visitSquareRootExpression(JexLangParser.SquareRootExpressionContext ctx) {
        JexValue value = this.visit(ctx.singleExpression());
        Number number = Utils.toNumber(value, "square root expression");
        if (number.doubleValue() < 0) {
            throw new JexLangRuntimeError("Cannot compute square root of negative number");
        }
        return JexValue.fromNumber(Math.sqrt(number.doubleValue()));
    }

    @Override
    public JexValue visitMemberDotExpression(JexLangParser.MemberDotExpressionContext ctx) {
        JexValue obj = this.visit(ctx.singleExpression());
        JexValue propertyName = this.visit(ctx.objectPropertyName());
        if (propertyName != null && !propertyName.isString()) {
            throw new JexLangRuntimeError("Invalid property name: " + propertyName);
        }
        if (obj != null && obj.isObject() && propertyName != null) {
            return obj.asObject("member dot expression").getOrDefault(propertyName.asString("member dot expression"), new JexNull());
        }

        return new JexNull(); // don't throw any error if the object is null or not an object just return null to further chain.
    }

    @Override
    public JexValue visitMemberIndexExpression(JexLangParser.MemberIndexExpressionContext ctx) {
        JexValue obj = this.visit(ctx.singleExpression());
        JexValue propertyKey = this.visit(ctx.expressionSequence());
        if (obj != null && obj.isObject()) {
            return obj.asObject("member index expression").getOrDefault(Utils.toString(propertyKey, "member index expression"), new JexNull());
        } else if (obj != null && obj.isArray()) {
            Number indexNumber = Utils.toNumber(propertyKey, "member index expression");
            int normalizedIndex = Double.isNaN(indexNumber.doubleValue()) ? -1 : indexNumber.intValue();
            if (normalizedIndex < 0) {
                normalizedIndex = obj.asArray("member index expression").size() + normalizedIndex; // Handle negative indices
            }
            if (normalizedIndex >= 0 && normalizedIndex < obj.asArray("member index expression").size()) {
                return obj.asArray("member index expression").get(normalizedIndex);
            }
        }
        return new JexNull(); // don't throw any error if the object is null or not an object/array just return null to further chain.
    }

    @Override
    public JexValue visitFunctionCallExpression(JexLangParser.FunctionCallExpressionContext ctx) {
        String functionName = ctx.IDENTIFIER().getText();

        // check function is available or not
        if (!this.funcRegistry.has(functionName)) {
            throw new UndefinedFunctionError(functionName);
        }

        List<JexValue> args = new ArrayList<>();
        if (ctx.arguments() != null) {
            JexValue arguments = this.visit(ctx.arguments());
            if (arguments != null && arguments.isArray()) {
                args = arguments.asArray("function call arguments");
            }
        }

        return this.funcRegistry.call(functionName, this.evaluatorContext, args.toArray(new JexValue[0]));
    }

    @Override
    public JexValue visitArguments(JexLangParser.ArgumentsContext ctx) {
        List<JexValue> args = new ArrayList<>();
        for (JexLangParser.ArgumentContext exprCtx : ctx.argument()) {
            args.add(this.visit(exprCtx));
        }
        return JexValue.fromArray(args);
    }

    @Override
    public JexValue visitArgument(JexLangParser.ArgumentContext ctx) {
        if (ctx.singleExpression() != null) {
            return this.visit(ctx.singleExpression());
        } else if (ctx.IDENTIFIER() != null) {
            String identifier = ctx.IDENTIFIER().getText();
            if (this.scope.hasVariable(identifier)) {
                return this.scope.getVariable(identifier);
            }
            throw new UndefinedVariableError(identifier);
        }

        throw new JexLangRuntimeError("Unknown argument type: " + ctx.getText());
    }

    @Override
    public JexValue visitPrefixExpression(JexLangParser.PrefixExpressionContext ctx) {
        JexLangParser.SingleExpressionContext expr = ctx.singleExpression();

        // Handle identifier expression (variables)
        if (expr instanceof JexLangParser.IdentifierExpressionContext) {
            String varName = ((JexLangParser.IdentifierExpressionContext) expr).IDENTIFIER().getText();
            if (!this.scope.hasVariable(varName)) {
                throw new UndefinedVariableError(varName);
            }

            JexValue value = this.scope.getVariable(varName);
            Number numberValue = Utils.toNumber(value, "prefix expression");
            JexNumber newValue = JexValue.fromNumber(ctx.INCREMENT() != null ? numberValue.doubleValue() + 1 : numberValue.doubleValue() - 1);
            this.scope.assignVariable(varName, newValue);
            return newValue;
        }
        // Handle property access expression (obj.pro or obj[prop])
        else if (expr instanceof JexLangParser.MemberDotExpressionContext) {
            JexValue object = this.visit(((JexLangParser.MemberDotExpressionContext) expr).singleExpression());
            JexValue propertyName = this.visit(((JexLangParser.MemberDotExpressionContext) expr).objectPropertyName());
            if (object == null || !object.isObject()) {
                throw new JexLangRuntimeError("Cannot use prefix operator on a non-object property");
            }
            Number currentValue = Utils.toNumber(object.asObject("prefix expression").getOrDefault(propertyName.asString("prefix expression"), new JexNull()), "prefix expression");
            JexNumber newValue = JexValue.fromNumber(ctx.INCREMENT() != null ? currentValue.doubleValue() + 1 : currentValue.doubleValue() - 1);
            object.asObject("prefix expression").put(propertyName.asString("prefix expression"), newValue);
            return newValue;
        } else if (expr instanceof JexLangParser.MemberIndexExpressionContext) {
            JexValue object = this.visit(((JexLangParser.MemberIndexExpressionContext) expr).singleExpression());
            JexValue propertyKey = this.visit(((JexLangParser.MemberIndexExpressionContext) expr).expressionSequence());
            if (object != null && object.isArray()) {
                List<JexValue> array = object.asArray("prefix expression");
                Number indexNumber = Utils.toNumber(propertyKey, "prefix expression");
                int normalizedIndex = Double.isNaN(indexNumber.doubleValue()) ? -1 : indexNumber.intValue();
                if (normalizedIndex < 0) {
                    normalizedIndex = array.size() + normalizedIndex; // Handle negative indices
                }
                if (normalizedIndex >= 0 && normalizedIndex < array.size()) {
                    Number currentValue = Utils.toNumber(array.get(normalizedIndex), "prefix expression");
                    JexNumber newValue = JexValue.fromNumber(ctx.INCREMENT() != null ? currentValue.doubleValue() + 1 : currentValue.doubleValue() - 1);
                    array.set(normalizedIndex, newValue);
                    return newValue;
                }
                return new JexNull(); // if out of bounds just return JexNull, don't throw any errors.
            } else if (object != null && object.isObject()) {
                String key = Utils.toString(propertyKey, "prefix expression");
                Number currentValue = Utils.toNumber(object.asObject("prefix expression").getOrDefault(key, new JexNull()), "prefix expression");
                JexNumber newValue = JexValue.fromNumber(ctx.INCREMENT() != null ? currentValue.doubleValue() + 1 : currentValue.doubleValue() - 1);
                object.asObject("prefix expression").put(key, newValue);
                return newValue;
            }
        } else {
            // For other expressions, we'll just calculate but not store
            JexValue value = this.visit(expr);
            Number number = Utils.toNumber(value, "prefix expression");
            if (ctx.DECREMENT() != null) {
                return JexValue.fromNumber(number.doubleValue() - 1);
            } else if (ctx.INCREMENT() != null) {
                return JexValue.fromNumber(number.doubleValue() + 1);
            }
            return new JexNull();
        }

        return new JexNull();
    }

    @Override
    public JexValue visitPostfixExpression(JexLangParser.PostfixExpressionContext ctx) {
        JexLangParser.SingleExpressionContext expr = ctx.singleExpression();

        // Handle identifier expression (variables)
        if (expr instanceof JexLangParser.IdentifierExpressionContext) {
            String varName = ((JexLangParser.IdentifierExpressionContext) expr).IDENTIFIER().getText();
            if (!this.scope.hasVariable(varName)) {
                throw new UndefinedVariableError(varName);
            }

            JexValue value = this.scope.getVariable(varName);
            Number numberValue = Utils.toNumber(value, "postfix expression");
            JexNumber newValue = JexValue.fromNumber(ctx.INCREMENT() != null ? numberValue.doubleValue() + 1 : numberValue.doubleValue() - 1);
            this.scope.assignVariable(varName, newValue);
            return value; // return the original value before increment/decrement
        }
        // Handle property access expressions (obj.prop and obj[prop])
        else if (expr instanceof JexLangParser.MemberDotExpressionContext) {
            JexValue object = this.visit(((JexLangParser.MemberDotExpressionContext) expr).singleExpression());
            JexValue propertyName = this.visit(((JexLangParser.MemberDotExpressionContext) expr).objectPropertyName());
            if (object == null || !object.isObject()) {
                throw new JexLangRuntimeError("Cannot use postfix operator on a non-object property");
            }
            Number currentValue = Utils.toNumber(object.asObject("postfix expression").getOrDefault(propertyName.asString("postfix expression"), new JexNull()), "postfix expression");
            JexNumber newValue = JexValue.fromNumber(ctx.INCREMENT() != null ? currentValue.doubleValue() + 1 : currentValue.doubleValue() - 1);
            object.asObject("postfix expression").put(propertyName.asString("postfix expression"), newValue);
            return JexValue.fromNumber(currentValue); // return the original value before increment/decrement
        } else if (expr instanceof JexLangParser.MemberIndexExpressionContext) {
            JexValue object = this.visit(((JexLangParser.MemberIndexExpressionContext) expr).singleExpression());
            JexValue propertyKey = this.visit(((JexLangParser.MemberIndexExpressionContext) expr).expressionSequence());
            if (object != null && object.isArray()) {
                List<JexValue> array = object.asArray("postfix expression");
                Number indexNumber = Utils.toNumber(propertyKey, "postfix expression");
                int normalizedIndex = Double.isNaN(indexNumber.doubleValue()) ? -1 : indexNumber.intValue();
                if (normalizedIndex < 0) {
                    normalizedIndex = array.size() + normalizedIndex; // Handle negative indices
                }
                if (normalizedIndex >= 0 && normalizedIndex < array.size()) {
                    Number currentValue = Utils.toNumber(array.get(normalizedIndex), "postfix expression");
                    JexNumber newValue = JexValue.fromNumber(ctx.INCREMENT() != null ? currentValue.doubleValue() + 1 : currentValue.doubleValue() - 1);
                    array.set(normalizedIndex, newValue);
                    return JexValue.fromNumber(currentValue); // return the original value before increment/decrement
                }
                return new JexNull(); // if out of bounds just return JexNull, don't throw any errors.
            } else if (object != null && object.isObject()) {
                String key = Utils.toString(propertyKey, "postfix expression");
                Number currentValue = Utils.toNumber(object.asObject("postfix expression").getOrDefault(key, new JexNull()), "postfix expression");
                JexNumber newValue = JexValue.fromNumber(ctx.INCREMENT() != null ? currentValue.doubleValue() + 1 : currentValue.doubleValue() - 1);
                object.asObject("postfix expression").put(key, newValue);
                return JexValue.fromNumber(currentValue); // return the original value before increment/decrement
            }
        } else {
            // For other expressions, we'll just calculate but not store
            JexValue value = this.visit(expr);
            Number number = Utils.toNumber(value, "postfix expression");
            if (ctx.DECREMENT() != null) {
                return JexValue.fromNumber(number.doubleValue() - 1);
            } else if (ctx.INCREMENT() != null) {
                return JexValue.fromNumber(number.doubleValue() + 1);
            }
            return new JexNull();
        }

        return new JexNull();
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

    @Override
    public JexValue visitIfExpression(JexLangParser.IfExpressionContext ctx) {
        JexValue condition = this.visit(ctx.expressionSequence());
        // empty array and objects are falsy
        if (Utils.toBoolean(condition, "if expression")) {
            return this.visit(ctx.block());
        }

        if (ctx.elseIfStatement() != null) {
            return this.visit(ctx.elseIfStatement());
        }

        return new JexNull();
    }

    @Override
    public JexValue visitElseIfClause(JexLangParser.ElseIfClauseContext ctx) {
        JexValue condition = this.visit(ctx.expressionSequence());
        // empty array and objects are falsy
        if (Utils.toBoolean(condition, "else if expression")) {
            return this.visit(ctx.block());
        }

        if (ctx.elseIfStatement() != null) {
            return this.visit(ctx.elseIfStatement());
        }

        return new JexNull();
    }

    @Override
    public JexValue visitElseClause(JexLangParser.ElseClauseContext ctx) {
        return this.visit(ctx.block());
    }
}

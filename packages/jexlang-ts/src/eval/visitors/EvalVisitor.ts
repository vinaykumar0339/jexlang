import JexLangVisitor from "../../grammar/JexLangVisitor";
import * as JexLangParser from "../../grammar/JexLangParser";
import { ErrorNode, ParseTree } from "antlr4";
import { type Context, type FuncImpl, type FuncRegistry, type JexValue, MapFuncRegistry, type TransformImpl, type TransformRegistry, MapTransformRegistry, type MaybePromise } from "../../types";
import { BUILT_IN_FUNCTIONS } from "../functions";
import { BUILT_IN_TRANSFORMS } from "../transforms";
import { toNumber, toString } from "../../utils";
import { DivisionByZeroError, JexLangRuntimeError, UndefinedVariableError, UndefinedFunctionError, JexLangSyntaxError, UndefinedTransformError } from "../errors/errors";
import { ScopeStack } from "../scopes";

export class EvalVisitor extends JexLangVisitor<MaybePromise<JexValue>> {

    private context: Context = {};
    private funcRegistry: FuncRegistry;
    private transformRegistry: TransformRegistry;
    private scopeStack: ScopeStack = new ScopeStack();

    constructor(context?: Context, funcsMap?: Record<string, FuncImpl>, transformsMap?: Record<string, TransformImpl>) {
        super();

        this.context = context ? { ...context } : {};

        this.context = {
            ...this.context,
            ...this.mathConstants(),
        };

        this.funcRegistry = new MapFuncRegistry({
          ...BUILT_IN_FUNCTIONS,
          ...funcsMap
        });

        this.transformRegistry = new MapTransformRegistry({
          ...BUILT_IN_TRANSFORMS,
          ...transformsMap
        });
    }

    private mathConstants() {
        return {
            PI: Math.PI,
            E: Math.E,
            LN2: Math.LN2,
            LN10: Math.LN10,
            LOG2E: Math.LOG2E,
            LOG10E: Math.LOG10E,
            SQRT1_2: Math.SQRT1_2,
            SQRT2: Math.SQRT2
        };
    }

    public setContext(context: Context): void {
        this.context = context;
    }

    public setVariable(name: string, value: JexValue): void {
        this.context[name] = value;
    }

    public getVariable(name: string): JexValue | undefined {
        return this.context[name];
    }

    public addFunction(name: string, func: FuncImpl): void {
        if (this.funcRegistry instanceof MapFuncRegistry) {
            this.funcRegistry.set(name, func);
        }
    }

    public addTransform(name: string, transform: TransformImpl): void {
        if (this.transformRegistry instanceof MapTransformRegistry) {
            this.transformRegistry.set(name, transform);
        }
    }

    public getContext(): Context {
        return { ...this.context };
    }

    public clearVariables(): void {
        this.context = this.mathConstants();
    }

    private handlePromise<T>(value: MaybePromise<T>, handler: (resolved: T) => MaybePromise<T>): MaybePromise<T> {
        if (value instanceof Promise) {
            return value.then(resolved => {
                try {
                    return handler(resolved);
                } catch (error) {
                    if (error instanceof JexLangRuntimeError) {
                        throw error;
                    }
                    throw new JexLangRuntimeError(`Error in operation: ${error instanceof Error ? error.message : String(error)}`);
                }
            }).catch(error => {
                if (error instanceof JexLangRuntimeError) {
                    throw error;
                }
                throw new JexLangRuntimeError(`Promise rejected: ${error instanceof Error ? error.message : String(error)}`);
            });
        }

        try {
            return handler(value);
        } catch (error) {
            if (error instanceof JexLangRuntimeError) {
                throw error;
            }
            throw new JexLangRuntimeError(`Error in operation: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    private handlePromises<T, K extends T[]>(values: MaybePromise<T>[],
                                            handler: (...resolved: K) => MaybePromise<T>): MaybePromise<T | T[]> {
        if (values.some(val => val instanceof Promise)) {
            return Promise.all(values.map(val => val instanceof Promise ? val : Promise.resolve(val)))
                .then(resolved => {
                    try {
                        return handler(...resolved as K);
                    } catch (error) {
                        if (error instanceof JexLangRuntimeError) {
                            throw error;
                        }
                        throw new JexLangRuntimeError(`Error in operation: ${error instanceof Error ? error.message : String(error)}`);
                    }
                })
                .catch(error => {
                    if (error instanceof JexLangRuntimeError) {
                        throw error;
                    }
                    throw new JexLangRuntimeError(`Promise rejected: ${error instanceof Error ? error.message : String(error)}`);
                });
        }

        try {
            return handler(...values as K);
        } catch (error) {
            if (error instanceof JexLangRuntimeError) {
                throw error;
            }
            throw new JexLangRuntimeError(`Error in operation: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    private handleBinaryOp(left: MaybePromise<JexValue>,
                          right: MaybePromise<JexValue>,
                          operation: (l: JexValue, r: JexValue) => JexValue): MaybePromise<JexValue> {
        return this.handlePromises([left, right], (l, r) => operation(l, r));
    }

    private handleVarModification(
        variableName: string,
        modifyFn: (currentValue: JexValue) => { newValue: JexValue, result: JexValue }
    ): MaybePromise<JexValue> {
        let currentValue: MaybePromise<JexValue>;

        if (this.scopeStack.has(variableName)) {
            currentValue = this.scopeStack.get(variableName)!;
        } else if (variableName in this.context) {
            currentValue = this.context[variableName];
        } else {
            throw new UndefinedVariableError(variableName);
        }

        return this.handlePromise(currentValue, (resolvedValue) => {
            const { newValue, result } = modifyFn(resolvedValue);

            if (this.scopeStack.has(variableName)) {
                this.scopeStack.set(variableName, newValue);
            } else {
                this.context[variableName] = newValue;
            }

            return result;
        });
    }

    visitProgram = (ctx: JexLangParser.ProgramContext): MaybePromise<JexValue> => {
        this.pushScope();

        try {
            const statements: ParseTree[] = [];

            // Collect all non-EOF statements
            for (let i = 0; i < ctx.statement_list().length; i++) {
                statements.push(ctx.statement(i));
            }
            
            if (statements.length === 0) {
                return null;
            }

            // Process statements sequentially, chaining Promises only if needed
            let hasPromise = false;
            let lastResult: MaybePromise<JexValue> = null;

            for (let i = 0; i < statements.length; i++) {
                const statementResult = this.visit(statements[i]);
                if (hasPromise) {
                    lastResult = (lastResult as Promise<JexValue>).then(() => statementResult);
                } else if (statementResult instanceof Promise) {
                    hasPromise = true;
                    lastResult = Promise.resolve(lastResult).then(() => statementResult);
                } else {
                    lastResult = statementResult;
                }
            }

            if (hasPromise) {
                return (lastResult as Promise<JexValue>).then(result => result ?? null);
            }
            return lastResult ?? null;
        } finally {
            this.popScope();
        }
    }

    visitStatement = (ctx: JexLangParser.StatementContext): MaybePromise<JexValue> => {
        if (ctx.assignment()) {
            return this.visit(ctx.assignment()!);
        } else if (ctx.expression()) {
            return this.visit(ctx.expression()!);
        } else if (ctx.propertyAssignment()) {
            return this.visit(ctx.propertyAssignment()!);
        } else if (ctx.localDeclaration()) {
            return this.visit(ctx.localDeclaration()!);
        }
        return null;
    }

    visitLocalDeclaration = (ctx: JexLangParser.LocalDeclarationContext): MaybePromise<JexValue> => {
        const variableName = ctx.IDENTIFIER().getText();
        const value = this.visit(ctx.expression());

        return this.handlePromise(value, resolvedValue => {
            this.scopeStack.set(variableName, resolvedValue);
            return resolvedValue;
        });
    }

    visitAssignment = (ctx: JexLangParser.AssignmentContext): MaybePromise<JexValue> => {
        const variableName = ctx.IDENTIFIER().getText();
        const value = this.visit(ctx.expression());

        return this.handlePromise(value, resolvedValue => {
            this.context[variableName] = resolvedValue;
            return resolvedValue;
        });
    }

    visitPowerExpression = (ctx: JexLangParser.PowerExpressionContext): MaybePromise<JexValue> => {
        const left = this.visit(ctx.expression(0));
        const right = this.visit(ctx.expression(1));

        return this.handleBinaryOp(left, right, (resolvedLeft, resolvedRight) => {
            return Math.pow(toNumber(resolvedLeft), toNumber(resolvedRight));
        });
    }

    visitSquareRootExpression = (ctx: JexLangParser.SquareRootExpressionContext): MaybePromise<JexValue> => {
        const value = this.visit(ctx.expression());

        return this.handlePromise(value, resolvedValue => {
            const numValue = Number(resolvedValue);

            if (isNaN(numValue)) {
                throw new JexLangRuntimeError(`Cannot calculate square root of non-numeric value: ${resolvedValue}`);
            }

            if (numValue < 0) {
                throw new JexLangRuntimeError(`Cannot calculate square root of negative number: ${numValue}`);
            }

            return Math.sqrt(numValue);
        });
    }

    visitUnaryMinusExpression = (ctx: JexLangParser.UnaryMinusExpressionContext): MaybePromise<JexValue> => {
        const value = this.visit(ctx.expression());
        return this.handlePromise(value, resolvedValue => -toNumber(resolvedValue));
    }

    visitUnaryPlusExpression = (ctx: JexLangParser.UnaryPlusExpressionContext): MaybePromise<JexValue> => {
        const value = this.visit(ctx.expression());
        return this.handlePromise(value, resolvedValue => toNumber(resolvedValue));
    }

    visitMulDivModExpression = (ctx: JexLangParser.MulDivModExpressionContext): MaybePromise<JexValue> => {
        const left = this.visit(ctx.expression(0));
        const right = this.visit(ctx.expression(1));
        const operator = ctx.getChild(1).getText();

        return this.handleBinaryOp(left, right, (leftVal, rightVal) => {
            const leftNum = toNumber(leftVal);
            const rightNum = toNumber(rightVal);

            switch (operator) {
                case '*':
                    return leftNum * rightNum;
                case '/':
                    if (rightNum === 0) {
                        throw new DivisionByZeroError();
                    }
                    return leftNum / rightNum;
                case '%':
                    if (rightNum === 0) {
                        throw new DivisionByZeroError();
                    }
                    return leftNum % rightNum;
                default:
                    throw new JexLangRuntimeError(`Unknown operator: ${operator}`);
            }
        });
    }

    visitAddSubExpression = (ctx: JexLangParser.AddSubExpressionContext): MaybePromise<JexValue> => {
        const left = this.visit(ctx.expression(0));
        const right = this.visit(ctx.expression(1));
        const operator = ctx.getChild(1).getText();

        return this.handleBinaryOp(left, right, (leftVal, rightVal) => {
            if (operator === '+' && (typeof leftVal === 'string' || typeof rightVal === 'string')) {
                return toString(leftVal) + toString(rightVal);
            }

            const leftNum = toNumber(leftVal);
            const rightNum = toNumber(rightVal);

            switch (operator) {
                case '+':
                    return leftNum + rightNum;
                case '-':
                    return leftNum - rightNum;
                default:
                    throw new JexLangRuntimeError(`Unknown operator: ${operator}`);
            }
        });
    }

    visitComparatorExpression = (ctx: JexLangParser.ComparatorExpressionContext): MaybePromise<JexValue> => {
        const left = this.visit(ctx.expression(0));
        const right = this.visit(ctx.expression(1));
        const operator = ctx.getChild(1).getText();

        return this.handleBinaryOp(left, right, (leftVal, rightVal) => {
            switch (operator) {
                case '==':
                    return leftVal == rightVal;
                case '!=':
                    return leftVal != rightVal;
                case '<':
                    return (leftVal == null ? 0 : leftVal) < (rightVal == null ? 0 : rightVal);
                case '>':
                    return (leftVal == null ? 0 : leftVal) > (rightVal == null ? 0 : rightVal);
                case '<=':
                    return (leftVal == null ? 0 : leftVal) <= (rightVal == null ? 0 : rightVal);
                case '>=':
                    return (leftVal == null ? 0 : leftVal) >= (rightVal == null ? 0 : rightVal);
                default:
                    throw new JexLangRuntimeError(`Unknown comparator operator: ${operator}`);
            }
        });
    }

    visit(tree: ParseTree): MaybePromise<JexValue> {
        return super.visit(tree);
    }

    visitParenthesizedExpression = (ctx: JexLangParser.ParenthesizedExpressionContext): MaybePromise<JexValue> => {
        return this.visit(ctx.expression());
    }

    visitFunctionCallExpression = (ctx: JexLangParser.FunctionCallExpressionContext): MaybePromise<JexValue> => {
        return this.visit(ctx.functionCall());
    }

    visitVariableExpression = (ctx: JexLangParser.VariableExpressionContext): MaybePromise<JexValue> => {
        const variableName = ctx.IDENTIFIER().getText();

        if (this.scopeStack.has(variableName)) {
            const value = this.scopeStack.get(variableName)!;
            return value;
        }

        if (variableName in this.context) {
            const value = this.context[variableName];
            return value;
        }

        throw new UndefinedVariableError(variableName);
    }

    visitNumberExpression = (ctx: JexLangParser.NumberExpressionContext): MaybePromise<JexValue> => {
        return parseFloat(ctx.NUMBER().getText());
    }

    visitBooleanExpression = (ctx: JexLangParser.BooleanExpressionContext): MaybePromise<JexValue> => {
        return ctx.BOOLEAN().getText() === "true";
    }

    visitFunctionCall = (ctx: JexLangParser.FunctionCallContext): MaybePromise<JexValue> => {
        const functionName = ctx.IDENTIFIER().getText();

        if (!this.funcRegistry.has(functionName)) {
            throw new UndefinedFunctionError(functionName);
        }

        const args: MaybePromise<JexValue[]> = ctx.argumentList() ? this.visit(ctx.argumentList()) as MaybePromise<JexValue[]> : [];

        try {
            if (args instanceof Promise) {
                return args.then(resolvedArgs => {
                    return this.handlePromise(this.funcRegistry.call(functionName, resolvedArgs), res => res);
                }).catch(error => {
                    if (error instanceof JexLangRuntimeError) {
                        throw error;
                    } else {
                        throw new JexLangRuntimeError(
                            `Error calling function '${functionName}': ${error instanceof Error ? error.message : String(error)}`
                        );
                    }
                });
            } else {
                return this.handlePromises(args, (...resolvedArgs) => {
                    return this.handlePromise(this.funcRegistry.call(functionName, resolvedArgs), res => res);
                });
            }
        } catch (error) {
            throw new JexLangRuntimeError(
                `Error calling function '${functionName}': ${error instanceof Error ? error.message : String(error)}`
            );
        }
    }

    visitArgumentList = (ctx: JexLangParser.ArgumentListContext): MaybePromise<JexValue[]> => {
        const argPromises: MaybePromise<JexValue>[] = [];
        for (let i = 0; i < ctx.expression_list().length; i++) {
            argPromises.push(this.visit(ctx.expression(i)));
        }

        return this.handlePromises(argPromises, (...resolvedArgs) => resolvedArgs) as MaybePromise<JexValue[]>;
    }

    visitStringExpression = (ctx: JexLangParser.StringExpressionContext): MaybePromise<JexValue> => {
        return ctx.STRING().getText().slice(1, -1);
    };

    visitDotPropertyAccessExpression = (ctx: JexLangParser.DotPropertyAccessExpressionContext): MaybePromise<JexValue> => {
        const objPromise = this.visit(ctx.expression());
        const prop = ctx.IDENTIFIER().getText();

        return this.handlePromise(objPromise, obj => {
            if (
                obj &&
                typeof obj === "object" &&
                !Array.isArray(obj) &&
                prop in obj
            ) {
                return obj[prop];
            }
            return null;
        });
    }

    visitDotPropertyAssignment = (ctx: JexLangParser.DotPropertyAssignmentContext): MaybePromise<JexValue> => {
        const objPromise = this.visit(ctx.expression(0));
        const prop = ctx.IDENTIFIER().getText();
        const valuePromise = this.visit(ctx.expression(1));

        return this.handlePromises([objPromise, valuePromise], (obj, value) => {
            const isObject = obj && typeof obj === "object" && !Array.isArray(obj);

            if (isObject) {
                (obj as { [k: string]: JexValue })[prop] = value;
                return value;
            }

            return null;
        });
    }

    visitBracketPropertyAccessExpression = (ctx: JexLangParser.BracketPropertyAccessExpressionContext): MaybePromise<JexValue> => {
        const objPromise = this.visit(ctx.expression(0));
        const propPromise = this.visit(ctx.expression(1));

        return this.handlePromises([objPromise, propPromise], (obj, prop) => {
            if (
                obj &&
                typeof obj === "object" &&
                prop !== null &&
                prop !== undefined
            ) {
                if (Array.isArray(obj)) {
                    const index = typeof prop === "number" ? prop : Number(prop);
                    const normalizedIndex = index < 0 ? obj.length + index : index;
                    if (!isNaN(normalizedIndex) && normalizedIndex >= 0 && normalizedIndex < obj.length) {
                        return obj[normalizedIndex];
                    }
                } else if (typeof prop === "string" || typeof prop === "number" || typeof prop === "symbol") {
                    if (prop in obj) {
                        return obj[prop];
                    }
                }
            }
            return null;
        });
    }

    visitBracketPropertyAssignment = (ctx: JexLangParser.BracketPropertyAssignmentContext): MaybePromise<JexValue> => {
        const objPromise = this.visit(ctx.expression(0));
        const propPromise = this.visit(ctx.expression(1));
        const valuePromise = this.visit(ctx.expression(2));

        return this.handlePromises(
            [objPromise, propPromise, valuePromise],
            (obj, prop, value) => {
                if (
                    obj &&
                    typeof obj === "object" &&
                    prop !== null &&
                    prop !== undefined
                ) {
                    if (Array.isArray(obj)) {
                        const index = typeof prop === "number" ? prop : Number(prop);
                        const normalizedIndex = index < 0 ? obj.length + index : index;
                        if (!isNaN(normalizedIndex) && normalizedIndex >= 0 && normalizedIndex < obj.length) {
                            obj[normalizedIndex] = value;
                            return value;
                        }
                    } else if (typeof prop === "string" || typeof prop === "number" || typeof prop === "symbol") {
                        obj[prop] = value;
                        return value;
                    }
                }
                return null;
            }
        );
    }

    visitTransformExpression = (ctx: JexLangParser.TransformExpressionContext): MaybePromise<JexValue> => {
        const input = this.visit(ctx.expression());
        const transformName = ctx.IDENTIFIER().getText();

        return this.handlePromise(input, (resolvedInput) => {
            if (this.transformRegistry.has(transformName)) {
                try {
                    return this.transformRegistry.transform(transformName, resolvedInput);
                } catch (error) {
                    throw new JexLangRuntimeError(
                        `Error in transform '${transformName}': ${error instanceof Error ? error.message : String(error)}`
                    );
                }
            }

            if (this.funcRegistry.has(transformName)) {
                try {
                    return this.funcRegistry.call(transformName, [resolvedInput]);
                } catch (error) {
                    throw new JexLangRuntimeError(
                        `Error in transform '${transformName}': ${error instanceof Error ? error.message : String(error)}`
                    );
                }
            }

            throw new UndefinedTransformError(transformName);
        });
    }

    visitLogicalAndExpression = (ctx: JexLangParser.LogicalAndExpressionContext): MaybePromise<JexValue> => {
        const left = this.visit(ctx.expression(0));
        
        return this.handlePromise(left, resolvedLeft => {
            if (!resolvedLeft) {
                return resolvedLeft;
            }

            return this.visit(ctx.expression(1));
        });
    }

    visitLogicalOrExpression = (ctx: JexLangParser.LogicalOrExpressionContext): MaybePromise<JexValue> => {
        const left = this.visit(ctx.expression(0));

        return this.handlePromise(left, (resolvedLeft) => {
            if (resolvedLeft) {
                return resolvedLeft; // no need to evaluate the right if left is already true.
            }

            return this.visit(ctx.expression(1));
        });
    }

    visitTernaryExpression = (ctx: JexLangParser.TernaryExpressionContext): MaybePromise<JexValue> => {
        const condition = this.visit(ctx.expression(0));

        return this.handlePromise(condition, (resolvedCondition) => {
            if (resolvedCondition != null && resolvedCondition != undefined) {
                return this.visit(ctx.expression(1));
            } else {
                return this.visit(ctx.expression(2));
            }
        });
    }

    visitShortTernaryExpression = (ctx: JexLangParser.ShortTernaryExpressionContext): MaybePromise<JexValue> => {
        const condition = this.visit(ctx.expression(0));

        return this.handlePromise(condition, (resolvedCondition) => {
            if (resolvedCondition != null && resolvedCondition != undefined) {
                return resolvedCondition;
            } else 
                return this.visit(ctx.expression(1));

        });
    }

    visitErrorNode(node: ErrorNode): JexValue {
        const location = {
            line: node.symbol?.line || 0,
            column: node.symbol?.column || 0,
            offendingSymbol: node.getText() || null
        };

        let errorMessage = "Syntax error";

        if (node.symbol) {
            const tokenType = node.symbol.type;
            const tokenText = this.escapeTokenText(node.symbol.text || '');

            if (tokenType >= 0) {
                errorMessage = `Unexpected token '${tokenText}'`;
            } else {
                errorMessage = `Invalid syntax near '${tokenText}'`;
            }

            if (node.symbol.line > 0) {
                errorMessage += ` at line ${node.symbol.line}:${node.symbol.column + 1}`;
            }
        } else {
            errorMessage = `Syntax error encountered: ${node.getText()}`;
        }

        throw new JexLangSyntaxError(errorMessage, location);
    }

    private escapeTokenText(text: string): string {
        return text
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
    }

    protected defaultResult(): JexValue {
        return null;
    }

    private pushScope(): void {
        this.scopeStack.pushScope();
    }

    private popScope(): void {
        this.scopeStack.popScope();
    }

    visitPrefixIncrementExpression = (ctx: JexLangParser.PrefixIncrementExpressionContext): MaybePromise<JexValue> => {
        const expr = ctx.expression();
        if (!(expr instanceof JexLangParser.VariableExpressionContext)) {
            throw new JexLangRuntimeError("Increment operator can only be applied to variables");
        }

        const variableName = expr.IDENTIFIER().getText();

        return this.handleVarModification(
            variableName,
            (currentValue) => {
                const numValue = toNumber(currentValue);
                const newValue = numValue + 1;
                return { newValue, result: newValue };
            }
        );
    }

    visitPrefixDecrementExpression = (ctx: JexLangParser.PrefixDecrementExpressionContext): MaybePromise<JexValue> => {
        const expr = ctx.expression();
        if (!(expr instanceof JexLangParser.VariableExpressionContext)) {
            throw new JexLangRuntimeError("Decrement operator can only be applied to variables");
        }

        const variableName = expr.IDENTIFIER().getText();

        return this.handleVarModification(
            variableName,
            (currentValue) => {
                const numValue = toNumber(currentValue);
                const newValue = numValue - 1;
                return { newValue, result: newValue };
            }
        );
    }

    visitPostfixIncrementExpression = (ctx: JexLangParser.PostfixIncrementExpressionContext): MaybePromise<JexValue> => {
        const expr = ctx.expression();
        if (!(expr instanceof JexLangParser.VariableExpressionContext)) {
            throw new JexLangRuntimeError("Increment operator can only be applied to variables");
        }

        const variableName = expr.IDENTIFIER().getText();

        return this.handleVarModification(
            variableName,
            (currentValue) => {
                const numValue = toNumber(currentValue);
                const newValue = numValue + 1;
                return { newValue, result: numValue };
            }
        );
    }

    visitPostfixDecrementExpression = (ctx: JexLangParser.PostfixDecrementExpressionContext): MaybePromise<JexValue> => {
        const expr = ctx.expression();
        if (!(expr instanceof JexLangParser.VariableExpressionContext)) {
            throw new JexLangRuntimeError("Decrement operator can only be applied to variables");
        }

        const variableName = expr.IDENTIFIER().getText();

        return this.handleVarModification(
            variableName,
            (currentValue) => {
                const numValue = toNumber(currentValue);
                const newValue = numValue - 1;
                return { newValue, result: numValue };
            }
        );
    }

    visitObjectLiteral = (ctx: JexLangParser.ObjectLiteralContext): MaybePromise<JexValue> => {
        const obj: Record<string, JexValue> = {};
        const propertyPromises: MaybePromise<JexValue>[] = [];

        for (let i = 0; i < ctx.objectProperty_list().length; i++) {
            propertyPromises.push(this.visit(ctx.objectProperty(i)));
        }

        return this.handlePromises(propertyPromises, (...resolvedProps) => {
            for (const prop of resolvedProps) {
                if (prop && typeof prop === 'object' && !Array.isArray(prop)) {
                    Object.assign(obj, prop);
                }
            }
            return obj;
        });
    }

    visitObjectProperty = (ctx: JexLangParser.ObjectPropertyContext): MaybePromise<JexValue> => {
        const obj: Record<string, JexValue> = {};
        let key: string | null = null;

        if (ctx.IDENTIFIER()) {
            const idText = ctx.IDENTIFIER().getText();
            if (this.scopeStack.has(idText)) {
                const keyValue = this.scopeStack.get(idText);
                if (keyValue !== null && keyValue !== undefined) {
                    key = toString(keyValue);
                }
            } else if (idText in this.context) {
                const keyValue = this.context[idText];
                if (keyValue !== null && keyValue !== undefined) {
                    key = toString(keyValue);
                }
            }
        } else if (ctx.STRING()) {
            key = ctx.STRING().getText().slice(1, -1);
        }

        return this.handlePromise(this.visit(ctx.expression()), resolvedValue => {
            if (key !== null && key !== undefined && key.length > 0) {
                obj[toString(key)] = resolvedValue;
            }
            return obj;
        });
    }

    visitArrayLiteral = (ctx: JexLangParser.ArrayLiteralContext): MaybePromise<JexValue> => {
        const argPromises: MaybePromise<JexValue>[] = [];

        for (let i = 0; i < ctx.expression_list().length; i++) {
            argPromises.push(this.visit(ctx.expression(i)));
        }

        return this.handlePromises(argPromises, (...resolvedArgs) => resolvedArgs);
    }

    visitArrayLiteralExpression = (ctx: JexLangParser.ArrayLiteralExpressionContext): MaybePromise<JexValue> => {
        return this.visit(ctx.arrayLiteral());
    }

    visitObjectLiteralExpression = (ctx: JexLangParser.ObjectLiteralExpressionContext): MaybePromise<JexValue> => {
        return this.visit(ctx.objectLiteral());
    }
}

export function createDefaultFuncRegistry(): MapFuncRegistry {
    return new MapFuncRegistry(BUILT_IN_FUNCTIONS);
}

export function createDefaultTransformRegistry(): MapTransformRegistry {
    return new MapTransformRegistry(BUILT_IN_TRANSFORMS);
}
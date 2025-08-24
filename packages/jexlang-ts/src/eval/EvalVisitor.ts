import JexLangVisitor from "../grammer/JexLangVisitor";
import * as JexLangParser from "../grammer/JexLangParser";
import { ParseTree } from "antlr4";
import { Context, FuncImpl, FuncRegistry, JexValue, MapFuncRegistry, TransformImpl, TransformRegistry, MapTransformRegistry } from "../types";
import { BUILT_IN_FUNCTIONS } from "./functions";
import { BUILT_IN_TRANSFORMS } from "./transforms/builtin";
import { toNumber, toString } from "../utils";
import { DivisionByZeroError, JexLangRuntimeError, UndefinedVariableError, UndefinedFunctionError } from "./errors";
import { ScopeStack } from "./ScopeStack";

export class EvalVisitor extends JexLangVisitor<JexValue> {
    private context: Context = {};
    private funcRegistry: FuncRegistry;
    private transformRegistry: TransformRegistry;
    private scopeStack: ScopeStack = new ScopeStack();

    constructor(context?: Context, funcsMap?: Record<string, FuncImpl>, transformsMap?: Record<string, TransformImpl>) {
        super();
        
        // Initialize context with provided values or defaults
        this.context = context ? { ...context } : {};
        
        // Add mathematical constants
        this.context = {
            ...this.context,
            ...this.mathConstants(),
        };

        // Initialize registries
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

    // Public methods for external variable/function management
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

    visitProgram = (ctx: JexLangParser.ProgramContext): JexValue => {
        // Create a new scope for this program execution
        this.pushScope();
        
        let result!: JexValue;
        const childCount = ctx.getChildCount();
        
        try {
            for (let i = 0; i < childCount; i++) {
                const statement = ctx.getChild(i);
                if (i == childCount - 1) {
                    // Last statement, return null so skip last item
                    continue;
                    
                }
                result = this.visit(statement);
            }
        } finally {
            // Ensure we pop the scope when done
            this.popScope();
        }
        
        return result;
    }

    visitStatement = (ctx: JexLangParser.StatementContext): JexValue => {
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

    visitLocalDeclaration = (ctx: JexLangParser.LocalDeclarationContext): JexValue => {
        const variableName = ctx.IDENTIFIER().getText();
        const value = this.visit(ctx.expression());
        
        // Set in current scope, not in the global context
        this.scopeStack.set(variableName, value);
        return value;
    }

    visitAssignment = (ctx: JexLangParser.AssignmentContext): JexValue => {
        const variableName = ctx.IDENTIFIER().getText();
        const value = this.visit(ctx.expression());
        this.context[variableName] = value;
        console.log(this.context);
        return value;
    }

    visitPowerExpression = (ctx: JexLangParser.PowerExpressionContext): JexValue => {
        const left = this.visit(ctx.expression(0));
        const right = this.visit(ctx.expression(1));
        return Math.pow(toNumber(left), toNumber(right));
    }

    visitUnaryMinusExpression = (ctx: JexLangParser.UnaryMinusExpressionContext): JexValue => {
        return -toNumber(this.visit(ctx.expression()));
    }

    visitUnaryPlusExpression = (ctx: JexLangParser.UnaryPlusExpressionContext): JexValue => {
        return toNumber(this.visit(ctx.expression()));
    }

    visitMulDivModExpression = (ctx: JexLangParser.MulDivModExpressionContext): JexValue => {
        const left = this.visit(ctx.expression(0));
        const right = this.visit(ctx.expression(1));
        const operator = ctx.getChild(1).getText();
        
        const leftNum = toNumber(left);
        const rightNum = toNumber(right);

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
    }

    visitAddSubExpression = (ctx: JexLangParser.AddSubExpressionContext): JexValue => {
        const left = this.visit(ctx.expression(0));
        const right = this.visit(ctx.expression(1));
        const operator = ctx.getChild(1).getText();

        // Handle string concatenation for +
        if (operator === '+' && (typeof left === 'string' || typeof right === 'string')) {
            return toString(left) + toString(right);
        }

        const leftNum = toNumber(left);
        const rightNum = toNumber(right);

        switch (operator) {
            case '+':
                return leftNum + rightNum;
            case '-':
                return leftNum - rightNum;
            default:
                throw new JexLangRuntimeError(`Unknown operator: ${operator}`);
        }
    }

    visitComparatorExpression = (ctx: JexLangParser.ComparatorExpressionContext): JexValue => {
        const left = this.visit(ctx.expression(0));
        const right = this.visit(ctx.expression(1));
        const operator = ctx.getChild(1).getText();

        switch (operator) {
            case '==':
                return left === right;
            case '!=':
                return left !== right;
            case '<':
                // JS: null < number => true if number > 0, null < null => false
                return (left == null ? 0 : left) < (right == null ? 0 : right);
            case '>':
                // JS: null > number => false, null > null => false
                return (left == null ? 0 : left) > (right == null ? 0 : right);
            case '<=':
                return (left == null ? 0 : left) <= (right == null ? 0 : right);
            case '>=':
                return (left == null ? 0 : left) >= (right == null ? 0 : right);
            default:
                throw new JexLangRuntimeError(`Unknown comparator operator: ${operator}`);
        }
    }

    visit(tree: ParseTree): JexValue {
        return super.visit(tree);
    }

    visitParenthesizedExpression = (ctx: JexLangParser.ParenthesizedExpressionContext): JexValue => {
        return this.visit(ctx.expression());
    }

    visitFunctionCallExpression = (ctx: JexLangParser.FunctionCallExpressionContext): JexValue => {
        return this.visit(ctx.functionCall());
    }

    // Override to check local variables before context
    visitVariableExpression = (ctx: JexLangParser.VariableExpressionContext): JexValue => {
        const variableName = ctx.IDENTIFIER().getText();
        
        // Check if variable exists in local scope
        if (this.scopeStack.has(variableName)) {
            return this.scopeStack.get(variableName)!;
        }
        
        // Fall back to global context
        if (variableName in this.context) {
            return this.context[variableName];
        }
        
        throw new UndefinedVariableError(variableName);
    }

    visitNumberExpression = (ctx: JexLangParser.NumberExpressionContext): JexValue => {
        return parseFloat(ctx.NUMBER().getText());
    }

    visitFunctionCall = (ctx: JexLangParser.FunctionCallContext): JexValue => {
        const functionName = ctx.IDENTIFIER().getText();

        if (!this.funcRegistry.has(functionName)) {
            throw new UndefinedFunctionError(functionName);
        }

        const args: JexValue[] = [];

        if (ctx.argumentList()) {
            const argList = this.visit(ctx.argumentList()!) as JexValue[];
            args.push(...argList);
        }

        try {
            return this.funcRegistry.call(functionName, args);
        } catch (error) {
            throw new JexLangRuntimeError(
                `Error calling function '${functionName}': ${error instanceof Error ? error.message : String(error)}`
            );
        }
    }

    visitArgumentList = (ctx: JexLangParser.ArgumentListContext): JexValue[] => {
        const childCount = ctx.getChildCount();
        const args: JexValue[] = [];
        for (let i = 0; i < childCount; i++) {
            const arg = this.visit(ctx.getChild(i));
            if (arg !== undefined && arg !== null) {
                args.push(arg);
            }
        }
        return args;
    }

    visitStringExpression = (ctx: JexLangParser.StringExpressionContext): JexValue => {
        return ctx.STRING().getText().slice(1, -1);
    };

    visitDotPropertyAccessExpression = (ctx: JexLangParser.DotPropertyAccessExpressionContext): JexValue => {
        const obj = this.visit(ctx.expression());
        const prop = ctx.IDENTIFIER().getText();
        if (
            obj &&
            typeof obj === "object" &&
            !Array.isArray(obj) &&
            prop in obj
        ) {
            return (obj as { [k: string]: JexValue })[prop];
        }
        return null;
    }

    visitDotPropertyAssignment = (ctx: JexLangParser.DotPropertyAssignmentContext): JexValue => {
        const obj = this.visit(ctx.expression(0));
        const prop = ctx.IDENTIFIER().getText();
        const value = this.visit(ctx.expression(1));

        if (
            obj &&
            typeof obj === "object" &&
            !Array.isArray(obj) &&
            prop in obj
        ) {
            (obj as { [k: string]: JexValue })[prop] = value;
            return value;
        }
        return null;
    }

    visitBracketPropertyAccessExpression = (ctx: JexLangParser.BracketPropertyAccessExpressionContext): JexValue => {
        const obj = this.visit(ctx.expression(0));
        const prop = this.visit(ctx.expression(1));
        if (
            obj &&
            typeof obj === "object" &&
            prop !== null &&
            prop !== undefined
        ) {
            // If obj is array and prop is a valid index
            if (Array.isArray(obj)) {
                const index = typeof prop === "number" ? prop : Number(prop);
                // Support negative indices: -1 is last element, -2 is second last, etc.
                const normalizedIndex = index < 0 ? obj.length + index : index;
                if (!isNaN(normalizedIndex) && normalizedIndex >= 0 && normalizedIndex < obj.length) {
                    return obj[normalizedIndex];
                }
            } else if (typeof prop === "string" || typeof prop === "number" || typeof prop === "symbol") {
                if (prop in obj) {
                    return (obj as { [k: string]: JexValue })[prop as string | number];
                }
            }
        }
        return null;
    }

    visitBracketPropertyAssignment = (ctx: JexLangParser.BracketPropertyAssignmentContext): JexValue => {
        const obj = this.visit(ctx.expression(0));
        const prop = this.visit(ctx.expression(1));
        const value = this.visit(ctx.expression(2));
        if (
            obj &&
            typeof obj === "object" &&
            prop !== null &&
            prop !== undefined
        ) {
            // If obj is array and prop is a valid index
            if (Array.isArray(obj)) {
                const index = typeof prop === "number" ? prop : Number(prop);
                // Support negative indices: -1 is last element, -2 is second last, etc.
                const normalizedIndex = index < 0 ? obj.length + index : index;
                if (!isNaN(normalizedIndex) && normalizedIndex >= 0 && normalizedIndex < obj.length) {
                    obj[normalizedIndex] = value;
                    return value;
                }
            } else if (typeof prop === "string" || typeof prop === "number" || typeof prop === "symbol") {
                if (prop in obj) {
                    (obj as { [k: string]: JexValue })[prop as string | number] = value;
                    return value;
                }
            }
        }
        return null;
    }

    visitTernaryExpression = (ctx: JexLangParser.TernaryExpressionContext): JexValue => {
        const condition = this.visit(ctx.expression(0));
        const trueExpr = this.visit(ctx.expression(1));
        const falseExpr = this.visit(ctx.expression(2));
        return condition ? trueExpr : falseExpr;
    }

    visitShortTernaryExpression = (ctx: JexLangParser.ShortTernaryExpressionContext): JexValue => {
        const condition = this.visit(ctx.expression(0));
        const falseExpr = this.visit(ctx.expression(1));
        return condition ? condition : falseExpr;
    }

    visitBooleanExpression = (ctx: JexLangParser.BooleanExpressionContext): JexValue => {
        return ctx.BOOLEAN().getText() === "true";
    }

    visitObjectLiteralExpression = (ctx: JexLangParser.ObjectLiteralExpressionContext): JexValue => {
        const obj: Record<string, JexValue> = {};
        const objectLiteralCtx = ctx.objectLiteral();
        
        for (let i = 0; i < ctx.objectLiteral().getChildCount(); i++) {
            const propCtx = objectLiteralCtx.objectProperty(i); // Can be Empty Object
            if (propCtx) {
                let key: string | null = null;
                if (propCtx.IDENTIFIER()) {
                    const keyValue = this.context[propCtx.IDENTIFIER().getText()];
                    if (typeof keyValue === "string" || typeof keyValue === "number" || typeof keyValue === "symbol") {
                        key = keyValue.toString();
                    }
                } else if (propCtx.STRING()) {
                    // Support empty string keys
                    key = propCtx.STRING().getText().slice(1, -1);
                } else {
                    key = "";
                }
                if (key) {
                    obj[key] = this.visit(propCtx.expression());
                }
            }
        }
        return obj;
    }

    visitArrayLiteralExpression = (ctx: JexLangParser.ArrayLiteralExpressionContext): JexValue => {
        const arrayLiteralCtx = ctx.arrayLiteral();
        const result: JexValue[] = [];
        
        // Get all array elements
        for (let i = 0; i < arrayLiteralCtx.getChildCount(); i++) {
            const child = arrayLiteralCtx.getChild(i);
            // Skip commas and brackets
            if (child.getText() !== ',' && child.getText() !== '[' && child.getText() !== ']') {
                result.push(this.visit(child));
            }
        }
        
        return result;
    }

    visitTransformExpression = (ctx: JexLangParser.TransformExpressionContext): JexValue => {
        const input = this.visit(ctx.expression());
        const transformName = ctx.IDENTIFIER().getText();
        
        // First check transform registry
        if (this.transformRegistry.has(transformName)) {
            try {
                return this.transformRegistry.transform(transformName, input);
            } catch (error) {
                throw new JexLangRuntimeError(
                    `Error in transform '${transformName}': ${error instanceof Error ? error.message : String(error)}`
                );
            }
        }
        
        // Fall back to function registry
        if (this.funcRegistry.has(transformName)) {
            try {
                return this.funcRegistry.call(transformName, [input]);
            } catch (error) {
                throw new JexLangRuntimeError(
                    `Error in transform '${transformName}': ${error instanceof Error ? error.message : String(error)}`
                );
            }
        }
        
        throw new JexLangRuntimeError(`Unknown transform: ${transformName}`);
    }

    visitLogicalAndExpression = (ctx: JexLangParser.LogicalAndExpressionContext): JexValue => {
        // Implement short-circuit evaluation for AND
        const left = this.visit(ctx.expression(0));
        
        // If left is falsy, return it immediately without evaluating right
        if (!left) {
            return left;
        }
        
        // Otherwise, return the right expression value
        return this.visit(ctx.expression(1));
    }
    
    visitLogicalOrExpression = (ctx: JexLangParser.LogicalOrExpressionContext): JexValue => {
        // Implement short-circuit evaluation for OR
        const left = this.visit(ctx.expression(0));
        
        // If left is truthy, return it immediately without evaluating right
        if (left) {
            return left;
        }
        
        // Otherwise, return the right expression value
        return this.visit(ctx.expression(1));
    }

    // Default visit method for unhandled nodes
    protected defaultResult(): JexValue {
        return null;
    }

    // Add methods to manage the scope stack
    public pushScope(): void {
        this.scopeStack.pushScope();
    }

    public popScope(): void {
        this.scopeStack.popScope();
    }
}

// Factory functions for registries
export function createDefaultFuncRegistry(): MapFuncRegistry {
    return new MapFuncRegistry(BUILT_IN_FUNCTIONS);
}

export function createDefaultTransformRegistry(): MapTransformRegistry {
    return new MapTransformRegistry(BUILT_IN_TRANSFORMS);
}
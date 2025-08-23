import JexLangVisitor from "../grammer/JexLangVisitor";
import * as JexLangParser from "../grammer/JexLangParser";
import { ParseTree } from "antlr4";
import { Context, FuncImpl, FuncRegistry, JexValue, MapFuncRegistry } from "../types";
import { BUILT_IN_FUNCTIONS } from "./functions";
import { toNumber, toString } from "../utils";
import { DivisionByZeroError, JexLangRuntimeError, UndefinedVariableError, UndefinedFunctionError } from "./errors";

export class EvalVisitor extends JexLangVisitor<JexValue> {
    private context: Context = {};
    private funcRegistry: FuncRegistry;

    constructor(context?: Context, funcsMap?: Record<string, FuncImpl>) {
        super();
        
        // Initialize context with provided values or defaults
        this.context = context ? { ...context } : {};
        
        // Add mathematical constants
        this.context = {
            ...this.context,
            PI: Math.PI,
            E: Math.E,
            LN2: Math.LN2,
            LN10: Math.LN10,
            LOG2E: Math.LOG2E,
            LOG10E: Math.LOG10E,
            SQRT1_2: Math.SQRT1_2,
            SQRT2: Math.SQRT2
        };

        // Initialize function registry
        this.funcRegistry = new MapFuncRegistry({
          ...BUILT_IN_FUNCTIONS,
          ...funcsMap
        });
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

    public setFunction(name: string, func: FuncImpl): void {
        if (this.funcRegistry instanceof MapFuncRegistry) {
            this.funcRegistry.set(name, func);
        }
    }

    public getContext(): Context {
        return { ...this.context };
    }

    public clearVariables(): void {
        this.context = {
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

    visitProgram = (ctx: JexLangParser.ProgramContext): JexValue => {
        let result!: JexValue;
        const childCount = ctx.getChildCount();
        for (let i = 0; i < childCount; i++) {
            const statement = ctx.getChild(i);
            if (i == childCount - 1) {
                // Last statement, return null so skip last item
                continue;
                
            }
            result = this.visit(statement);
        }
        return result;
    }

    visitStatement = (ctx: JexLangParser.StatementContext): JexValue => {
        if (ctx.assignment()) {
            return this.visit(ctx.assignment()!);
        } else if (ctx.expression()) {
            return this.visit(ctx.expression()!);
        }
        return null;
    }

    visitAssignment = (ctx: JexLangParser.AssignmentContext): JexValue => {
        const variableName = ctx.IDENTIFIER().getText();
        const value = this.visit(ctx.expression());
        this.context[variableName] = value;
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

    visit(tree: ParseTree): JexValue {
        return super.visit(tree);
    }

    visitParenthesizedExpression = (ctx: JexLangParser.ParenthesizedExpressionContext): JexValue => {
        return this.visit(ctx.expression());
    }

    visitFunctionCallExpression = (ctx: JexLangParser.FunctionCallExpressionContext): JexValue => {
        return this.visit(ctx.functionCall());
    }

    visitVariableExpression = (ctx: JexLangParser.VariableExpressionContext): JexValue => {
        const variableName = ctx.IDENTIFIER().getText();
        
        if (variableName in this.context) {
            return this.context[variableName];
        } else {
            throw new UndefinedVariableError(variableName);
        }
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
            if (arg) {
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

    visitBracketPropertyAccessExpression = (ctx: JexLangParser.BracketPropertyAccessExpressionContext): JexValue => {
        const obj = this.visit(ctx.expression(0));
        const prop = this.visit(ctx.expression(1));
        if (
            obj &&
            typeof obj === "object" &&
            !Array.isArray(obj) &&
            (typeof prop === "string" || typeof prop === "number" || typeof prop === "symbol") &&
            prop !== null &&
            prop !== undefined &&
            prop in obj
        ) {
            return (obj as { [k: string]: JexValue })[prop as string | number];
        }
        return null;
    }

    // Default visit method for unhandled nodes
    protected defaultResult(): JexValue {
        return null;
    }
}

// Factory function to create a default function registry
export function createDefaultFuncRegistry(): MapFuncRegistry {
    return new MapFuncRegistry(BUILT_IN_FUNCTIONS);
}
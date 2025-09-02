import { BinaryExpression, Expression, NumberLiteral, Program, Statement } from "./ast.ts";
import { DivisionByZeroError, JexLangRuntimeError } from "./errors.ts";
import { Scope } from "./scope.ts";
import { JexValue } from "./types.ts";
import { createGlobalScope, toNumber } from "./utils.ts";

export class Evaluate {
    private scope: Scope

    constructor(
        scope: Scope = createGlobalScope()
    ) {
        this.scope = scope;
    }

    evaluate(program: Program): JexValue {
        
        // create a new scope for the program
        this.scope = new Scope(this.scope, 'program');
        
        let result: JexValue = null;

        for (const statement of program.body) {
            result = this.evaluateStatement(statement);
        }

        return result;
    }

    private evaluateStatement(statement: Statement): JexValue {
        // by default evaluate expression. based on statement kind we can do later.
        return this.evaluateExpression(statement as Expression);
    }

    private evaluateNumericalExpression(numericalLiteral: NumberLiteral): JexValue {
        return numericalLiteral.value;
    }

    private evaluateBinaryExpression(expression: BinaryExpression): JexValue {
        const left = this.evaluateExpression(expression.left);
        const right = this.evaluateExpression(expression.right);

        const leftNumber = toNumber(left);
        const rightNumber = toNumber(right);

        switch (expression.operator) {
            case '+':
                return leftNumber + rightNumber;
            case '-':
                return leftNumber - rightNumber;
            case '*':
                return leftNumber * rightNumber;
            case '/':
                if (rightNumber === 0) {
                    throw new DivisionByZeroError()
                }
                return leftNumber / rightNumber;
            case '%':
                if (rightNumber === 0) {
                    throw new DivisionByZeroError()
                }
                return leftNumber % rightNumber;
        }

        throw new JexLangRuntimeError(`Unknown operator ${expression.operator}`);
    }

    private evaluateExpression(expression: Expression): JexValue {
        if (expression.kind === 'NumberLiteral') {
            return this.evaluateNumericalExpression(expression as NumberLiteral);
        } else if (expression.kind === 'BinaryExpression') {
            return this.evaluateBinaryExpression(expression as BinaryExpression);
        }
        return null;
    }

}
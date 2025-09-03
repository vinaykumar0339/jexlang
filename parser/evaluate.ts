import { AssignmentExpression, BinaryExpression, BooleanLiteral, Expression, Identifier, NullLiteral, NumberLiteral, Program, Statement, StringLiteral, VarDeclaration } from "./ast.ts";
import { DivisionByZeroError, JexLangRuntimeError, UndefinedVariableError } from "./errors.ts";
import { Scope } from "./scope.ts";
import { JexValue } from "./types.ts";
import { createGlobalScope, toNumber, toString } from "./utils.ts";

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
        if (statement.kind === 'VarDeclaration') {
            return this.evaluateVarDeclaration(statement as VarDeclaration);
        }
        return this.evaluateExpression(statement as Expression);
    }

    // ========== Statements ==========
    private evaluateVarDeclaration(varDeclaration: VarDeclaration): JexValue {
        const varName = varDeclaration.name;
        const varValue = this.evaluateExpression(varDeclaration.value);
        const isConst = varDeclaration.isConstant;
        this.scope.declareVariable(varName, varValue, isConst);
        return varValue;
    }

    // ========== Expressions =========

    private evaluateNumericalExpression(numericalLiteral: NumberLiteral): JexValue {
        return numericalLiteral.value;
    }

    private evaluateStringLiteral(stringLiteral: StringLiteral): JexValue {
        return stringLiteral.value;
    }

    private evaluateBooleanLiteral(booleanLiteral: BooleanLiteral): JexValue {
        return booleanLiteral.value;
    }

    private evaluateNullLiteral(nullLiteral: NullLiteral): JexValue {
        return nullLiteral.value;
    }

    private evaluateBinaryExpression(expression: BinaryExpression): JexValue {
        const left = this.evaluateExpression(expression.left);
        const operator = expression.operator;
        const right = this.evaluateExpression(expression.right);

        if (operator == '+' && typeof left === 'string' || typeof right === 'string') {
            return toString(left) + toString(right);
        }

        // separate this into some helper functions for different type of expressions
        const leftNumber = toNumber(left);
        const rightNumber = toNumber(right);

        switch (operator) {
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
            case '**':
            case '^':
                return Math.pow(leftNumber, rightNumber);
        }

        throw new JexLangRuntimeError(`Unknown operator ${operator}`);
    }

    private evaluateIdentifier(identifier: Identifier): JexValue {
        const identifierName = identifier.name;
        if (this.scope.hasVariable(identifierName)) {
            return this.scope.getVariable(identifierName);
        }

        throw new UndefinedVariableError(identifierName);
    }

    private evaluateAssignmentExpression(assignmentExpression: AssignmentExpression): JexValue {
        const left = assignmentExpression.left;
        if (left.kind !== 'Identifier') {
            throw new JexLangRuntimeError(`Invalid left-hand side of assignment: ${left}, expected Identifier, but got ${left.kind.toLowerCase()}`);
        }
        const right = this.evaluateExpression(assignmentExpression.right);

        const variableName = toString((left as Identifier).name);
        
        this.scope.assignVariable(variableName, right);
        return right;
    }

    private evaluateExpression(expression: Expression): JexValue {
        if (expression.kind === 'NumberLiteral') {
            return this.evaluateNumericalExpression(expression as NumberLiteral);
        } else if (expression.kind === 'BinaryExpression') {
            return this.evaluateBinaryExpression(expression as BinaryExpression);
        } else if (expression.kind === 'Identifier') {
            return this.evaluateIdentifier(expression as Identifier);
        } else if (expression.kind === 'StringLiteral') {
            return this.evaluateStringLiteral(expression as StringLiteral);
        } else if (expression.kind === 'BooleanLiteral') {
            return this.evaluateBooleanLiteral(expression as BooleanLiteral);
        } else if (expression.kind === 'NullLiteral') {
            return this.evaluateNullLiteral(expression as NullLiteral);
        } else if (expression.kind === 'AssignmentExpression') {
            return this.evaluateAssignmentExpression(expression as AssignmentExpression);
        }
        return null;
    }

}
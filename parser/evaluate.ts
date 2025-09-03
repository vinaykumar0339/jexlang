import { AssignmentExpression, BinaryExpression, BooleanLiteral, Expression, Identifier, NullLiteral, NumberLiteral, Program, Statement, StringLiteral, UnaryExpression, VarDeclaration } from "./ast.ts";
import { DivisionByZeroError, JexLangRuntimeError, UndefinedVariableError } from "./errors.ts";
import { Scope } from "./scope.ts";
import { JexValue, MaybePromise } from "./types.ts";
import { createGlobalScope, toBoolean, toNumber, toString } from "./utils.ts";

export class Evaluate {
    private scope: Scope

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

    constructor(
        scope: Scope = createGlobalScope()
    ) {
        this.scope = scope;
    }

    evaluate(program: Program): MaybePromise<JexValue> {

        // create a new scope for the program
        this.scope = new Scope(this.scope, 'program');
        
        let result: MaybePromise<JexValue> = null;
        let hasPromise = false;

        for (const statement of program.body) {
            const statementResult = this.evaluateStatement(statement);
            if (hasPromise) {
                result = (result as unknown as Promise<JexValue>).then(() => statementResult);
            } else if (statementResult instanceof Promise) {
                hasPromise = true;
                result = Promise.resolve(result).then(() => statementResult);
            } else {
                result = statementResult;
            }
        }

        if (hasPromise) {
            return (result as Promise<JexValue>).then(resolved => {
                // Exit the program scope
                const parentScope = this.scope.getParentScope();
                if (parentScope) {
                    this.scope = parentScope;
                }
                return resolved ?? null
            });
        }

        // Exit the program scope
        const parentScope = this.scope.getParentScope();
        if (parentScope) {
            this.scope = parentScope;
        }

        return result;
    }

    private evaluateStatement(statement: Statement): MaybePromise<JexValue> {
        if (statement.kind === 'VarDeclaration') {
            return this.evaluateVarDeclaration(statement as VarDeclaration);
        }
        return this.evaluateExpression(statement as Expression);
    }

    // ========== Statements ==========
    private evaluateVarDeclaration(varDeclaration: VarDeclaration): MaybePromise<JexValue> {
        const varName = varDeclaration.name;
        const varValue = this.evaluateExpression(varDeclaration.value);
        return this.handlePromise(varValue, (resolvedValue) => {
            const isConst = varDeclaration.isConstant;
            this.scope.declareVariable(varName, resolvedValue, isConst);
            return resolvedValue;
        });
    }

    // ========== Expressions =========

    private evaluateNumericalExpression(numericalLiteral: NumberLiteral): MaybePromise<JexValue> {
        return numericalLiteral.value;
    }

    private evaluateStringLiteral(stringLiteral: StringLiteral): MaybePromise<JexValue> {
        return stringLiteral.value.slice(1, -1); // Remove quotes
    }

    private evaluateBooleanLiteral(booleanLiteral: BooleanLiteral): MaybePromise<JexValue> {
        return booleanLiteral.value;
    }

    private evaluateNullLiteral(nullLiteral: NullLiteral): MaybePromise<JexValue> {
        return nullLiteral.value;
    }

    private evaluateBinaryExpression(expression: BinaryExpression): MaybePromise<JexValue> {
        
        return this.handlePromises([this.evaluateExpression(expression.left), this.evaluateExpression(expression.right)], (left, right) => {
            const operator = expression.operator;
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

        });
    }

    private evaluateUnaryExpression(expression: UnaryExpression): MaybePromise<JexValue> {
        return this.handlePromise(this.evaluateExpression(expression.value), (resolvedValue) => {
            const operator = expression.operator;
            
            switch (operator) {
                case '!':
                    return !toBoolean(resolvedValue);
                case '+':
                    return toNumber(resolvedValue);
                case '-':
                    return -toNumber(resolvedValue);
                case '√': {
                    const num = toNumber(resolvedValue);
                    if (num < 0) {
                        throw new JexLangRuntimeError(`Invalid square root: ${resolvedValue}`);
                    }
                    return Math.sqrt(num);
                }
            }

            throw new JexLangRuntimeError(`Unknown unary operator ${operator}`);
        })
    }

    private evaluateIdentifier(identifier: Identifier): JexValue {
        const identifierName = identifier.name;
        if (this.scope.hasVariable(identifierName)) {
            return this.scope.getVariable(identifierName);
        }

        throw new UndefinedVariableError(identifierName);
    }

    private evaluateAssignmentExpression(assignmentExpression: AssignmentExpression): MaybePromise<JexValue> {
        const left = assignmentExpression.left;
        if (left.kind !== 'Identifier') {
            throw new JexLangRuntimeError(`Invalid left-hand side of assignment: ${left}, expected Identifier, but got ${left.kind.toLowerCase()}`);
        }

        return this.handlePromise(this.evaluateExpression(assignmentExpression.right), (resolvedRight) => {
            const variableName = toString((left as Identifier).name);

            this.scope.assignVariable(variableName, resolvedRight);

            return resolvedRight;
        });
    }

    private evaluateExpression(expression: Expression): MaybePromise<JexValue> {
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
        } else if (expression.kind === 'UnaryExpression') {
            return this.evaluateUnaryExpression(expression as UnaryExpression);
        }
        return null;
    }

}
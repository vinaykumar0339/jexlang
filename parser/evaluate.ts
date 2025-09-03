import { ArrayLiteral, AssignmentExpression, BinaryExpression, BooleanLiteral, CallExpression, Expression, Identifier, MemberExpression, NullLiteral, NumberLiteral, ObjectLiteral, Program, ShorthandTernaryExpression, Statement, StringLiteral, TernaryExpression, UnaryExpression, VarDeclaration } from "./ast.ts";
import { DivisionByZeroError, JexLangRuntimeError, UndefinedFunctionError, UndefinedVariableError } from "./errors.ts";
import { BUILT_IN_FUNCTIONS } from "./functions/builtin.ts";
import { Scope } from "./scope.ts";
import { BUILT_IN_TRANSFORMS } from "./transforms/builtin.ts";
import { FuncImpl, FuncRegistry, JexValue, MapFuncRegistry, MapTransformRegistry, MaybePromise, TransformImpl, TransformRegistry } from "./types.ts";
import { createGlobalScope, toBoolean, toNumber, toString } from "./utils.ts";

export class Evaluate {
    private scope: Scope
    private funcRegistry: FuncRegistry;
    private transformRegistry: TransformRegistry;

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
        scope: Scope = createGlobalScope(),
        funcsMap?: Record<string, FuncImpl>, 
        transformsMap?: Record<string, TransformImpl>,
    ) {
        this.scope = scope;

        this.funcRegistry = new MapFuncRegistry({
          ...BUILT_IN_FUNCTIONS,
          ...funcsMap
        });

        this.transformRegistry = new MapTransformRegistry({
          ...BUILT_IN_TRANSFORMS,
          ...transformsMap
        });
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

    private evaluateMathematicalExpression(expression: BinaryExpression): MaybePromise<JexValue> {
        return this.handlePromises([this.evaluateExpression(expression.left), this.evaluateExpression(expression.right)], (left, right) => {
            const operator = expression.operator;
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

            throw new JexLangRuntimeError(`Unknown operator ${operator}. supported operators are: +, -, *, /, %, **, ^`);
        });
    }

    private evaluateRelationalExpression(expression: BinaryExpression): MaybePromise<JexValue> {
        return this.handlePromises([this.evaluateExpression(expression.left), this.evaluateExpression(expression.right)], (left, right) => {
            const operator = expression.operator;
            const leftNumber = toNumber(left);
            const rightNumber = toNumber(right);

            switch (operator) {
                case '<':
                    return (leftNumber == null ? 0 : leftNumber) < (rightNumber == null ? 0 : rightNumber);
                case '>':
                    return (leftNumber == null ? 0 : leftNumber) > (rightNumber == null ? 0 : rightNumber);
                case '<=':
                    return (leftNumber == null ? 0 : leftNumber) <= (rightNumber == null ? 0 : rightNumber);
                case '>=':
                    return (leftNumber == null ? 0 : leftNumber) >= (rightNumber == null ? 0 : rightNumber);
            }

            throw new JexLangRuntimeError(`Unknown relational operator ${operator}. supported operators are: LT, GT, LTE, GTE`);
        });
    }

    private evaluateLogicalOrExpression(expression: BinaryExpression): MaybePromise<JexValue> {
        return this.handlePromise(this.evaluateExpression(expression.left), (left) => {
            const leftBool = left != null && left != undefined && left != 0; // remaining all truthy values
            if (leftBool) {
                return true; // short-circuit if left is truthy
            }

            return this.handlePromise(this.evaluateExpression(expression.right), (right) => {
                const rightBool = right != null && right != undefined && right != 0; // remaining all truthy values
                return leftBool || rightBool;
            });
        })
    }

    private evaluateLogicalAndExpression(expression: BinaryExpression): MaybePromise<JexValue> {
        return this.handlePromise(this.evaluateExpression(expression.left), (left) => {
            const leftBool = left != null && left != undefined && left != 0; // remaing all truthy values
            if (!leftBool) {
                return false; // short-circuit if left is falsy
            }
            return this.handlePromise(this.evaluateExpression(expression.right), (right) => {
                const rightBool = right != null && right != undefined && right != 0; // remaining all truthy values
                return leftBool && rightBool;
            });
        });
    }

    private evaluateLogicalExpression(expression: BinaryExpression): MaybePromise<JexValue> {
        const operator = expression.operator;
        if (operator === 'and' || operator === '&&') {
            return this.evaluateLogicalAndExpression(expression);
        } else if (operator === 'or' || operator === '||') {
            return this.evaluateLogicalOrExpression(expression);
        }

        throw new JexLangRuntimeError(`Unknown logical operator ${operator}. supported operators are: and, or, &&, ||`);
    }

    private evaluateEqualityExpression(expression: BinaryExpression): MaybePromise<JexValue> {
        return this.handlePromises([this.evaluateExpression(expression.left), this.evaluateExpression(expression.right)], (left, right) => {
            const operator = expression.operator;

            switch (operator) {
                case '==':
                    return left == right;
                case '!=':
                    return left != right;
            }

            throw new JexLangRuntimeError(`Unknown equality operator ${operator}. supported operators are: ==, !=`);
        });
    }

    private evaluateBinaryExpression(expression: BinaryExpression): MaybePromise<JexValue> {
        const operator = expression.operator;
        if (
            operator === '==' || 
            operator === '!='
        ) {
            return this.evaluateEqualityExpression(expression);
        } else if (
            operator === '<' ||
            operator === '>' ||
            operator === '<=' ||
            operator === '>='
        ) {
            return this.evaluateRelationalExpression(expression);
        } 
        else if (
            operator === 'and' ||
            operator === 'or' ||
            operator === '&&' ||
            operator === '||'
        ) {
            return this.evaluateLogicalExpression(expression);
        }
         else {
            return this.evaluateMathematicalExpression(expression);
        }
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

    private evaluateShorthandTernaryExpression(expression: ShorthandTernaryExpression): MaybePromise<JexValue> {
        return this.handlePromise(this.evaluateExpression(expression.condition), (resolvedCondition) => {
            // If values are present, return the resolved condition, null and undefined are falsy others are truthy
            if (resolvedCondition != null && resolvedCondition != undefined) {
                return resolvedCondition;
            } else {
                return this.handlePromise(this.evaluateExpression(expression.falseBranch), (resolvedFalseBranch) => {
                    return resolvedFalseBranch;
                });
            }
        });
    }

    private evaluateTernaryExpression(expression: TernaryExpression): MaybePromise<JexValue> {
        return this.handlePromise(this.evaluateExpression(expression.condition), (resolvedCondition) => {
            // empty array and objects are falsy
            if (toBoolean(resolvedCondition)) {
                return this.handlePromise(this.evaluateExpression(expression.trueBranch), (resolvedTrueBranch) => {
                    return resolvedTrueBranch;
                });
            } else {
                return this.handlePromise(this.evaluateExpression(expression.falseBranch), (resolvedFalseBranch) => {
                    return resolvedFalseBranch;
                });
            }
        });
    }

    private evaluateCallExpression(expression: CallExpression): MaybePromise<JexValue> {
        const caller = expression.caller;
        if (caller.kind !== 'Identifier') { // We support only Identifier type for now in future we can extend it.
            throw new JexLangRuntimeError(`Invalid caller of function call: ${caller}, expected Identifier, but got ${caller.kind.toLowerCase()}`);
        }

        const functionName = (caller as Identifier).name;

        // check function is available or not
        if (!this.funcRegistry.has(functionName)) {
            throw new UndefinedFunctionError(functionName);
        }

        const args = expression.arguments.map(arg => this.evaluateExpression(arg));
        return this.handlePromises(args, (...resolvedArgs) => {
            return this.handlePromise(this.funcRegistry.call(functionName, resolvedArgs), res => res);
        });
    }

    private evaluateMemberExpression(expression: MemberExpression): MaybePromise<JexValue> {
        const obj = this.evaluateExpression(expression.object);
        return this.handlePromise(this.evaluateExpression(expression.object), (obj) => {
            const computed = expression.computed;
            if (!computed) {
                const property = expression.property;
                if (property.kind !== 'Identifier') {
                    throw new JexLangRuntimeError(`Invalid property of member expression: ${property}, expected Identifier, but got ${property.kind.toLowerCase()}`);
                }
                const propertyName = (property as Identifier).name;
                if (obj != null && typeof obj === 'object' && !Array.isArray(obj)) {
                    return obj[propertyName];
                }
            } else {
                return this.handlePromise(this.evaluateExpression(expression.property), (property) => {
                    if (obj != null && typeof obj == 'object' && !Array.isArray(obj)) {
                        return obj[toString(property)];
                    } else if (obj != null && typeof obj == 'object' && Array.isArray(obj)) {
                        const indexNumber = toNumber(property);
                        let normalizedIndex = isNaN(indexNumber) ? -1 : indexNumber;
                        if (normalizedIndex < 0) {
                            normalizedIndex = obj.length + normalizedIndex;
                        }
                        if (normalizedIndex >= 0 && normalizedIndex < obj.length) {
                            return obj[normalizedIndex];
                        }
                    } else if (obj != null && obj != undefined && typeof obj === 'string') {
                        const str = obj as string;
                        const indexNumber = toNumber(property);
                        let normalizedIndex = isNaN(indexNumber) ? -1 : indexNumber;
                        if (normalizedIndex < 0) {
                            normalizedIndex = str.length + normalizedIndex;
                        }
                        if (normalizedIndex >= 0 && normalizedIndex < str.length) {
                            return str[normalizedIndex];
                        }
                    }
                    return null;  // don't throw any error if the object is null or not an object just return null to further chain.
                })
            }
            return null; // don't throw any error if the object is null or not an object just return null to further chain.
        })
    }

    private evaluateArrayLiteral(expression: ArrayLiteral): MaybePromise<JexValue> {
        const elements: MaybePromise<JexValue>[] = [];
        for (const element of expression.elements) {
            elements.push(this.evaluateExpression(element));
        }

        return this.handlePromises(elements, (...resolvedElements) => resolvedElements);
    }

    private evaluateObjectLiteral(expression: ObjectLiteral): MaybePromise<JexValue> {
        const properties: MaybePromise<JexValue>[] = [];
        for (const prop of expression.properties) {
            const computed = prop.computed;
            if (!computed) {
                if (prop.key.kind !== 'Identifier' && prop.key.kind !== 'StringLiteral') {
                    throw new JexLangRuntimeError(`Invalid key of object property: ${prop.key}, expected Identifier or StringLiteral, but got ${prop.key.kind.toLowerCase()}`);
                }
                const key = (prop.key.kind === 'Identifier') ? (prop.key as Identifier).name : (prop.key as StringLiteral).value.slice(1, -1);
                let property: MaybePromise<JexValue> = {};
                if (prop.value) {
                    property = this.handlePromise(this.evaluateExpression(prop.value), (value) => {
                        return {
                            [toString(key)]: value
                        };
                    });
                } else {
                    const value = this.scope.getVariable(toString(key));
                    property = {
                        [toString(key)]: value
                    };
                }
                properties.push(property);
            } else {
                const property = this.handlePromise(this.evaluateExpression(prop.key), (key) => {
                    if (prop.value) {
                        return this.handlePromise(this.evaluateExpression(prop.value), (value) => {
                            return {
                                [toString(key)]: value
                            };
                        });
                    }
                    // Get if the identifier has a value
                    const value = this.scope.getVariable(toString(key));
                    return {
                        [toString(key)]: value,
                    };
                })
                properties.push(property);
            }
        }

        return this.handlePromises(properties, (...resolvedProperties) => {
            const filteredProperties = resolvedProperties.filter(prop => typeof prop === 'object' && prop != null && !Array.isArray(prop));
            return Object.assign({}, ...filteredProperties);
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
        } else if (expression.kind === 'TernaryExpression') {
            return this.evaluateTernaryExpression(expression as TernaryExpression);
        } else if (expression.kind === 'ShorthandTernaryExpression') {
            return this.evaluateShorthandTernaryExpression(expression as ShorthandTernaryExpression);
        } else if (expression.kind === 'CallExpression') {
            return this.evaluateCallExpression(expression as CallExpression);
        } else if (expression.kind === 'MemberExpression') {
            return this.evaluateMemberExpression(expression as MemberExpression);
        } else if (expression.kind === 'ArrayLiteral') {
            return this.evaluateArrayLiteral(expression as ArrayLiteral);
        } else if (expression.kind === 'ObjectLiteral') {
            return this.evaluateObjectLiteral(expression as ObjectLiteral);
        }
        return null;
    }

}
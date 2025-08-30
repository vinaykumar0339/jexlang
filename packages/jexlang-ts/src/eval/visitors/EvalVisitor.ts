import JexLangVisitor from "../../grammar/JexLangVisitor";
import * as JexLangParser from "../../grammar/JexLangParser";
import { ErrorNode, ParseTree } from "antlr4";
import { type FuncImpl, type FuncRegistry, type JexValue, MapFuncRegistry, type TransformImpl, type TransformRegistry, MapTransformRegistry, type MaybePromise } from "../../types";
import { BUILT_IN_FUNCTIONS } from "../functions";
import { BUILT_IN_TRANSFORMS } from "../transforms";
import { toBoolean, toNumber, toString } from "../../utils";
import { DivisionByZeroError, JexLangRuntimeError, UndefinedVariableError, UndefinedFunctionError, JexLangSyntaxError, UndefinedTransformError } from "../errors/errors";
import { Scope } from "../scopes";

export class EvalVisitor extends JexLangVisitor<MaybePromise<JexValue>> {
    private funcRegistry: FuncRegistry;
    private transformRegistry: TransformRegistry;
    private scope: Scope;

    constructor(
        scope: Scope = new Scope(),
        funcsMap?: Record<string, FuncImpl>, 
        transformsMap?: Record<string, TransformImpl>,
    ) {
        super();

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

    visitProgram = (ctx: JexLangParser.ProgramContext): MaybePromise<JexValue> => {

        // create a new scope for the program
        this.scope = new Scope(this.scope);

        let result: MaybePromise<JexValue> = null;
        let hasPromise = false;

        for (const statement of ctx.statement_list()) {
            
            const statementResult = this.visit(statement);
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

    visitStatement = (ctx: JexLangParser.StatementContext): MaybePromise<JexValue> => {
        if (ctx.varDeclaration()) {
            return this.visit(ctx.varDeclaration());
        } else if (ctx.block()) {
            return this.visit(ctx.block());
        } else if (ctx.expressionStatement()) {
            return this.visit(ctx.expressionStatement());
        } else if (ctx.emptyStatement()) {
            return this.visit(ctx.emptyStatement());
        }

        return null;
    };

    visitVarDeclaration = (ctx: JexLangParser.VarDeclarationContext): MaybePromise<JexValue> => {
        const varName = ctx.IDENTIFIER().getText();
        const varValue = ctx.singleExpression() ? this.visit(ctx.singleExpression()) : null;

        return this.handlePromise(varValue, (resolvedValue) => {
            this.scope.declareVariable(varName, resolvedValue);
            return resolvedValue;
        });
    };

    visitLiteralExpression = (ctx: JexLangParser.LiteralExpressionContext): MaybePromise<JexValue> => {
        return this.visit(ctx.getChild(0)); // visit to the literal
    };

    visitBooleanLiteral = (ctx: JexLangParser.BooleanLiteralContext): MaybePromise<JexValue> => {
        return ctx.getText() === "true";
    };

    visitNumberLiteral = (ctx: JexLangParser.NumberLiteralContext): MaybePromise<JexValue> => {
        return parseFloat(ctx.getText()); // all numbers are treated as floats
    };

    visitStringLiteral = (ctx: JexLangParser.StringLiteralContext): MaybePromise<JexValue> => {
        return ctx.getText().slice(1, -1); // Remove quotes
    };

    visitNullLiteral = (ctx: JexLangParser.NullLiteralContext): MaybePromise<JexValue> => {
        return null;
    };

    visitBlock = (ctx: JexLangParser.BlockContext): MaybePromise<JexValue> => {
        // create a new scope for the block
        this.scope = new Scope(this.scope);

        let result: MaybePromise<JexValue> = null;
        let hasPromise = false;

        for (const statement of ctx.statement_list()) {
            
            const statementResult = this.visit(statement);
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
                // Exit the block scope
                const parentScope = this.scope.getParentScope();
                if (parentScope) {
                    this.scope = parentScope;
                }
                return resolved ?? null
            });
        }

        // Exit the block scope
        const parentScope = this.scope.getParentScope();
        if (parentScope) {
            this.scope = parentScope;
        }

        return result;
    };

    visitEmptyStatement = (ctx: JexLangParser.EmptyStatementContext): MaybePromise<JexValue> => {
        return null; // just return null for empty statements
    };

    visitExpressionStatement = (ctx: JexLangParser.ExpressionStatementContext): MaybePromise<JexValue> => {
        return this.visit(ctx.expressionSequence());
    };

    visitExpressionSequence = (ctx: JexLangParser.ExpressionSequenceContext): MaybePromise<JexValue> => {
        const expressions: MaybePromise<JexValue>[] = [];

        for (const expr of ctx.singleExpression_list()) {
            expressions.push(this.visit(expr));
        }

        return this.handlePromises(expressions, (...resolvedValues) => {
            // Return the last resolved value or null
            return resolvedValues[resolvedValues.length - 1] ?? null;
        });
    };

    visitArrayLiteralExpression = (ctx: JexLangParser.ArrayLiteralExpressionContext): MaybePromise<JexValue> => {
        return this.visit(ctx.arrayLiteral());
    };

    visitArrayLiteral = (ctx: JexLangParser.ArrayLiteralContext): MaybePromise<JexValue> => {
        const elements: MaybePromise<JexValue>[] = [];
        for (const element of ctx.arrayElement_list()) {
            elements.push(this.visit(element));
        }
        return this.handlePromises(elements, (...resolvedElements) => resolvedElements);
    };
    
    visitArrayElement = (ctx: JexLangParser.ArrayElementContext): MaybePromise<JexValue> => {
        return this.visit(ctx.singleExpression());
    };

    visitObjectLiteralExpression = (ctx: JexLangParser.ObjectLiteralExpressionContext): MaybePromise<JexValue> => {
        return this.visit(ctx.objectLiteral());
    };

    visitObjectLiteral = (ctx: JexLangParser.ObjectLiteralContext): MaybePromise<JexValue> => {
        const properties: MaybePromise<JexValue>[] = [];
        for (const prop of ctx.objectProperty_list()) {
            properties.push(this.visit(prop));
        }
        return this.handlePromises(properties, (...resolvedProperties) => {
            const filteredProperties = resolvedProperties.filter(prop => typeof prop === 'object' && prop !== null && !Array.isArray(prop));
            return Object.assign({}, ...filteredProperties);
        });
    };

    visitPropertyExpressionObjectProperty = (ctx: JexLangParser.PropertyExpressionObjectPropertyContext): MaybePromise<JexValue> => {
        const propertyName = this.visit(ctx.objectPropertyName());
        const propertyValue = this.visit(ctx.singleExpression());
        return this.handlePromises([propertyName, propertyValue], (propertyName, propertyValue) => {
            return {
                [toString(propertyName)]: propertyValue
            };
        });
    };

    visitComputedPropertyExpressionObjectProperty = (ctx: JexLangParser.ComputedPropertyExpressionObjectPropertyContext): MaybePromise<JexValue> => {
        const computedKey = this.visit(ctx.singleExpression(0));
        const computedValue = this.visit(ctx.singleExpression(1));
        return this.handlePromises([computedKey, computedValue], (computedKey, computedValue) => {
            return {
                [toString(computedKey)]: computedValue
            };
        });
    }

    visitShorthandPropertyExpressionObjectProperty = (ctx: JexLangParser.ShorthandPropertyExpressionObjectPropertyContext): MaybePromise<JexValue> => {
        const identifier = ctx.IDENTIFIER().getText();
        return {
            [identifier]: this.scope.getVariable(identifier) // don't throw any error if it didn't find the variable just set the null value
        }
    };

    visitObjectPropertyName = (ctx: JexLangParser.ObjectPropertyNameContext): MaybePromise<JexValue> => {
        if (ctx.STRING()) {
            return ctx.getText().slice(1, -1); // Remove quotes
        }

        return ctx.getText(); // Return string representation of the identifier or number
    };

    visitIdentifierExpression = (ctx: JexLangParser.IdentifierExpressionContext): MaybePromise<JexValue> => {
        const identifier = ctx.IDENTIFIER().getText();
        if (this.scope.hasVariable(identifier)) {
            return this.scope.getVariable(identifier);
        }
        throw new UndefinedVariableError(identifier);
    };

    visitParenthesizedExpression = (ctx: JexLangParser.ParenthesizedExpressionContext): MaybePromise<JexValue> => {
        return this.visit(ctx.expressionSequence());
    };

    visitAssignmentExpression = (ctx: JexLangParser.AssignmentExpressionContext): MaybePromise<JexValue> => {
        const varName = ctx.IDENTIFIER().getText();
        return this.handlePromise(this.visit(ctx.singleExpression()), (resolvedValue) => {
            this.scope.assignVariable(varName, resolvedValue);
            return resolvedValue;
        });
    };

    visitBracketPropertyAssignment = (ctx: JexLangParser.BracketPropertyAssignmentContext): MaybePromise<JexValue> => {
        const object = this.visit(ctx.singleExpression(0));
        const propertyName = this.visit(ctx.expressionSequence());
        const value = this.visit(ctx.singleExpression(1));

        return this.handlePromises([object, propertyName, value], (object: Record<string, JexValue> | JexValue[], property, value) => {
            if (object != null && typeof object === 'object' && !Array.isArray(object)) {
                object[toString(property)] = value;
                return object;
            } else if (object != null && typeof object === 'object' && Array.isArray(object)) {
                const indexNumber = toNumber(property);
                let normalizedIndex = isNaN(indexNumber) ? -1 : indexNumber;
                if (normalizedIndex < 0) {
                    normalizedIndex = object.length + normalizedIndex;
                }
                if (normalizedIndex >= 0 && normalizedIndex < object.length) {
                    object[normalizedIndex] = value;
                    return object;
                }
                return null; // if out of bounds just return null. don't throw any errors.
            }
            throw new JexLangRuntimeError(`Cannot assign property on non-object or non-array value`);
        });
    };

    visitDotPropertyAssignment = (ctx: JexLangParser.DotPropertyAssignmentContext): MaybePromise<JexValue> => {
        const object = this.visit(ctx.singleExpression(0));
        const propertyName = this.visit(ctx.objectPropertyName());
        const value = this.visit(ctx.singleExpression(1));

        return this.handlePromises([object, propertyName, value], (object, property, value) => {
            if (object != null && typeof object === 'object' && !Array.isArray(object)) {
                object[toString(property)] = value;
                return object;
            } else if (object != null && typeof object === 'object' && Array.isArray(object)) {
                const indexNumber = toNumber(property);
                let normalizedIndex = isNaN(indexNumber) ? -1 : indexNumber;
                if (normalizedIndex < 0) {
                    normalizedIndex = object.length + normalizedIndex;
                }
                if (normalizedIndex >= 0 && normalizedIndex < object.length) {
                    object[normalizedIndex] = value;
                    return object;
                }
            }
            throw new JexLangRuntimeError(`Cannot assign property on non-object or non-array value`);
        });
    };

    visitTernaryExpression = (ctx: JexLangParser.TernaryExpressionContext): MaybePromise<JexValue> => {

        return this.handlePromise(this.visit(ctx.singleExpression(0)), (resolvedCondition) => {
            // empty array and objects are falsy
            if (toBoolean(resolvedCondition)) {
                return this.handlePromise(this.visit(ctx.singleExpression(1)), (resolvedTrueBranch) => {
                    return resolvedTrueBranch;
                });
            } else {
                return this.handlePromise(this.visit(ctx.singleExpression(2)), (resolvedFalseBranch) => {
                    return resolvedFalseBranch;
                });
            }
        });
    };

    visitShortTernaryExpression = (ctx: JexLangParser.ShortTernaryExpressionContext): MaybePromise<JexValue> => {

        return this.handlePromise(this.visit(ctx.singleExpression(0)), (resolvedCondition) => {
            // If values are present, return the resolved condition null and undefined are falsy others are truthy
            if (resolvedCondition != null && resolvedCondition != undefined) {
                return resolvedCondition;
            } else {
                return this.handlePromise(this.visit(ctx.singleExpression(1)), (resolvedFalseBranch) => {
                    return resolvedFalseBranch;
                });
            }
        });
    };

    visitTransformExpression = (ctx: JexLangParser.TransformExpressionContext): MaybePromise<JexValue> => {
        return this.handlePromise(this.visit(ctx.singleExpression()), (input) => {
            const transformName = ctx.IDENTIFIER().getText();
            if (this.transformRegistry.has(transformName)) {
                return this.handlePromise(this.transformRegistry.transform(transformName, input), (output) => {
                    return output;
                });
            }

            // if transform not found lets check in funcs
            if (this.funcRegistry.has(transformName)) {
                return this.handlePromise(this.funcRegistry.call(transformName, [input]), (output) => {
                    return output;
                });
            }

            throw new UndefinedTransformError(transformName);
        })
    };

    visitPowerExpression = (ctx: JexLangParser.PowerExpressionContext): MaybePromise<JexValue> => {
        return this.handlePromises([
            this.visit(ctx.singleExpression(0)),
            this.visit(ctx.singleExpression(1))
        ], (base, exponent) => {
            return Math.pow(toNumber(base), toNumber(exponent));
        });
    };

    visitMultiplicativeExpression = (ctx: JexLangParser.MultiplicativeExpressionContext): MaybePromise<JexValue> => {
        return this.handlePromises([
            this.visit(ctx.singleExpression(0)),
            this.visit(ctx.singleExpression(1))
        ], (left, right) => {
            const leftNum = toNumber(left);
            const rightNum = toNumber(right);

            if (ctx.MULTIPLY()) {
                return leftNum * rightNum;
            } else if (ctx.DIVIDE()) {
                if (rightNum === 0) {
                    throw new DivisionByZeroError();
                }
                return leftNum / rightNum;
            } else if (ctx.MODULO()) {
                if (rightNum === 0) {
                    throw new DivisionByZeroError();
                }
                return leftNum % rightNum;
            }

            throw new JexLangRuntimeError(`Unknown multiplicative operator ${ctx.getChild(1).getText()}`);
        });
    };

    visitAdditiveExpression = (ctx: JexLangParser.AdditiveExpressionContext): MaybePromise<JexValue> => {
        return this.handlePromises([
            this.visit(ctx.singleExpression(0)),
            this.visit(ctx.singleExpression(1))
        ], (left, right) => {
            if (ctx.PLUS() && (typeof left === 'string' || typeof right === 'string')) {
                return toString(left) + toString(right);
            }

            const leftNum = toNumber(left);
            const rightNum = toNumber(right);

            if (ctx.PLUS()) {
                return leftNum + rightNum;
            } else if (ctx.MINUS()) {
                return leftNum - rightNum;
            }

            throw new JexLangRuntimeError(`Unknown additive operator ${ctx.getChild(1).getText()}`);
        });
    };

    visitRelationalExpression = (ctx: JexLangParser.RelationalExpressionContext): MaybePromise<JexValue> => {
        return this.handlePromises([
            this.visit(ctx.singleExpression(0)),
            this.visit(ctx.singleExpression(1))
        ], (left, right) => {
            const leftNum = toNumber(left);
            const rightNum = toNumber(right);

            if (ctx.LT()) {
                return (leftNum == null ? 0 : leftNum) < (rightNum == null ? 0 : rightNum);
            } else if (ctx.GT()) {
                return (leftNum == null ? 0 : leftNum) > (rightNum == null ? 0 : rightNum);
            } else if (ctx.LTE()) {
                return (leftNum == null ? 0 : leftNum) <= (rightNum == null ? 0 : rightNum);
            } else if (ctx.GTE()) {
                return (leftNum == null ? 0 : leftNum) >= (rightNum == null ? 0 : rightNum);
            }

            throw new JexLangRuntimeError(`Unknown relational operator ${ctx.getChild(1).getText()}`);
        });
    };

    visitEqualityExpression = (ctx: JexLangParser.EqualityExpressionContext): MaybePromise<JexValue> => {
        return this.handlePromises([
            this.visit(ctx.singleExpression(0)),
            this.visit(ctx.singleExpression(1))
        ], (left, right) => {

            // We are not supporting the triple equals and not triple equals
            if (ctx.EQ()) {
                return left == right;
            } else if (ctx.NEQ()) {
                return left != right;
            }

            throw new JexLangRuntimeError(`Unknown equality operator ${ctx.getChild(1).getText()}`);
        });
    };

    visitLogicalAndExpression = (ctx: JexLangParser.LogicalAndExpressionContext): MaybePromise<JexValue> => {
        if (ctx.AND()) {
            return this.handlePromise(this.visit(ctx.singleExpression(0)), (left) => {
                const leftBool = left != null && left != undefined && left != 0; // remaing all truthy values
                if (!leftBool) {
                    return false; // short-circuit if left is falsy
                }
                return this.handlePromise(this.visit(ctx.singleExpression(1)), (right) => {
                    const rightBool = right != null && right != undefined && right != 0; // remaining all truthy values
                    return leftBool && rightBool;
                });
            });
        }

        throw new JexLangRuntimeError(`Unknown logical operator ${ctx.getChild(1).getText()}`);
    };

    visitLogicalOrExpression = (ctx: JexLangParser.LogicalOrExpressionContext): MaybePromise<JexValue> => {
        if (ctx.OR()) {
            return this.handlePromise(this.visit(ctx.singleExpression(0)), (left) => {
                const leftBool = left != null && left != undefined && left != 0; // remaining all truthy values
                if (leftBool) {
                    return true; // short-circuit if left is truthy
                }
                return this.handlePromise(this.visit(ctx.singleExpression(1)), (right) => {
                    const rightBool = right != null && right != undefined && right != 0; // remaining all truthy values
                    return leftBool || rightBool;
                });
            });
        }

        throw new JexLangRuntimeError(`Unknown logical operator ${ctx.getChild(1).getText()}`);
    };

    visitUnaryExpression = (ctx: JexLangParser.UnaryExpressionContext): MaybePromise<JexValue> => {
        return this.handlePromise(this.visit(ctx.singleExpression()), (value) => {
            if (ctx.MINUS()) {
                return -toNumber(value);
            } else if (ctx.PLUS()) {
                return toNumber(value);
            }
            throw new JexLangRuntimeError(`Unknown unary operator ${ctx.getChild(0).getText()}`);
        });
    }

    visitSquareRootExpression = (ctx: JexLangParser.SquareRootExpressionContext): MaybePromise<JexValue> => {
        return this.handlePromise(this.visit(ctx.singleExpression()), (value) => {
            const num = toNumber(value);
            if (num < 0) {
                throw new JexLangRuntimeError(`Invalid square root: ${value}`);
            }
            return Math.sqrt(num);
        });
    };

    visitMemberDotExpression = (ctx: JexLangParser.MemberDotExpressionContext): MaybePromise<JexValue> => {
        const obj = this.visit(ctx.singleExpression());
        const propertyName = this.visit(ctx.objectPropertyName());
        return this.handlePromises([obj, propertyName], (obj, propertyName) => {
            if (typeof propertyName !== 'string') {
                throw new JexLangRuntimeError(`Invalid property name: ${propertyName}`);
            }
            if (obj != null && typeof obj === 'object' && !Array.isArray(obj)) {
                return obj[propertyName];
            }
            return null; // don't throw any error if the object is null or not an object just return null to further chain.
        });
    };

    visitMemberIndexExpression = (ctx: JexLangParser.MemberIndexExpressionContext): MaybePromise<JexValue> => {
        const obj = this.visit(ctx.singleExpression());
        const index = this.visit(ctx.expressionSequence());
        return this.handlePromises([obj, index], (object, index) => {
            if (object != null && typeof object == 'object' && !Array.isArray(object)) {
                return object[toString(index)];
            } else if (object != null && typeof object == 'object' && Array.isArray(object)) {
                const indexNumber = toNumber(index);
                let normalizedIndex = isNaN(indexNumber) ? -1 : indexNumber;
                if (normalizedIndex < 0) {
                    normalizedIndex = object.length + normalizedIndex;
                }
                if (normalizedIndex >= 0 && normalizedIndex < object.length) {
                    return object[normalizedIndex];
                }
            }
            return null; // don't throw any error if the object is null or not an array just return null to further chain.
        });
    };

    visitFunctionCallExpression = (ctx: JexLangParser.FunctionCallExpressionContext): MaybePromise<JexValue> => {
        const functionName = ctx.IDENTIFIER().getText();
        // check function is available or not
        if (!this.funcRegistry.has(functionName)) {
            throw new JexLangRuntimeError(`Function not found: ${functionName}`);
        }

        const args: MaybePromise<JexValue[]> = ctx.arguments() ? this.visit(ctx.arguments()) as MaybePromise<JexValue[]> : [];

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

    };

    visitArguments = (ctx: JexLangParser.ArgumentsContext): MaybePromise<JexValue[]> => {
        const argPromises: MaybePromise<JexValue>[] = [];
        for (const arg of ctx.argument_list()) {
            argPromises.push(this.visit(arg));
        }
        return this.handlePromise(argPromises, (resolvedArgs) => {
            return resolvedArgs;
        }) as MaybePromise<JexValue[]>;
    };

    visitArgument = (ctx: JexLangParser.ArgumentContext): MaybePromise<JexValue> => {
        if (ctx.singleExpression()) {
            return this.handlePromise(this.visit(ctx.singleExpression()), (value) => {
                return value;
            });
        } else if (ctx.IDENTIFIER()) {
            const identifier = ctx.IDENTIFIER().getText();
            if (this.scope.hasVariable(identifier)) {
                return this.scope.getVariable(identifier);
            }
            throw new UndefinedVariableError(identifier);
        }

        throw new Error(`Unknown argument type: ${ctx.getText()}`);
    };

    // need to check how to implement this
    // visitPrefixExpression = (ctx: JexLangParser.PrefixExpressionContext): MaybePromise<JexValue> => {
    //     return this.handlePromise(this.visit(ctx.singleExpression()), (value) => {
            
    //     });
    // };

    // visitPostfixExpression?: ((ctx: JexLangParser.PostfixExpressionContext) => MaybePromise<JexValue>) | undefined;

    // private handleBinaryOp(left: MaybePromise<JexValue>,
    //                       right: MaybePromise<JexValue>,
    //                       operation: (l: JexValue, r: JexValue) => JexValue): MaybePromise<JexValue> {
    //     return this.handlePromises([left, right], (l, r) => operation(l, r));
    // }

    // private handleVarModification(
    //     variableName: string,
    //     modifyFn: (currentValue: JexValue) => { newValue: JexValue, result: JexValue }
    // ): MaybePromise<JexValue> {
    //     let currentValue: MaybePromise<JexValue>;
    //     const resolvedScope = this.scope.resolveScope(variableName);

    //     if (!resolvedScope) {
    //         throw new UndefinedVariableError(variableName);
    //     }

    //     currentValue = resolvedScope.getVariable(variableName);
        
    //     return this.handlePromise(currentValue, (resolvedValue) => {
    //         const { newValue, result } = modifyFn(resolvedValue);
    //         resolvedScope.assignVariable(variableName, newValue);
    //         return result;
    //     });
    // }

    // visitProgram = (ctx: JexLangParser.ProgramContext): MaybePromise<JexValue> => {

    //     // create a new scope for the program
    //     this.scope = new Scope(this.scope);

    //     const statements: ParseTree[] = [];

    //     // Collect all non-EOF statements
    //     for (let i = 0; i < ctx.statement_list().length; i++) {
    //         statements.push(ctx.statement(i));
    //     }
        
    //     if (statements.length === 0) {
    //         return null;
    //     }

    //     // Process statements sequentially, chaining Promises only if needed
    //     let hasPromise = false;
    //     let lastResult: MaybePromise<JexValue> = null;

    //     for (let i = 0; i < statements.length; i++) {
    //         const statementResult = this.visit(statements[i]);
    //         if (hasPromise) {
    //             lastResult = (lastResult as unknown as Promise<JexValue>).then(() => statementResult);
    //         } else if (statementResult instanceof Promise) {
    //             hasPromise = true;
    //             lastResult = Promise.resolve(lastResult).then(() => statementResult);
    //         } else {
    //             lastResult = statementResult;
    //         }
    //     }

    //     if (hasPromise) {
    //         return (lastResult as Promise<JexValue>).then(result => result ?? null);
    //     }

    //     // Exit the program scope
    //     const parentScope = this.scope.getParentScope();
    //     if (parentScope) {
    //         this.scope = parentScope;
    //     }

    //     return lastResult ?? null;
    // }

    // visitStatement = (ctx: JexLangParser.StatementContext): MaybePromise<JexValue> => {
    //     if (ctx.assignment()) {
    //         return this.visit(ctx.assignment()!);
    //     } else if (ctx.expression()) {
    //         return this.visit(ctx.expression()!);
    //     } else if (ctx.propertyAssignment()) {
    //         return this.visit(ctx.propertyAssignment()!);
    //     } else if (ctx.localDeclaration()) {
    //         return this.visit(ctx.localDeclaration()!);
    //     }
    //     return null;
    // }

    // visitLocalDeclaration = (ctx: JexLangParser.LocalDeclarationContext): MaybePromise<JexValue> => {
    //     const variableName = ctx.IDENTIFIER().getText();

    //     const value = ctx.expression() ? this.visit(ctx.expression()) : null;

    //     return this.handlePromise(value, resolvedValue => {
    //         this.scope.declareVariable(variableName, resolvedValue);
    //         return resolvedValue;
    //     });
    // }

    // visitAssignment = (ctx: JexLangParser.AssignmentContext): MaybePromise<JexValue> => {
    //     const variableName = ctx.IDENTIFIER().getText();
    //     const value = this.visit(ctx.expression());

    //     return this.handlePromise(value, resolvedValue => {
    //         // Check if variable already exists in any scope
    //         const resolvedScope = this.scope.resolveScope(variableName);
            
    //         if (resolvedScope) {
    //             // If found in any scope, assign to it
    //             resolvedScope.assignVariable(variableName, resolvedValue);
    //         } else {
    //             // If not found, declare in current scope
    //             this.scope.declareVariable(variableName, resolvedValue);
    //         }
            
    //         return resolvedValue;
    //     });
    // }

    // visitPowerExpression = (ctx: JexLangParser.PowerExpressionContext): MaybePromise<JexValue> => {
    //     const left = this.visit(ctx.expression(0));
    //     const right = this.visit(ctx.expression(1));

    //     return this.handleBinaryOp(left, right, (resolvedLeft, resolvedRight) => {
    //         return Math.pow(toNumber(resolvedLeft), toNumber(resolvedRight));
    //     });
    // }

    // visitSquareRootExpression = (ctx: JexLangParser.SquareRootExpressionContext): MaybePromise<JexValue> => {
    //     const value = this.visit(ctx.expression());

    //     return this.handlePromise(value, resolvedValue => {
    //         const numValue = Number(resolvedValue);

    //         if (isNaN(numValue)) {
    //             throw new JexLangRuntimeError(`Cannot calculate square root of non-numeric value: ${resolvedValue}`);
    //         }

    //         if (numValue < 0) {
    //             throw new JexLangRuntimeError(`Cannot calculate square root of negative number: ${numValue}`);
    //         }

    //         return Math.sqrt(numValue);
    //     });
    // }

    // visitUnaryMinusExpression = (ctx: JexLangParser.UnaryMinusExpressionContext): MaybePromise<JexValue> => {
    //     const value = this.visit(ctx.expression());
    //     return this.handlePromise(value, resolvedValue => -toNumber(resolvedValue));
    // }

    // visitUnaryPlusExpression = (ctx: JexLangParser.UnaryPlusExpressionContext): MaybePromise<JexValue> => {
    //     const value = this.visit(ctx.expression());
    //     return this.handlePromise(value, resolvedValue => toNumber(resolvedValue));
    // }

    // visitMulDivModExpression = (ctx: JexLangParser.MulDivModExpressionContext): MaybePromise<JexValue> => {
    //     const left = this.visit(ctx.expression(0));
    //     const right = this.visit(ctx.expression(1));
    //     const operator = ctx.getChild(1).getText();

    //     return this.handleBinaryOp(left, right, (leftVal, rightVal) => {
    //         const leftNum = toNumber(leftVal);
    //         const rightNum = toNumber(rightVal);

    //         switch (operator) {
    //             case '*':
    //                 return leftNum * rightNum;
    //             case '/':
    //                 if (rightNum === 0) {
    //                     throw new DivisionByZeroError();
    //                 }
    //                 return leftNum / rightNum;
    //             case '%':
    //                 if (rightNum === 0) {
    //                     throw new DivisionByZeroError();
    //                 }
    //                 return leftNum % rightNum;
    //             default:
    //                 throw new JexLangRuntimeError(`Unknown operator: ${operator}`);
    //         }
    //     });
    // }

    // visitAddSubExpression = (ctx: JexLangParser.AddSubExpressionContext): MaybePromise<JexValue> => {
    //     const left = this.visit(ctx.expression(0));
    //     const right = this.visit(ctx.expression(1));
    //     const operator = ctx.getChild(1).getText();

    //     return this.handleBinaryOp(left, right, (leftVal, rightVal) => {
    //         if (operator === '+' && (typeof leftVal === 'string' || typeof rightVal === 'string')) {
    //             return toString(leftVal) + toString(rightVal);
    //         }

    //         const leftNum = toNumber(leftVal);
    //         const rightNum = toNumber(rightVal);

    //         switch (operator) {
    //             case '+':
    //                 return leftNum + rightNum;
    //             case '-':
    //                 return leftNum - rightNum;
    //             default:
    //                 throw new JexLangRuntimeError(`Unknown operator: ${operator}`);
    //         }
    //     });
    // }

    // visitComparatorExpression = (ctx: JexLangParser.ComparatorExpressionContext): MaybePromise<JexValue> => {
    //     const left = this.visit(ctx.expression(0));
    //     const right = this.visit(ctx.expression(1));
    //     const operator = ctx.getChild(1).getText();

    //     return this.handleBinaryOp(left, right, (leftVal, rightVal) => {
    //         switch (operator) {
    //             case '==':
    //                 return leftVal == rightVal;
    //             case '!=':
    //                 return leftVal != rightVal;
    //             case '<':
    //                 return (leftVal == null ? 0 : leftVal) < (rightVal == null ? 0 : rightVal);
    //             case '>':
    //                 return (leftVal == null ? 0 : leftVal) > (rightVal == null ? 0 : rightVal);
    //             case '<=':
    //                 return (leftVal == null ? 0 : leftVal) <= (rightVal == null ? 0 : rightVal);
    //             case '>=':
    //                 return (leftVal == null ? 0 : leftVal) >= (rightVal == null ? 0 : rightVal);
    //             default:
    //                 throw new JexLangRuntimeError(`Unknown comparator operator: ${operator}`);
    //         }
    //     });
    // }

    // visit(tree: ParseTree): MaybePromise<JexValue> {
    //     return super.visit(tree);
    // }

    // visitParenthesizedExpression = (ctx: JexLangParser.ParenthesizedExpressionContext): MaybePromise<JexValue> => {
    //     return this.visit(ctx.expression());
    // }

    // visitFunctionCallExpression = (ctx: JexLangParser.FunctionCallExpressionContext): MaybePromise<JexValue> => {
    //     return this.visit(ctx.functionCall());
    // }

    // private getVariableValue(name: string): JexValue | undefined {
    //     const resolvedScope = this.scope.resolveScope(name);
    //     if (!resolvedScope) {
    //         return undefined;
    //     }
        
    //     try {
    //         // We need to extract the value from the scope
    //         // This requires adding a method to the Scope class to get a variable value
    //         // For now, let's assume there's a way to get the value
    //         // I'll add a comment to indicate this needs to be implemented in Scope class
    //         // NEEDS IMPLEMENTATION: Scope.getVariable(name) method
    //         return undefined; // Placeholder, replace with actual implementation
    //     } catch (error) {
    //         return undefined;
    //     }
    // }

    // visitVariableExpression = (ctx: JexLangParser.VariableExpressionContext): MaybePromise<JexValue> => {
    //     const variableName = ctx.IDENTIFIER().getText();
    //     const resolvedScope = this.scope.resolveScope(variableName);

    //     if (!resolvedScope) {
    //         throw new UndefinedVariableError(variableName);
    //     }

    //     return resolvedScope.getVariable(variableName);
    // }

    // visitNumberExpression = (ctx: JexLangParser.NumberExpressionContext): MaybePromise<JexValue> => {
    //     return parseFloat(ctx.NUMBER().getText());
    // }

    // visitBooleanExpression = (ctx: JexLangParser.BooleanExpressionContext): MaybePromise<JexValue> => {
    //     return ctx.BOOLEAN().getText() === "true";
    // }

    // visitFunctionCall = (ctx: JexLangParser.FunctionCallContext): MaybePromise<JexValue> => {
    //     const functionName = ctx.IDENTIFIER().getText();

    //     if (!this.funcRegistry.has(functionName)) {
    //         throw new UndefinedFunctionError(functionName);
    //     }

    //     const args: MaybePromise<JexValue[]> = ctx.argumentList() ? this.visit(ctx.argumentList()) as MaybePromise<JexValue[]> : [];

    //     try {
    //         if (args instanceof Promise) {
    //             return args.then(resolvedArgs => {
    //                 return this.handlePromise(this.funcRegistry.call(functionName, resolvedArgs), res => res);
    //             }).catch(error => {
    //                 if (error instanceof JexLangRuntimeError) {
    //                     throw error;
    //                 } else {
    //                     throw new JexLangRuntimeError(
    //                         `Error calling function '${functionName}': ${error instanceof Error ? error.message : String(error)}`
    //                     );
    //                 }
    //             });
    //         } else {
    //             return this.handlePromises(args, (...resolvedArgs) => {
    //                 return this.handlePromise(this.funcRegistry.call(functionName, resolvedArgs), res => res);
    //             });
    //         }
    //     } catch (error) {
    //         throw new JexLangRuntimeError(
    //             `Error calling function '${functionName}': ${error instanceof Error ? error.message : String(error)}`
    //         );
    //     }
    // }

    // visitArgumentList = (ctx: JexLangParser.ArgumentListContext): MaybePromise<JexValue[]> => {
    //     const argPromises: MaybePromise<JexValue>[] = [];
    //     for (let i = 0; i < ctx.expression_list().length; i++) {
    //         argPromises.push(this.visit(ctx.expression(i)));
    //     }

    //     return this.handlePromises(argPromises, (...resolvedArgs) => resolvedArgs) as MaybePromise<JexValue[]>;
    // }

    // visitStringExpression = (ctx: JexLangParser.StringExpressionContext): MaybePromise<JexValue> => {
    //     return ctx.STRING().getText().slice(1, -1);
    // };

    // visitDotPropertyAccessExpression = (ctx: JexLangParser.DotPropertyAccessExpressionContext): MaybePromise<JexValue> => {
    //     const objPromise = this.visit(ctx.expression());
    //     const prop = ctx.IDENTIFIER().getText();
        
    //     return this.handlePromise(objPromise, obj => {
    //         if (
    //             obj &&
    //             typeof obj === "object" &&
    //             !Array.isArray(obj) &&
    //             prop in obj
    //         ) {
    //             return obj[prop];
    //         }
    //         return null;
    //     });
    // }

    // visitDotPropertyAssignment = (ctx: JexLangParser.DotPropertyAssignmentContext): MaybePromise<JexValue> => {
    //     const objPromise = this.visit(ctx.expression(0));
    //     const prop = ctx.IDENTIFIER().getText();
    //     const valuePromise = this.visit(ctx.expression(1));

    //     return this.handlePromises([objPromise, valuePromise], (obj, value) => {
    //         const isObject = obj && typeof obj === "object" && !Array.isArray(obj);

    //         if (isObject) {
    //             (obj as { [k: string]: JexValue })[prop] = value;
    //             return value;
    //         }

    //         return null;
    //     });
    // }

    // visitBracketPropertyAccessExpression = (ctx: JexLangParser.BracketPropertyAccessExpressionContext): MaybePromise<JexValue> => {
    //     const objPromise = this.visit(ctx.expression(0));
    //     const propPromise = this.visit(ctx.expression(1));

    //     return this.handlePromises([objPromise, propPromise], (obj, prop) => {
    //         if (
    //             obj &&
    //             typeof obj === "object" &&
    //             prop !== null &&
    //             prop !== undefined
    //         ) {
    //             if (Array.isArray(obj)) {
    //                 const index = typeof prop === "number" ? prop : Number(prop);
    //                 const normalizedIndex = index < 0 ? obj.length + index : index;
    //                 if (!isNaN(normalizedIndex) && normalizedIndex >= 0 && normalizedIndex < obj.length) {
    //                     return obj[normalizedIndex];
    //                 }
    //             } else if (typeof prop === "string" || typeof prop === "number" || typeof prop === "symbol") {
    //                 if (prop in obj) {
    //                     return obj[prop];
    //                 }
    //             }
    //         }
    //         return null;
    //     });
    // }

    // visitBracketPropertyAssignment = (ctx: JexLangParser.BracketPropertyAssignmentContext): MaybePromise<JexValue> => {
    //     const objPromise = this.visit(ctx.expression(0));
    //     const propPromise = this.visit(ctx.expression(1));
    //     const valuePromise = this.visit(ctx.expression(2));

    //     return this.handlePromises(
    //         [objPromise, propPromise, valuePromise],
    //         (obj, prop, value) => {
    //             if (
    //                 obj &&
    //                 typeof obj === "object" &&
    //                 prop !== null &&
    //                 prop !== undefined
    //             ) {
    //                 if (Array.isArray(obj)) {
    //                     const index = typeof prop === "number" ? prop : Number(prop);
    //                     const normalizedIndex = index < 0 ? obj.length + index : index;
    //                     if (!isNaN(normalizedIndex) && normalizedIndex >= 0 && normalizedIndex < obj.length) {
    //                         obj[normalizedIndex] = value;
    //                         return value;
    //                     }
    //                 } else if (typeof prop === "string" || typeof prop === "number" || typeof prop === "symbol") {
    //                     obj[prop] = value;
    //                     return value;
    //                 }
    //             }
    //             return null;
    //         }
    //     );
    // }

    // visitTransformExpression = (ctx: JexLangParser.TransformExpressionContext): MaybePromise<JexValue> => {
    //     const input = this.visit(ctx.expression());
    //     const transformName = ctx.IDENTIFIER().getText();

    //     return this.handlePromise(input, (resolvedInput) => {
    //         if (this.transformRegistry.has(transformName)) {
    //             try {
    //                 return this.transformRegistry.transform(transformName, resolvedInput);
    //             } catch (error) {
    //                 throw new JexLangRuntimeError(
    //                     `Error in transform '${transformName}': ${error instanceof Error ? error.message : String(error)}`
    //                 );
    //             }
    //         }

    //         if (this.funcRegistry.has(transformName)) {
    //             try {
    //                 return this.funcRegistry.call(transformName, [resolvedInput]);
    //             } catch (error) {
    //                 throw new JexLangRuntimeError(
    //                     `Error in transform '${transformName}': ${error instanceof Error ? error.message : String(error)}`
    //                 );
    //             }
    //         }

    //         throw new UndefinedTransformError(transformName);
    //     });
    // }

    // visitLogicalAndExpression = (ctx: JexLangParser.LogicalAndExpressionContext): MaybePromise<JexValue> => {
    //     const left = this.visit(ctx.expression(0));
        
    //     return this.handlePromise(left, resolvedLeft => {
    //         if (!resolvedLeft) {
    //             return resolvedLeft;
    //         }

    //         return this.visit(ctx.expression(1));
    //     });
    // }

    // visitLogicalOrExpression = (ctx: JexLangParser.LogicalOrExpressionContext): MaybePromise<JexValue> => {
    //     const left = this.visit(ctx.expression(0));

    //     return this.handlePromise(left, (resolvedLeft) => {
    //         if (resolvedLeft) {
    //             return resolvedLeft; // no need to evaluate the right if left is already true.
    //         }

    //         return this.visit(ctx.expression(1));
    //     });
    // }

    // visitTernaryExpression = (ctx: JexLangParser.TernaryExpressionContext): MaybePromise<JexValue> => {
    //     const condition = this.visit(ctx.expression(0));

    //     return this.handlePromise(condition, (resolvedCondition) => {
    //         if (resolvedCondition != null && resolvedCondition != undefined) {
    //             return this.visit(ctx.expression(1));
    //         } else {
    //             return this.visit(ctx.expression(2));
    //         }
    //     });
    // }

    // visitShortTernaryExpression = (ctx: JexLangParser.ShortTernaryExpressionContext): MaybePromise<JexValue> => {
    //     const condition = this.visit(ctx.expression(0));

    //     return this.handlePromise(condition, (resolvedCondition) => {
    //         if (resolvedCondition != null && resolvedCondition != undefined) {
    //             return resolvedCondition;
    //         } else 
    //             return this.visit(ctx.expression(1));

    //     });
    // }

    // visitErrorNode(node: ErrorNode): JexValue {
    //     const location = {
    //         line: node.symbol?.line || 0,
    //         column: node.symbol?.column || 0,
    //         offendingSymbol: node.getText() || null
    //     };

    //     let errorMessage = "Syntax error";

    //     if (node.symbol) {
    //         const tokenType = node.symbol.type;
    //         const tokenText = this.escapeTokenText(node.symbol.text || '');

    //         if (tokenType >= 0) {
    //             errorMessage = `Unexpected token '${tokenText}'`;
    //         } else {
    //             errorMessage = `Invalid syntax near '${tokenText}'`;
    //         }

    //         if (node.symbol.line > 0) {
    //             errorMessage += ` at line ${node.symbol.line}:${node.symbol.column + 1}`;
    //         }
    //     } else {
    //         errorMessage = `Syntax error encountered: ${node.getText()}`;
    //     }

    //     throw new JexLangSyntaxError(errorMessage, location);
    // }

    // private escapeTokenText(text: string): string {
    //     return text
    //         .replace(/\n/g, '\\n')
    //         .replace(/\r/g, '\\r')
    //         .replace(/\t/g, '\\t');
    // }

    // protected defaultResult(): JexValue {
    //     return null;
    // }

    // visitPrefixIncrementExpression = (ctx: JexLangParser.PrefixIncrementExpressionContext): MaybePromise<JexValue> => {
    //     const expr = ctx.expression();
    //     if (!(expr instanceof JexLangParser.VariableExpressionContext)) {
    //         throw new JexLangRuntimeError("Increment operator can only be applied to variables");
    //     }

    //     const variableName = expr.IDENTIFIER().getText();

    //     return this.handleVarModification(
    //         variableName,
    //         (currentValue) => {
    //             const numValue = toNumber(currentValue);
    //             const newValue = numValue + 1;
    //             return { newValue, result: newValue };
    //         }
    //     );
    // }

    // visitPrefixDecrementExpression = (ctx: JexLangParser.PrefixDecrementExpressionContext): MaybePromise<JexValue> => {
    //     const expr = ctx.expression();
    //     if (!(expr instanceof JexLangParser.VariableExpressionContext)) {
    //         throw new JexLangRuntimeError("Decrement operator can only be applied to variables");
    //     }

    //     const variableName = expr.IDENTIFIER().getText();

    //     return this.handleVarModification(
    //         variableName,
    //         (currentValue) => {
    //             const numValue = toNumber(currentValue);
    //             const newValue = numValue - 1;
    //             return { newValue, result: newValue };
    //         }
    //     );
    // }

    // visitPostfixIncrementExpression = (ctx: JexLangParser.PostfixIncrementExpressionContext): MaybePromise<JexValue> => {
    //     const expr = ctx.expression();
    //     if (!(expr instanceof JexLangParser.VariableExpressionContext)) {
    //         throw new JexLangRuntimeError("Increment operator can only be applied to variables");
    //     }

    //     const variableName = expr.IDENTIFIER().getText();

    //     return this.handleVarModification(
    //         variableName,
    //         (currentValue) => {
    //             const numValue = toNumber(currentValue);
    //             const newValue = numValue + 1;
    //             return { newValue, result: numValue };
    //         }
    //     );
    // }

    // visitPostfixDecrementExpression = (ctx: JexLangParser.PostfixDecrementExpressionContext): MaybePromise<JexValue> => {
    //     const expr = ctx.expression();
    //     if (!(expr instanceof JexLangParser.VariableExpressionContext)) {
    //         throw new JexLangRuntimeError("Decrement operator can only be applied to variables");
    //     }

    //     const variableName = expr.IDENTIFIER().getText();

    //     return this.handleVarModification(
    //         variableName,
    //         (currentValue) => {
    //             const numValue = toNumber(currentValue);
    //             const newValue = numValue - 1;
    //             return { newValue, result: numValue };
    //         }
    //     );
    // }

    // visitObjectLiteral = (ctx: JexLangParser.ObjectLiteralContext): MaybePromise<JexValue> => {
    //     const obj: Record<string, JexValue> = {};
    //     const propertyPromises: MaybePromise<JexValue>[] = [];

    //     for (let i = 0; i < ctx.objectProperty_list().length; i++) {
    //         propertyPromises.push(this.visit(ctx.objectProperty(i)));
    //     }

    //     return this.handlePromises(propertyPromises, (...resolvedProps) => {
    //         for (const prop of resolvedProps) {
    //             if (prop && typeof prop === 'object' && !Array.isArray(prop)) {
    //                 Object.assign(obj, prop);
    //             }
    //         }
    //         return obj;
    //     });
    // }

    // visitObjectProperty = (ctx: JexLangParser.ObjectPropertyContext): MaybePromise<JexValue> => {
    //     const obj: Record<string, JexValue> = {};
    //     let key: string | null = null;

    //     if (ctx.IDENTIFIER()) {
    //         const idText = ctx.IDENTIFIER().getText();
    //         const resolvedScope = this.scope.resolveScope(idText);
            
    //         if (resolvedScope) {
    //             const varValue = resolvedScope.getVariable(idText);
    //             if (varValue !== null && varValue !== undefined) {
    //                 key = toString(varValue);
    //             }
    //         } else {
    //             key = idText; // Use the identifier as the key if not found
    //         }
    //     } else if (ctx.STRING()) {
    //         key = ctx.STRING().getText().slice(1, -1);
    //     }

    //     return this.handlePromise(this.visit(ctx.expression()), resolvedValue => {
    //         if (key !== null && key !== undefined && key.length > 0) {
    //             obj[toString(key)] = resolvedValue;
    //         }
    //         return obj;
    //     });
    // }

    // visitArrayLiteral = (ctx: JexLangParser.ArrayLiteralContext): MaybePromise<JexValue> => {
    //     const argPromises: MaybePromise<JexValue>[] = [];

    //     for (let i = 0; i < ctx.expression_list().length; i++) {
    //         argPromises.push(this.visit(ctx.expression(i)));
    //     }

    //     return this.handlePromises(argPromises, (...resolvedArgs) => resolvedArgs);
    // }

    // visitArrayLiteralExpression = (ctx: JexLangParser.ArrayLiteralExpressionContext): MaybePromise<JexValue> => {
    //     return this.visit(ctx.arrayLiteral());
    // }

    // visitObjectLiteralExpression = (ctx: JexLangParser.ObjectLiteralExpressionContext): MaybePromise<JexValue> => {
    //     return this.visit(ctx.objectLiteral());
    // }
}

export function createDefaultFuncRegistry(): MapFuncRegistry {
    return new MapFuncRegistry(BUILT_IN_FUNCTIONS);
}

export function createDefaultTransformRegistry(): MapTransformRegistry {
    return new MapTransformRegistry(BUILT_IN_TRANSFORMS);
}
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

    visitPrefixExpression = (ctx: JexLangParser.PrefixExpressionContext): MaybePromise<JexValue> => {
        const expr = ctx.singleExpression();
        
        // Handle identifier expressions (variables)
        if (expr instanceof JexLangParser.IdentifierExpressionContext) {
            const varName = expr.IDENTIFIER().getText();
            if (!this.scope.hasVariable(varName)) {
                throw new UndefinedVariableError(varName);
            }
            
            let value = this.scope.getVariable(varName);
            return this.handlePromise(value, (resolvedValue) => {
                const numValue = toNumber(resolvedValue);
                const newValue = ctx.INCREMENT() ? numValue + 1 : numValue - 1;
                this.scope.assignVariable(varName, newValue);
                return newValue;
            });
        }
        // Handle property access expressions (obj.prop or obj[prop])
        else if (expr instanceof JexLangParser.MemberDotExpressionContext) {
            const object = this.visit(expr.singleExpression());
            const propNameCtx = expr.objectPropertyName();
            return this.handlePromises([object, this.visit(propNameCtx)], (obj: Record<string, JexValue>, propName: JexValue) => {
                if (obj == null || typeof obj !== 'object') {
                    throw new JexLangRuntimeError('Cannot use prefix operator on a non-object property');
                }
                const currentValue = toNumber(obj[toString(propName)]);
                const newValue = ctx.INCREMENT() ? currentValue + 1 : currentValue - 1;
                obj[toString(propName)] = newValue;
                return newValue;
            });
        }
        else if (expr instanceof JexLangParser.MemberIndexExpressionContext) {
            const object = this.visit(expr.singleExpression());
            const index = this.visit(expr.expressionSequence());
            return this.handlePromises([object, index], (obj: Record<string, JexValue>, idx: JexValue) => {
                if (obj == null || typeof obj !== 'object') {
                    throw new JexLangRuntimeError('Cannot use prefix operator on a non-object index');
                }
                if (Array.isArray(obj)) {
                    const indexNumber = toNumber(idx);
                    let normalizedIndex = isNaN(indexNumber) ? -1 : indexNumber;
                    if (normalizedIndex < 0) {
                        normalizedIndex = obj.length + normalizedIndex;
                    }
                    if (normalizedIndex >= 0 && normalizedIndex < obj.length) {
                        const currentValue = toNumber(obj[normalizedIndex]);
                        const newValue = ctx.INCREMENT() ? currentValue + 1 : currentValue - 1;
                        obj[normalizedIndex] = newValue;
                        return newValue;
                    }
                    return null; // Out of bounds
                } else {
                    const key = toString(idx);
                    const currentValue = toNumber(obj[key]);
                    const newValue = ctx.INCREMENT() ? currentValue + 1 : currentValue - 1;
                    obj[key] = newValue;
                    return newValue;
                }
            });
        }
        // For other expressions, we'll just calculate but not store
        else {
            return this.handlePromise(this.visit(expr), (value) => {
                if (ctx.DECREMENT()) {
                    return toNumber(value) - 1;
                } else if (ctx.INCREMENT()) {
                    return toNumber(value) + 1;
                }
                return null;
            });
        }
    };

    visitPostfixExpression = (ctx: JexLangParser.PostfixExpressionContext): MaybePromise<JexValue> => {
        const expr = ctx.singleExpression();
        
        // Handle identifier expressions (variables)
        if (expr instanceof JexLangParser.IdentifierExpressionContext) {
            const varName = expr.IDENTIFIER().getText();
            if (!this.scope.hasVariable(varName)) {
                throw new UndefinedVariableError(varName);
            }
            
            let value = this.scope.getVariable(varName);
            return this.handlePromise(value, (resolvedValue) => {
                const currentValue = toNumber(resolvedValue);
                const newValue = ctx.INCREMENT() ? currentValue + 1 : currentValue - 1;
                this.scope.assignVariable(varName, newValue);
                return currentValue; // Return the original value for postfix operators
            });
        }
        // Handle property access expressions (obj.prop or obj[prop])
        else if (expr instanceof JexLangParser.MemberDotExpressionContext) {
            const object = this.visit(expr.singleExpression());
            const propNameCtx = expr.objectPropertyName();
            return this.handlePromises([object, this.visit(propNameCtx)], (obj: Record<string, JexValue>, propName: JexValue) => {
                if (obj == null || typeof obj !== 'object') {
                    throw new JexLangRuntimeError('Cannot use postfix operator on a non-object property');
                }
                const currentValue = toNumber(obj[toString(propName)]);
                const newValue = ctx.INCREMENT() ? currentValue + 1 : currentValue - 1;
                obj[toString(propName)] = newValue;
                return currentValue; // Return the original value for postfix operators
            });
        }
        else if (expr instanceof JexLangParser.MemberIndexExpressionContext) {
            const object = this.visit(expr.singleExpression());
            const index = this.visit(expr.expressionSequence());
            return this.handlePromises([object, index], (obj: Record<string, JexValue>, idx: JexValue) => {
                if (obj == null || typeof obj !== 'object') {
                    throw new JexLangRuntimeError('Cannot use postfix operator on a non-object index');
                }
                if (Array.isArray(obj)) {
                    const indexNumber = toNumber(idx);
                    let normalizedIndex = isNaN(indexNumber) ? -1 : indexNumber;
                    if (normalizedIndex < 0) {
                        normalizedIndex = obj.length + normalizedIndex;
                    }
                    if (normalizedIndex >= 0 && normalizedIndex < obj.length) {
                        const currentValue = toNumber(obj[normalizedIndex]);
                        const newValue = ctx.INCREMENT() ? currentValue + 1 : currentValue - 1;
                        obj[normalizedIndex] = newValue;
                        return currentValue; // Return the original value for postfix operators
                    }
                    return null; // Out of bounds
                } else {
                    const key = toString(idx);
                    const currentValue = toNumber(obj[key]);
                    const newValue = ctx.INCREMENT() ? currentValue + 1 : currentValue - 1;
                    obj[key] = newValue;
                    return currentValue; // Return the original value for postfix operators
                }
            });
        }
        // For other expressions, we'll just calculate but not store
        else {
            return this.handlePromise(this.visit(expr), (value) => {
                if (ctx.DECREMENT()) {
                    return toNumber(value) - 1;
                } else if (ctx.INCREMENT()) {
                    return toNumber(value) + 1;
                }
                return null;
            });
        }
    };
}

export function createDefaultFuncRegistry(): MapFuncRegistry {
    return new MapFuncRegistry(BUILT_IN_FUNCTIONS);
}

export function createDefaultTransformRegistry(): MapTransformRegistry {
    return new MapTransformRegistry(BUILT_IN_TRANSFORMS);
}
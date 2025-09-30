import { describe, expect, it } from "vitest";
import * as JexLangParser from "../../grammar/JexLangParser";
import { EvalVisitor } from "./EvalVisitor";
import { BUILT_IN_FUNCTIONS } from "../functions";
import { BUILT_IN_TRANSFORMS } from "../transforms";

function createJexLangParserContext<T>(overrides: Partial<T> = {}): T {
  // Create a dummy object with no prototype to mimic context instance
  const mock: any = Object.create(null);

  // Override or add any properties or methods passed in
  for (const key in overrides) {
    if (overrides.hasOwnProperty(key)) {
      mock[key] = overrides[key];
    }
  }

  return mock as T;
}

const createBooleanLiteralContext = (text: string) => {
  return createJexLangParserContext<JexLangParser.BooleanLiteralContext>({
    getText: () => text,
    accept(visitor) {
        return visitor.visitBooleanLiteral!(this as any);
    },
  });
}

const createNumberLiteralContext = (text: string) => {
  return createJexLangParserContext<JexLangParser.NumberLiteralContext>({
    getText: () => text,
    accept(visitor) {
        return visitor.visitNumberLiteral!(this as any);
    },
  });
}

const createStringLiteralContext = (text: string) => {
  return createJexLangParserContext<JexLangParser.StringLiteralContext>({
    getText: () => text,
    accept(visitor) {
        return visitor.visitStringLiteral!(this as any);
    },
  });
}

describe("EvalVisitor", () => {

    describe('constructor', () => {
        it('should create an instance of EvalVisitor', () => {
            const visitor = new EvalVisitor();
            expect(visitor).toBeInstanceOf(EvalVisitor);
        });

        it('should have properly set the default constructor parameters', () => {
            const visitor = new EvalVisitor();
            const globalScopeVars = visitor.getGlobalScopeVariables();
            expect(globalScopeVars).toEqual({
                PI: Math.PI,
                E: Math.E,
                LN2: Math.LN2,
                LN10: Math.LN10,
                LOG2E: Math.LOG2E,
                LOG10E: Math.LOG10E,
                SQRT1_2: Math.SQRT1_2,
                SQRT2: Math.SQRT2,
                VERSION: expect.any(String),
                __CLIENT_LANGUAGE: "javascript"
            });

            // Check if built-in functions are registered
            for (const func in BUILT_IN_FUNCTIONS) {
                expect(visitor.hasFunction(func)).toBe(true);
            }

            // Check if built-in transforms are registered
            for (const transform in BUILT_IN_TRANSFORMS) {
                expect(visitor.hasTransform(transform)).toBe(true);
            }
        });

        it('should properly add custom functions and transforms', () => {
            // Add new function and check it is available
            const visitor = new EvalVisitor();
            visitor.addFunction("testFunc", () => "test");
            expect(visitor.hasFunction("testFunc")).toBe(true);

            // Add new transform and check it is available
            visitor.addTransform("testTransform", (input) => input);
            expect(visitor.hasTransform("testTransform")).toBe(true);
        })

        it('should properly set the functions and transforms from constructor parameters', () => {
            const customFunc = (x: any) => x;
            const customTransform = (input: any) => input;

            const visitor = new EvalVisitor(
                undefined,
                { "customFunc": customFunc },
                { "customTransform": customTransform }
            );

            expect(visitor.hasFunction("customFunc")).toBe(true);
            expect(visitor.hasTransform("customTransform")).toBe(true);
        });

        it('should initialize programScopeContext to an empty object', () => {
            const visitor = new EvalVisitor();
            expect(visitor.getProgramScopeContext()).toEqual({});
        });

        it('should set and reset programScopeContext correctly', () => {
            const visitor = new EvalVisitor();
            const context = { key: "value" };
            visitor.setProgramScopeContext(context);
            expect(visitor.getProgramScopeContext()).toEqual(context);

            visitor.resetProgramScopeContext();
            expect(visitor.getProgramScopeContext()).toEqual({});
        });
    });

    describe('visitLiteralExpression', () => {
        it('should delegate to visitBooleanLiteral for boolean literals', () => {
            const visitor = new EvalVisitor();
            const ctx = createJexLangParserContext<JexLangParser.LiteralExpressionContext>({
                literal: () => createBooleanLiteralContext("true"),
            });
            const result = visitor.visitLiteralExpression(ctx);
            expect(result).toBe(true);

            const ctx2 = createJexLangParserContext<JexLangParser.LiteralExpressionContext>({
                literal: () => createBooleanLiteralContext("false"),
            });
            const result2 = visitor.visitLiteralExpression(ctx2);
            expect(result2).toBe(false);

            const ctx3 = createJexLangParserContext<JexLangParser.LiteralExpressionContext>({
                literal: () => createBooleanLiteralContext("anything else"),
            });
            const result3 = visitor.visitLiteralExpression(ctx3);
            expect(result3).toBe(false);

            const ctx4 = createJexLangParserContext<JexLangParser.LiteralExpressionContext>({
                literal: () => createBooleanLiteralContext(""),
            });
            const result4 = visitor.visitLiteralExpression(ctx4);
            expect(result4).toBe(false);
        });

        it('should delegate to visitNumberLiteral for number literals', () => {
            const visitor = new EvalVisitor();
            const ctx = createJexLangParserContext<JexLangParser.LiteralExpressionContext>({
                literal: () => createNumberLiteralContext("42"),
            });
            const result = visitor.visitLiteralExpression(ctx);
            expect(result).toBe(42);

            const ctx2 = createJexLangParserContext<JexLangParser.LiteralExpressionContext>({
                literal: () => createNumberLiteralContext("3.14"),
            });
            const result2 = visitor.visitLiteralExpression(ctx2);
            expect(result2).toBe(3.14);

            const ctx3 = createJexLangParserContext<JexLangParser.LiteralExpressionContext>({
                literal: () => createNumberLiteralContext("-7"),
            });
            const result3 = visitor.visitLiteralExpression(ctx3);
            expect(result3).toBe(-7);

            const ctx4 = createJexLangParserContext<JexLangParser.LiteralExpressionContext>({
                literal: () => createNumberLiteralContext("0"),
            });
            const result4 = visitor.visitLiteralExpression(ctx4);
            expect(result4).toBe(0);

            const ctx5 = createJexLangParserContext<JexLangParser.LiteralExpressionContext>({
                literal: () => createNumberLiteralContext("-0.001"),
            });
            const result5 = visitor.visitLiteralExpression(ctx5);
            expect(result5).toBe(-0.001);
        });

        it('should delegate to visitStringLiteral for string literals', () => {
            const visitor = new EvalVisitor();
            const ctx = createJexLangParserContext<JexLangParser.LiteralExpressionContext>({
                literal: () => createStringLiteralContext('"hello"'),
            });
            const result = visitor.visitLiteralExpression(ctx);
            expect(result).toBe("hello");

            const ctx2 = createJexLangParserContext<JexLangParser.LiteralExpressionContext>({
                literal: () => createStringLiteralContext("'world'"),
            });
            const result2 = visitor.visitLiteralExpression(ctx2);
            expect(result2).toBe("world");

            const ctx3 = createJexLangParserContext<JexLangParser.LiteralExpressionContext>({
                literal: () => createStringLiteralContext('"123"'),
            });
            const result3 = visitor.visitLiteralExpression(ctx3);
            expect(result3).toBe("123");

            const ctx4 = createJexLangParserContext<JexLangParser.LiteralExpressionContext>({
                literal: () => createStringLiteralContext("''"),
            });
            const result4 = visitor.visitLiteralExpression(ctx4);
            expect(result4).toBe("");

            const ctx5 = createJexLangParserContext<JexLangParser.LiteralExpressionContext>({
                literal: () => createStringLiteralContext('""'),
            });
            const result5 = visitor.visitLiteralExpression(ctx5);
            expect(result5).toBe("");
        });

        it('should delegate to visitNullLiteral for null literals', () => {
            const visitor = new EvalVisitor();
            const ctx = createJexLangParserContext<JexLangParser.LiteralExpressionContext>({
                literal: () => createJexLangParserContext<JexLangParser.NullLiteralContext>({
                    getText: () => "null",
                    accept(v) {
                        return v.visitNullLiteral!(this as any);
                    },
                }),
            });
            const result = visitor.visitLiteralExpression(ctx);
            expect(result).toBeNull();

            const ctx2 = createJexLangParserContext<JexLangParser.LiteralExpressionContext>({
                literal: () => createJexLangParserContext<JexLangParser.NullLiteralContext>({
                    getText: () => "anything else",
                    accept(v) {
                        return v.visitNullLiteral!(this as any);
                    },
                }),
            });
            const result2 = visitor.visitLiteralExpression(ctx2);
            expect(result2).toBeNull();

            const ctx3 = createJexLangParserContext<JexLangParser.LiteralExpressionContext>({
                literal: () => createJexLangParserContext<JexLangParser.NullLiteralContext>({
                    getText: () => "null",
                    accept(v) {
                        return v.visitNullLiteral!(this as any);
                    },
                }),
            });
            const result3 = visitor.visitLiteralExpression(ctx3);
            expect(result3).toBeNull();
        });
    });

    describe('visitBooleanLiteral', () => {
        it('should return true for "true" literal', () => {
            const visitor = new EvalVisitor();
            const ctx = createBooleanLiteralContext("true");
            const result = visitor.visitBooleanLiteral(ctx);
            expect(result).toBe(true);
        });

        it('should return false for "false" literal', () => {
            const visitor = new EvalVisitor();
            const ctx = createBooleanLiteralContext("false");
            const result = visitor.visitBooleanLiteral(ctx);
            expect(result).toBe(false);
        });

        it('should return false for all other literals than "true"', () => {
            const visitor = new EvalVisitor();
            const ctx1 = createBooleanLiteralContext("anything else");
            const result1 = visitor.visitBooleanLiteral(ctx1);
            expect(result1).toBe(false);

            const ctx2 = createBooleanLiteralContext("");
            const result2 = visitor.visitBooleanLiteral(ctx2);
            expect(result2).toBe(false);

            const ctx3 = createBooleanLiteralContext("TRUE");
            const result3 = visitor.visitBooleanLiteral(ctx3);
            expect(result3).toBe(true);

            const ctx4 = createBooleanLiteralContext("False");
            const result4 = visitor.visitBooleanLiteral(ctx4);
            expect(result4).toBe(false);

            const ctx5 = createBooleanLiteralContext("1");
            const result5 = visitor.visitBooleanLiteral(ctx5);
            expect(result5).toBe(false);
        });
    });

    describe('visitNumberLiteral', () => {
        it('should parse valid number literals correctly', () => {
            const visitor = new EvalVisitor();

            const ctx1 = createNumberLiteralContext("42");
            expect(visitor.visitNumberLiteral(ctx1)).toBe(42);

            const ctx2 = createNumberLiteralContext("3.14");
            expect(visitor.visitNumberLiteral(ctx2)).toBe(3.14);

            const ctx3 = createNumberLiteralContext("-7");
            expect(visitor.visitNumberLiteral(ctx3)).toBe(-7);

            const ctx4 = createNumberLiteralContext("0");
            expect(visitor.visitNumberLiteral(ctx4)).toBe(0);

            const ctx5 = createNumberLiteralContext("-0.001");
            expect(visitor.visitNumberLiteral(ctx5)).toBe(-0.001);
        });

        it('should throw error for invalid number literals', () => {
            const visitor = new EvalVisitor();

            const ctx1 = createNumberLiteralContext("abc");
            expect(() => visitor.visitNumberLiteral(ctx1)).toThrow();

            const ctx2 = createNumberLiteralContext("12.34.56");
            expect(() => visitor.visitNumberLiteral(ctx2)).toThrow();

            const ctx3 = createNumberLiteralContext("--5");
            expect(() => visitor.visitNumberLiteral(ctx3)).toThrow();

            const ctx4 = createNumberLiteralContext("");
            expect(visitor.visitNumberLiteral(ctx4)).toBe(0);
        });
    });

    describe('visitStringLiteral', () => {
        it('should parse string literals correctly', () => {
            const visitor = new EvalVisitor();

            const ctx1 = createStringLiteralContext('"hello"');
            expect(visitor.visitStringLiteral(ctx1)).toBe("hello");

            const ctx2 = createStringLiteralContext("'world'");
            expect(visitor.visitStringLiteral(ctx2)).toBe("world");

            const ctx3 = createStringLiteralContext('"123"');
            expect(visitor.visitStringLiteral(ctx3)).toBe("123");

            const ctx4 = createStringLiteralContext("''");
            expect(visitor.visitStringLiteral(ctx4)).toBe("");

            const ctx5 = createStringLiteralContext('""');
            expect(visitor.visitStringLiteral(ctx5)).toBe("");
        });

        it('should handle escaped quotes in string literals', () => {
            const visitor = new EvalVisitor();

            const ctx1 = createStringLiteralContext('"He said \"Hello\""');
            expect(visitor.visitStringLiteral(ctx1)).toBe('He said "Hello"');

            const ctx2 = createStringLiteralContext("'It\'s a test'");
            expect(visitor.visitStringLiteral(ctx2)).toBe("It's a test");
        });

        it('validate for unterminated string literals', () => {
            const visitor = new EvalVisitor();

            const ctx1 = createStringLiteralContext('"hello');
            expect(visitor.visitStringLiteral(ctx1)).toBe("hell");

            const ctx2 = createStringLiteralContext("'world");
            expect(visitor.visitStringLiteral(ctx2)).toBe("worl");
        });
    });

    describe('visitNullLiteral', () => {
        it('should return null for null literal', () => {
            const visitor = new EvalVisitor();
            const ctx = createJexLangParserContext<JexLangParser.NullLiteralContext>({
                getText: () => "null",
            });
            const result = visitor.visitNullLiteral(ctx);
            expect(result).toBeNull();
        });

        it('should return null for any other text', () => {
            const visitor = new EvalVisitor();
            const ctx1 = createJexLangParserContext<JexLangParser.NullLiteralContext>({
                getText: () => "anything else",
            });
            expect(visitor.visitNullLiteral(ctx1)).toBeNull();

            const ctx2 = createJexLangParserContext<JexLangParser.NullLiteralContext>({
                getText: () => "",
            });
            expect(visitor.visitNullLiteral(ctx2)).toBeNull();
        });
    });
});
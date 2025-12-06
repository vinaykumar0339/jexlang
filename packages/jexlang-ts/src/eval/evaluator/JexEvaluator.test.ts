import { describe, it, expect, beforeEach } from 'vitest';
import { JexEvaluator } from './JexEvaluator';
import type { Context, FuncImpl, TransformImpl } from '../../types';
import { JexLangRuntimeError, JexLangSyntaxError } from '../errors';

describe('JexEvaluator', () => {
    let evaluator: JexEvaluator;

    beforeEach(() => {
        evaluator = new JexEvaluator();
    });

    describe('constructor', () => {
        it('should create an instance with default parameters', () => {
            const evaluator = new JexEvaluator();
            expect(evaluator).toBeInstanceOf(JexEvaluator);
            expect(evaluator.getGlobalScopeVariables()).toBeDefined();
        });

        it('should initialize with custom context', () => {
            const context: Context = { x: 10, y: 20 };
            const evaluator = new JexEvaluator(context);
            expect(evaluator.getContextValue('x')).toBe(10);
            expect(evaluator.getContextValue('y')).toBe(20);
        });

        it('should initialize with custom functions', () => {
            const customFunc: FuncImpl = () => 'test';
            const funcs = { customFunc };
            const evaluator = new JexEvaluator({}, funcs);
            expect(evaluator.hasFunction('customFunc')).toBe(true);
        });

        it('should initialize with custom transforms', () => {
            const customTransform: TransformImpl = (input) => input;
            const transforms = { customTransform };
            const evaluator = new JexEvaluator({}, {}, transforms);
            expect(evaluator.hasTransform('customTransform')).toBe(true);
        });
    });

    describe('evaluate', () => {
        it('should evaluate simple literal expressions', () => {
            expect(evaluator.evaluate('42')).toBe(42);
            expect(evaluator.evaluate('true')).toBe(true);
            expect(evaluator.evaluate('"hello"')).toBe('hello');
            expect(evaluator.evaluate('null')).toBeNull();
        });

        it('should evaluate arithmetic expressions', () => {
            expect(evaluator.evaluate('2 + 3')).toBe(5);
            expect(evaluator.evaluate('10 - 4')).toBe(6);
            expect(evaluator.evaluate('5 * 3')).toBe(15);
            expect(evaluator.evaluate('10 / 2')).toBe(5);
        });

        it('should evaluate with program scope context', () => {
            const result = evaluator.evaluate('x + y', { x: 5, y: 10 });
            expect(result).toBe(15);
        });

        it('should handle context variables', () => {
            evaluator.declareContextValue('value', 0);

            evaluator.setContextValue('value', 100);
            expect(evaluator.evaluate('value')).toBe(100);
        });
    });

    describe('evaluateSync', () => {
        it('should evaluate synchronously', () => {
            const result = evaluator.evaluateSync('2 + 3');
            expect(result).toBe(5);
        });

        it('should throw error for async operations', () => {
            // Assuming there's an async function registered
            const asyncFunc: FuncImpl = async () => 'async result';
            evaluator.addFunction('asyncFunc', asyncFunc);
            expect(() => evaluator.evaluateSync('asyncFunc()')).toThrow(JexLangRuntimeError);
        });

        it('should work with program scope context', () => {
            const result = evaluator.evaluateSync('a * b', { a: 4, b: 5 });
            expect(result).toBe(20);
        });
    });

    describe('evaluateAsync', () => {
        it('should return a promise', async () => {
            const result = evaluator.evaluateAsync('10 + 20');
            expect(result).toBeInstanceOf(Promise);
            expect(await result).toBe(30);
        });

        it('should handle async functions', async () => {
            const asyncFunc: FuncImpl = async () => 'async result';
            evaluator.addFunction('asyncFunc', asyncFunc);
            const result = await evaluator.evaluateAsync('asyncFunc()');
            expect(result).toBe('async result');
        });
    });

    describe('context management', () => {
        it('should set context value only if already declared', () => {
            // First declare the variable
            evaluator.declareContextValue('key', 'initial');
            expect(evaluator.getContextValue('key')).toBe('initial');
            
            // Now set it to a new value
            evaluator.setContextValue('key', 'value');
            expect(evaluator.getContextValue('key')).toBe('value');
        });

        it('should throw error when setting undeclared variable', () => {
            // Trying to set a variable that hasn't been declared should throw
            expect(() => evaluator.setContextValue('undeclared', 'value')).toThrow();
        });

        it('should declare context value', () => {
            evaluator.declareContextValue('newVar', 42);
            expect(evaluator.getContextValue('newVar')).toBe(42);
        });

        it('should declare const context value', () => {
            evaluator.declareContextValue('constVar', 100, true);
            expect(evaluator.getContextValue('constVar')).toBe(100);
            // Attempting to reassign should throw error
            expect(() => evaluator.setContextValue('constVar', 200)).toThrow();
        });

        it('should set or declare context value', () => {
            evaluator.setContextOrDeclareContextValue('var1', 10);
            expect(evaluator.getContextValue('var1')).toBe(10);
            
            evaluator.setContextOrDeclareContextValue('var1', 20);
            expect(evaluator.getContextValue('var1')).toBe(20);
        });

        it('should return null for undefined context value', () => {
            expect(evaluator.getContextValue('nonexistent')).toBeNull();
        });

        it('should reset context', () => {

            evaluator.declareContextValue('key', 'initial');

            evaluator.setContextValue('key', 'value');
            evaluator.resetContext();
            expect(evaluator.getContextValue('key')).toBeNull();
        });

        it('should get global scope variables', () => {
            const vars = evaluator.getGlobalScopeVariables();
            expect(vars).toBeDefined();
            expect(vars.PI).toBe(Math.PI);
            expect(vars.E).toBe(Math.E);
        });
    });

    describe('function management', () => {
        it('should add a function', () => {
            const testFunc: FuncImpl = () => 'test';
            evaluator.addFunction('testFunc', testFunc);
            expect(evaluator.hasFunction('testFunc')).toBe(true);
        });

        it('should add multiple functions', () => {
            const funcs = {
                func1: () => 1,
                func2: () => 2,
            };
            evaluator.addFunctions(funcs);
            expect(evaluator.hasFunction('func1')).toBe(true);
            expect(evaluator.hasFunction('func2')).toBe(true);
        });

        it('should remove a function', () => {
            const testFunc: FuncImpl = () => 'test';
            evaluator.addFunction('testFunc', testFunc);
            expect(evaluator.hasFunction('testFunc')).toBe(true);
            
            evaluator.removeFunction('testFunc');
            expect(evaluator.hasFunction('testFunc')).toBe(false);
        });

        it('should get all functions', () => {
            const testFunc: FuncImpl = () => 'test';
            evaluator.addFunction('testFunc', testFunc);
            const allFuncs = evaluator.getAllFunctions();
            expect(allFuncs.testFunc).toBeDefined();
        });

        it('should reset functions', () => {
            const testFunc: FuncImpl = () => 'test';
            evaluator.addFunction('testFunc', testFunc);
            expect(evaluator.hasFunction('testFunc')).toBe(true);
            
            evaluator.resetFunctions();
            expect(evaluator.hasFunction('testFunc')).toBe(false);
        });
    });

    describe('transform management', () => {
        it('should add a transform', () => {
            const testTransform: TransformImpl = (input) => input;
            evaluator.addTransform('testTransform', testTransform);
            expect(evaluator.hasTransform('testTransform')).toBe(true);
        });

        it('should add multiple transforms', () => {
            const transforms = {
                transform1: (input: any) => input,
                transform2: (input: any) => input,
            };
            evaluator.addTransforms(transforms);
            expect(evaluator.hasTransform('transform1')).toBe(true);
            expect(evaluator.hasTransform('transform2')).toBe(true);
        });

        it('should remove a transform', () => {
            const testTransform: TransformImpl = (input) => input;
            evaluator.addTransform('testTransform', testTransform);
            expect(evaluator.hasTransform('testTransform')).toBe(true);
            
            evaluator.removeTransform('testTransform');
            expect(evaluator.hasTransform('testTransform')).toBe(false);
        });

        it('should get all transforms', () => {
            const testTransform: TransformImpl = (input) => input;
            evaluator.addTransform('testTransform', testTransform);
            const allTransforms = evaluator.getAllTransforms();
            expect(allTransforms.testTransform).toBeDefined();
        });

        it('should reset transforms', () => {
            const testTransform: TransformImpl = (input) => input;
            evaluator.addTransform('testTransform', testTransform);
            expect(evaluator.hasTransform('testTransform')).toBe(true);
            
            evaluator.resetTransforms();
            expect(evaluator.hasTransform('testTransform')).toBe(false);
        });
    });

    describe('caching', () => {
        it('should enable expression caching', () => {
            evaluator.setCacheExpressions(true);
            expect(evaluator.getCacheExpressions()).toBe(true);
        });

        it('should disable expression caching', () => {
            evaluator.setCacheExpressions(true);
            evaluator.setCacheExpressions(false);
            expect(evaluator.getCacheExpressions()).toBe(false);
        });

        it('should cache parsed expressions when enabled', () => {
            evaluator.setCacheExpressions(true);
            const expr = '2 + 3';
            
            // First evaluation
            const result1 = evaluator.evaluate(expr);
            expect(result1).toBe(5);
            
            // Second evaluation should use cache
            const result2 = evaluator.evaluate(expr);
            expect(result2).toBe(5);
        });

        it('should clear cached parsed expressions', () => {
            evaluator.setCacheExpressions(true);
            evaluator.evaluate('2 + 3');
            
            evaluator.clearCachedParsedExpressions();
            // Cache should be cleared, but expression should still work
            expect(evaluator.evaluate('2 + 3')).toBe(5);
        });
    });

    describe('error handling', () => {
        it('should throw syntax errors for invalid expressions', () => {
            expect(() => evaluator.evaluate('2 +')).toThrow();
            expect(() => evaluator.evaluate('(')).toThrow();
        });

        it('should handle multiple syntax errors', () => {
            expect(() => evaluator.evaluate('(((')).toThrow();
        });
    });

    describe('integration tests', () => {
        it('should handle complex expressions', () => {
            const result = evaluator.evaluate('(10 + 5) * 2 - 3');
            expect(result).toBe(27);
        });

        it('should work with variables and functions together', () => {
            evaluator.declareContextValue('x', 0);
            evaluator.setContextValue('x', 5);
            evaluator.addFunction('double', (_ctx, val) => Number(val) * 2);
            const result = evaluator.evaluate('double(x) + 10');
            expect(result).toBe(20);
        });

        it('should support chained operations', () => {
            evaluator.declareContextValue('arr', 0);
            evaluator.setContextValue('arr', [1, 2, 3]);
            const result = evaluator.evaluate('length(arr)');
            expect(result).toBe(3);
        });
    });


    // Expressions.
    describe('additive expressions', () => {
        it('simple addition', () => {
            const result = evaluator.evaluate('1 + 2');
            expect(result).toBe(3);
        });

        it('addition with negative number', () => {
            const result = evaluator.evaluate('5 + -3');
            expect(result).toBe(2);
        });

        it('multiple additions', () => {
            const result = evaluator.evaluate('1 + 2 + 3 + 4');
            expect(result).toBe(10);
        });

        it('addition and subtraction', () => {
            const result = evaluator.evaluate('10 + 5 - 3 + 2 - 1');
            expect(result).toBe(13);
        });

        it('addition with parentheses', () => {
            const result = evaluator.evaluate('(1 + 2) + (3 + 4)');
            expect(result).toBe(10);
        });

        it('string and number addition', () => {
            const result = evaluator.evaluate('"The answer is: " + 42');
            expect(result).toBe('The answer is: 42');

            const result2 = evaluator.evaluate('42 + " is the answer"');
            expect(result2).toBe('42 is the answer');

            const result3 = evaluator.evaluate('"10" + 5');;
            expect(result3).toBe('105');

            const result4 = evaluator.evaluate('5 + "10"');;
            expect(result4).toBe('510');

            const result5 = evaluator.evaluate('"1" + 100 + "0"');
            expect(result5).toBe('11000');

            const result6 = evaluator.evaluate('"2.0" + 3.5');
            expect(result6).toBe('2.03.5');

            const result7 = evaluator.evaluate('3.5 + "2.0"');;
            expect(result7).toBe('3.52.0');

            const result8 = evaluator.evaluate('"2.0" + 2 + 100');
            expect(result8).toBe('2.02100');

            const result9 = evaluator.evaluate('2 + 2 + "2.0"');;
            expect(result9).toBe('42.0');

            const result10 = evaluator.evaluate('"2.0" + (2 + 100)');
            expect(result10).toBe('2.0102');
        })

        it('string concatenation', () => {
            const result = evaluator.evaluate('"Hello, " + "world!"');
            expect(result).toBe('Hello, world!');

            const result2 = evaluator.evaluate('"Foo" + "Bar" + "Baz"');;
            expect(result2).toBe('FooBarBaz');

            const result3 = evaluator.evaluate('"The answer is: " + "42"');;
            expect(result3).toBe('The answer is: 42');

            expect(() => evaluator.evaluate('"Value: " - 100')).toThrow();
        });
    });

    describe('equality expressions', () => {
        it('equality operator with numbers', () => {
            expect(evaluator.evaluate('5 == 5')).toBe(true);
            expect(evaluator.evaluate('5 == 3')).toBe(false);
        });

        it('inequality operator with numbers', () => {
            expect(evaluator.evaluate('5 != 3')).toBe(true);
            expect(evaluator.evaluate('5 != 5')).toBe(false);
        });

        it('equality operator with strings', () => {
            expect(evaluator.evaluate('"test" == "test"')).toBe(true);
            expect(evaluator.evaluate('"test" == "TEST"')).toBe(false);
        });

        it('inequality operator with strings', () => {
            expect(evaluator.evaluate('"hello" != "world"')).toBe(true);
            expect(evaluator.evaluate('"hello" != "hello"')).toBe(false);
        });

        it('equality operator with mixed types', () => {
            expect(evaluator.evaluate('5 == "5"')).toBe(true);
            expect(evaluator.evaluate('0 == false')).toBe(true);
        });

        it('inequality operator with mixed types', () => {
            expect(evaluator.evaluate('5 != "5"')).toBe(false);
            expect(evaluator.evaluate('0 != false')).toBe(false);
        });

        it('array equality', () => {
            expect(evaluator.evaluate('[1, 2, 3] == [1, 2, 3]')).toBe(false);
            expect(evaluator.evaluate('[1, 2, 3] == [1, 2, 4]')).toBe(false);
            expect(evaluator.evaluate('[1, 2, 3] != [1, 2, 4]')).toBe(true);
            expect(evaluator.evaluate('[1, 2, 3] != [1, 2, 3]')).toBe(true);

            // reference equality
            const arr = [1, 2, 3];
            evaluator.declareContextValue('arr', arr);
            expect(evaluator.evaluate('arr == arr')).toBe(true);

            const arr2 = [1, 2, 3];
            evaluator.declareContextValue('arr2', arr2);
            expect(evaluator.evaluate('arr != arr2')).toBe(true);

            const arr3 = arr;
            evaluator.declareContextValue('arr3', arr3);
            expect(evaluator.evaluate('arr == arr3')).toBe(true);

        });

        it('object equality', () => {
            expect(evaluator.evaluate('{"a": 1, "b": 2} == {"a": 1, "b": 2}')).toBe(false);
            expect(evaluator.evaluate('{"a": 1, "b": 2} == {"a": 1, "b": 3}')).toBe(false);

            expect(evaluator.evaluate('{"a": 1, "b": 2} != {"a": 1, "b": 3}')).toBe(true);
            expect(evaluator.evaluate('{"a": 1, "b": 2} != {"a": 1, "b": 2}')).toBe(true);

            // reference equality
            const obj = { a: 1, b: 2 };
            evaluator.declareContextValue('obj', obj);
            expect(evaluator.evaluate('obj == obj')).toBe(true);

            const obj2 = { a: 1, b: 2 };
            evaluator.declareContextValue('obj2', obj2);
            expect(evaluator.evaluate('obj != obj2')).toBe(true);

            const obj3 = obj;
            evaluator.declareContextValue('obj3', obj3);
            expect(evaluator.evaluate('obj == obj3')).toBe(true);
        });
    });
});

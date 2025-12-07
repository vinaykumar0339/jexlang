import { describe, it, expect, beforeEach } from 'vitest';
import { JexEvaluator } from './JexEvaluator';
import type { Context, FuncImpl, TransformImpl } from '../../types';
import { JexLangRuntimeError, JexLangSyntaxError } from '../errors';
import { toString } from '../../utils';

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

        it('null equality and inequality', () => {
            expect(evaluator.evaluate('null == null')).toBe(true);
            expect(evaluator.evaluate('null != null')).toBe(false);
            expect(evaluator.evaluate('null == 0')).toBe(false);
            expect(evaluator.evaluate('null != 0')).toBe(true);
            expect(evaluator.evaluate('null == false')).toBe(false);
            expect(evaluator.evaluate('null != false')).toBe(true);
        });

        it('boolean equality and inequality', () => {
            expect(evaluator.evaluate('true == true')).toBe(true);
            expect(evaluator.evaluate('false == false')).toBe(true);
            expect(evaluator.evaluate('true != false')).toBe(true);
            expect(evaluator.evaluate('false != true')).toBe(true);
            expect(evaluator.evaluate('true == false')).toBe(false);
            expect(evaluator.evaluate('false == true')).toBe(false);
        });

        it('boolean with numbers', () => {
            expect(evaluator.evaluate('true == 1')).toBe(true);
            expect(evaluator.evaluate('false == 0')).toBe(true);
            expect(evaluator.evaluate('true != 0')).toBe(true);
            expect(evaluator.evaluate('false != 1')).toBe(true);
            expect(evaluator.evaluate('true == 0')).toBe(false);
            expect(evaluator.evaluate('false == 1')).toBe(false);
        });

        it('boolean with strings', () => {
            expect(evaluator.evaluate('true == "true"')).toBe(false);
            expect(evaluator.evaluate('false == "false"')).toBe(false);
            expect(evaluator.evaluate('true != "false"')).toBe(true);
            expect(evaluator.evaluate('false != "true"')).toBe(true);

            expect(evaluator.evaluate('true == "false"')).toBe(false);
            expect(evaluator.evaluate('false == "true"')).toBe(false);

            expect(evaluator.evaluate('true == "1"')).toBe(true);
            expect(evaluator.evaluate('false == "0"')).toBe(true);
            expect(evaluator.evaluate('true == "0"')).toBe(false);
            expect(evaluator.evaluate('false == "1"')).toBe(false);

            expect(evaluator.evaluate('true != "0"')).toBe(true);
            expect(evaluator.evaluate('false != "1"')).toBe(true);
        });

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

    describe('logical expressions', () => {
        it('logical AND operator', () => {
            expect(evaluator.evaluate('true && true')).toBe(true);
            expect(evaluator.evaluate('true && false')).toBe(false);
            expect(evaluator.evaluate('false && true')).toBe(false);
            expect(evaluator.evaluate('false && false')).toBe(false);

            expect(evaluator.evaluate('true and true')).toBe(true);
            expect(evaluator.evaluate('true and false')).toBe(false);
            expect(evaluator.evaluate('false and true')).toBe(false);
            expect(evaluator.evaluate('false and false')).toBe(false);
        });

        it('logical OR operator', () => {
            expect(evaluator.evaluate('true || true')).toBe(true);
            expect(evaluator.evaluate('true || false')).toBe(true);
            expect(evaluator.evaluate('false || true')).toBe(true);
            expect(evaluator.evaluate('false || false')).toBe(false);

            expect(evaluator.evaluate('true or true')).toBe(true);
            expect(evaluator.evaluate('true or false')).toBe(true);
            expect(evaluator.evaluate('false or true')).toBe(true);
            expect(evaluator.evaluate('false or false')).toBe(false);
        });

        it('logical operators with non-boolean values', () => {
            expect(evaluator.evaluate('1 && 0')).toBe(false);
            expect(evaluator.evaluate('1 || 0')).toBe(true);
            expect(evaluator.evaluate('"hello" && ""')).toBe(false);
            expect(evaluator.evaluate('"hello" || ""')).toBe(true);

            expect(evaluator.evaluate('0 and 1')).toBe(false);
            expect(evaluator.evaluate('0 or 1')).toBe(true);
            expect(evaluator.evaluate('"" and "hello"')).toBe(false);
            expect(evaluator.evaluate('"" or "hello"')).toBe(true);
        });

        it('combined logical expressions', () => {
            expect(evaluator.evaluate('true && false || true')).toBe(true);
            expect(evaluator.evaluate('false || false && true')).toBe(false);
            expect(evaluator.evaluate('(true || false) && (false || true)')).toBe(true);

            expect(evaluator.evaluate('true and false or true')).toBe(true);
            expect(evaluator.evaluate('false or false and true')).toBe(false);
            expect(evaluator.evaluate('(true or false) and (false or true)')).toBe(true);
        });
    });

    describe('relational expressions', () => {
        it('greater than operator', () => {
            expect(evaluator.evaluate('5 > 3')).toBe(true);
            expect(evaluator.evaluate('2 > 4')).toBe(false);
        });

        it('less than operator', () => {
            expect(evaluator.evaluate('3 < 5')).toBe(true);
            expect(evaluator.evaluate('4 < 2')).toBe(false);
        }); 

        it('greater than or equal operator', () => {
            expect(evaluator.evaluate('5 >= 5')).toBe(true);
            expect(evaluator.evaluate('6 >= 4')).toBe(true);
            expect(evaluator.evaluate('3 >= 7')).toBe(false);
        });

        it('less than or equal operator', () => {
            expect(evaluator.evaluate('5 <= 5')).toBe(true);
            expect(evaluator.evaluate('4 <= 6')).toBe(true);
            expect(evaluator.evaluate('7 <= 3')).toBe(false);
        });

        it('relational operators with strings', () => {
            expect(() => evaluator.evaluate('"apple" < "banana"')).toThrow();
            expect(() => evaluator.evaluate('"grape" > "orange"')).toThrow();
            expect(() => evaluator.evaluate('"cat" <= "cat"')).toThrow();
            expect(() => evaluator.evaluate('"dog" >= "elephant"')).toThrow();
        });

        it('numbers and strings comparison', () => {
            expect(evaluator.evaluate('5 > "3"')).toBe(true);
            expect(evaluator.evaluate('"4" < 6')).toBe(true);
            expect(evaluator.evaluate('7 >= "7"')).toBe(true);
            expect(evaluator.evaluate('"8" <= 10')).toBe(true);
        });

        it('stringified numbers comparison', () => {
            expect(evaluator.evaluate('"10" > "2"')).toBe(true);
            expect(evaluator.evaluate('"3" < "12"')).toBe(true);
            expect(evaluator.evaluate('"5" >= "5"')).toBe(true);
            expect(evaluator.evaluate('"7" <= "6"')).toBe(false);
        });

        it('numbers, strings and booleans comparison', () => {
            expect(evaluator.evaluate('1 < "2"')).toBe(true);
            expect(evaluator.evaluate('"3" > 2')).toBe(true);
            expect(evaluator.evaluate('0 <= "0"')).toBe(true);
            expect(evaluator.evaluate('"1" >= 2')).toBe(false);

            expect(evaluator.evaluate('true > "0"')).toBe(true);
            expect(evaluator.evaluate('"1" < false')).toBe(false);
            expect(evaluator.evaluate('false <= "0"')).toBe(true);
            expect(evaluator.evaluate('"1" >= true')).toBe(true);
        })
    });

    describe('multiplicative expressions', () => {
        it('simple multiplication', () => {
            const result = evaluator.evaluate('2 * 3');
            expect(result).toBe(6);
        });

        it('simple division', () => {
            const result = evaluator.evaluate('8 / 2');
            expect(result).toBe(4);
        });

        it('multiplication and division', () => {
            const result = evaluator.evaluate('10 * 2 / 5 * 3');
            expect(result).toBe(12);
        });

        it('multiplicative expressions with parentheses', () => {
            const result = evaluator.evaluate('(2 + 3) * (4 - 1) / 5');
            expect(result).toBe(3);
        });
    });

    describe('unary expressions', () => {
        it('unary plus operator', () => {
            expect(evaluator.evaluate('+5')).toBe(5);
            expect(evaluator.evaluate('+-3')).toBe(-3);
        });

        it('unary minus operator', () => {
            expect(evaluator.evaluate('-5')).toBe(-5);
            expect(evaluator.evaluate('-(-3)')).toBe(3);
        });

        it('logical NOT operator', () => {
            expect(evaluator.evaluate('!true')).toBe(false);
            expect(evaluator.evaluate('!false')).toBe(true);
        });
    });

    describe('square root expressions', () => {
        it('square root of a positive number', () => {
            expect(evaluator.evaluate('sqrt(16)')).toBe(4);
            expect(evaluator.evaluate('sqrt(2.25)')).toBe(1.5);

            expect(evaluator.evaluate('√16')).toBe(4);
            expect(evaluator.evaluate('√2.25')).toBe(1.5);
            expect(evaluator.evaluate('√100')).toBe(10);
        });

        it('square root of zero', () => {
            expect(evaluator.evaluate('sqrt(0)')).toBe(0);
            expect(evaluator.evaluate('√0')).toBe(0);
        });

        it('square root of a negative number', () => {
            expect(() => evaluator.evaluate('sqrt(-4)')).toThrow(JexLangRuntimeError);
            expect(() => evaluator.evaluate('√-9')).toThrow(JexLangRuntimeError);
        });
    });

    describe('literal expressions', () => {
        it('should evaluate numeric literals', () => {
            expect(evaluator.evaluate('123')).toBe(123);
            expect(evaluator.evaluate('45.67')).toBe(45.67);
        });

        it('should evaluate string literals', () => {
            expect(evaluator.evaluate('"hello"')).toBe('hello');
            expect(evaluator.evaluate("'world'")).toBe('world');

            expect(evaluator.evaluate('"true"')).toBe('true');
            expect(evaluator.evaluate('"false"')).toBe('false');
        });

        it('should evaluate boolean literals', () => {
            expect(evaluator.evaluate('true')).toBe(true);
            expect(evaluator.evaluate('false')).toBe(false);
        });

        it('should evaluate null literal', () => {
            expect(evaluator.evaluate('null')).toBeNull();
        });

        it('should evaluate array literals', () => {
            expect(evaluator.evaluate('[1, 2, 3]')).toEqual([1, 2, 3]);
            expect(evaluator.evaluate('["a", "b", "c"]')).toEqual(['a', 'b', 'c']);

            const dynamicArray = [10, "test", true, null];
            evaluator.declareContextValue('dynamicArray', dynamicArray);
            expect(evaluator.evaluate('[dynamicArray[0], dynamicArray[1], dynamicArray[2], dynamicArray[3]]')).toEqual(dynamicArray);

            const index1 = 0;
            const index2 = 1;
            const index3 = 2;
            const index4 = 3;
            evaluator.declareContextValue('index1', index1);
            evaluator.declareContextValue('index2', index2);
            evaluator.declareContextValue('index3', index3);
            evaluator.declareContextValue('index4', index4);
            expect(evaluator.evaluate('[dynamicArray[index1], dynamicArray[index2], dynamicArray[index3], dynamicArray[index4]]')).toEqual(dynamicArray);
        });

        it('should evaluate object literals', () => {
            expect(evaluator.evaluate('{"key": "value", "num": 42}')).toEqual({ key: 'value', num: 42 });
            expect(evaluator.evaluate('{"a": 1, "b": 2, "c": 3}')).toEqual({ a: 1, b: 2, c: 3 });

            const dynamicObject = {
                name: "Test",
                value: 100,
                isActive: true,
                computed: true,
            };
            const isValueKeyValue = 100;
            const isActiveKey = "isActive";
            const computed = true;
            evaluator.declareContextValue('dynamicObject', dynamicObject);
            evaluator.declareContextValue('isValueKeyValue', isValueKeyValue);
            evaluator.declareContextValue('isActiveKey', isActiveKey);
            evaluator.declareContextValue('computed', computed);
            expect(evaluator.evaluate(`
                    {
                        "name": dynamicObject.name,
                        "value": isValueKeyValue,
                        [isActiveKey]: dynamicObject.isActive,
                        computed
                    }
                `)).toEqual(dynamicObject);
        });
    });

    describe('member expressions', () => {
        it('should access object properties', () => {
            const obj = { a: 1, b: 2, c: 3 };
            evaluator.declareContextValue('obj', obj);
            expect(evaluator.evaluate('obj.a')).toBe(1);
            expect(evaluator.evaluate('obj.b')).toBe(2);
            expect(evaluator.evaluate('obj.c')).toBe(3);

            const dynamicKey = 'b';
            evaluator.declareContextValue('dynamicKey', dynamicKey);
            expect(evaluator.evaluate('obj[dynamicKey]')).toBe(2);

        });

        it('should access array elements', () => {
            const arr = [10, 20, 30, 40];
            evaluator.declareContextValue('arr', arr);
            expect(evaluator.evaluate('arr[0]')).toBe(10);
            expect(evaluator.evaluate('arr[1]')).toBe(20);
            expect(evaluator.evaluate('arr[2]')).toBe(30);
            expect(evaluator.evaluate('arr[3]')).toBe(40);
            expect(evaluator.evaluate('arr[4]')).toBeNull();

            // negative indexing
            expect(evaluator.evaluate('arr[-1]')).toBe(40);
            expect(evaluator.evaluate('arr[-2]')).toBe(30);
            expect(evaluator.evaluate('arr[-3]')).toBe(20);
            expect(evaluator.evaluate('arr[-4]')).toBe(10);
            expect(evaluator.evaluate('arr[-5]')).toBeNull();

            const index = 2;
            evaluator.declareContextValue('index', index);
            expect(evaluator.evaluate('arr[index]')).toBe(30);
        });
    });

    describe('complex member access expressions', () => {
        it('should access nested object properties', () => {
            const obj = { 
                user: { 
                    name: 'John', 
                    address: { 
                        city: 'New York', 
                        zip: 10001 
                    } 
                } 
            };
            evaluator.declareContextValue('obj', obj);
            expect(evaluator.evaluate('obj.user.name')).toBe('John');
            expect(evaluator.evaluate('obj.user.address.city')).toBe('New York');
            expect(evaluator.evaluate('obj.user.address.zip')).toBe(10001);
        });

        it('should access nested array elements', () => {
            const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
            evaluator.declareContextValue('arr', arr);
            expect(evaluator.evaluate('arr[0][0]')).toBe(1);
            expect(evaluator.evaluate('arr[1][2]')).toBe(6);
            expect(evaluator.evaluate('arr[2][1]')).toBe(8);
            expect(evaluator.evaluate('arr[-1][-1]')).toBe(9);
        });

        it('should access array of objects', () => {
            const users = [
                { name: 'Alice', age: 25 },
                { name: 'Bob', age: 30 },
                { name: 'Charlie', age: 35 }
            ];
            evaluator.declareContextValue('users', users);
            expect(evaluator.evaluate('users[0].name')).toBe('Alice');
            expect(evaluator.evaluate('users[1].age')).toBe(30);
            expect(evaluator.evaluate('users[2].name')).toBe('Charlie');
            expect(evaluator.evaluate('users[-1].age')).toBe(35);
        });

        it('should access object with array properties', () => {
            const data = {
                scores: [95, 87, 92],
                names: ['Test1', 'Test2', 'Test3']
            };
            evaluator.declareContextValue('data', data);
            expect(evaluator.evaluate('data.scores[0]')).toBe(95);
            expect(evaluator.evaluate('data.scores[2]')).toBe(92);
            expect(evaluator.evaluate('data.names[1]')).toBe('Test2');
            expect(evaluator.evaluate('data.scores[-1]')).toBe(92);
        });

        it('should handle mixed bracket and dot notation', () => {
            const complex = {
                items: [
                    { id: 1, values: [10, 20, 30] },
                    { id: 2, values: [40, 50, 60] }
                ]
            };
            evaluator.declareContextValue('complex', complex);
            expect(evaluator.evaluate('complex.items[0].id')).toBe(1);
            expect(evaluator.evaluate('complex.items[0].values[1]')).toBe(20);
            expect(evaluator.evaluate('complex.items[1].values[2]')).toBe(60);
            expect(evaluator.evaluate('complex["items"][0]["id"]')).toBe(1);
        });

        it('should evaluate expressions within member access', () => {
            const data = {
                values: [100, 200, 300, 400]
            };
            evaluator.declareContextValue('data', data);
            evaluator.declareContextValue('idx', 1);
            expect(evaluator.evaluate('data.values[1 + 1]')).toBe(300);
            expect(evaluator.evaluate('data.values[idx]')).toBe(200);
            expect(evaluator.evaluate('data.values[idx + 2]')).toBe(400);
        });

        it('should handle deeply nested structures', () => {
            const deep = {
                level1: {
                    level2: {
                        level3: {
                            array: [
                                { value: 'found' }
                            ]
                        }
                    }
                }
            };
            evaluator.declareContextValue('deep', deep);
            expect(evaluator.evaluate('deep.level1.level2.level3.array[0].value')).toBe('found');
        });

        it('should return null for non-existent nested properties', () => {
            const obj = { a: { b: 1 } };
            evaluator.declareContextValue('obj', obj);
            expect(evaluator.evaluate('obj.a.c')).toBeNull();
            expect(evaluator.evaluate('obj.x.y.z')).toBeNull();
        });
    });

    describe('parenthesized expressions', () => {
        it('should evaluate expressions within parentheses', () => {
            expect(evaluator.evaluate('(2 + 3)')).toBe(5);
            expect(evaluator.evaluate('((1 + 2) * (3 + 4))')).toBe(21);
            expect(evaluator.evaluate('((10 - 2) / (4 + 4))')).toBe(1);
        });
    });

    describe('power expressions', () => {
        it('should evaluate exponentiation', () => {
            expect(evaluator.evaluate('2 ^ 3')).toBe(8);
            expect(evaluator.evaluate('5 ^ 0')).toBe(1);
            expect(evaluator.evaluate('4 ^ 1.5')).toBe(8);
        });

        it('should handle chained exponentiation', () => {
            expect(evaluator.evaluate('2 ^ 3 ^ 2')).toBe(512); // 2^(3^2) = 2^9 = 512
            expect(evaluator.evaluate('3 ^ 2 ^ 2')).toBe(81);  // 3^(2^2) = 3^4 = 81
        });

        it('should evaluate exponentiation with parentheses', () => {
            expect(evaluator.evaluate('(2 ^ 3) ^ 2')).toBe(64); // (2^3)^2 = 8^2 = 64
            expect(evaluator.evaluate('2 ^ (3 ^ 2)')).toBe(512); // 2^(3^2) = 2^9 = 512
        });
    });

    describe('ternary expressions', () => {
        it('should evaluate simple ternary expressions', () => {
            expect(evaluator.evaluate('true ? 1 : 2')).toBe(1);
            expect(evaluator.evaluate('false ? 1 : 2')).toBe(2);
        });

        it('should evaluate nested ternary expressions', () => {
            expect(evaluator.evaluate('true ? (false ? 1 : 2) : 3')).toBe(2);
            expect(evaluator.evaluate('false ? 1 : (true ? 2 : 3)')).toBe(2);
        });

        it('should handle complex ternary expressions', () => {
            expect(evaluator.evaluate('(5 > 3) ? (10 + 5) : (20 - 5)')).toBe(15);
            expect(evaluator.evaluate('(2 + 2 == 5) ? "yes" : "no"')).toBe('no');
        });

        it('should handle ternary expressions with different data types', () => {
            // Number results
            expect(evaluator.evaluate('true ? 42 : 0')).toBe(42);
            expect(evaluator.evaluate('false ? 42 : 0')).toBe(0);
            
            // String results
            expect(evaluator.evaluate('true ? "hello" : "world"')).toBe('hello');
            expect(evaluator.evaluate('false ? "hello" : "world"')).toBe('world');
            
            // Boolean results
            expect(evaluator.evaluate('true ? true : false')).toBe(true);
            expect(evaluator.evaluate('false ? true : false')).toBe(false);
            
            // Null results
            expect(evaluator.evaluate('true ? null : 42')).toBeNull();
            expect(evaluator.evaluate('false ? 42 : null')).toBeNull();
            
            // Array results
            expect(evaluator.evaluate('true ? [1, 2, 3] : [4, 5, 6]')).toEqual([1, 2, 3]);
            expect(evaluator.evaluate('false ? [1, 2, 3] : [4, 5, 6]')).toEqual([4, 5, 6]);
            
            // Object results
            expect(evaluator.evaluate('true ? {"a": 1} : {"b": 2}')).toEqual({a: 1});
            expect(evaluator.evaluate('false ? {"a": 1} : {"b": 2}')).toEqual({b: 2});
        });

        it('should handle ternary expressions with mixed data types', () => {
            expect(evaluator.evaluate('true ? 42 : "string"')).toBe(42);
            expect(evaluator.evaluate('false ? 42 : "string"')).toBe('string');
            expect(evaluator.evaluate('true ? [1, 2] : {"a": 1}')).toEqual([1, 2]);
            expect(evaluator.evaluate('false ? [1, 2] : {"a": 1}')).toEqual({a: 1});
            expect(evaluator.evaluate('true ? null : false')).toBeNull();
            expect(evaluator.evaluate('false ? null : false')).toBe(false);
        });

        it('should handle ternary expressions with context variables', () => {
            evaluator.declareContextValue('x', 10);
            evaluator.declareContextValue('y', 20);
            evaluator.declareContextValue('arr', [1, 2, 3]);
            evaluator.declareContextValue('obj', {name: 'test'});
            
            expect(evaluator.evaluate('x > y ? x : y')).toBe(20);
            expect(evaluator.evaluate('x < y ? arr : obj')).toEqual([1, 2, 3]);
            expect(evaluator.evaluate('x == 10 ? arr[0] : obj.name')).toBe(1);
            expect(evaluator.evaluate('y != 20 ? null : "found"')).toBe('found');
        });

        it('should handle nested ternary expressions with different data types', () => {
            expect(evaluator.evaluate('true ? (false ? "a" : "b") : (true ? "c" : "d")')).toBe('b');
            expect(evaluator.evaluate('false ? (true ? 1 : 2) : (false ? 3 : 4)')).toBe(4);
            expect(evaluator.evaluate('true ? (true ? [1] : [2]) : (true ? [3] : [4])')).toEqual([1]);
            expect(evaluator.evaluate('false ? null : (true ? {"x": 1} : {"y": 2})')).toEqual({x: 1});
        });

        it('should handle ternary expressions with complex conditions', () => {
            evaluator.declareContextValue('users', [
                {name: 'Alice', age: 25},
                {name: 'Bob', age: 30}
            ]);
            
            expect(evaluator.evaluate('users[0].age > 20 ? users[0].name : "unknown"')).toBe('Alice');
            expect(evaluator.evaluate('users[1].age < 25 ? users[1] : null')).toBeNull();
            expect(evaluator.evaluate('length(users) > 1 ? users : []')).toEqual([
                {name: 'Alice', age: 25},
                {name: 'Bob', age: 30}
            ]);
        });

        it('should handle ternary expressions with arithmetic operations', () => {
            expect(evaluator.evaluate('5 > 3 ? (10 + 5) : (20 - 5)')).toBe(15);
            expect(evaluator.evaluate('2 * 3 == 6 ? (100 / 10) : (50 * 2)')).toBe(10);
            expect(evaluator.evaluate('10 % 2 == 0 ? "even" : "odd"')).toBe('even');
        });

        it('should handle ternary expressions with logical operations', () => {
            expect(evaluator.evaluate('true && false ? "yes" : "no"')).toBe('no');
            expect(evaluator.evaluate('true || false ? 1 : 0')).toBe(1);
            expect(evaluator.evaluate('!false ? [1, 2] : [3, 4]')).toEqual([1, 2]);
            expect(evaluator.evaluate('(5 > 3) && (10 < 20) ? {"result": true} : {"result": false}')).toEqual({result: true});
        });
    });

    describe('elvis operator', () => {
        it('should return left operand if truthy', () => {
            expect(evaluator.evaluate('42 ?: 0')).toBe(42);
            expect(evaluator.evaluate('"hello" ?: "world"')).toBe('hello');
            expect(evaluator.evaluate('true ?: false')).toBe(true);
        });

        it('should return right operand if left is falsy', () => {
            expect(evaluator.evaluate('0 ?: 42')).toBe(42);
            expect(evaluator.evaluate('"" ?: "default"')).toBe('default');
            expect(evaluator.evaluate('false ?: true')).toBe(true);
            expect(evaluator.evaluate('null ?: "fallback"')).toBe('fallback');
        });

        it('should work with context variables', () => {
            evaluator.declareContextValue('name', '');
            expect(evaluator.evaluate('name ?: "Anonymous"')).toBe('Anonymous');
            
            evaluator.setContextValue('name', 'John');
            expect(evaluator.evaluate('name ?: "Anonymous"')).toBe('John');
        });

        it('should work with nested elvis operators', () => {
            expect(evaluator.evaluate('null ?: "" ?: "default"')).toBe('default');
            expect(evaluator.evaluate('0 ?: false ?: 100')).toBe(100);
        });

        it('should work with complex expressions', () => {
            evaluator.declareContextValue('user', { name: '', age: 0 });
            expect(evaluator.evaluate('user.name ?: "Unknown"')).toBe('Unknown');
            expect(evaluator.evaluate('user.age ?: 18')).toBe(18);
        });
    });
    

    describe('identifier expressions', () => {
        it('should evaluate identifiers from context', () => {
            evaluator.declareContextValue('x', 10);
            evaluator.declareContextValue('y', 20);
            evaluator.declareContextValue('name', 'Test');

            expect(evaluator.evaluate('x')).toBe(10);
            expect(evaluator.evaluate('y')).toBe(20);
            expect(evaluator.evaluate('name')).toBe('Test');
        });

        it('should throw error for undefined identifiers', () => {
            expect(() => evaluator.evaluate('undefinedVar')).toThrow(JexLangRuntimeError);
            expect(() => evaluator.evaluate('anotherUndefined')).toThrow(JexLangRuntimeError);
        });

        it('should evaluate number identifier', () => {
            evaluator.declareContextValue('num', 42);
            expect(evaluator.evaluate('num')).toBe(42);
            
            evaluator.declareContextValue('decimal', 3.14);
            expect(evaluator.evaluate('decimal')).toBe(3.14);
            
            evaluator.declareContextValue('negative', -100);
            expect(evaluator.evaluate('negative')).toBe(-100);
        });

        it('should evaluate string identifier', () => {
            evaluator.declareContextValue('str', 'hello');
            expect(evaluator.evaluate('str')).toBe('hello');
            
            evaluator.declareContextValue('empty', '');
            expect(evaluator.evaluate('empty')).toBe('');
        });

        it('should evaluate boolean identifier', () => {
            evaluator.declareContextValue('isTrue', true);
            expect(evaluator.evaluate('isTrue')).toBe(true);
            
            evaluator.declareContextValue('isFalse', false);
            expect(evaluator.evaluate('isFalse')).toBe(false);
        });

        it('should evaluate null identifier', () => {
            evaluator.declareContextValue('nullValue', null);
            expect(evaluator.evaluate('nullValue')).toBeNull();
        });

        it('should evaluate array identifier', () => {
            evaluator.declareContextValue('arr', [1, 2, 3]);
            expect(evaluator.evaluate('arr')).toEqual([1, 2, 3]);
            
            evaluator.declareContextValue('emptyArr', []);
            expect(evaluator.evaluate('emptyArr')).toEqual([]);
            
            evaluator.declareContextValue('mixedArr', [1, 'test', true, null]);
            expect(evaluator.evaluate('mixedArr')).toEqual([1, 'test', true, null]);
        });

        it('should evaluate object identifier', () => {
            evaluator.declareContextValue('obj', { key: 'value' });
            expect(evaluator.evaluate('obj')).toEqual({ key: 'value' });
            
            evaluator.declareContextValue('emptyObj', {});
            expect(evaluator.evaluate('emptyObj')).toEqual({});
            
            evaluator.declareContextValue('complexObj', { 
            name: 'test', 
            count: 42, 
            active: true, 
            data: null 
            });
            expect(evaluator.evaluate('complexObj')).toEqual({ 
            name: 'test', 
            count: 42, 
            active: true, 
            data: null 
            });
        });

        it('should evaluate nested object identifier', () => {
            evaluator.declareContextValue('nested', { 
            level1: { 
                level2: { 
                value: 'deep' 
                } 
            } 
            });
            expect(evaluator.evaluate('nested')).toEqual({ 
            level1: { 
                level2: { 
                value: 'deep' 
                } 
            } 
            });
        });

        it('should evaluate array of objects identifier', () => {
            evaluator.declareContextValue('users', [
                { name: 'Alice', age: 25 },
                { name: 'Bob', age: 30 }
            ]);
            expect(evaluator.evaluate('users')).toEqual([
                { name: 'Alice', age: 25 },
                { name: 'Bob', age: 30 }
            ]);
        });
    });

    describe('var declaration expressions', () => {
        it('should declare variable with let keyword', () => {
            const number = evaluator.evaluate('let x = 10; x;');
            expect(number).toBe(10);

            const double = evaluator.evaluate('let y = 5.54; y;');
            expect(double).toBe(5.54);

            const string = evaluator.evaluate('let name = "Test"; name;');
            expect(string).toBe('Test');

            const boolean = evaluator.evaluate('let isTrue = false; isTrue;');
            expect(boolean).toBe(false);

            const array = evaluator.evaluate('let arr = [1, 2, 3]; arr;');
            expect(array).toEqual([1, 2, 3]);

            const mixedArray = evaluator.evaluate('let mixed = [1, "two", true, null]; mixed;');
            expect(mixedArray).toEqual([1, 'two', true, null]);

            const object = evaluator.evaluate('let obj = {"key": "value"}; obj;');
            expect(object).toEqual({ key: 'value' });

            const nestedObject = evaluator.evaluate('let nested = {"a": {"b": 2}}; nested;');
            expect(nestedObject).toEqual({ a: { b: 2 } });
        });

        it('should declare with const keyword', () => {
            const number = evaluator.evaluate('const x = 20; x;');
            expect(number).toBe(20);

            const string = evaluator.evaluate('const greeting = "Hello"; greeting;');
            expect(string).toBe('Hello');

            const boolean = evaluator.evaluate('const isValid = true; isValid;');
            expect(boolean).toBe(true);

            const array = evaluator.evaluate('const nums = [4, 5, 6]; nums;');
            expect(array).toEqual([4, 5, 6]);

            const object = evaluator.evaluate('const settings = {"theme": "dark"}; settings;');
            expect(object).toEqual({ theme: 'dark' });
        });

        it('should throw error for redeclaration of variable', () => {
            expect(() => evaluator.evaluate('let x = 10; let x = 20;')).toThrow(JexLangRuntimeError);
            expect(() => evaluator.evaluate('const y = 5; const y = 15;')).toThrow(JexLangRuntimeError);
        });

        it('should throw error for reassignment of const variable', () => {
            expect(() => evaluator.evaluate('const z = 30; z = 40;')).toThrow(JexLangRuntimeError);
        });

        it('should allow reassignment of let variable', () => {
            const result = evaluator.evaluate('let a = 1; a = 2; a;');
            expect(result).toBe(2);
        });

        it('should handle variable scope correctly', () => {
            const result = evaluator.evaluate(`
                let x = 10;
                {
                    let x = 20;
                    x;
                }
            `);
            expect(result).toBe(20);

            const outerX = evaluator.evaluate(`
                let y = 5;
                {
                    let y = 15;
                }
                y;
            `);
            expect(outerX).toBe(5);
        });

        it('should create a variable in the global scope by declaring with global keyword', () => {
            evaluator.evaluate('global let gVar = 100;');
            expect(evaluator.getGlobalScopeVariables().gVar).toBe(100);

            evaluator.evaluate('global const gConst = "global";');
            expect(evaluator.getGlobalScopeVariables().gConst).toBe('global');
        });

        it('should allow access to global variables from local scope', () => {
            evaluator.evaluate('global let gNum = 50;');
            const result = evaluator.evaluate(`
                {
                    let localNum = gNum + 25;
                    localNum;
                }
            `);
            expect(result).toBe(75);
        });

        it('global scope variables redeclaration is allowed and it should not throw error', () => {
            evaluator.evaluate('global let gVar = 200; global let gVar = 300;');
            expect(evaluator.getGlobalScopeVariables().gVar).toBe(300);
            expect(() => evaluator.evaluate('global let gVar = 400;')).not.toThrow();

            evaluator.evaluate('global const gConst = "first"; global const gConst = "second";');
            expect(evaluator.getGlobalScopeVariables().gConst).toBe('second');
            expect(() => evaluator.evaluate('global const gConst = "third";')).not.toThrow();
        })
    });

    describe('block statements', () => {
        it('should evaluate block statements correctly', () => {
            const result = evaluator.evaluate(`
                {
                    let x = 10;
                    let y = 20;
                    x + y;
                }
            `);
            expect(result).toBe(30);
        });

        it('should maintain variable scope within blocks', () => {
            expect(() => evaluator.evaluate(`
                {
                    let x = 5;
                }
                x;
            `)).toThrow(JexLangRuntimeError);
        });

        it('should allow nested blocks', () => {
            const result = evaluator.evaluate(`
                {
                    let x = 2;
                    {
                        let y = 3;
                        x * y;
                    }
                }
            `);
            expect(result).toBe(6);
        });

        it('should access outer scope variables within inner blocks', () => {
            const result = evaluator.evaluate(`
                let a = 4;
                {
                    let b = 5;
                    a + b;
                }
            `);
            expect(result).toBe(9);
        });

        it('should not allow inner block variables to leak to outer scope', () => {
            expect(() => evaluator.evaluate(`
                {
                    let m = 7;
                }
                m;
            `)).toThrow(JexLangRuntimeError);
        });

        it('should handle multiple statements in a block', () => {
            const result = evaluator.evaluate(`
                {
                    let x = 1;
                    x = x + 1;
                    x = x * 3;
                    x;
                }
            `);
            expect(result).toBe(6);
        });

        it('should handle blocks with only variable declarations', () => {
            const result = evaluator.evaluate(`
                {
                    let x = 10;
                    const y = 20;
                }
            `);
            expect(result).toBe(20);
        });

        it('should handle blocks with global variable declarations', () => {
            evaluator.evaluate(`
                {
                    global let gVar = 123;
                    global const gConst = "block";
                }
            `);
            expect(evaluator.getGlobalScopeVariables().gVar).toBe(123);
            expect(evaluator.getGlobalScopeVariables().gConst).toBe('block');
        });

        it('should handle blocks with nested variable declarations', () => {
            const result = evaluator.evaluate(`
                {
                    let x = 5;
                    {
                        let y = 10;
                        {
                            let z = 15;
                            x + y + z;
                        }
                    }
                }
            `);
            expect(result).toBe(30);
        });

        it('should return last evaluated expression in the block', () => {
            const result = evaluator.evaluate(`
                {
                    let x = 3;
                    let y = 4;
                    x * y;
                }
            `);
            expect(result).toBe(12);
        });

        it('should handle async execution within blocks', async () => {
            const asyncFunc: FuncImpl = async () => {
                return 5
            };
            evaluator.addFunction('asyncFunc', asyncFunc);
            const result = await evaluator.evaluate(`
                {
                    let abc = asyncFunc();
                    let bcc = 10;
                    abc + bcc;
                }
            `);
            expect(result).toBe(15);
        });
    });

    describe('repeat expressions', () => {
        describe('numeric repeat', () => {
            it('should repeat block specified number of times', async () => {
                const result = await evaluator.evaluate(`
                    let sum = 0;
                    repeat (5) {
                        sum = sum + 1;
                    }
                    sum;
                `);
                expect(result).toBe(5);
            });

            it('should provide $index variable in numeric repeat', () => {
                const result = evaluator.evaluate(`
                    let total = 0;
                    repeat (3) {
                        total = total + $index;
                    }
                    total;
                `);
                expect(result).toBe(3); // 0 + 1 + 2
            });

            it('should provide $it variable equal to $index in numeric repeat', () => {
                const result = evaluator.evaluate(`
                    let sum = 0;
                    repeat (4) {
                        sum = sum + $it;
                    }
                    sum;
                `);
                expect(result).toBe(6); // 0 + 1 + 2 + 3
            });

            it('should handle zero iterations', () => {
                const result = evaluator.evaluate(`
                    let count = 0;
                    repeat (0) {
                        count = count + 1;
                    }
                    count;
                `);
                expect(result).toBe(0);
            });

            it('should throw error for negative iterations', () => {
                expect(() => evaluator.evaluate(`
                    repeat (-5) {
                        let x = 1;
                    }
                `)).toThrow(JexLangRuntimeError);
            });

            it('should return last evaluated result from block', () => {
                const result = evaluator.evaluate(`
                    repeat (3) {
                        $index * 2;
                    }
                `);
                expect(result).toBe(4); // Last iteration: 2 * 2
            });
        });

        describe('array repeat', () => {
            it('should iterate over array elements', () => {
                const result = evaluator.evaluate(`
                    let arr = [10, 20, 30];
                    let sum = 0;
                    repeat (arr) {
                        sum = sum + $it;
                    }
                    sum;
                `);
                expect(result).toBe(60);
            });

            it('should provide $index variable in array repeat', () => {
                const result = evaluator.evaluate(`
                    let arr = ["a", "b", "c"];
                    let indices = 0;
                    repeat (arr) {
                        indices = indices + $index;
                    }
                    indices;
                `);
                expect(result).toBe(3); // 0 + 1 + 2
            });

            it('should provide $it variable with current element', () => {
                const result = evaluator.evaluate(`
                    let arr = [5, 10, 15];
                    let product = 1;
                    repeat (arr) {
                        product = product * $it;
                    }
                    product;
                `);
                expect(result).toBe(750); // 5 * 10 * 15
            });

            it('should handle empty array', () => {
                const result = evaluator.evaluate(`
                    let arr = [];
                    let count = 0;
                    repeat (arr) {
                        count = count + 1;
                    }
                    count;
                `);
                expect(result).toBe(0);
            });

            it('should return last evaluated result from array iteration', () => {
                const result = evaluator.evaluate(`
                    let arr = [1, 2, 3, 4];
                    repeat (arr) {
                        $it * 10;
                    }
                `);
                expect(result).toBe(40); // Last element: 4 * 10
            });
        });

        describe('object repeat', () => {
            it('should iterate over object properties', () => {
                const result = evaluator.evaluate(`
                    let obj = {"a": 1, "b": 2, "c": 3};
                    let sum = 0;
                    repeat (obj) {
                        sum = sum + $it;
                    }
                    sum;
                `);
                expect(result).toBe(6);
            });

            it('should provide $key variable in object repeat', () => {
                const result = evaluator.evaluate(`
                    let obj = {"x": 10, "y": 20};
                    let keys = "";
                    repeat (obj) {
                        keys = keys + $key;
                    }
                    keys;
                `);
                expect(result).toMatch(/xy|yx/); // Order may vary
            });

            it('should provide $value variable equal to $it', () => {
                const result = evaluator.evaluate(`
                    let obj = {"a": 5, "b": 10};
                    let total = 0;
                    repeat (obj) {
                        total = total + $value;
                    }
                    total;
                `);
                expect(result).toBe(15);
            });

            it('should handle empty object', () => {
                const result = evaluator.evaluate(`
                    let obj = {};
                    let count = 0;
                    repeat (obj) {
                        count = count + 1;
                    }
                    count;
                `);
                expect(result).toBe(0);
            });

            it('should return last evaluated result from object iteration', () => {
                const result = evaluator.evaluate(`
                    let obj = {"a": 1, "b": 2};
                    repeat (obj) {
                        $it * 100;
                    }
                `);
                expect([100, 200]).toContain(result); // Order may vary
            });
        });

        describe('string repeat', () => {
            it('should iterate over string characters', () => {
                const result = evaluator.evaluate(`
                    let str = "abc";
                    let combined = "";
                    repeat (str) {
                        combined = combined + $it;
                    }
                    combined;
                `);
                expect(result).toBe('abc');
            });

            it('should provide $index variable in string repeat', () => {
                const result = evaluator.evaluate(`
                    let str = "test";
                    let indices = 0;
                    repeat (str) {
                        indices = indices + $index;
                    }
                    indices;
                `);
                expect(result).toBe(6); // 0 + 1 + 2 + 3
            });

            it('should handle empty string', () => {
                const result = evaluator.evaluate(`
                    let str = "";
                    let count = 0;
                    repeat (str) {
                        count = count + 1;
                    }
                    count;
                `);
                expect(result).toBe(0);
            });

            it('should return last evaluated result from string iteration', () => {
                const result = evaluator.evaluate(`
                    let str = "xyz";
                    repeat (str) {
                        $it;
                    }
                `);
                expect(result).toBe('z');
            });
        });

        describe('null and undefined handling', () => {
            it('should return null for null iterable', () => {
                const result = evaluator.evaluate(`
                    repeat (null) {
                        let x = 1;
                    }
                `);
                expect(result).toBeNull();
            });

            it('should handle null from expression', () => {
                evaluator.declareContextValue('nullValue', null);
                const result = evaluator.evaluate(`
                    repeat (nullValue) {
                        let x = 1;
                    }
                `);
                expect(result).toBeNull();
            });
        });

        describe('nested repeat expressions', () => {
            it('should handle nested numeric repeats', () => {
                const result = evaluator.evaluate(`
                    let sum = 0;
                    repeat (3) {
                        repeat (2) {
                            sum = sum + 1;
                        }
                    }
                    sum;
                `);
                expect(result).toBe(6); // 3 * 2
            });

            it('should handle nested array repeats', () => {
                const result = evaluator.evaluate(`
                    let matrix = [[1, 2], [3, 4]];
                    let total = 0;
                    repeat (matrix) {
                        repeat ($it) {
                            total = total + $it;
                        }
                    }
                    total;
                `);
                expect(result).toBe(10); // 1 + 2 + 3 + 4
            });
        });

        describe('scope and variable shadowing', () => {
            it('should create new scope for repeat block', () => {
                expect(() => evaluator.evaluate(`
                    repeat (1) {
                        let blockVar = 5;
                    }
                    blockVar;
                `)).toThrow(JexLangRuntimeError);
            });

            it('should access outer scope variables', () => {
                const result = evaluator.evaluate(`
                    let outer = 10;
                    repeat (2) {
                        outer = outer + 5;
                    }
                    outer;
                `);
                expect(result).toBe(20);
            });

            it('should not leak $index and $it variables', () => {
                expect(() => evaluator.evaluate(`
                    repeat (3) {
                        let x = $index;
                    }
                    $index;
                `)).toThrow(JexLangRuntimeError);

                expect(() => evaluator.evaluate(`
                    repeat ([1, 2]) {
                        let y = $it;
                    }
                    $it;
                `)).toThrow(JexLangRuntimeError);
            });
        });

        describe('async repeat expressions', () => {
            it('should handle async operations in numeric repeat', async () => {
                const asyncFunc: FuncImpl = async () => {
                    return 5
                };
                evaluator.addFunction('asyncFunc', asyncFunc);
                const result = await evaluator.evaluate(`
                    let sum = 0;
                    repeat(2) {
                        let asyncVal = asyncFunc();
                        sum = sum + asyncVal;
                    }  
                    sum;
                `);
                expect(result).toBe(10);
            });

            it('should handle async operations in array repeat', async () => {
                const asyncDouble: FuncImpl = async (_ctx, val) => Number(val) * 2;
                evaluator.addFunction('asyncDouble', asyncDouble);
                const result = await evaluator.evaluate(`
                    let arr = [1, 2, 3];
                    let sum = 0;
                    repeat (arr) {
                        sum = sum + asyncDouble($it);
                    }
                    sum;
                `);
                expect(result).toBe(12); // (1*2) + (2*2) + (3*2)
            });

            it('should handle async operations in object repeat', async () => {
                const asyncValue: FuncImpl = async (_ctx, val) => Number(val) + 10;
                evaluator.addFunction('asyncValue', asyncValue);
                const result = await evaluator.evaluate(`
                    let obj = {"a": 1, "b": 2};
                    let sum = 0;
                    repeat (obj) {
                        sum = sum + asyncValue($it);
                    }
                    sum;
                `);
                expect(result).toBe(23); // (1+10) + (2+10)
            });

            it('should handle async operations in string repeat', async () => {
                const asyncCharCode: FuncImpl = async (_ctx, char) => toString(char).charCodeAt(0);
                evaluator.addFunction('asyncCharCode', asyncCharCode);
                const result = await evaluator.evaluate(`
                    let str = "abc";
                    let total = 0;
                    repeat (str) {
                        total = total + asyncCharCode($it);
                    }
                    total;
                `);
                expect(result).toBe(294); // 'a'(97) + 'b'(98) + 'c'(99)
            });
        });
    });

    describe('if-else expressions', () => {
        describe('basic if expressions', () => {
            it('should execute if block when condition is true', () => {
                const result = evaluator.evaluate(`
                    if (true) {
                        42;
                    }
                `);
                expect(result).toBe(42);
            });

            it('should return null when condition is false and no else', () => {
                const result = evaluator.evaluate(`
                    if (false) {
                        42;
                    }
                `);
                expect(result).toBeNull();
            });

            it('should evaluate condition expressions', () => {
                const result = evaluator.evaluate(`
                    if (5 > 3) {
                        "greater";
                    }
                `);
                expect(result).toBe('greater');
            });

            it('should handle falsy values', () => {
                expect(evaluator.evaluate('if (0) { "yes"; }')).toBeNull();
                expect(evaluator.evaluate('if ("") { "yes"; }')).toBeNull();
                expect(evaluator.evaluate('if (null) { "yes"; }')).toBeNull();
                expect(evaluator.evaluate('if (false) { "yes"; }')).toBeNull();
            });

            it('should handle truthy values', () => {
                expect(evaluator.evaluate('if (1) { "yes"; }')).toBe('yes');
                expect(evaluator.evaluate('if ("hello") { "yes"; }')).toBe('yes');
                expect(evaluator.evaluate('if (true) { "yes"; }')).toBe('yes');
                expect(evaluator.evaluate('if ([1]) { "yes"; }')).toBe('yes');
                expect(evaluator.evaluate('if ({"a": 1}) { "yes"; }')).toBe('yes');
            });

            it('should handle empty arrays and objects as falsy', () => {
                expect(evaluator.evaluate('if ([]) { "yes"; }')).toBeNull();
                expect(evaluator.evaluate('if ({}) { "yes"; }')).toBeNull();
            });
        });

        describe('if-else expressions', () => {
            it('should execute else block when condition is false', () => {
                const result = evaluator.evaluate(`
                    if (false) {
                        "if";
                    } else {
                        "else";
                    }
                `);
                expect(result).toBe('else');
            });

            it('should execute if block when condition is true', () => {
                const result = evaluator.evaluate(`
                    if (true) {
                        "if";
                    } else {
                        "else";
                    }
                `);
                expect(result).toBe('if');
            });

            it('should handle complex expressions in blocks', () => {
                const result = evaluator.evaluate(`
                    if (10 > 5) {
                        let x = 20;
                        x * 2;
                    } else {
                        let y = 10;
                        y * 3;
                    }
                `);
                expect(result).toBe(40);
            });
        });

        describe('if-else-if expressions', () => {
            it('should execute first true condition', () => {
                const result = evaluator.evaluate(`
                    if (false) {
                        "first";
                    } else if (true) {
                        "second";
                    } else {
                        "third";
                    }
                `);
                expect(result).toBe('second');
            });

            it('should execute else when all conditions are false', () => {
                const result = evaluator.evaluate(`
                    if (false) {
                        "first";
                    } else if (false) {
                        "second";
                    } else {
                        "third";
                    }
                `);
                expect(result).toBe('third');
            });

            it('should handle multiple else-if clauses', () => {
                evaluator.declareContextValue('score', 85);
                const result = evaluator.evaluate(`
                    if (score >= 90) {
                        "A";
                    } else if (score >= 80) {
                        "B";
                    } else if (score >= 70) {
                        "C";
                    } else {
                        "F";
                    }
                `);
                expect(result).toBe('B');
            });

            it('should return null when all conditions are false and no else', () => {
                const result = evaluator.evaluate(`
                    if (false) {
                        "first";
                    } else if (false) {
                        "second";
                    }
                `);
                expect(result).toBeNull();
            });

            it('should stop at first true condition', () => {
                evaluator.declareContextValue('counter', 0);
                const result = evaluator.evaluate(`
                    if (false) {
                        counter = counter + 1;
                        "first";
                    } else if (true) {
                        counter = counter + 10;
                        "second";
                    } else if (true) {
                        counter = counter + 100;
                        "third";
                    }
                    counter;
                `);
                expect(result).toBe(10);
            });
        });

        describe('nested if expressions', () => {
            it('should handle nested if statements', () => {
                const result = evaluator.evaluate(`
                    if (true) {
                        if (true) {
                            "nested";
                        }
                    }
                `);
                expect(result).toBe('nested');
            });

            it('should handle nested if-else statements', () => {
                const result = evaluator.evaluate(`
                    if (true) {
                        if (false) {
                            "inner-if";
                        } else {
                            "inner-else";
                        }
                    } else {
                        "outer-else";
                    }
                `);
                expect(result).toBe('inner-else');
            });

            it('should handle deeply nested conditions', () => {
                evaluator.declareContextValue('x', 5);
                evaluator.declareContextValue('y', 10);
                const result = evaluator.evaluate(`
                    if (x < y) {
                        if (x > 0) {
                            if (y > 5) {
                                "all conditions met";
                            }
                        }
                    }
                `);
                expect(result).toBe('all conditions met');
            });
        });

        describe('if expressions with variables', () => {
            it('should access outer scope variables', () => {
                const result = evaluator.evaluate(`
                    let x = 10;
                    if (x > 5) {
                        x * 2;
                    }
                `);
                expect(result).toBe(20);
            });

            it('should modify outer scope variables', () => {
                const result = evaluator.evaluate(`
                    let count = 0;
                    if (true) {
                        count = count + 5;
                    }
                    count;
                `);
                expect(result).toBe(5);
            });

            it('should declare variables in if block scope', () => {
                expect(() => evaluator.evaluate(`
                    if (true) {
                        let blockVar = 10;
                    }
                    blockVar;
                `)).toThrow(JexLangRuntimeError);
            });

            it('should handle variable declarations in different branches', () => {
                evaluator.declareContextValue('flag', true);
                const result = evaluator.evaluate(`
                    let result = 0;
                    if (flag) {
                        let temp = 10;
                        result = temp;
                    } else {
                        let temp = 20;
                        result = temp;
                    }
                    result;
                `);
                expect(result).toBe(10);
            });
        });

        describe('async if expressions', () => {
            it('should handle async condition evaluation', async () => {
                const asyncCheck: FuncImpl = async () => true;
                evaluator.addFunction('asyncCheck', asyncCheck);
                const result = await evaluator.evaluate(`
                    if (asyncCheck()) {
                        "async-true";
                    } else {
                        "async-false";
                    }
                `);
                expect(result).toBe('async-true');
            });

            it('should handle async operations in if block', async () => {
                const asyncValue: FuncImpl = async () => 42;
                evaluator.addFunction('asyncValue', asyncValue);
                const result = await evaluator.evaluate(`
                    if (true) {
                        let val = asyncValue();
                        val * 2;
                    }
                `);
                expect(result).toBe(84);
            });

            it('should handle async operations in else block', async () => {
                const asyncValue: FuncImpl = async () => 100;
                evaluator.addFunction('asyncValue', asyncValue);
                const result = await evaluator.evaluate(`
                    if (false) {
                        50;
                    } else {
                        asyncValue();
                    }
                `);
                expect(result).toBe(100);
            });

            it('should handle async operations in else-if block', async () => {
                const asyncCheck: FuncImpl = async (_ctx, val) => Number(val) > 10;
                evaluator.addFunction('asyncCheck', asyncCheck);
                const result = await evaluator.evaluate(`
                    if (false) {
                        "first";
                    } else if (asyncCheck(15)) {
                        "async-true";
                    } else {
                        "final";
                    }
                `);
                expect(result).toBe('async-true');
            });

            it('should handle multiple async operations in if-else chain', async () => {
                const asyncValue: FuncImpl = async (_ctx, val) => Number(val);
                evaluator.addFunction('asyncValue', asyncValue);
                const result = await evaluator.evaluate(`
                    let sum = 0;
                    if (asyncValue(5) > 3) {
                        sum = sum + asyncValue(10);
                    } else if (asyncValue(2) > 1) {
                        sum = sum + asyncValue(20);
                    } else {
                        sum = sum + asyncValue(30);
                    }
                    sum;
                `);
                expect(result).toBe(10);
            });

            it('should handle nested async if statements', async () => {
                const asyncCheck: FuncImpl = async (_ctx, val) => Boolean(val);
                evaluator.addFunction('asyncCheck', asyncCheck);
                const result = await evaluator.evaluate(`
                    if (asyncCheck(true)) {
                        if (asyncCheck(true)) {
                            "nested-async";
                        }
                    }
                `);
                expect(result).toBe('nested-async');
            });

            it('should handle async in condition with sync in block', async () => {
                const asyncGreater: FuncImpl = async (_ctx, a, b) => Number(a) > Number(b);
                evaluator.addFunction('asyncGreater', asyncGreater);
                const result = await evaluator.evaluate(`
                    if (asyncGreater(10, 5)) {
                        let x = 20;
                        x + 30;
                    }
                `);
                expect(result).toBe(50);
            });

            it('should handle sync condition with async in block', async () => {
                const asyncMultiply: FuncImpl = async (_ctx, a, b) => Number(a) * Number(b);
                evaluator.addFunction('asyncMultiply', asyncMultiply);
                const result = await evaluator.evaluate(`
                    if (5 > 3) {
                        asyncMultiply(4, 5);
                    }
                `);
                expect(result).toBe(20);
            });

            it('should handle complex async expressions in conditions', async () => {
                const asyncCompare: FuncImpl = async (_ctx, a, b, op) => {
                    const numA = Number(a);
                    const numB = Number(b);
                    if (op === '>') return numA > numB;
                    if (op === '<') return numA < numB;
                    return numA === numB;
                };
                evaluator.addFunction('asyncCompare', asyncCompare);
                const result = await evaluator.evaluate(`
                    if (asyncCompare(10, 5, ">") && asyncCompare(3, 8, "<")) {
                        "both true";
                    } else {
                        "at least one false";
                    }
                `);
                expect(result).toBe('both true');
            });

            it('should handle async with variable assignments across branches', async () => {
                const asyncCalc: FuncImpl = async (_ctx, val) => Number(val) * 3;
                evaluator.addFunction('asyncCalc', asyncCalc);
                const result = await evaluator.evaluate(`
                    let result = 0;
                    if (false) {
                        result = asyncCalc(10);
                    } else if (true) {
                        result = asyncCalc(20);
                    } else {
                        result = asyncCalc(30);
                    }
                    result;
                `);
                expect(result).toBe(60);
            });
        });

        describe('sync if expressions', () => {
            it('should handle multiple sync operations in if block', () => {
                const result = evaluator.evaluate(`
                    let total = 0;
                    if (true) {
                        total = total + 10;
                        total = total * 2;
                        total = total + 5;
                    }
                    total;
                `);
                expect(result).toBe(25);
            });

            it('should handle sync expressions with context variables', () => {
                evaluator.declareContextValue('multiplier', 3);
                evaluator.declareContextValue('base', 10);
                const result = evaluator.evaluate(`
                    if (multiplier > 2) {
                        base * multiplier;
                    } else {
                        base;
                    }
                `);
                expect(result).toBe(30);
            });

            it('should handle sync function calls in conditions', () => {
                const syncCheck: FuncImpl = (_ctx, val) => Number(val) % 2 === 0;
                evaluator.addFunction('syncCheck', syncCheck);
                const result = evaluator.evaluate(`
                    if (syncCheck(10)) {
                        "even";
                    } else {
                        "odd";
                    }
                `);
                expect(result).toBe('even');
            });

            it('should handle complex sync expressions in if-else chain', () => {
                evaluator.declareContextValue('nums', [1, 2, 3, 4, 5]);
                const result = evaluator.evaluate(`
                    let sum = 0;
                    if (length(nums) > 3) {
                        let index = 0;
                        repeat(nums) {
                            sum = sum + $it;
                        }
                        sum;
                    } else {
                        -1;
                    }
                `);
                expect(result).toBe(15);
            });
        });

        describe('if expressions with different return types', () => {
            it('should return numbers from if blocks', () => {
                expect(evaluator.evaluate('if (true) { 42; }')).toBe(42);
                expect(evaluator.evaluate('if (false) { 42; } else { 100; }')).toBe(100);
            });

            it('should return strings from if blocks', () => {
                expect(evaluator.evaluate('if (true) { "hello"; }')).toBe('hello');
                expect(evaluator.evaluate('if (false) { "a"; } else { "b"; }')).toBe('b');
            });

            it('should return booleans from if blocks', () => {
                expect(evaluator.evaluate('if (5 > 3) { true; }')).toBe(true);
                expect(evaluator.evaluate('if (5 < 3) { true; } else { false; }')).toBe(false);
            });

            it('should return arrays from if blocks', () => {
                expect(evaluator.evaluate('if (true) { [1, 2, 3]; }')).toEqual([1, 2, 3]);
                expect(evaluator.evaluate('if (false) { [1]; } else { [2, 3]; }')).toEqual([2, 3]);
            });

            it('should return objects from if blocks', () => {
                expect(evaluator.evaluate('if (true) { {"x": 1}; }')).toEqual({x: 1});
                expect(evaluator.evaluate('if (false) { {"a": 1}; } else { {"b": 2}; }')).toEqual({b: 2});
            });

            it('should return null from if blocks', () => {
                expect(evaluator.evaluate('if (true) { null; }')).toBeNull();
                expect(evaluator.evaluate('if (false) { 1; } else { null; }')).toBeNull();
            });
        });
    });

    describe('prefix expressions', () => {
        describe('prefix increment/decrement with variables', () => {
            it('should increment variable with prefix operator', () => {
                evaluator.declareContextValue('x', 5);
                const result = evaluator.evaluate('++x');
                expect(result).toBe(6);
                expect(evaluator.evaluate('x')).toBe(6);
            });

            it('should decrement variable with prefix operator', () => {
                evaluator.declareContextValue('y', 10);
                const result = evaluator.evaluate('--y');
                expect(result).toBe(9);
                expect(evaluator.evaluate('y')).toBe(9);
            });

            it('should return new value after prefix increment', () => {
                evaluator.declareContextValue('count', 0);
                expect(evaluator.evaluate('++count')).toBe(1);
                expect(evaluator.evaluate('++count')).toBe(2);
                expect(evaluator.evaluate('count')).toBe(2);
            });

            it('should return new value after prefix decrement', () => {
                evaluator.declareContextValue('count', 5);
                expect(evaluator.evaluate('--count')).toBe(4);
                expect(evaluator.evaluate('--count')).toBe(3);
                expect(evaluator.evaluate('count')).toBe(3);
            });

            it('should handle multiple prefix operations', () => {
                evaluator.declareContextValue('a', 0);
                evaluator.declareContextValue('b', 0);
                const result = evaluator.evaluate('++a + ++b');
                expect(result).toBe(2);
                expect(evaluator.evaluate('a')).toBe(1);
                expect(evaluator.evaluate('b')).toBe(1);
            });

            it('should throw error for undefined variable', () => {
                expect(() => evaluator.evaluate('++undefinedVar')).toThrow();
                expect(() => evaluator.evaluate('--undefinedVar')).toThrow();
            });
        });

        describe('prefix increment/decrement with array elements', () => {
            it('should increment array element with positive index', () => {
                evaluator.declareContextValue('arr', [1, 2, 3]);
                const result = evaluator.evaluate('++arr[0]');
                expect(result).toBe(2);
                expect(evaluator.evaluate('arr[0]')).toBe(2);
                expect(evaluator.evaluate('arr')).toEqual([2, 2, 3]);
            });

            it('should decrement array element with positive index', () => {
                evaluator.declareContextValue('arr', [10, 20, 30]);
                const result = evaluator.evaluate('--arr[1]');
                expect(result).toBe(19);
                expect(evaluator.evaluate('arr[1]')).toBe(19);
            });

            it('should increment array element with negative index', () => {
                evaluator.declareContextValue('arr', [5, 10, 15]);
                const result = evaluator.evaluate('++arr[-1]');
                expect(result).toBe(16);
                expect(evaluator.evaluate('arr[-1]')).toBe(16);
                expect(evaluator.evaluate('arr[2]')).toBe(16);
            });

            it('should decrement array element with negative index', () => {
                evaluator.declareContextValue('arr', [100, 200, 300]);
                const result = evaluator.evaluate('--arr[-2]');
                expect(result).toBe(199);
                expect(evaluator.evaluate('arr[-2]')).toBe(199);
                expect(evaluator.evaluate('arr[1]')).toBe(199);
            });

            it('should handle prefix operations with expression as index', () => {
                evaluator.declareContextValue('arr', [1, 2, 3, 4, 5]);
                evaluator.declareContextValue('idx', 2);
                const result = evaluator.evaluate('++arr[idx + 1]');
                expect(result).toBe(5);
                expect(evaluator.evaluate('arr[3]')).toBe(5);
            });

            it('should return null for out of bounds array index', () => {
                evaluator.declareContextValue('arr', [1, 2, 3]);
                const result = evaluator.evaluate('++arr[10]');
                expect(result).toBeNull();
            });

            it('should handle nested array increment', () => {
                evaluator.declareContextValue('matrix', [[1, 2], [3, 4]]);
                const result = evaluator.evaluate('++matrix[0][1]');
                expect(result).toBe(3);
                expect(evaluator.evaluate('matrix[0][1]')).toBe(3);
            });
        });

        describe('prefix increment/decrement with object properties', () => {
            it('should increment object property with dot notation', () => {
                evaluator.declareContextValue('obj', { count: 5 });
                const result = evaluator.evaluate('++obj.count');
                expect(result).toBe(6);
                expect(evaluator.evaluate('obj.count')).toBe(6);
            });

            it('should decrement object property with dot notation', () => {
                evaluator.declareContextValue('obj', { value: 20 });
                const result = evaluator.evaluate('--obj.value');
                expect(result).toBe(19);
                expect(evaluator.evaluate('obj.value')).toBe(19);
            });

            it('should increment object property with bracket notation', () => {
                evaluator.declareContextValue('obj', { score: 10 });
                const result = evaluator.evaluate('++obj["score"]');
                expect(result).toBe(11);
                expect(evaluator.evaluate('obj.score')).toBe(11);
            });

            it('should decrement object property with bracket notation', () => {
                evaluator.declareContextValue('obj', { points: 50 });
                const result = evaluator.evaluate('--obj["points"]');
                expect(result).toBe(49);
                expect(evaluator.evaluate('obj.points')).toBe(49);
            });

            it('should handle prefix operations with dynamic property names', () => {
                evaluator.declareContextValue('obj', { x: 5, y: 10 });
                evaluator.declareContextValue('key', 'x');
                const result = evaluator.evaluate('++obj[key]');
                expect(result).toBe(6);
                expect(evaluator.evaluate('obj.x')).toBe(6);
            });

            it('should handle nested object property increment', () => {
                evaluator.declareContextValue('data', { user: { age: 25 } });
                const result = evaluator.evaluate('++data.user.age');
                expect(result).toBe(26);
                expect(evaluator.evaluate('data.user.age')).toBe(26);
            });

            it('should throw error for non-object property access', () => {
                evaluator.declareContextValue('num', 42);
                expect(() => evaluator.evaluate('++num.prop')).toThrow();
            });
        });
    });

    describe('postfix expressions', () => {
        describe('postfix increment/decrement with variables', () => {
            it('should increment variable with postfix operator', () => {
                evaluator.declareContextValue('x', 5);
                const result = evaluator.evaluate('x++');
                expect(result).toBe(5);
                expect(evaluator.evaluate('x')).toBe(6);
            });

            it('should decrement variable with postfix operator', () => {
                evaluator.declareContextValue('y', 10);
                const result = evaluator.evaluate('y--');
                expect(result).toBe(10);
                expect(evaluator.evaluate('y')).toBe(9);
            });

            it('should return old value after postfix increment', () => {
                evaluator.declareContextValue('count', 0);
                expect(evaluator.evaluate('count++')).toBe(0);
                expect(evaluator.evaluate('count')).toBe(1);
                expect(evaluator.evaluate('count++')).toBe(1);
                expect(evaluator.evaluate('count')).toBe(2);
            });

            it('should return old value after postfix decrement', () => {
                evaluator.declareContextValue('count', 5);
                expect(evaluator.evaluate('count--')).toBe(5);
                expect(evaluator.evaluate('count')).toBe(4);
                expect(evaluator.evaluate('count--')).toBe(4);
                expect(evaluator.evaluate('count')).toBe(3);
            });

            it('should handle multiple postfix operations', () => {
                evaluator.declareContextValue('a', 0);
                evaluator.declareContextValue('b', 0);
                const result = evaluator.evaluate('a++ + b++');
                expect(result).toBe(0);
                expect(evaluator.evaluate('a')).toBe(1);
                expect(evaluator.evaluate('b')).toBe(1);
            });

            it('should handle mix of prefix and postfix', () => {
                evaluator.declareContextValue('x', 5);
                const result = evaluator.evaluate('++x + x++');
                expect(result).toBe(12); // (6) + (6), then x becomes 7
                expect(evaluator.evaluate('x')).toBe(7);
            });

            it('should throw error for undefined variable', () => {
                expect(() => evaluator.evaluate('undefinedVar++')).toThrow();
                expect(() => evaluator.evaluate('undefinedVar--')).toThrow();
            });
        });

        describe('postfix increment/decrement with array elements', () => {
            it('should increment array element with positive index', () => {
                evaluator.declareContextValue('arr', [1, 2, 3]);
                const result = evaluator.evaluate('arr[0]++');
                expect(result).toBe(1);
                expect(evaluator.evaluate('arr[0]')).toBe(2);
                expect(evaluator.evaluate('arr')).toEqual([2, 2, 3]);
            });

            it('should decrement array element with positive index', () => {
                evaluator.declareContextValue('arr', [10, 20, 30]);
                const result = evaluator.evaluate('arr[1]--');
                expect(result).toBe(20);
                expect(evaluator.evaluate('arr[1]')).toBe(19);
            });

            it('should increment array element with negative index', () => {
                evaluator.declareContextValue('arr', [5, 10, 15]);
                const result = evaluator.evaluate('arr[-1]++');
                expect(result).toBe(15);
                expect(evaluator.evaluate('arr[-1]')).toBe(16);
                expect(evaluator.evaluate('arr[2]')).toBe(16);
            });

            it('should decrement array element with negative index', () => {
                evaluator.declareContextValue('arr', [100, 200, 300]);
                const result = evaluator.evaluate('arr[-2]--');
                expect(result).toBe(200);
                expect(evaluator.evaluate('arr[-2]')).toBe(199);
                expect(evaluator.evaluate('arr[1]')).toBe(199);
            });

            it('should handle postfix operations with expression as index', () => {
                evaluator.declareContextValue('arr', [1, 2, 3, 4, 5]);
                evaluator.declareContextValue('idx', 2);
                const result = evaluator.evaluate('arr[idx + 1]++');
                expect(result).toBe(4);
                expect(evaluator.evaluate('arr[3]')).toBe(5);
            });

            it('should handle postfix with computed index expression', () => {
                evaluator.declareContextValue('arr', [10, 20, 30, 40]);
                const result = evaluator.evaluate('arr[1 + 1]++');
                expect(result).toBe(30);
                expect(evaluator.evaluate('arr[2]')).toBe(31);
            });

            it('should return null for out of bounds array index', () => {
                evaluator.declareContextValue('arr', [1, 2, 3]);
                const result = evaluator.evaluate('arr[10]++');
                expect(result).toBeNull();
            });

            it('should handle nested array decrement', () => {
                evaluator.declareContextValue('matrix', [[1, 2], [3, 4]]);
                const result = evaluator.evaluate('matrix[1][0]--');
                expect(result).toBe(3);
                expect(evaluator.evaluate('matrix[1][0]')).toBe(2);
            });
        });

        describe('postfix increment/decrement with object properties', () => {
            it('should increment object property with dot notation', () => {
                evaluator.declareContextValue('obj', { count: 5 });
                const result = evaluator.evaluate('obj.count++');
                expect(result).toBe(5);
                expect(evaluator.evaluate('obj.count')).toBe(6);
            });

            it('should decrement object property with dot notation', () => {
                evaluator.declareContextValue('obj', { value: 20 });
                const result = evaluator.evaluate('obj.value--');
                expect(result).toBe(20);
                expect(evaluator.evaluate('obj.value')).toBe(19);
            });

            it('should increment object property with bracket notation', () => {
                evaluator.declareContextValue('obj', { score: 10 });
                const result = evaluator.evaluate('obj["score"]++');
                expect(result).toBe(10);
                expect(evaluator.evaluate('obj.score')).toBe(11);
            });

            it('should decrement object property with bracket notation', () => {
                evaluator.declareContextValue('obj', { points: 50 });
                const result = evaluator.evaluate('obj["points"]--');
                expect(result).toBe(50);
                expect(evaluator.evaluate('obj.points')).toBe(49);
            });

            it('should handle postfix operations with dynamic property names', () => {
                evaluator.declareContextValue('obj', { x: 5, y: 10 });
                evaluator.declareContextValue('key', 'y');
                const result = evaluator.evaluate('obj[key]++');
                expect(result).toBe(10);
                expect(evaluator.evaluate('obj.y')).toBe(11);
            });

            it('should handle nested object property decrement', () => {
                evaluator.declareContextValue('data', { user: { age: 25 } });
                const result = evaluator.evaluate('data.user.age--');
                expect(result).toBe(25);
                expect(evaluator.evaluate('data.user.age')).toBe(24);
            });

            it('should throw error for non-object property access', () => {
                evaluator.declareContextValue('str', 'test');
                expect(() => evaluator.evaluate('str.length++')).toThrow();
            });
        });

        describe('complex postfix/prefix scenarios', () => {
            it('should handle array of objects with postfix', () => {
                evaluator.declareContextValue('users', [
                    { score: 10 },
                    { score: 20 }
                ]);
                const result = evaluator.evaluate('users[0].score++');
                expect(result).toBe(10);
                expect(evaluator.evaluate('users[0].score')).toBe(11);
            });

            it('should handle object with array property and prefix', () => {
                evaluator.declareContextValue('data', { values: [5, 10, 15] });
                const result = evaluator.evaluate('++data.values[1]');
                expect(result).toBe(11);
                expect(evaluator.evaluate('data.values[1]')).toBe(11);
            });

            it('should handle negative index with postfix in nested array', () => {
                evaluator.declareContextValue('matrix', [[1, 2], [3, 4], [5, 6]]);
                const result = evaluator.evaluate('matrix[-1][-1]++');
                expect(result).toBe(6);
                expect(evaluator.evaluate('matrix[-1][-1]')).toBe(7);
                expect(evaluator.evaluate('matrix[2][1]')).toBe(7);
            });

            it('should handle expression in both array and object access', () => {
                evaluator.declareContextValue('complex', {
                    items: [
                        { count: 0 },
                        { count: 5 }
                    ]
                });
                evaluator.declareContextValue('idx', 0);
                const result = evaluator.evaluate('complex.items[idx + 1].count++');
                expect(result).toBe(5);
                expect(evaluator.evaluate('complex.items[1].count')).toBe(6);
            });
        });
    });
});
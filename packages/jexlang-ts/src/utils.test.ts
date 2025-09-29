import { describe, expect, test } from 'vitest';
import { createGlobalScope, getJexValueType, isNumeric, toBoolean, toNumber, toString } from './utils';
import { TypeMismatchError } from './eval';
import packageJson from '../package.json';

describe('utils', () => {

    describe('getJexValueType', () => {
        test('null is of type null', () => {
            expect(getJexValueType(null)).toBe('null');
        });

        test('array is of type array', () => {
            expect(getJexValueType([1, 2, 3])).toBe('array');
            expect(getJexValueType([])).toBe('array');
        });

        test('object is of type object', () => {
            expect(getJexValueType({ foo: 'bar' })).toBe('object');
            expect(getJexValueType({})).toBe('object');
        });

        test('string is of type string', () => {
            expect(getJexValueType('hello')).toBe('string');
            expect(getJexValueType('')).toBe('string');
        });

        test('number is of type number', () => {
            expect(getJexValueType(123)).toBe('number');
            expect(getJexValueType(45.67)).toBe('number');
        });

        test('boolean is of type boolean', () => {
            expect(getJexValueType(true)).toBe('boolean');
            expect(getJexValueType(false)).toBe('boolean');
        });
    });

    describe('isNumeric', () => {
        test('returns true for finite numbers', () => {
            expect(isNumeric(123)).toBe(true);
            expect(isNumeric(45.67)).toBe(true);
            expect(isNumeric(0)).toBe(true);
            expect(isNumeric(-10)).toBe(true);
        });

        test('returns false for non-numeric values', () => {
            expect(isNumeric(NaN)).toBe(false);
            expect(isNumeric(Infinity)).toBe(false);
            expect(isNumeric(-Infinity)).toBe(false);
            expect(isNumeric('123')).toBe(false);
            expect(isNumeric(true)).toBe(false);
            expect(isNumeric(null)).toBe(false);
            expect(isNumeric([])).toBe(false);
            expect(isNumeric({})).toBe(false);
        });
    });

    describe('toNumber', () => {
        test('convert number to number', () => {
            expect(toNumber(123)).toBe(123);
            expect(toNumber(45.67)).toBe(45.67);
            expect(toNumber(0)).toBe(0);
            expect(toNumber(-10)).toBe(-10);
            expect(toNumber(NaN)).toBeNaN();
            expect(toNumber(Infinity)).toBe(Infinity);
            expect(toNumber(-Infinity)).toBe(-Infinity);
        });

        test('convert boolean to number', () => {
            expect(toNumber(true)).toBe(1);
            expect(toNumber(false)).toBe(0);
        });

        test('convert string to number', () => {
            expect(toNumber('123')).toBe(123);
            expect(toNumber('45.67')).toBe(45.67);
            expect(toNumber('0')).toBe(0);
            expect(toNumber('-10')).toBe(-10);
            expect(toNumber('  42  ')).toBe(42); // with whitespace
        });

        test('convert null/undefined to 0', () => {
            expect(toNumber(null)).toBe(0);
        });

        test('throws error for non-convertible values', () => {
            expect(() => toNumber('abc')).toThrow(TypeMismatchError);
            expect(() => toNumber([])).toThrow(TypeMismatchError);
            expect(() => toNumber({})).toThrow(TypeMismatchError);
        });
    });

    describe('toBoolean', () => {
        test('convert boolean to boolean', () => {
            expect(toBoolean(true)).toBe(true);
            expect(toBoolean(false)).toBe(false);
        });

        test('convert number to boolean', () => {
            expect(toBoolean(123)).toBe(true);
            expect(toBoolean(0)).toBe(false);
            expect(toBoolean(-10)).toBe(true);
            expect(toBoolean(NaN)).toBe(false);
            expect(toBoolean(Infinity)).toBe(true);
        });

        test('convert string to boolean', () => {
            expect(toBoolean('hello')).toBe(true);
            expect(toBoolean('')).toBe(false);
            expect(toBoolean(' ')).toBe(true); // whitespace is truthy
        });

        test('convert array to boolean', () => {
            expect(toBoolean([1, 2, 3])).toBe(true);
            expect(toBoolean([])).toBe(false);
            expect(toBoolean([null])).toBe(true); // non-empty array is truthy
        });

        test('convert object to boolean', () => {
            expect(toBoolean({ foo: 'bar' })).toBe(true);
            expect(toBoolean({})).toBe(false);
            expect(toBoolean({ key: null })).toBe(true); // non-empty object is truthy
        });

        test('convert null/undefined to false', () => {
            expect(toBoolean(null)).toBe(false);
        });
    });

    describe('toString', () => {
        test('convert null to stringified null', () => {
            expect(toString(null)).toBe('null');
        });

        test('convert string to string', () => {
            expect(toString('hello')).toBe('hello');
        });

        test('convert number to string', () => {
            expect(toString(123)).toBe('123');
            expect(toString(45.67)).toBe('45.67');
        });

        test('convert boolean to string', () => {
            expect(toString(true)).toBe('true');
        });
        
        test('convert array to string', () => {
            expect(toString([1, 2, 3])).toBe('[1, 2, 3]');
            expect(toString([1, 'two', 3, true, null])).toBe('[1, two, 3, true, null]');
            expect(toString([])).toBe('[]');
            expect(toString([null, null])).toBe('[null, null]');
            expect(toString([[1, 2], [3, 4]])).toBe('[[1, 2], [3, 4]]');
            expect(toString([1, [2, [3]]])).toBe('[1, [2, [3]]]');
        });

        test('convert object to string', () => {
            expect(toString({ foo: 'bar' })).toBe(JSON.stringify({ foo: 'bar' }));
            expect(toString({})).toBe('{}');
            expect(toString({ a: 1, b: [2, 3], c: { d: 4 } })).toBe(JSON.stringify({ a: 1, b: [2, 3], c: { d: 4 } }));
            expect(toString({ key: null })).toBe(JSON.stringify({ key: null }));
        });
    });

    describe('createGlobalScope', () => {
        test('global scope contains mathematical constants', () => {
            const scope = createGlobalScope();
            expect(scope.getVariable('PI')).toBe(Math.PI);
            expect(scope.getVariable('E')).toBe(Math.E);
            expect(scope.getVariable('LN2')).toBe(Math.LN2);
            expect(scope.getVariable('LN10')).toBe(Math.LN10);
            expect(scope.getVariable('LOG2E')).toBe(Math.LOG2E);
            expect(scope.getVariable('LOG10E')).toBe(Math.LOG10E);
            expect(scope.getVariable('SQRT1_2')).toBe(Math.SQRT1_2);
            expect(scope.getVariable('SQRT2')).toBe(Math.SQRT2);
            expect(scope.getVariable('NON_EXISTENT')).toBeNull();
            expect(scope.getVariable('VERSION')).toBe(packageJson.version);
            expect(scope.getVariable('IS_JAVASCRIPT')).toBe(true);
            expect(scope.getVariable('IS_JAVA')).toBe(false);
        });
    });
});
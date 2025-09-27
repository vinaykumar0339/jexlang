import { describe, expect, test } from 'vitest';
import { getJexValueType, toString } from './utils';

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
});
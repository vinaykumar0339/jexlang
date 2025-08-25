import { describe, expect, test } from 'vitest';
import { toString } from './utils';

describe('utils.toString', () => {
    test('convert null to stringified null', () => {
        expect(toString(null)).toBe('null');
    });

    test('convert string to string', () => {
        expect(toString('hello')).toBe('hello');
    });

    test('convert number to string', () => {
        expect(toString(123)).toBe('123');
    });

    test('convert boolean to string', () => {
        expect(toString(true)).toBe('true');
    });
    
    test('convert array to string', () => {
        expect(toString([1, 2, 3])).toBe('[1, 2, 3]');
    });

    test('convert object to string', () => {
        expect(toString({ foo: 'bar' })).toBe(JSON.stringify({ foo: 'bar' }));
    });

    test('convert array of different types to string', () => {
        expect(toString([1, 'two', 3, true, null])).toBe('[1, two, 3, true, null]');
    });

});
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BUILT_IN_FUNCTIONS } from './builtin';
import { TypeMismatchError } from '../errors';
import type { JexValue } from '../../types';

describe('BUILT_IN_FUNCTIONS', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    describe('Math functions', () => {
        describe('basic math functions', () => {
            it('should calculate absolute value', () => {
                expect(BUILT_IN_FUNCTIONS.abs(-5)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.abs(5)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.abs(-3.14)).toBe(3.14);
                expect(BUILT_IN_FUNCTIONS.abs('5')).toBe(5);
            });

            it('should calculate ceiling', () => {
                expect(BUILT_IN_FUNCTIONS.ceil(4.2)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.ceil(-4.2)).toBe(-4);
                expect(BUILT_IN_FUNCTIONS.ceil(5)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.ceil('4.7')).toBe(5);
            });

            it('should calculate floor', () => {
                expect(BUILT_IN_FUNCTIONS.floor(4.7)).toBe(4);
                expect(BUILT_IN_FUNCTIONS.floor(-4.7)).toBe(-5);
                expect(BUILT_IN_FUNCTIONS.floor(5)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.floor('4.2')).toBe(4);
            });

            it('should round numbers', () => {
                expect(BUILT_IN_FUNCTIONS.round(4.4)).toBe(4);
                expect(BUILT_IN_FUNCTIONS.round(4.5)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.round(-4.5)).toBe(-4);
                expect(BUILT_IN_FUNCTIONS.round('4.6')).toBe(5);
            });

            it('should truncate numbers', () => {
                expect(BUILT_IN_FUNCTIONS.trunc(4.9)).toBe(4);
                expect(BUILT_IN_FUNCTIONS.trunc(-4.9)).toBe(-4);
                expect(BUILT_IN_FUNCTIONS.trunc(5)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.trunc('4.7')).toBe(4);
            });
        });

        describe('trigonometric functions', () => {
            it('should calculate sine', () => {
                expect(BUILT_IN_FUNCTIONS.sin(0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.sin(Math.PI / 2)).toBeCloseTo(1);
                expect(BUILT_IN_FUNCTIONS.sin('0')).toBe(0);
            });

            it('should calculate cosine', () => {
                expect(BUILT_IN_FUNCTIONS.cos(0)).toBe(1);
                expect(BUILT_IN_FUNCTIONS.cos(Math.PI)).toBeCloseTo(-1);
                expect(BUILT_IN_FUNCTIONS.cos('0')).toBe(1);
            });

            it('should calculate tangent', () => {
                expect(BUILT_IN_FUNCTIONS.tan(0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.tan(Math.PI / 4)).toBeCloseTo(1);
                expect(BUILT_IN_FUNCTIONS.tan('0')).toBe(0);
            });

            it('should calculate arcsine', () => {
                expect(BUILT_IN_FUNCTIONS.asin(0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.asin(1)).toBeCloseTo(Math.PI / 2);
                expect(BUILT_IN_FUNCTIONS.asin('0')).toBe(0);
            });

            it('should calculate arccosine', () => {
                expect(BUILT_IN_FUNCTIONS.acos(1)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.acos(0)).toBeCloseTo(Math.PI / 2);
                expect(BUILT_IN_FUNCTIONS.acos('1')).toBe(0);
            });

            it('should calculate arctangent', () => {
                expect(BUILT_IN_FUNCTIONS.atan(0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.atan(1)).toBeCloseTo(Math.PI / 4);
                expect(BUILT_IN_FUNCTIONS.atan('0')).toBe(0);
            });

            it('should calculate atan2', () => {
                expect(BUILT_IN_FUNCTIONS.atan2(0, 1)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.atan2(1, 1)).toBeCloseTo(Math.PI / 4);
                expect(BUILT_IN_FUNCTIONS.atan2('1', '1')).toBeCloseTo(Math.PI / 4);
            });
        });

        describe('exponential and logarithmic functions', () => {
            it('should calculate exponential', () => {
                expect(BUILT_IN_FUNCTIONS.exp(0)).toBe(1);
                expect(BUILT_IN_FUNCTIONS.exp(1)).toBeCloseTo(Math.E);
                expect(BUILT_IN_FUNCTIONS.exp('0')).toBe(1);
            });

            it('should calculate natural logarithm', () => {
                expect(BUILT_IN_FUNCTIONS.log(1)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.log(Math.E)).toBeCloseTo(1);
                expect(BUILT_IN_FUNCTIONS.log('1')).toBe(0);
            });

            it('should calculate base 10 logarithm', () => {
                expect(BUILT_IN_FUNCTIONS.log10(1)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.log10(10)).toBe(1);
                expect(BUILT_IN_FUNCTIONS.log10('100')).toBe(2);
            });

            it('should calculate base 2 logarithm', () => {
                expect(BUILT_IN_FUNCTIONS.log2(1)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.log2(2)).toBe(1);
                expect(BUILT_IN_FUNCTIONS.log2('8')).toBe(3);
            });

            it('should calculate square root', () => {
                expect(BUILT_IN_FUNCTIONS.sqrt(4)).toBe(2);
                expect(BUILT_IN_FUNCTIONS.sqrt(9)).toBe(3);
                expect(BUILT_IN_FUNCTIONS.sqrt('16')).toBe(4);
            });

            it('should calculate cube root', () => {
                expect(BUILT_IN_FUNCTIONS.cbrt(8)).toBe(2);
                expect(BUILT_IN_FUNCTIONS.cbrt(27)).toBe(3);
                expect(BUILT_IN_FUNCTIONS.cbrt('64')).toBe(4);
            });
        });

        describe('hyperbolic functions', () => {
            it('should calculate hyperbolic sine', () => {
                expect(BUILT_IN_FUNCTIONS.sinh(0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.sinh('0')).toBe(0);
            });

            it('should calculate hyperbolic cosine', () => {
                expect(BUILT_IN_FUNCTIONS.cosh(0)).toBe(1);
                expect(BUILT_IN_FUNCTIONS.cosh('0')).toBe(1);
            });

            it('should calculate hyperbolic tangent', () => {
                expect(BUILT_IN_FUNCTIONS.tanh(0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.tanh('0')).toBe(0);
            });

            it('should calculate inverse hyperbolic sine', () => {
                expect(BUILT_IN_FUNCTIONS.asinh(0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.asinh('0')).toBe(0);
            });

            it('should calculate inverse hyperbolic cosine', () => {
                expect(BUILT_IN_FUNCTIONS.acosh(1)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.acosh('1')).toBe(0);
            });

            it('should calculate inverse hyperbolic tangent', () => {
                expect(BUILT_IN_FUNCTIONS.atanh(0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.atanh('0')).toBe(0);
            });
        });

        describe('utility functions', () => {
            it('should find minimum value', () => {
                expect(BUILT_IN_FUNCTIONS.min(1, 2, 3)).toBe(1);
                expect(BUILT_IN_FUNCTIONS.min(5, 2, 8, 1)).toBe(1);
                expect(BUILT_IN_FUNCTIONS.min('3', '1', '2')).toBe(1);
                expect(BUILT_IN_FUNCTIONS.min(-5, -2, -10)).toBe(-10);
            });

            it('should find maximum value', () => {
                expect(BUILT_IN_FUNCTIONS.max(1, 2, 3)).toBe(3);
                expect(BUILT_IN_FUNCTIONS.max(5, 2, 8, 1)).toBe(8);
                expect(BUILT_IN_FUNCTIONS.max('3', '1', '2')).toBe(3);
                expect(BUILT_IN_FUNCTIONS.max(-5, -2, -10)).toBe(-2);
            });

            it('should calculate power', () => {
                expect(BUILT_IN_FUNCTIONS.pow(2, 3)).toBe(8);
                expect(BUILT_IN_FUNCTIONS.pow(5, 2)).toBe(25);
                expect(BUILT_IN_FUNCTIONS.pow('2', '4')).toBe(16);
                expect(BUILT_IN_FUNCTIONS.pow(9, 0.5)).toBe(3);
            });

            it('should generate random number', () => {
                const result = BUILT_IN_FUNCTIONS.random();
                expect(typeof result).toBe('number');
                expect(result).toBeGreaterThanOrEqual(0);
                expect(result).toBeLessThan(1);
            });

            it('should calculate sign', () => {
                expect(BUILT_IN_FUNCTIONS.sign(5)).toBe(1);
                expect(BUILT_IN_FUNCTIONS.sign(-5)).toBe(-1);
                expect(BUILT_IN_FUNCTIONS.sign(0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.sign('10')).toBe(1);
            });
        });

        describe('custom math functions', () => {
            it('should convert radians to degrees', () => {
                expect(BUILT_IN_FUNCTIONS.deg(Math.PI)).toBeCloseTo(180);
                expect(BUILT_IN_FUNCTIONS.deg(Math.PI / 2)).toBeCloseTo(90);
                expect(BUILT_IN_FUNCTIONS.deg('0')).toBe(0);
            });

            it('should convert degrees to radians', () => {
                expect(BUILT_IN_FUNCTIONS.rad(180)).toBeCloseTo(Math.PI);
                expect(BUILT_IN_FUNCTIONS.rad(90)).toBeCloseTo(Math.PI / 2);
                expect(BUILT_IN_FUNCTIONS.rad('0')).toBe(0);
            });

            it('should clamp values', () => {
                expect(BUILT_IN_FUNCTIONS.clamp(5, 0, 10)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.clamp(-5, 0, 10)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.clamp(15, 0, 10)).toBe(10);
                expect(BUILT_IN_FUNCTIONS.clamp('7', '2', '8')).toBe(7);
            });

            it('should interpolate linearly', () => {
                expect(BUILT_IN_FUNCTIONS.lerp(0, 10, 0.5)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.lerp(0, 10, 0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.lerp(0, 10, 1)).toBe(10);
                expect(BUILT_IN_FUNCTIONS.lerp('0', '20', '0.25')).toBe(5);
            });
        });
    });

    describe('Type conversion functions', () => {
        it('should convert to number', () => {
            expect(BUILT_IN_FUNCTIONS.number('42')).toBe(42);
            expect(BUILT_IN_FUNCTIONS.number('3.14')).toBe(3.14);
            expect(BUILT_IN_FUNCTIONS.number(true)).toBe(1);
            expect(BUILT_IN_FUNCTIONS.number(false)).toBe(0);
        });

        it('should convert to string', () => {
            expect(BUILT_IN_FUNCTIONS.string(42)).toBe('42');
            expect(BUILT_IN_FUNCTIONS.string(true)).toBe('true');
            expect(BUILT_IN_FUNCTIONS.string(null)).toBe('null');
        });

        it('should convert to boolean', () => {
            expect(BUILT_IN_FUNCTIONS.boolean(1)).toBe(true);
            expect(BUILT_IN_FUNCTIONS.boolean(0)).toBe(false);
            expect(BUILT_IN_FUNCTIONS.boolean('true')).toBe(true);
            expect(BUILT_IN_FUNCTIONS.boolean('')).toBe(false);
        });

        it('should convert to integer', () => {
            expect(BUILT_IN_FUNCTIONS.int(3.14)).toBe(3);
            expect(BUILT_IN_FUNCTIONS.int(3.99)).toBe(3);
            expect(BUILT_IN_FUNCTIONS.int('5.7')).toBe(5);
            expect(BUILT_IN_FUNCTIONS.int(-2.8)).toBe(-2);
        });

        it('should convert to float', () => {
            expect(BUILT_IN_FUNCTIONS.float('3.14')).toBe(3.14);
            expect(BUILT_IN_FUNCTIONS.float('42')).toBe(42);
            expect(BUILT_IN_FUNCTIONS.float(5)).toBe(5);
        });

        it('should convert to double', () => {
            expect(BUILT_IN_FUNCTIONS.double('3.14159')).toBe(3.14159);
            expect(BUILT_IN_FUNCTIONS.double('42')).toBe(42);
            expect(BUILT_IN_FUNCTIONS.double(5)).toBe(5);
        });
    });

    describe('String functions', () => {
        it('should get length of string', () => {
            expect(BUILT_IN_FUNCTIONS.length('hello')).toBe(5);
            expect(BUILT_IN_FUNCTIONS.length('')).toBe(0);
            expect(BUILT_IN_FUNCTIONS.length('test string')).toBe(11);
        });

        it('should get length of array', () => {
            expect(BUILT_IN_FUNCTIONS.length([1, 2, 3])).toBe(3);
            expect(BUILT_IN_FUNCTIONS.length([])).toBe(0);
            expect(BUILT_IN_FUNCTIONS.length(['a', 'b'])).toBe(2);
        });

        it('should throw error for invalid type in length', () => {
            expect(() => BUILT_IN_FUNCTIONS.length(42)).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.length(null)).toThrow(TypeMismatchError);
        });

        it('should convert to uppercase', () => {
            expect(BUILT_IN_FUNCTIONS.upper('hello')).toBe('HELLO');
            expect(BUILT_IN_FUNCTIONS.upper('Hello World')).toBe('HELLO WORLD');
            expect(BUILT_IN_FUNCTIONS.upper(123)).toBe('123');
        });

        it('should convert to lowercase', () => {
            expect(BUILT_IN_FUNCTIONS.lower('HELLO')).toBe('hello');
            expect(BUILT_IN_FUNCTIONS.lower('Hello World')).toBe('hello world');
            expect(BUILT_IN_FUNCTIONS.lower(123)).toBe('123');
        });

        it('should trim whitespace', () => {
            expect(BUILT_IN_FUNCTIONS.trim('  hello  ')).toBe('hello');
            expect(BUILT_IN_FUNCTIONS.trim('\t\ntest\r\n')).toBe('test');
            expect(BUILT_IN_FUNCTIONS.trim('no spaces')).toBe('no spaces');
        });
    });

    describe('Array functions', () => {
        it('should create array', () => {
            expect(BUILT_IN_FUNCTIONS.array(1, 2, 3)).toEqual([1, 2, 3]);
            expect(BUILT_IN_FUNCTIONS.array()).toEqual([]);
            expect(BUILT_IN_FUNCTIONS.array('a', 'b')).toEqual(['a', 'b']);
        });

        it('should get first element', () => {
            expect(BUILT_IN_FUNCTIONS.first([1, 2, 3])).toBe(1);
            expect(BUILT_IN_FUNCTIONS.first(['a', 'b'])).toBe('a');
            expect(BUILT_IN_FUNCTIONS.first([])).toBeNull();
        });

        it('should throw error for first with non-array', () => {
            expect(() => BUILT_IN_FUNCTIONS.first('string')).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.first(42)).toThrow(TypeMismatchError);
        });

        it('should push elements to array', () => {
            const arr = [1, 2];
            const result = BUILT_IN_FUNCTIONS.push(arr, 3, 4);
            expect(result).toEqual([1, 2, 3, 4]);
            expect(arr).toEqual([1, 2, 3, 4]); // modifies original
        });

        it('should throw error for push with non-array', () => {
            expect(() => BUILT_IN_FUNCTIONS.push('string', 1)).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.push(42, 1)).toThrow(TypeMismatchError);
        });

        it('should pop element from array', () => {
            const arr = [1, 2, 3];
            const result = BUILT_IN_FUNCTIONS.pop(arr);
            expect(result).toBe(3);
            expect(arr).toEqual([1, 2]); // modifies original
        });

        it('should return null when popping from empty array', () => {
            expect(BUILT_IN_FUNCTIONS.pop([])).toBeNull();
        });

        it('should throw error for pop with non-array', () => {
            expect(() => BUILT_IN_FUNCTIONS.pop('string')).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.pop(42)).toThrow(TypeMismatchError);
        });

        it('should get last element', () => {
            expect(BUILT_IN_FUNCTIONS.last([1, 2, 3])).toBe(3);
            expect(BUILT_IN_FUNCTIONS.last(['a', 'b'])).toBe('b');
            expect(BUILT_IN_FUNCTIONS.last([])).toBeNull();
        });

        it('should throw error for last with non-array', () => {
            expect(() => BUILT_IN_FUNCTIONS.last('string')).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.last(42)).toThrow(TypeMismatchError);
        });

        it('should calculate sum of array', () => {
            expect(BUILT_IN_FUNCTIONS.sum([1, 2, 3])).toBe(6);
            expect(BUILT_IN_FUNCTIONS.sum(['1', '2', '3'])).toBe(6);
            expect(BUILT_IN_FUNCTIONS.sum([])).toBe(0);
            expect(BUILT_IN_FUNCTIONS.sum([5])).toBe(5);
        });

        it('should throw error for sum with non-array', () => {
            expect(() => BUILT_IN_FUNCTIONS.sum('string')).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.sum(42)).toThrow(TypeMismatchError);
        });

        it('should calculate average of array', () => {
            expect(BUILT_IN_FUNCTIONS.avg([1, 2, 3])).toBe(2);
            expect(BUILT_IN_FUNCTIONS.avg([10, 20])).toBe(15);
            expect(BUILT_IN_FUNCTIONS.avg([])).toBeNull();
            expect(BUILT_IN_FUNCTIONS.avg([5])).toBe(5);
        });

        it('should throw error for avg with non-array', () => {
            expect(() => BUILT_IN_FUNCTIONS.avg('string')).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.avg(42)).toThrow(TypeMismatchError);
        });
    });

    describe('Date and time functions', () => {
        beforeEach(() => {
            const mockDate = new Date('2023-06-15T10:30:45.123Z');
            vi.setSystemTime(mockDate);
        });

        it('should get current timestamp', () => {
            const result = BUILT_IN_FUNCTIONS.now();
            expect(result).toBe(new Date('2023-06-15T10:30:45.123Z').getTime());
        });

        it('should get today timestamp', () => {
            const result = BUILT_IN_FUNCTIONS.today();
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            const expected = date.getTime();
            expect(result).toBe(expected);
        });

        it('should create date timestamp', () => {
            expect(BUILT_IN_FUNCTIONS.date()).toBe(new Date('2023-06-15T10:30:45.123Z').getTime());
            expect(BUILT_IN_FUNCTIONS.date(1000000)).toBe(1000000);
            expect(BUILT_IN_FUNCTIONS.date('1000000')).toBe(1000000);
        });

        it('should get year', () => {
            expect(BUILT_IN_FUNCTIONS.year()).toBe(2023);
            expect(BUILT_IN_FUNCTIONS.year(new Date('2020-05-15').getTime())).toBe(2020);
            expect(BUILT_IN_FUNCTIONS.year('1577836800000')).toBe(2020); // 2020-01-01
        });

        it('should get month', () => {
            expect(BUILT_IN_FUNCTIONS.month()).toBe(6); // June
            expect(BUILT_IN_FUNCTIONS.month(new Date('2020-01-15').getTime())).toBe(1);
            expect(BUILT_IN_FUNCTIONS.month('1577836800000')).toBe(1); // January
        });

        it('should get day', () => {
            expect(BUILT_IN_FUNCTIONS.day()).toBe(15);
            expect(BUILT_IN_FUNCTIONS.day(new Date('2020-01-01').getTime())).toBe(1);
            expect(BUILT_IN_FUNCTIONS.day('1577836800000')).toBe(1);
        });

        it('should get hour', () => {
            const date = new Date();
            date.setHours(10, 0, 0, 0);
            vi.setSystemTime(date);
            expect(BUILT_IN_FUNCTIONS.hour()).toBe(10);
            expect(BUILT_IN_FUNCTIONS.hour(new Date('2020-01-01T15:30:00').getTime())).toBe(15);
        });

        it('should get minute', () => {
            const date = new Date();
            date.setHours(0, 30, 45, 0);
            vi.setSystemTime(date);
            expect(BUILT_IN_FUNCTIONS.minute()).toBe(30);
            expect(BUILT_IN_FUNCTIONS.minute(new Date('2020-01-01T15:45:00').getTime())).toBe(45);
        });

        it('should get second', () => {
            const date = new Date();
            date.setHours(0, 0, 45, 0);
            vi.setSystemTime(date);
            expect(BUILT_IN_FUNCTIONS.second()).toBe(45);
            expect(BUILT_IN_FUNCTIONS.second(new Date('2020-01-01T15:45:30').getTime())).toBe(30);
        });

        it('should get weekday', () => {
            expect(BUILT_IN_FUNCTIONS.weekday()).toBe(4); // Thursday
            expect(BUILT_IN_FUNCTIONS.weekday(new Date('2020-01-01').getTime())).toBe(3); // Wednesday
        });

        it('should add days', () => {
            const timestamp = new Date('2023-06-15').getTime();
            const result = BUILT_IN_FUNCTIONS.addDays(timestamp, 5);
            const expected = new Date('2023-06-20').getTime();
            expect(result).toBe(expected);
        });

        it('should add months', () => {
            const timestamp = new Date('2023-06-15').getTime();
            const result = BUILT_IN_FUNCTIONS.addMonths(timestamp, 2);
            const expected = new Date('2023-08-15').getTime();
            expect(result).toBe(expected);
        });

        it('should add years', () => {
            const timestamp = new Date('2023-06-15').getTime();
            const result = BUILT_IN_FUNCTIONS.addYears(timestamp, 1);
            const expected = new Date('2024-06-15').getTime();
            expect(result).toBe(expected);
        });

        it('should add hours', () => {
            const timestamp = new Date('2023-06-15T10:00:00').getTime();
            const result = BUILT_IN_FUNCTIONS.addHours(timestamp, 3);
            const expected = new Date('2023-06-15T13:00:00').getTime();
            expect(result).toBe(expected);
        });

        it('should add minutes', () => {
            const timestamp = new Date('2023-06-15T10:30:00').getTime();
            const result = BUILT_IN_FUNCTIONS.addMinutes(timestamp, 15);
            const expected = new Date('2023-06-15T10:45:00').getTime();
            expect(result).toBe(expected);
        });

        it('should calculate days between dates', () => {
            const date1 = new Date('2023-06-15').getTime();
            const date2 = new Date('2023-06-20').getTime();
            expect(BUILT_IN_FUNCTIONS.daysBetween(date1, date2)).toBe(5);
            expect(BUILT_IN_FUNCTIONS.daysBetween(date2, date1)).toBe(5);
            expect(BUILT_IN_FUNCTIONS.daysBetween('1687392000000', '1687824000000')).toBe(5);
        });

        it('should check leap year', () => {
            expect(BUILT_IN_FUNCTIONS.isLeapYear(2020)).toBe(true);
            expect(BUILT_IN_FUNCTIONS.isLeapYear(2021)).toBe(false);
            expect(BUILT_IN_FUNCTIONS.isLeapYear(2000)).toBe(true);
            expect(BUILT_IN_FUNCTIONS.isLeapYear(1900)).toBe(false);
            expect(BUILT_IN_FUNCTIONS.isLeapYear('2024')).toBe(true);
        });

        it('should get unix timestamp', () => {
            const result = BUILT_IN_FUNCTIONS.timestamp();
            const expected = Math.floor(new Date('2023-06-15T10:30:45.123Z').getTime() / 1000);
            expect(result).toBe(expected);
        });
    });

    describe('Error handling', () => {
        it('should handle type conversion errors gracefully', () => {
            // These should not throw as conversion functions handle edge cases
            expect(typeof BUILT_IN_FUNCTIONS.number(null)).toBe('number');
            expect(typeof BUILT_IN_FUNCTIONS.boolean({})).toBe('boolean');
        });

        it('should handle array function errors', () => {
            expect(() => BUILT_IN_FUNCTIONS.first(42)).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.push(42, 1)).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.sum('not array')).toThrow(TypeMismatchError);
        });

        it('should handle string function errors', () => {
            expect(() => BUILT_IN_FUNCTIONS.length(42)).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.length(null)).toThrow(TypeMismatchError);
        });
    });

    describe('Edge cases', () => {
        it('should handle empty arrays', () => {
            expect(BUILT_IN_FUNCTIONS.first([])).toBeNull();
            expect(BUILT_IN_FUNCTIONS.last([])).toBeNull();
            expect(BUILT_IN_FUNCTIONS.sum([])).toBe(0);
            expect(BUILT_IN_FUNCTIONS.avg([])).toBeNull();
            expect(BUILT_IN_FUNCTIONS.pop([])).toBeNull();
        });

        it('should handle single element arrays', () => {
            expect(BUILT_IN_FUNCTIONS.first([42])).toBe(42);
            expect(BUILT_IN_FUNCTIONS.last([42])).toBe(42);
            expect(BUILT_IN_FUNCTIONS.sum([42])).toBe(42);
            expect(BUILT_IN_FUNCTIONS.avg([42])).toBe(42);
        });

        it('should handle special number values', () => {
            expect(BUILT_IN_FUNCTIONS.abs(Infinity)).toBe(Infinity);
            expect(BUILT_IN_FUNCTIONS.abs(-Infinity)).toBe(Infinity);
            expect(isNaN(BUILT_IN_FUNCTIONS.sqrt(-1) as number)).toBe(true);
        });

        it('should handle string conversions', () => {
            expect(BUILT_IN_FUNCTIONS.upper('')).toBe('');
            expect(BUILT_IN_FUNCTIONS.lower('')).toBe('');
            expect(BUILT_IN_FUNCTIONS.trim('')).toBe('');
        });
    });
});
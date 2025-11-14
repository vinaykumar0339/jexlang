import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BUILT_IN_FUNCTIONS } from './builtin';
import { TypeMismatchError } from '../errors';
import { JexEvaluator } from '../evaluator';

describe('BUILT_IN_FUNCTIONS', () => {
    const evaluatorContext = { jexEvaluator: new JexEvaluator() };

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    describe('Math functions', () => {
        describe('basic math functions', () => {
            it('should calculate absolute value', () => {
                expect(BUILT_IN_FUNCTIONS.abs(evaluatorContext, -5)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.abs(evaluatorContext, 5)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.abs(evaluatorContext, -3.14)).toBe(3.14);
                expect(BUILT_IN_FUNCTIONS.abs(evaluatorContext, '5')).toBe(5);
            });

            it('should calculate ceiling', () => {
                expect(BUILT_IN_FUNCTIONS.ceil(evaluatorContext, 4.2)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.ceil(evaluatorContext, -4.2)).toBe(-4);
                expect(BUILT_IN_FUNCTIONS.ceil(evaluatorContext, 5)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.ceil(evaluatorContext, '4.7')).toBe(5);
            });

            it('should calculate floor', () => {
                expect(BUILT_IN_FUNCTIONS.floor(evaluatorContext, 4.7)).toBe(4);
                expect(BUILT_IN_FUNCTIONS.floor(evaluatorContext, -4.7)).toBe(-5);
                expect(BUILT_IN_FUNCTIONS.floor(evaluatorContext, 5)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.floor(evaluatorContext, '4.2')).toBe(4);
            });

            it('should round numbers', () => {
                expect(BUILT_IN_FUNCTIONS.round(evaluatorContext, 4.4)).toBe(4);
                expect(BUILT_IN_FUNCTIONS.round(evaluatorContext, 4.5)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.round(evaluatorContext, -4.5)).toBe(-4);
                expect(BUILT_IN_FUNCTIONS.round(evaluatorContext, '4.6')).toBe(5);
            });

            it('should truncate numbers', () => {
                expect(BUILT_IN_FUNCTIONS.trunc(evaluatorContext, 4.9)).toBe(4);
                expect(BUILT_IN_FUNCTIONS.trunc(evaluatorContext, -4.9)).toBe(-4);
                expect(BUILT_IN_FUNCTIONS.trunc(evaluatorContext, 5)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.trunc(evaluatorContext, '4.7')).toBe(4);
            });
        });

        describe('trigonometric functions', () => {
            it('should calculate sine', () => {
                expect(BUILT_IN_FUNCTIONS.sin(evaluatorContext, 0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.sin(evaluatorContext, Math.PI / 2)).toBeCloseTo(1);
                expect(BUILT_IN_FUNCTIONS.sin(evaluatorContext, '0')).toBe(0);
            });

            it('should calculate cosine', () => {
                expect(BUILT_IN_FUNCTIONS.cos(evaluatorContext, 0)).toBe(1);
                expect(BUILT_IN_FUNCTIONS.cos(evaluatorContext, Math.PI)).toBeCloseTo(-1);
                expect(BUILT_IN_FUNCTIONS.cos(evaluatorContext, '0')).toBe(1);
            });

            it('should calculate tangent', () => {
                expect(BUILT_IN_FUNCTIONS.tan(evaluatorContext, 0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.tan(evaluatorContext, Math.PI / 4)).toBeCloseTo(1);
                expect(BUILT_IN_FUNCTIONS.tan(evaluatorContext, '0')).toBe(0);
            });

            it('should calculate arcsine', () => {
                expect(BUILT_IN_FUNCTIONS.asin(evaluatorContext, 0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.asin(evaluatorContext, 1)).toBeCloseTo(Math.PI / 2);
                expect(BUILT_IN_FUNCTIONS.asin(evaluatorContext, '0')).toBe(0);
            });

            it('should calculate arccosine', () => {
                expect(BUILT_IN_FUNCTIONS.acos(evaluatorContext, 1)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.acos(evaluatorContext, 0)).toBeCloseTo(Math.PI / 2);
                expect(BUILT_IN_FUNCTIONS.acos(evaluatorContext, '1')).toBe(0);
            });

            it('should calculate arctangent', () => {
                expect(BUILT_IN_FUNCTIONS.atan(evaluatorContext, 0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.atan(evaluatorContext, 1)).toBeCloseTo(Math.PI / 4);
                expect(BUILT_IN_FUNCTIONS.atan(evaluatorContext, '0')).toBe(0);
            });

            it('should calculate atan2', () => {
                expect(BUILT_IN_FUNCTIONS.atan2(evaluatorContext, 0, 1)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.atan2(evaluatorContext, 1, 1)).toBeCloseTo(Math.PI / 4);
                expect(BUILT_IN_FUNCTIONS.atan2(evaluatorContext, '1', '1')).toBeCloseTo(Math.PI / 4);
            });
        });

        describe('exponential and logarithmic functions', () => {
            it('should calculate exponential', () => {
                expect(BUILT_IN_FUNCTIONS.exp(evaluatorContext, 0)).toBe(1);
                expect(BUILT_IN_FUNCTIONS.exp(evaluatorContext, 1)).toBeCloseTo(Math.E);
                expect(BUILT_IN_FUNCTIONS.exp(evaluatorContext, '0')).toBe(1);
            });

            it('should calculate natural logarithm', () => {
                expect(BUILT_IN_FUNCTIONS.log(evaluatorContext, 1)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.log(evaluatorContext, Math.E)).toBeCloseTo(1);
                expect(BUILT_IN_FUNCTIONS.log(evaluatorContext, '1')).toBe(0);
            });

            it('should calculate base 10 logarithm', () => {
                expect(BUILT_IN_FUNCTIONS.log10(evaluatorContext, 1)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.log10(evaluatorContext, 10)).toBe(1);
                expect(BUILT_IN_FUNCTIONS.log10(evaluatorContext, '100')).toBe(2);
            });

            it('should calculate base 2 logarithm', () => {
                expect(BUILT_IN_FUNCTIONS.log2(evaluatorContext, 1)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.log2(evaluatorContext, 2)).toBe(1);
                expect(BUILT_IN_FUNCTIONS.log2(evaluatorContext, '8')).toBe(3);
            });

            it('should calculate square root', () => {
                expect(BUILT_IN_FUNCTIONS.sqrt(evaluatorContext, 4)).toBe(2);
                expect(BUILT_IN_FUNCTIONS.sqrt(evaluatorContext, 9)).toBe(3);
                expect(BUILT_IN_FUNCTIONS.sqrt(evaluatorContext, '16')).toBe(4);
            });

            it('should calculate cube root', () => {
                expect(BUILT_IN_FUNCTIONS.cbrt(evaluatorContext, 8)).toBe(2);
                expect(BUILT_IN_FUNCTIONS.cbrt(evaluatorContext, 27)).toBe(3);
                expect(BUILT_IN_FUNCTIONS.cbrt(evaluatorContext, '64')).toBe(4);
            });
        });

        describe('hyperbolic functions', () => {
            it('should calculate hyperbolic sine', () => {
                expect(BUILT_IN_FUNCTIONS.sinh(evaluatorContext, 0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.sinh(evaluatorContext, '0')).toBe(0);
            });

            it('should calculate hyperbolic cosine', () => {
                expect(BUILT_IN_FUNCTIONS.cosh(evaluatorContext, 0)).toBe(1);
                expect(BUILT_IN_FUNCTIONS.cosh(evaluatorContext, '0')).toBe(1);
            });

            it('should calculate hyperbolic tangent', () => {
                expect(BUILT_IN_FUNCTIONS.tanh(evaluatorContext, 0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.tanh(evaluatorContext, '0')).toBe(0);
            });

            it('should calculate inverse hyperbolic sine', () => {
                expect(BUILT_IN_FUNCTIONS.asinh(evaluatorContext, 0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.asinh(evaluatorContext, '0')).toBe(0);
            });

            it('should calculate inverse hyperbolic cosine', () => {
                expect(BUILT_IN_FUNCTIONS.acosh(evaluatorContext, 1)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.acosh(evaluatorContext, '1')).toBe(0);
            });

            it('should calculate inverse hyperbolic tangent', () => {
                expect(BUILT_IN_FUNCTIONS.atanh(evaluatorContext, 0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.atanh(evaluatorContext, '0')).toBe(0);
            });
        });

        describe('utility functions', () => {
            it('should find minimum value', () => {
                expect(BUILT_IN_FUNCTIONS.min(evaluatorContext, 1, 2, 3)).toBe(1);
                expect(BUILT_IN_FUNCTIONS.min(evaluatorContext, 5, 2, 8, 1)).toBe(1);
                expect(BUILT_IN_FUNCTIONS.min(evaluatorContext, '3', '1', '2')).toBe(1);
                expect(BUILT_IN_FUNCTIONS.min(evaluatorContext, -5, -2, -10)).toBe(-10);
            });

            it('should find maximum value', () => {
                expect(BUILT_IN_FUNCTIONS.max(evaluatorContext, 1, 2, 3)).toBe(3);
                expect(BUILT_IN_FUNCTIONS.max(evaluatorContext, 5, 2, 8, 1)).toBe(8);
                expect(BUILT_IN_FUNCTIONS.max(evaluatorContext, '3', '1', '2')).toBe(3);
                expect(BUILT_IN_FUNCTIONS.max(evaluatorContext, -5, -2, -10)).toBe(-2);
            });

            it('should calculate power', () => {
                expect(BUILT_IN_FUNCTIONS.pow(evaluatorContext, 2, 3)).toBe(8);
                expect(BUILT_IN_FUNCTIONS.pow(evaluatorContext, 5, 2)).toBe(25);
                expect(BUILT_IN_FUNCTIONS.pow(evaluatorContext, '2', '4')).toBe(16);
                expect(BUILT_IN_FUNCTIONS.pow(evaluatorContext, 9, 0.5)).toBe(3);
            });

            it('should generate random number', () => {
                const result = BUILT_IN_FUNCTIONS.random(evaluatorContext);
                expect(typeof result).toBe('number');
                expect(result).toBeGreaterThanOrEqual(0);
                expect(result).toBeLessThan(1);
            });

            it('should calculate sign', () => {
                expect(BUILT_IN_FUNCTIONS.sign(evaluatorContext, 5)).toBe(1);
                expect(BUILT_IN_FUNCTIONS.sign(evaluatorContext, -5)).toBe(-1);
                expect(BUILT_IN_FUNCTIONS.sign(evaluatorContext, 0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.sign(evaluatorContext, '10')).toBe(1);
            });
        });

        describe('custom math functions', () => {
            it('should convert radians to degrees', () => {
                expect(BUILT_IN_FUNCTIONS.deg(evaluatorContext, Math.PI)).toBeCloseTo(180);
                expect(BUILT_IN_FUNCTIONS.deg(evaluatorContext, Math.PI / 2)).toBeCloseTo(90);
                expect(BUILT_IN_FUNCTIONS.deg(evaluatorContext, '0')).toBe(0);
            });

            it('should convert degrees to radians', () => {
                expect(BUILT_IN_FUNCTIONS.rad(evaluatorContext, 180)).toBeCloseTo(Math.PI);
                expect(BUILT_IN_FUNCTIONS.rad(evaluatorContext, 90)).toBeCloseTo(Math.PI / 2);
                expect(BUILT_IN_FUNCTIONS.rad(evaluatorContext, '0')).toBe(0);
            });

            it('should clamp values', () => {
                expect(BUILT_IN_FUNCTIONS.clamp(evaluatorContext, 5, 0, 10)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.clamp(evaluatorContext, -5, 0, 10)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.clamp(evaluatorContext, 15, 0, 10)).toBe(10);
                expect(BUILT_IN_FUNCTIONS.clamp(evaluatorContext, '7', '2', '8')).toBe(7);
            });

            it('should interpolate linearly', () => {
                expect(BUILT_IN_FUNCTIONS.lerp(evaluatorContext, 0, 10, 0.5)).toBe(5);
                expect(BUILT_IN_FUNCTIONS.lerp(evaluatorContext, 0, 10, 0)).toBe(0);
                expect(BUILT_IN_FUNCTIONS.lerp(evaluatorContext, 0, 10, 1)).toBe(10);
                expect(BUILT_IN_FUNCTIONS.lerp(evaluatorContext, '0', '20', '0.25')).toBe(5);
            });
        });
    });

    describe('Type conversion functions', () => {
        it('should convert to number', () => {
            expect(BUILT_IN_FUNCTIONS.number(evaluatorContext, '42')).toBe(42);
            expect(BUILT_IN_FUNCTIONS.number(evaluatorContext, '3.14')).toBe(3.14);
            expect(BUILT_IN_FUNCTIONS.number(evaluatorContext, true)).toBe(1);
            expect(BUILT_IN_FUNCTIONS.number(evaluatorContext, false)).toBe(0);
        });

        it('should convert to string', () => {
            expect(BUILT_IN_FUNCTIONS.string(evaluatorContext, 42)).toBe('42');
            expect(BUILT_IN_FUNCTIONS.string(evaluatorContext, true)).toBe('true');
            expect(BUILT_IN_FUNCTIONS.string(evaluatorContext, null)).toBe('null');
        });

        it('should convert to boolean', () => {
            expect(BUILT_IN_FUNCTIONS.boolean(evaluatorContext, 1)).toBe(true);
            expect(BUILT_IN_FUNCTIONS.boolean(evaluatorContext, 0)).toBe(false);
            expect(BUILT_IN_FUNCTIONS.boolean(evaluatorContext, 'true')).toBe(true);
            expect(BUILT_IN_FUNCTIONS.boolean(evaluatorContext, '')).toBe(false);
        });

        it('should convert to integer', () => {
            expect(BUILT_IN_FUNCTIONS.int(evaluatorContext, 3.14)).toBe(3);
            expect(BUILT_IN_FUNCTIONS.int(evaluatorContext, 3.99)).toBe(3);
            expect(BUILT_IN_FUNCTIONS.int(evaluatorContext, '5.7')).toBe(5);
            expect(BUILT_IN_FUNCTIONS.int(evaluatorContext, -2.8)).toBe(-2);
        });

        it('should convert to float', () => {
            expect(BUILT_IN_FUNCTIONS.float(evaluatorContext, '3.14')).toBe(3.14);
            expect(BUILT_IN_FUNCTIONS.float(evaluatorContext, '42')).toBe(42);
            expect(BUILT_IN_FUNCTIONS.float(evaluatorContext, 5)).toBe(5);
        });

        it('should convert to double', () => {
            expect(BUILT_IN_FUNCTIONS.double(evaluatorContext, '3.14159')).toBe(3.14159);
            expect(BUILT_IN_FUNCTIONS.double(evaluatorContext, '42')).toBe(42);
            expect(BUILT_IN_FUNCTIONS.double(evaluatorContext, 5)).toBe(5);
        });
    });

    describe('String functions', () => {
        it('should get length of string', () => {
            expect(BUILT_IN_FUNCTIONS.length(evaluatorContext, 'hello')).toBe(5);
            expect(BUILT_IN_FUNCTIONS.length(evaluatorContext, '')).toBe(0);
            expect(BUILT_IN_FUNCTIONS.length(evaluatorContext, 'test string')).toBe(11);
        });

        it('should get length of array', () => {
            expect(BUILT_IN_FUNCTIONS.length(evaluatorContext, [1, 2, 3])).toBe(3);
            expect(BUILT_IN_FUNCTIONS.length(evaluatorContext, [])).toBe(0);
            expect(BUILT_IN_FUNCTIONS.length(evaluatorContext, ['a', 'b'])).toBe(2);
        });

        it('should throw error for invalid type in length', () => {
            expect(() => BUILT_IN_FUNCTIONS.length(evaluatorContext, 42)).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.length(evaluatorContext, null)).toThrow(TypeMismatchError);
        });

        it('should convert to uppercase', () => {
            expect(BUILT_IN_FUNCTIONS.upper(evaluatorContext, 'hello')).toBe('HELLO');
            expect(BUILT_IN_FUNCTIONS.upper(evaluatorContext, 'Hello World')).toBe('HELLO WORLD');
            expect(BUILT_IN_FUNCTIONS.upper(evaluatorContext, 123)).toBe('123');
        });

        it('should convert to lowercase', () => {
            expect(BUILT_IN_FUNCTIONS.lower(evaluatorContext, 'HELLO')).toBe('hello');
            expect(BUILT_IN_FUNCTIONS.lower(evaluatorContext, 'Hello World')).toBe('hello world');
            expect(BUILT_IN_FUNCTIONS.lower(evaluatorContext, 123)).toBe('123');
        });

        it('should trim whitespace', () => {
            expect(BUILT_IN_FUNCTIONS.trim(evaluatorContext, '  hello  ')).toBe('hello');
            expect(BUILT_IN_FUNCTIONS.trim(evaluatorContext, '\t\ntest\r\n')).toBe('test');
            expect(BUILT_IN_FUNCTIONS.trim(evaluatorContext, 'no spaces')).toBe('no spaces');
        });
    });

    describe('Array functions', () => {
        it('should create array', () => {
            expect(BUILT_IN_FUNCTIONS.array(evaluatorContext, 1, 2, 3)).toEqual([1, 2, 3]);
            expect(BUILT_IN_FUNCTIONS.array(evaluatorContext)).toEqual([]);
            expect(BUILT_IN_FUNCTIONS.array(evaluatorContext, 'a', 'b')).toEqual(['a', 'b']);
        });

        it('should get first element', () => {
            expect(BUILT_IN_FUNCTIONS.first(evaluatorContext, [1, 2, 3])).toBe(1);
            expect(BUILT_IN_FUNCTIONS.first(evaluatorContext, ['a', 'b'])).toBe('a');
            expect(BUILT_IN_FUNCTIONS.first(evaluatorContext, [])).toBeNull();
        });

        it('should throw error for first with non-array', () => {
            expect(() => BUILT_IN_FUNCTIONS.first(evaluatorContext, 'string')).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.first(evaluatorContext, 42)).toThrow(TypeMismatchError);
        });

        it('should push elements to array', () => {
            const arr = [1, 2];
            const result = BUILT_IN_FUNCTIONS.push(evaluatorContext, arr, 3, 4);
            expect(result).toEqual([1, 2, 3, 4]);
            expect(arr).toEqual([1, 2, 3, 4]); // modifies original
        });

        it('should throw error for push with non-array', () => {
            expect(() => BUILT_IN_FUNCTIONS.push(evaluatorContext, 'string', 1)).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.push(evaluatorContext, 42, 1)).toThrow(TypeMismatchError);
        });

        it('should pop element from array', () => {
            const arr = [1, 2, 3];
            const result = BUILT_IN_FUNCTIONS.pop(evaluatorContext, arr);
            expect(result).toBe(3);
            expect(arr).toEqual([1, 2]); // modifies original
        });

        it('should return null when popping from empty array', () => {
            expect(BUILT_IN_FUNCTIONS.pop(evaluatorContext, [])).toBeNull();
        });

        it('should throw error for pop with non-array', () => {
            expect(() => BUILT_IN_FUNCTIONS.pop(evaluatorContext, 'string')).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.pop(evaluatorContext, 42)).toThrow(TypeMismatchError);
        });

        it('should get last element', () => {
            expect(BUILT_IN_FUNCTIONS.last(evaluatorContext, [1, 2, 3])).toBe(3);
            expect(BUILT_IN_FUNCTIONS.last(evaluatorContext, ['a', 'b'])).toBe('b');
            expect(BUILT_IN_FUNCTIONS.last(evaluatorContext, [])).toBeNull();
        });

        it('should throw error for last with non-array', () => {
            expect(() => BUILT_IN_FUNCTIONS.last(evaluatorContext, 'string')).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.last(evaluatorContext, 42)).toThrow(TypeMismatchError);
        });

        it('should calculate sum of array', () => {
            expect(BUILT_IN_FUNCTIONS.sum(evaluatorContext, [1, 2, 3])).toBe(6);
            expect(BUILT_IN_FUNCTIONS.sum(evaluatorContext, ['1', '2', '3'])).toBe(6);
            expect(BUILT_IN_FUNCTIONS.sum(evaluatorContext, [])).toBe(0);
            expect(BUILT_IN_FUNCTIONS.sum(evaluatorContext, [5])).toBe(5);
        });

        it('should throw error for sum with non-array', () => {
            expect(() => BUILT_IN_FUNCTIONS.sum(evaluatorContext, 'string')).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.sum(evaluatorContext, 42)).toThrow(TypeMismatchError);
        });

        it('should calculate average of array', () => {
            expect(BUILT_IN_FUNCTIONS.avg(evaluatorContext, [1, 2, 3])).toBe(2);
            expect(BUILT_IN_FUNCTIONS.avg(evaluatorContext, [10, 20])).toBe(15);
            expect(BUILT_IN_FUNCTIONS.avg(evaluatorContext, [])).toBeNull();
            expect(BUILT_IN_FUNCTIONS.avg(evaluatorContext, [5])).toBe(5);
        });

        it('should throw error for avg with non-array', () => {
            expect(() => BUILT_IN_FUNCTIONS.avg(evaluatorContext, 'string')).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.avg(evaluatorContext, 42)).toThrow(TypeMismatchError);
        });
    });

    describe('Date and time functions', () => {
        beforeEach(() => {
            const mockDate = new Date('2023-06-15T10:30:45.123Z');
            vi.setSystemTime(mockDate);
        });

        it('should get current timestamp', () => {
            const result = BUILT_IN_FUNCTIONS.now(evaluatorContext);
            expect(result).toBe(new Date('2023-06-15T10:30:45.123Z').getTime());
        });

        it('should get today timestamp', () => {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            vi.setSystemTime(date);
            const result = BUILT_IN_FUNCTIONS.today(evaluatorContext);
            expect(result).toBe(date.getTime());
        });

        it('should create date timestamp', () => {
            expect(BUILT_IN_FUNCTIONS.date(evaluatorContext)).toBe(new Date('2023-06-15T10:30:45.123Z').getTime());
            expect(BUILT_IN_FUNCTIONS.date(evaluatorContext, 1000000)).toBe(1000000);
            expect(BUILT_IN_FUNCTIONS.date(evaluatorContext, '1000000')).toBe(1000000);
        });

        it('should get year', () => {
            expect(BUILT_IN_FUNCTIONS.year(evaluatorContext)).toBe(2023);
            expect(BUILT_IN_FUNCTIONS.year(evaluatorContext, new Date('2020-05-15').getTime())).toBe(2020);
            expect(BUILT_IN_FUNCTIONS.year(evaluatorContext, '1577836800000')).toBe(2020); // 2020-01-01
        });

        it('should get month', () => {
            expect(BUILT_IN_FUNCTIONS.month(evaluatorContext)).toBe(6); // June
            expect(BUILT_IN_FUNCTIONS.month(evaluatorContext, new Date('2020-01-15').getTime())).toBe(1);
            expect(BUILT_IN_FUNCTIONS.month(evaluatorContext, '1577836800000')).toBe(1); // January
        });

        it('should get day', () => {
            expect(BUILT_IN_FUNCTIONS.day(evaluatorContext)).toBe(15);
            expect(BUILT_IN_FUNCTIONS.day(evaluatorContext, new Date('2020-01-01').getTime())).toBe(1);
            expect(BUILT_IN_FUNCTIONS.day(evaluatorContext, '1577836800000')).toBe(1);
        });

        it('should get hour', () => {
            const date = new Date();
            date.setHours(10, 0, 0, 0);
            vi.setSystemTime(date);
            expect(BUILT_IN_FUNCTIONS.hour(evaluatorContext)).toBe(10);
            expect(BUILT_IN_FUNCTIONS.hour(evaluatorContext, new Date('2020-01-01T15:30:00').getTime())).toBe(15);
        });

        it('should get minute', () => {
            const date = new Date();
            date.setHours(0, 30, 45, 0);
            vi.setSystemTime(date);
            expect(BUILT_IN_FUNCTIONS.minute(evaluatorContext)).toBe(30);
            expect(BUILT_IN_FUNCTIONS.minute(evaluatorContext, new Date('2020-01-01T15:45:00').getTime())).toBe(45);
        });

        it('should get second', () => {
            const date = new Date();
            date.setHours(0, 0, 45, 0);
            vi.setSystemTime(date);
            expect(BUILT_IN_FUNCTIONS.second(evaluatorContext)).toBe(45);
            expect(BUILT_IN_FUNCTIONS.second(evaluatorContext, new Date('2020-01-01T15:45:30').getTime())).toBe(30);
        });

        it('should get weekday', () => {
            expect(BUILT_IN_FUNCTIONS.weekday(evaluatorContext)).toBe(4); // Thursday
            expect(BUILT_IN_FUNCTIONS.weekday(evaluatorContext, new Date('2020-01-01').getTime())).toBe(3); // Wednesday
        });

        it('should add days', () => {
            const timestamp = new Date('2023-06-15').getTime();
            const result = BUILT_IN_FUNCTIONS.addDays(evaluatorContext, timestamp, 5);
            const expected = new Date('2023-06-20').getTime();
            expect(result).toBe(expected);
        });

        it('should add months', () => {
            const timestamp = new Date('2023-06-15').getTime();
            const result = BUILT_IN_FUNCTIONS.addMonths(evaluatorContext, timestamp, 2);
            const expected = new Date('2023-08-15').getTime();
            expect(result).toBe(expected);
        });

        it('should add years', () => {
            const timestamp = new Date('2023-06-15').getTime();
            const result = BUILT_IN_FUNCTIONS.addYears(evaluatorContext, timestamp, 1);
            const expected = new Date('2024-06-15').getTime();
            expect(result).toBe(expected);
        });

        it('should add hours', () => {
            const timestamp = new Date('2023-06-15T10:00:00').getTime();
            const result = BUILT_IN_FUNCTIONS.addHours(evaluatorContext, timestamp, 3);
            const expected = new Date('2023-06-15T13:00:00').getTime();
            expect(result).toBe(expected);
        });

        it('should add minutes', () => {
            const timestamp = new Date('2023-06-15T10:30:00').getTime();
            const result = BUILT_IN_FUNCTIONS.addMinutes(evaluatorContext, timestamp, 15);
            const expected = new Date('2023-06-15T10:45:00').getTime();
            expect(result).toBe(expected);
        });

        it('should calculate days between dates', () => {
            const date1 = new Date('2023-06-15').getTime();
            const date2 = new Date('2023-06-20').getTime();
            expect(BUILT_IN_FUNCTIONS.daysBetween(evaluatorContext, date1, date2)).toBe(5);
            expect(BUILT_IN_FUNCTIONS.daysBetween(evaluatorContext, date2, date1)).toBe(5);
            expect(BUILT_IN_FUNCTIONS.daysBetween(evaluatorContext, '1687392000000', '1687824000000')).toBe(5);
        });

        it('should check leap year', () => {
            expect(BUILT_IN_FUNCTIONS.isLeapYear(evaluatorContext, 2020)).toBe(true);
            expect(BUILT_IN_FUNCTIONS.isLeapYear(evaluatorContext, 2021)).toBe(false);
            expect(BUILT_IN_FUNCTIONS.isLeapYear(evaluatorContext, 2000)).toBe(true);
            expect(BUILT_IN_FUNCTIONS.isLeapYear(evaluatorContext, 1900)).toBe(false);
            expect(BUILT_IN_FUNCTIONS.isLeapYear(evaluatorContext, '2024')).toBe(true);
        });

        it('should get unix timestamp', () => {
            const result = BUILT_IN_FUNCTIONS.timestamp(evaluatorContext);
            const expected = Math.floor(new Date('2023-06-15T10:30:45.123Z').getTime() / 1000);
            expect(result).toBe(expected);
        });
    });

    describe('Error handling', () => {
        it('should handle type conversion errors gracefully', () => {
            // These should not throw as conversion functions handle edge cases
            expect(typeof BUILT_IN_FUNCTIONS.number(evaluatorContext, null)).toBe('number');
            expect(typeof BUILT_IN_FUNCTIONS.boolean(evaluatorContext, {})).toBe('boolean');
        });

        it('should handle array function errors', () => {
            expect(() => BUILT_IN_FUNCTIONS.first(evaluatorContext, 42)).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.push(evaluatorContext, 42, 1)).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.sum(evaluatorContext, 'not array')).toThrow(TypeMismatchError);
        });

        it('should handle string function errors', () => {
            expect(() => BUILT_IN_FUNCTIONS.length(evaluatorContext, 42)).toThrow(TypeMismatchError);
            expect(() => BUILT_IN_FUNCTIONS.length(evaluatorContext, null)).toThrow(TypeMismatchError);
        });
    });

    describe('Edge cases', () => {
        it('should handle empty arrays', () => {
            expect(BUILT_IN_FUNCTIONS.first(evaluatorContext, [])).toBeNull();
            expect(BUILT_IN_FUNCTIONS.last(evaluatorContext, [])).toBeNull();
            expect(BUILT_IN_FUNCTIONS.sum(evaluatorContext, [])).toBe(0);
            expect(BUILT_IN_FUNCTIONS.avg(evaluatorContext, [])).toBeNull();
            expect(BUILT_IN_FUNCTIONS.pop(evaluatorContext, [])).toBeNull();
        });

        it('should handle single element arrays', () => {
            expect(BUILT_IN_FUNCTIONS.first(evaluatorContext, [42])).toBe(42);
            expect(BUILT_IN_FUNCTIONS.last(evaluatorContext, [42])).toBe(42);
            expect(BUILT_IN_FUNCTIONS.sum(evaluatorContext, [42])).toBe(42);
            expect(BUILT_IN_FUNCTIONS.avg(evaluatorContext, [42])).toBe(42);
        });

        it('should handle special number values', () => {
            expect(BUILT_IN_FUNCTIONS.abs(evaluatorContext, Infinity)).toBe(Infinity);
            expect(BUILT_IN_FUNCTIONS.abs(evaluatorContext, -Infinity)).toBe(Infinity);
            expect(isNaN(BUILT_IN_FUNCTIONS.sqrt(evaluatorContext, -1) as number)).toBe(true);
        });

        it('should handle string conversions', () => {
            expect(BUILT_IN_FUNCTIONS.upper(evaluatorContext, '')).toBe('');
            expect(BUILT_IN_FUNCTIONS.lower(evaluatorContext, '')).toBe('');
            expect(BUILT_IN_FUNCTIONS.trim(evaluatorContext, '')).toBe('');
        });
    });
});
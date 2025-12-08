import type { FuncImpl, JexValue } from "../../types";
import { getJexValueType, toBoolean, toFloat, toInt, toNumber, toString } from "../../utils";
import { TypeMismatchError } from "../errors";

// Built-in functions
export const BUILT_IN_FUNCTIONS: Record<string, FuncImpl> = {
    // Math functions that work with numbers
    'abs': (_, x: JexValue) => Math.abs(toNumber(x)),
    'ceil': (_, x: JexValue) => Math.ceil(toNumber(x)),
    'floor': (_, x: JexValue) => Math.floor(toNumber(x)),
    'round': (_, x: JexValue) => Math.round(toNumber(x)),
    'trunc': (_, x: JexValue) => Math.trunc(toNumber(x)),
    
    // Trigonometric functions
    'sin': (_, x: JexValue) => Math.sin(toNumber(x)),
    'cos': (_, x: JexValue) => Math.cos(toNumber(x)),
    'tan': (_, x: JexValue) => Math.tan(toNumber(x)),
    'asin': (_, x: JexValue) => Math.asin(toNumber(x)),
    'acos': (_, x: JexValue) => Math.acos(toNumber(x)),
    'atan': (_, x: JexValue) => Math.atan(toNumber(x)),
    'atan2': (_, y: JexValue, x: JexValue) => Math.atan2(toNumber(y), toNumber(x)),
    
    // Exponential and logarithmic functions
    'exp': (_, x: JexValue) => Math.exp(toNumber(x)),
    'log': (_, x: JexValue) => Math.log(toNumber(x)),
    'log10': (_, x: JexValue) => Math.log10(toNumber(x)),
    'log2': (_, x: JexValue) => Math.log2(toNumber(x)),
    'sqrt': (_, x: JexValue) => Math.sqrt(toNumber(x)),
    'cbrt': (_, x: JexValue) => Math.cbrt(toNumber(x)),
    
    // Hyperbolic functions
    'sinh': (_, x: JexValue) => Math.sinh(toNumber(x)),
    'cosh': (_, x: JexValue) => Math.cosh(toNumber(x)),
    'tanh': (_, x: JexValue) => Math.tanh(toNumber(x)),
    'asinh': (_, x: JexValue) => Math.asinh(toNumber(x)),
    'acosh': (_, x: JexValue) => Math.acosh(toNumber(x)),
    'atanh': (_, x: JexValue) => Math.atanh(toNumber(x)),
    
    // Utility functions
    'min': (_, ...args: JexValue[]) => Math.min(...(args.map(toNumber) as number[])),
    'max': (_, ...args: JexValue[]) => Math.max(...(args.map(toNumber) as number[])),
    'pow': (_, base: JexValue, exponent: JexValue) => Math.pow(toNumber(base), toNumber(exponent)),
    'random': (_) => Math.random(),
    'sign': (_, x: JexValue) => Math.sign(toNumber(x)),
    
    // Custom math functions
    'deg': (_, rad: JexValue) => toNumber(rad) * 180 / Math.PI,
    'rad': (_, deg: JexValue) => toNumber(deg) * Math.PI / 180,
    'clamp': (_, value: JexValue, min: JexValue, max: JexValue) => 
        Math.min(Math.max(toNumber(value), toNumber(min)), toNumber(max)),
    'lerp': (_, a: JexValue, b: JexValue, t: JexValue) => 
        toNumber(a) + (toNumber(b) - toNumber(a)) * toNumber(t),
    
    // Type conversion functions
    'number': (_, x: JexValue) => toNumber(x),
    'string': (_, x: JexValue) => toString(x),
    'boolean': (_, x: JexValue) => toBoolean(x),
    'int': (_, x) => {
            return toInt(x);
        },

    'float': (_, x) => {
        return toFloat(x);
    },

    'double': (_, x) => {
        return toFloat(x);
    },

    // String functions
    'length': (_, x: JexValue) => {
        if (typeof x === 'string') return x.length;
        if (Array.isArray(x)) return x.length;
        throw new TypeMismatchError('length', 'string or array', getJexValueType(x));
    },
    'upper': (_, x: JexValue) => toString(x).toUpperCase(),
    'lower': (_, x: JexValue) => toString(x).toLowerCase(),
    'trim': (_, x: JexValue) => toString(x).trim(),
    
    // Array functions
    'array': (_, ...args: JexValue[]) => args,
    'first': (_, arr: JexValue) => {
        if (!Array.isArray(arr)) throw new TypeMismatchError('first', 'array', getJexValueType(arr));
        return arr[0] || null;
    },
    'push': (_, arr: JexValue, ...elements: JexValue[]) => {
        if (!Array.isArray(arr)) throw new TypeMismatchError('push', 'array', getJexValueType(arr));
        arr.push(...elements);
        return arr;
    },
    'pop': (_, arr: JexValue) => {
        if (!Array.isArray(arr)) throw new TypeMismatchError('pop', 'array', getJexValueType(arr)); 
        return arr.pop() || null;
    },
    'last': (_, arr: JexValue) => {
        if (!Array.isArray(arr)) throw new TypeMismatchError('last', 'array', getJexValueType(arr));
        return arr[arr.length - 1] || null;
    },
    'sum': (_, arr: JexValue) => {
        if (!Array.isArray(arr)) throw new TypeMismatchError('sum', 'array', getJexValueType(arr));
        if (arr.length === 0) return 0;
        return arr.reduce((sum, val) => toNumber(sum) + toNumber(val), 0);
    },
    'avg': (_, arr: JexValue) => {
        if (!Array.isArray(arr)) throw new TypeMismatchError('avg', 'array', getJexValueType(arr));
        if (arr.length === 0) return null;
        const sum = arr.reduce((sum, val) => toNumber(sum) + toNumber(val), 0);
        return typeof sum === 'number' ? sum / arr.length : null;
    },

    // Date and time functions
    'now': (_) => new Date().getTime(),
    'today': (_) => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date.getTime();
    },
    'date': (_, timestamp?: JexValue) => {
        if (timestamp === undefined) return new Date().getTime();
        return new Date(toNumber(timestamp)).getTime();
    },
    'year': (_, timestamp?: JexValue) => {
        const date = timestamp !== undefined ? new Date(toNumber(timestamp)) : new Date();
        return date.getFullYear();
    },
    'month': (_, timestamp?: JexValue) => {
        const date = timestamp !== undefined ? new Date(toNumber(timestamp)) : new Date();
        return date.getMonth() + 1; // JavaScript months are 0-based
    },
    'day': (_, timestamp?: JexValue) => {
        const date = timestamp !== undefined ? new Date(toNumber(timestamp)) : new Date();
        return date.getDate();
    },
    'hour': (_, timestamp?: JexValue) => {
        const date = timestamp !== undefined ? new Date(toNumber(timestamp)) : new Date();
        return date.getHours();
    },
    'minute': (_, timestamp?: JexValue) => {
        const date = timestamp !== undefined ? new Date(toNumber(timestamp)) : new Date();
        return date.getMinutes();
    },
    'second': (_, timestamp?: JexValue) => {
        const date = timestamp !== undefined ? new Date(toNumber(timestamp)) : new Date();
        return date.getSeconds();
    },
    'weekday': (_, timestamp?: JexValue) => {
        const date = timestamp !== undefined ? new Date(toNumber(timestamp)) : new Date();
        return date.getDay(); // 0 = Sunday, 6 = Saturday
    },
    'addDays': (_, timestamp: JexValue, days: JexValue) => {
        const date = new Date(toNumber(timestamp));
        date.setDate(date.getDate() + toNumber(days));
        return date.getTime();
    },
    'addMonths': (_, timestamp: JexValue, months: JexValue) => {
        const date = new Date(toNumber(timestamp));
        date.setMonth(date.getMonth() + toNumber(months));
        return date.getTime();
    },
    'addYears': (_, timestamp: JexValue, years: JexValue) => {
        const date = new Date(toNumber(timestamp));
        date.setFullYear(date.getFullYear() + toNumber(years));
        return date.getTime();
    },
    'addHours': (_, timestamp: JexValue, hours: JexValue) => {
        const date = new Date(toNumber(timestamp));
        date.setHours(date.getHours() + toNumber(hours));
        return date.getTime();
    },
    'addMinutes': (_, timestamp: JexValue, minutes: JexValue) => {
        const date = new Date(toNumber(timestamp));
        date.setMinutes(date.getMinutes() + toNumber(minutes));
        return date.getTime();
    },
    'daysBetween': (_, timestamp1: JexValue, timestamp2: JexValue) => {
        const date1 = new Date(toNumber(timestamp1));
        const date2 = new Date(toNumber(timestamp2));
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    'isLeapYear': (_, year: JexValue) => {
        const yr = toNumber(year);
        return ((yr % 4 === 0) && (yr % 100 !== 0)) || (yr % 400 === 0);
    },
    'timestamp': (_) => Math.floor(Date.now() / 1000),
};
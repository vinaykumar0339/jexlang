import type { FuncImpl, JexValue } from "../../types";
import { getJexValueType, toBoolean, toNumber, toString } from "../../utils";
import { TypeMismatchError } from "../errors";

// Built-in functions
export const BUILT_IN_FUNCTIONS: Record<string, FuncImpl> = {
    // Math functions that work with numbers
    'abs': (x: JexValue) => Math.abs(toNumber(x)),
    'ceil': (x: JexValue) => Math.ceil(toNumber(x)),
    'floor': (x: JexValue) => Math.floor(toNumber(x)),
    'round': (x: JexValue) => Math.round(toNumber(x)),
    'trunc': (x: JexValue) => Math.trunc(toNumber(x)),
    
    // Trigonometric functions
    'sin': (x: JexValue) => Math.sin(toNumber(x)),
    'cos': (x: JexValue) => Math.cos(toNumber(x)),
    'tan': (x: JexValue) => Math.tan(toNumber(x)),
    'asin': (x: JexValue) => Math.asin(toNumber(x)),
    'acos': (x: JexValue) => Math.acos(toNumber(x)),
    'atan': (x: JexValue) => Math.atan(toNumber(x)),
    'atan2': (y: JexValue, x: JexValue) => Math.atan2(toNumber(y), toNumber(x)),
    
    // Exponential and logarithmic functions
    'exp': (x: JexValue) => Math.exp(toNumber(x)),
    'log': (x: JexValue) => Math.log(toNumber(x)),
    'log10': (x: JexValue) => Math.log10(toNumber(x)),
    'log2': (x: JexValue) => Math.log2(toNumber(x)),
    'sqrt': (x: JexValue) => Math.sqrt(toNumber(x)),
    'cbrt': (x: JexValue) => Math.cbrt(toNumber(x)),
    
    // Hyperbolic functions
    'sinh': (x: JexValue) => Math.sinh(toNumber(x)),
    'cosh': (x: JexValue) => Math.cosh(toNumber(x)),
    'tanh': (x: JexValue) => Math.tanh(toNumber(x)),
    'asinh': (x: JexValue) => Math.asinh(toNumber(x)),
    'acosh': (x: JexValue) => Math.acosh(toNumber(x)),
    'atanh': (x: JexValue) => Math.atanh(toNumber(x)),
    
    // Utility functions
    'min': (...args: JexValue[]) => Math.min(...(args.map(toNumber) as number[])),
    'max': (...args: JexValue[]) => Math.max(...(args.map(toNumber) as number[])),
    'pow': (base: JexValue, exponent: JexValue) => Math.pow(toNumber(base), toNumber(exponent)),
    'random': () => Math.random(),
    'sign': (x: JexValue) => Math.sign(toNumber(x)),
    
    // Custom math functions
    'deg': (rad: JexValue) => toNumber(rad) * 180 / Math.PI,
    'rad': (deg: JexValue) => toNumber(deg) * Math.PI / 180,
    'clamp': (value: JexValue, min: JexValue, max: JexValue) => 
        Math.min(Math.max(toNumber(value), toNumber(min)), toNumber(max)),
    'lerp': (a: JexValue, b: JexValue, t: JexValue) => 
        toNumber(a) + (toNumber(b) - toNumber(a)) * toNumber(t),
    
    // Type conversion functions
    'number': (x: JexValue) => toNumber(x),
    'string': (x: JexValue) => toString(x),
    'boolean': (x: JexValue) => toBoolean(x),
    'int': (x: JexValue) => parseInt(toString(x)),
    'float': (x: JexValue) => parseFloat(toString(x)),
    'double': (x: JexValue) => parseFloat(toString(x)),

    // String functions
    'length': (x: JexValue) => {
        if (typeof x === 'string') return x.length;
        if (Array.isArray(x)) return x.length;
        throw new TypeMismatchError('length', 'string or array', getJexValueType(x));
    },
    'upper': (x: JexValue) => toString(x).toUpperCase(),
    'lower': (x: JexValue) => toString(x).toLowerCase(),
    'trim': (x: JexValue) => toString(x).trim(),
    
    // Array functions
    'array': (...args: JexValue[]) => args,
    'first': (arr: JexValue) => {
        if (!Array.isArray(arr)) throw new TypeMismatchError('first', 'array', getJexValueType(arr));
        return arr[0] || null;
    },
    'push': (arr: JexValue, ...elements: JexValue[]) => {
        if (!Array.isArray(arr)) throw new TypeMismatchError('push', 'array', getJexValueType(arr));
        arr.push(...elements);
        return arr;
    },
    'pop': (arr: JexValue) => {
        if (!Array.isArray(arr)) throw new TypeMismatchError('pop', 'array', getJexValueType(arr)); 
        return arr.pop() || null;
    },
    'last': (arr: JexValue) => {
        if (!Array.isArray(arr)) throw new TypeMismatchError('last', 'array', getJexValueType(arr));
        return arr[arr.length - 1] || null;
    },
    'sum': (arr: JexValue) => {
        if (!Array.isArray(arr)) throw new TypeMismatchError('sum', 'array', getJexValueType(arr));
        if (arr.length === 0) return 0;
        return arr.reduce((sum, val) => toNumber(sum) + toNumber(val), 0);
    },
    'avg': (arr: JexValue) => {
        if (!Array.isArray(arr)) throw new TypeMismatchError('avg', 'array', getJexValueType(arr));
        if (arr.length === 0) return null;
        const sum = arr.reduce((sum, val) => toNumber(sum) + toNumber(val), 0);
        return typeof sum === 'number' ? sum / arr.length : null;
    },

    // Date and time functions
    'now': () => new Date().getTime(),
    'today': () => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date.getTime();
    },
    'date': (timestamp?: JexValue) => {
        if (timestamp === undefined) return new Date().getTime();
        return new Date(toNumber(timestamp)).getTime();
    },
    'year': (timestamp?: JexValue) => {
        const date = timestamp !== undefined ? new Date(toNumber(timestamp)) : new Date();
        return date.getFullYear();
    },
    'month': (timestamp?: JexValue) => {
        const date = timestamp !== undefined ? new Date(toNumber(timestamp)) : new Date();
        return date.getMonth() + 1; // JavaScript months are 0-based
    },
    'day': (timestamp?: JexValue) => {
        const date = timestamp !== undefined ? new Date(toNumber(timestamp)) : new Date();
        return date.getDate();
    },
    'hour': (timestamp?: JexValue) => {
        const date = timestamp !== undefined ? new Date(toNumber(timestamp)) : new Date();
        return date.getHours();
    },
    'minute': (timestamp?: JexValue) => {
        const date = timestamp !== undefined ? new Date(toNumber(timestamp)) : new Date();
        return date.getMinutes();
    },
    'second': (timestamp?: JexValue) => {
        const date = timestamp !== undefined ? new Date(toNumber(timestamp)) : new Date();
        return date.getSeconds();
    },
    'weekday': (timestamp?: JexValue) => {
        const date = timestamp !== undefined ? new Date(toNumber(timestamp)) : new Date();
        return date.getDay(); // 0 = Sunday, 6 = Saturday
    },
    'addDays': (timestamp: JexValue, days: JexValue) => {
        const date = new Date(toNumber(timestamp));
        date.setDate(date.getDate() + toNumber(days));
        return date.getTime();
    },
    'addMonths': (timestamp: JexValue, months: JexValue) => {
        const date = new Date(toNumber(timestamp));
        date.setMonth(date.getMonth() + toNumber(months));
        return date.getTime();
    },
    'addYears': (timestamp: JexValue, years: JexValue) => {
        const date = new Date(toNumber(timestamp));
        date.setFullYear(date.getFullYear() + toNumber(years));
        return date.getTime();
    },
    'addHours': (timestamp: JexValue, hours: JexValue) => {
        const date = new Date(toNumber(timestamp));
        date.setHours(date.getHours() + toNumber(hours));
        return date.getTime();
    },
    'addMinutes': (timestamp: JexValue, minutes: JexValue) => {
        const date = new Date(toNumber(timestamp));
        date.setMinutes(date.getMinutes() + toNumber(minutes));
        return date.getTime();
    },
    'daysBetween': (timestamp1: JexValue, timestamp2: JexValue) => {
        const date1 = new Date(toNumber(timestamp1));
        const date2 = new Date(toNumber(timestamp2));
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    'isLeapYear': (year: JexValue) => {
        const yr = toNumber(year);
        return ((yr % 4 === 0) && (yr % 100 !== 0)) || (yr % 400 === 0);
    },
    'timestamp': () => Math.floor(Date.now() / 1000),
};
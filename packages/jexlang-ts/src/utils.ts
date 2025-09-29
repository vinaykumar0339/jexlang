import { Scope } from "./eval";
import { TypeMismatchError } from "./eval/errors/errors";
import type { JexValue } from "./types";
import packageJson from '../package.json';

// Utility functions for type checking and conversion
export function getJexValueType(value: JexValue): string {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'object';
    return typeof value;
}

export function isNumeric(value: JexValue): value is number {
    return typeof value === 'number' && Number.isFinite(value);
}

export function toNumber(value: JexValue): number {
    if (value == null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    if (typeof value === 'boolean') return value ? 1 : 0;
    if (typeof value === 'string') {
        const num = Number(value);
        if (!Number.isNaN(num)) return num;
    }
    throw new TypeMismatchError('number conversion', 'number', getJexValueType(value));
}

export function toBoolean(value: JexValue): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value !== 0 && !Number.isNaN(value);
    if (typeof value === 'string') return value.length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (value && typeof value === 'object') return Object.keys(value).length > 0;
    return value !== null && value !== undefined;
}

export function toString(value: JexValue): string {
    if (value === null) return 'null';
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'boolean') return value.toString();
    if (Array.isArray(value)) return `[${value.map(toString).join(', ')}]`;
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
}

export function createGlobalScope(): Scope {
    const scope = new Scope(null, 'global');
    // Add built-in functions and variables to the global scope

    scope.declareVariable("PI", Math.PI, true);
    scope.declareVariable("E", Math.E, true);
    scope.declareVariable("LN2", Math.LN2, true);
    scope.declareVariable("LN10", Math.LN10, true);
    scope.declareVariable("LOG2E", Math.LOG2E, true);
    scope.declareVariable("LOG10E", Math.LOG10E, true);
    scope.declareVariable("SQRT1_2", Math.SQRT1_2, true);
    scope.declareVariable("SQRT2", Math.SQRT2, true);
    scope.declareVariable("VERSION", packageJson.version, true);
    scope.declareVariable("__CLIENT_LANGUAGE", "javascript", true);
    return scope;
}
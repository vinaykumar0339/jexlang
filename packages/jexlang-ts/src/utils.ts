import { TypeMismatchError } from "./eval/errors/errors";
import { JexValue } from "./types";

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
    if (typeof value === 'number') return value;
    if (typeof value === 'boolean') return value ? 1 : 0;
    if (typeof value === 'string') {
        const num = Number(value);
        if (!Number.isNaN(num)) return num;
    }
    throw new TypeMismatchError('number conversion', 'number', getJexValueType(value));
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
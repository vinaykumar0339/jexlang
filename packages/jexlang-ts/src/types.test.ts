import { describe, it, expect } from 'vitest';
import {
    MapFuncRegistry,
    MapTransformRegistry,
    type JexValue,
    type FuncImpl,
    type TransformImpl
} from './types';

describe('MapFuncRegistry', () => {
    it('should initialize empty without arguments', () => {
        const registry = new MapFuncRegistry();
        expect(registry.has('test')).toBe(false);
    });

    it('should initialize with functions', () => {
        const registry = new MapFuncRegistry({
            add: (a: JexValue, b: JexValue) => (a as number) + (b as number),
        });
        expect(registry.has('add')).toBe(true);
        expect(registry.has('unknown')).toBe(false);
    });

    it('should set and get functions', () => {
        const registry = new MapFuncRegistry();
        registry.set('multiply', (a: JexValue, b: JexValue) => (a as number) * (b as number));
        expect(registry.has('multiply')).toBe(true);
    });

    it('should call functions with arguments', () => {
        const registry = new MapFuncRegistry();
        registry.set('concat', (a: JexValue, b: JexValue) => `${a}${b}`);
        expect(registry.call('concat', ['hello', 'world'])).toBe('helloworld');
    });

    it('should support async functions', async () => {
        const registry = new MapFuncRegistry();
        registry.set('delay', async (value: JexValue) => {
            return new Promise<JexValue>((resolve) => {
                setTimeout(() => resolve((value as number) * 2), 1);
            });
        });
        const result = await registry.call('delay', [5]);
        expect(result).toBe(10);
    });

    it('should throw for unknown functions', () => {
        const registry = new MapFuncRegistry();
        expect(() => registry.call('unknown', [])).toThrow('Unknown function: unknown');
    });
});

describe('MapTransformRegistry', () => {
    it('should initialize empty without arguments', () => {
        const registry = new MapTransformRegistry();
        expect(registry.has('test')).toBe(false);
    });

    it('should initialize with transforms', () => {
        const registry = new MapTransformRegistry({
            uppercase: (input: JexValue) => (input as string).toUpperCase(),
        });
        expect(registry.has('uppercase')).toBe(true);
        expect(registry.has('unknown')).toBe(false);
    });

    it('should set and check transforms', () => {
        const registry = new MapTransformRegistry();
        registry.set('lowercase', (input: JexValue) => (input as string).toLowerCase());
        expect(registry.has('lowercase')).toBe(true);
    });

    it('should transform values', () => {
        const registry = new MapTransformRegistry();
        registry.set('double', (input: JexValue) => (input as number) * 2);
        expect(registry.transform('double', 5)).toBe(10);
    });

    it('should support async transforms', async () => {
        const registry = new MapTransformRegistry();
        registry.set('delayedUpper', async (input: JexValue) => {
            return new Promise<JexValue>((resolve) => {
                setTimeout(() => resolve((input as string).toUpperCase()), 1);
            });
        });
        const result = await registry.transform('delayedUpper', 'hello');
        expect(result).toBe('HELLO');
    });

    it('should throw for unknown transforms', () => {
        const registry = new MapTransformRegistry();
        expect(() => registry.transform('unknown', 'test')).toThrow('Unknown transform: unknown');
    });
});
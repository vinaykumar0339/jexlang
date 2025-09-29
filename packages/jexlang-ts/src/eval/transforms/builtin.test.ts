import { describe, it, expect } from 'vitest';
import { BUILT_IN_TRANSFORMS } from './builtin';

describe('BUILT_IN_TRANSFORMS', () => {
  describe('String transforms', () => {
    describe('upper', () => {
      it('should convert string to uppercase', () => {
        expect(BUILT_IN_TRANSFORMS.upper('hello')).toBe('HELLO');
        expect(BUILT_IN_TRANSFORMS.upper('Hello World')).toBe('HELLO WORLD');
      });

      it('should handle non-string values', () => {
        expect(BUILT_IN_TRANSFORMS.upper(123)).toBe('123');
        expect(BUILT_IN_TRANSFORMS.upper(null)).toBe('NULL');
      });
    });

    describe('lower', () => {
      it('should convert string to lowercase', () => {
        expect(BUILT_IN_TRANSFORMS.lower('HELLO')).toBe('hello');
        expect(BUILT_IN_TRANSFORMS.lower('Hello World')).toBe('hello world');
      });

      it('should handle non-string values', () => {
        expect(BUILT_IN_TRANSFORMS.lower(123)).toBe('123');
        expect(BUILT_IN_TRANSFORMS.lower(null)).toBe('null');
      });
    });

    describe('capitalize', () => {
      it('should capitalize each word', () => {
        expect(BUILT_IN_TRANSFORMS.capitalize('hello world')).toBe('Hello World');
        expect(BUILT_IN_TRANSFORMS.capitalize('HELLO WORLD')).toBe('Hello World');
        expect(BUILT_IN_TRANSFORMS.capitalize('hello')).toBe('Hello');
      });

      it('should handle empty string', () => {
        expect(BUILT_IN_TRANSFORMS.capitalize('')).toBe('');
      });

      it('should handle single characters', () => {
        expect(BUILT_IN_TRANSFORMS.capitalize('a')).toBe('A');
        expect(BUILT_IN_TRANSFORMS.capitalize('a b')).toBe('A B');
      });
    });

    describe('trim', () => {
      it('should remove leading and trailing whitespace', () => {
        expect(BUILT_IN_TRANSFORMS.trim('  hello  ')).toBe('hello');
        expect(BUILT_IN_TRANSFORMS.trim('\n\thello\t\n')).toBe('hello');
      });

      it('should handle strings without whitespace', () => {
        expect(BUILT_IN_TRANSFORMS.trim('hello')).toBe('hello');
      });
    });
  });

  describe('Numeric transforms', () => {
    describe('abs', () => {
      it('should return absolute value', () => {
        expect(BUILT_IN_TRANSFORMS.abs(-5)).toBe(5);
        expect(BUILT_IN_TRANSFORMS.abs(5)).toBe(5);
        expect(BUILT_IN_TRANSFORMS.abs(-3.14)).toBe(3.14);
      });

      it('should handle string numbers', () => {
        expect(BUILT_IN_TRANSFORMS.abs('-10')).toBe(10);
        expect(BUILT_IN_TRANSFORMS.abs('5.5')).toBe(5.5);
      });
    });

    describe('floor', () => {
      it('should return floor value', () => {
        expect(BUILT_IN_TRANSFORMS.floor(3.7)).toBe(3);
        expect(BUILT_IN_TRANSFORMS.floor(-3.7)).toBe(-4);
        expect(BUILT_IN_TRANSFORMS.floor(5)).toBe(5);
      });
    });

    describe('ceil', () => {
      it('should return ceiling value', () => {
        expect(BUILT_IN_TRANSFORMS.ceil(3.2)).toBe(4);
        expect(BUILT_IN_TRANSFORMS.ceil(-3.2)).toBe(-3);
        expect(BUILT_IN_TRANSFORMS.ceil(5)).toBe(5);
      });
    });

    describe('round', () => {
      it('should round to nearest integer', () => {
        expect(BUILT_IN_TRANSFORMS.round(3.4)).toBe(3);
        expect(BUILT_IN_TRANSFORMS.round(3.6)).toBe(4);
        expect(BUILT_IN_TRANSFORMS.round(-3.4)).toBe(-3);
        expect(BUILT_IN_TRANSFORMS.round(-3.6)).toBe(-4);
      });
    });
  });

  describe('Array transforms', () => {
    describe('length', () => {
      it('should return array length', () => {
        expect(BUILT_IN_TRANSFORMS.length([1, 2, 3])).toBe(3);
        expect(BUILT_IN_TRANSFORMS.length([])).toBe(0);
      });

      it('should return string length', () => {
        expect(BUILT_IN_TRANSFORMS.length('hello')).toBe(5);
        expect(BUILT_IN_TRANSFORMS.length('')).toBe(0);
      });

      it('should return object key count', () => {
        expect(BUILT_IN_TRANSFORMS.length({ a: 1, b: 2 })).toBe(2);
        expect(BUILT_IN_TRANSFORMS.length({})).toBe(0);
      });

      it('should return 0 for null/undefined', () => {
        expect(BUILT_IN_TRANSFORMS.length(null)).toBe(0);
      });
    });
  });

  describe('Type transforms', () => {
    describe('number', () => {
      it('should convert to number', () => {
        expect(BUILT_IN_TRANSFORMS.number('123')).toBe(123);
        expect(BUILT_IN_TRANSFORMS.number('3.14')).toBe(3.14);
        expect(BUILT_IN_TRANSFORMS.number(true)).toBe(1);
        expect(BUILT_IN_TRANSFORMS.number(false)).toBe(0);
      });
    });

    describe('string', () => {
      it('should convert to string', () => {
        expect(BUILT_IN_TRANSFORMS.string(123)).toBe('123');
        expect(BUILT_IN_TRANSFORMS.string(true)).toBe('true');
        expect(BUILT_IN_TRANSFORMS.string(null)).toBe('null');
      });
    });

    describe('boolean', () => {
      it('should convert to boolean', () => {
        expect(BUILT_IN_TRANSFORMS.boolean(1)).toBe(true);
        expect(BUILT_IN_TRANSFORMS.boolean(0)).toBe(false);
        expect(BUILT_IN_TRANSFORMS.boolean('true')).toBe(true);
        expect(BUILT_IN_TRANSFORMS.boolean('false')).toBe(true);
        expect(BUILT_IN_TRANSFORMS.boolean('')).toBe(false);
      });
    });

    describe('int', () => {
      it('should convert to integer', () => {
        expect(BUILT_IN_TRANSFORMS.int(3.7)).toBe(3);
        expect(BUILT_IN_TRANSFORMS.int('5.9')).toBe(5);
        expect(BUILT_IN_TRANSFORMS.int(-2.1)).toBe(-3);
      });
    });

    describe('float', () => {
      it('should convert to float', () => {
        expect(BUILT_IN_TRANSFORMS.float('3.14')).toBe(3.14);
        expect(BUILT_IN_TRANSFORMS.float(5)).toBe(5);
        expect(BUILT_IN_TRANSFORMS.float('invalid')).toBeNaN();
      });
    });

    describe('double', () => {
      it('should convert to double (same as float)', () => {
        expect(BUILT_IN_TRANSFORMS.double('3.14159')).toBe(3.14159);
        expect(BUILT_IN_TRANSFORMS.double(7)).toBe(7);
        expect(BUILT_IN_TRANSFORMS.double('invalid')).toBeNaN();
      });
    });
  });
});
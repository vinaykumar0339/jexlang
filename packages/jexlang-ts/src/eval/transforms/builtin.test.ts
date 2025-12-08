import { describe, it, expect } from 'vitest';
import { BUILT_IN_TRANSFORMS } from './builtin';
import { JexEvaluator } from '../evaluator';
import { JexLangRuntimeError } from '../errors';



describe('BUILT_IN_TRANSFORMS', () => {
   const evaluatorContext = { jexEvaluator: new JexEvaluator() };
  describe('String transforms', () => {
    describe('upper', () => {
      it('should convert string to uppercase', () => {
        expect(BUILT_IN_TRANSFORMS.upper('hello', evaluatorContext)).toBe('HELLO');
        expect(BUILT_IN_TRANSFORMS.upper('Hello World', evaluatorContext)).toBe('HELLO WORLD');
      });

      it('should handle non-string values', () => {
        expect(BUILT_IN_TRANSFORMS.upper(123, evaluatorContext)).toBe('123');
        expect(BUILT_IN_TRANSFORMS.upper(null, evaluatorContext)).toBe('NULL');
      });
    });

    describe('lower', () => {
      it('should convert string to lowercase', () => {
        expect(BUILT_IN_TRANSFORMS.lower('HELLO', evaluatorContext)).toBe('hello');
        expect(BUILT_IN_TRANSFORMS.lower('Hello World', evaluatorContext)).toBe('hello world');
      });

      it('should handle non-string values', () => {
        expect(BUILT_IN_TRANSFORMS.lower(123, evaluatorContext)).toBe('123');
        expect(BUILT_IN_TRANSFORMS.lower(null, evaluatorContext)).toBe('null');
      });
    });

    describe('capitalize', () => {
      it('should capitalize each word', () => {
        expect(BUILT_IN_TRANSFORMS.capitalize('hello world', evaluatorContext)).toBe('Hello World');
        expect(BUILT_IN_TRANSFORMS.capitalize('HELLO WORLD', evaluatorContext)).toBe('Hello World');
        expect(BUILT_IN_TRANSFORMS.capitalize('hello', evaluatorContext)).toBe('Hello');
      });

      it('should handle empty string', () => {
        expect(BUILT_IN_TRANSFORMS.capitalize('', evaluatorContext)).toBe('');
      });

      it('should handle single characters', () => {
        expect(BUILT_IN_TRANSFORMS.capitalize('a', evaluatorContext)).toBe('A');
        expect(BUILT_IN_TRANSFORMS.capitalize('a b', evaluatorContext)).toBe('A B');
      });
    });

    describe('trim', () => {
      it('should remove leading and trailing whitespace', () => {
        expect(BUILT_IN_TRANSFORMS.trim('  hello  ', evaluatorContext)).toBe('hello');
        expect(BUILT_IN_TRANSFORMS.trim('\n\thello\t\n', evaluatorContext)).toBe('hello');
      });

      it('should handle strings without whitespace', () => {
        expect(BUILT_IN_TRANSFORMS.trim('hello', evaluatorContext)).toBe('hello');
      });
    });
  });

  describe('Numeric transforms', () => {
    describe('abs', () => {
      it('should return absolute value', () => {
        expect(BUILT_IN_TRANSFORMS.abs(-5, evaluatorContext)).toBe(5);
        expect(BUILT_IN_TRANSFORMS.abs(5, evaluatorContext)).toBe(5);
        expect(BUILT_IN_TRANSFORMS.abs(-3.14, evaluatorContext)).toBe(3.14);
      });

      it('should handle string numbers', () => {
        expect(BUILT_IN_TRANSFORMS.abs('-10', evaluatorContext)).toBe(10);
        expect(BUILT_IN_TRANSFORMS.abs('5.5', evaluatorContext)).toBe(5.5);
      });
    });

    describe('floor', () => {
      it('should return floor value', () => {
        expect(BUILT_IN_TRANSFORMS.floor(3.7, evaluatorContext)).toBe(3);
        expect(BUILT_IN_TRANSFORMS.floor(-3.7, evaluatorContext)).toBe(-4);
        expect(BUILT_IN_TRANSFORMS.floor(5, evaluatorContext)).toBe(5);
      });
    });

    describe('ceil', () => {
      it('should return ceiling value', () => {
        expect(BUILT_IN_TRANSFORMS.ceil(3.2, evaluatorContext)).toBe(4);
        expect(BUILT_IN_TRANSFORMS.ceil(-3.2, evaluatorContext)).toBe(-3);
        expect(BUILT_IN_TRANSFORMS.ceil(5, evaluatorContext)).toBe(5);
      });
    });

    describe('round', () => {
      it('should round to nearest integer', () => {
        expect(BUILT_IN_TRANSFORMS.round(3.4, evaluatorContext)).toBe(3);
        expect(BUILT_IN_TRANSFORMS.round(3.6, evaluatorContext)).toBe(4);
        expect(BUILT_IN_TRANSFORMS.round(-3.4, evaluatorContext)).toBe(-3);
        expect(BUILT_IN_TRANSFORMS.round(-3.6, evaluatorContext)).toBe(-4);
      });
    });
  });

  describe('Array transforms', () => {
    describe('length', () => {
      it('should return array length', () => {
        expect(BUILT_IN_TRANSFORMS.length([1, 2, 3], evaluatorContext)).toBe(3);
        expect(BUILT_IN_TRANSFORMS.length([], evaluatorContext)).toBe(0);
      });

      it('should return string length', () => {
        expect(BUILT_IN_TRANSFORMS.length('hello', evaluatorContext)).toBe(5);
        expect(BUILT_IN_TRANSFORMS.length('', evaluatorContext)).toBe(0);
      });

      it('should return object key count', () => {
        expect(BUILT_IN_TRANSFORMS.length({ a: 1, b: 2 }, evaluatorContext)).toBe(2);
        expect(BUILT_IN_TRANSFORMS.length({}, evaluatorContext)).toBe(0);
      });

      it('should return 0 for null/undefined', () => {
        expect(BUILT_IN_TRANSFORMS.length(null, evaluatorContext)).toBe(0);
      });
    });
  });

  describe('Type transforms', () => {
    describe('number', () => {
      it('should convert to number', () => {
        expect(BUILT_IN_TRANSFORMS.number('123', evaluatorContext)).toBe(123);
        expect(BUILT_IN_TRANSFORMS.number('3.14', evaluatorContext)).toBe(3.14);
        expect(BUILT_IN_TRANSFORMS.number(true, evaluatorContext)).toBe(1);
        expect(BUILT_IN_TRANSFORMS.number(false, evaluatorContext)).toBe(0);
      });
    });

    describe('string', () => {
      it('should convert to string', () => {
        expect(BUILT_IN_TRANSFORMS.string(123, evaluatorContext)).toBe('123');
        expect(BUILT_IN_TRANSFORMS.string(true, evaluatorContext)).toBe('true');
        expect(BUILT_IN_TRANSFORMS.string(null, evaluatorContext)).toBe('null');
      });
    });

    describe('boolean', () => {
      it('should convert to boolean', () => {
        expect(BUILT_IN_TRANSFORMS.boolean(1, evaluatorContext)).toBe(true);
        expect(BUILT_IN_TRANSFORMS.boolean(0, evaluatorContext)).toBe(false);
        expect(BUILT_IN_TRANSFORMS.boolean('true', evaluatorContext)).toBe(true);
        expect(BUILT_IN_TRANSFORMS.boolean('false', evaluatorContext)).toBe(true);
        expect(BUILT_IN_TRANSFORMS.boolean('', evaluatorContext)).toBe(false);
      });
    });

    describe('int', () => {
      it('should convert to integer', () => {
        expect(BUILT_IN_TRANSFORMS.int(3.7, evaluatorContext)).toBe(3);
        expect(BUILT_IN_TRANSFORMS.int('5.9', evaluatorContext)).toBe(5);
        expect(BUILT_IN_TRANSFORMS.int(-2.1, evaluatorContext)).toBe(-2);
      });
    });

    describe('float', () => {
      it('should convert to float', () => {
        expect(BUILT_IN_TRANSFORMS.float('3.14', evaluatorContext)).toBe(3.14);
        expect(BUILT_IN_TRANSFORMS.float(5, evaluatorContext)).toBe(5);
        expect(() => BUILT_IN_TRANSFORMS.float('invalid', evaluatorContext)).toThrow(JexLangRuntimeError);
      });
    });

    describe('double', () => {
      it('should convert to double (same as float)', () => {
        expect(BUILT_IN_TRANSFORMS.double('3.14159', evaluatorContext)).toBe(3.14159);
        expect(BUILT_IN_TRANSFORMS.double(7, evaluatorContext)).toBe(7);
        expect(() => BUILT_IN_TRANSFORMS.double('invalid', evaluatorContext)).toThrow(JexLangRuntimeError);
      });
    });
  });
});
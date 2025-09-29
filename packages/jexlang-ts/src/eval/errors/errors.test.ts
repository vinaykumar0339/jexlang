import { describe, it, expect } from 'vitest';
import {
  JexLangRuntimeError,
  UndefinedVariableError,
  UndefinedFunctionError,
  UndefinedTransformError,
  DivisionByZeroError,
  TypeMismatchError,
  JexLangSyntaxError,
  type SyntaxErrorLocation
} from './errors';

describe('Error Classes', () => {
  describe('JexLangRuntimeError', () => {
    it('should create error with correct message and name', () => {
      const error = new JexLangRuntimeError('Test error message');
      expect(error.message).toBe('Test error message');
      expect(error.name).toBe('JexLangRuntimeError');
    });

    it('should be instance of Error', () => {
      const error = new JexLangRuntimeError('Test error');
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('UndefinedVariableError', () => {
    it('should create error with correct message and name', () => {
      const error = new UndefinedVariableError('testVar');
      expect(error.message).toBe('Undefined variable: testVar');
      expect(error.name).toBe('UndefinedVariableError');
    });

    it('should be instance of JexLangRuntimeError', () => {
      const error = new UndefinedVariableError('testVar');
      expect(error).toBeInstanceOf(JexLangRuntimeError);
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('UndefinedFunctionError', () => {
    it('should create error with correct message and name', () => {
      const error = new UndefinedFunctionError('testFunc');
      expect(error.message).toBe('Undefined function: testFunc');
      expect(error.name).toBe('UndefinedFunctionError');
    });

    it('should be instance of JexLangRuntimeError', () => {
      const error = new UndefinedFunctionError('testFunc');
      expect(error).toBeInstanceOf(JexLangRuntimeError);
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('UndefinedTransformError', () => {
    it('should create error with correct message and name', () => {
      const error = new UndefinedTransformError('testTransform');
      expect(error.message).toBe('Undefined transform: testTransform');
      expect(error.name).toBe('UndefinedTransformError');
    });

    it('should be instance of JexLangRuntimeError', () => {
      const error = new UndefinedTransformError('testTransform');
      expect(error).toBeInstanceOf(JexLangRuntimeError);
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('DivisionByZeroError', () => {
    it('should create error with correct message and name', () => {
      const error = new DivisionByZeroError();
      expect(error.message).toBe('Division by zero');
      expect(error.name).toBe('DivisionByZeroError');
    });

    it('should be instance of JexLangRuntimeError', () => {
      const error = new DivisionByZeroError();
      expect(error).toBeInstanceOf(JexLangRuntimeError);
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('TypeMismatchError', () => {
    it('should create error with correct message and name', () => {
      const error = new TypeMismatchError('addition', 'number', 'string');
      expect(error.message).toBe('Type mismatch in addition: expected number, got string');
      expect(error.name).toBe('TypeMismatchError');
    });

    it('should format different operations correctly', () => {
      const error1 = new TypeMismatchError('comparison', 'boolean', 'object');
      const error2 = new TypeMismatchError('function call', 'array', 'null');
      
      expect(error1.message).toBe('Type mismatch in comparison: expected boolean, got object');
      expect(error2.message).toBe('Type mismatch in function call: expected array, got null');
    });

    it('should be instance of JexLangRuntimeError', () => {
      const error = new TypeMismatchError('test', 'type1', 'type2');
      expect(error).toBeInstanceOf(JexLangRuntimeError);
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('JexLangSyntaxError', () => {
    it('should create error with correct message, name and location', () => {
      const location: SyntaxErrorLocation = {
        line: 10,
        column: 15,
        offendingSymbol: '{'
      };
      
      const error = new JexLangSyntaxError('Syntax error message', location);
      
      expect(error.message).toBe('Syntax error message');
      expect(error.name).toBe('JexLangSyntaxError');
      expect(error.location).toBe(location);
      expect(error.location.line).toBe(10);
      expect(error.location.column).toBe(15);
      expect(error.location.offendingSymbol).toBe('{');
    });

    it('should handle location without offending symbol', () => {
      const location: SyntaxErrorLocation = {
        line: 5,
        column: 20
      };
      
      const error = new JexLangSyntaxError('Missing symbol error', location);
      
      expect(error.location.line).toBe(5);
      expect(error.location.column).toBe(20);
      expect(error.location.offendingSymbol).toBeUndefined();
    });

    it('should be instance of JexLangRuntimeError', () => {
      const location: SyntaxErrorLocation = { line: 1, column: 1 };
      const error = new JexLangSyntaxError('Test error', location);
      
      expect(error).toBeInstanceOf(JexLangRuntimeError);
      expect(error).toBeInstanceOf(Error);
    });

  });

  describe('Error inheritance and comparison', () => {
    it('should properly distinguish between different error types', () => {
      const runtime = new JexLangRuntimeError('Runtime error');
      const varError = new UndefinedVariableError('x');
      const funcError = new UndefinedFunctionError('foo');
      
      expect(varError instanceof UndefinedVariableError).toBe(true);
      expect(varError instanceof UndefinedFunctionError).toBe(false);
      expect(funcError instanceof UndefinedVariableError).toBe(false);
      expect(funcError instanceof UndefinedFunctionError).toBe(true);
      
      // Both should be instances of the parent class
      expect(varError instanceof JexLangRuntimeError).toBe(true);
      expect(funcError instanceof JexLangRuntimeError).toBe(true);
    });

    it('should allow catching specific error types', () => {
      // This test simulates try/catch behavior
      const testFunction = (throwType: string): string => {
        if (throwType === 'variable') {
          throw new UndefinedVariableError('x');
        } else if (throwType === 'function') {
          throw new UndefinedFunctionError('foo');
        } else if (throwType === 'zero') {
          throw new DivisionByZeroError();
        } else {
          throw new JexLangRuntimeError('Generic error');
        }
      };

      // Test specific error types
      try {
        testFunction('variable');
        expect(true).toBe(false); // Should not reach here
      } catch (error) {
        expect(error).toBeInstanceOf(UndefinedVariableError);
        expect((error as Error).message).toContain('x');
      }

      // Test parent class catching
      try {
        testFunction('function');
        expect(true).toBe(false); // Should not reach here
      } catch (error) {
        expect(error).toBeInstanceOf(JexLangRuntimeError);
        expect((error as Error).message).toContain('foo');
      }
    });
  });
});
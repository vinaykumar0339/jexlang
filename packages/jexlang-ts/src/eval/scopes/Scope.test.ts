import { describe, it, expect, beforeEach } from 'vitest';
import { Scope } from './Scope';
import { JexLangRuntimeError } from '../errors';

describe('Scope', () => {
    let scope: Scope;

    beforeEach(() => {
        scope = new Scope();
    });

    describe('constructor', () => {
        it('should create scope with null parent and program type by default', () => {
            const newScope = new Scope();
            expect(newScope.getParentScope()).toBeNull();
        });

        it('should create scope with specified parent and type', () => {
            const parentScope = new Scope();
            const childScope = new Scope(parentScope, 'block');
            expect(childScope.getParentScope()).toBe(parentScope);
        });
    });

    describe('declareVariable', () => {
        it('should declare a variable with value', () => {
            scope.declareVariable('x', 42);
            expect(scope.getVariable('x')).toBe(42);
        });

        it('should declare a constant variable', () => {
            scope.declareVariable('x', 42, true);
            expect(scope.getVariable('x')).toBe(42);
        });

        it('should throw error when declaring duplicate variable in non-global scope', () => {
            scope.declareVariable('x', 42);
            expect(() => scope.declareVariable('x', 24)).toThrow(JexLangRuntimeError);
            expect(() => scope.declareVariable('x', 24)).toThrow("Variable 'x' is already declared.");
        });

        it('should allow re-declaring variable in global scope', () => {
            const globalScope = new Scope(null, 'global');
            globalScope.declareVariable('x', 42);
            globalScope.declareVariable('x', 24);
            expect(globalScope.getVariable('x')).toBe(24);
        });

        it('should remove from constants when re-declaring as non-const in global scope', () => {
            const globalScope = new Scope(null, 'global');
            globalScope.declareVariable('x', 42, true);
            globalScope.declareVariable('x', 24, false);
            expect(() => globalScope.assignVariable('x', 99)).not.toThrow();
        });
    });

    describe('assignVariable', () => {
        it('should assign value to existing variable', () => {
            scope.declareVariable('x', 42);
            scope.assignVariable('x', 24);
            expect(scope.getVariable('x')).toBe(24);
        });

        it('should throw error when assigning to undeclared variable', () => {
            expect(() => scope.assignVariable('x', 42)).toThrow(JexLangRuntimeError);
            expect(() => scope.assignVariable('x', 42)).toThrow("Variable 'x' is not declared.");
        });

        it('should throw error when assigning to constant variable', () => {
            scope.declareVariable('x', 42, true);
            expect(() => scope.assignVariable('x', 24)).toThrow(JexLangRuntimeError);
            expect(() => scope.assignVariable('x', 24)).toThrow("Variable 'x' is a constant and cannot be re-declared or modified.");
        });

        it('should assign to variable in parent scope', () => {
            const parentScope = new Scope();
            const childScope = new Scope(parentScope, 'block');
            parentScope.declareVariable('x', 42);
            childScope.assignVariable('x', 24);
            expect(parentScope.getVariable('x')).toBe(24);
        });
    });

    describe('declareAndAssignVariable', () => {
        it('should declare new variable', () => {
            scope.declareAndAssignVariable('x', 42);
            expect(scope.getVariable('x')).toBe(42);
        });

        it('should assign to existing variable', () => {
            scope.declareVariable('x', 42);
            scope.declareAndAssignVariable('x', 24);
            expect(scope.getVariable('x')).toBe(24);
        });

        it('should declare new constant variable', () => {
            scope.declareAndAssignVariable('x', 42, true);
            expect(scope.getVariable('x')).toBe(42);
            expect(() => scope.assignVariable('x', 24)).toThrow();
        });
    });

    describe('getVariable', () => {
        it('should return variable value from current scope', () => {
            scope.declareVariable('x', 42);
            expect(scope.getVariable('x')).toBe(42);
        });

        it('should return variable value from parent scope', () => {
            const parentScope = new Scope();
            const childScope = new Scope(parentScope, 'block');
            parentScope.declareVariable('x', 42);
            expect(childScope.getVariable('x')).toBe(42);
        });

        it('should return null for undeclared variable', () => {
            expect(scope.getVariable('x')).toBeNull();
        });

        it('should return variable from closest scope', () => {
            const grandparentScope = new Scope();
            const parentScope = new Scope(grandparentScope, 'block');
            const childScope = new Scope(parentScope, 'block');
            
            grandparentScope.declareVariable('x', 1);
            parentScope.declareVariable('x', 2);
            
            expect(childScope.getVariable('x')).toBe(2);
        });
    });

    describe('resolveScope', () => {
        it('should return current scope if variable exists', () => {
            scope.declareVariable('x', 42);
            expect(scope.resolveScope('x')).toBe(scope);
        });

        it('should return parent scope if variable exists there', () => {
            const parentScope = new Scope();
            const childScope = new Scope(parentScope, 'block');
            parentScope.declareVariable('x', 42);
            expect(childScope.resolveScope('x')).toBe(parentScope);
        });

        it('should return null if variable does not exist', () => {
            expect(scope.resolveScope('x')).toBeNull();
        });
    });

    describe('resolveScopeByType', () => {
        it('should return current scope if type matches', () => {
            expect(scope.resolveScopeByType('program')).toBe(scope);
        });

        it('should return parent scope if type matches', () => {
            const globalScope = new Scope(null, 'global');
            const childScope = new Scope(globalScope, 'block');
            expect(childScope.resolveScopeByType('global')).toBe(globalScope);
        });

        it('should return null if type is not found', () => {
            expect(scope.resolveScopeByType('global')).toBeNull();
        });

        it('should traverse multiple levels to find type', () => {
            const globalScope = new Scope(null, 'global');
            const programScope = new Scope(globalScope, 'program');
            const blockScope = new Scope(programScope, 'block');
            
            expect(blockScope.resolveScopeByType('global')).toBe(globalScope);
            expect(blockScope.resolveScopeByType('program')).toBe(programScope);
            expect(blockScope.resolveScopeByType('block')).toBe(blockScope);
        });
    });

    describe('hasVariable', () => {
        it('should return true if variable exists in current scope', () => {
            scope.declareVariable('x', 42);
            expect(scope.hasVariable('x')).toBe(true);
        });

        it('should return true if variable exists in parent scope', () => {
            const parentScope = new Scope();
            const childScope = new Scope(parentScope, 'block');
            parentScope.declareVariable('x', 42);
            expect(childScope.hasVariable('x')).toBe(true);
        });

        it('should return false if variable does not exist', () => {
            expect(scope.hasVariable('x')).toBe(false);
        });
    });

    describe('complex scenarios', () => {
        it('should handle nested scopes correctly', () => {
            const globalScope = new Scope(null, 'global');
            const programScope = new Scope(globalScope, 'program');
            const blockScope = new Scope(programScope, 'block');

            globalScope.declareVariable('global', 'globalValue');
            programScope.declareVariable('program', 'programValue');
            blockScope.declareVariable('block', 'blockValue');

            expect(blockScope.getVariable('global')).toBe('globalValue');
            expect(blockScope.getVariable('program')).toBe('programValue');
            expect(blockScope.getVariable('block')).toBe('blockValue');
        });

        it('should handle variable shadowing', () => {
            const parentScope = new Scope();
            const childScope = new Scope(parentScope, 'block');

            parentScope.declareVariable('x', 'parent');
            childScope.declareVariable('x', 'child');

            expect(parentScope.getVariable('x')).toBe('parent');
            expect(childScope.getVariable('x')).toBe('child');
        });

        it('should handle constants across scopes', () => {
            const parentScope = new Scope();
            const childScope = new Scope(parentScope, 'block');

            parentScope.declareVariable('const1', 42, true);
            childScope.declareVariable('const2', 24, true);

            expect(() => parentScope.assignVariable('const1', 99)).toThrow();
            expect(() => childScope.assignVariable('const1', 99)).toThrow();
            expect(() => childScope.assignVariable('const2', 99)).toThrow();
        });
    });
});
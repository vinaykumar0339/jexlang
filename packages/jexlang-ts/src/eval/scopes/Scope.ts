import type { JexValue } from "../../types";
import { JexLangRuntimeError } from "../errors";

export type ScopeType = 'global' | 'program' | 'block';

export class Scope {
    private parentScope: Scope | null = null;
    private variables: Map<string, JexValue>;
    private constants: Set<string>;
    private scopeType: ScopeType;

    constructor(parentScope: Scope | null = null, scopeType: ScopeType = 'program') {
        this.parentScope = parentScope;
        this.variables = new Map<string, JexValue>();
        this.constants = new Set<string>();
        this.scopeType = scopeType;
    }

    getParentScope(): Scope | null {
        return this.parentScope;
    }

    declareVariable(
        name: string, 
        value: JexValue, 
        isConst = false,
    ): void {
        const isGlobalScope = this.scopeType === 'global';
        if (this.variables.has(name) && !isGlobalScope) { // global variables can be re-declared in the global scope.
            throw new JexLangRuntimeError(`Variable '${name}' is already declared.`);
        }
        this.variables.set(name, value);
        if (isConst) {
            this.constants.add(name);
        } else if (!isConst && this.constants.has(name) && isGlobalScope) {
            // Delete from constants if re-declared as non-const for the same variable in the global scope.
            this.constants.delete(name);
        }
    }

    assignVariable(name: string, value: JexValue): void {
        const scope = this.resolveScope(name);
        if (scope) {
            if (scope.constants.has(name)) {
                throw new JexLangRuntimeError(`Variable '${name}' is a constant and cannot be re-declared or modified.`);
            }
            scope.variables.set(name, value);
        } else {
            throw new JexLangRuntimeError(`Variable '${name}' is not declared.`);
        }
    }

    getVariable(name: string): JexValue | null {
        if (this.variables.has(name)) {
            return this.variables.get(name)!;
        }
        
        // If not in this scope, check parent scope
        if (this.parentScope) {
            return this.parentScope.getVariable(name);
        }
        
        return null;
    }

    resolveScope(name: string): Scope | null {
        if (this.variables.has(name)) {
            return this;
        } else if (this.parentScope) {
            return this.parentScope.resolveScope(name);
        }
        return null;
    }

    resolveScopeByType(type: ScopeType): Scope | null {
        if (this.scopeType === type) {
            return this;
        } else if (this.parentScope) {
            return this.parentScope.resolveScopeByType(type);
        }
        return null;
    }

    hasVariable(name: string): boolean {
        return this.resolveScope(name) !== null && this.variables.has(name) !== undefined;
    }
}
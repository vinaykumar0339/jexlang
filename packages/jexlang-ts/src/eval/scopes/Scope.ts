import type { JexValue } from "../../types";

export class Scope {
    private parentScope?: Scope;
    private variables: Map<string, JexValue>;
    private constants: Set<string> = new Set<string>();

    constructor(parentScope?: Scope) {
        this.parentScope = parentScope;
        this.variables = new Map<string, JexValue>();
    }

    declareVariable(name: string, value: JexValue, isConst = false): void {
        if (this.variables.has(name)) {
            throw new Error(`Variable '${name}' is already declared.`);
        }
        if (this.constants.has(name)) {
            throw new Error(`Variable '${name}' is a constant and cannot be re-declared or modified.`);
        }
        this.variables.set(name, value);
        if (isConst) {
            this.constants.add(name);
        }
    }

    assignVariable(name: string, value: JexValue): void {
        const scope = this.resolveScope(name);
        if (scope) {
            if (scope.constants.has(name)) {
                throw new Error(`Cannot reassign constant variable '${name}'.`);
            }
            scope.variables.set(name, value);
        } else {
            throw new Error(`Variable '${name}' is not declared.`);
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

    hasVariable(name: string): boolean {
        return this.resolveScope(name) !== null && this.variables.has(name) !== undefined;
    }
}
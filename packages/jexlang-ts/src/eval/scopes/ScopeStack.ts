import type { JexValue } from "../../types";

/**
 * Represents a single scope of local variables.
 */
export class Scope {
  private variables: Map<string, JexValue> = new Map();

  constructor() {}

  /**
   * Sets a variable in the current scope
   */
  set(name: string, value: JexValue): void {
    this.variables.set(name, value);
  }

  /**
   * Gets a variable from the current scope
   */
  get(name: string): JexValue | undefined {
    return this.variables.get(name);
  }

  /**
   * Checks if a variable exists in the current scope
   */
  has(name: string): boolean {
    return this.variables.has(name);
  }
}

/**
 * Manages a stack of variable scopes for handling local variables.
 */
export class ScopeStack {
  private scopes: Scope[] = [new Scope()]; // Start with global scope

  /**
   * Pushes a new scope onto the stack
   */
  pushScope(): Scope {
    const newScope = new Scope();
    this.scopes.push(newScope);
    return newScope;
  }

  /**
   * Pops the current scope off the stack
   */
  popScope(): Scope | undefined {
    if (this.scopes.length <= 1) return undefined; // Keep at least one scope
    return this.scopes.pop();
  }

  /**
   * Gets the current scope
   */
  currentScope(): Scope {
    return this.scopes[this.scopes.length - 1];
  }

  /**
   * Sets a variable in the current scope
   */
  set(name: string, value: JexValue): void {
    this.currentScope().set(name, value);
  }

  /**
   * Gets a variable from any scope, searching from most local to most global
   */
  get(name: string): JexValue | undefined {
    // Search scopes from most local to most global
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      const scope = this.scopes[i];
      if (scope.has(name)) {
        return scope.get(name);
      }
    }
    return undefined;
  }

  /**
   * Checks if a variable exists in any scope
   */
  has(name: string): boolean {
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      if (this.scopes[i].has(name)) {
        return true;
      }
    }
    return false;
  }
}

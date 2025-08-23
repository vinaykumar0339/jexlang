
// Custom error classes
export class JexLangRuntimeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'JexLangRuntimeError';
    }
}

export class UndefinedVariableError extends JexLangRuntimeError {
    constructor(variableName: string) {
        super(`Undefined variable: ${variableName}`);
        this.name = 'UndefinedVariableError';
    }
}

export class UndefinedFunctionError extends JexLangRuntimeError {
    constructor(functionName: string) {
        super(`Undefined function: ${functionName}`);
        this.name = 'UndefinedFunctionError';
    }
}

export class DivisionByZeroError extends JexLangRuntimeError {
    constructor() {
        super('Division by zero');
        this.name = 'DivisionByZeroError';
    }
}

export class TypeMismatchError extends JexLangRuntimeError {
    constructor(operation: string, expected: string, actual: string) {
        super(`Type mismatch in ${operation}: expected ${expected}, got ${actual}`);
        this.name = 'TypeMismatchError';
    }
}
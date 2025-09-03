export type NodeType =
    | 'Program'
    | 'VarDeclaration'
    // Identifier
    | 'Identifier'
    // Literals
    | 'NumberLiteral'
    | 'StringLiteral'
    | 'BooleanLiteral'
    | 'NullLiteral'
    // Expressions
    | 'UnaryExpression'
    | 'BinaryExpression'
    | 'TernaryExpression'
    | 'ShorthandTernaryExpression'
    | 'AssignmentExpression'

export interface Statement {
    kind: NodeType;
}

export interface Program extends Statement {
    kind: 'Program';
    body: Statement[];
}

// ============= Statements =============
export interface VarDeclaration extends Statement {
    kind: 'VarDeclaration';
    name: string;
    isConstant: boolean;
    value: Expression;
}

// ============= Expressions =============
export interface Expression extends Statement {}

export interface BinaryExpression extends Expression {
    kind: 'BinaryExpression';
    left: Expression;
    right: Expression;
    operator: string;
}

export interface UnaryExpression extends Expression {
    kind: 'UnaryExpression';
    operator: string;
    value: Expression;
}

export interface AssignmentExpression extends Expression {
    kind: 'AssignmentExpression';
    left: Expression; // Why left is Expression and not Identifier? we can have more complex left-hand sides
    right: Expression;
}

export interface Identifier extends Expression {
    kind: 'Identifier';
    name: string;
}

export interface TernaryExpression extends Expression {
    kind: 'TernaryExpression';
    condition: Expression;
    trueBranch: Expression;
    falseBranch: Expression;
}

export interface ShorthandTernaryExpression extends Expression {
    kind: 'ShorthandTernaryExpression';
    condition: Expression;
    falseBranch: Expression;
}

// ==== Literal ====
export interface NumberLiteral extends Expression {
    kind: 'NumberLiteral';
    value: number;
}

export interface StringLiteral extends Expression {
    kind: 'StringLiteral';
    value: string;
}

export interface BooleanLiteral extends Expression {
    kind: 'BooleanLiteral';
    value: boolean;
}

export interface NullLiteral extends Expression {
    kind: 'NullLiteral';
    value: null;
}

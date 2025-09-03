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
    | 'BinaryExpression'

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

export interface Identifier extends Expression {
    kind: 'Identifier';
    name: string;
}

// Literal
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

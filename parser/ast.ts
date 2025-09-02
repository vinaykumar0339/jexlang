export type NodeType =
    | 'Program'
    | 'NumberLiteral'
    | 'BinaryExpression'

export interface Statement {
    kind: NodeType;
}

export interface Program extends Statement {
    kind: 'Program';
    body: Statement[];
}

export interface Expression extends Statement {}

export interface BinaryExpression extends Expression {
    kind: 'BinaryExpression';
    left: Expression;
    right: Expression;
    operator: string;
}


// Literal
export interface NumberLiteral extends Expression {
    kind: 'NumberLiteral';
    value: number;
}
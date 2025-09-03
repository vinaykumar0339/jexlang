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
    | 'ArrayLiteral'
    | 'ObjectLiteral'
    // Expressions
    | 'UnaryExpression'
    | 'BinaryExpression'
    | 'TernaryExpression'
    | 'ShorthandTernaryExpression'
    | 'AssignmentExpression'
    | 'MemberExpression'
    | 'CallExpression'
    | 'TransformExpression'

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

export interface MemberExpression extends Expression {
    kind: 'MemberExpression';
    object: Expression;
    property: Expression;
    computed: boolean; // true for obj[prop], false for obj.prop
}

export interface CallExpression extends Expression {
    kind: 'CallExpression';
    caller: Expression;
    arguments: Expression[];
}

export interface ArrayLiteral extends Expression {
    kind: 'ArrayLiteral';
    elements: Expression[];
}

export interface ObjectLiteral extends Expression {
    kind: 'ObjectLiteral';
    properties: Property[];
}

export interface Property {
    key: Expression; // Can be Identifier, StringLiteral, or computed expression
    value: Expression | null;
    computed: boolean; // true for [key]: value, false for key: value
}

export interface TransformExpression extends Expression {
    kind: 'TransformExpression';
    left: Expression;
    right: Identifier; // Transform name (must be an identifier)
}

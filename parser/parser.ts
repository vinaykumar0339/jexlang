import { ArrayLiteral, AssignmentExpression, BinaryExpression, BooleanLiteral, CallExpression, Expression, Identifier, MemberExpression, NullLiteral, NumberLiteral, ObjectLiteral, TransformExpression, Program, Property, ShorthandTernaryExpression, Statement, StringLiteral, TernaryExpression, UnaryExpression, VarDeclaration } from "./ast.ts";
import { Token, TokenType, Lexer, langRules } from "./lexer.ts";

/**
 * Precedence order for parsing expressions (From Higher to lower)
 * (High precedence means -> evaluate first)
 * (Low precedence means -> evaluate later)
 * **Which means lowest precedence calls the highest precedence functions.**
 * 1. Primary Expressions -> Highest Precedence
 *      a. Number Literals
 *      b. String Literals
 *      c. Identifiers
 *      d. Boolean Literals
 *      e. Null Literals
 *      f. Array Literals
 *      g. Object Literals
 *      h. Parenthesized Expressions "(expressions)"
 * 2. Member Access and Function Calls (obj.prop, obj[prop], func())
 * 3. Unary Operators (+, -, !, √, ++, --)
 * 4. Exponentiation Or Power and Square Root ((**, ^), √)
 * 5. Multiplication, Division, Modulo (*, /, %)
 * 6. Addition, Subtraction (+, -)
 * 7. Pipe Transform (|)
 * 8. Comparison (==, !=, <, >, <=, >=)
 * 9. Logical (&&, ||, and, or)
 * 10. Ternary (condition ? exp1 : exp2)
 * 11. Assignment (=) -> Lowest Precedence.
 */

export class Parser {
    private tokens: Token[];
    private currentIndex: number;

    constructor(source: string) {
        const lexer = new Lexer(langRules);
        const tokens = lexer.tokenize(source);
        this.tokens = tokens;
        this.currentIndex = 0;
    }

    private token(): Token {
        return this.tokens[this.currentIndex];
    }

    private consume(): Token {
        return this.tokens[this.currentIndex++];
    }

    private expect(type: TokenType, value: string): Token {
        const token = this.token();
        if (token.type === type) {
            return this.consume();
        }
        throw new Error(`Expected token '${value}', but got '${token.value}' at ${token.location.line}:${token.location.column}`);
    }

    private atEOF(): boolean {
        return this.token().type === 'EOF';
    }

    program(): Program {
        const program: Program = {
            kind: 'Program',
            body: []
        }

        // loop till we reach EOF
        while (!this.atEOF()) {
            const statement = this.statement();
            program.body.push(statement);
        }

        return program;
    }

    private statement(): Statement {
        switch (this.token().type) {
            case 'LET':
            case 'CONST':
                return this.parseVarDeclaration();
            default:
                return this.parseExpression();
        }
    }

    private parseVarDeclaration(): Statement {
        const keyword = this.token();
        const isConstant = keyword.type === 'CONST';
        this.consume(); // consume 'let' or 'const'

        const identifier = this.expect('IDENTIFIER', 'identifier').value;
        
        let value: Statement;
        if (this.token().type === 'ASSIGN') {
            this.consume(); // consume '='
            value = this.parseExpression();
        } else {
            value = { kind: 'NullLiteral', value: null } as NullLiteral;
        }

        // if the next token is a semicolon, consume it
        if (this.token().type === 'SEMICOLON') {
            this.consume();
        }

        return { kind: 'VarDeclaration', name: identifier, isConstant, value } as VarDeclaration;
    }

    private parseExpression() {
        return this.parseAssignmentExpression();
    }

    private parseUnaryExpression(): Expression {
        let left: Expression;

        if (
            this.token().type === 'NOT' ||
            this.token().type === 'SQRT' ||
            this.token().type === 'PLUS' ||
            this.token().type === 'MINUS'
        ) {
            const operator = this.token().value;
            this.consume();
            const value = this.parseUnaryExpression();
            left = { kind: 'UnaryExpression', operator, value } as UnaryExpression;
        } else {
            left = this.parseMemberExpression();
        }

        return left;
    }

    private parseMemberExpression(): Expression {
        let left = this.parsePrimaryExpression();

        while (true) {
            if (this.token().type === 'DOT') {
                this.consume(); // consume '.'
                const property = this.expect('IDENTIFIER', 'identifier');
                left = {
                    kind: 'MemberExpression',
                    object: left,
                    property: { kind: 'Identifier', name: property.value } as Identifier,
                    computed: false
                } as MemberExpression;
            } else if (this.token().type === 'LBRACKET') {
                this.consume(); // consume '['
                const property = this.parseExpression();
                this.expect('RBRACKET', ']');
                left = {
                    kind: 'MemberExpression',
                    object: left,
                    property,
                    computed: true
                } as MemberExpression;
            } else if (this.token().type === 'LPAREN') {
                this.consume(); // consume '('
                const args: Expression[] = [];
                
                if (this.token().type !== 'RPAREN') {
                    args.push(this.parseExpression());
                    while (this.token().type === 'COMMA') {
                        this.consume(); // consume ','
                        args.push(this.parseExpression());
                    }
                }
                
                this.expect('RPAREN', ')');
                left = {
                    kind: 'CallExpression',
                    caller: left,
                    arguments: args
                } as CallExpression;
            } else {
                break;
            }
        }

        return left;
    }

    private parsePowerExpression(): Expression {
        let left = this.parseUnaryExpression();

        while (this.token().type === 'POWER') {
            const operator = this.token().value;
            this.consume();
            const right = this.parseUnaryExpression();
            left = { kind: 'BinaryExpression', left, right, operator } as BinaryExpression;
        }

        return left;
    }

    private parseTernaryExpression(): Expression {
        let condition = this.parseLogicalExpression();

        // If there's no question mark, just return the logical expression
        if (this.token().type !== 'QUESTION') {
            return condition;
        }

        this.consume(); // consume '?'

        // Check for shorthand ternary (condition ? : falseBranch)
        if (this.token().type === 'COLON') {
            this.consume(); // consume ':'
            const falseBranch = this.parseExpression();
            
            // if semicolon advance the token
            if (this.token().type === 'SEMICOLON') {
                this.consume();
            }
            return { kind: 'ShorthandTernaryExpression', condition, falseBranch } as ShorthandTernaryExpression;
        }

        // Regular ternary (condition ? trueBranch : falseBranch)
        const trueBranch = this.parseExpression();
        this.expect('COLON', ':');
        const falseBranch = this.parseExpression();

        // if semicolon advance the token
        if (this.token().type === 'SEMICOLON') {
            this.consume();
        }
        return { kind: 'TernaryExpression', condition, trueBranch, falseBranch } as TernaryExpression;
    }

    private parseAssignmentExpression(): Expression {
        const left = this.parseTernaryExpression();
        if (this.token().type === 'ASSIGN') {
            this.consume(); // consume '='
            const right = this.parseAssignmentExpression(); // Right associative (Ex: (x = y = z = 30))
            return { kind: 'AssignmentExpression', left, right } as AssignmentExpression;
        }

        return left;
    }

    private parseComparisonExpression(): Expression {
        let left = this.parseTransformExpression();

        while (
            this.token().type === 'EQ' || 
            this.token().type === 'NEQ' || 
            this.token().type === 'LT' || 
            this.token().type === 'GT' || 
            this.token().type === 'LTE' ||
            this.token().type === 'GTE'
        ) {
            const operator = this.token().value;
            this.consume();
            const right = this.parseTransformExpression();
            left = { kind: 'BinaryExpression', left, right, operator } as BinaryExpression;
        }

        return left;
    }

    private parseTransformExpression(): Expression {
        let left = this.parseAdditiveExpression();

        while (this.token().type === 'PIPE') {
            this.consume(); // consume '|'
            const transform = this.expect('IDENTIFIER', 'transform identifier');
            const right = { kind: 'Identifier', name: transform.value } as Identifier;
            left = { kind: 'TransformExpression', left, right } as TransformExpression;
        }

        return left;
    }

    private parseLogicalExpression(): Expression {
        let left = this.parseComparisonExpression();

        while (this.token().type === 'AND' || this.token().type === 'OR') {
            const operator = this.token().value;
            this.consume();
            const right = this.parseComparisonExpression();
            left = { kind: 'BinaryExpression', left, right, operator } as BinaryExpression;
        }

        return left;
    }

    private parseAdditiveExpression(): Expression {
        let left = this.parseMultiplicativeExpression();

        while (this.token().type === 'PLUS' || this.token().type === 'MINUS') {
            const operator = this.token().value;
            this.consume();
            const right = this.parseMultiplicativeExpression();
            left = { kind: 'BinaryExpression', left, right, operator } as BinaryExpression;
        }

        return left;
    }

    private parseMultiplicativeExpression(): Expression {
        let left = this.parsePowerExpression();

        while (
            this.token().type === 'MULTIPLY' ||
            this.token().type === 'DIVIDE' ||
            this.token().type === 'MODULO'
        ) {
            const operator = this.token().value;
            this.consume();
            const right = this.parsePowerExpression();
            left = { kind: 'BinaryExpression', left, right, operator } as BinaryExpression;
        }

        return left;
    }

    private parsePrimaryExpression(): Expression {
        const token = this.token();
        switch (token.type) {
            case 'NUMBER': {
                this.consume();
                return { kind: 'NumberLiteral', value: parseFloat(token.value) } as NumberLiteral;
            }
            case 'STRING': {
                this.consume();
                return { kind: 'StringLiteral', value: token.value } as StringLiteral;
            }
            case 'BOOLEAN': {
                this.consume();
                return { kind: 'BooleanLiteral', value: token.value === 'true' } as BooleanLiteral;
            }
            case 'NULL': {
                this.consume();
                return { kind: 'NullLiteral', value: null } as NullLiteral;
            }
            case 'IDENTIFIER': {
                this.consume();
                return { kind: 'Identifier', name: token.value } as Identifier;
            }
            case 'LBRACKET': {
                return this.parseArrayLiteral();
            }
            case 'LBRACE': {
                return this.parseObjectLiteral();
            }
            case 'LPAREN': {
                this.consume(); // consume the LPAREN
                const expr = this.parseExpression();
                this.expect('RPAREN', ')');
                return expr;
            }
            default:
                throw new Error(`Unexpected token: ${token.value} at ${token.location.line}:${token.location.column}`);
        }
    }

    private parseArrayLiteral(): ArrayLiteral {
        this.consume(); // consume '['
        const elements: Expression[] = [];

        if (this.token().type !== 'RBRACKET') {
            elements.push(this.parseExpression());
            while (this.token().type === 'COMMA') {
                this.consume(); // consume ','
                // Allow trailing comma
                if (this.token().type === 'RBRACKET') {
                    break;
                }
                elements.push(this.parseExpression());
            }
        }

        this.expect('RBRACKET', ']');
        return { kind: 'ArrayLiteral', elements } as ArrayLiteral;
    }

    private parseObjectLiteral(): ObjectLiteral {
        this.consume(); // consume '{'
        const properties: Property[] = [];

        if (this.token().type !== 'RBRACE') {
            properties.push(this.parseProperty());
            while (this.token().type === 'COMMA') {
                this.consume(); // consume ','
                // Allow trailing comma
                if (this.token().type === 'RBRACE') {
                    break;
                }
                properties.push(this.parseProperty());
            }
        }

        this.expect('RBRACE', '}');
        return { kind: 'ObjectLiteral', properties } as ObjectLiteral;
    }

    private parseProperty(): Property {
        let key: Expression;
        let computed = false;

        if (this.token().type === 'LBRACKET') {
            // Computed property: [expression]: value
            this.consume(); // consume '['
            key = this.parseExpression();
            this.expect('RBRACKET', ']');
            computed = true;
        } else if (this.token().type === 'IDENTIFIER') {
            // Regular property: identifier: value
            const identifier = this.consume();
            key = { kind: 'Identifier', name: identifier.value } as Identifier;
        } else if (this.token().type === 'STRING') {
            // String property: "string": value
            const stringToken = this.consume();
            key = { kind: 'StringLiteral', value: stringToken.value } as StringLiteral;
        } else {
            throw new Error(`Expected property key at ${this.token().location.line}:${this.token().location.column}`);
        }

        let value: Expression | null = null;
        if (this.token().type === 'COLON') {
            this.consume(); // consume ':'
            value = this.parseExpression();
        }

        return { key, value, computed };
    }
}
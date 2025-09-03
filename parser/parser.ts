import { AssignmentExpression, BinaryExpression, BooleanLiteral, Identifier, NullLiteral, NumberLiteral, Program, Statement, StringLiteral, VarDeclaration } from "./ast.ts";
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
 *      e. Parenthesized Expressions "(expressions)"
 * 2. Multiplication, Division, Modulo (*, /, %) (same level)
 * 3. Addition, Subtraction (+, -) (same level)
 * 4. Assignment (=) -> Lowest Precedence.
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

    private parseAssignmentExpression(): Statement {
        const left = this.parseAdditiveExpression();
        if (this.token().type === 'ASSIGN') {
            this.consume(); // consume '='
            const right = this.parseAssignmentExpression(); // Right associative (Ex: (x = y = z = 30))
            return { kind: 'AssignmentExpression', left, right } as AssignmentExpression;
        }

        return left;
    }

    private parseAdditiveExpression(): Statement {
        let left = this.parseMultiplicativeExpression();

        while (this.token().type === 'PLUS' || this.token().type === 'MINUS') {
            const operator = this.token().value;
            this.consume();
            const right = this.parseMultiplicativeExpression();
            left = { kind: 'BinaryExpression', left, right, operator } as BinaryExpression;
        }

        return left;
    }

    private parseMultiplicativeExpression(): Statement {
        let left = this.parsePrimaryExpression();

        while (
            this.token().type === 'MULTIPLY' ||
            this.token().type === 'DIVIDE' ||
            this.token().type === 'MODULO'
        ) {
            const operator = this.token().value;
            this.consume();
            const right = this.parsePrimaryExpression();
            left = { kind: 'BinaryExpression', left, right, operator } as BinaryExpression;
        }

        return left;
    }

    private parsePrimaryExpression(): Statement {
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
}
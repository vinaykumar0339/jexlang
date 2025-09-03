export interface TokenLocation {
  start: number;
  end: number;
  line: number;
  column?: number;
}

export type TokenType = 
    | 'WHITESPACE'
    | 'COMMENT'
    | 'NUMBER'
    | 'LET'
    | 'CONST'
    | 'BOOLEAN'
    | 'NULL'
    | 'IDENTIFIER'
    | 'LTE'
    | 'GTE'
    | 'EQ'
    | 'NEQ'
    | 'POWER'
    | 'SQRT'
    | 'NOT'
    | 'PLUS'
    | 'MINUS'
    | 'MULTIPLY'
    | 'DIVIDE'
    | 'MODULO'
    | 'ASSIGN'
    | 'LT'
    | 'GT'
    | 'LPAREN'
    | 'RPAREN'
    | 'LBRACE'
    | 'RBRACE'
    | 'LBRACKET'
    | 'RBRACKET'
    | 'SEMICOLON'
    | 'COMMA'
    | 'DOT'
    | 'QUESTION'
    | 'COLON'
    | 'NEW_LINE'
    | 'STRING'
    | 'EOF'; // End of file/input marker

// Token type definitions
export interface Token {
  type: TokenType;
  value: string;
  location: TokenLocation;
}

export interface TokenRule {
  name: TokenType;
  pattern: RegExp;
}

export const langRules: TokenRule[] = [
    // whitespace (skip)
    { name: 'WHITESPACE', pattern: /^\s+/ },
    // comments (skip)
    { name: 'COMMENT', pattern: /\/\*[\s\S]*?\*\/|\/\/.*/ },

    // numbers
    { name: 'NUMBER', pattern: /\d+(\.\d+)?/ },

    // keywords (must come before IDENTIFIER)
    { name: 'LET', pattern: /\blet\b/ },
    { name: 'CONST', pattern: /\bconst\b/ },
    { name: 'BOOLEAN', pattern: /\b(?:true|false)\b/ },
    { name: 'NULL', pattern: /\bnull\b/ },

    // identifiers
    { name: 'IDENTIFIER', pattern: /\b[a-zA-Z_][a-zA-Z0-9_]*\b/ },

    // multi-character operators
    { name: 'LTE', pattern: /<=/ },
    { name: 'GTE', pattern: />=/ },
    { name: 'EQ', pattern: /==/ },
    { name: 'NEQ', pattern: /!=/ },
    { name: 'POWER', pattern: /(\*\*)|(\^)/ },

    // Single Character Operators
    { name: 'PLUS', pattern: /\+/ },
    { name: 'MINUS', pattern: /-/ },
    { name: 'MULTIPLY', pattern: /\*/ },
    { name: 'MODULO', pattern: /%/ },
    { name: 'DIVIDE', pattern: /\// },
    { name: 'ASSIGN', pattern: /=/ },
    { name: 'LT', pattern: /</ },
    { name: 'GT', pattern: />/ },
    { name: 'NOT', pattern: /!/ },
    { name: 'SQRT', pattern: /√/ },

    // Delimiters
    { name: 'LPAREN', pattern: /\(/ },
    { name: 'RPAREN', pattern: /\)/ },
    { name: 'LBRACE', pattern: /\{/ },
    { name: 'RBRACE', pattern: /\}/ },
    { name: 'LBRACKET', pattern: /\[/ },
    { name: 'RBRACKET', pattern: /\]/ },
    { name: 'SEMICOLON', pattern: /;/ },
    { name: 'COMMA', pattern: /,/ },
    { name: 'DOT', pattern: /\./ },
    { name: 'QUESTION', pattern: /\?/ },
    { name: 'COLON', pattern: /:/ },
    { name: 'NEW_LINE', pattern: /\n/ },

    // TODO: Need to check this as "text' and 'text" still working.
    { name: 'STRING', pattern: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/ },
];

export class Lexer {
    private combinedPattern: RegExp;
    private input: string;

    constructor(rules: TokenRule[]) {
        
        // Combine all patterns into one with named groups
        const patterns = rules.map(rule => `(?<${rule.name}>${rule.pattern.source})`);
        this.combinedPattern = new RegExp(patterns.join('|'), 'g');
        this.input = '';
    }

    private token(tokenType: TokenType, value: string, location: TokenLocation): Token {
        return { type: tokenType, value, location };
    }

    tokenize(input: string): Token[] {
        this.input = input;
        let currentLine = 1; // Track current line number
        let lastColumn = 0;

        const tokens: Token[] = [];

        let match: RegExpExecArray | null = null;
        this.combinedPattern.lastIndex = 0;

        while ((match = this.combinedPattern.exec(this.input)) !== null) {
            // Find which group matched
            const tokenType = Object.keys(match!.groups || {}).find(key => match!.groups![key] !== undefined) as (TokenType | undefined);

            if (tokenType && !this.shouldSkip(tokenType)) {
                const value = match[0];
                const startPos = match.index;
                const endPos = startPos + value.length;

                // Calculate column based on the last newline
                const lastNewlineIndex = this.input.lastIndexOf('\n', startPos - 1);
                lastColumn = lastNewlineIndex === -1 ? startPos + 1 : startPos - lastNewlineIndex;

                tokens.push(this.token(tokenType, value, {
                    start: startPos,
                    end: endPos,
                    line: currentLine,
                    column: lastColumn,
                }));
            }

            // Count newlines in the token and update line number
            const newlines = (match[0].match(/\n/g) || []).length;
            if (newlines > 0) {
                currentLine += newlines;
            }
        }

        tokens.push(this.token('EOF', '', {
            start: this.input.length,
            end: this.input.length,
            line: currentLine,
            column: lastColumn + 1,
        }));
        return tokens;
    }

    private shouldSkip(tokenType: string): boolean {
        return (
            tokenType === 'WHITESPACE' ||
            tokenType === 'COMMENT' || 
            tokenType === 'NEW_LINE'
        );
    }
};
grammar JexLang;

// Enable this when target is Java.
// @header {
//     package com.jexlang.java.grammar;
// }

// Parser Rules
program
    : statement* EOF
    ;

statement
    : expressionStatement
    | varDeclaration
    | block
    | emptyStatement
    ;

block
    : LBRACE statement* RBRACE
    ;

emptyStatement
    : SEMICOLON
    ;

varDeclaration
    : LET IDENTIFIER (ASSIGN singleExpression)? SEMICOLON?
    ;

expressionStatement
    : expressionSequence SEMICOLON?
    ;

// ===== EXPRESSIONS =====
expressionSequence
    : singleExpression (COMMA singleExpression)*
    ;

singleExpression
    // Member access and function calls (highest precedence)
    : singleExpression QUESTION? LBRACKET expressionSequence RBRACKET # MemberIndexExpression
    | singleExpression QUESTION? DOT objectPropertyName # MemberDotExpression
    | IDENTIFIER arguments # FunctionCallExpression

    // Postfix operators
    | singleExpression (INCREMENT | DECREMENT) # PostfixExpression

    // Unary operators
    | (INCREMENT | DECREMENT) singleExpression # PrefixExpression
    | (SQRT | 'sqrt') singleExpression                                              # SquareRootExpression
    | (PLUS | MINUS) singleExpression                                              # UnaryExpression

    // Exponentiation (right associative)
    | <assoc=right> singleExpression (POW | POWER) singleExpression             # PowerExpression

    // Multiplicative
    | singleExpression (MULTIPLY | DIVIDE | MODULO) singleExpression                      # MultiplicativeExpression

    // Additive
    | singleExpression (PLUS | MINUS) singleExpression                            # AdditiveExpression

    // Relational
    | singleExpression (LT | GT | LTE | GTE) singleExpression              # RelationalExpression

    // Equality
    | singleExpression (EQ | NEQ) singleExpression                          # EqualityExpression

    // Logical AND
    | singleExpression AND singleExpression # LogicalAndExpression

    // Logical OR
    | singleExpression OR singleExpression # LogicalOrExpression

    // Transform (pipe operator)
    | singleExpression PIPE IDENTIFIER # TransformExpression

    // Ternary (right associative)
    | <assoc=right> singleExpression QUESTION singleExpression COLON singleExpression # TernaryExpression
    | singleExpression QUESTION COLON singleExpression # ShortTernaryExpression

    // Assignment (right associative)
    | <assoc=right> IDENTIFIER ASSIGN singleExpression # AssignmentExpression
    | <assoc=right> singleExpression LBRACKET expressionSequence RBRACKET ASSIGN singleExpression # BracketPropertyAssignment
    | <assoc=right> singleExpression DOT objectPropertyName ASSIGN singleExpression # DotPropertyAssignment

    // Primary expressions
    | LPAREN expressionSequence RPAREN # ParenthesizedExpression
    | literal # LiteralExpression
    | IDENTIFIER # IdentifierExpression
    ;


// ===== LITERALS =====
literal
    : STRING  # StringLiteral
    | NUMBER  # NumberLiteral
    | BOOLEAN # BooleanLiteral
    | NULL    # NullLiteral
    | arrayLiteral # ArrayLiteralExpression
    | objectLiteral # ObjectLiteralExpression
    ;

arrayLiteral
    : LBRACKET (arrayElement (COMMA arrayElement)*)? RBRACKET
    ;

arrayElement
    : singleExpression
    ;

objectLiteral
    : LBRACE (objectProperty (COMMA objectProperty)*)? RBRACE
    ;

objectProperty
    : objectPropertyName COLON singleExpression #PropertyExpressionObjectProperty
    | LBRACKET singleExpression RBRACKET COLON singleExpression #ComputedPropertyExpressionObjectProperty
    | IDENTIFIER # ShorthandPropertyExpressionObjectProperty
    ;

objectPropertyName
    : IDENTIFIER
    | STRING
    | LET
    | NUMBER
    | NULL
    ;

arguments
    : LPAREN (argument (COMMA argument)* COMMA?)? RPAREN
    ;

argument
    : singleExpression
    | IDENTIFIER
    ;

// ===== LEXER RULES =====

// Keywords (must come before IDENTIFIER)
LET         : 'let' ;
BOOLEAN     : 'true' | 'false' ;
NULL        : 'null' ;

// Multi-character operators (ordered by length for proper tokenization)
INCREMENT   : '++' ;
DECREMENT   : '--' ;
POW         : '**' ;
SQRT        : '√' ;
EQ          : '==' ;
NEQ         : '!=' ;
LTE         : '<=' ;
GTE         : '>=' ;
AND         : '&&' | 'and' ;
OR          : '||' | 'or' ;

// Single character operators  
ASSIGN      : '=' ;
PLUS        : '+' ;
MINUS       : '-' ;
MULTIPLY    : '*' ;
DIVIDE      : '/' ;
MODULO      : '%' ;
POWER       : '^' ;
LT          : '<' ;
GT          : '>' ;

// Delimiters
LPAREN      : '(' ;
RPAREN      : ')' ;
LBRACE      : '{' ;
RBRACE      : '}' ;
LBRACKET    : '[' ;
RBRACKET    : ']' ;
SEMICOLON   : ';' ;
COMMA       : ',' ;
DOT         : '.' ;
PIPE        : '|' ;
QUESTION    : '?' ;
COLON       : ':' ;

// Numbers
NUMBER
    : DIGIT+ ('.' DIGIT+)? ([eE] [+-]? DIGIT+)?
    | '.' DIGIT+ ([eE] [+-]? DIGIT+)?
    ;

// Identifiers
IDENTIFIER
    : [a-zA-Z_$] [a-zA-Z0-9_$]*
    ;

// Strings
STRING
    : '"' StringChar* '"'
    | '\'' StringChar* '\''
    ;

fragment StringChar
    : ~["\\\r\n]
    | EscapeSequence
    ;

fragment EscapeSequence
    : '\\' [btnfr"'\\]
    | '\\' 'u' HexDigit HexDigit HexDigit HexDigit
    ;

fragment HexDigit
    : [0-9a-fA-F]
    ;

fragment DIGIT
    : [0-9]
    ;

// Whitespace and comments
WS
    : [ \t\r\n]+ -> skip
    ;

LINE_COMMENT
    : '//' ~[\r\n]* -> skip
    ;

BLOCK_COMMENT
    : '/*' .*? '*/' -> skip
    ;

// statement
//     : expression SEMICOLON?
//     | assignment SEMICOLON?
//     | localDeclaration SEMICOLON?
//     | propertyAssignment SEMICOLON?
//     ;

// assignment
//     : IDENTIFIER ASSIGN expression
//     ;

// propertyAssignment
//     : expression DOT IDENTIFIER ASSIGN expression               # DotPropertyAssignment
//     | expression LBRACKET expression RBRACKET ASSIGN expression # BracketPropertyAssignment
//     ;

// localDeclaration
//     : LET IDENTIFIER (ASSIGN expression)?
//     ;

// expression
//     : SQRT expression                               # SquareRootExpression
//     | MINUS expression                              # UnaryMinusExpression
//     | PLUS expression                               # UnaryPlusExpression
//     | INCREMENT expression                          # PrefixIncrementExpression
//     | DECREMENT expression                          # PrefixDecrementExpression
//     | expression INCREMENT                          # PostfixIncrementExpression
//     | expression DECREMENT                          # PostfixDecrementExpression
//     | LPAREN expression RPAREN                      # ParenthesizedExpression
//     | functionCall                                  # FunctionCallExpression
//     | expression DOT IDENTIFIER                     # DotPropertyAccessExpression
//     | expression LBRACKET expression RBRACKET       # BracketPropertyAccessExpression
//     | expression POW expression                     # PowerExpression
//     | expression (MULTIPLY | DIVIDE | MODULO) expression  # MulDivModExpression
//     | expression (PLUS | MINUS) expression          # AddSubExpression
//     | expression (EQ | NEQ | LT | GT | LTE | GTE) expression # ComparatorExpression
//     | expression AND expression                     # LogicalAndExpression
//     | expression OR expression                      # LogicalOrExpression
//     | expression PIPE IDENTIFIER                    # TransformExpression
//     | expression QUESTION expression COLON expression # TernaryExpression
//     | expression QUESTION COLON expression          # ShortTernaryExpression
//     | objectLiteral                                 # ObjectLiteralExpression
//     | arrayLiteral                                  # ArrayLiteralExpression
//     | BOOLEAN                                       # BooleanExpression
//     | IDENTIFIER                                    # VariableExpression
//     | NUMBER                                        # NumberExpression
//     | STRING                                        # StringExpression
//     ;

// objectLiteral
//     : LBRACE (objectProperty (COMMA objectProperty)*)? RBRACE
//     ;

// objectProperty
//     : (IDENTIFIER | STRING) COLON expression
//     ;

// functionCall
//     : IDENTIFIER LPAREN argumentList? RPAREN
//     ;

// argumentList
//     : expression (COMMA expression)*
//     ;

// arrayLiteral
//     : LBRACKET (expression (COMMA expression)*)? RBRACKET
//     ;

// // Lexer Rules (Tokens)

// // Math Operators
// PLUS        : '+' ;
// MINUS       : '-' ;
// MULTIPLY    : '*' ;
// DIVIDE      : '/' ;
// MODULO      : '%' ;
// POW         : '^' | '**' ;
// SQRT        : '√' | 'sqrt' ;
// INCREMENT   : '++' ;
// DECREMENT   : '--' ;

// // Assignment & Comparison
// ASSIGN      : '=' ;
// EQ          : '==' ;
// NEQ         : '!=' ;
// LT          : '<' ;
// GT          : '>' ;
// LTE         : '<=' ;
// GTE         : '>=' ;

// // Logical operators
// AND         : '&&' | 'and' ;
// OR          : '||' | 'or' ;

// // Brackets, Braces, Parentheses
// LPAREN      : '(' ;
// RPAREN      : ')' ;
// LBRACE      : '{' ;
// RBRACE      : '}' ;
// LBRACKET    : '[' ;
// RBRACKET    : ']' ;

// // Punctuation
// SEMICOLON   : ';' ;
// COMMA       : ',' ;
// DOT         : '.' ;
// PIPE        : '|' ;
// QUESTION    : '?' ;
// COLON       : ':' ;

// // Numbers (supports integers, decimals, scientific notation)
// NUMBER
//     : INTEGER_PART ('.' DIGIT+)? EXPONENT_PART?
//     | '.' DIGIT+ EXPONENT_PART?
//     ;

// fragment INTEGER_PART
//     : '0'
//     | [1-9] DIGIT*
//     ;

// fragment EXPONENT_PART
//     : [eE] [+-]? DIGIT+
//     ;

// fragment DIGIT
//     : [0-9]
//     ;

// // Keywords and constants
// BOOLEAN     : 'true' | 'false' ;
// LET         : 'let' ;

// // Identifiers (variables and function names)
// IDENTIFIER
//     : [a-zA-Z_] [a-zA-Z0-9_]*
//     ;

// // Strings (single or double quotes, supports escape sequences)
// STRING
//     : '"' ( '\\' . | ~["\\\r\n] )* '"'
//     | '\'' ( '\\' . | ~['\\\r\n] )* '\''
//     ;

// // Whitespace (ignored)
// WS
//     : [ \t\r\n]+ -> skip
//     ;

// // Comments (ignored)
// LINE_COMMENT
//     : '//' ~[\r\n]* -> skip
//     ;

// BLOCK_COMMENT
//     : '/*' .*? '*/' -> skip
//     ;
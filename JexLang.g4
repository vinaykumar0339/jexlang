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
    : GLOBAL? (LET | CONST) IDENTIFIER (ASSIGN singleExpression)? SEMICOLON?
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

    // Updated if expression to support full if-else-if-else chain pattern
    | IF LPAREN expressionSequence RPAREN block elseIfStatement? # IfExpression

    // Repeat expression
    | REPEAT LPAREN expressionSequence RPAREN block # RepeatExpression

    // Primary expressions
    | LPAREN expressionSequence RPAREN # ParenthesizedExpression
    | literal # LiteralExpression
    | IDENTIFIER # IdentifierExpression
;

elseIfStatement
    : ELSE IF LPAREN expressionSequence RPAREN block elseIfStatement?  # ElseIfClause
    | ELSE block                                                       # ElseClause
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
CONST       : 'const' ;
GLOBAL      : 'global' ;
BOOLEAN     : 'true' | 'false' ;
NULL        : 'null' ;
REPEAT      : 'repeat' ;
IF          : 'if' ;
ELSE        : 'else' ;

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
grammar JexLang;

// Parser Rules
program
    : statement* EOF
    ;

statement
    : expression SEMICOLON?
    | assignment SEMICOLON?
    | propertyAssignment SEMICOLON?
    ;

assignment
    : IDENTIFIER ASSIGN expression
    ;

propertyAssignment
    : expression DOT IDENTIFIER ASSIGN expression               # DotPropertyAssignment
    | expression LBRACKET expression RBRACKET ASSIGN expression # BracketPropertyAssignment
    ;

expression
    : expression POW expression                     # PowerExpression
    | MINUS expression                              # UnaryMinusExpression
    | PLUS expression                               # UnaryPlusExpression
    | expression (MULTIPLY | DIVIDE | MODULO) expression  # MulDivModExpression
    | expression (PLUS | MINUS) expression         # AddSubExpression
    | expression (EQ | NEQ | LT | GT | LTE | GTE) expression # ComparatorExpression
    | LPAREN expression RPAREN                     # ParenthesizedExpression
    | functionCall                                 # FunctionCallExpression
    | expression DOT IDENTIFIER                    # DotPropertyAccessExpression
    | expression LBRACKET expression RBRACKET      # BracketPropertyAccessExpression
    | expression QUESTION expression COLON expression # TernaryExpression
    | expression QUESTION COLON expression         # ShortTernaryExpression
    | objectLiteral                                # ObjectLiteralExpression
    | arrayLiteral                                 # ArrayLiteralExpression
    | BOOLEAN                                      # BooleanExpression
    | IDENTIFIER                                   # VariableExpression
    | NUMBER                                       # NumberExpression
    | STRING                                       # StringExpression
    ;

objectLiteral
    : LBRACE (objectProperty (COMMA objectProperty)*)? RBRACE
    ;

objectProperty
    : (IDENTIFIER | STRING) COLON expression
    ;

functionCall
    : IDENTIFIER LPAREN argumentList? RPAREN
    ;

argumentList
    : expression (COMMA expression)*
    ;

arrayLiteral
    : LBRACKET (expression (COMMA expression)*)? RBRACKET
    ;

// Lexer Rules (Tokens)

// Math Operators
PLUS        : '+' ;
MINUS       : '-' ;
MULTIPLY    : '*' ;
DIVIDE      : '/' ;
MODULO      : '%' ;
POW         : '^' | '**' ;

// Assignment
ASSIGN      : '=' ;

// Parentheses
LPAREN      : '(' ;
RPAREN      : ')' ;

// Punctuation
SEMICOLON   : ';' ;
COMMA       : ',' ;

// Numbers (supports integers, decimals, scientific notation)
NUMBER
    : INTEGER_PART ('.' DIGIT+)? EXPONENT_PART?
    | '.' DIGIT+ EXPONENT_PART?
    ;

fragment INTEGER_PART
    : '0'
    | [1-9] DIGIT*
    ;

fragment EXPONENT_PART
    : [eE] [+-]? DIGIT+
    ;

fragment DIGIT
    : [0-9]
    ;

BOOLEAN
    : 'true'
    | 'false'
    ;

// Identifiers (variables and function names)
IDENTIFIER
    : [a-zA-Z_] [a-zA-Z0-9_]*
    ;

// Strings (single or double quotes, supports escape sequences)
STRING
    : '"' ( '\\' . | ~["\\\r\n] )* '"'
    | '\'' ( '\\' . | ~['\\\r\n] )* '\''
    ;

// Whitespace (ignored)
WS
    : [ \t\r\n]+ -> skip
    ;

// Comments (ignored)
LINE_COMMENT
    : '//' ~[\r\n]* -> skip
    ;

BLOCK_COMMENT
    : '/*' .*? '*/' -> skip
    ;

DOT         : '.' ;
LBRACKET    : '[' ;
RBRACKET    : ']'  ;

LBRACE      : '{' ;
RBRACE      : '}'  ;

QUESTION    : '?' ;
COLON       : ':'  ;

EQ          : '==' ;
NEQ         : '!=' ;
LT          : '<' ;
GT          : '>' ;
LTE         : '<=' ;
GTE         : '>='  ;
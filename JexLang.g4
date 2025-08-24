grammar JexLang;

// Parser Rules
program
    : statement* EOF
    ;

statement
    : expression SEMICOLON?
    | assignment SEMICOLON?
    | localDeclaration SEMICOLON?
    | propertyAssignment SEMICOLON?
    ;

assignment
    : IDENTIFIER ASSIGN expression
    ;

propertyAssignment
    : expression DOT IDENTIFIER ASSIGN expression               # DotPropertyAssignment
    | expression LBRACKET expression RBRACKET ASSIGN expression # BracketPropertyAssignment
    ;

localDeclaration
    : LET IDENTIFIER ASSIGN expression
    ;

expression
    : expression POW expression                     # PowerExpression
    | SQRT expression                               # SquareRootExpression
    | MINUS expression                              # UnaryMinusExpression
    | PLUS expression                               # UnaryPlusExpression
    | expression (MULTIPLY | DIVIDE | MODULO) expression  # MulDivModExpression
    | expression (PLUS | MINUS) expression         # AddSubExpression
    | expression (EQ | NEQ | LT | GT | LTE | GTE) expression # ComparatorExpression
    | expression AND expression                    # LogicalAndExpression
    | expression OR expression                     # LogicalOrExpression
    | expression PIPE IDENTIFIER                    # TransformExpression
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
SQRT        : '√' | 'sqrt' ;

// Assignment & Comparison
ASSIGN      : '=' ;
EQ          : '==' ;
NEQ         : '!=' ;
LT          : '<' ;
GT          : '>' ;
LTE         : '<=' ;
GTE         : '>=' ;

// Logical operators
AND         : '&&' | 'and' ;
OR          : '||' | 'or' ;

// Brackets, Braces, Parentheses
LPAREN      : '(' ;
RPAREN      : ')' ;
LBRACE      : '{' ;
RBRACE      : '}' ;
LBRACKET    : '[' ;
RBRACKET    : ']' ;

// Punctuation
SEMICOLON   : ';' ;
COMMA       : ',' ;
DOT         : '.' ;
PIPE        : '|' ;
QUESTION    : '?' ;
COLON       : ':' ;

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

// Keywords and constants
BOOLEAN     : 'true' | 'false' ;
LET         : 'let' ;

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
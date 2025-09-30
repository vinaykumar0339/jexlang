import * as monaco from 'monaco-editor';

export const JEX_LANGUAGE_ID = 'jexlang';

const monarch: monaco.languages.IMonarchLanguage = {
    defaultToken: "",
    tokenPostfix: ".jex",
    keywords: [
        'global', 'let', 'const', 'true', 'false', 'and', 'or', 'sqrt', 
        'if', 'else', 'repeat', 'null'
    ],
    controlKeywords: [
        'if', 'else', 'repeat'
    ],
    operators: [
        '+', '-', '*', '/', '%', '^', '**', '√', 'sqrt', '++', '--',
        '=', '==', '!=', '<', '>', '<=', '>=',
        '&&', '||', 'and', 'or',
        '|', '?', ':'
    ],
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    
    tokenizer: {
        root: [
            // Comments
            [/\/\/.*$/, "comment"],
            [/\/\*/, "comment", "@comment"],
            
            // Strings
            [/"([^"\\]|\\.)*$/, 'string.invalid'],  // Non-terminated string
            [/'([^'\\]|\\.)*$/, 'string.invalid'],  // Non-terminated string
            [/"/, 'string', '@string_double'],
            [/'/, 'string', '@string_single'],
            
            // Numbers
            [/\d+(\.\d+)?([eE][+\-]?\d+)?/, "number"],
            
            // Brackets and delimiters
            [/[{}()\[\]]/, "@brackets"],
            [/[;,.]/, "delimiter"],
            
            // Identifiers and keywords
            [/[a-zA-Z_][\w$]*/, {
                cases: {
                    '@controlKeywords': 'keyword.control',
                    '@keywords': 'keyword',
                    '$index': 'variable.predefined',
                    '$it': 'variable.predefined',
                    '$key': 'variable.predefined',
                    '$value': 'variable.predefined',
                    '@default': 'identifier'
                }
            }],
            
            // Operators
            [/@symbols/, {
                cases: {
                    '@operators': 'operator',
                    '@default': 'delimiter'
                }
            }],
            
            // Whitespace
            [/\s+/, "white"]
        ],
        
        comment: [
            [/[^\/*]+/, 'comment'],
            [/\*\//, 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],
        
        string_double: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, 'string', '@pop']
        ],
        
        string_single: [
            [/[^\\']+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/'/, 'string', '@pop']
        ]
    }
};

// Add indentation rules to improve auto-indentation for if statements and repeat loops
const languageConfiguration: monaco.languages.LanguageConfiguration = {
    comments: {
        lineComment: "//",
        blockComment: ["/*", "*/"]
    },
    brackets: [
        ["(", ")"],
        ["[", "]"],
        ["{", "}"]
    ],
    autoClosingPairs: [
        { open: "(", close: ")" },
        { open: "[", close: "]" },
        { open: "{", close: "}" },
        { open: "\"", close: "\"", notIn: ["string"] },
        { open: "'", close: "'", notIn: ["string"] },
        { open: "/*", close: "*/", notIn: ["string"] }
    ],
    surroundingPairs: [
        { open: "(", close: ")" },
        { open: "[", close: "]" },
        { open: "{", close: "}" },
        { open: "\"", close: "\"" },
        { open: "'", close: "'" }
    ],
    wordPattern: /[a-zA-Z_][a-zA-Z0-9_]*/,
    
    // Add indentation rules for control structures
    indentationRules: {
        increaseIndentPattern: /^\s*(if|else|repeat)\b[^{;]*{\s*$/,
        decreaseIndentPattern: /^\s*}/
    },
    
    // Enhance bracket matching to better support if/else/repeat blocks
    onEnterRules: [
        {
            // After an opening brace of a block, increase indentation
            beforeText: /^\s*(if|else|repeat)\b[^{;]*{\s*$/,
            action: { indentAction: monaco.languages.IndentAction.Indent }
        },
        {
            // After any opening brace, increase indentation
            beforeText: /^\s*{$/,
            action: { indentAction: monaco.languages.IndentAction.Indent }
        },
        {
            // When writing a closing brace, maintain indentation
            beforeText: /^\s*}$/,
            action: { indentAction: monaco.languages.IndentAction.None }
        }
    ],
};

export function registerJexLangLanguage(m = monaco) {
    m.languages.register({ id: JEX_LANGUAGE_ID });
    m.languages.setMonarchTokensProvider(JEX_LANGUAGE_ID, monarch);
    m.languages.setLanguageConfiguration(JEX_LANGUAGE_ID, languageConfiguration);
}

// Export the language configuration for use in other modules
export { languageConfiguration };
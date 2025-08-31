import * as monaco from 'monaco-editor';

export const JEX_LANGUAGE_ID = 'jexlang';


const monarch: monaco.languages.IMonarchLanguage = {
    defaultToken: "",
    tokenPostfix: ".jex",
    keywords: ['global', 'let', 'const', 'true', 'false', 'and', 'or', 'sqrt'],
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
                    '@keywords': 'keyword',
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
}

export function registerJexLang(m = monaco) {
    m.languages.register({ id: JEX_LANGUAGE_ID });
    m.languages.setMonarchTokensProvider(JEX_LANGUAGE_ID, monarch);
    m.languages.setLanguageConfiguration(JEX_LANGUAGE_ID, languageConfiguration);
}
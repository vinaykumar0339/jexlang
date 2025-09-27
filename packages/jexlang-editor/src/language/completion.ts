import * as monaco from 'monaco-editor';
import { JEX_LANGUAGE_ID } from './jexlang-language';

const GLOBAL_VARIABLES: monaco.languages.CompletionItem[] = [
  {
    label: 'PI',
    kind: monaco.languages.CompletionItemKind.Variable,
    detail: 'Mathematical constant',
    documentation: 'Represents the ratio of a circle\'s circumference to its diameter',
    insertText: 'PI',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: 'E',
    kind: monaco.languages.CompletionItemKind.Variable,
    detail: 'Mathematical constant',
    documentation: 'Represents the base of the natural logarithm',
    insertText: 'E',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: "LN2",
    kind: monaco.languages.CompletionItemKind.Variable,
    detail: "Mathematical constant",
    documentation: "Represents the natural logarithm of 2 (≈ 0.693)",
    insertText: "LN2",
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: "LN10",
    kind: monaco.languages.CompletionItemKind.Variable,
    detail: "Mathematical constant",
    documentation: "Represents the natural logarithm of 10 (≈ 2.302)",
    insertText: "LN10",
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: "LOG2E",
    kind: monaco.languages.CompletionItemKind.Variable,
    detail: "Mathematical constant",
    documentation: "Represents the base-2 logarithm of E (≈ 1.442)",
    insertText: "LOG2E",
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: "LOG10E",
    kind: monaco.languages.CompletionItemKind.Variable,
    detail: "Mathematical constant",
    documentation: "Represents the base-10 logarithm of E (≈ 0.434)",
    insertText: "LOG10E",
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: "SQRT1_2",
    kind: monaco.languages.CompletionItemKind.Variable,
    detail: "Mathematical constant",
    documentation: "Represents the square root of 1/2 (≈ 0.707)",
    insertText: "SQRT1_2",
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: "SQRT2",
    kind: monaco.languages.CompletionItemKind.Variable,
    detail: "Mathematical constant",
    documentation: "Represents the square root of 2 (≈ 1.414)",
    insertText: "SQRT2",
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  }
];

// Keywords based on JexLang grammar
const JEX_KEYWORDS: monaco.languages.CompletionItem[] = [
  { 
    label: 'let', 
    kind: monaco.languages.CompletionItemKind.Keyword, detail: 'Let Variable declaration',
    documentation: 'Declares a new let variable',
    insertText: 'let',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'const', 
    kind: monaco.languages.CompletionItemKind.Keyword, detail: 'Const Variable declaration',
    documentation: 'Declares a new const variable',
    insertText: 'const',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'global', 
    kind: monaco.languages.CompletionItemKind.Keyword, detail: 'Global Let Variable declaration',
    documentation: 'Declares a new global variable',
    insertText: 'global let',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'global', 
    kind: monaco.languages.CompletionItemKind.Keyword, detail: 'Global var Variable declaration',
    documentation: 'Declares a new global const variable',
    insertText: 'global const',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'true', 
    kind: monaco.languages.CompletionItemKind.Keyword, detail: 'Boolean literal',
    documentation: 'Represents the boolean value true',
    insertText: 'true',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'false', 
    kind: monaco.languages.CompletionItemKind.Keyword, detail: 'Boolean literal',
    documentation: 'Represents the boolean value false',
    insertText: 'false',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: 'null',
    kind: monaco.languages.CompletionItemKind.Keyword,
    detail: 'Null literal',
    documentation: 'Represents the null value',
    insertText: 'null',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'if', 
    kind: monaco.languages.CompletionItemKind.Keyword, 
    detail: 'If conditional statement',
    documentation: 'Executes a block of code if the condition is true',
    insertText: 'if',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'else', 
    kind: monaco.languages.CompletionItemKind.Keyword, 
    detail: 'Else conditional statement',
    documentation: 'Executes a block of code if the condition is false',
    insertText: 'else',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'repeat', 
    kind: monaco.languages.CompletionItemKind.Keyword, 
    detail: 'Repeat loop statement',
    documentation: 'Executes a block of code multiple times based on the iterable',
    insertText: 'repeat',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
];

// Operators
const JEX_OPERATORS: monaco.languages.CompletionItem[] = [
  { label: '+', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Addition operator', insertText: '+', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range: new monaco.Range(1, 1, 1, 1) },
  { label: '-', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Subtraction operator', insertText: '-', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range: new monaco.Range(1, 1, 1, 1) },
  { label: '*', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Multiplication operator', insertText: '*', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range: new monaco.Range(1, 1, 1, 1) },
  { label: '/', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Division operator', insertText: '/', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range: new monaco.Range(1, 1, 1, 1) },
  { label: '%', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Modulo operator', insertText: '%', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range: new monaco.Range(1, 1, 1, 1) },
  { label: '^', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Power operator', insertText: '^', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range: new monaco.Range(1, 1, 1, 1) },
  { label: '**', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Power operator', insertText: '**', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range: new monaco.Range(1, 1, 1, 1) },
  { label: '==', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Equality operator', insertText: '==', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range: new monaco.Range(1, 1, 1, 1) },
  { label: '!=', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Inequality operator', insertText: '!=', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range: new monaco.Range(1, 1, 1, 1) },
  { label: '<', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Less than operator', insertText: '<', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range: new monaco.Range(1, 1, 1, 1) },
  { label: '>', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Greater than operator', insertText: '>', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range: new monaco.Range(1, 1, 1, 1) },
  { label: '<=', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Less than or equal operator', insertText: '<=', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range: new monaco.Range(1, 1, 1, 1) },
  { label: '>=', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Greater than or equal operator', insertText: '>=', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range: new monaco.Range(1, 1, 1, 1) },
  { label: '&&', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Logical AND operator', insertText: '&&', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range: new monaco.Range(1, 1, 1, 1) },
  { label: '||', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Logical OR operator', insertText: '||', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range: new monaco.Range(1, 1, 1, 1) },
  { label: 'and', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Logical AND operator', insertText: 'and', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range: new monaco.Range(1, 1, 1, 1) },
  { label: 'or', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Logical OR operator', insertText: 'or', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range: new monaco.Range(1, 1, 1, 1) },
];

// Functions from builtin.ts
const JEX_FUNCTIONS: monaco.languages.CompletionItem[] = [
  // Math functions
  { 
    label: 'abs', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the absolute value of a number',
    insertText: 'abs(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'ceil', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Rounds a number up to the next largest integer',
    insertText: 'ceil(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'floor', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Rounds a number down to the nearest integer',
    insertText: 'floor(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'round', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Rounds a number to the nearest integer',
    insertText: 'round(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'trunc', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the integer part of a number',
    insertText: 'trunc(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  
  // Trigonometric functions
  { 
    label: 'sin', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the sine of a number',
    insertText: 'sin(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'cos', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the cosine of a number',
    insertText: 'cos(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'tan', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the tangent of a number',
    insertText: 'tan(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'asin', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the arcsine of a number',
    insertText: 'asin(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'acos', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the arccosine of a number',
    insertText: 'acos(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'atan', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the arctangent of a number',
    insertText: 'atan(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'atan2', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the arctangent of the quotient of its arguments',
    insertText: 'atan2(${1:y}, ${2:x})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  
  // Exponential and logarithmic functions
  { 
    label: 'exp', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns e raised to the power of a number',
    insertText: 'exp(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'log', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the natural logarithm of a number',
    insertText: 'log(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'log10', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the base-10 logarithm of a number',
    insertText: 'log10(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'log2', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the base-2 logarithm of a number',
    insertText: 'log2(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'sqrt', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the square root of a number',
    insertText: 'sqrt(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'cbrt', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the cube root of a number',
    insertText: 'cbrt(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  
  // Hyperbolic functions
  { 
    label: 'sinh', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the hyperbolic sine of a number',
    insertText: 'sinh(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'cosh', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the hyperbolic cosine of a number',
    insertText: 'cosh(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'tanh', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the hyperbolic tangent of a number',
    insertText: 'tanh(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'asinh', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the inverse hyperbolic sine of a number',
    insertText: 'asinh(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'acosh', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the inverse hyperbolic cosine of a number',
    insertText: 'acosh(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'atanh', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the inverse hyperbolic tangent of a number',
    insertText: 'atanh(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  
  // Utility functions
  { 
    label: 'min', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the smallest of zero or more numbers',
    insertText: 'min(${1:values})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'max', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the largest of zero or more numbers',
    insertText: 'max(${1:values})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'pow', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns base to the exponent power',
    insertText: 'pow(${1:base}, ${2:exponent})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'random', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns a random number between 0 and 1',
    insertText: 'random()', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'sign', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the sign of a number',
    insertText: 'sign(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  
  // Custom math functions
  { 
    label: 'deg', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Converts radians to degrees',
    insertText: 'deg(${1:radians})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'rad', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Converts degrees to radians',
    insertText: 'rad(${1:degrees})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'clamp', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Clamps a value between min and max',
    insertText: 'clamp(${1:value}, ${2:min}, ${3:max})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'lerp', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Linear interpolation between two values',
    insertText: 'lerp(${1:a}, ${2:b}, ${3:t})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  
  // Type conversion functions
  { 
    label: 'number', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Converts a value to a number',
    insertText: 'number(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'string', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Converts a value to a string',
    insertText: 'string(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'boolean', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Converts a value to a boolean',
    insertText: 'boolean(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: 'int',
    kind: monaco.languages.CompletionItemKind.Function,
    detail: 'Converts a value to an integer',
    insertText: 'int(${1:value})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: 'float',
    kind: monaco.languages.CompletionItemKind.Function,
    detail: 'Converts a value to a float',
    insertText: 'float(${1:value})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: 'double',
    kind: monaco.languages.CompletionItemKind.Function,
    detail: 'Converts a value to a double',
    insertText: 'double(${1:value})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  
  // String functions
  { 
    label: 'length', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the length of a string or array',
    insertText: 'length(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'upper', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Converts a string to uppercase',
    insertText: 'upper(${1:string})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'lower', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Converts a string to lowercase',
    insertText: 'lower(${1:string})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'trim', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Removes whitespace from both ends of a string',
    insertText: 'trim(${1:string})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  
  // Array functions
  { 
    label: 'array', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Creates an array from the arguments',
    insertText: 'array(${1:items})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'first', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the first element of an array',
    insertText: 'first(${1:array})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: 'push',
    kind: monaco.languages.CompletionItemKind.Function,
    detail: 'Adds one or more elements to the end of an array and returns the new length of the array',
    insertText: 'push(${1:array}, ${2:element1}, ${3:element2}, ...)',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: 'pop',
    kind: monaco.languages.CompletionItemKind.Function,
    detail: 'Removes the last element from an array and returns it',
    insertText: 'pop(${1:array}, ${2:element}, ...)',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: 'last',
    kind: monaco.languages.CompletionItemKind.Function,
    detail: 'Returns the last element of an array',
    insertText: 'last(${1:array})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'sum', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the sum of all elements in an array',
    insertText: 'sum(${1:array})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'avg', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the average of all elements in an array',
    insertText: 'avg(${1:array})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  }
];

// Transforms from builtin.ts
const JEX_TRANSFORMS: monaco.languages.CompletionItem[] = [
  { 
    label: 'upper', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Converts a string to uppercase',
    insertText: '| upper', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'lower', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Converts a string to lowercase',
    insertText: '| lower', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'capitalize', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Capitalizes each word in a string',
    insertText: '| capitalize', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'trim', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Removes whitespace from both ends of a string',
    insertText: '| trim', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'abs', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Returns the absolute value of a number',
    insertText: '| abs', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'floor', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Rounds down to the nearest integer',
    insertText: '| floor', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'ceil', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Rounds up to the nearest integer',
    insertText: '| ceil', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'round', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Rounds to the nearest integer',
    insertText: '| round', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'length', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Returns the length of a string, array, or object',
    insertText: '| length', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'number', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Converts a value to a number',
    insertText: '| number', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'string', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Converts a value to a string',
    insertText: '| string', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'boolean', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Converts a value to a boolean',
    insertText: '| boolean', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: 'int',
    kind: monaco.languages.CompletionItemKind.Function,
    detail: 'Transform: Converts a value to an integer',
    insertText: '| int',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: 'float',
    kind: monaco.languages.CompletionItemKind.Function,
    detail: 'Transform: Converts a value to a float',
    insertText: '| float',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: 'double',
    kind: monaco.languages.CompletionItemKind.Function,
    detail: 'Transform: Converts a value to a double',
    insertText: '| double',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  }
];

// Snippets for common patterns
const JEX_SNIPPETS: monaco.languages.CompletionItem[] = [
  { 
    label: 'let-declaration', 
    kind: monaco.languages.CompletionItemKind.Snippet, 
    detail: 'Let Variable declaration',
    insertText: 'let ${1:name} = ${2:value};',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'global-let-declaration', 
    kind: monaco.languages.CompletionItemKind.Snippet, 
    detail: 'Global Let Variable declaration',
    insertText: 'global let ${1:name} = ${2:value};',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'const-declaration', 
    kind: monaco.languages.CompletionItemKind.Snippet, 
    detail: 'Const Variable declaration',
    insertText: 'const ${1:name} = ${2:value};',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'global-const-declaration', 
    kind: monaco.languages.CompletionItemKind.Snippet, 
    detail: 'Global Const Variable declaration',
    insertText: 'global const ${1:name} = ${2:value};',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'object-literal', 
    kind: monaco.languages.CompletionItemKind.Snippet, 
    detail: 'Object literal',
    insertText: '{\n\t${1:key}: ${2:value}${3:,}\n}',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'array-literal', 
    kind: monaco.languages.CompletionItemKind.Snippet, 
    detail: 'Array literal',
    insertText: '[${1:item1}, ${2:item2}]',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'ternary', 
    kind: monaco.languages.CompletionItemKind.Snippet, 
    detail: 'Ternary expression',
    insertText: '${1:condition} ? ${2:trueValue} : ${3:falseValue}',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  {
    label: 'short-ternary',
    kind: monaco.languages.CompletionItemKind.Snippet,
    detail: 'Short ternary expression',
    insertText: '${1:condition} ?: ${2:default}',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'if-statement', 
    kind: monaco.languages.CompletionItemKind.Snippet, 
    detail: 'If statement',
    insertText: 'if (${1:condition}) {\n\t${2}\n}',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'if-else-statement', 
    kind: monaco.languages.CompletionItemKind.Snippet, 
    detail: 'If-else statement',
    insertText: 'if (${1:condition}) {\n\t${2}\n} else {\n\t${3}\n}',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'if-else-if-statement', 
    kind: monaco.languages.CompletionItemKind.Snippet, 
    detail: 'If-else-if-else statement',
    insertText: 'if (${1:condition1}) {\n\t${2}\n} else if (${3:condition2}) {\n\t${4}\n} else {\n\t${5}\n}',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'repeat-loop', 
    kind: monaco.languages.CompletionItemKind.Snippet, 
    detail: 'Repeat loop',
    insertText: 'repeat (${1:count}) {\n\t${2}\n}',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'repeat-array', 
    kind: monaco.languages.CompletionItemKind.Snippet, 
    detail: 'Repeat over array',
    insertText: 'repeat (${1:array}) {\n\t// Access elements with $it and index with $index\n\t${2}\n}',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
  { 
    label: 'repeat-object', 
    kind: monaco.languages.CompletionItemKind.Snippet, 
    detail: 'Repeat over object',
    insertText: 'repeat (${1:object}) {\n\t// Access keys with $key, values with $value or $it\n\t${2}\n}',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: new monaco.Range(1, 1, 1, 1)
  },
];

// Transform pipe snippet
JEX_SNIPPETS.push({
  label: 'pipe-transform',
  kind: monaco.languages.CompletionItemKind.Snippet,
  detail: 'Pipe expression to transform',
  insertText: '${1:expression} | ${2:transform}',
  insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
  range: new monaco.Range(1, 1, 1, 1)
});

/**
 * Register completion item provider for JexLang
 */
export function registerCompletionItemProvider(m = monaco) {
  m.languages.registerCompletionItemProvider(JEX_LANGUAGE_ID, {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };
      
      // Get the text before the current position
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: 1,
        endColumn: position.column
      });

      // Get the text before the current word being typed
      let textBeforeWord = textUntilPosition;
      if (word.word.length > 0) {
        textBeforeWord = textUntilPosition.substring(0, textUntilPosition.length - word.word.length);
      }
      
      // Check if the word being typed is immediately preceded by a pipe
      const isPipeBeforeWord = /\|\s*$/.test(textBeforeWord);

      // Get the line content for additional context
      const lineContent = model.getLineContent(position.lineNumber);
      
      // Find the last pipe character in the line before current position
      let lastPipeIndex = textUntilPosition.lastIndexOf('|');
      
      // Check if the pipe is not part of "||" (OR operator)
      const isNotLogicalOr = lastPipeIndex > 0 && 
                             textUntilPosition.charAt(lastPipeIndex - 1) !== '|' && 
                             (lastPipeIndex + 1 >= textUntilPosition.length || 
                              textUntilPosition.charAt(lastPipeIndex + 1) !== '|');
      
      // Combined condition: either the word is immediately after a pipe
      // or there's a pipe in the text that's not part of "||"
      const isPipeContext = isPipeBeforeWord || (lastPipeIndex >= 0 && isNotLogicalOr);
      
      // Special case for strings: don't activate in strings
      const textBeforePipe = lastPipeIndex > 0 ? textUntilPosition.substring(0, lastPipeIndex) : "";
      const openQuotes = (textBeforePipe.match(/'/g) || []).length + 
                         (textBeforePipe.match(/"/g) || []).length + 
                         (textBeforePipe.match(/`/g) || []).length;
      const isInString = openQuotes % 2 !== 0;

      // Determine which suggestions to show
      let suggestions: any[] = [];
      
      if (isPipeContext && !isInString) {
        // After a pipe, only show transforms
        suggestions = [...JEX_TRANSFORMS];
        
        // Add visual indicators in the completion list labels but REMOVE pipe from insertText
        suggestions = suggestions.map(item => ({
          ...item,
          label: `→ ${item.label}`,
          detail: `Transform: ${item.detail.replace('Transform: ', '')}`,
          // Remove the pipe character from insertText since we're already after a pipe
          insertText: item.insertText.replace(/^\|\s*/, '')
        }));
        
        // For pipe context, use a more specific range from after the pipe symbol
        if (lastPipeIndex >= 0) {
          // Find the start position right after the pipe and any whitespace
          let pipeStartColumn = lastPipeIndex + 2; // +1 for the pipe, +1 for 1-based indexing
          
          // Skip whitespace after pipe
          while (pipeStartColumn <= position.column && 
                 /\s/.test(lineContent.charAt(pipeStartColumn - 1))) {
            pipeStartColumn++;
          }
          
          // Update the range for all suggestions
          const pipeRange = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: pipeStartColumn,
            endColumn: position.column
          };
          
          // Apply this range to all suggestions
          suggestions = suggestions.map(item => ({
            ...item,
            range: pipeRange,
            kind: monaco.languages.CompletionItemKind.Operator,
            sortText: '0' + item.label
          }));
          
          // Return directly with the mapped suggestions
          return { 
            suggestions: [
              ...GLOBAL_VARIABLES,
              ...suggestions,
            ]
          };
        }
      } else {
        // Normal context, show all suggestions
        suggestions = [
          ...GLOBAL_VARIABLES,
          ...JEX_KEYWORDS,
          ...JEX_OPERATORS,
          ...JEX_FUNCTIONS,
          ...JEX_SNIPPETS
        ];
      }

      // Map the remaining suggestions with the standard range
      return {
        suggestions: suggestions.map(item => ({
          ...item,
          range
        }))
      };
    }
  });
}

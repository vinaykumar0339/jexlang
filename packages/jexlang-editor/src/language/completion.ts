import * as monaco from 'monaco-editor';
import { JEX_LANGUAGE_ID } from './jexlang-language';

// Keywords based on JexLang grammar
const JEX_KEYWORDS = [
  { label: 'let', kind: monaco.languages.CompletionItemKind.Keyword, detail: 'Variable declaration' },
  { label: 'true', kind: monaco.languages.CompletionItemKind.Keyword, detail: 'Boolean literal' },
  { label: 'false', kind: monaco.languages.CompletionItemKind.Keyword, detail: 'Boolean literal' },
];

// Operators
const JEX_OPERATORS = [
  { label: '+', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Addition operator' },
  { label: '-', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Subtraction operator' },
  { label: '*', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Multiplication operator' },
  { label: '/', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Division operator' },
  { label: '%', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Modulo operator' },
  { label: '^', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Power operator' },
  { label: '**', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Power operator' },
  { label: '==', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Equality operator' },
  { label: '!=', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Inequality operator' },
  { label: '<', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Less than operator' },
  { label: '>', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Greater than operator' },
  { label: '<=', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Less than or equal operator' },
  { label: '>=', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Greater than or equal operator' },
  { label: '&&', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Logical AND operator' },
  { label: '||', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Logical OR operator' },
  { label: 'and', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Logical AND operator' },
  { label: 'or', kind: monaco.languages.CompletionItemKind.Operator, detail: 'Logical OR operator' },
];

// Functions from builtin.ts
const JEX_FUNCTIONS = [
  // Math functions
  { 
    label: 'abs', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the absolute value of a number',
    insertText: 'abs(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'ceil', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Rounds a number up to the next largest integer',
    insertText: 'ceil(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'floor', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Rounds a number down to the nearest integer',
    insertText: 'floor(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'round', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Rounds a number to the nearest integer',
    insertText: 'round(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'trunc', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the integer part of a number',
    insertText: 'trunc(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  
  // Trigonometric functions
  { 
    label: 'sin', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the sine of a number',
    insertText: 'sin(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'cos', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the cosine of a number',
    insertText: 'cos(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'tan', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the tangent of a number',
    insertText: 'tan(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'asin', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the arcsine of a number',
    insertText: 'asin(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'acos', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the arccosine of a number',
    insertText: 'acos(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'atan', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the arctangent of a number',
    insertText: 'atan(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'atan2', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the arctangent of the quotient of its arguments',
    insertText: 'atan2(${1:y}, ${2:x})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  
  // Exponential and logarithmic functions
  { 
    label: 'exp', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns e raised to the power of a number',
    insertText: 'exp(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'log', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the natural logarithm of a number',
    insertText: 'log(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'log10', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the base-10 logarithm of a number',
    insertText: 'log10(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'log2', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the base-2 logarithm of a number',
    insertText: 'log2(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'sqrt', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the square root of a number',
    insertText: 'sqrt(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'cbrt', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the cube root of a number',
    insertText: 'cbrt(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  
  // Hyperbolic functions
  { 
    label: 'sinh', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the hyperbolic sine of a number',
    insertText: 'sinh(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'cosh', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the hyperbolic cosine of a number',
    insertText: 'cosh(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'tanh', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the hyperbolic tangent of a number',
    insertText: 'tanh(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'asinh', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the inverse hyperbolic sine of a number',
    insertText: 'asinh(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'acosh', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the inverse hyperbolic cosine of a number',
    insertText: 'acosh(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'atanh', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the inverse hyperbolic tangent of a number',
    insertText: 'atanh(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  
  // Utility functions
  { 
    label: 'min', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the smallest of zero or more numbers',
    insertText: 'min(${1:values})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'max', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the largest of zero or more numbers',
    insertText: 'max(${1:values})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'pow', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns base to the exponent power',
    insertText: 'pow(${1:base}, ${2:exponent})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'random', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns a random number between 0 and 1',
    insertText: 'random()', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'sign', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the sign of a number',
    insertText: 'sign(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  
  // Custom math functions
  { 
    label: 'deg', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Converts radians to degrees',
    insertText: 'deg(${1:radians})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'rad', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Converts degrees to radians',
    insertText: 'rad(${1:degrees})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'clamp', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Clamps a value between min and max',
    insertText: 'clamp(${1:value}, ${2:min}, ${3:max})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'lerp', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Linear interpolation between two values',
    insertText: 'lerp(${1:a}, ${2:b}, ${3:t})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  
  // Type conversion functions
  { 
    label: 'number', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Converts a value to a number',
    insertText: 'number(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'string', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Converts a value to a string',
    insertText: 'string(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'boolean', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Converts a value to a boolean',
    insertText: 'boolean(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  
  // String functions
  { 
    label: 'length', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the length of a string or array',
    insertText: 'length(${1:value})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'upper', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Converts a string to uppercase',
    insertText: 'upper(${1:string})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'lower', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Converts a string to lowercase',
    insertText: 'lower(${1:string})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'trim', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Removes whitespace from both ends of a string',
    insertText: 'trim(${1:string})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  
  // Array functions
  { 
    label: 'array', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Creates an array from the arguments',
    insertText: 'array(${1:items})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'first', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the first element of an array',
    insertText: 'first(${1:array})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'last', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the last element of an array',
    insertText: 'last(${1:array})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'sum', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the sum of all elements in an array',
    insertText: 'sum(${1:array})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'avg', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Returns the average of all elements in an array',
    insertText: 'avg(${1:array})', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  }
];

// Transforms from builtin.ts
const JEX_TRANSFORMS = [
  { 
    label: 'upper', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Converts a string to uppercase',
    insertText: '| upper', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'lower', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Converts a string to lowercase',
    insertText: '| lower', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'capitalize', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Capitalizes each word in a string',
    insertText: '| capitalize', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'trim', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Removes whitespace from both ends of a string',
    insertText: '| trim', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'abs', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Returns the absolute value of a number',
    insertText: '| abs', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'floor', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Rounds down to the nearest integer',
    insertText: '| floor', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'ceil', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Rounds up to the nearest integer',
    insertText: '| ceil', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'round', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Rounds to the nearest integer',
    insertText: '| round', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'length', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Returns the length of a string, array, or object',
    insertText: '| length', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'number', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Converts a value to a number',
    insertText: '| number', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'string', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Converts a value to a string',
    insertText: '| string', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  },
  { 
    label: 'boolean', 
    kind: monaco.languages.CompletionItemKind.Function, 
    detail: 'Transform: Converts a value to a boolean',
    insertText: '| boolean', 
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet 
  }
];

// Snippets for common patterns
const JEX_SNIPPETS = [
  { 
    label: 'let-declaration', 
    kind: monaco.languages.CompletionItemKind.Snippet, 
    detail: 'Variable declaration',
    insertText: 'let ${1:name} = ${2:value};',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
  },
  { 
    label: 'object-literal', 
    kind: monaco.languages.CompletionItemKind.Snippet, 
    detail: 'Object literal',
    insertText: '{\n\t${1:key}: ${2:value}${3:,}\n}',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
  },
  { 
    label: 'array-literal', 
    kind: monaco.languages.CompletionItemKind.Snippet, 
    detail: 'Array literal',
    insertText: '[${1:item1}, ${2:item2}]',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
  },
  { 
    label: 'ternary', 
    kind: monaco.languages.CompletionItemKind.Snippet, 
    detail: 'Ternary expression',
    insertText: '${1:condition} ? ${2:trueValue} : ${3:falseValue}',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
  },
];

// Transform pipe snippet
JEX_SNIPPETS.push({
  label: 'pipe-transform',
  kind: monaco.languages.CompletionItemKind.Snippet,
  detail: 'Pipe expression to transform',
  insertText: '${1:expression} | ${2:transform}',
  insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
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
          return { suggestions };
        }
      } else {
        // Normal context, show all suggestions
        suggestions = [
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

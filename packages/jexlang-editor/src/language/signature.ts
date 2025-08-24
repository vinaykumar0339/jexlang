import * as monaco from 'monaco-editor';
import { JEX_LANGUAGE_ID } from './jexlang-language';

// Function signature information based on builtin.ts
const FUNCTION_SIGNATURES: Record<string, {
  label: string;
  documentation?: string;
  parameters: { label: string; documentation?: string }[];
}> = {
  // Math functions
  'abs': {
    label: 'abs(value)',
    documentation: 'Returns the absolute value of a number',
    parameters: [{ label: 'value', documentation: 'The number to get the absolute value of' }]
  },
  'ceil': {
    label: 'ceil(value)',
    documentation: 'Rounds a number up to the next largest integer',
    parameters: [{ label: 'value', documentation: 'The number to round up' }]
  },
  'floor': {
    label: 'floor(value)',
    documentation: 'Rounds a number down to the nearest integer',
    parameters: [{ label: 'value', documentation: 'The number to round down' }]
  },
  'round': {
    label: 'round(value)',
    documentation: 'Rounds a number to the nearest integer',
    parameters: [{ label: 'value', documentation: 'The number to round' }]
  },
  'trunc': {
    label: 'trunc(value)',
    documentation: 'Returns the integer part of a number',
    parameters: [{ label: 'value', documentation: 'The number to truncate' }]
  },
  
  // Trigonometric functions
  'sin': {
    label: 'sin(value)',
    documentation: 'Returns the sine of a number (in radians)',
    parameters: [{ label: 'value', documentation: 'The angle in radians' }]
  },
  'cos': {
    label: 'cos(value)',
    documentation: 'Returns the cosine of a number (in radians)',
    parameters: [{ label: 'value', documentation: 'The angle in radians' }]
  },
  'tan': {
    label: 'tan(value)',
    documentation: 'Returns the tangent of a number (in radians)',
    parameters: [{ label: 'value', documentation: 'The angle in radians' }]
  },
  'asin': {
    label: 'asin(value)',
    documentation: 'Returns the arcsine of a number in radians',
    parameters: [{ label: 'value', documentation: 'A value between -1 and 1' }]
  },
  'acos': {
    label: 'acos(value)',
    documentation: 'Returns the arccosine of a number in radians',
    parameters: [{ label: 'value', documentation: 'A value between -1 and 1' }]
  },
  'atan': {
    label: 'atan(value)',
    documentation: 'Returns the arctangent of a number in radians',
    parameters: [{ label: 'value', documentation: 'The number to calculate arctangent of' }]
  },
  'atan2': {
    label: 'atan2(y, x)',
    documentation: 'Returns the arctangent of the quotient of its arguments',
    parameters: [
      { label: 'y', documentation: 'The y-coordinate' },
      { label: 'x', documentation: 'The x-coordinate' }
    ]
  },
  
  // Exponential and logarithmic functions
  'exp': {
    label: 'exp(value)',
    documentation: 'Returns e raised to the power of a number',
    parameters: [{ label: 'value', documentation: 'The exponent to raise e to' }]
  },
  'log': {
    label: 'log(value)',
    documentation: 'Returns the natural logarithm of a number',
    parameters: [{ label: 'value', documentation: 'A number greater than 0' }]
  },
  'log10': {
    label: 'log10(value)',
    documentation: 'Returns the base-10 logarithm of a number',
    parameters: [{ label: 'value', documentation: 'A number greater than 0' }]
  },
  'log2': {
    label: 'log2(value)',
    documentation: 'Returns the base-2 logarithm of a number',
    parameters: [{ label: 'value', documentation: 'A number greater than 0' }]
  },
  'sqrt': {
    label: 'sqrt(value)',
    documentation: 'Returns the square root of a number',
    parameters: [{ label: 'value', documentation: 'A number greater than or equal to 0' }]
  },
  'cbrt': {
    label: 'cbrt(value)',
    documentation: 'Returns the cube root of a number',
    parameters: [{ label: 'value', documentation: 'The number to get the cube root of' }]
  },
  
  // Utility functions
  'min': {
    label: 'min(...values)',
    documentation: 'Returns the smallest of zero or more numbers',
    parameters: [{ label: '...values', documentation: 'One or more numbers to compare' }]
  },
  'max': {
    label: 'max(...values)',
    documentation: 'Returns the largest of zero or more numbers',
    parameters: [{ label: '...values', documentation: 'One or more numbers to compare' }]
  },
  'pow': {
    label: 'pow(base, exponent)',
    documentation: 'Returns base to the exponent power',
    parameters: [
      { label: 'base', documentation: 'The base number' },
      { label: 'exponent', documentation: 'The exponent to raise the base to' }
    ]
  },
  'random': {
    label: 'random()',
    documentation: 'Returns a random number between 0 and 1',
    parameters: []
  },
  'sign': {
    label: 'sign(value)',
    documentation: 'Returns the sign of a number, indicating whether it is positive, negative, or zero',
    parameters: [{ label: 'value', documentation: 'The number to get the sign of' }]
  },
  
  // Custom math functions
  'deg': {
    label: 'deg(radians)',
    documentation: 'Converts radians to degrees',
    parameters: [{ label: 'radians', documentation: 'The value in radians to convert' }]
  },
  'rad': {
    label: 'rad(degrees)',
    documentation: 'Converts degrees to radians',
    parameters: [{ label: 'degrees', documentation: 'The value in degrees to convert' }]
  },
  'clamp': {
    label: 'clamp(value, min, max)',
    documentation: 'Clamps a value between min and max',
    parameters: [
      { label: 'value', documentation: 'The number to clamp' },
      { label: 'min', documentation: 'The lower boundary' },
      { label: 'max', documentation: 'The upper boundary' }
    ]
  },
  'lerp': {
    label: 'lerp(a, b, t)',
    documentation: 'Linear interpolation between two values',
    parameters: [
      { label: 'a', documentation: 'The start value' },
      { label: 'b', documentation: 'The end value' },
      { label: 't', documentation: 'The interpolation factor between 0 and 1' }
    ]
  },
  
  // Type conversion functions
  'number': {
    label: 'number(value)',
    documentation: 'Converts a value to a number',
    parameters: [{ label: 'value', documentation: 'The value to convert to a number' }]
  },
  'string': {
    label: 'string(value)',
    documentation: 'Converts a value to a string',
    parameters: [{ label: 'value', documentation: 'The value to convert to a string' }]
  },
  'boolean': {
    label: 'boolean(value)',
    documentation: 'Converts a value to a boolean',
    parameters: [{ label: 'value', documentation: 'The value to convert to a boolean' }]
  },
  
  // String functions
  'length': {
    label: 'length(value)',
    documentation: 'Returns the length of a string or array',
    parameters: [{ label: 'value', documentation: 'The string or array to get the length of' }]
  },
  'upper': {
    label: 'upper(string)',
    documentation: 'Converts a string to uppercase',
    parameters: [{ label: 'string', documentation: 'The string to convert' }]
  },
  'lower': {
    label: 'lower(string)',
    documentation: 'Converts a string to lowercase',
    parameters: [{ label: 'string', documentation: 'The string to convert' }]
  },
  'trim': {
    label: 'trim(string)',
    documentation: 'Removes whitespace from both ends of a string',
    parameters: [{ label: 'string', documentation: 'The string to trim' }]
  },
  
  // Array functions
  'array': {
    label: 'array(...items)',
    documentation: 'Creates an array from the arguments',
    parameters: [{ label: '...items', documentation: 'The items to include in the array' }]
  },
  'first': {
    label: 'first(array)',
    documentation: 'Returns the first element of an array',
    parameters: [{ label: 'array', documentation: 'The array to get the first element from' }]
  },
  'last': {
    label: 'last(array)',
    documentation: 'Returns the last element of an array',
    parameters: [{ label: 'array', documentation: 'The array to get the last element from' }]
  },
  'sum': {
    label: 'sum(array)',
    documentation: 'Returns the sum of all elements in an array',
    parameters: [{ label: 'array', documentation: 'The array of numbers to sum' }]
  },
  'avg': {
    label: 'avg(array)',
    documentation: 'Returns the average of all elements in an array',
    parameters: [{ label: 'array', documentation: 'The array of numbers to average' }]
  }
};

/**
 * Register signature help provider for JexLang
 */
export function registerSignatureHelpProvider(m = monaco) {
  m.languages.registerSignatureHelpProvider(JEX_LANGUAGE_ID, {
    signatureHelpTriggerCharacters: ['(', ','],
    
    provideSignatureHelp: (model, position, token, context) => {
      // Get the content before the current position
      const textUntilPosition = model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      });

      // Find the function name just before the current position
      // Look for an identifier followed by an open paren
      const functionNameMatch = textUntilPosition.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\($/);

      let signatureHelp: monaco.languages.SignatureHelp | null = null;

      if (!functionNameMatch) {
        // Check for parameter in a function call (after comma)
        const insideFunctionCallMatch = textUntilPosition.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\((.*?)$/);

        if (!insideFunctionCallMatch) {
          return null;
        }

        const functionName = insideFunctionCallMatch[1];
        const functionSignature = FUNCTION_SIGNATURES[functionName];

        if (!functionSignature) {
          return null;
        }

        // Count the number of commas to determine the current parameter index
        const paramText = insideFunctionCallMatch[2];
        const activeParameter = countCommas(paramText);

        signatureHelp = createSignatureHelp(m, functionSignature, activeParameter);
      } else {
        const functionName = functionNameMatch[1];
        const functionSignature = FUNCTION_SIGNATURES[functionName];

        if (!functionSignature) {
          return null;
        }

        // First parameter (index 0)
        signatureHelp = createSignatureHelp(m, functionSignature, 0);
      }

      if (!signatureHelp) {
        return null;
      }

      return {
        value: signatureHelp,
        dispose: () => {}
      };
    }
  });
}

/**
 * Count the number of non-nested commas in a string
 * This is used to determine which parameter the cursor is at
 */
function countCommas(text: string): number {
  let commaCount = 0;
  let parenLevel = 0;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '(') {
      parenLevel++;
    } else if (char === ')') {
      parenLevel--;
    } else if (char === ',' && parenLevel === 0) {
      commaCount++;
    }
  }
  
  return commaCount;
}

/**
 * Create signature help object from function signature data
 */
function createSignatureHelp(
  m: typeof monaco,
  signature: typeof FUNCTION_SIGNATURES[keyof typeof FUNCTION_SIGNATURES],
  activeParameter: number
): monaco.languages.SignatureHelp {
  const signatureInfo: monaco.languages.SignatureInformation = {
    label: signature.label,
    documentation: signature.documentation,
    parameters: signature.parameters.map(param => ({
      label: param.label,
      documentation: param.documentation
    }))
  };
  
  return {
    signatures: [signatureInfo],
    activeSignature: 0,
    activeParameter: Math.min(activeParameter, signature.parameters.length - 1)
  };
}

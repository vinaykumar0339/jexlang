import * as monaco from 'monaco-editor';
import { JEX_LANGUAGE_ID } from './jexlang-language';

// Documentation for keywords
const KEYWORD_DOCS: Record<string, string> = {
  'let': 'Declares a variable in the current scope.\n\n```\nlet variableName = expression;\n```',
  'true': 'Boolean literal representing the true value.',
  'false': 'Boolean literal representing the false value.',
};

// Documentation for operators
const OPERATOR_DOCS: Record<string, string> = {
  '+': 'Addition operator. Adds two numbers or concatenates strings.',
  '-': 'Subtraction operator. Subtracts the right operand from the left operand.',
  '*': 'Multiplication operator. Multiplies two numbers.',
  '/': 'Division operator. Divides the left operand by the right operand.',
  '%': 'Modulo operator. Returns the remainder of division.',
  '^': 'Power operator. Raises the left operand to the power of the right operand.',
  '**': 'Power operator. Raises the left operand to the power of the right operand.',
  '=': 'Assignment operator. Assigns a value to a variable.',
  '==': 'Equality operator. Checks if two values are equal.',
  '!=': 'Inequality operator. Checks if two values are not equal.',
  '<': 'Less than operator. Checks if the left operand is less than the right operand.',
  '>': 'Greater than operator. Checks if the left operand is greater than the right operand.',
  '<=': 'Less than or equal operator. Checks if the left operand is less than or equal to the right operand.',
  '>=': 'Greater than or equal operator. Checks if the left operand is greater than or equal to the right operand.',
  '&&': 'Logical AND operator. Returns true if both operands are true.',
  '||': 'Logical OR operator. Returns true if at least one operand is true.',
  'and': 'Logical AND operator. Returns true if both operands are true.',
  'or': 'Logical OR operator. Returns true if at least one operand is true.',
  '|': 'Pipe operator. Passes the value on the left to the transform function on the right.',
  '?': 'Ternary conditional operator. Evaluates a condition and returns one of two expressions.',
  ':': 'Part of the ternary operator or used in object literals to separate keys and values.',
  '√': 'Square root operator. Returns the square root of the operand.',
  'sqrt': 'Square root operator. Returns the square root of the operand.',
};

// Documentation for built-in functions
const FUNCTION_DOCS: Record<string, string> = {
  // Math functions
  'abs': '**abs(value)** - Returns the absolute value of a number.',
  'ceil': '**ceil(value)** - Rounds a number up to the next largest integer.',
  'floor': '**floor(value)** - Rounds a number down to the nearest integer.',
  'round': '**round(value)** - Rounds a number to the nearest integer.',
  'trunc': '**trunc(value)** - Returns the integer part of a number.',
  'sin': '**sin(value)** - Returns the sine of a number (in radians).',
  'cos': '**cos(value)** - Returns the cosine of a number (in radians).',
  'tan': '**tan(value)** - Returns the tangent of a number (in radians).',
  'asin': '**asin(value)** - Returns the arcsine of a number in radians.',
  'acos': '**acos(value)** - Returns the arccosine of a number in radians.',
  'atan': '**atan(value)** - Returns the arctangent of a number in radians.',
  'atan2': '**atan2(y, x)** - Returns the arctangent of the quotient of its arguments.',
  'exp': '**exp(value)** - Returns e raised to the power of a number.',
  'log': '**log(value)** - Returns the natural logarithm of a number.',
  'log10': '**log10(value)** - Returns the base-10 logarithm of a number.',
  'log2': '**log2(value)** - Returns the base-2 logarithm of a number.',
  'sqrt': '**sqrt(value)** - Returns the square root of a number.',
  'cbrt': '**cbrt(value)** - Returns the cube root of a number.',
  'sinh': '**sinh(value)** - Returns the hyperbolic sine of a number.',
  'cosh': '**cosh(value)** - Returns the hyperbolic cosine of a number.',
  'tanh': '**tanh(value)** - Returns the hyperbolic tangent of a number.',
  'asinh': '**asinh(value)** - Returns the inverse hyperbolic sine of a number.',
  'acosh': '**acosh(value)** - Returns the inverse hyperbolic cosine of a number.',
  'atanh': '**atanh(value)** - Returns the inverse hyperbolic tangent of a number.',
  'min': '**min(...values)** - Returns the smallest of zero or more numbers.',
  'max': '**max(...values)** - Returns the largest of zero or more numbers.',
  'pow': '**pow(base, exponent)** - Returns base to the exponent power.',
  'random': '**random()** - Returns a random number between 0 and 1.',
  'sign': '**sign(value)** - Returns the sign of a number, indicating whether it is positive, negative, or zero.',
  'deg': '**deg(radians)** - Converts radians to degrees.',
  'rad': '**rad(degrees)** - Converts degrees to radians.',
  'clamp': '**clamp(value, min, max)** - Clamps a value between min and max.',
  'lerp': '**lerp(a, b, t)** - Linear interpolation between two values.',
  'number': '**number(value)** - Converts a value to a number.',
  'string': '**string(value)** - Converts a value to a string.',
  'boolean': '**boolean(value)** - Converts a value to a boolean.',
  'length': '**length(value)** - Returns the length of a string or array.',
  'upper': '**upper(string)** - Converts a string to uppercase.',
  'lower': '**lower(string)** - Converts a string to lowercase.',
  'trim': '**trim(string)** - Removes whitespace from both ends of a string.',
  'array': '**array(...items)** - Creates an array from the arguments.',
  'first': '**first(array)** - Returns the first element of an array.',
  'last': '**last(array)** - Returns the last element of an array.',
  'sum': '**sum(array)** - Returns the sum of all elements in an array.',
  'avg': '**avg(array)** - Returns the average of all elements in an array.',
};

// Documentation for transforms
const TRANSFORM_DOCS: Record<string, string> = {
  'upper': '**upper** - Transforms a string to uppercase.\n\nExample: `"hello" | upper` → `"HELLO"`',
  'lower': '**lower** - Transforms a string to lowercase.\n\nExample: `"HELLO" | lower` → `"hello"`',
  'capitalize': '**capitalize** - Capitalizes each word in a string.\n\nExample: `"hello world" | capitalize` → `"Hello World"`',
  'trim': '**trim** - Removes whitespace from both ends of a string.\n\nExample: `"  hello  " | trim` → `"hello"`',
  'abs': '**abs** - Returns the absolute value of a number.\n\nExample: `-5 | abs` → `5`',
  'floor': '**floor** - Rounds a number down to the nearest integer.\n\nExample: `3.7 | floor` → `3`',
  'ceil': '**ceil** - Rounds a number up to the next largest integer.\n\nExample: `3.2 | ceil` → `4`',
  'round': '**round** - Rounds a number to the nearest integer.\n\nExample: `3.5 | round` → `4`',
  'length': '**length** - Returns the length of a string, array, or object.\n\nExample: `"hello" | length` → `5`',
  'number': '**number** - Converts a value to a number.\n\nExample: `"42" | number` → `42`',
  'string': '**string** - Converts a value to a string.\n\nExample: `42 | string` → `"42"`',
  'boolean': '**boolean** - Converts a value to a boolean.\n\nExample: `0 | boolean` → `false`',
};

/**
 * Register hover provider for JexLang
 */
export function registerHoverProvider(m = monaco) {
  m.languages.registerHoverProvider(JEX_LANGUAGE_ID, {
    provideHover: (model, position) => {
      const word = model.getWordAtPosition(position);
      
      if (!word) {
        return null;
      }
      
      const token = word.word;
      
      // Get the text of the current line
      const lineContent = model.getLineContent(position.lineNumber);
      
      // Check if this is a transform context (after a pipe)
      const textBeforePosition = lineContent.substring(0, position.column - 1);
      const isPipeContext = /\|\s*[a-zA-Z_][a-zA-Z0-9_]*$/.test(textBeforePosition);
      
      let contents: monaco.IMarkdownString[] = [];
      
      if (isPipeContext && TRANSFORM_DOCS[token]) {
        // Transform documentation
        contents = [{ value: TRANSFORM_DOCS[token] }];
      } else if (KEYWORD_DOCS[token]) {
        // Keyword documentation
        contents = [{ value: KEYWORD_DOCS[token] }];
      } else if (FUNCTION_DOCS[token]) {
        // Function documentation
        contents = [{ value: FUNCTION_DOCS[token] }];
      } else if (OPERATOR_DOCS[token]) {
        // Operator documentation
        contents = [{ value: OPERATOR_DOCS[token] }];
      }
      
      if (contents.length > 0) {
        return {
          range: new m.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn
          ),
          contents
        };
      }
      
      return null;
    }
  });
}

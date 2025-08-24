import * as monaco from 'monaco-editor';
import { JEX_LANGUAGE_ID } from './jexlang-language';

// List of built-in functions from builtin.ts
const BUILT_IN_FUNCTIONS = [
  'abs', 'ceil', 'floor', 'round', 'trunc',
  'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'atan2',
  'exp', 'log', 'log10', 'log2', 'sqrt', 'cbrt',
  'sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh',
  'min', 'max', 'pow', 'random', 'sign',
  'deg', 'rad', 'clamp', 'lerp',
  'number', 'string', 'boolean',
  'length', 'upper', 'lower', 'trim',
  'array', 'first', 'last', 'sum', 'avg'
];

// List of built-in transforms from transforms/builtin.ts
const BUILT_IN_TRANSFORMS = [
  'upper', 'lower', 'capitalize', 'trim',
  'abs', 'floor', 'ceil', 'round',
  'length', 'number', 'string', 'boolean'
];

// Keywords in the language
const KEYWORDS = ['let', 'true', 'false'];

interface JexDiagnosticInfo {
  message: string;
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
  severity: monaco.MarkerSeverity;
}

/**
 * Register diagnostics provider for JexLang
 */
export function registerDiagnostics(m = monaco) {
  // Listen for changes in the model content
  m.editor.onDidCreateModel((model) => {
    if (model.getLanguageId() === JEX_LANGUAGE_ID) {
      // Initial validation
      validateModel(model, m);
      
      // Validate on content change
      model.onDidChangeContent(() => {
        validateModel(model, m);
      });
    }
  });
}

/**
 * Validate the JexLang model and set markers for any issues
 */
function validateModel(model: monaco.editor.ITextModel, m = monaco) {
  const markers: monaco.editor.IMarkerData[] = [];
  const diagnostics: JexDiagnosticInfo[] = [];
  
  try {
    // Get the full text of the model
    const text = model.getValue();
    
    // Check for basic syntax errors
    checkBasicSyntax(text, diagnostics);
    
    // Check for variable declarations and usage
    checkVariables(text, diagnostics);
    
    // Check function calls
    checkFunctionCalls(text, diagnostics);
    
    // Check transforms
    checkTransforms(text, diagnostics);
    
    // Convert diagnostics to markers
    markers.push(...diagnostics.map(d => ({
      severity: d.severity,
      message: d.message,
      startLineNumber: d.startLineNumber,
      startColumn: d.startColumn,
      endLineNumber: d.endLineNumber,
      endColumn: d.endColumn
    })));
  } catch (error) {
    // If anything goes wrong in our validation, log it but don't crash
    console.error('Error validating JexLang model:', error);
  }
  
  // Set the markers on the model
  m.editor.setModelMarkers(model, 'jexlang-diagnostics', markers);
}

/**
 * Check for basic syntax errors
 */
function checkBasicSyntax(text: string, diagnostics: JexDiagnosticInfo[]) {
  // Check for unclosed brackets
  const brackets = [
    { open: '(', close: ')', name: 'parentheses' },
    { open: '[', close: ']', name: 'brackets' },
    { open: '{', close: '}', name: 'braces' }
  ];
  
  brackets.forEach(bracket => {
    const stack: number[] = [];
    const positions: { char: string, line: number, column: number }[] = [];
    
    // Find all brackets and their positions
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === bracket.open || char === bracket.close) {
          positions.push({ char, line: i + 1, column: j + 1 });
        }
      }
    }
    
    // Check for matching brackets
    for (const pos of positions) {
      if (pos.char === bracket.open) {
        stack.push(positions.indexOf(pos));
      } else if (pos.char === bracket.close) {
        if (stack.length === 0) {
          // Unmatched closing bracket
          diagnostics.push({
            message: `Unmatched closing ${bracket.name}`,
            startLineNumber: pos.line,
            startColumn: pos.column,
            endLineNumber: pos.line,
            endColumn: pos.column + 1,
            severity: monaco.MarkerSeverity.Error
          });
        } else {
          stack.pop();
        }
      }
    }
    
    // Check for unmatched opening brackets
    if (stack.length > 0) {
      const lastUnmatched = positions[stack[stack.length - 1]];
      diagnostics.push({
        message: `Unmatched opening ${bracket.name}`,
        startLineNumber: lastUnmatched.line,
        startColumn: lastUnmatched.column,
        endLineNumber: lastUnmatched.line,
        endColumn: lastUnmatched.column + 1,
        severity: monaco.MarkerSeverity.Error
      });
    }
  });
  
  // Check for unclosed strings
  const lines = text.split('\n');
  let inSingleQuoteString = false;
  let inDoubleQuoteString = false;
  let stringStartLine = 0;
  let stringStartCol = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      const prevChar = j > 0 ? line[j - 1] : null;
      
      // Skip escaped quotes
      if (prevChar === '\\') continue;
      
      if (char === '"' && !inSingleQuoteString) {
        if (inDoubleQuoteString) {
          inDoubleQuoteString = false;
        } else {
          inDoubleQuoteString = true;
          stringStartLine = i + 1;
          stringStartCol = j + 1;
        }
      } else if (char === "'" && !inDoubleQuoteString) {
        if (inSingleQuoteString) {
          inSingleQuoteString = false;
        } else {
          inSingleQuoteString = true;
          stringStartLine = i + 1;
          stringStartCol = j + 1;
        }
      }
    }
    
    // If a string starts but doesn't end on this line, report an error
    if (inSingleQuoteString) {
      diagnostics.push({
        message: "Unclosed string literal (single quotes)",
        startLineNumber: stringStartLine,
        startColumn: stringStartCol,
        endLineNumber: i + 1,
        endColumn: line.length + 1,
        severity: monaco.MarkerSeverity.Error
      });
      inSingleQuoteString = false;
    }
    
    if (inDoubleQuoteString) {
      diagnostics.push({
        message: "Unclosed string literal (double quotes)",
        startLineNumber: stringStartLine,
        startColumn: stringStartCol,
        endLineNumber: i + 1,
        endColumn: line.length + 1,
        severity: monaco.MarkerSeverity.Error
      });
      inDoubleQuoteString = false;
    }
  }
}

/**
 * Check for variable declaration and usage issues
 */
function checkVariables(text: string, diagnostics: JexDiagnosticInfo[]) {
  // Extract variable declarations with regex
  const varDeclarationRegex = /let\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*([^;]*)/g;
  const declarations: { name: string, position: number }[] = [];
  let match;
  
  while ((match = varDeclarationRegex.exec(text)) !== null) {
    declarations.push({ name: match[1], position: match.index });
  }
  
  // Check for duplicate variable declarations
  const uniqueVars = new Set<string>();
  for (const decl of declarations) {
    if (uniqueVars.has(decl.name)) {
      // Find the line and column of the duplicate declaration
      const priorText = text.substring(0, decl.position);
      const lines = priorText.split('\n');
      const lineNumber = lines.length;
      const column = lines[lines.length - 1].indexOf('let ') + 4;
      
      diagnostics.push({
        message: `Variable '${decl.name}' is already declared`,
        startLineNumber: lineNumber,
        startColumn: column,
        endLineNumber: lineNumber,
        endColumn: column + decl.name.length,
        severity: monaco.MarkerSeverity.Warning
      });
    } else {
      uniqueVars.add(decl.name);
    }
  }
  
  // TODO: Check for variable usage before declaration
  // This would require more sophisticated parsing that's beyond a simple diagnostics provider
}

/**
 * Check for function call issues
 */
function checkFunctionCalls(text: string, diagnostics: JexDiagnosticInfo[]) {
  // Find function calls
  const functionCallRegex = /([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;
  let match;
  
  while ((match = functionCallRegex.exec(text)) !== null) {
    const funcName = match[1];
    
    // Skip if it's a keyword (like if, while, etc.)
    if (KEYWORDS.includes(funcName)) {
      continue;
    }
    
    // Check if the function exists in our built-in functions
    if (!BUILT_IN_FUNCTIONS.includes(funcName)) {
      const position = match.index;
      const priorText = text.substring(0, position);
      const lines = priorText.split('\n');
      const lineNumber = lines.length;
      const column = lines[lines.length - 1].length - funcName.length + 1;
      
      diagnostics.push({
        message: `Unknown function '${funcName}'`,
        startLineNumber: lineNumber,
        startColumn: column,
        endLineNumber: lineNumber,
        endColumn: column + funcName.length,
        severity: monaco.MarkerSeverity.Warning
      });
    }
  }
}

/**
 * Check for transform issues
 */
function checkTransforms(text: string, diagnostics: JexDiagnosticInfo[]) {
  // Find transforms
  const transformRegex = /\|\s*([a-zA-Z_][a-zA-Z0-9_]*)/g;
  let match;
  
  while ((match = transformRegex.exec(text)) !== null) {
    const transformName = match[1];
    
    // Check if the transform exists in our built-in transforms
    if (!BUILT_IN_TRANSFORMS.includes(transformName)) {
      const position = match.index + match[0].indexOf(transformName);
      const priorText = text.substring(0, position);
      const lines = priorText.split('\n');
      const lineNumber = lines.length;
      const column = position - text.lastIndexOf('\n', position);
      
      diagnostics.push({
        message: `Unknown transform '${transformName}'`,
        startLineNumber: lineNumber,
        startColumn: column,
        endLineNumber: lineNumber,
        endColumn: column + transformName.length,
        severity: monaco.MarkerSeverity.Warning
      });
    }
  }
}

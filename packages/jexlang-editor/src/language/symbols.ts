import * as monaco from 'monaco-editor';
import { JEX_LANGUAGE_ID } from './jexlang-language';

/**
 * Register document symbol provider for JexLang
 */
export function registerSymbolProvider(m = monaco) {
  m.languages.registerDocumentSymbolProvider(JEX_LANGUAGE_ID, {
    provideDocumentSymbols: (model) => {
      const symbols: monaco.languages.DocumentSymbol[] = [];
      const text = model.getValue();
      
      // Extract all variable declarations
      const variableDeclarations = extractVariableDeclarations(text, model);
      symbols.push(...variableDeclarations);
      
      // Extract all object literals
      const objectLiterals = extractObjectLiterals(text, model);
      symbols.push(...objectLiterals);
      
      return symbols;
    }
  });
}

/**
 * Extract variable declarations from code
 */
function extractVariableDeclarations(text: string, model: monaco.editor.ITextModel): monaco.languages.DocumentSymbol[] {
  const symbols: monaco.languages.DocumentSymbol[] = [];
  
  // Match variable declarations
  const varDeclarationRegex = /let\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*([^;]*)/g;
  let match;
  
  while ((match = varDeclarationRegex.exec(text)) !== null) {
    const varName = match[1];
    const startPos = match.index;
    const endPos = startPos + match[0].length;
    
    // Convert position to line/column
    const startPosition = model.getPositionAt(startPos);
    const endPosition = model.getPositionAt(endPos);
    
    symbols.push({
      name: varName,
      detail: 'Variable',
      kind: monaco.languages.SymbolKind.Variable,
      tags: [],
      range: {
        startLineNumber: startPosition.lineNumber,
        startColumn: startPosition.column,
        endLineNumber: endPosition.lineNumber,
        endColumn: endPosition.column
      },
      selectionRange: {
        startLineNumber: startPosition.lineNumber,
        startColumn: startPosition.column + match[0].indexOf(varName),
        endLineNumber: startPosition.lineNumber,
        endColumn: startPosition.column + match[0].indexOf(varName) + varName.length
      }
    });
  }
  
  return symbols;
}

/**
 * Extract object literals from code
 */
function extractObjectLiterals(text: string, model: monaco.editor.ITextModel): monaco.languages.DocumentSymbol[] {
  const symbols: monaco.languages.DocumentSymbol[] = [];
  
  // Simple pattern to find object literals
  // This is a basic implementation and may not handle nested objects properly
  const objectLiteralRegex = /(\w+)\s*=\s*\{([^}]*)\}/g;
  let match;
  
  while ((match = objectLiteralRegex.exec(text)) !== null) {
    const objectName = match[1];
    const startPos = match.index;
    const endPos = startPos + match[0].length;
    
    // Convert position to line/column
    const startPosition = model.getPositionAt(startPos);
    const endPosition = model.getPositionAt(endPos);
    
    // Get object properties
    const properties = extractObjectProperties(match[2], model, startPos + match[0].indexOf('{') + 1);
    
    symbols.push({
      name: objectName,
      detail: 'Object',
      kind: monaco.languages.SymbolKind.Object,
      tags: [],
      range: {
        startLineNumber: startPosition.lineNumber,
        startColumn: startPosition.column,
        endLineNumber: endPosition.lineNumber,
        endColumn: endPosition.column
      },
      selectionRange: {
        startLineNumber: startPosition.lineNumber,
        startColumn: startPosition.column,
        endLineNumber: startPosition.lineNumber,
        endColumn: startPosition.column + objectName.length
      },
      children: properties
    });
  }
  
  return symbols;
}

/**
 * Extract properties from object literal content
 */
function extractObjectProperties(objectContent: string, model: monaco.editor.ITextModel, baseOffset: number): monaco.languages.DocumentSymbol[] {
  const properties: monaco.languages.DocumentSymbol[] = [];
  
  // Match property key-value pairs
  const propertyRegex = /\s*([a-zA-Z_][a-zA-Z0-9_]*|"[^"]*"|'[^']*')\s*:\s*([^,}]*)/g;
  let propMatch;
  
  while ((propMatch = propertyRegex.exec(objectContent)) !== null) {
    let propName = propMatch[1];
    
    // Remove quotes from property name if present
    if ((propName.startsWith('"') && propName.endsWith('"')) ||
        (propName.startsWith("'") && propName.endsWith("'"))) {
      propName = propName.substring(1, propName.length - 1);
    }
    
    const propStartPos = baseOffset + propMatch.index;
    const propEndPos = propStartPos + propMatch[0].length;
    
    // Convert position to line/column
    const startPosition = model.getPositionAt(propStartPos);
    const endPosition = model.getPositionAt(propEndPos);
    
    properties.push({
      name: propName,
      detail: 'Property',
      kind: monaco.languages.SymbolKind.Property,
      tags: [],
      range: {
        startLineNumber: startPosition.lineNumber,
        startColumn: startPosition.column,
        endLineNumber: endPosition.lineNumber,
        endColumn: endPosition.column
      },
      selectionRange: {
        startLineNumber: startPosition.lineNumber,
        startColumn: startPosition.column,
        endLineNumber: startPosition.lineNumber,
        endColumn: startPosition.column + propName.length
      }
    });
  }
  
  return properties;
}

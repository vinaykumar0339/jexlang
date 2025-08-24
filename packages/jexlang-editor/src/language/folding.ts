import * as monaco from 'monaco-editor';
import { JEX_LANGUAGE_ID } from './jexlang-language';

/**
 * Register folding range provider for JexLang
 */
export function registerFoldingRangeProvider(m = monaco) {
  m.languages.registerFoldingRangeProvider(JEX_LANGUAGE_ID, {
    provideFoldingRanges: (model) => {
      const ranges: monaco.languages.FoldingRange[] = [];
      
      // Find object and array literal blocks
      const blockRanges = findBlockFoldingRanges(model);
      ranges.push(...blockRanges);
      
      // Find multi-line comment blocks
      const commentRanges = findCommentFoldingRanges(model);
      ranges.push(...commentRanges);
      
      return ranges;
    }
  });
}

/**
 * Find code blocks that can be folded (objects, arrays)
 */
function findBlockFoldingRanges(model: monaco.editor.ITextModel): monaco.languages.FoldingRange[] {
  const ranges: monaco.languages.FoldingRange[] = [];
  const text = model.getValue();
  const lines = text.split('\n');
  
  // Stack to track opening brackets positions
  interface BracketInfo {
    line: number;
    char: string;
  }
  
  const stack: BracketInfo[] = [];
  
  // Process each line
  for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
    const line = lines[lineNumber];
    
    // Track each character to find blocks
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      // Skip brackets inside strings
      if (isInsideString(line, i)) {
        continue;
      }
      
      // Handle opening brackets
      if (char === '{' || char === '[') {
        stack.push({ line: lineNumber, char });
      }
      // Handle closing brackets
      else if (char === '}' || char === ']') {
        const matchingChar = char === '}' ? '{' : '[';
        
        // Find matching opening bracket
        while (stack.length > 0) {
          const opener = stack.pop();
          if (opener && opener.char === matchingChar) {
            // Only create a folding range if it spans multiple lines
            if (opener.line < lineNumber) {
              ranges.push({
                start: opener.line + 1,  // Monaco uses 1-based line numbers
                end: lineNumber + 1,
                kind: monaco.languages.FoldingRangeKind.Region
              });
            }
            break;
          }
        }
      }
    }
  }
  
  return ranges;
}

/**
 * Find comment blocks that can be folded
 */
function findCommentFoldingRanges(model: monaco.editor.ITextModel): monaco.languages.FoldingRange[] {
  const ranges: monaco.languages.FoldingRange[] = [];
  const text = model.getValue();
  const lines = text.split('\n');
  
  let commentStartLine = -1;
  let inBlockComment = false;
  
  // Process each line
  for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
    const line = lines[lineNumber];
    
    // Handle block comments
    if (line.includes('/*') && !inBlockComment) {
      commentStartLine = lineNumber;
      inBlockComment = true;
    }
    
    if (line.includes('*/') && inBlockComment) {
      if (lineNumber > commentStartLine) {
        ranges.push({
          start: commentStartLine + 1,  // Monaco uses 1-based line numbers
          end: lineNumber + 1,
          kind: monaco.languages.FoldingRangeKind.Comment
        });
      }
      inBlockComment = false;
      commentStartLine = -1;
    }
    
    // Handle consecutive single-line comments
    if (!inBlockComment && line.trim().startsWith('//')) {
      let endLine = lineNumber;
      while (endLine + 1 < lines.length && lines[endLine + 1].trim().startsWith('//')) {
        endLine++;
      }
      
      if (endLine > lineNumber) {
        ranges.push({
          start: lineNumber + 1,  // Monaco uses 1-based line numbers
          end: endLine + 1,
          kind: monaco.languages.FoldingRangeKind.Comment
        });
        lineNumber = endLine;
      }
    }
  }
  
  return ranges;
}

/**
 * Check if a character position is inside a string
 */
function isInsideString(line: string, pos: number): boolean {
  let inSingleQuoteString = false;
  let inDoubleQuoteString = false;
  
  for (let i = 0; i < pos; i++) {
    const char = line.charAt(i);
    const prevChar = i > 0 ? line.charAt(i - 1) : '';
    
    // Skip escaped quotes
    if (prevChar === '\\') continue;
    
    if (char === '"' && !inSingleQuoteString) {
      inDoubleQuoteString = !inDoubleQuoteString;
    } else if (char === "'" && !inDoubleQuoteString) {
      inSingleQuoteString = !inSingleQuoteString;
    }
  }
  
  return inSingleQuoteString || inDoubleQuoteString;
}

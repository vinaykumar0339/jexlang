import * as monaco from 'monaco-editor';
import { JEX_LANGUAGE_ID } from './jexlang-language';

/**
 * Register document formatting provider for JexLang
 */
export function registerFormattingProvider(m = monaco) {
  m.languages.registerDocumentFormattingEditProvider(JEX_LANGUAGE_ID, {
    provideDocumentFormattingEdits: (model) => {
      const text = model.getValue();
      const formatted = formatJexLang(text);
      
      if (text === formatted) {
        return [];
      }
      
      return [
        {
          range: model.getFullModelRange(),
          text: formatted
        }
      ];
    }
  });
  
  // Also register range formatting provider
  m.languages.registerDocumentRangeFormattingEditProvider(JEX_LANGUAGE_ID, {
    provideDocumentRangeFormattingEdits: (model, range) => {
      const text = model.getValueInRange(range);
      const formatted = formatJexLang(text);
      
      if (text === formatted) {
        return [];
      }
      
      return [
        {
          range: range,
          text: formatted
        }
      ];
    }
  });
}

/**
 * Format JexLang code with proper indentation and spacing
 */
function formatJexLang(code: string): string {
  // Split code into lines for processing
  let lines = code.split('\n');
  let result: string[] = [];
  let indentLevel = 0;
  
  // Process each line
  for (let line of lines) {
    // Trim whitespace from the line
    const trimmed = line.trim();
    
    // Skip empty lines
    if (!trimmed) {
      result.push('');
      continue;
    }
    
    // Decrease indent level if this line closes a block
    if (trimmed.startsWith('}') || trimmed.startsWith(']')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }
    
    // Add indentation based on the current level
    const indentation = '  '.repeat(indentLevel);
    
    // Format operators with spaces, preserving comments
    let formatted = formatOperatorsPreservingComments(trimmed);
    
    // Add the formatted line to the result
    result.push(indentation + formatted);
    
    // Increase indent level if this line opens a block
    if (trimmed.endsWith('{') || trimmed.endsWith('[') || 
        (trimmed.includes('{') && !trimmed.includes('}')) || 
        (trimmed.includes('[') && !trimmed.includes(']'))) {
      indentLevel++;
    }
    
    // Decrease indent level if this line closes a block
    if ((trimmed.includes('}') && !trimmed.startsWith('}')) || 
        (trimmed.includes(']') && !trimmed.startsWith(']'))) {
      indentLevel = Math.max(0, indentLevel - 1);
    }
  }
  
  return result.join('\n');
}

/**
 * Add appropriate spacing around operators while preserving comments
 */
function formatOperatorsPreservingComments(text: string): string {
  // Check if the entire line is a comment
  if (text.trim().startsWith('//')) {
    // For line comments, preserve the entire content after //
    const commentStart = text.indexOf('//');
    const beforeComment = text.substring(0, commentStart).trim();
    const commentContent = text.substring(commentStart);
    
    // Format any code before the comment if it exists
    return beforeComment ? formatOperators(beforeComment) + ' ' + commentContent : commentContent;
  }
  
  // Handle inline comments (code followed by a comment)
  const commentStart = text.indexOf('//');
  if (commentStart >= 0) {
    const codeContent = text.substring(0, commentStart);
    const commentContent = text.substring(commentStart);
    
    // Format only the code part, preserve the comment as is
    return formatOperators(codeContent.trim()) + ' ' + commentContent;
  }
  
  // Handle block comments (not perfect but a basic implementation)
  if (text.includes('/*') && text.includes('*/')) {
    const parts = splitByBlockComments(text);
    return parts.map(part => {
      return part.isComment ? part.text : formatOperators(part.text);
    }).join('');
  }
  
  // No comments, format the entire line
  return formatOperators(text);
}

/**
 * Split text by block comments to preserve comment content
 */
function splitByBlockComments(text: string): Array<{text: string, isComment: boolean}> {
  const result: Array<{text: string, isComment: boolean}> = [];
  let currentIndex = 0;
  let startCommentIndex;
  let endCommentIndex;
  
  // Find all block comments and split the text
  while ((startCommentIndex = text.indexOf('/*', currentIndex)) !== -1) {
    // Add the code before the comment
    if (startCommentIndex > currentIndex) {
      result.push({
        text: text.substring(currentIndex, startCommentIndex),
        isComment: false
      });
    }
    
    // Find the end of this comment
    endCommentIndex = text.indexOf('*/', startCommentIndex + 2);
    if (endCommentIndex === -1) {
      // Unclosed comment, treat the rest as a comment
      endCommentIndex = text.length;
    } else {
      endCommentIndex += 2; // Include the */ in the comment
    }
    
    // Add the comment
    result.push({
      text: text.substring(startCommentIndex, endCommentIndex),
      isComment: true
    });
    
    currentIndex = endCommentIndex;
  }
  
  // Add any remaining code after the last comment
  if (currentIndex < text.length) {
    result.push({
      text: text.substring(currentIndex),
      isComment: false
    });
  }
  
  return result;
}

/**
 * Add appropriate spacing around operators
 */
function formatOperators(text: string): string {
  // Binary operators that should have spaces around them
  const binaryOperators = ['+', '-', '*', '/', '%', '==', '!=', '<', '>', '<=', '>=', 
                          '&&', '||', 'and', 'or', '^', '**'];
  
  // Special case for pipe operator
  text = text.replace(/\s*\|\s*/g, ' | ');
  
  // Assignment operators
  text = text.replace(/\s*=\s*/g, ' = ');
  
  // Handle all binary operators
  for (const op of binaryOperators) {
    // Use regex to add spaces around the operator, but avoid replacing inside strings
    // This is a simplistic approach and might not handle all edge cases
    const escapedOp = op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\s*${escapedOp}\\s*`, 'g');
    text = text.replace(regex, ` ${op} `);
  }
  
  // Fix spacing around commas
  text = text.replace(/\s*,\s*/g, ', ');
  
  // Fix spacing around semicolons
  text = text.replace(/\s*;\s*/g, '; ');
  
  // Fix spacing around colons
  text = text.replace(/\s*:\s*/g, ': ');
  
  return text;
}

import * as monaco from 'monaco-editor';
import { registerJexLangLanguage } from './jexlang-language';
import { registerCompletionItemProvider } from './completion';
import { registerHoverProvider } from './hover';
import { registerSignatureHelpProvider } from './signature';
import { registerDiagnostics } from './diagnostics';
import { registerFormattingProvider } from './formatting';
import { registerSymbolProvider } from './symbols';
import { registerFoldingRangeProvider } from './folding';

/**
 * Register all JexLang language features at once
 */
export function registerJexLangFeatures(m = monaco) {
  // Basic language support
  registerJexLangLanguage(m);
  
  // Advanced editing features
  registerCompletionItemProvider(m);
  registerHoverProvider(m);
  registerSignatureHelpProvider(m);
  registerDiagnostics(m);
  
  // Additional IDE-like features
  registerFormattingProvider(m);
  registerSymbolProvider(m);
  registerFoldingRangeProvider(m);
  
  return {
    id: 'jexlang',
    dispose: () => {
      // Disposal logic if needed
    }
  };
}

// Re-export the JEX_LANGUAGE_ID
export { JEX_LANGUAGE_ID } from './jexlang-language';

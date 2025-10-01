import * as monaco from 'monaco-editor';
import { JEX_LANGUAGE_ID, registerJexLangLanguage } from './jexlang-language';
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
    id: JEX_LANGUAGE_ID,
    dispose: () => {
      // Disposal logic if needed
    }
  };
}

// Re-export the JEX_LANGUAGE_ID
export { JEX_LANGUAGE_ID, registerJexLangLanguage } from './jexlang-language';

export { registerCompletionItemProvider, registerCustomCompletions } from './completion';
export { registerHoverProvider } from './hover';
export { registerSignatureHelpProvider } from './signature';
export { registerDiagnostics } from './diagnostics';
export { registerFormattingProvider } from './formatting';
export { registerSymbolProvider } from './symbols';
export { registerFoldingRangeProvider } from './folding';
import { ErrorListener, RecognitionException, Recognizer } from 'antlr4';
import { JexLangSyntaxError } from '../errors';

export class JexLangErrorListener extends ErrorListener<any> {
  private errors: JexLangSyntaxError[] = [];

  syntaxError(
    _recognizer: Recognizer<any>,
    offendingSymbol: any,
    line: number,
    charPositionInLine: number,
    msg: string,
    _e: RecognitionException | undefined
  ): void {
    // Create a more user-friendly error message
    const formattedMessage = this.formatErrorMessage(line, charPositionInLine, msg, offendingSymbol);
    
    // Create a syntax error object
    const error = new JexLangSyntaxError(
      formattedMessage,
      {
        line,
        column: charPositionInLine,
        offendingSymbol: offendingSymbol ? offendingSymbol.text : null
      }
    );
    
    // Add to our error collection
    this.errors.push(error);
  }

  private formatErrorMessage(
    line: number, 
    charPositionInLine: number, 
    msg: string, 
    offendingSymbol: any
  ): string {
    // Clean up the ANTLR error message for better readability
    let cleanMessage = msg
      .replace(/no viable alternative at input/g, 'Unexpected')
      .replace(/extraneous input/g, 'Unexpected')
      .replace(/mismatched input/g, 'Unexpected')
      .replace(/expecting/g, 'expected');
    
    // If we have a token, show it properly
    if (offendingSymbol && offendingSymbol.text) {
      cleanMessage = cleanMessage.replace(`'${offendingSymbol.text}'`, `'${this.escapeString(offendingSymbol.text)}'`);
    }
    
    return `Syntax error at line ${line}:${charPositionInLine}: ${cleanMessage}`;
  }

  private escapeString(str: string): string {
    return str
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): JexLangSyntaxError[] {
    return this.errors;
  }

  clear(): void {
    this.errors = [];
  }
}

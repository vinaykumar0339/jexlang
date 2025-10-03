//
//  JexLangErrorListener.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

public class JexLangErrorListener: BaseErrorListener {
    private var syntaxErrors: [JexLangSyntaxError] = []
    
    public func hasErrors() -> Bool {
        return !syntaxErrors.isEmpty
    }
    
    public func getSyntaxErrors() -> [JexLangSyntaxError] {
        return self.syntaxErrors;
    }
    
    public override func syntaxError<T>(_ recognizer: Recognizer<T>, _ offendingSymbol: AnyObject?, _ line: Int, _ charPositionInLine: Int, _ msg: String, _ e: AnyObject?) where T : ATNSimulator {
        // Extract offending text if available
        var offendingText: String? = nil;
        
        if let token = offendingSymbol as? Token {
            if let text = token.getText() {
                offendingText = text
            }
        }
        
        let formattedMessage = formatErrorMessage(line: line, charPositionInLine: charPositionInLine, msg: msg, offendingText: offendingText)
        
        let syntaxError = JexLangSyntaxError(message: formattedMessage, location: SyntaxErrorLocation(line: line, column: charPositionInLine, offendingSymbol: offendingText))
        
        syntaxErrors.append(syntaxError)
    }
    
    private func formatErrorMessage(line: Int, charPositionInLine: Int, msg: String, offendingText: String?) -> String {
        var cleanMessage = msg
            .replacingOccurrences(of: "no viable alternative at input", with: "Unexpected")
            .replacingOccurrences(of: "extraneous input", with: "Unexpected")
        
        if let offendingText = offendingText {
            cleanMessage = cleanMessage.replacingOccurrences(of: offendingText, with: self.escapeString(offendingText))
        }
        
        return "Syntax error at line \(line):\(charPositionInLine): \(cleanMessage)"
    }
    
    private func escapeString(_ str: String) -> String {
        return str
            .replacingOccurrences(of: "\n", with: "\\n")
            .replacingOccurrences(of: "\r", with: "\\r")
            .replacingOccurrences(of: "\t", with: "\\t")
    }
    
    public func clear() {
        self.syntaxErrors.removeAll()
    }
}

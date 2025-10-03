//
//  JexEvaluator.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

public class JexEvaluator {
    
    private var context: [String: Any] = [:]
    private var cacheParsedTrees: [String: JexLangParser.ProgramContext] = [:]
    private var cacheExpressions: Bool = false
    
    private let evalVisitor: EvalVisitor
    
    private var errorListener: JexLangErrorListener
    
    public init(_ context: [String: Any]? = nil) {
        if (context != nil) {
            self.context = context!
        }
        
        self.evalVisitor = EvalVisitor()
        self.errorListener = JexLangErrorListener()
    }
    
    private func parseExpression(expr: String) throws -> JexLangParser.ProgramContext {
        if (self.cacheParsedTrees.keys.contains(expr) && self.cacheExpressions) {
            if let cacheTree = self.cacheParsedTrees[expr] {
                return cacheTree
            }
        }
        
        let charStream = ANTLRInputStream(expr)
        let lexer = JexLangLexer(charStream)
        let tokens = CommonTokenStream(lexer)
        let parser = try! JexLangParser(tokens)
        
        // Remove the default console error listener
        lexer.removeErrorListeners()
        
        // Add our custom error listener
        self.errorListener.clear()
        lexer.addErrorListener(self.errorListener)
        
        // Remove default console error listener from parser too
        parser.removeErrorListeners();
        parser.addErrorListener(self.errorListener);
        
        let tree = try! parser.program()
        
        if (self.errorListener.hasErrors()) {
            throw self.errorListener.getSyntaxErrors()[0]
        }
        
        if (self.cacheExpressions) {
            self.cacheParsedTrees[expr] = tree
        }
        
        self.cacheParsedTrees[expr] = tree
        return tree
    }
    
    public func evaluate(
        expr: String,
        programScopeVariables: [String: Any]? = nil
    ) throws -> AnyObject? {
        let programContext = try parseExpression(expr: expr)
        
        let value: JexValue? = self.evalVisitor.visit(programContext)
        
        guard let value = value else {
            return nil
        }
        
        return value.toObject()
    }
}

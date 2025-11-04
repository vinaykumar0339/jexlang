//
//  JexEvaluator.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

// MARK: - Evaluator

public class JexEvaluator {

    private var context: [String: Any] = [:]
    private var cacheParsedTrees: [String: JexLangParser.ProgramContext] = [:]
    private var cacheExpressions: Bool = false
    
    // Holding strong references. If we put this as local variable inside parseExpression. outside function this instances deallocating.
    private var lexer: JexLangLexer!
    private var tokens: CommonTokenStream!
    private var parser: JexLangParser!

    private let evalVisitor: EvalVisitor

    public init(_ context: [String: Any]? = nil) {
        if let context = context {
            self.context = context
        }
        self.evalVisitor = EvalVisitor()
    }

    // MARK: - Parse (with caching)

    private func parseExpression(expr: String) throws -> JexLangParser.ProgramContext {
        if cacheExpressions, let cached = cacheParsedTrees[expr] {
            return cached
        }
        
        let input = ANTLRInputStream(expr)
        self.lexer = JexLangLexer(input)
        self.tokens = CommonTokenStream(lexer)
        self.parser = try JexLangParser(tokens)
        let errorListener = JexLangErrorListener()

        // --- Error handling setup ---
        lexer.removeErrorListeners()
        parser.removeErrorListeners()

        lexer.addErrorListener(errorListener)
        parser.addErrorListener(errorListener)
        errorListener.clear()

        // --- Parse ---
        let tree = try parser.program()

        // --- Validate syntax errors ---
        if errorListener.hasErrors() {
            throw errorListener.getSyntaxErrors()[0]
        }

        if cacheExpressions {
            cacheParsedTrees[expr] = tree
        }

        return tree
    }

    // MARK: - Evaluate

    public func evaluate(
        expr: String,
        programScopeVariables: [String: Any]? = nil
    ) throws -> AnyObject? {
        let programContext = try parseExpression(expr: expr)

        // Evaluate using the retained parser context
        guard let value = evalVisitor.visit(programContext) else {
            return nil
        }

        return value.toObject()
    }
}


//
//  JexEvaluator.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

// MARK: - Parse Session

public class JexParseSession {
    public let lexer: JexLangLexer
    public let tokens: CommonTokenStream
    public let parser: JexLangParser
    public let tree: JexLangParser.ProgramContext
    public let errorListener: JexLangErrorListener

    public init(_ expr: String) throws {
        let input = ANTLRInputStream(expr)
        self.lexer = JexLangLexer(input)
        self.tokens = CommonTokenStream(lexer)
        self.parser = try JexLangParser(tokens)
        self.errorListener = JexLangErrorListener()

        // --- Error handling setup ---
        lexer.removeErrorListeners()
        parser.removeErrorListeners()

        lexer.addErrorListener(errorListener)
        parser.addErrorListener(errorListener)
        errorListener.clear()

        // --- Parse ---
        self.tree = try parser.program()

        // --- Validate syntax errors ---
        if errorListener.hasErrors() {
            throw errorListener.getSyntaxErrors()[0]
        }
    }
}

// MARK: - Evaluator

public class JexEvaluator {

    private var context: [String: Any] = [:]
    private var cacheParsedTrees: [String: JexParseSession] = [:]
    private var cacheExpressions: Bool = false

    private let evalVisitor: EvalVisitor

    public init(_ context: [String: Any]? = nil) {
        if let context = context {
            self.context = context
        }
        self.evalVisitor = EvalVisitor()
    }

    // MARK: - Parse (with caching)

    private func parseExpression(expr: String) throws -> JexParseSession {
        if cacheExpressions, let cached = cacheParsedTrees[expr] {
            return cached
        }

        let session = try JexParseSession(expr)

        if cacheExpressions {
            cacheParsedTrees[expr] = session
        }

        return session
    }

    // MARK: - Evaluate

    public func evaluate(
        expr: String,
        programScopeVariables: [String: Any]? = nil
    ) throws -> AnyObject? {
        let session = try parseExpression(expr: expr)

        // Evaluate using the retained parser context
        guard let value = evalVisitor.visit(session.tree) else {
            return nil
        }

        return value.toObject()
    }
}


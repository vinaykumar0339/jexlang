//
//  EvalVisitor.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

public class EvalVisitor: JexLangBaseVisitor<JexValue> {
    
    public override func visitProgram(_ ctx: JexLangParser.ProgramContext) -> JexValue? {
        var result: JexValue? = nil
        
        for (_, statement) in ctx.statement().enumerated() {
            result = self.visit(statement);
        }
        
        return result != nil ? result : JexNil()
    }
    
    public override func visitStatement(_ ctx: JexLangParser.StatementContext) -> JexValue? {
        if let varDeclaration = ctx.varDeclaration() {
            return self.visit(varDeclaration)
        } else if let block = ctx.block() {
            return self.visit(block)
        } else if let expressionStatement = ctx.expressionStatement() {
            return self.visit(expressionStatement)
        } else if let emptyStatement = ctx.emptyStatement() {
            return self.visit(emptyStatement)
        }
        
        return JexNil()
    }
    
    public override func visitExpressionStatement(_ ctx: JexLangParser.ExpressionStatementContext) -> JexValue? {
        if let expressionSequence = ctx.expressionSequence() {
            return self.visit(expressionSequence)
        }
        
        return JexNil()
    }
    
    
    public override func visitEmptyStatement(_ ctx: JexLangParser.EmptyStatementContext) -> JexValue {
        return JexNil()
    }
    
    public override func visitExpressionSequence(_ ctx: JexLangParser.ExpressionSequenceContext) -> JexValue? {
        var result: JexValue? = nil
        for singleExpression in ctx.singleExpression() {
            result = self.visit(singleExpression)
        }
        return result != nil ? result : JexNil()
    }
    
    public override func visitBlock(_ ctx: JexLangParser.BlockContext) -> (any JexValue)? {
        // Create a new scope for the block
        
        var value: JexValue? = nil
        
        for statement in ctx.statement() {
            value = self.visit(statement)
        }
        
        return value != nil ? value : JexNil()
    }
    
    // Literals
    public override func visitLiteralExpression(_ ctx: JexLangParser.LiteralExpressionContext) -> JexValue? {
        if let literal = ctx.literal() {
            return self.visit(literal)
        }
        return JexNil()
    }
    
    public override func visitNumberLiteral(_ ctx: JexLangParser.NumberLiteralContext) -> JexValue? {
        if let number = try? JexValueFactory.fromNumber(number: toNumber(value: JexString(value: ctx.getText()), ctx: "number literal")) {
            return number
        }
        return JexNil()
    }
    
    public override func visitBooleanLiteral(_ ctx: JexLangParser.BooleanLiteralContext) -> JexValue? {
        return JexBoolean(value: ctx.getText().lowercased() == "true")
    }
    
    public override func visitStringLiteral(_ ctx: JexLangParser.StringLiteralContext) -> JexValue? {
        let text = ctx.getText()
        return JexString(value: String(text[text.index(after: text.startIndex)..<text.index(before: text.endIndex)])) // Remove quotes
    }
    
    public override func visitNullLiteral(_ ctx: JexLangParser.NullLiteralContext) -> JexValue? {
        return JexNil()
    }
    
    // End Literals
    
    public override func visitAdditiveExpression(_ ctx: JexLangParser.AdditiveExpressionContext) -> JexValue? {
        if let leftExpression = ctx.singleExpression(0), let rightExpression = ctx.singleExpression(1) {
            let left = self.visit(leftExpression)!
            let right = self.visit(rightExpression)!
            if (ctx.PLUS() != nil) {
                // If either operand is a string, perform string concatenation
                if (left.isString() || right.isString()) {
                    if let leftString = try? toString(value: left, ctx: "additive expression"), let rightString = try? toString(value: right, ctx: "additive expression") {
                        return JexValueFactory.fromString(string: leftString + rightString)
                    }
                }
                
                if let lefNum = try? toNumber(value: left, ctx: "additive expression"), let rightNum = try? toNumber(value: right, ctx: "additive expression") {
                    return JexValueFactory.fromNumber(number: NSNumber(value: lefNum.doubleValue + rightNum.doubleValue))
                }
                
            } else if (ctx.MINUS() != nil) {
                if let lefNum = try? toNumber(value: left, ctx: "additive expression"), let rightNum = try? toNumber(value: right, ctx: "additive expression") {
                    return JexValueFactory.fromNumber(number: NSNumber(value: lefNum.doubleValue - rightNum.doubleValue))
                }
            }
        }
        
        return nil
    }
    
    public override func visitParenthesizedExpression(_ ctx: JexLangParser.ParenthesizedExpressionContext) -> JexValue {
        if let expressionSequenceContext = ctx.expressionSequence() {
            return self.visit(expressionSequenceContext) ?? JexNil()
        }
        return JexNil()
    }
    
    public override func defaultResult() -> JexValue {
        return JexNil()
    }
}

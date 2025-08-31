// Generated from JexLang.g4 by ANTLR 4.13.2

    package com.jexlang.java.grammar;

import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link JexLangParser}.
 */
public interface JexLangListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link JexLangParser#program}.
	 * @param ctx the parse tree
	 */
	void enterProgram(JexLangParser.ProgramContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#program}.
	 * @param ctx the parse tree
	 */
	void exitProgram(JexLangParser.ProgramContext ctx);
	/**
	 * Enter a parse tree produced by {@link JexLangParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterStatement(JexLangParser.StatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitStatement(JexLangParser.StatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link JexLangParser#block}.
	 * @param ctx the parse tree
	 */
	void enterBlock(JexLangParser.BlockContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#block}.
	 * @param ctx the parse tree
	 */
	void exitBlock(JexLangParser.BlockContext ctx);
	/**
	 * Enter a parse tree produced by {@link JexLangParser#emptyStatement}.
	 * @param ctx the parse tree
	 */
	void enterEmptyStatement(JexLangParser.EmptyStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#emptyStatement}.
	 * @param ctx the parse tree
	 */
	void exitEmptyStatement(JexLangParser.EmptyStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link JexLangParser#varDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterVarDeclaration(JexLangParser.VarDeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#varDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitVarDeclaration(JexLangParser.VarDeclarationContext ctx);
	/**
	 * Enter a parse tree produced by {@link JexLangParser#expressionStatement}.
	 * @param ctx the parse tree
	 */
	void enterExpressionStatement(JexLangParser.ExpressionStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#expressionStatement}.
	 * @param ctx the parse tree
	 */
	void exitExpressionStatement(JexLangParser.ExpressionStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link JexLangParser#expressionSequence}.
	 * @param ctx the parse tree
	 */
	void enterExpressionSequence(JexLangParser.ExpressionSequenceContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#expressionSequence}.
	 * @param ctx the parse tree
	 */
	void exitExpressionSequence(JexLangParser.ExpressionSequenceContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ParenthesizedExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterParenthesizedExpression(JexLangParser.ParenthesizedExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ParenthesizedExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitParenthesizedExpression(JexLangParser.ParenthesizedExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ShortTernaryExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterShortTernaryExpression(JexLangParser.ShortTernaryExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ShortTernaryExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitShortTernaryExpression(JexLangParser.ShortTernaryExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code AdditiveExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterAdditiveExpression(JexLangParser.AdditiveExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code AdditiveExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitAdditiveExpression(JexLangParser.AdditiveExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code RelationalExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterRelationalExpression(JexLangParser.RelationalExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code RelationalExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitRelationalExpression(JexLangParser.RelationalExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code TernaryExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterTernaryExpression(JexLangParser.TernaryExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code TernaryExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitTernaryExpression(JexLangParser.TernaryExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code BracketPropertyAssignment}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterBracketPropertyAssignment(JexLangParser.BracketPropertyAssignmentContext ctx);
	/**
	 * Exit a parse tree produced by the {@code BracketPropertyAssignment}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitBracketPropertyAssignment(JexLangParser.BracketPropertyAssignmentContext ctx);
	/**
	 * Enter a parse tree produced by the {@code LogicalAndExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterLogicalAndExpression(JexLangParser.LogicalAndExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code LogicalAndExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitLogicalAndExpression(JexLangParser.LogicalAndExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code PowerExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterPowerExpression(JexLangParser.PowerExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code PowerExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitPowerExpression(JexLangParser.PowerExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code DotPropertyAssignment}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterDotPropertyAssignment(JexLangParser.DotPropertyAssignmentContext ctx);
	/**
	 * Exit a parse tree produced by the {@code DotPropertyAssignment}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitDotPropertyAssignment(JexLangParser.DotPropertyAssignmentContext ctx);
	/**
	 * Enter a parse tree produced by the {@code LiteralExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterLiteralExpression(JexLangParser.LiteralExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code LiteralExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitLiteralExpression(JexLangParser.LiteralExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code LogicalOrExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterLogicalOrExpression(JexLangParser.LogicalOrExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code LogicalOrExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitLogicalOrExpression(JexLangParser.LogicalOrExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code MemberDotExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterMemberDotExpression(JexLangParser.MemberDotExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code MemberDotExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitMemberDotExpression(JexLangParser.MemberDotExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code UnaryExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterUnaryExpression(JexLangParser.UnaryExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code UnaryExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitUnaryExpression(JexLangParser.UnaryExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code MemberIndexExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterMemberIndexExpression(JexLangParser.MemberIndexExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code MemberIndexExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitMemberIndexExpression(JexLangParser.MemberIndexExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code FunctionCallExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterFunctionCallExpression(JexLangParser.FunctionCallExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code FunctionCallExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitFunctionCallExpression(JexLangParser.FunctionCallExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code IdentifierExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterIdentifierExpression(JexLangParser.IdentifierExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code IdentifierExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitIdentifierExpression(JexLangParser.IdentifierExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code AssignmentExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterAssignmentExpression(JexLangParser.AssignmentExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code AssignmentExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitAssignmentExpression(JexLangParser.AssignmentExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code TransformExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterTransformExpression(JexLangParser.TransformExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code TransformExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitTransformExpression(JexLangParser.TransformExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code PrefixExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterPrefixExpression(JexLangParser.PrefixExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code PrefixExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitPrefixExpression(JexLangParser.PrefixExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code PostfixExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterPostfixExpression(JexLangParser.PostfixExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code PostfixExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitPostfixExpression(JexLangParser.PostfixExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code SquareRootExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterSquareRootExpression(JexLangParser.SquareRootExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code SquareRootExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitSquareRootExpression(JexLangParser.SquareRootExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code EqualityExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterEqualityExpression(JexLangParser.EqualityExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code EqualityExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitEqualityExpression(JexLangParser.EqualityExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code MultiplicativeExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void enterMultiplicativeExpression(JexLangParser.MultiplicativeExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code MultiplicativeExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 */
	void exitMultiplicativeExpression(JexLangParser.MultiplicativeExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StringLiteral}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 */
	void enterStringLiteral(JexLangParser.StringLiteralContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StringLiteral}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 */
	void exitStringLiteral(JexLangParser.StringLiteralContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NumberLiteral}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 */
	void enterNumberLiteral(JexLangParser.NumberLiteralContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NumberLiteral}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 */
	void exitNumberLiteral(JexLangParser.NumberLiteralContext ctx);
	/**
	 * Enter a parse tree produced by the {@code BooleanLiteral}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 */
	void enterBooleanLiteral(JexLangParser.BooleanLiteralContext ctx);
	/**
	 * Exit a parse tree produced by the {@code BooleanLiteral}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 */
	void exitBooleanLiteral(JexLangParser.BooleanLiteralContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NullLiteral}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 */
	void enterNullLiteral(JexLangParser.NullLiteralContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NullLiteral}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 */
	void exitNullLiteral(JexLangParser.NullLiteralContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ArrayLiteralExpression}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 */
	void enterArrayLiteralExpression(JexLangParser.ArrayLiteralExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ArrayLiteralExpression}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 */
	void exitArrayLiteralExpression(JexLangParser.ArrayLiteralExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ObjectLiteralExpression}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 */
	void enterObjectLiteralExpression(JexLangParser.ObjectLiteralExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ObjectLiteralExpression}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 */
	void exitObjectLiteralExpression(JexLangParser.ObjectLiteralExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link JexLangParser#arrayLiteral}.
	 * @param ctx the parse tree
	 */
	void enterArrayLiteral(JexLangParser.ArrayLiteralContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#arrayLiteral}.
	 * @param ctx the parse tree
	 */
	void exitArrayLiteral(JexLangParser.ArrayLiteralContext ctx);
	/**
	 * Enter a parse tree produced by {@link JexLangParser#arrayElement}.
	 * @param ctx the parse tree
	 */
	void enterArrayElement(JexLangParser.ArrayElementContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#arrayElement}.
	 * @param ctx the parse tree
	 */
	void exitArrayElement(JexLangParser.ArrayElementContext ctx);
	/**
	 * Enter a parse tree produced by {@link JexLangParser#objectLiteral}.
	 * @param ctx the parse tree
	 */
	void enterObjectLiteral(JexLangParser.ObjectLiteralContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#objectLiteral}.
	 * @param ctx the parse tree
	 */
	void exitObjectLiteral(JexLangParser.ObjectLiteralContext ctx);
	/**
	 * Enter a parse tree produced by the {@code PropertyExpressionObjectProperty}
	 * labeled alternative in {@link JexLangParser#objectProperty}.
	 * @param ctx the parse tree
	 */
	void enterPropertyExpressionObjectProperty(JexLangParser.PropertyExpressionObjectPropertyContext ctx);
	/**
	 * Exit a parse tree produced by the {@code PropertyExpressionObjectProperty}
	 * labeled alternative in {@link JexLangParser#objectProperty}.
	 * @param ctx the parse tree
	 */
	void exitPropertyExpressionObjectProperty(JexLangParser.PropertyExpressionObjectPropertyContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ComputedPropertyExpressionObjectProperty}
	 * labeled alternative in {@link JexLangParser#objectProperty}.
	 * @param ctx the parse tree
	 */
	void enterComputedPropertyExpressionObjectProperty(JexLangParser.ComputedPropertyExpressionObjectPropertyContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ComputedPropertyExpressionObjectProperty}
	 * labeled alternative in {@link JexLangParser#objectProperty}.
	 * @param ctx the parse tree
	 */
	void exitComputedPropertyExpressionObjectProperty(JexLangParser.ComputedPropertyExpressionObjectPropertyContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ShorthandPropertyExpressionObjectProperty}
	 * labeled alternative in {@link JexLangParser#objectProperty}.
	 * @param ctx the parse tree
	 */
	void enterShorthandPropertyExpressionObjectProperty(JexLangParser.ShorthandPropertyExpressionObjectPropertyContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ShorthandPropertyExpressionObjectProperty}
	 * labeled alternative in {@link JexLangParser#objectProperty}.
	 * @param ctx the parse tree
	 */
	void exitShorthandPropertyExpressionObjectProperty(JexLangParser.ShorthandPropertyExpressionObjectPropertyContext ctx);
	/**
	 * Enter a parse tree produced by {@link JexLangParser#objectPropertyName}.
	 * @param ctx the parse tree
	 */
	void enterObjectPropertyName(JexLangParser.ObjectPropertyNameContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#objectPropertyName}.
	 * @param ctx the parse tree
	 */
	void exitObjectPropertyName(JexLangParser.ObjectPropertyNameContext ctx);
	/**
	 * Enter a parse tree produced by {@link JexLangParser#arguments}.
	 * @param ctx the parse tree
	 */
	void enterArguments(JexLangParser.ArgumentsContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#arguments}.
	 * @param ctx the parse tree
	 */
	void exitArguments(JexLangParser.ArgumentsContext ctx);
	/**
	 * Enter a parse tree produced by {@link JexLangParser#argument}.
	 * @param ctx the parse tree
	 */
	void enterArgument(JexLangParser.ArgumentContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#argument}.
	 * @param ctx the parse tree
	 */
	void exitArgument(JexLangParser.ArgumentContext ctx);
}
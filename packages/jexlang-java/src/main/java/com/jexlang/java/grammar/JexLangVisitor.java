// Generated from JexLang.g4 by ANTLR 4.13.2

    package com.jexlang.java.grammar;

import org.antlr.v4.runtime.tree.ParseTreeVisitor;

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by {@link JexLangParser}.
 *
 * @param <T> The return type of the visit operation. Use {@link Void} for
 * operations with no return type.
 */
public interface JexLangVisitor<T> extends ParseTreeVisitor<T> {
	/**
	 * Visit a parse tree produced by {@link JexLangParser#program}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitProgram(JexLangParser.ProgramContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#statement}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStatement(JexLangParser.StatementContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#assignment}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAssignment(JexLangParser.AssignmentContext ctx);
	/**
	 * Visit a parse tree produced by the {@code DotPropertyAssignment}
	 * labeled alternative in {@link JexLangParser#propertyAssignment}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDotPropertyAssignment(JexLangParser.DotPropertyAssignmentContext ctx);
	/**
	 * Visit a parse tree produced by the {@code BracketPropertyAssignment}
	 * labeled alternative in {@link JexLangParser#propertyAssignment}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBracketPropertyAssignment(JexLangParser.BracketPropertyAssignmentContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#localDeclaration}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLocalDeclaration(JexLangParser.LocalDeclarationContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ShortTernaryExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitShortTernaryExpression(JexLangParser.ShortTernaryExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code TernaryExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTernaryExpression(JexLangParser.TernaryExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code LogicalAndExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLogicalAndExpression(JexLangParser.LogicalAndExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code PowerExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPowerExpression(JexLangParser.PowerExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ObjectLiteralExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitObjectLiteralExpression(JexLangParser.ObjectLiteralExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code LogicalOrExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLogicalOrExpression(JexLangParser.LogicalOrExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code PrefixIncrementExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPrefixIncrementExpression(JexLangParser.PrefixIncrementExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code MulDivModExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitMulDivModExpression(JexLangParser.MulDivModExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code FunctionCallExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFunctionCallExpression(JexLangParser.FunctionCallExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code AddSubExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAddSubExpression(JexLangParser.AddSubExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code BooleanExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBooleanExpression(JexLangParser.BooleanExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code UnaryMinusExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUnaryMinusExpression(JexLangParser.UnaryMinusExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ComparatorExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitComparatorExpression(JexLangParser.ComparatorExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code UnaryPlusExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUnaryPlusExpression(JexLangParser.UnaryPlusExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code PostfixIncrementExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPostfixIncrementExpression(JexLangParser.PostfixIncrementExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code PrefixDecrementExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPrefixDecrementExpression(JexLangParser.PrefixDecrementExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ParenthesizedExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitParenthesizedExpression(JexLangParser.ParenthesizedExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code PostfixDecrementExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPostfixDecrementExpression(JexLangParser.PostfixDecrementExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ArrayLiteralExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArrayLiteralExpression(JexLangParser.ArrayLiteralExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code VariableExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitVariableExpression(JexLangParser.VariableExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NumberExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumberExpression(JexLangParser.NumberExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code DotPropertyAccessExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDotPropertyAccessExpression(JexLangParser.DotPropertyAccessExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code TransformExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTransformExpression(JexLangParser.TransformExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StringExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStringExpression(JexLangParser.StringExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code BracketPropertyAccessExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBracketPropertyAccessExpression(JexLangParser.BracketPropertyAccessExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code SquareRootExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSquareRootExpression(JexLangParser.SquareRootExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#objectLiteral}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitObjectLiteral(JexLangParser.ObjectLiteralContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#objectProperty}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitObjectProperty(JexLangParser.ObjectPropertyContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#functionCall}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFunctionCall(JexLangParser.FunctionCallContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#argumentList}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArgumentList(JexLangParser.ArgumentListContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#arrayLiteral}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArrayLiteral(JexLangParser.ArrayLiteralContext ctx);
}
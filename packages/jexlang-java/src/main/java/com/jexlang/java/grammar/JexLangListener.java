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
	 * Enter a parse tree produced by {@link JexLangParser#assignment}.
	 * @param ctx the parse tree
	 */
	void enterAssignment(JexLangParser.AssignmentContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#assignment}.
	 * @param ctx the parse tree
	 */
	void exitAssignment(JexLangParser.AssignmentContext ctx);
	/**
	 * Enter a parse tree produced by the {@code DotPropertyAssignment}
	 * labeled alternative in {@link JexLangParser#propertyAssignment}.
	 * @param ctx the parse tree
	 */
	void enterDotPropertyAssignment(JexLangParser.DotPropertyAssignmentContext ctx);
	/**
	 * Exit a parse tree produced by the {@code DotPropertyAssignment}
	 * labeled alternative in {@link JexLangParser#propertyAssignment}.
	 * @param ctx the parse tree
	 */
	void exitDotPropertyAssignment(JexLangParser.DotPropertyAssignmentContext ctx);
	/**
	 * Enter a parse tree produced by the {@code BracketPropertyAssignment}
	 * labeled alternative in {@link JexLangParser#propertyAssignment}.
	 * @param ctx the parse tree
	 */
	void enterBracketPropertyAssignment(JexLangParser.BracketPropertyAssignmentContext ctx);
	/**
	 * Exit a parse tree produced by the {@code BracketPropertyAssignment}
	 * labeled alternative in {@link JexLangParser#propertyAssignment}.
	 * @param ctx the parse tree
	 */
	void exitBracketPropertyAssignment(JexLangParser.BracketPropertyAssignmentContext ctx);
	/**
	 * Enter a parse tree produced by {@link JexLangParser#localDeclaration}.
	 * @param ctx the parse tree
	 */
	void enterLocalDeclaration(JexLangParser.LocalDeclarationContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#localDeclaration}.
	 * @param ctx the parse tree
	 */
	void exitLocalDeclaration(JexLangParser.LocalDeclarationContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ShortTernaryExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterShortTernaryExpression(JexLangParser.ShortTernaryExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ShortTernaryExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitShortTernaryExpression(JexLangParser.ShortTernaryExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code TernaryExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterTernaryExpression(JexLangParser.TernaryExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code TernaryExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitTernaryExpression(JexLangParser.TernaryExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code LogicalAndExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterLogicalAndExpression(JexLangParser.LogicalAndExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code LogicalAndExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitLogicalAndExpression(JexLangParser.LogicalAndExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code PowerExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterPowerExpression(JexLangParser.PowerExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code PowerExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitPowerExpression(JexLangParser.PowerExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ObjectLiteralExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterObjectLiteralExpression(JexLangParser.ObjectLiteralExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ObjectLiteralExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitObjectLiteralExpression(JexLangParser.ObjectLiteralExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code LogicalOrExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterLogicalOrExpression(JexLangParser.LogicalOrExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code LogicalOrExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitLogicalOrExpression(JexLangParser.LogicalOrExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code PrefixIncrementExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterPrefixIncrementExpression(JexLangParser.PrefixIncrementExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code PrefixIncrementExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitPrefixIncrementExpression(JexLangParser.PrefixIncrementExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code MulDivModExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterMulDivModExpression(JexLangParser.MulDivModExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code MulDivModExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitMulDivModExpression(JexLangParser.MulDivModExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code FunctionCallExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterFunctionCallExpression(JexLangParser.FunctionCallExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code FunctionCallExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitFunctionCallExpression(JexLangParser.FunctionCallExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code AddSubExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterAddSubExpression(JexLangParser.AddSubExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code AddSubExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitAddSubExpression(JexLangParser.AddSubExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code BooleanExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterBooleanExpression(JexLangParser.BooleanExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code BooleanExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitBooleanExpression(JexLangParser.BooleanExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code UnaryMinusExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterUnaryMinusExpression(JexLangParser.UnaryMinusExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code UnaryMinusExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitUnaryMinusExpression(JexLangParser.UnaryMinusExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ComparatorExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterComparatorExpression(JexLangParser.ComparatorExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ComparatorExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitComparatorExpression(JexLangParser.ComparatorExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code UnaryPlusExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterUnaryPlusExpression(JexLangParser.UnaryPlusExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code UnaryPlusExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitUnaryPlusExpression(JexLangParser.UnaryPlusExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code PostfixIncrementExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterPostfixIncrementExpression(JexLangParser.PostfixIncrementExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code PostfixIncrementExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitPostfixIncrementExpression(JexLangParser.PostfixIncrementExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code PrefixDecrementExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterPrefixDecrementExpression(JexLangParser.PrefixDecrementExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code PrefixDecrementExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitPrefixDecrementExpression(JexLangParser.PrefixDecrementExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ParenthesizedExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterParenthesizedExpression(JexLangParser.ParenthesizedExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ParenthesizedExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitParenthesizedExpression(JexLangParser.ParenthesizedExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code PostfixDecrementExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterPostfixDecrementExpression(JexLangParser.PostfixDecrementExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code PostfixDecrementExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitPostfixDecrementExpression(JexLangParser.PostfixDecrementExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ArrayLiteralExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterArrayLiteralExpression(JexLangParser.ArrayLiteralExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ArrayLiteralExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitArrayLiteralExpression(JexLangParser.ArrayLiteralExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code VariableExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterVariableExpression(JexLangParser.VariableExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code VariableExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitVariableExpression(JexLangParser.VariableExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NumberExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterNumberExpression(JexLangParser.NumberExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NumberExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitNumberExpression(JexLangParser.NumberExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code DotPropertyAccessExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterDotPropertyAccessExpression(JexLangParser.DotPropertyAccessExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code DotPropertyAccessExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitDotPropertyAccessExpression(JexLangParser.DotPropertyAccessExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code TransformExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterTransformExpression(JexLangParser.TransformExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code TransformExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitTransformExpression(JexLangParser.TransformExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code StringExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterStringExpression(JexLangParser.StringExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code StringExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitStringExpression(JexLangParser.StringExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code BracketPropertyAccessExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterBracketPropertyAccessExpression(JexLangParser.BracketPropertyAccessExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code BracketPropertyAccessExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitBracketPropertyAccessExpression(JexLangParser.BracketPropertyAccessExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code SquareRootExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterSquareRootExpression(JexLangParser.SquareRootExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code SquareRootExpression}
	 * labeled alternative in {@link JexLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitSquareRootExpression(JexLangParser.SquareRootExpressionContext ctx);
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
	 * Enter a parse tree produced by {@link JexLangParser#objectProperty}.
	 * @param ctx the parse tree
	 */
	void enterObjectProperty(JexLangParser.ObjectPropertyContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#objectProperty}.
	 * @param ctx the parse tree
	 */
	void exitObjectProperty(JexLangParser.ObjectPropertyContext ctx);
	/**
	 * Enter a parse tree produced by {@link JexLangParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterFunctionCall(JexLangParser.FunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitFunctionCall(JexLangParser.FunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by {@link JexLangParser#argumentList}.
	 * @param ctx the parse tree
	 */
	void enterArgumentList(JexLangParser.ArgumentListContext ctx);
	/**
	 * Exit a parse tree produced by {@link JexLangParser#argumentList}.
	 * @param ctx the parse tree
	 */
	void exitArgumentList(JexLangParser.ArgumentListContext ctx);
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
}
// Generated from JexLang.g4 by ANTLR 4.13.2

     package io.github.vinaykumar0339.grammar;

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
	 * Visit a parse tree produced by {@link JexLangParser#block}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBlock(JexLangParser.BlockContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#emptyStatement}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEmptyStatement(JexLangParser.EmptyStatementContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#varDeclaration}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitVarDeclaration(JexLangParser.VarDeclarationContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#expressionStatement}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpressionStatement(JexLangParser.ExpressionStatementContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#expressionSequence}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpressionSequence(JexLangParser.ExpressionSequenceContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ShortTernaryExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitShortTernaryExpression(JexLangParser.ShortTernaryExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code TernaryExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTernaryExpression(JexLangParser.TernaryExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code LogicalAndExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLogicalAndExpression(JexLangParser.LogicalAndExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code PowerExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPowerExpression(JexLangParser.PowerExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code LogicalOrExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLogicalOrExpression(JexLangParser.LogicalOrExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code UnaryExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitUnaryExpression(JexLangParser.UnaryExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code FunctionCallExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFunctionCallExpression(JexLangParser.FunctionCallExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code AssignmentExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAssignmentExpression(JexLangParser.AssignmentExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code EqualityExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitEqualityExpression(JexLangParser.EqualityExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code MultiplicativeExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitMultiplicativeExpression(JexLangParser.MultiplicativeExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ParenthesizedExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitParenthesizedExpression(JexLangParser.ParenthesizedExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code IfExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIfExpression(JexLangParser.IfExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code AdditiveExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAdditiveExpression(JexLangParser.AdditiveExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code RelationalExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitRelationalExpression(JexLangParser.RelationalExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code BracketPropertyAssignment}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBracketPropertyAssignment(JexLangParser.BracketPropertyAssignmentContext ctx);
	/**
	 * Visit a parse tree produced by the {@code DotPropertyAssignment}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDotPropertyAssignment(JexLangParser.DotPropertyAssignmentContext ctx);
	/**
	 * Visit a parse tree produced by the {@code LiteralExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitLiteralExpression(JexLangParser.LiteralExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code MemberDotExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitMemberDotExpression(JexLangParser.MemberDotExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code MemberIndexExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitMemberIndexExpression(JexLangParser.MemberIndexExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code IdentifierExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIdentifierExpression(JexLangParser.IdentifierExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code RepeatExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitRepeatExpression(JexLangParser.RepeatExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code TransformExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTransformExpression(JexLangParser.TransformExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code PrefixExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPrefixExpression(JexLangParser.PrefixExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code PostfixExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPostfixExpression(JexLangParser.PostfixExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code SquareRootExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSquareRootExpression(JexLangParser.SquareRootExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ElseIfClause}
	 * labeled alternative in {@link JexLangParser#elseIfStatement}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitElseIfClause(JexLangParser.ElseIfClauseContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ElseClause}
	 * labeled alternative in {@link JexLangParser#elseIfStatement}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitElseClause(JexLangParser.ElseClauseContext ctx);
	/**
	 * Visit a parse tree produced by the {@code StringLiteral}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStringLiteral(JexLangParser.StringLiteralContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NumberLiteral}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNumberLiteral(JexLangParser.NumberLiteralContext ctx);
	/**
	 * Visit a parse tree produced by the {@code BooleanLiteral}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBooleanLiteral(JexLangParser.BooleanLiteralContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NullLiteral}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNullLiteral(JexLangParser.NullLiteralContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ArrayLiteralExpression}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArrayLiteralExpression(JexLangParser.ArrayLiteralExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ObjectLiteralExpression}
	 * labeled alternative in {@link JexLangParser#literal}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitObjectLiteralExpression(JexLangParser.ObjectLiteralExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#arrayLiteral}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArrayLiteral(JexLangParser.ArrayLiteralContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#arrayElement}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArrayElement(JexLangParser.ArrayElementContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#objectLiteral}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitObjectLiteral(JexLangParser.ObjectLiteralContext ctx);
	/**
	 * Visit a parse tree produced by the {@code PropertyExpressionObjectProperty}
	 * labeled alternative in {@link JexLangParser#objectProperty}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPropertyExpressionObjectProperty(JexLangParser.PropertyExpressionObjectPropertyContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ComputedPropertyExpressionObjectProperty}
	 * labeled alternative in {@link JexLangParser#objectProperty}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitComputedPropertyExpressionObjectProperty(JexLangParser.ComputedPropertyExpressionObjectPropertyContext ctx);
	/**
	 * Visit a parse tree produced by the {@code ShorthandPropertyExpressionObjectProperty}
	 * labeled alternative in {@link JexLangParser#objectProperty}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitShorthandPropertyExpressionObjectProperty(JexLangParser.ShorthandPropertyExpressionObjectPropertyContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#objectPropertyName}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitObjectPropertyName(JexLangParser.ObjectPropertyNameContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#arguments}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArguments(JexLangParser.ArgumentsContext ctx);
	/**
	 * Visit a parse tree produced by {@link JexLangParser#argument}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArgument(JexLangParser.ArgumentContext ctx);
}
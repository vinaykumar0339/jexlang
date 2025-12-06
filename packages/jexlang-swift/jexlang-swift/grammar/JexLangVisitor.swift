// Generated from JexLang.g4 by ANTLR 4.13.2
import Antlr4

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by {@link JexLangParser}.
 *
 * @param <T> The return type of the visit operation. Use {@link Void} for
 * operations with no return type.
 */
open class JexLangVisitor<T>: ParseTreeVisitor<T> {
	/**
	 * Visit a parse tree produced by {@link JexLangParser#program}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitProgram(_ ctx: JexLangParser.ProgramContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by {@link JexLangParser#statement}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitStatement(_ ctx: JexLangParser.StatementContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by {@link JexLangParser#block}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitBlock(_ ctx: JexLangParser.BlockContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by {@link JexLangParser#emptyStatement}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitEmptyStatement(_ ctx: JexLangParser.EmptyStatementContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by {@link JexLangParser#varDeclaration}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitVarDeclaration(_ ctx: JexLangParser.VarDeclarationContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by {@link JexLangParser#expressionStatement}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitExpressionStatement(_ ctx: JexLangParser.ExpressionStatementContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by {@link JexLangParser#expressionSequence}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitExpressionSequence(_ ctx: JexLangParser.ExpressionSequenceContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code ShortTernaryExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitShortTernaryExpression(_ ctx: JexLangParser.ShortTernaryExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code TernaryExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitTernaryExpression(_ ctx: JexLangParser.TernaryExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code LogicalAndExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitLogicalAndExpression(_ ctx: JexLangParser.LogicalAndExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code PowerExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitPowerExpression(_ ctx: JexLangParser.PowerExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code LogicalOrExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitLogicalOrExpression(_ ctx: JexLangParser.LogicalOrExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code UnaryExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitUnaryExpression(_ ctx: JexLangParser.UnaryExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code FunctionCallExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitFunctionCallExpression(_ ctx: JexLangParser.FunctionCallExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code AssignmentExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitAssignmentExpression(_ ctx: JexLangParser.AssignmentExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code EqualityExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitEqualityExpression(_ ctx: JexLangParser.EqualityExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code MultiplicativeExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitMultiplicativeExpression(_ ctx: JexLangParser.MultiplicativeExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code ParenthesizedExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitParenthesizedExpression(_ ctx: JexLangParser.ParenthesizedExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code IfExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitIfExpression(_ ctx: JexLangParser.IfExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code AdditiveExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitAdditiveExpression(_ ctx: JexLangParser.AdditiveExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code RelationalExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitRelationalExpression(_ ctx: JexLangParser.RelationalExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code BracketPropertyAssignment}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitBracketPropertyAssignment(_ ctx: JexLangParser.BracketPropertyAssignmentContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code DotPropertyAssignment}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitDotPropertyAssignment(_ ctx: JexLangParser.DotPropertyAssignmentContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code LiteralExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitLiteralExpression(_ ctx: JexLangParser.LiteralExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code MemberDotExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitMemberDotExpression(_ ctx: JexLangParser.MemberDotExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code MemberIndexExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitMemberIndexExpression(_ ctx: JexLangParser.MemberIndexExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code IdentifierExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitIdentifierExpression(_ ctx: JexLangParser.IdentifierExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code RepeatExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitRepeatExpression(_ ctx: JexLangParser.RepeatExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code TransformExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitTransformExpression(_ ctx: JexLangParser.TransformExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code PrefixExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitPrefixExpression(_ ctx: JexLangParser.PrefixExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code PostfixExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitPostfixExpression(_ ctx: JexLangParser.PostfixExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code SquareRootExpression}
	 * labeled alternative in {@link JexLangParser#singleExpression}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitSquareRootExpression(_ ctx: JexLangParser.SquareRootExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code ElseIfClause}
	 * labeled alternative in {@link JexLangParser#elseIfStatement}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitElseIfClause(_ ctx: JexLangParser.ElseIfClauseContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code ElseClause}
	 * labeled alternative in {@link JexLangParser#elseIfStatement}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitElseClause(_ ctx: JexLangParser.ElseClauseContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code StringLiteral}
	 * labeled alternative in {@link JexLangParser#literal}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitStringLiteral(_ ctx: JexLangParser.StringLiteralContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code NumberLiteral}
	 * labeled alternative in {@link JexLangParser#literal}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitNumberLiteral(_ ctx: JexLangParser.NumberLiteralContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code BooleanLiteral}
	 * labeled alternative in {@link JexLangParser#literal}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitBooleanLiteral(_ ctx: JexLangParser.BooleanLiteralContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code NullLiteral}
	 * labeled alternative in {@link JexLangParser#literal}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitNullLiteral(_ ctx: JexLangParser.NullLiteralContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code ArrayLiteralExpression}
	 * labeled alternative in {@link JexLangParser#literal}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitArrayLiteralExpression(_ ctx: JexLangParser.ArrayLiteralExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code ObjectLiteralExpression}
	 * labeled alternative in {@link JexLangParser#literal}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitObjectLiteralExpression(_ ctx: JexLangParser.ObjectLiteralExpressionContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by {@link JexLangParser#arrayLiteral}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitArrayLiteral(_ ctx: JexLangParser.ArrayLiteralContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by {@link JexLangParser#arrayElement}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitArrayElement(_ ctx: JexLangParser.ArrayElementContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by {@link JexLangParser#objectLiteral}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitObjectLiteral(_ ctx: JexLangParser.ObjectLiteralContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code PropertyExpressionObjectProperty}
	 * labeled alternative in {@link JexLangParser#objectProperty}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitPropertyExpressionObjectProperty(_ ctx: JexLangParser.PropertyExpressionObjectPropertyContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code ComputedPropertyExpressionObjectProperty}
	 * labeled alternative in {@link JexLangParser#objectProperty}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitComputedPropertyExpressionObjectProperty(_ ctx: JexLangParser.ComputedPropertyExpressionObjectPropertyContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by the {@code ShorthandPropertyExpressionObjectProperty}
	 * labeled alternative in {@link JexLangParser#objectProperty}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitShorthandPropertyExpressionObjectProperty(_ ctx: JexLangParser.ShorthandPropertyExpressionObjectPropertyContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by {@link JexLangParser#objectPropertyName}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitObjectPropertyName(_ ctx: JexLangParser.ObjectPropertyNameContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by {@link JexLangParser#arguments}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitArguments(_ ctx: JexLangParser.ArgumentsContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

	/**
	 * Visit a parse tree produced by {@link JexLangParser#argument}.
	- Parameters:
	  - ctx: the parse tree
	- returns: the visitor result
	 */
	open func visitArgument(_ ctx: JexLangParser.ArgumentContext) -> T {
	 	fatalError(#function + " must be overridden")
	}

}
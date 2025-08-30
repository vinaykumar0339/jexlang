// Generated from JexLang.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { ProgramContext } from "./JexLangParser.js";
import { StatementContext } from "./JexLangParser.js";
import { BlockContext } from "./JexLangParser.js";
import { EmptyStatementContext } from "./JexLangParser.js";
import { VarDeclarationContext } from "./JexLangParser.js";
import { ExpressionStatementContext } from "./JexLangParser.js";
import { ExpressionSequenceContext } from "./JexLangParser.js";
import { ParenthesizedExpressionContext } from "./JexLangParser.js";
import { ShortTernaryExpressionContext } from "./JexLangParser.js";
import { AdditiveExpressionContext } from "./JexLangParser.js";
import { RelationalExpressionContext } from "./JexLangParser.js";
import { TernaryExpressionContext } from "./JexLangParser.js";
import { BracketPropertyAssignmentContext } from "./JexLangParser.js";
import { LogicalAndExpressionContext } from "./JexLangParser.js";
import { PowerExpressionContext } from "./JexLangParser.js";
import { DotPropertyAssignmentContext } from "./JexLangParser.js";
import { LiteralExpressionContext } from "./JexLangParser.js";
import { LogicalOrExpressionContext } from "./JexLangParser.js";
import { MemberDotExpressionContext } from "./JexLangParser.js";
import { UnaryExpressionContext } from "./JexLangParser.js";
import { MemberIndexExpressionContext } from "./JexLangParser.js";
import { FunctionCallExpressionContext } from "./JexLangParser.js";
import { IdentifierExpressionContext } from "./JexLangParser.js";
import { AssignmentExpressionContext } from "./JexLangParser.js";
import { TransformExpressionContext } from "./JexLangParser.js";
import { PrefixExpressionContext } from "./JexLangParser.js";
import { PostfixExpressionContext } from "./JexLangParser.js";
import { SquareRootExpressionContext } from "./JexLangParser.js";
import { EqualityExpressionContext } from "./JexLangParser.js";
import { MultiplicativeExpressionContext } from "./JexLangParser.js";
import { StringLiteralContext } from "./JexLangParser.js";
import { NumberLiteralContext } from "./JexLangParser.js";
import { BooleanLiteralContext } from "./JexLangParser.js";
import { NullLiteralContext } from "./JexLangParser.js";
import { ArrayLiteralExpressionContext } from "./JexLangParser.js";
import { ObjectLiteralExpressionContext } from "./JexLangParser.js";
import { ArrayLiteralContext } from "./JexLangParser.js";
import { ArrayElementContext } from "./JexLangParser.js";
import { ObjectLiteralContext } from "./JexLangParser.js";
import { PropertyExpressionObjectPropertyContext } from "./JexLangParser.js";
import { ComputedPropertyExpressionObjectPropertyContext } from "./JexLangParser.js";
import { ShorthandPropertyExpressionObjectPropertyContext } from "./JexLangParser.js";
import { ObjectPropertyNameContext } from "./JexLangParser.js";
import { ArgumentsContext } from "./JexLangParser.js";
import { ArgumentContext } from "./JexLangParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `JexLangParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class JexLangVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `JexLangParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;
	/**
	 * Visit a parse tree produced by `JexLangParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;
	/**
	 * Visit a parse tree produced by `JexLangParser.block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock?: (ctx: BlockContext) => Result;
	/**
	 * Visit a parse tree produced by `JexLangParser.emptyStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmptyStatement?: (ctx: EmptyStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `JexLangParser.varDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarDeclaration?: (ctx: VarDeclarationContext) => Result;
	/**
	 * Visit a parse tree produced by `JexLangParser.expressionStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionStatement?: (ctx: ExpressionStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `JexLangParser.expressionSequence`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionSequence?: (ctx: ExpressionSequenceContext) => Result;
	/**
	 * Visit a parse tree produced by the `ParenthesizedExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenthesizedExpression?: (ctx: ParenthesizedExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `ShortTernaryExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShortTernaryExpression?: (ctx: ShortTernaryExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `AdditiveExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditiveExpression?: (ctx: AdditiveExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `RelationalExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelationalExpression?: (ctx: RelationalExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `TernaryExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTernaryExpression?: (ctx: TernaryExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `BracketPropertyAssignment`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBracketPropertyAssignment?: (ctx: BracketPropertyAssignmentContext) => Result;
	/**
	 * Visit a parse tree produced by the `LogicalAndExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalAndExpression?: (ctx: LogicalAndExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `PowerExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPowerExpression?: (ctx: PowerExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `DotPropertyAssignment`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDotPropertyAssignment?: (ctx: DotPropertyAssignmentContext) => Result;
	/**
	 * Visit a parse tree produced by the `LiteralExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteralExpression?: (ctx: LiteralExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `LogicalOrExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalOrExpression?: (ctx: LogicalOrExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `MemberDotExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMemberDotExpression?: (ctx: MemberDotExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `UnaryExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryExpression?: (ctx: UnaryExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `MemberIndexExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMemberIndexExpression?: (ctx: MemberIndexExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `FunctionCallExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionCallExpression?: (ctx: FunctionCallExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `IdentifierExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierExpression?: (ctx: IdentifierExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `AssignmentExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignmentExpression?: (ctx: AssignmentExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `TransformExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTransformExpression?: (ctx: TransformExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `PrefixExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrefixExpression?: (ctx: PrefixExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `PostfixExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPostfixExpression?: (ctx: PostfixExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `SquareRootExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSquareRootExpression?: (ctx: SquareRootExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `EqualityExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqualityExpression?: (ctx: EqualityExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `MultiplicativeExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `StringLiteral`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringLiteral?: (ctx: StringLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `NumberLiteral`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberLiteral?: (ctx: NumberLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `BooleanLiteral`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanLiteral?: (ctx: BooleanLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `NullLiteral`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNullLiteral?: (ctx: NullLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `ArrayLiteralExpression`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayLiteralExpression?: (ctx: ArrayLiteralExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `ObjectLiteralExpression`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjectLiteralExpression?: (ctx: ObjectLiteralExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `JexLangParser.arrayLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayLiteral?: (ctx: ArrayLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by `JexLangParser.arrayElement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayElement?: (ctx: ArrayElementContext) => Result;
	/**
	 * Visit a parse tree produced by `JexLangParser.objectLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjectLiteral?: (ctx: ObjectLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `PropertyExpressionObjectProperty`
	 * labeled alternative in `JexLangParser.objectProperty`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropertyExpressionObjectProperty?: (ctx: PropertyExpressionObjectPropertyContext) => Result;
	/**
	 * Visit a parse tree produced by the `ComputedPropertyExpressionObjectProperty`
	 * labeled alternative in `JexLangParser.objectProperty`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComputedPropertyExpressionObjectProperty?: (ctx: ComputedPropertyExpressionObjectPropertyContext) => Result;
	/**
	 * Visit a parse tree produced by the `ShorthandPropertyExpressionObjectProperty`
	 * labeled alternative in `JexLangParser.objectProperty`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShorthandPropertyExpressionObjectProperty?: (ctx: ShorthandPropertyExpressionObjectPropertyContext) => Result;
	/**
	 * Visit a parse tree produced by `JexLangParser.objectPropertyName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjectPropertyName?: (ctx: ObjectPropertyNameContext) => Result;
	/**
	 * Visit a parse tree produced by `JexLangParser.arguments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArguments?: (ctx: ArgumentsContext) => Result;
	/**
	 * Visit a parse tree produced by `JexLangParser.argument`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArgument?: (ctx: ArgumentContext) => Result;
}


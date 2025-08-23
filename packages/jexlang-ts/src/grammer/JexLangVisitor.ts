// Generated from JexLang.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { ProgramContext } from "./JexLangParser.js";
import { StatementContext } from "./JexLangParser.js";
import { AssignmentContext } from "./JexLangParser.js";
import { ParenthesizedExpressionContext } from "./JexLangParser.js";
import { ShortTernaryExpressionContext } from "./JexLangParser.js";
import { TernaryExpressionContext } from "./JexLangParser.js";
import { PowerExpressionContext } from "./JexLangParser.js";
import { VariableExpressionContext } from "./JexLangParser.js";
import { NumberExpressionContext } from "./JexLangParser.js";
import { MulDivModExpressionContext } from "./JexLangParser.js";
import { FunctionCallExpressionContext } from "./JexLangParser.js";
import { AddSubExpressionContext } from "./JexLangParser.js";
import { UnaryMinusExpressionContext } from "./JexLangParser.js";
import { DotPropertyAccessExpressionContext } from "./JexLangParser.js";
import { ComparatorExpressionContext } from "./JexLangParser.js";
import { StringExpressionContext } from "./JexLangParser.js";
import { BracketPropertyAccessExpressionContext } from "./JexLangParser.js";
import { UnaryPlusExpressionContext } from "./JexLangParser.js";
import { FunctionCallContext } from "./JexLangParser.js";
import { ArgumentListContext } from "./JexLangParser.js";


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
	 * Visit a parse tree produced by `JexLangParser.assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment?: (ctx: AssignmentContext) => Result;
	/**
	 * Visit a parse tree produced by the `ParenthesizedExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenthesizedExpression?: (ctx: ParenthesizedExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `ShortTernaryExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShortTernaryExpression?: (ctx: ShortTernaryExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `TernaryExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTernaryExpression?: (ctx: TernaryExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `PowerExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPowerExpression?: (ctx: PowerExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `VariableExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariableExpression?: (ctx: VariableExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `NumberExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberExpression?: (ctx: NumberExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `MulDivModExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMulDivModExpression?: (ctx: MulDivModExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `FunctionCallExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionCallExpression?: (ctx: FunctionCallExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `AddSubExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAddSubExpression?: (ctx: AddSubExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `UnaryMinusExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryMinusExpression?: (ctx: UnaryMinusExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `DotPropertyAccessExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDotPropertyAccessExpression?: (ctx: DotPropertyAccessExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `ComparatorExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparatorExpression?: (ctx: ComparatorExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `StringExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringExpression?: (ctx: StringExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `BracketPropertyAccessExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBracketPropertyAccessExpression?: (ctx: BracketPropertyAccessExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `UnaryPlusExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryPlusExpression?: (ctx: UnaryPlusExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `JexLangParser.functionCall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionCall?: (ctx: FunctionCallContext) => Result;
	/**
	 * Visit a parse tree produced by `JexLangParser.argumentList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArgumentList?: (ctx: ArgumentListContext) => Result;
}


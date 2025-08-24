// Generated from JexLang.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


import { ProgramContext } from "./JexLangParser.js";
import { StatementContext } from "./JexLangParser.js";
import { AssignmentContext } from "./JexLangParser.js";
import { DotPropertyAssignmentContext } from "./JexLangParser.js";
import { BracketPropertyAssignmentContext } from "./JexLangParser.js";
import { LocalDeclarationContext } from "./JexLangParser.js";
import { ShortTernaryExpressionContext } from "./JexLangParser.js";
import { TernaryExpressionContext } from "./JexLangParser.js";
import { LogicalAndExpressionContext } from "./JexLangParser.js";
import { PowerExpressionContext } from "./JexLangParser.js";
import { ObjectLiteralExpressionContext } from "./JexLangParser.js";
import { LogicalOrExpressionContext } from "./JexLangParser.js";
import { PrefixIncrementExpressionContext } from "./JexLangParser.js";
import { MulDivModExpressionContext } from "./JexLangParser.js";
import { FunctionCallExpressionContext } from "./JexLangParser.js";
import { AddSubExpressionContext } from "./JexLangParser.js";
import { BooleanExpressionContext } from "./JexLangParser.js";
import { UnaryMinusExpressionContext } from "./JexLangParser.js";
import { ComparatorExpressionContext } from "./JexLangParser.js";
import { UnaryPlusExpressionContext } from "./JexLangParser.js";
import { PostfixIncrementExpressionContext } from "./JexLangParser.js";
import { PrefixDecrementExpressionContext } from "./JexLangParser.js";
import { ParenthesizedExpressionContext } from "./JexLangParser.js";
import { PostfixDecrementExpressionContext } from "./JexLangParser.js";
import { ArrayLiteralExpressionContext } from "./JexLangParser.js";
import { VariableExpressionContext } from "./JexLangParser.js";
import { NumberExpressionContext } from "./JexLangParser.js";
import { TransformExpressionContext } from "./JexLangParser.js";
import { DotPropertyAccessExpressionContext } from "./JexLangParser.js";
import { StringExpressionContext } from "./JexLangParser.js";
import { BracketPropertyAccessExpressionContext } from "./JexLangParser.js";
import { SquareRootExpressionContext } from "./JexLangParser.js";
import { ObjectLiteralContext } from "./JexLangParser.js";
import { ObjectPropertyContext } from "./JexLangParser.js";
import { FunctionCallContext } from "./JexLangParser.js";
import { ArgumentListContext } from "./JexLangParser.js";
import { ArrayLiteralContext } from "./JexLangParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `JexLangParser`.
 */
export default class JexLangListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `JexLangParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;
	/**
	 * Enter a parse tree produced by `JexLangParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;
	/**
	 * Enter a parse tree produced by `JexLangParser.assignment`.
	 * @param ctx the parse tree
	 */
	enterAssignment?: (ctx: AssignmentContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.assignment`.
	 * @param ctx the parse tree
	 */
	exitAssignment?: (ctx: AssignmentContext) => void;
	/**
	 * Enter a parse tree produced by the `DotPropertyAssignment`
	 * labeled alternative in `JexLangParser.propertyAssignment`.
	 * @param ctx the parse tree
	 */
	enterDotPropertyAssignment?: (ctx: DotPropertyAssignmentContext) => void;
	/**
	 * Exit a parse tree produced by the `DotPropertyAssignment`
	 * labeled alternative in `JexLangParser.propertyAssignment`.
	 * @param ctx the parse tree
	 */
	exitDotPropertyAssignment?: (ctx: DotPropertyAssignmentContext) => void;
	/**
	 * Enter a parse tree produced by the `BracketPropertyAssignment`
	 * labeled alternative in `JexLangParser.propertyAssignment`.
	 * @param ctx the parse tree
	 */
	enterBracketPropertyAssignment?: (ctx: BracketPropertyAssignmentContext) => void;
	/**
	 * Exit a parse tree produced by the `BracketPropertyAssignment`
	 * labeled alternative in `JexLangParser.propertyAssignment`.
	 * @param ctx the parse tree
	 */
	exitBracketPropertyAssignment?: (ctx: BracketPropertyAssignmentContext) => void;
	/**
	 * Enter a parse tree produced by `JexLangParser.localDeclaration`.
	 * @param ctx the parse tree
	 */
	enterLocalDeclaration?: (ctx: LocalDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.localDeclaration`.
	 * @param ctx the parse tree
	 */
	exitLocalDeclaration?: (ctx: LocalDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by the `ShortTernaryExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterShortTernaryExpression?: (ctx: ShortTernaryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ShortTernaryExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitShortTernaryExpression?: (ctx: ShortTernaryExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `TernaryExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterTernaryExpression?: (ctx: TernaryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `TernaryExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitTernaryExpression?: (ctx: TernaryExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `LogicalAndExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterLogicalAndExpression?: (ctx: LogicalAndExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `LogicalAndExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitLogicalAndExpression?: (ctx: LogicalAndExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PowerExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterPowerExpression?: (ctx: PowerExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `PowerExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitPowerExpression?: (ctx: PowerExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ObjectLiteralExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterObjectLiteralExpression?: (ctx: ObjectLiteralExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ObjectLiteralExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitObjectLiteralExpression?: (ctx: ObjectLiteralExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `LogicalOrExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterLogicalOrExpression?: (ctx: LogicalOrExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `LogicalOrExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitLogicalOrExpression?: (ctx: LogicalOrExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PrefixIncrementExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterPrefixIncrementExpression?: (ctx: PrefixIncrementExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `PrefixIncrementExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitPrefixIncrementExpression?: (ctx: PrefixIncrementExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `MulDivModExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMulDivModExpression?: (ctx: MulDivModExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `MulDivModExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMulDivModExpression?: (ctx: MulDivModExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `FunctionCallExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterFunctionCallExpression?: (ctx: FunctionCallExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `FunctionCallExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitFunctionCallExpression?: (ctx: FunctionCallExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `AddSubExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAddSubExpression?: (ctx: AddSubExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `AddSubExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAddSubExpression?: (ctx: AddSubExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `BooleanExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterBooleanExpression?: (ctx: BooleanExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `BooleanExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitBooleanExpression?: (ctx: BooleanExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `UnaryMinusExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterUnaryMinusExpression?: (ctx: UnaryMinusExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `UnaryMinusExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitUnaryMinusExpression?: (ctx: UnaryMinusExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ComparatorExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterComparatorExpression?: (ctx: ComparatorExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ComparatorExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitComparatorExpression?: (ctx: ComparatorExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `UnaryPlusExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterUnaryPlusExpression?: (ctx: UnaryPlusExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `UnaryPlusExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitUnaryPlusExpression?: (ctx: UnaryPlusExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PostfixIncrementExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterPostfixIncrementExpression?: (ctx: PostfixIncrementExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `PostfixIncrementExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitPostfixIncrementExpression?: (ctx: PostfixIncrementExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PrefixDecrementExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterPrefixDecrementExpression?: (ctx: PrefixDecrementExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `PrefixDecrementExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitPrefixDecrementExpression?: (ctx: PrefixDecrementExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ParenthesizedExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterParenthesizedExpression?: (ctx: ParenthesizedExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ParenthesizedExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitParenthesizedExpression?: (ctx: ParenthesizedExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PostfixDecrementExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterPostfixDecrementExpression?: (ctx: PostfixDecrementExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `PostfixDecrementExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitPostfixDecrementExpression?: (ctx: PostfixDecrementExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ArrayLiteralExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterArrayLiteralExpression?: (ctx: ArrayLiteralExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ArrayLiteralExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitArrayLiteralExpression?: (ctx: ArrayLiteralExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `VariableExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterVariableExpression?: (ctx: VariableExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `VariableExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitVariableExpression?: (ctx: VariableExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `NumberExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterNumberExpression?: (ctx: NumberExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NumberExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitNumberExpression?: (ctx: NumberExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `TransformExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterTransformExpression?: (ctx: TransformExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `TransformExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitTransformExpression?: (ctx: TransformExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `DotPropertyAccessExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterDotPropertyAccessExpression?: (ctx: DotPropertyAccessExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `DotPropertyAccessExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitDotPropertyAccessExpression?: (ctx: DotPropertyAccessExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `StringExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterStringExpression?: (ctx: StringExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `StringExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitStringExpression?: (ctx: StringExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `BracketPropertyAccessExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterBracketPropertyAccessExpression?: (ctx: BracketPropertyAccessExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `BracketPropertyAccessExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitBracketPropertyAccessExpression?: (ctx: BracketPropertyAccessExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `SquareRootExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	enterSquareRootExpression?: (ctx: SquareRootExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `SquareRootExpression`
	 * labeled alternative in `JexLangParser.expression`.
	 * @param ctx the parse tree
	 */
	exitSquareRootExpression?: (ctx: SquareRootExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `JexLangParser.objectLiteral`.
	 * @param ctx the parse tree
	 */
	enterObjectLiteral?: (ctx: ObjectLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.objectLiteral`.
	 * @param ctx the parse tree
	 */
	exitObjectLiteral?: (ctx: ObjectLiteralContext) => void;
	/**
	 * Enter a parse tree produced by `JexLangParser.objectProperty`.
	 * @param ctx the parse tree
	 */
	enterObjectProperty?: (ctx: ObjectPropertyContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.objectProperty`.
	 * @param ctx the parse tree
	 */
	exitObjectProperty?: (ctx: ObjectPropertyContext) => void;
	/**
	 * Enter a parse tree produced by `JexLangParser.functionCall`.
	 * @param ctx the parse tree
	 */
	enterFunctionCall?: (ctx: FunctionCallContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.functionCall`.
	 * @param ctx the parse tree
	 */
	exitFunctionCall?: (ctx: FunctionCallContext) => void;
	/**
	 * Enter a parse tree produced by `JexLangParser.argumentList`.
	 * @param ctx the parse tree
	 */
	enterArgumentList?: (ctx: ArgumentListContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.argumentList`.
	 * @param ctx the parse tree
	 */
	exitArgumentList?: (ctx: ArgumentListContext) => void;
	/**
	 * Enter a parse tree produced by `JexLangParser.arrayLiteral`.
	 * @param ctx the parse tree
	 */
	enterArrayLiteral?: (ctx: ArrayLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.arrayLiteral`.
	 * @param ctx the parse tree
	 */
	exitArrayLiteral?: (ctx: ArrayLiteralContext) => void;
}


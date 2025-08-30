// Generated from JexLang.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


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
	 * Enter a parse tree produced by `JexLangParser.block`.
	 * @param ctx the parse tree
	 */
	enterBlock?: (ctx: BlockContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.block`.
	 * @param ctx the parse tree
	 */
	exitBlock?: (ctx: BlockContext) => void;
	/**
	 * Enter a parse tree produced by `JexLangParser.emptyStatement`.
	 * @param ctx the parse tree
	 */
	enterEmptyStatement?: (ctx: EmptyStatementContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.emptyStatement`.
	 * @param ctx the parse tree
	 */
	exitEmptyStatement?: (ctx: EmptyStatementContext) => void;
	/**
	 * Enter a parse tree produced by `JexLangParser.varDeclaration`.
	 * @param ctx the parse tree
	 */
	enterVarDeclaration?: (ctx: VarDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.varDeclaration`.
	 * @param ctx the parse tree
	 */
	exitVarDeclaration?: (ctx: VarDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by `JexLangParser.expressionStatement`.
	 * @param ctx the parse tree
	 */
	enterExpressionStatement?: (ctx: ExpressionStatementContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.expressionStatement`.
	 * @param ctx the parse tree
	 */
	exitExpressionStatement?: (ctx: ExpressionStatementContext) => void;
	/**
	 * Enter a parse tree produced by `JexLangParser.expressionSequence`.
	 * @param ctx the parse tree
	 */
	enterExpressionSequence?: (ctx: ExpressionSequenceContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.expressionSequence`.
	 * @param ctx the parse tree
	 */
	exitExpressionSequence?: (ctx: ExpressionSequenceContext) => void;
	/**
	 * Enter a parse tree produced by the `ParenthesizedExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterParenthesizedExpression?: (ctx: ParenthesizedExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ParenthesizedExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitParenthesizedExpression?: (ctx: ParenthesizedExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ShortTernaryExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterShortTernaryExpression?: (ctx: ShortTernaryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ShortTernaryExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitShortTernaryExpression?: (ctx: ShortTernaryExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `AdditiveExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `AdditiveExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `RelationalExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterRelationalExpression?: (ctx: RelationalExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `RelationalExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitRelationalExpression?: (ctx: RelationalExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `TernaryExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterTernaryExpression?: (ctx: TernaryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `TernaryExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitTernaryExpression?: (ctx: TernaryExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `BracketPropertyAssignment`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterBracketPropertyAssignment?: (ctx: BracketPropertyAssignmentContext) => void;
	/**
	 * Exit a parse tree produced by the `BracketPropertyAssignment`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitBracketPropertyAssignment?: (ctx: BracketPropertyAssignmentContext) => void;
	/**
	 * Enter a parse tree produced by the `LogicalAndExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterLogicalAndExpression?: (ctx: LogicalAndExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `LogicalAndExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitLogicalAndExpression?: (ctx: LogicalAndExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PowerExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterPowerExpression?: (ctx: PowerExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `PowerExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitPowerExpression?: (ctx: PowerExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `DotPropertyAssignment`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterDotPropertyAssignment?: (ctx: DotPropertyAssignmentContext) => void;
	/**
	 * Exit a parse tree produced by the `DotPropertyAssignment`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitDotPropertyAssignment?: (ctx: DotPropertyAssignmentContext) => void;
	/**
	 * Enter a parse tree produced by the `LiteralExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterLiteralExpression?: (ctx: LiteralExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `LiteralExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitLiteralExpression?: (ctx: LiteralExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `LogicalOrExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterLogicalOrExpression?: (ctx: LogicalOrExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `LogicalOrExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitLogicalOrExpression?: (ctx: LogicalOrExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `MemberDotExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterMemberDotExpression?: (ctx: MemberDotExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `MemberDotExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitMemberDotExpression?: (ctx: MemberDotExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `UnaryExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterUnaryExpression?: (ctx: UnaryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `UnaryExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitUnaryExpression?: (ctx: UnaryExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `MemberIndexExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterMemberIndexExpression?: (ctx: MemberIndexExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `MemberIndexExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitMemberIndexExpression?: (ctx: MemberIndexExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `FunctionCallExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterFunctionCallExpression?: (ctx: FunctionCallExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `FunctionCallExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitFunctionCallExpression?: (ctx: FunctionCallExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `IdentifierExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterIdentifierExpression?: (ctx: IdentifierExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `IdentifierExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitIdentifierExpression?: (ctx: IdentifierExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `AssignmentExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterAssignmentExpression?: (ctx: AssignmentExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `AssignmentExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitAssignmentExpression?: (ctx: AssignmentExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `TransformExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterTransformExpression?: (ctx: TransformExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `TransformExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitTransformExpression?: (ctx: TransformExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PrefixExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterPrefixExpression?: (ctx: PrefixExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `PrefixExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitPrefixExpression?: (ctx: PrefixExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PostfixExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterPostfixExpression?: (ctx: PostfixExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `PostfixExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitPostfixExpression?: (ctx: PostfixExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `SquareRootExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterSquareRootExpression?: (ctx: SquareRootExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `SquareRootExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitSquareRootExpression?: (ctx: SquareRootExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `EqualityExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterEqualityExpression?: (ctx: EqualityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `EqualityExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitEqualityExpression?: (ctx: EqualityExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `MultiplicativeExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	enterMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `MultiplicativeExpression`
	 * labeled alternative in `JexLangParser.singleExpression`.
	 * @param ctx the parse tree
	 */
	exitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `StringLiteral`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 */
	enterStringLiteral?: (ctx: StringLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `StringLiteral`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 */
	exitStringLiteral?: (ctx: StringLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `NumberLiteral`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 */
	enterNumberLiteral?: (ctx: NumberLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `NumberLiteral`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 */
	exitNumberLiteral?: (ctx: NumberLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `BooleanLiteral`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 */
	enterBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `BooleanLiteral`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 */
	exitBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `NullLiteral`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 */
	enterNullLiteral?: (ctx: NullLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `NullLiteral`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 */
	exitNullLiteral?: (ctx: NullLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `ArrayLiteralExpression`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 */
	enterArrayLiteralExpression?: (ctx: ArrayLiteralExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ArrayLiteralExpression`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 */
	exitArrayLiteralExpression?: (ctx: ArrayLiteralExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ObjectLiteralExpression`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 */
	enterObjectLiteralExpression?: (ctx: ObjectLiteralExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ObjectLiteralExpression`
	 * labeled alternative in `JexLangParser.literal`.
	 * @param ctx the parse tree
	 */
	exitObjectLiteralExpression?: (ctx: ObjectLiteralExpressionContext) => void;
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
	/**
	 * Enter a parse tree produced by `JexLangParser.arrayElement`.
	 * @param ctx the parse tree
	 */
	enterArrayElement?: (ctx: ArrayElementContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.arrayElement`.
	 * @param ctx the parse tree
	 */
	exitArrayElement?: (ctx: ArrayElementContext) => void;
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
	 * Enter a parse tree produced by the `PropertyExpressionObjectProperty`
	 * labeled alternative in `JexLangParser.objectProperty`.
	 * @param ctx the parse tree
	 */
	enterPropertyExpressionObjectProperty?: (ctx: PropertyExpressionObjectPropertyContext) => void;
	/**
	 * Exit a parse tree produced by the `PropertyExpressionObjectProperty`
	 * labeled alternative in `JexLangParser.objectProperty`.
	 * @param ctx the parse tree
	 */
	exitPropertyExpressionObjectProperty?: (ctx: PropertyExpressionObjectPropertyContext) => void;
	/**
	 * Enter a parse tree produced by the `ComputedPropertyExpressionObjectProperty`
	 * labeled alternative in `JexLangParser.objectProperty`.
	 * @param ctx the parse tree
	 */
	enterComputedPropertyExpressionObjectProperty?: (ctx: ComputedPropertyExpressionObjectPropertyContext) => void;
	/**
	 * Exit a parse tree produced by the `ComputedPropertyExpressionObjectProperty`
	 * labeled alternative in `JexLangParser.objectProperty`.
	 * @param ctx the parse tree
	 */
	exitComputedPropertyExpressionObjectProperty?: (ctx: ComputedPropertyExpressionObjectPropertyContext) => void;
	/**
	 * Enter a parse tree produced by the `ShorthandPropertyExpressionObjectProperty`
	 * labeled alternative in `JexLangParser.objectProperty`.
	 * @param ctx the parse tree
	 */
	enterShorthandPropertyExpressionObjectProperty?: (ctx: ShorthandPropertyExpressionObjectPropertyContext) => void;
	/**
	 * Exit a parse tree produced by the `ShorthandPropertyExpressionObjectProperty`
	 * labeled alternative in `JexLangParser.objectProperty`.
	 * @param ctx the parse tree
	 */
	exitShorthandPropertyExpressionObjectProperty?: (ctx: ShorthandPropertyExpressionObjectPropertyContext) => void;
	/**
	 * Enter a parse tree produced by `JexLangParser.objectPropertyName`.
	 * @param ctx the parse tree
	 */
	enterObjectPropertyName?: (ctx: ObjectPropertyNameContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.objectPropertyName`.
	 * @param ctx the parse tree
	 */
	exitObjectPropertyName?: (ctx: ObjectPropertyNameContext) => void;
	/**
	 * Enter a parse tree produced by `JexLangParser.arguments`.
	 * @param ctx the parse tree
	 */
	enterArguments?: (ctx: ArgumentsContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.arguments`.
	 * @param ctx the parse tree
	 */
	exitArguments?: (ctx: ArgumentsContext) => void;
	/**
	 * Enter a parse tree produced by `JexLangParser.argument`.
	 * @param ctx the parse tree
	 */
	enterArgument?: (ctx: ArgumentContext) => void;
	/**
	 * Exit a parse tree produced by `JexLangParser.argument`.
	 * @param ctx the parse tree
	 */
	exitArgument?: (ctx: ArgumentContext) => void;
}


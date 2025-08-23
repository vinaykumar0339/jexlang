// Generated from JexLang.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import JexLangVisitor from "./JexLangVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class JexLangParser extends Parser {
	public static readonly PLUS = 1;
	public static readonly MINUS = 2;
	public static readonly MULTIPLY = 3;
	public static readonly DIVIDE = 4;
	public static readonly MODULO = 5;
	public static readonly POW = 6;
	public static readonly ASSIGN = 7;
	public static readonly LPAREN = 8;
	public static readonly RPAREN = 9;
	public static readonly SEMICOLON = 10;
	public static readonly COMMA = 11;
	public static readonly NUMBER = 12;
	public static readonly BOOLEAN = 13;
	public static readonly IDENTIFIER = 14;
	public static readonly STRING = 15;
	public static readonly WS = 16;
	public static readonly LINE_COMMENT = 17;
	public static readonly BLOCK_COMMENT = 18;
	public static readonly DOT = 19;
	public static readonly LBRACKET = 20;
	public static readonly RBRACKET = 21;
	public static readonly LBRACE = 22;
	public static readonly RBRACE = 23;
	public static readonly QUESTION = 24;
	public static readonly COLON = 25;
	public static readonly EQ = 26;
	public static readonly NEQ = 27;
	public static readonly LT = 28;
	public static readonly GT = 29;
	public static readonly LTE = 30;
	public static readonly GTE = 31;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_program = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_assignment = 2;
	public static readonly RULE_propertyAssignment = 3;
	public static readonly RULE_expression = 4;
	public static readonly RULE_objectLiteral = 5;
	public static readonly RULE_objectProperty = 6;
	public static readonly RULE_functionCall = 7;
	public static readonly RULE_argumentList = 8;
	public static readonly literalNames: (string | null)[] = [ null, "'+'", 
                                                            "'-'", "'*'", 
                                                            "'/'", "'%'", 
                                                            null, "'='", 
                                                            "'('", "')'", 
                                                            "';'", "','", 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, "'.'", 
                                                            "'['", "']'", 
                                                            "'{'", "'}'", 
                                                            "'?'", "':'", 
                                                            "'=='", "'!='", 
                                                            "'<'", "'>'", 
                                                            "'<='", "'>='" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "PLUS", 
                                                             "MINUS", "MULTIPLY", 
                                                             "DIVIDE", "MODULO", 
                                                             "POW", "ASSIGN", 
                                                             "LPAREN", "RPAREN", 
                                                             "SEMICOLON", 
                                                             "COMMA", "NUMBER", 
                                                             "BOOLEAN", 
                                                             "IDENTIFIER", 
                                                             "STRING", "WS", 
                                                             "LINE_COMMENT", 
                                                             "BLOCK_COMMENT", 
                                                             "DOT", "LBRACKET", 
                                                             "RBRACKET", 
                                                             "LBRACE", "RBRACE", 
                                                             "QUESTION", 
                                                             "COLON", "EQ", 
                                                             "NEQ", "LT", 
                                                             "GT", "LTE", 
                                                             "GTE" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "statement", "assignment", "propertyAssignment", "expression", 
		"objectLiteral", "objectProperty", "functionCall", "argumentList",
	];
	public get grammarFileName(): string { return "JexLang.g4"; }
	public get literalNames(): (string | null)[] { return JexLangParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return JexLangParser.symbolicNames; }
	public get ruleNames(): string[] { return JexLangParser.ruleNames; }
	public get serializedATN(): number[] { return JexLangParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, JexLangParser._ATN, JexLangParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let localctx: ProgramContext = new ProgramContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, JexLangParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 21;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4256006) !== 0)) {
				{
				{
				this.state = 18;
				this.statement();
				}
				}
				this.state = 23;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 24;
			this.match(JexLangParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let localctx: StatementContext = new StatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, JexLangParser.RULE_statement);
		let _la: number;
		try {
			this.state = 38;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 26;
				this.expression(0);
				this.state = 28;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===10) {
					{
					this.state = 27;
					this.match(JexLangParser.SEMICOLON);
					}
				}

				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 30;
				this.assignment();
				this.state = 32;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===10) {
					{
					this.state = 31;
					this.match(JexLangParser.SEMICOLON);
					}
				}

				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 34;
				this.propertyAssignment();
				this.state = 36;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===10) {
					{
					this.state = 35;
					this.match(JexLangParser.SEMICOLON);
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignment(): AssignmentContext {
		let localctx: AssignmentContext = new AssignmentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, JexLangParser.RULE_assignment);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 40;
			this.match(JexLangParser.IDENTIFIER);
			this.state = 41;
			this.match(JexLangParser.ASSIGN);
			this.state = 42;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public propertyAssignment(): PropertyAssignmentContext {
		let localctx: PropertyAssignmentContext = new PropertyAssignmentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, JexLangParser.RULE_propertyAssignment);
		try {
			this.state = 57;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 5, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 44;
				this.expression(0);
				this.state = 45;
				this.match(JexLangParser.DOT);
				this.state = 46;
				this.match(JexLangParser.IDENTIFIER);
				this.state = 47;
				this.match(JexLangParser.ASSIGN);
				this.state = 48;
				this.expression(0);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 50;
				this.expression(0);
				this.state = 51;
				this.match(JexLangParser.LBRACKET);
				this.state = 52;
				this.expression(0);
				this.state = 53;
				this.match(JexLangParser.RBRACKET);
				this.state = 54;
				this.match(JexLangParser.ASSIGN);
				this.state = 55;
				this.expression(0);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: ExpressionContext = new ExpressionContext(this, this._ctx, _parentState);
		let _prevctx: ExpressionContext = localctx;
		let _startState: number = 8;
		this.enterRecursionRule(localctx, 8, JexLangParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 74;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				{
				localctx = new UnaryMinusExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 60;
				this.match(JexLangParser.MINUS);
				this.state = 61;
				this.expression(16);
				}
				break;
			case 2:
				{
				localctx = new UnaryPlusExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 62;
				this.match(JexLangParser.PLUS);
				this.state = 63;
				this.expression(15);
				}
				break;
			case 3:
				{
				localctx = new ParenthesizedExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 64;
				this.match(JexLangParser.LPAREN);
				this.state = 65;
				this.expression(0);
				this.state = 66;
				this.match(JexLangParser.RPAREN);
				}
				break;
			case 4:
				{
				localctx = new FunctionCallExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 68;
				this.functionCall();
				}
				break;
			case 5:
				{
				localctx = new ObjectLiteralExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 69;
				this.objectLiteral();
				}
				break;
			case 6:
				{
				localctx = new BooleanExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 70;
				this.match(JexLangParser.BOOLEAN);
				}
				break;
			case 7:
				{
				localctx = new VariableExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 71;
				this.match(JexLangParser.IDENTIFIER);
				}
				break;
			case 8:
				{
				localctx = new NumberExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 72;
				this.match(JexLangParser.NUMBER);
				}
				break;
			case 9:
				{
				localctx = new StringExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 73;
				this.match(JexLangParser.STRING);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 108;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 8, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 106;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 7, this._ctx) ) {
					case 1:
						{
						localctx = new PowerExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 76;
						if (!(this.precpred(this._ctx, 17))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 17)");
						}
						this.state = 77;
						this.match(JexLangParser.POW);
						this.state = 78;
						this.expression(18);
						}
						break;
					case 2:
						{
						localctx = new MulDivModExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 79;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 80;
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 56) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 81;
						this.expression(15);
						}
						break;
					case 3:
						{
						localctx = new AddSubExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 82;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 83;
						_la = this._input.LA(1);
						if(!(_la===1 || _la===2)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 84;
						this.expression(14);
						}
						break;
					case 4:
						{
						localctx = new ComparatorExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 85;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 86;
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 4227858432) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 87;
						this.expression(13);
						}
						break;
					case 5:
						{
						localctx = new TernaryExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 88;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 89;
						this.match(JexLangParser.QUESTION);
						this.state = 90;
						this.expression(0);
						this.state = 91;
						this.match(JexLangParser.COLON);
						this.state = 92;
						this.expression(8);
						}
						break;
					case 6:
						{
						localctx = new ShortTernaryExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 94;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 95;
						this.match(JexLangParser.QUESTION);
						this.state = 96;
						this.match(JexLangParser.COLON);
						this.state = 97;
						this.expression(7);
						}
						break;
					case 7:
						{
						localctx = new DotPropertyAccessExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 98;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 99;
						this.match(JexLangParser.DOT);
						this.state = 100;
						this.match(JexLangParser.IDENTIFIER);
						}
						break;
					case 8:
						{
						localctx = new BracketPropertyAccessExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 101;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 102;
						this.match(JexLangParser.LBRACKET);
						this.state = 103;
						this.expression(0);
						this.state = 104;
						this.match(JexLangParser.RBRACKET);
						}
						break;
					}
					}
				}
				this.state = 110;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 8, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public objectLiteral(): ObjectLiteralContext {
		let localctx: ObjectLiteralContext = new ObjectLiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, JexLangParser.RULE_objectLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 111;
			this.match(JexLangParser.LBRACE);
			this.state = 120;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===14 || _la===15) {
				{
				this.state = 112;
				this.objectProperty();
				this.state = 117;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===11) {
					{
					{
					this.state = 113;
					this.match(JexLangParser.COMMA);
					this.state = 114;
					this.objectProperty();
					}
					}
					this.state = 119;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 122;
			this.match(JexLangParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public objectProperty(): ObjectPropertyContext {
		let localctx: ObjectPropertyContext = new ObjectPropertyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, JexLangParser.RULE_objectProperty);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 124;
			_la = this._input.LA(1);
			if(!(_la===14 || _la===15)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 125;
			this.match(JexLangParser.COLON);
			this.state = 126;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public functionCall(): FunctionCallContext {
		let localctx: FunctionCallContext = new FunctionCallContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, JexLangParser.RULE_functionCall);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 128;
			this.match(JexLangParser.IDENTIFIER);
			this.state = 129;
			this.match(JexLangParser.LPAREN);
			this.state = 131;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4256006) !== 0)) {
				{
				this.state = 130;
				this.argumentList();
				}
			}

			this.state = 133;
			this.match(JexLangParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public argumentList(): ArgumentListContext {
		let localctx: ArgumentListContext = new ArgumentListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, JexLangParser.RULE_argumentList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 135;
			this.expression(0);
			this.state = 140;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===11) {
				{
				{
				this.state = 136;
				this.match(JexLangParser.COMMA);
				this.state = 137;
				this.expression(0);
				}
				}
				this.state = 142;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 4:
			return this.expression_sempred(localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 17);
		case 1:
			return this.precpred(this._ctx, 14);
		case 2:
			return this.precpred(this._ctx, 13);
		case 3:
			return this.precpred(this._ctx, 12);
		case 4:
			return this.precpred(this._ctx, 7);
		case 5:
			return this.precpred(this._ctx, 6);
		case 6:
			return this.precpred(this._ctx, 9);
		case 7:
			return this.precpred(this._ctx, 8);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,31,144,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,1,0,5,0,20,
	8,0,10,0,12,0,23,9,0,1,0,1,0,1,1,1,1,3,1,29,8,1,1,1,1,1,3,1,33,8,1,1,1,
	1,1,3,1,37,8,1,3,1,39,8,1,1,2,1,2,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,
	3,1,3,1,3,1,3,1,3,1,3,3,3,58,8,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,
	4,1,4,1,4,1,4,1,4,1,4,3,4,75,8,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,
	4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,
	4,1,4,1,4,5,4,107,8,4,10,4,12,4,110,9,4,1,5,1,5,1,5,1,5,5,5,116,8,5,10,
	5,12,5,119,9,5,3,5,121,8,5,1,5,1,5,1,6,1,6,1,6,1,6,1,7,1,7,1,7,3,7,132,
	8,7,1,7,1,7,1,8,1,8,1,8,5,8,139,8,8,10,8,12,8,142,9,8,1,8,0,1,8,9,0,2,4,
	6,8,10,12,14,16,0,4,1,0,3,5,1,0,1,2,1,0,26,31,1,0,14,15,161,0,21,1,0,0,
	0,2,38,1,0,0,0,4,40,1,0,0,0,6,57,1,0,0,0,8,74,1,0,0,0,10,111,1,0,0,0,12,
	124,1,0,0,0,14,128,1,0,0,0,16,135,1,0,0,0,18,20,3,2,1,0,19,18,1,0,0,0,20,
	23,1,0,0,0,21,19,1,0,0,0,21,22,1,0,0,0,22,24,1,0,0,0,23,21,1,0,0,0,24,25,
	5,0,0,1,25,1,1,0,0,0,26,28,3,8,4,0,27,29,5,10,0,0,28,27,1,0,0,0,28,29,1,
	0,0,0,29,39,1,0,0,0,30,32,3,4,2,0,31,33,5,10,0,0,32,31,1,0,0,0,32,33,1,
	0,0,0,33,39,1,0,0,0,34,36,3,6,3,0,35,37,5,10,0,0,36,35,1,0,0,0,36,37,1,
	0,0,0,37,39,1,0,0,0,38,26,1,0,0,0,38,30,1,0,0,0,38,34,1,0,0,0,39,3,1,0,
	0,0,40,41,5,14,0,0,41,42,5,7,0,0,42,43,3,8,4,0,43,5,1,0,0,0,44,45,3,8,4,
	0,45,46,5,19,0,0,46,47,5,14,0,0,47,48,5,7,0,0,48,49,3,8,4,0,49,58,1,0,0,
	0,50,51,3,8,4,0,51,52,5,20,0,0,52,53,3,8,4,0,53,54,5,21,0,0,54,55,5,7,0,
	0,55,56,3,8,4,0,56,58,1,0,0,0,57,44,1,0,0,0,57,50,1,0,0,0,58,7,1,0,0,0,
	59,60,6,4,-1,0,60,61,5,2,0,0,61,75,3,8,4,16,62,63,5,1,0,0,63,75,3,8,4,15,
	64,65,5,8,0,0,65,66,3,8,4,0,66,67,5,9,0,0,67,75,1,0,0,0,68,75,3,14,7,0,
	69,75,3,10,5,0,70,75,5,13,0,0,71,75,5,14,0,0,72,75,5,12,0,0,73,75,5,15,
	0,0,74,59,1,0,0,0,74,62,1,0,0,0,74,64,1,0,0,0,74,68,1,0,0,0,74,69,1,0,0,
	0,74,70,1,0,0,0,74,71,1,0,0,0,74,72,1,0,0,0,74,73,1,0,0,0,75,108,1,0,0,
	0,76,77,10,17,0,0,77,78,5,6,0,0,78,107,3,8,4,18,79,80,10,14,0,0,80,81,7,
	0,0,0,81,107,3,8,4,15,82,83,10,13,0,0,83,84,7,1,0,0,84,107,3,8,4,14,85,
	86,10,12,0,0,86,87,7,2,0,0,87,107,3,8,4,13,88,89,10,7,0,0,89,90,5,24,0,
	0,90,91,3,8,4,0,91,92,5,25,0,0,92,93,3,8,4,8,93,107,1,0,0,0,94,95,10,6,
	0,0,95,96,5,24,0,0,96,97,5,25,0,0,97,107,3,8,4,7,98,99,10,9,0,0,99,100,
	5,19,0,0,100,107,5,14,0,0,101,102,10,8,0,0,102,103,5,20,0,0,103,104,3,8,
	4,0,104,105,5,21,0,0,105,107,1,0,0,0,106,76,1,0,0,0,106,79,1,0,0,0,106,
	82,1,0,0,0,106,85,1,0,0,0,106,88,1,0,0,0,106,94,1,0,0,0,106,98,1,0,0,0,
	106,101,1,0,0,0,107,110,1,0,0,0,108,106,1,0,0,0,108,109,1,0,0,0,109,9,1,
	0,0,0,110,108,1,0,0,0,111,120,5,22,0,0,112,117,3,12,6,0,113,114,5,11,0,
	0,114,116,3,12,6,0,115,113,1,0,0,0,116,119,1,0,0,0,117,115,1,0,0,0,117,
	118,1,0,0,0,118,121,1,0,0,0,119,117,1,0,0,0,120,112,1,0,0,0,120,121,1,0,
	0,0,121,122,1,0,0,0,122,123,5,23,0,0,123,11,1,0,0,0,124,125,7,3,0,0,125,
	126,5,25,0,0,126,127,3,8,4,0,127,13,1,0,0,0,128,129,5,14,0,0,129,131,5,
	8,0,0,130,132,3,16,8,0,131,130,1,0,0,0,131,132,1,0,0,0,132,133,1,0,0,0,
	133,134,5,9,0,0,134,15,1,0,0,0,135,140,3,8,4,0,136,137,5,11,0,0,137,139,
	3,8,4,0,138,136,1,0,0,0,139,142,1,0,0,0,140,138,1,0,0,0,140,141,1,0,0,0,
	141,17,1,0,0,0,142,140,1,0,0,0,13,21,28,32,36,38,57,74,106,108,117,120,
	131,140];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!JexLangParser.__ATN) {
			JexLangParser.__ATN = new ATNDeserializer().deserialize(JexLangParser._serializedATN);
		}

		return JexLangParser.__ATN;
	}


	static DecisionsToDFA = JexLangParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ProgramContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(JexLangParser.EOF, 0);
	}
	public statement_list(): StatementContext[] {
		return this.getTypedRuleContexts(StatementContext) as StatementContext[];
	}
	public statement(i: number): StatementContext {
		return this.getTypedRuleContext(StatementContext, i) as StatementContext;
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_program;
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public SEMICOLON(): TerminalNode {
		return this.getToken(JexLangParser.SEMICOLON, 0);
	}
	public assignment(): AssignmentContext {
		return this.getTypedRuleContext(AssignmentContext, 0) as AssignmentContext;
	}
	public propertyAssignment(): PropertyAssignmentContext {
		return this.getTypedRuleContext(PropertyAssignmentContext, 0) as PropertyAssignmentContext;
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_statement;
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(JexLangParser.IDENTIFIER, 0);
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(JexLangParser.ASSIGN, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_assignment;
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitAssignment) {
			return visitor.visitAssignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropertyAssignmentContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(JexLangParser.DOT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(JexLangParser.IDENTIFIER, 0);
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(JexLangParser.ASSIGN, 0);
	}
	public LBRACKET(): TerminalNode {
		return this.getToken(JexLangParser.LBRACKET, 0);
	}
	public RBRACKET(): TerminalNode {
		return this.getToken(JexLangParser.RBRACKET, 0);
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_propertyAssignment;
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitPropertyAssignment) {
			return visitor.visitPropertyAssignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_expression;
	}
	public override copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class ParenthesizedExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(JexLangParser.LPAREN, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(JexLangParser.RPAREN, 0);
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitParenthesizedExpression) {
			return visitor.visitParenthesizedExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ShortTernaryExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public QUESTION(): TerminalNode {
		return this.getToken(JexLangParser.QUESTION, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(JexLangParser.COLON, 0);
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitShortTernaryExpression) {
			return visitor.visitShortTernaryExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TernaryExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public QUESTION(): TerminalNode {
		return this.getToken(JexLangParser.QUESTION, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(JexLangParser.COLON, 0);
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitTernaryExpression) {
			return visitor.visitTernaryExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PowerExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public POW(): TerminalNode {
		return this.getToken(JexLangParser.POW, 0);
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitPowerExpression) {
			return visitor.visitPowerExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ObjectLiteralExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public objectLiteral(): ObjectLiteralContext {
		return this.getTypedRuleContext(ObjectLiteralContext, 0) as ObjectLiteralContext;
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitObjectLiteralExpression) {
			return visitor.visitObjectLiteralExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class VariableExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(JexLangParser.IDENTIFIER, 0);
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitVariableExpression) {
			return visitor.visitVariableExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public NUMBER(): TerminalNode {
		return this.getToken(JexLangParser.NUMBER, 0);
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitNumberExpression) {
			return visitor.visitNumberExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MulDivModExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public MULTIPLY(): TerminalNode {
		return this.getToken(JexLangParser.MULTIPLY, 0);
	}
	public DIVIDE(): TerminalNode {
		return this.getToken(JexLangParser.DIVIDE, 0);
	}
	public MODULO(): TerminalNode {
		return this.getToken(JexLangParser.MODULO, 0);
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitMulDivModExpression) {
			return visitor.visitMulDivModExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FunctionCallExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public functionCall(): FunctionCallContext {
		return this.getTypedRuleContext(FunctionCallContext, 0) as FunctionCallContext;
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitFunctionCallExpression) {
			return visitor.visitFunctionCallExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AddSubExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public PLUS(): TerminalNode {
		return this.getToken(JexLangParser.PLUS, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(JexLangParser.MINUS, 0);
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitAddSubExpression) {
			return visitor.visitAddSubExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BooleanExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public BOOLEAN(): TerminalNode {
		return this.getToken(JexLangParser.BOOLEAN, 0);
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitBooleanExpression) {
			return visitor.visitBooleanExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnaryMinusExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public MINUS(): TerminalNode {
		return this.getToken(JexLangParser.MINUS, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitUnaryMinusExpression) {
			return visitor.visitUnaryMinusExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DotPropertyAccessExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(JexLangParser.DOT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(JexLangParser.IDENTIFIER, 0);
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitDotPropertyAccessExpression) {
			return visitor.visitDotPropertyAccessExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ComparatorExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public EQ(): TerminalNode {
		return this.getToken(JexLangParser.EQ, 0);
	}
	public NEQ(): TerminalNode {
		return this.getToken(JexLangParser.NEQ, 0);
	}
	public LT(): TerminalNode {
		return this.getToken(JexLangParser.LT, 0);
	}
	public GT(): TerminalNode {
		return this.getToken(JexLangParser.GT, 0);
	}
	public LTE(): TerminalNode {
		return this.getToken(JexLangParser.LTE, 0);
	}
	public GTE(): TerminalNode {
		return this.getToken(JexLangParser.GTE, 0);
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitComparatorExpression) {
			return visitor.visitComparatorExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING(): TerminalNode {
		return this.getToken(JexLangParser.STRING, 0);
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitStringExpression) {
			return visitor.visitStringExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BracketPropertyAccessExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public LBRACKET(): TerminalNode {
		return this.getToken(JexLangParser.LBRACKET, 0);
	}
	public RBRACKET(): TerminalNode {
		return this.getToken(JexLangParser.RBRACKET, 0);
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitBracketPropertyAccessExpression) {
			return visitor.visitBracketPropertyAccessExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnaryPlusExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public PLUS(): TerminalNode {
		return this.getToken(JexLangParser.PLUS, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitUnaryPlusExpression) {
			return visitor.visitUnaryPlusExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ObjectLiteralContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LBRACE(): TerminalNode {
		return this.getToken(JexLangParser.LBRACE, 0);
	}
	public RBRACE(): TerminalNode {
		return this.getToken(JexLangParser.RBRACE, 0);
	}
	public objectProperty_list(): ObjectPropertyContext[] {
		return this.getTypedRuleContexts(ObjectPropertyContext) as ObjectPropertyContext[];
	}
	public objectProperty(i: number): ObjectPropertyContext {
		return this.getTypedRuleContext(ObjectPropertyContext, i) as ObjectPropertyContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(JexLangParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(JexLangParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_objectLiteral;
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitObjectLiteral) {
			return visitor.visitObjectLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ObjectPropertyContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public COLON(): TerminalNode {
		return this.getToken(JexLangParser.COLON, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(JexLangParser.IDENTIFIER, 0);
	}
	public STRING(): TerminalNode {
		return this.getToken(JexLangParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_objectProperty;
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitObjectProperty) {
			return visitor.visitObjectProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionCallContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(JexLangParser.IDENTIFIER, 0);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(JexLangParser.LPAREN, 0);
	}
	public RPAREN(): TerminalNode {
		return this.getToken(JexLangParser.RPAREN, 0);
	}
	public argumentList(): ArgumentListContext {
		return this.getTypedRuleContext(ArgumentListContext, 0) as ArgumentListContext;
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_functionCall;
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitFunctionCall) {
			return visitor.visitFunctionCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgumentListContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(JexLangParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(JexLangParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_argumentList;
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitArgumentList) {
			return visitor.visitArgumentList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

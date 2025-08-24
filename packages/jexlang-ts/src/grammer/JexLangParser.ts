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
import JexLangListener from "./JexLangListener.js";
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
	public static readonly SQRT = 7;
	public static readonly INCREMENT = 8;
	public static readonly DECREMENT = 9;
	public static readonly ASSIGN = 10;
	public static readonly EQ = 11;
	public static readonly NEQ = 12;
	public static readonly LT = 13;
	public static readonly GT = 14;
	public static readonly LTE = 15;
	public static readonly GTE = 16;
	public static readonly AND = 17;
	public static readonly OR = 18;
	public static readonly LPAREN = 19;
	public static readonly RPAREN = 20;
	public static readonly LBRACE = 21;
	public static readonly RBRACE = 22;
	public static readonly LBRACKET = 23;
	public static readonly RBRACKET = 24;
	public static readonly SEMICOLON = 25;
	public static readonly COMMA = 26;
	public static readonly DOT = 27;
	public static readonly PIPE = 28;
	public static readonly QUESTION = 29;
	public static readonly COLON = 30;
	public static readonly NUMBER = 31;
	public static readonly BOOLEAN = 32;
	public static readonly LET = 33;
	public static readonly IDENTIFIER = 34;
	public static readonly STRING = 35;
	public static readonly WS = 36;
	public static readonly LINE_COMMENT = 37;
	public static readonly BLOCK_COMMENT = 38;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_program = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_assignment = 2;
	public static readonly RULE_propertyAssignment = 3;
	public static readonly RULE_localDeclaration = 4;
	public static readonly RULE_expression = 5;
	public static readonly RULE_objectLiteral = 6;
	public static readonly RULE_objectProperty = 7;
	public static readonly RULE_functionCall = 8;
	public static readonly RULE_argumentList = 9;
	public static readonly RULE_arrayLiteral = 10;
	public static readonly literalNames: (string | null)[] = [ null, "'+'", 
                                                            "'-'", "'*'", 
                                                            "'/'", "'%'", 
                                                            null, null, 
                                                            "'++'", "'--'", 
                                                            "'='", "'=='", 
                                                            "'!='", "'<'", 
                                                            "'>'", "'<='", 
                                                            "'>='", null, 
                                                            null, "'('", 
                                                            "')'", "'{'", 
                                                            "'}'", "'['", 
                                                            "']'", "';'", 
                                                            "','", "'.'", 
                                                            "'|'", "'?'", 
                                                            "':'", null, 
                                                            null, "'let'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "PLUS", 
                                                             "MINUS", "MULTIPLY", 
                                                             "DIVIDE", "MODULO", 
                                                             "POW", "SQRT", 
                                                             "INCREMENT", 
                                                             "DECREMENT", 
                                                             "ASSIGN", "EQ", 
                                                             "NEQ", "LT", 
                                                             "GT", "LTE", 
                                                             "GTE", "AND", 
                                                             "OR", "LPAREN", 
                                                             "RPAREN", "LBRACE", 
                                                             "RBRACE", "LBRACKET", 
                                                             "RBRACKET", 
                                                             "SEMICOLON", 
                                                             "COMMA", "DOT", 
                                                             "PIPE", "QUESTION", 
                                                             "COLON", "NUMBER", 
                                                             "BOOLEAN", 
                                                             "LET", "IDENTIFIER", 
                                                             "STRING", "WS", 
                                                             "LINE_COMMENT", 
                                                             "BLOCK_COMMENT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "statement", "assignment", "propertyAssignment", "localDeclaration", 
		"expression", "objectLiteral", "objectProperty", "functionCall", "argumentList", 
		"arrayLiteral",
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
			this.state = 25;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2158494598) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 15) !== 0)) {
				{
				{
				this.state = 22;
				this.statement();
				}
				}
				this.state = 27;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 28;
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
			this.state = 46;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 5, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 30;
				this.expression(0);
				this.state = 32;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===25) {
					{
					this.state = 31;
					this.match(JexLangParser.SEMICOLON);
					}
				}

				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 34;
				this.assignment();
				this.state = 36;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===25) {
					{
					this.state = 35;
					this.match(JexLangParser.SEMICOLON);
					}
				}

				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 38;
				this.localDeclaration();
				this.state = 40;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===25) {
					{
					this.state = 39;
					this.match(JexLangParser.SEMICOLON);
					}
				}

				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 42;
				this.propertyAssignment();
				this.state = 44;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===25) {
					{
					this.state = 43;
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
			this.state = 48;
			this.match(JexLangParser.IDENTIFIER);
			this.state = 49;
			this.match(JexLangParser.ASSIGN);
			this.state = 50;
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
			this.state = 65;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				localctx = new DotPropertyAssignmentContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 52;
				this.expression(0);
				this.state = 53;
				this.match(JexLangParser.DOT);
				this.state = 54;
				this.match(JexLangParser.IDENTIFIER);
				this.state = 55;
				this.match(JexLangParser.ASSIGN);
				this.state = 56;
				this.expression(0);
				}
				break;
			case 2:
				localctx = new BracketPropertyAssignmentContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 58;
				this.expression(0);
				this.state = 59;
				this.match(JexLangParser.LBRACKET);
				this.state = 60;
				this.expression(0);
				this.state = 61;
				this.match(JexLangParser.RBRACKET);
				this.state = 62;
				this.match(JexLangParser.ASSIGN);
				this.state = 63;
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
	// @RuleVersion(0)
	public localDeclaration(): LocalDeclarationContext {
		let localctx: LocalDeclarationContext = new LocalDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, JexLangParser.RULE_localDeclaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 67;
			this.match(JexLangParser.LET);
			this.state = 68;
			this.match(JexLangParser.IDENTIFIER);
			this.state = 69;
			this.match(JexLangParser.ASSIGN);
			this.state = 70;
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
		let _startState: number = 10;
		this.enterRecursionRule(localctx, 10, JexLangParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 94;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				{
				localctx = new SquareRootExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 73;
				this.match(JexLangParser.SQRT);
				this.state = 74;
				this.expression(25);
				}
				break;
			case 2:
				{
				localctx = new UnaryMinusExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 75;
				this.match(JexLangParser.MINUS);
				this.state = 76;
				this.expression(24);
				}
				break;
			case 3:
				{
				localctx = new UnaryPlusExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 77;
				this.match(JexLangParser.PLUS);
				this.state = 78;
				this.expression(23);
				}
				break;
			case 4:
				{
				localctx = new PrefixIncrementExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 79;
				this.match(JexLangParser.INCREMENT);
				this.state = 80;
				this.expression(22);
				}
				break;
			case 5:
				{
				localctx = new PrefixDecrementExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 81;
				this.match(JexLangParser.DECREMENT);
				this.state = 82;
				this.expression(21);
				}
				break;
			case 6:
				{
				localctx = new ParenthesizedExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 83;
				this.match(JexLangParser.LPAREN);
				this.state = 84;
				this.expression(0);
				this.state = 85;
				this.match(JexLangParser.RPAREN);
				}
				break;
			case 7:
				{
				localctx = new FunctionCallExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 87;
				this.functionCall();
				}
				break;
			case 8:
				{
				localctx = new ObjectLiteralExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 88;
				this.objectLiteral();
				}
				break;
			case 9:
				{
				localctx = new ArrayLiteralExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 89;
				this.arrayLiteral();
				}
				break;
			case 10:
				{
				localctx = new BooleanExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 90;
				this.match(JexLangParser.BOOLEAN);
				}
				break;
			case 11:
				{
				localctx = new VariableExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 91;
				this.match(JexLangParser.IDENTIFIER);
				}
				break;
			case 12:
				{
				localctx = new NumberExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 92;
				this.match(JexLangParser.NUMBER);
				}
				break;
			case 13:
				{
				localctx = new StringExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 93;
				this.match(JexLangParser.STRING);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 141;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 9, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 139;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 8, this._ctx) ) {
					case 1:
						{
						localctx = new PowerExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 96;
						if (!(this.precpred(this._ctx, 26))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 26)");
						}
						this.state = 97;
						this.match(JexLangParser.POW);
						this.state = 98;
						this.expression(27);
						}
						break;
					case 2:
						{
						localctx = new MulDivModExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 99;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 100;
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 56) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 101;
						this.expression(19);
						}
						break;
					case 3:
						{
						localctx = new AddSubExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 102;
						if (!(this.precpred(this._ctx, 17))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 17)");
						}
						this.state = 103;
						_la = this._input.LA(1);
						if(!(_la===1 || _la===2)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 104;
						this.expression(18);
						}
						break;
					case 4:
						{
						localctx = new ComparatorExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 105;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 106;
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 129024) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 107;
						this.expression(17);
						}
						break;
					case 5:
						{
						localctx = new LogicalAndExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 108;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 109;
						this.match(JexLangParser.AND);
						this.state = 110;
						this.expression(16);
						}
						break;
					case 6:
						{
						localctx = new LogicalOrExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 111;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 112;
						this.match(JexLangParser.OR);
						this.state = 113;
						this.expression(15);
						}
						break;
					case 7:
						{
						localctx = new TernaryExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 114;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 115;
						this.match(JexLangParser.QUESTION);
						this.state = 116;
						this.expression(0);
						this.state = 117;
						this.match(JexLangParser.COLON);
						this.state = 118;
						this.expression(9);
						}
						break;
					case 8:
						{
						localctx = new ShortTernaryExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 120;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 121;
						this.match(JexLangParser.QUESTION);
						this.state = 122;
						this.match(JexLangParser.COLON);
						this.state = 123;
						this.expression(8);
						}
						break;
					case 9:
						{
						localctx = new PostfixIncrementExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 124;
						if (!(this.precpred(this._ctx, 20))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 20)");
						}
						this.state = 125;
						this.match(JexLangParser.INCREMENT);
						}
						break;
					case 10:
						{
						localctx = new PostfixDecrementExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 126;
						if (!(this.precpred(this._ctx, 19))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 19)");
						}
						this.state = 127;
						this.match(JexLangParser.DECREMENT);
						}
						break;
					case 11:
						{
						localctx = new TransformExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 128;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 129;
						this.match(JexLangParser.PIPE);
						this.state = 130;
						this.match(JexLangParser.IDENTIFIER);
						}
						break;
					case 12:
						{
						localctx = new DotPropertyAccessExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 131;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 132;
						this.match(JexLangParser.DOT);
						this.state = 133;
						this.match(JexLangParser.IDENTIFIER);
						}
						break;
					case 13:
						{
						localctx = new BracketPropertyAccessExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_expression);
						this.state = 134;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 135;
						this.match(JexLangParser.LBRACKET);
						this.state = 136;
						this.expression(0);
						this.state = 137;
						this.match(JexLangParser.RBRACKET);
						}
						break;
					}
					}
				}
				this.state = 143;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 9, this._ctx);
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
		this.enterRule(localctx, 12, JexLangParser.RULE_objectLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 144;
			this.match(JexLangParser.LBRACE);
			this.state = 153;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===34 || _la===35) {
				{
				this.state = 145;
				this.objectProperty();
				this.state = 150;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===26) {
					{
					{
					this.state = 146;
					this.match(JexLangParser.COMMA);
					this.state = 147;
					this.objectProperty();
					}
					}
					this.state = 152;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 155;
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
		this.enterRule(localctx, 14, JexLangParser.RULE_objectProperty);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 157;
			_la = this._input.LA(1);
			if(!(_la===34 || _la===35)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 158;
			this.match(JexLangParser.COLON);
			this.state = 159;
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
		this.enterRule(localctx, 16, JexLangParser.RULE_functionCall);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 161;
			this.match(JexLangParser.IDENTIFIER);
			this.state = 162;
			this.match(JexLangParser.LPAREN);
			this.state = 164;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2158494598) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 13) !== 0)) {
				{
				this.state = 163;
				this.argumentList();
				}
			}

			this.state = 166;
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
		this.enterRule(localctx, 18, JexLangParser.RULE_argumentList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 168;
			this.expression(0);
			this.state = 173;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===26) {
				{
				{
				this.state = 169;
				this.match(JexLangParser.COMMA);
				this.state = 170;
				this.expression(0);
				}
				}
				this.state = 175;
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
	// @RuleVersion(0)
	public arrayLiteral(): ArrayLiteralContext {
		let localctx: ArrayLiteralContext = new ArrayLiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, JexLangParser.RULE_arrayLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 176;
			this.match(JexLangParser.LBRACKET);
			this.state = 185;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2158494598) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 13) !== 0)) {
				{
				this.state = 177;
				this.expression(0);
				this.state = 182;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===26) {
					{
					{
					this.state = 178;
					this.match(JexLangParser.COMMA);
					this.state = 179;
					this.expression(0);
					}
					}
					this.state = 184;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 187;
			this.match(JexLangParser.RBRACKET);
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
		case 5:
			return this.expression_sempred(localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 26);
		case 1:
			return this.precpred(this._ctx, 18);
		case 2:
			return this.precpred(this._ctx, 17);
		case 3:
			return this.precpred(this._ctx, 16);
		case 4:
			return this.precpred(this._ctx, 15);
		case 5:
			return this.precpred(this._ctx, 14);
		case 6:
			return this.precpred(this._ctx, 8);
		case 7:
			return this.precpred(this._ctx, 7);
		case 8:
			return this.precpred(this._ctx, 20);
		case 9:
			return this.precpred(this._ctx, 19);
		case 10:
			return this.precpred(this._ctx, 13);
		case 11:
			return this.precpred(this._ctx, 10);
		case 12:
			return this.precpred(this._ctx, 9);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,38,190,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,1,0,5,0,24,8,0,10,0,12,0,27,9,0,1,0,1,0,1,1,1,1,3,1,33,8,1,1,1,
	1,1,3,1,37,8,1,1,1,1,1,3,1,41,8,1,1,1,1,1,3,1,45,8,1,3,1,47,8,1,1,2,1,2,
	1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,66,8,3,
	1,4,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,
	1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,3,5,95,8,5,1,5,1,5,1,5,1,5,1,5,1,5,
	1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,
	1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,
	1,5,5,5,140,8,5,10,5,12,5,143,9,5,1,6,1,6,1,6,1,6,5,6,149,8,6,10,6,12,6,
	152,9,6,3,6,154,8,6,1,6,1,6,1,7,1,7,1,7,1,7,1,8,1,8,1,8,3,8,165,8,8,1,8,
	1,8,1,9,1,9,1,9,5,9,172,8,9,10,9,12,9,175,9,9,1,10,1,10,1,10,1,10,5,10,
	181,8,10,10,10,12,10,184,9,10,3,10,186,8,10,1,10,1,10,1,10,0,1,10,11,0,
	2,4,6,8,10,12,14,16,18,20,0,4,1,0,3,5,1,0,1,2,1,0,11,16,1,0,34,35,218,0,
	25,1,0,0,0,2,46,1,0,0,0,4,48,1,0,0,0,6,65,1,0,0,0,8,67,1,0,0,0,10,94,1,
	0,0,0,12,144,1,0,0,0,14,157,1,0,0,0,16,161,1,0,0,0,18,168,1,0,0,0,20,176,
	1,0,0,0,22,24,3,2,1,0,23,22,1,0,0,0,24,27,1,0,0,0,25,23,1,0,0,0,25,26,1,
	0,0,0,26,28,1,0,0,0,27,25,1,0,0,0,28,29,5,0,0,1,29,1,1,0,0,0,30,32,3,10,
	5,0,31,33,5,25,0,0,32,31,1,0,0,0,32,33,1,0,0,0,33,47,1,0,0,0,34,36,3,4,
	2,0,35,37,5,25,0,0,36,35,1,0,0,0,36,37,1,0,0,0,37,47,1,0,0,0,38,40,3,8,
	4,0,39,41,5,25,0,0,40,39,1,0,0,0,40,41,1,0,0,0,41,47,1,0,0,0,42,44,3,6,
	3,0,43,45,5,25,0,0,44,43,1,0,0,0,44,45,1,0,0,0,45,47,1,0,0,0,46,30,1,0,
	0,0,46,34,1,0,0,0,46,38,1,0,0,0,46,42,1,0,0,0,47,3,1,0,0,0,48,49,5,34,0,
	0,49,50,5,10,0,0,50,51,3,10,5,0,51,5,1,0,0,0,52,53,3,10,5,0,53,54,5,27,
	0,0,54,55,5,34,0,0,55,56,5,10,0,0,56,57,3,10,5,0,57,66,1,0,0,0,58,59,3,
	10,5,0,59,60,5,23,0,0,60,61,3,10,5,0,61,62,5,24,0,0,62,63,5,10,0,0,63,64,
	3,10,5,0,64,66,1,0,0,0,65,52,1,0,0,0,65,58,1,0,0,0,66,7,1,0,0,0,67,68,5,
	33,0,0,68,69,5,34,0,0,69,70,5,10,0,0,70,71,3,10,5,0,71,9,1,0,0,0,72,73,
	6,5,-1,0,73,74,5,7,0,0,74,95,3,10,5,25,75,76,5,2,0,0,76,95,3,10,5,24,77,
	78,5,1,0,0,78,95,3,10,5,23,79,80,5,8,0,0,80,95,3,10,5,22,81,82,5,9,0,0,
	82,95,3,10,5,21,83,84,5,19,0,0,84,85,3,10,5,0,85,86,5,20,0,0,86,95,1,0,
	0,0,87,95,3,16,8,0,88,95,3,12,6,0,89,95,3,20,10,0,90,95,5,32,0,0,91,95,
	5,34,0,0,92,95,5,31,0,0,93,95,5,35,0,0,94,72,1,0,0,0,94,75,1,0,0,0,94,77,
	1,0,0,0,94,79,1,0,0,0,94,81,1,0,0,0,94,83,1,0,0,0,94,87,1,0,0,0,94,88,1,
	0,0,0,94,89,1,0,0,0,94,90,1,0,0,0,94,91,1,0,0,0,94,92,1,0,0,0,94,93,1,0,
	0,0,95,141,1,0,0,0,96,97,10,26,0,0,97,98,5,6,0,0,98,140,3,10,5,27,99,100,
	10,18,0,0,100,101,7,0,0,0,101,140,3,10,5,19,102,103,10,17,0,0,103,104,7,
	1,0,0,104,140,3,10,5,18,105,106,10,16,0,0,106,107,7,2,0,0,107,140,3,10,
	5,17,108,109,10,15,0,0,109,110,5,17,0,0,110,140,3,10,5,16,111,112,10,14,
	0,0,112,113,5,18,0,0,113,140,3,10,5,15,114,115,10,8,0,0,115,116,5,29,0,
	0,116,117,3,10,5,0,117,118,5,30,0,0,118,119,3,10,5,9,119,140,1,0,0,0,120,
	121,10,7,0,0,121,122,5,29,0,0,122,123,5,30,0,0,123,140,3,10,5,8,124,125,
	10,20,0,0,125,140,5,8,0,0,126,127,10,19,0,0,127,140,5,9,0,0,128,129,10,
	13,0,0,129,130,5,28,0,0,130,140,5,34,0,0,131,132,10,10,0,0,132,133,5,27,
	0,0,133,140,5,34,0,0,134,135,10,9,0,0,135,136,5,23,0,0,136,137,3,10,5,0,
	137,138,5,24,0,0,138,140,1,0,0,0,139,96,1,0,0,0,139,99,1,0,0,0,139,102,
	1,0,0,0,139,105,1,0,0,0,139,108,1,0,0,0,139,111,1,0,0,0,139,114,1,0,0,0,
	139,120,1,0,0,0,139,124,1,0,0,0,139,126,1,0,0,0,139,128,1,0,0,0,139,131,
	1,0,0,0,139,134,1,0,0,0,140,143,1,0,0,0,141,139,1,0,0,0,141,142,1,0,0,0,
	142,11,1,0,0,0,143,141,1,0,0,0,144,153,5,21,0,0,145,150,3,14,7,0,146,147,
	5,26,0,0,147,149,3,14,7,0,148,146,1,0,0,0,149,152,1,0,0,0,150,148,1,0,0,
	0,150,151,1,0,0,0,151,154,1,0,0,0,152,150,1,0,0,0,153,145,1,0,0,0,153,154,
	1,0,0,0,154,155,1,0,0,0,155,156,5,22,0,0,156,13,1,0,0,0,157,158,7,3,0,0,
	158,159,5,30,0,0,159,160,3,10,5,0,160,15,1,0,0,0,161,162,5,34,0,0,162,164,
	5,19,0,0,163,165,3,18,9,0,164,163,1,0,0,0,164,165,1,0,0,0,165,166,1,0,0,
	0,166,167,5,20,0,0,167,17,1,0,0,0,168,173,3,10,5,0,169,170,5,26,0,0,170,
	172,3,10,5,0,171,169,1,0,0,0,172,175,1,0,0,0,173,171,1,0,0,0,173,174,1,
	0,0,0,174,19,1,0,0,0,175,173,1,0,0,0,176,185,5,23,0,0,177,182,3,10,5,0,
	178,179,5,26,0,0,179,181,3,10,5,0,180,178,1,0,0,0,181,184,1,0,0,0,182,180,
	1,0,0,0,182,183,1,0,0,0,183,186,1,0,0,0,184,182,1,0,0,0,185,177,1,0,0,0,
	185,186,1,0,0,0,186,187,1,0,0,0,187,188,5,24,0,0,188,21,1,0,0,0,16,25,32,
	36,40,44,46,65,94,139,141,150,153,164,173,182,185];

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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterProgram) {
	 		listener.enterProgram(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitProgram) {
	 		listener.exitProgram(this);
		}
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
	public localDeclaration(): LocalDeclarationContext {
		return this.getTypedRuleContext(LocalDeclarationContext, 0) as LocalDeclarationContext;
	}
	public propertyAssignment(): PropertyAssignmentContext {
		return this.getTypedRuleContext(PropertyAssignmentContext, 0) as PropertyAssignmentContext;
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_statement;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterStatement) {
	 		listener.enterStatement(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitStatement) {
	 		listener.exitStatement(this);
		}
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterAssignment) {
	 		listener.enterAssignment(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitAssignment) {
	 		listener.exitAssignment(this);
		}
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
    public get ruleIndex(): number {
    	return JexLangParser.RULE_propertyAssignment;
	}
	public override copyFrom(ctx: PropertyAssignmentContext): void {
		super.copyFrom(ctx);
	}
}
export class BracketPropertyAssignmentContext extends PropertyAssignmentContext {
	constructor(parser: JexLangParser, ctx: PropertyAssignmentContext) {
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
	public ASSIGN(): TerminalNode {
		return this.getToken(JexLangParser.ASSIGN, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterBracketPropertyAssignment) {
	 		listener.enterBracketPropertyAssignment(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitBracketPropertyAssignment) {
	 		listener.exitBracketPropertyAssignment(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitBracketPropertyAssignment) {
			return visitor.visitBracketPropertyAssignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DotPropertyAssignmentContext extends PropertyAssignmentContext {
	constructor(parser: JexLangParser, ctx: PropertyAssignmentContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterDotPropertyAssignment) {
	 		listener.enterDotPropertyAssignment(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitDotPropertyAssignment) {
	 		listener.exitDotPropertyAssignment(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitDotPropertyAssignment) {
			return visitor.visitDotPropertyAssignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LocalDeclarationContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LET(): TerminalNode {
		return this.getToken(JexLangParser.LET, 0);
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
    	return JexLangParser.RULE_localDeclaration;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterLocalDeclaration) {
	 		listener.enterLocalDeclaration(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitLocalDeclaration) {
	 		listener.exitLocalDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitLocalDeclaration) {
			return visitor.visitLocalDeclaration(this);
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterShortTernaryExpression) {
	 		listener.enterShortTernaryExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitShortTernaryExpression) {
	 		listener.exitShortTernaryExpression(this);
		}
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterTernaryExpression) {
	 		listener.enterTernaryExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitTernaryExpression) {
	 		listener.exitTernaryExpression(this);
		}
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
export class LogicalAndExpressionContext extends ExpressionContext {
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
	public AND(): TerminalNode {
		return this.getToken(JexLangParser.AND, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterLogicalAndExpression) {
	 		listener.enterLogicalAndExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitLogicalAndExpression) {
	 		listener.exitLogicalAndExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitLogicalAndExpression) {
			return visitor.visitLogicalAndExpression(this);
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterPowerExpression) {
	 		listener.enterPowerExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitPowerExpression) {
	 		listener.exitPowerExpression(this);
		}
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterObjectLiteralExpression) {
	 		listener.enterObjectLiteralExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitObjectLiteralExpression) {
	 		listener.exitObjectLiteralExpression(this);
		}
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
export class LogicalOrExpressionContext extends ExpressionContext {
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
	public OR(): TerminalNode {
		return this.getToken(JexLangParser.OR, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterLogicalOrExpression) {
	 		listener.enterLogicalOrExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitLogicalOrExpression) {
	 		listener.exitLogicalOrExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitLogicalOrExpression) {
			return visitor.visitLogicalOrExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PrefixIncrementExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public INCREMENT(): TerminalNode {
		return this.getToken(JexLangParser.INCREMENT, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterPrefixIncrementExpression) {
	 		listener.enterPrefixIncrementExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitPrefixIncrementExpression) {
	 		listener.exitPrefixIncrementExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitPrefixIncrementExpression) {
			return visitor.visitPrefixIncrementExpression(this);
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterMulDivModExpression) {
	 		listener.enterMulDivModExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitMulDivModExpression) {
	 		listener.exitMulDivModExpression(this);
		}
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterFunctionCallExpression) {
	 		listener.enterFunctionCallExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitFunctionCallExpression) {
	 		listener.exitFunctionCallExpression(this);
		}
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterAddSubExpression) {
	 		listener.enterAddSubExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitAddSubExpression) {
	 		listener.exitAddSubExpression(this);
		}
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterBooleanExpression) {
	 		listener.enterBooleanExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitBooleanExpression) {
	 		listener.exitBooleanExpression(this);
		}
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterUnaryMinusExpression) {
	 		listener.enterUnaryMinusExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitUnaryMinusExpression) {
	 		listener.exitUnaryMinusExpression(this);
		}
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterComparatorExpression) {
	 		listener.enterComparatorExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitComparatorExpression) {
	 		listener.exitComparatorExpression(this);
		}
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterUnaryPlusExpression) {
	 		listener.enterUnaryPlusExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitUnaryPlusExpression) {
	 		listener.exitUnaryPlusExpression(this);
		}
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
export class PostfixIncrementExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public INCREMENT(): TerminalNode {
		return this.getToken(JexLangParser.INCREMENT, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterPostfixIncrementExpression) {
	 		listener.enterPostfixIncrementExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitPostfixIncrementExpression) {
	 		listener.exitPostfixIncrementExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitPostfixIncrementExpression) {
			return visitor.visitPostfixIncrementExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PrefixDecrementExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DECREMENT(): TerminalNode {
		return this.getToken(JexLangParser.DECREMENT, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterPrefixDecrementExpression) {
	 		listener.enterPrefixDecrementExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitPrefixDecrementExpression) {
	 		listener.exitPrefixDecrementExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitPrefixDecrementExpression) {
			return visitor.visitPrefixDecrementExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterParenthesizedExpression) {
	 		listener.enterParenthesizedExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitParenthesizedExpression) {
	 		listener.exitParenthesizedExpression(this);
		}
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
export class PostfixDecrementExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public DECREMENT(): TerminalNode {
		return this.getToken(JexLangParser.DECREMENT, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterPostfixDecrementExpression) {
	 		listener.enterPostfixDecrementExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitPostfixDecrementExpression) {
	 		listener.exitPostfixDecrementExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitPostfixDecrementExpression) {
			return visitor.visitPostfixDecrementExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ArrayLiteralExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public arrayLiteral(): ArrayLiteralContext {
		return this.getTypedRuleContext(ArrayLiteralContext, 0) as ArrayLiteralContext;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterArrayLiteralExpression) {
	 		listener.enterArrayLiteralExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitArrayLiteralExpression) {
	 		listener.exitArrayLiteralExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitArrayLiteralExpression) {
			return visitor.visitArrayLiteralExpression(this);
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterVariableExpression) {
	 		listener.enterVariableExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitVariableExpression) {
	 		listener.exitVariableExpression(this);
		}
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterNumberExpression) {
	 		listener.enterNumberExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitNumberExpression) {
	 		listener.exitNumberExpression(this);
		}
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
export class TransformExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public PIPE(): TerminalNode {
		return this.getToken(JexLangParser.PIPE, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(JexLangParser.IDENTIFIER, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterTransformExpression) {
	 		listener.enterTransformExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitTransformExpression) {
	 		listener.exitTransformExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitTransformExpression) {
			return visitor.visitTransformExpression(this);
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterDotPropertyAccessExpression) {
	 		listener.enterDotPropertyAccessExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitDotPropertyAccessExpression) {
	 		listener.exitDotPropertyAccessExpression(this);
		}
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
export class StringExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING(): TerminalNode {
		return this.getToken(JexLangParser.STRING, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterStringExpression) {
	 		listener.enterStringExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitStringExpression) {
	 		listener.exitStringExpression(this);
		}
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterBracketPropertyAccessExpression) {
	 		listener.enterBracketPropertyAccessExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitBracketPropertyAccessExpression) {
	 		listener.exitBracketPropertyAccessExpression(this);
		}
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
export class SquareRootExpressionContext extends ExpressionContext {
	constructor(parser: JexLangParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public SQRT(): TerminalNode {
		return this.getToken(JexLangParser.SQRT, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterSquareRootExpression) {
	 		listener.enterSquareRootExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitSquareRootExpression) {
	 		listener.exitSquareRootExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitSquareRootExpression) {
			return visitor.visitSquareRootExpression(this);
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterObjectLiteral) {
	 		listener.enterObjectLiteral(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitObjectLiteral) {
	 		listener.exitObjectLiteral(this);
		}
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterObjectProperty) {
	 		listener.enterObjectProperty(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitObjectProperty) {
	 		listener.exitObjectProperty(this);
		}
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterFunctionCall) {
	 		listener.enterFunctionCall(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitFunctionCall) {
	 		listener.exitFunctionCall(this);
		}
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
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterArgumentList) {
	 		listener.enterArgumentList(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitArgumentList) {
	 		listener.exitArgumentList(this);
		}
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


export class ArrayLiteralContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LBRACKET(): TerminalNode {
		return this.getToken(JexLangParser.LBRACKET, 0);
	}
	public RBRACKET(): TerminalNode {
		return this.getToken(JexLangParser.RBRACKET, 0);
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
    	return JexLangParser.RULE_arrayLiteral;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterArrayLiteral) {
	 		listener.enterArrayLiteral(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitArrayLiteral) {
	 		listener.exitArrayLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitArrayLiteral) {
			return visitor.visitArrayLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

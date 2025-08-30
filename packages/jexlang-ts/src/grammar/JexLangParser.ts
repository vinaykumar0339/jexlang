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
	public static readonly T__0 = 1;
	public static readonly LET = 2;
	public static readonly BOOLEAN = 3;
	public static readonly NULL = 4;
	public static readonly INCREMENT = 5;
	public static readonly DECREMENT = 6;
	public static readonly POW = 7;
	public static readonly SQRT = 8;
	public static readonly EQ = 9;
	public static readonly NEQ = 10;
	public static readonly LTE = 11;
	public static readonly GTE = 12;
	public static readonly AND = 13;
	public static readonly OR = 14;
	public static readonly ASSIGN = 15;
	public static readonly PLUS = 16;
	public static readonly MINUS = 17;
	public static readonly MULTIPLY = 18;
	public static readonly DIVIDE = 19;
	public static readonly MODULO = 20;
	public static readonly POWER = 21;
	public static readonly LT = 22;
	public static readonly GT = 23;
	public static readonly LPAREN = 24;
	public static readonly RPAREN = 25;
	public static readonly LBRACE = 26;
	public static readonly RBRACE = 27;
	public static readonly LBRACKET = 28;
	public static readonly RBRACKET = 29;
	public static readonly SEMICOLON = 30;
	public static readonly COMMA = 31;
	public static readonly DOT = 32;
	public static readonly PIPE = 33;
	public static readonly QUESTION = 34;
	public static readonly COLON = 35;
	public static readonly NUMBER = 36;
	public static readonly IDENTIFIER = 37;
	public static readonly STRING = 38;
	public static readonly WS = 39;
	public static readonly LINE_COMMENT = 40;
	public static readonly BLOCK_COMMENT = 41;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_program = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_block = 2;
	public static readonly RULE_emptyStatement = 3;
	public static readonly RULE_varDeclaration = 4;
	public static readonly RULE_expressionStatement = 5;
	public static readonly RULE_expressionSequence = 6;
	public static readonly RULE_singleExpression = 7;
	public static readonly RULE_literal = 8;
	public static readonly RULE_arrayLiteral = 9;
	public static readonly RULE_arrayElement = 10;
	public static readonly RULE_objectLiteral = 11;
	public static readonly RULE_objectProperty = 12;
	public static readonly RULE_objectPropertyName = 13;
	public static readonly RULE_arguments = 14;
	public static readonly RULE_argument = 15;
	public static readonly literalNames: (string | null)[] = [ null, "'sqrt'", 
                                                            "'let'", null, 
                                                            "'null'", "'++'", 
                                                            "'--'", "'**'", 
                                                            "'\\u221A'", 
                                                            "'=='", "'!='", 
                                                            "'<='", "'>='", 
                                                            null, null, 
                                                            "'='", "'+'", 
                                                            "'-'", "'*'", 
                                                            "'/'", "'%'", 
                                                            "'^'", "'<'", 
                                                            "'>'", "'('", 
                                                            "')'", "'{'", 
                                                            "'}'", "'['", 
                                                            "']'", "';'", 
                                                            "','", "'.'", 
                                                            "'|'", "'?'", 
                                                            "':'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             "LET", "BOOLEAN", 
                                                             "NULL", "INCREMENT", 
                                                             "DECREMENT", 
                                                             "POW", "SQRT", 
                                                             "EQ", "NEQ", 
                                                             "LTE", "GTE", 
                                                             "AND", "OR", 
                                                             "ASSIGN", "PLUS", 
                                                             "MINUS", "MULTIPLY", 
                                                             "DIVIDE", "MODULO", 
                                                             "POWER", "LT", 
                                                             "GT", "LPAREN", 
                                                             "RPAREN", "LBRACE", 
                                                             "RBRACE", "LBRACKET", 
                                                             "RBRACKET", 
                                                             "SEMICOLON", 
                                                             "COMMA", "DOT", 
                                                             "PIPE", "QUESTION", 
                                                             "COLON", "NUMBER", 
                                                             "IDENTIFIER", 
                                                             "STRING", "WS", 
                                                             "LINE_COMMENT", 
                                                             "BLOCK_COMMENT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "statement", "block", "emptyStatement", "varDeclaration", "expressionStatement", 
		"expressionSequence", "singleExpression", "literal", "arrayLiteral", "arrayElement", 
		"objectLiteral", "objectProperty", "objectPropertyName", "arguments", 
		"argument",
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
			this.state = 35;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1426260350) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 7) !== 0)) {
				{
				{
				this.state = 32;
				this.statement();
				}
				}
				this.state = 37;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 38;
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
		try {
			this.state = 44;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 40;
				this.expressionStatement();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 41;
				this.varDeclaration();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 42;
				this.block();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 43;
				this.emptyStatement();
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
	public block(): BlockContext {
		let localctx: BlockContext = new BlockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, JexLangParser.RULE_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 46;
			this.match(JexLangParser.LBRACE);
			this.state = 50;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1426260350) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 7) !== 0)) {
				{
				{
				this.state = 47;
				this.statement();
				}
				}
				this.state = 52;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 53;
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
	public emptyStatement(): EmptyStatementContext {
		let localctx: EmptyStatementContext = new EmptyStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, JexLangParser.RULE_emptyStatement);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 55;
			this.match(JexLangParser.SEMICOLON);
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
	public varDeclaration(): VarDeclarationContext {
		let localctx: VarDeclarationContext = new VarDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, JexLangParser.RULE_varDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 57;
			this.match(JexLangParser.LET);
			this.state = 58;
			this.match(JexLangParser.IDENTIFIER);
			this.state = 61;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===15) {
				{
				this.state = 59;
				this.match(JexLangParser.ASSIGN);
				this.state = 60;
				this.singleExpression(0);
				}
			}

			this.state = 64;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				{
				this.state = 63;
				this.match(JexLangParser.SEMICOLON);
				}
				break;
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
	public expressionStatement(): ExpressionStatementContext {
		let localctx: ExpressionStatementContext = new ExpressionStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, JexLangParser.RULE_expressionStatement);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 66;
			this.expressionSequence();
			this.state = 68;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 5, this._ctx) ) {
			case 1:
				{
				this.state = 67;
				this.match(JexLangParser.SEMICOLON);
				}
				break;
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
	public expressionSequence(): ExpressionSequenceContext {
		let localctx: ExpressionSequenceContext = new ExpressionSequenceContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, JexLangParser.RULE_expressionSequence);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 70;
			this.singleExpression(0);
			this.state = 75;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===31) {
				{
				{
				this.state = 71;
				this.match(JexLangParser.COMMA);
				this.state = 72;
				this.singleExpression(0);
				}
				}
				this.state = 77;
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

	public singleExpression(): SingleExpressionContext;
	public singleExpression(_p: number): SingleExpressionContext;
	// @RuleVersion(0)
	public singleExpression(_p?: number): SingleExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: SingleExpressionContext = new SingleExpressionContext(this, this._ctx, _parentState);
		let _prevctx: SingleExpressionContext = localctx;
		let _startState: number = 14;
		this.enterRecursionRule(localctx, 14, JexLangParser.RULE_singleExpression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 96;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				{
				localctx = new FunctionCallExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 79;
				this.match(JexLangParser.IDENTIFIER);
				this.state = 80;
				this.arguments();
				}
				break;
			case 2:
				{
				localctx = new PrefixExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 81;
				_la = this._input.LA(1);
				if(!(_la===5 || _la===6)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 82;
				this.singleExpression(19);
				}
				break;
			case 3:
				{
				localctx = new SquareRootExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 83;
				_la = this._input.LA(1);
				if(!(_la===1 || _la===8)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 84;
				this.singleExpression(18);
				}
				break;
			case 4:
				{
				localctx = new UnaryExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 85;
				_la = this._input.LA(1);
				if(!(_la===16 || _la===17)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 86;
				this.singleExpression(17);
				}
				break;
			case 5:
				{
				localctx = new AssignmentExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 87;
				this.match(JexLangParser.IDENTIFIER);
				this.state = 88;
				this.match(JexLangParser.ASSIGN);
				this.state = 89;
				this.singleExpression(6);
				}
				break;
			case 6:
				{
				localctx = new ParenthesizedExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 90;
				this.match(JexLangParser.LPAREN);
				this.state = 91;
				this.expressionSequence();
				this.state = 92;
				this.match(JexLangParser.RPAREN);
				}
				break;
			case 7:
				{
				localctx = new LiteralExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 94;
				this.literal();
				}
				break;
			case 8:
				{
				localctx = new IdentifierExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 95;
				this.match(JexLangParser.IDENTIFIER);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 163;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 161;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 10, this._ctx) ) {
					case 1:
						{
						localctx = new PowerExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 98;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 99;
						_la = this._input.LA(1);
						if(!(_la===7 || _la===21)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 100;
						this.singleExpression(16);
						}
						break;
					case 2:
						{
						localctx = new MultiplicativeExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 101;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 102;
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 1835008) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 103;
						this.singleExpression(16);
						}
						break;
					case 3:
						{
						localctx = new AdditiveExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 104;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 105;
						_la = this._input.LA(1);
						if(!(_la===16 || _la===17)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 106;
						this.singleExpression(15);
						}
						break;
					case 4:
						{
						localctx = new RelationalExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 107;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 108;
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 12589056) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 109;
						this.singleExpression(14);
						}
						break;
					case 5:
						{
						localctx = new EqualityExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 110;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 111;
						_la = this._input.LA(1);
						if(!(_la===9 || _la===10)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 112;
						this.singleExpression(13);
						}
						break;
					case 6:
						{
						localctx = new LogicalAndExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 113;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						this.state = 114;
						this.match(JexLangParser.AND);
						this.state = 115;
						this.singleExpression(12);
						}
						break;
					case 7:
						{
						localctx = new LogicalOrExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 116;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 117;
						this.match(JexLangParser.OR);
						this.state = 118;
						this.singleExpression(11);
						}
						break;
					case 8:
						{
						localctx = new TernaryExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 119;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 120;
						this.match(JexLangParser.QUESTION);
						this.state = 121;
						this.singleExpression(0);
						this.state = 122;
						this.match(JexLangParser.COLON);
						this.state = 123;
						this.singleExpression(8);
						}
						break;
					case 9:
						{
						localctx = new ShortTernaryExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 125;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 126;
						this.match(JexLangParser.QUESTION);
						this.state = 127;
						this.match(JexLangParser.COLON);
						this.state = 128;
						this.singleExpression(8);
						}
						break;
					case 10:
						{
						localctx = new BracketPropertyAssignmentContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 129;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 130;
						this.match(JexLangParser.LBRACKET);
						this.state = 131;
						this.expressionSequence();
						this.state = 132;
						this.match(JexLangParser.RBRACKET);
						this.state = 133;
						this.match(JexLangParser.ASSIGN);
						this.state = 134;
						this.singleExpression(5);
						}
						break;
					case 11:
						{
						localctx = new DotPropertyAssignmentContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 136;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 137;
						this.match(JexLangParser.DOT);
						this.state = 138;
						this.objectPropertyName();
						this.state = 139;
						this.match(JexLangParser.ASSIGN);
						this.state = 140;
						this.singleExpression(4);
						}
						break;
					case 12:
						{
						localctx = new MemberIndexExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 142;
						if (!(this.precpred(this._ctx, 23))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 23)");
						}
						this.state = 144;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===34) {
							{
							this.state = 143;
							this.match(JexLangParser.QUESTION);
							}
						}

						this.state = 146;
						this.match(JexLangParser.LBRACKET);
						this.state = 147;
						this.expressionSequence();
						this.state = 148;
						this.match(JexLangParser.RBRACKET);
						}
						break;
					case 13:
						{
						localctx = new MemberDotExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 150;
						if (!(this.precpred(this._ctx, 22))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 22)");
						}
						this.state = 152;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===34) {
							{
							this.state = 151;
							this.match(JexLangParser.QUESTION);
							}
						}

						this.state = 154;
						this.match(JexLangParser.DOT);
						this.state = 155;
						this.objectPropertyName();
						}
						break;
					case 14:
						{
						localctx = new PostfixExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 156;
						if (!(this.precpred(this._ctx, 20))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 20)");
						}
						this.state = 157;
						_la = this._input.LA(1);
						if(!(_la===5 || _la===6)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						}
						break;
					case 15:
						{
						localctx = new TransformExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 158;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 159;
						this.match(JexLangParser.PIPE);
						this.state = 160;
						this.match(JexLangParser.IDENTIFIER);
						}
						break;
					}
					}
				}
				this.state = 165;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
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
	public literal(): LiteralContext {
		let localctx: LiteralContext = new LiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, JexLangParser.RULE_literal);
		try {
			this.state = 172;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 38:
				localctx = new StringLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 166;
				this.match(JexLangParser.STRING);
				}
				break;
			case 36:
				localctx = new NumberLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 167;
				this.match(JexLangParser.NUMBER);
				}
				break;
			case 3:
				localctx = new BooleanLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 168;
				this.match(JexLangParser.BOOLEAN);
				}
				break;
			case 4:
				localctx = new NullLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 169;
				this.match(JexLangParser.NULL);
				}
				break;
			case 28:
				localctx = new ArrayLiteralExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 170;
				this.arrayLiteral();
				}
				break;
			case 26:
				localctx = new ObjectLiteralExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 171;
				this.objectLiteral();
				}
				break;
			default:
				throw new NoViableAltException(this);
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
		this.enterRule(localctx, 18, JexLangParser.RULE_arrayLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 174;
			this.match(JexLangParser.LBRACKET);
			this.state = 183;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 352518522) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 7) !== 0)) {
				{
				this.state = 175;
				this.arrayElement();
				this.state = 180;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===31) {
					{
					{
					this.state = 176;
					this.match(JexLangParser.COMMA);
					this.state = 177;
					this.arrayElement();
					}
					}
					this.state = 182;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 185;
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
	// @RuleVersion(0)
	public arrayElement(): ArrayElementContext {
		let localctx: ArrayElementContext = new ArrayElementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, JexLangParser.RULE_arrayElement);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 187;
			this.singleExpression(0);
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
	public objectLiteral(): ObjectLiteralContext {
		let localctx: ObjectLiteralContext = new ObjectLiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, JexLangParser.RULE_objectLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 189;
			this.match(JexLangParser.LBRACE);
			this.state = 198;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 268435476) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 7) !== 0)) {
				{
				this.state = 190;
				this.objectProperty();
				this.state = 195;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===31) {
					{
					{
					this.state = 191;
					this.match(JexLangParser.COMMA);
					this.state = 192;
					this.objectProperty();
					}
					}
					this.state = 197;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 200;
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
		this.enterRule(localctx, 24, JexLangParser.RULE_objectProperty);
		try {
			this.state = 213;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				localctx = new PropertyExpressionObjectPropertyContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 202;
				this.objectPropertyName();
				this.state = 203;
				this.match(JexLangParser.COLON);
				this.state = 204;
				this.singleExpression(0);
				}
				break;
			case 2:
				localctx = new ComputedPropertyExpressionObjectPropertyContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 206;
				this.match(JexLangParser.LBRACKET);
				this.state = 207;
				this.singleExpression(0);
				this.state = 208;
				this.match(JexLangParser.RBRACKET);
				this.state = 209;
				this.match(JexLangParser.COLON);
				this.state = 210;
				this.singleExpression(0);
				}
				break;
			case 3:
				localctx = new ShorthandPropertyExpressionObjectPropertyContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 212;
				this.match(JexLangParser.IDENTIFIER);
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
	public objectPropertyName(): ObjectPropertyNameContext {
		let localctx: ObjectPropertyNameContext = new ObjectPropertyNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, JexLangParser.RULE_objectPropertyName);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 215;
			_la = this._input.LA(1);
			if(!(_la===2 || _la===4 || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 7) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
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
	public arguments(): ArgumentsContext {
		let localctx: ArgumentsContext = new ArgumentsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, JexLangParser.RULE_arguments);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 217;
			this.match(JexLangParser.LPAREN);
			this.state = 229;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 352518522) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 7) !== 0)) {
				{
				this.state = 218;
				this.argument();
				this.state = 223;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 18, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 219;
						this.match(JexLangParser.COMMA);
						this.state = 220;
						this.argument();
						}
						}
					}
					this.state = 225;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 18, this._ctx);
				}
				this.state = 227;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===31) {
					{
					this.state = 226;
					this.match(JexLangParser.COMMA);
					}
				}

				}
			}

			this.state = 231;
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
	public argument(): ArgumentContext {
		let localctx: ArgumentContext = new ArgumentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, JexLangParser.RULE_argument);
		try {
			this.state = 235;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 21, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 233;
				this.singleExpression(0);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 234;
				this.match(JexLangParser.IDENTIFIER);
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

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 7:
			return this.singleExpression_sempred(localctx as SingleExpressionContext, predIndex);
		}
		return true;
	}
	private singleExpression_sempred(localctx: SingleExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 16);
		case 1:
			return this.precpred(this._ctx, 15);
		case 2:
			return this.precpred(this._ctx, 14);
		case 3:
			return this.precpred(this._ctx, 13);
		case 4:
			return this.precpred(this._ctx, 12);
		case 5:
			return this.precpred(this._ctx, 11);
		case 6:
			return this.precpred(this._ctx, 10);
		case 7:
			return this.precpred(this._ctx, 8);
		case 8:
			return this.precpred(this._ctx, 7);
		case 9:
			return this.precpred(this._ctx, 5);
		case 10:
			return this.precpred(this._ctx, 4);
		case 11:
			return this.precpred(this._ctx, 23);
		case 12:
			return this.precpred(this._ctx, 22);
		case 13:
			return this.precpred(this._ctx, 20);
		case 14:
			return this.precpred(this._ctx, 9);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,41,238,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,1,0,5,0,34,8,
	0,10,0,12,0,37,9,0,1,0,1,0,1,1,1,1,1,1,1,1,3,1,45,8,1,1,2,1,2,5,2,49,8,
	2,10,2,12,2,52,9,2,1,2,1,2,1,3,1,3,1,4,1,4,1,4,1,4,3,4,62,8,4,1,4,3,4,65,
	8,4,1,5,1,5,3,5,69,8,5,1,6,1,6,1,6,5,6,74,8,6,10,6,12,6,77,9,6,1,7,1,7,
	1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,3,7,97,
	8,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,
	1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,
	1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,3,7,145,8,7,1,7,1,7,1,7,1,7,
	1,7,1,7,3,7,153,8,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,5,7,162,8,7,10,7,12,7,165,
	9,7,1,8,1,8,1,8,1,8,1,8,1,8,3,8,173,8,8,1,9,1,9,1,9,1,9,5,9,179,8,9,10,
	9,12,9,182,9,9,3,9,184,8,9,1,9,1,9,1,10,1,10,1,11,1,11,1,11,1,11,5,11,194,
	8,11,10,11,12,11,197,9,11,3,11,199,8,11,1,11,1,11,1,12,1,12,1,12,1,12,1,
	12,1,12,1,12,1,12,1,12,1,12,1,12,3,12,214,8,12,1,13,1,13,1,14,1,14,1,14,
	1,14,5,14,222,8,14,10,14,12,14,225,9,14,1,14,3,14,228,8,14,3,14,230,8,14,
	1,14,1,14,1,15,1,15,3,15,236,8,15,1,15,0,1,14,16,0,2,4,6,8,10,12,14,16,
	18,20,22,24,26,28,30,0,8,1,0,5,6,2,0,1,1,8,8,1,0,16,17,2,0,7,7,21,21,1,
	0,18,20,2,0,11,12,22,23,1,0,9,10,3,0,2,2,4,4,36,38,269,0,35,1,0,0,0,2,44,
	1,0,0,0,4,46,1,0,0,0,6,55,1,0,0,0,8,57,1,0,0,0,10,66,1,0,0,0,12,70,1,0,
	0,0,14,96,1,0,0,0,16,172,1,0,0,0,18,174,1,0,0,0,20,187,1,0,0,0,22,189,1,
	0,0,0,24,213,1,0,0,0,26,215,1,0,0,0,28,217,1,0,0,0,30,235,1,0,0,0,32,34,
	3,2,1,0,33,32,1,0,0,0,34,37,1,0,0,0,35,33,1,0,0,0,35,36,1,0,0,0,36,38,1,
	0,0,0,37,35,1,0,0,0,38,39,5,0,0,1,39,1,1,0,0,0,40,45,3,10,5,0,41,45,3,8,
	4,0,42,45,3,4,2,0,43,45,3,6,3,0,44,40,1,0,0,0,44,41,1,0,0,0,44,42,1,0,0,
	0,44,43,1,0,0,0,45,3,1,0,0,0,46,50,5,26,0,0,47,49,3,2,1,0,48,47,1,0,0,0,
	49,52,1,0,0,0,50,48,1,0,0,0,50,51,1,0,0,0,51,53,1,0,0,0,52,50,1,0,0,0,53,
	54,5,27,0,0,54,5,1,0,0,0,55,56,5,30,0,0,56,7,1,0,0,0,57,58,5,2,0,0,58,61,
	5,37,0,0,59,60,5,15,0,0,60,62,3,14,7,0,61,59,1,0,0,0,61,62,1,0,0,0,62,64,
	1,0,0,0,63,65,5,30,0,0,64,63,1,0,0,0,64,65,1,0,0,0,65,9,1,0,0,0,66,68,3,
	12,6,0,67,69,5,30,0,0,68,67,1,0,0,0,68,69,1,0,0,0,69,11,1,0,0,0,70,75,3,
	14,7,0,71,72,5,31,0,0,72,74,3,14,7,0,73,71,1,0,0,0,74,77,1,0,0,0,75,73,
	1,0,0,0,75,76,1,0,0,0,76,13,1,0,0,0,77,75,1,0,0,0,78,79,6,7,-1,0,79,80,
	5,37,0,0,80,97,3,28,14,0,81,82,7,0,0,0,82,97,3,14,7,19,83,84,7,1,0,0,84,
	97,3,14,7,18,85,86,7,2,0,0,86,97,3,14,7,17,87,88,5,37,0,0,88,89,5,15,0,
	0,89,97,3,14,7,6,90,91,5,24,0,0,91,92,3,12,6,0,92,93,5,25,0,0,93,97,1,0,
	0,0,94,97,3,16,8,0,95,97,5,37,0,0,96,78,1,0,0,0,96,81,1,0,0,0,96,83,1,0,
	0,0,96,85,1,0,0,0,96,87,1,0,0,0,96,90,1,0,0,0,96,94,1,0,0,0,96,95,1,0,0,
	0,97,163,1,0,0,0,98,99,10,16,0,0,99,100,7,3,0,0,100,162,3,14,7,16,101,102,
	10,15,0,0,102,103,7,4,0,0,103,162,3,14,7,16,104,105,10,14,0,0,105,106,7,
	2,0,0,106,162,3,14,7,15,107,108,10,13,0,0,108,109,7,5,0,0,109,162,3,14,
	7,14,110,111,10,12,0,0,111,112,7,6,0,0,112,162,3,14,7,13,113,114,10,11,
	0,0,114,115,5,13,0,0,115,162,3,14,7,12,116,117,10,10,0,0,117,118,5,14,0,
	0,118,162,3,14,7,11,119,120,10,8,0,0,120,121,5,34,0,0,121,122,3,14,7,0,
	122,123,5,35,0,0,123,124,3,14,7,8,124,162,1,0,0,0,125,126,10,7,0,0,126,
	127,5,34,0,0,127,128,5,35,0,0,128,162,3,14,7,8,129,130,10,5,0,0,130,131,
	5,28,0,0,131,132,3,12,6,0,132,133,5,29,0,0,133,134,5,15,0,0,134,135,3,14,
	7,5,135,162,1,0,0,0,136,137,10,4,0,0,137,138,5,32,0,0,138,139,3,26,13,0,
	139,140,5,15,0,0,140,141,3,14,7,4,141,162,1,0,0,0,142,144,10,23,0,0,143,
	145,5,34,0,0,144,143,1,0,0,0,144,145,1,0,0,0,145,146,1,0,0,0,146,147,5,
	28,0,0,147,148,3,12,6,0,148,149,5,29,0,0,149,162,1,0,0,0,150,152,10,22,
	0,0,151,153,5,34,0,0,152,151,1,0,0,0,152,153,1,0,0,0,153,154,1,0,0,0,154,
	155,5,32,0,0,155,162,3,26,13,0,156,157,10,20,0,0,157,162,7,0,0,0,158,159,
	10,9,0,0,159,160,5,33,0,0,160,162,5,37,0,0,161,98,1,0,0,0,161,101,1,0,0,
	0,161,104,1,0,0,0,161,107,1,0,0,0,161,110,1,0,0,0,161,113,1,0,0,0,161,116,
	1,0,0,0,161,119,1,0,0,0,161,125,1,0,0,0,161,129,1,0,0,0,161,136,1,0,0,0,
	161,142,1,0,0,0,161,150,1,0,0,0,161,156,1,0,0,0,161,158,1,0,0,0,162,165,
	1,0,0,0,163,161,1,0,0,0,163,164,1,0,0,0,164,15,1,0,0,0,165,163,1,0,0,0,
	166,173,5,38,0,0,167,173,5,36,0,0,168,173,5,3,0,0,169,173,5,4,0,0,170,173,
	3,18,9,0,171,173,3,22,11,0,172,166,1,0,0,0,172,167,1,0,0,0,172,168,1,0,
	0,0,172,169,1,0,0,0,172,170,1,0,0,0,172,171,1,0,0,0,173,17,1,0,0,0,174,
	183,5,28,0,0,175,180,3,20,10,0,176,177,5,31,0,0,177,179,3,20,10,0,178,176,
	1,0,0,0,179,182,1,0,0,0,180,178,1,0,0,0,180,181,1,0,0,0,181,184,1,0,0,0,
	182,180,1,0,0,0,183,175,1,0,0,0,183,184,1,0,0,0,184,185,1,0,0,0,185,186,
	5,29,0,0,186,19,1,0,0,0,187,188,3,14,7,0,188,21,1,0,0,0,189,198,5,26,0,
	0,190,195,3,24,12,0,191,192,5,31,0,0,192,194,3,24,12,0,193,191,1,0,0,0,
	194,197,1,0,0,0,195,193,1,0,0,0,195,196,1,0,0,0,196,199,1,0,0,0,197,195,
	1,0,0,0,198,190,1,0,0,0,198,199,1,0,0,0,199,200,1,0,0,0,200,201,5,27,0,
	0,201,23,1,0,0,0,202,203,3,26,13,0,203,204,5,35,0,0,204,205,3,14,7,0,205,
	214,1,0,0,0,206,207,5,28,0,0,207,208,3,14,7,0,208,209,5,29,0,0,209,210,
	5,35,0,0,210,211,3,14,7,0,211,214,1,0,0,0,212,214,5,37,0,0,213,202,1,0,
	0,0,213,206,1,0,0,0,213,212,1,0,0,0,214,25,1,0,0,0,215,216,7,7,0,0,216,
	27,1,0,0,0,217,229,5,24,0,0,218,223,3,30,15,0,219,220,5,31,0,0,220,222,
	3,30,15,0,221,219,1,0,0,0,222,225,1,0,0,0,223,221,1,0,0,0,223,224,1,0,0,
	0,224,227,1,0,0,0,225,223,1,0,0,0,226,228,5,31,0,0,227,226,1,0,0,0,227,
	228,1,0,0,0,228,230,1,0,0,0,229,218,1,0,0,0,229,230,1,0,0,0,230,231,1,0,
	0,0,231,232,5,25,0,0,232,29,1,0,0,0,233,236,3,14,7,0,234,236,5,37,0,0,235,
	233,1,0,0,0,235,234,1,0,0,0,236,31,1,0,0,0,22,35,44,50,61,64,68,75,96,144,
	152,161,163,172,180,183,195,198,213,223,227,229,235];

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
	public expressionStatement(): ExpressionStatementContext {
		return this.getTypedRuleContext(ExpressionStatementContext, 0) as ExpressionStatementContext;
	}
	public varDeclaration(): VarDeclarationContext {
		return this.getTypedRuleContext(VarDeclarationContext, 0) as VarDeclarationContext;
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
	public emptyStatement(): EmptyStatementContext {
		return this.getTypedRuleContext(EmptyStatementContext, 0) as EmptyStatementContext;
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


export class BlockContext extends ParserRuleContext {
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
	public statement_list(): StatementContext[] {
		return this.getTypedRuleContexts(StatementContext) as StatementContext[];
	}
	public statement(i: number): StatementContext {
		return this.getTypedRuleContext(StatementContext, i) as StatementContext;
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_block;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterBlock) {
	 		listener.enterBlock(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitBlock) {
	 		listener.exitBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitBlock) {
			return visitor.visitBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EmptyStatementContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SEMICOLON(): TerminalNode {
		return this.getToken(JexLangParser.SEMICOLON, 0);
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_emptyStatement;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterEmptyStatement) {
	 		listener.enterEmptyStatement(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitEmptyStatement) {
	 		listener.exitEmptyStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitEmptyStatement) {
			return visitor.visitEmptyStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarDeclarationContext extends ParserRuleContext {
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
	public singleExpression(): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, 0) as SingleExpressionContext;
	}
	public SEMICOLON(): TerminalNode {
		return this.getToken(JexLangParser.SEMICOLON, 0);
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_varDeclaration;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterVarDeclaration) {
	 		listener.enterVarDeclaration(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitVarDeclaration) {
	 		listener.exitVarDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitVarDeclaration) {
			return visitor.visitVarDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionStatementContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expressionSequence(): ExpressionSequenceContext {
		return this.getTypedRuleContext(ExpressionSequenceContext, 0) as ExpressionSequenceContext;
	}
	public SEMICOLON(): TerminalNode {
		return this.getToken(JexLangParser.SEMICOLON, 0);
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_expressionStatement;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterExpressionStatement) {
	 		listener.enterExpressionStatement(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitExpressionStatement) {
	 		listener.exitExpressionStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitExpressionStatement) {
			return visitor.visitExpressionStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionSequenceContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public singleExpression_list(): SingleExpressionContext[] {
		return this.getTypedRuleContexts(SingleExpressionContext) as SingleExpressionContext[];
	}
	public singleExpression(i: number): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, i) as SingleExpressionContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(JexLangParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(JexLangParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_expressionSequence;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterExpressionSequence) {
	 		listener.enterExpressionSequence(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitExpressionSequence) {
	 		listener.exitExpressionSequence(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitExpressionSequence) {
			return visitor.visitExpressionSequence(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SingleExpressionContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_singleExpression;
	}
	public override copyFrom(ctx: SingleExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class ParenthesizedExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(JexLangParser.LPAREN, 0);
	}
	public expressionSequence(): ExpressionSequenceContext {
		return this.getTypedRuleContext(ExpressionSequenceContext, 0) as ExpressionSequenceContext;
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
export class ShortTernaryExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression_list(): SingleExpressionContext[] {
		return this.getTypedRuleContexts(SingleExpressionContext) as SingleExpressionContext[];
	}
	public singleExpression(i: number): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, i) as SingleExpressionContext;
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
export class AdditiveExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression_list(): SingleExpressionContext[] {
		return this.getTypedRuleContexts(SingleExpressionContext) as SingleExpressionContext[];
	}
	public singleExpression(i: number): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, i) as SingleExpressionContext;
	}
	public PLUS(): TerminalNode {
		return this.getToken(JexLangParser.PLUS, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(JexLangParser.MINUS, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterAdditiveExpression) {
	 		listener.enterAdditiveExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitAdditiveExpression) {
	 		listener.exitAdditiveExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitAdditiveExpression) {
			return visitor.visitAdditiveExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RelationalExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression_list(): SingleExpressionContext[] {
		return this.getTypedRuleContexts(SingleExpressionContext) as SingleExpressionContext[];
	}
	public singleExpression(i: number): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, i) as SingleExpressionContext;
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
	    if(listener.enterRelationalExpression) {
	 		listener.enterRelationalExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitRelationalExpression) {
	 		listener.exitRelationalExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitRelationalExpression) {
			return visitor.visitRelationalExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TernaryExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression_list(): SingleExpressionContext[] {
		return this.getTypedRuleContexts(SingleExpressionContext) as SingleExpressionContext[];
	}
	public singleExpression(i: number): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, i) as SingleExpressionContext;
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
export class BracketPropertyAssignmentContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression_list(): SingleExpressionContext[] {
		return this.getTypedRuleContexts(SingleExpressionContext) as SingleExpressionContext[];
	}
	public singleExpression(i: number): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, i) as SingleExpressionContext;
	}
	public LBRACKET(): TerminalNode {
		return this.getToken(JexLangParser.LBRACKET, 0);
	}
	public expressionSequence(): ExpressionSequenceContext {
		return this.getTypedRuleContext(ExpressionSequenceContext, 0) as ExpressionSequenceContext;
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
export class LogicalAndExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression_list(): SingleExpressionContext[] {
		return this.getTypedRuleContexts(SingleExpressionContext) as SingleExpressionContext[];
	}
	public singleExpression(i: number): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, i) as SingleExpressionContext;
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
export class PowerExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression_list(): SingleExpressionContext[] {
		return this.getTypedRuleContexts(SingleExpressionContext) as SingleExpressionContext[];
	}
	public singleExpression(i: number): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, i) as SingleExpressionContext;
	}
	public POW(): TerminalNode {
		return this.getToken(JexLangParser.POW, 0);
	}
	public POWER(): TerminalNode {
		return this.getToken(JexLangParser.POWER, 0);
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
export class DotPropertyAssignmentContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression_list(): SingleExpressionContext[] {
		return this.getTypedRuleContexts(SingleExpressionContext) as SingleExpressionContext[];
	}
	public singleExpression(i: number): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, i) as SingleExpressionContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(JexLangParser.DOT, 0);
	}
	public objectPropertyName(): ObjectPropertyNameContext {
		return this.getTypedRuleContext(ObjectPropertyNameContext, 0) as ObjectPropertyNameContext;
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
export class LiteralExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public literal(): LiteralContext {
		return this.getTypedRuleContext(LiteralContext, 0) as LiteralContext;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterLiteralExpression) {
	 		listener.enterLiteralExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitLiteralExpression) {
	 		listener.exitLiteralExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitLiteralExpression) {
			return visitor.visitLiteralExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LogicalOrExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression_list(): SingleExpressionContext[] {
		return this.getTypedRuleContexts(SingleExpressionContext) as SingleExpressionContext[];
	}
	public singleExpression(i: number): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, i) as SingleExpressionContext;
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
export class MemberDotExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression(): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, 0) as SingleExpressionContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(JexLangParser.DOT, 0);
	}
	public objectPropertyName(): ObjectPropertyNameContext {
		return this.getTypedRuleContext(ObjectPropertyNameContext, 0) as ObjectPropertyNameContext;
	}
	public QUESTION(): TerminalNode {
		return this.getToken(JexLangParser.QUESTION, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterMemberDotExpression) {
	 		listener.enterMemberDotExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitMemberDotExpression) {
	 		listener.exitMemberDotExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitMemberDotExpression) {
			return visitor.visitMemberDotExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnaryExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression(): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, 0) as SingleExpressionContext;
	}
	public PLUS(): TerminalNode {
		return this.getToken(JexLangParser.PLUS, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(JexLangParser.MINUS, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterUnaryExpression) {
	 		listener.enterUnaryExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitUnaryExpression) {
	 		listener.exitUnaryExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitUnaryExpression) {
			return visitor.visitUnaryExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MemberIndexExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression(): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, 0) as SingleExpressionContext;
	}
	public LBRACKET(): TerminalNode {
		return this.getToken(JexLangParser.LBRACKET, 0);
	}
	public expressionSequence(): ExpressionSequenceContext {
		return this.getTypedRuleContext(ExpressionSequenceContext, 0) as ExpressionSequenceContext;
	}
	public RBRACKET(): TerminalNode {
		return this.getToken(JexLangParser.RBRACKET, 0);
	}
	public QUESTION(): TerminalNode {
		return this.getToken(JexLangParser.QUESTION, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterMemberIndexExpression) {
	 		listener.enterMemberIndexExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitMemberIndexExpression) {
	 		listener.exitMemberIndexExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitMemberIndexExpression) {
			return visitor.visitMemberIndexExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FunctionCallExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(JexLangParser.IDENTIFIER, 0);
	}
	public arguments(): ArgumentsContext {
		return this.getTypedRuleContext(ArgumentsContext, 0) as ArgumentsContext;
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
export class IdentifierExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(JexLangParser.IDENTIFIER, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterIdentifierExpression) {
	 		listener.enterIdentifierExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitIdentifierExpression) {
	 		listener.exitIdentifierExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitIdentifierExpression) {
			return visitor.visitIdentifierExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AssignmentExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(JexLangParser.IDENTIFIER, 0);
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(JexLangParser.ASSIGN, 0);
	}
	public singleExpression(): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, 0) as SingleExpressionContext;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterAssignmentExpression) {
	 		listener.enterAssignmentExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitAssignmentExpression) {
	 		listener.exitAssignmentExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitAssignmentExpression) {
			return visitor.visitAssignmentExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TransformExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression(): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, 0) as SingleExpressionContext;
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
export class PrefixExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression(): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, 0) as SingleExpressionContext;
	}
	public INCREMENT(): TerminalNode {
		return this.getToken(JexLangParser.INCREMENT, 0);
	}
	public DECREMENT(): TerminalNode {
		return this.getToken(JexLangParser.DECREMENT, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterPrefixExpression) {
	 		listener.enterPrefixExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitPrefixExpression) {
	 		listener.exitPrefixExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitPrefixExpression) {
			return visitor.visitPrefixExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PostfixExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression(): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, 0) as SingleExpressionContext;
	}
	public INCREMENT(): TerminalNode {
		return this.getToken(JexLangParser.INCREMENT, 0);
	}
	public DECREMENT(): TerminalNode {
		return this.getToken(JexLangParser.DECREMENT, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterPostfixExpression) {
	 		listener.enterPostfixExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitPostfixExpression) {
	 		listener.exitPostfixExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitPostfixExpression) {
			return visitor.visitPostfixExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SquareRootExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression(): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, 0) as SingleExpressionContext;
	}
	public SQRT(): TerminalNode {
		return this.getToken(JexLangParser.SQRT, 0);
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
export class EqualityExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression_list(): SingleExpressionContext[] {
		return this.getTypedRuleContexts(SingleExpressionContext) as SingleExpressionContext[];
	}
	public singleExpression(i: number): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, i) as SingleExpressionContext;
	}
	public EQ(): TerminalNode {
		return this.getToken(JexLangParser.EQ, 0);
	}
	public NEQ(): TerminalNode {
		return this.getToken(JexLangParser.NEQ, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterEqualityExpression) {
	 		listener.enterEqualityExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitEqualityExpression) {
	 		listener.exitEqualityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitEqualityExpression) {
			return visitor.visitEqualityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MultiplicativeExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public singleExpression_list(): SingleExpressionContext[] {
		return this.getTypedRuleContexts(SingleExpressionContext) as SingleExpressionContext[];
	}
	public singleExpression(i: number): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, i) as SingleExpressionContext;
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
	    if(listener.enterMultiplicativeExpression) {
	 		listener.enterMultiplicativeExpression(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitMultiplicativeExpression) {
	 		listener.exitMultiplicativeExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitMultiplicativeExpression) {
			return visitor.visitMultiplicativeExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_literal;
	}
	public override copyFrom(ctx: LiteralContext): void {
		super.copyFrom(ctx);
	}
}
export class StringLiteralContext extends LiteralContext {
	constructor(parser: JexLangParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING(): TerminalNode {
		return this.getToken(JexLangParser.STRING, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterStringLiteral) {
	 		listener.enterStringLiteral(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitStringLiteral) {
	 		listener.exitStringLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitStringLiteral) {
			return visitor.visitStringLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ObjectLiteralExpressionContext extends LiteralContext {
	constructor(parser: JexLangParser, ctx: LiteralContext) {
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
export class BooleanLiteralContext extends LiteralContext {
	constructor(parser: JexLangParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public BOOLEAN(): TerminalNode {
		return this.getToken(JexLangParser.BOOLEAN, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterBooleanLiteral) {
	 		listener.enterBooleanLiteral(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitBooleanLiteral) {
	 		listener.exitBooleanLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitBooleanLiteral) {
			return visitor.visitBooleanLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ArrayLiteralExpressionContext extends LiteralContext {
	constructor(parser: JexLangParser, ctx: LiteralContext) {
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
export class NullLiteralContext extends LiteralContext {
	constructor(parser: JexLangParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public NULL(): TerminalNode {
		return this.getToken(JexLangParser.NULL, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterNullLiteral) {
	 		listener.enterNullLiteral(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitNullLiteral) {
	 		listener.exitNullLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitNullLiteral) {
			return visitor.visitNullLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberLiteralContext extends LiteralContext {
	constructor(parser: JexLangParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public NUMBER(): TerminalNode {
		return this.getToken(JexLangParser.NUMBER, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterNumberLiteral) {
	 		listener.enterNumberLiteral(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitNumberLiteral) {
	 		listener.exitNumberLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitNumberLiteral) {
			return visitor.visitNumberLiteral(this);
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
	public arrayElement_list(): ArrayElementContext[] {
		return this.getTypedRuleContexts(ArrayElementContext) as ArrayElementContext[];
	}
	public arrayElement(i: number): ArrayElementContext {
		return this.getTypedRuleContext(ArrayElementContext, i) as ArrayElementContext;
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


export class ArrayElementContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public singleExpression(): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, 0) as SingleExpressionContext;
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_arrayElement;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterArrayElement) {
	 		listener.enterArrayElement(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitArrayElement) {
	 		listener.exitArrayElement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitArrayElement) {
			return visitor.visitArrayElement(this);
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
    public get ruleIndex(): number {
    	return JexLangParser.RULE_objectProperty;
	}
	public override copyFrom(ctx: ObjectPropertyContext): void {
		super.copyFrom(ctx);
	}
}
export class ShorthandPropertyExpressionObjectPropertyContext extends ObjectPropertyContext {
	constructor(parser: JexLangParser, ctx: ObjectPropertyContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(JexLangParser.IDENTIFIER, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterShorthandPropertyExpressionObjectProperty) {
	 		listener.enterShorthandPropertyExpressionObjectProperty(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitShorthandPropertyExpressionObjectProperty) {
	 		listener.exitShorthandPropertyExpressionObjectProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitShorthandPropertyExpressionObjectProperty) {
			return visitor.visitShorthandPropertyExpressionObjectProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PropertyExpressionObjectPropertyContext extends ObjectPropertyContext {
	constructor(parser: JexLangParser, ctx: ObjectPropertyContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public objectPropertyName(): ObjectPropertyNameContext {
		return this.getTypedRuleContext(ObjectPropertyNameContext, 0) as ObjectPropertyNameContext;
	}
	public COLON(): TerminalNode {
		return this.getToken(JexLangParser.COLON, 0);
	}
	public singleExpression(): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, 0) as SingleExpressionContext;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterPropertyExpressionObjectProperty) {
	 		listener.enterPropertyExpressionObjectProperty(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitPropertyExpressionObjectProperty) {
	 		listener.exitPropertyExpressionObjectProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitPropertyExpressionObjectProperty) {
			return visitor.visitPropertyExpressionObjectProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ComputedPropertyExpressionObjectPropertyContext extends ObjectPropertyContext {
	constructor(parser: JexLangParser, ctx: ObjectPropertyContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LBRACKET(): TerminalNode {
		return this.getToken(JexLangParser.LBRACKET, 0);
	}
	public singleExpression_list(): SingleExpressionContext[] {
		return this.getTypedRuleContexts(SingleExpressionContext) as SingleExpressionContext[];
	}
	public singleExpression(i: number): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, i) as SingleExpressionContext;
	}
	public RBRACKET(): TerminalNode {
		return this.getToken(JexLangParser.RBRACKET, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(JexLangParser.COLON, 0);
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterComputedPropertyExpressionObjectProperty) {
	 		listener.enterComputedPropertyExpressionObjectProperty(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitComputedPropertyExpressionObjectProperty) {
	 		listener.exitComputedPropertyExpressionObjectProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitComputedPropertyExpressionObjectProperty) {
			return visitor.visitComputedPropertyExpressionObjectProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ObjectPropertyNameContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(JexLangParser.IDENTIFIER, 0);
	}
	public STRING(): TerminalNode {
		return this.getToken(JexLangParser.STRING, 0);
	}
	public LET(): TerminalNode {
		return this.getToken(JexLangParser.LET, 0);
	}
	public NUMBER(): TerminalNode {
		return this.getToken(JexLangParser.NUMBER, 0);
	}
	public NULL(): TerminalNode {
		return this.getToken(JexLangParser.NULL, 0);
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_objectPropertyName;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterObjectPropertyName) {
	 		listener.enterObjectPropertyName(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitObjectPropertyName) {
	 		listener.exitObjectPropertyName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitObjectPropertyName) {
			return visitor.visitObjectPropertyName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgumentsContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LPAREN(): TerminalNode {
		return this.getToken(JexLangParser.LPAREN, 0);
	}
	public RPAREN(): TerminalNode {
		return this.getToken(JexLangParser.RPAREN, 0);
	}
	public argument_list(): ArgumentContext[] {
		return this.getTypedRuleContexts(ArgumentContext) as ArgumentContext[];
	}
	public argument(i: number): ArgumentContext {
		return this.getTypedRuleContext(ArgumentContext, i) as ArgumentContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(JexLangParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(JexLangParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_arguments;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterArguments) {
	 		listener.enterArguments(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitArguments) {
	 		listener.exitArguments(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitArguments) {
			return visitor.visitArguments(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgumentContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public singleExpression(): SingleExpressionContext {
		return this.getTypedRuleContext(SingleExpressionContext, 0) as SingleExpressionContext;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(JexLangParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_argument;
	}
	public enterRule(listener: JexLangListener): void {
	    if(listener.enterArgument) {
	 		listener.enterArgument(this);
		}
	}
	public exitRule(listener: JexLangListener): void {
	    if(listener.exitArgument) {
	 		listener.exitArgument(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitArgument) {
			return visitor.visitArgument(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

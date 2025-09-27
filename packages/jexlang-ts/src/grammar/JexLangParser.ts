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
	public static readonly T__0 = 1;
	public static readonly LET = 2;
	public static readonly CONST = 3;
	public static readonly GLOBAL = 4;
	public static readonly BOOLEAN = 5;
	public static readonly NULL = 6;
	public static readonly REPEAT = 7;
	public static readonly IF = 8;
	public static readonly ELSE = 9;
	public static readonly INCREMENT = 10;
	public static readonly DECREMENT = 11;
	public static readonly POW = 12;
	public static readonly SQRT = 13;
	public static readonly EQ = 14;
	public static readonly NEQ = 15;
	public static readonly LTE = 16;
	public static readonly GTE = 17;
	public static readonly AND = 18;
	public static readonly OR = 19;
	public static readonly ASSIGN = 20;
	public static readonly PLUS = 21;
	public static readonly MINUS = 22;
	public static readonly MULTIPLY = 23;
	public static readonly DIVIDE = 24;
	public static readonly MODULO = 25;
	public static readonly POWER = 26;
	public static readonly LT = 27;
	public static readonly GT = 28;
	public static readonly LPAREN = 29;
	public static readonly RPAREN = 30;
	public static readonly LBRACE = 31;
	public static readonly RBRACE = 32;
	public static readonly LBRACKET = 33;
	public static readonly RBRACKET = 34;
	public static readonly SEMICOLON = 35;
	public static readonly COMMA = 36;
	public static readonly DOT = 37;
	public static readonly PIPE = 38;
	public static readonly QUESTION = 39;
	public static readonly COLON = 40;
	public static readonly NUMBER = 41;
	public static readonly IDENTIFIER = 42;
	public static readonly STRING = 43;
	public static readonly WS = 44;
	public static readonly LINE_COMMENT = 45;
	public static readonly BLOCK_COMMENT = 46;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_program = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_block = 2;
	public static readonly RULE_emptyStatement = 3;
	public static readonly RULE_varDeclaration = 4;
	public static readonly RULE_expressionStatement = 5;
	public static readonly RULE_expressionSequence = 6;
	public static readonly RULE_singleExpression = 7;
	public static readonly RULE_elseIfStatement = 8;
	public static readonly RULE_literal = 9;
	public static readonly RULE_arrayLiteral = 10;
	public static readonly RULE_arrayElement = 11;
	public static readonly RULE_objectLiteral = 12;
	public static readonly RULE_objectProperty = 13;
	public static readonly RULE_objectPropertyName = 14;
	public static readonly RULE_arguments = 15;
	public static readonly RULE_argument = 16;
	public static readonly literalNames: (string | null)[] = [ null, "'sqrt'", 
                                                            "'let'", "'const'", 
                                                            "'global'", 
                                                            null, "'null'", 
                                                            "'repeat'", 
                                                            "'if'", "'else'", 
                                                            "'++'", "'--'", 
                                                            "'**'", "'\\u221A'", 
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
                                                             "LET", "CONST", 
                                                             "GLOBAL", "BOOLEAN", 
                                                             "NULL", "REPEAT", 
                                                             "IF", "ELSE", 
                                                             "INCREMENT", 
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
		"expressionSequence", "singleExpression", "elseIfStatement", "literal", 
		"arrayLiteral", "arrayElement", "objectLiteral", "objectProperty", "objectPropertyName", 
		"arguments", "argument",
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
			this.state = 37;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2690657790) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1797) !== 0)) {
				{
				{
				this.state = 34;
				this.statement();
				}
				}
				this.state = 39;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 40;
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
			this.state = 46;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 42;
				this.expressionStatement();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 43;
				this.varDeclaration();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 44;
				this.block();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 45;
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
			this.state = 48;
			this.match(JexLangParser.LBRACE);
			this.state = 52;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2690657790) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1797) !== 0)) {
				{
				{
				this.state = 49;
				this.statement();
				}
				}
				this.state = 54;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 55;
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
			this.state = 57;
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
			this.state = 60;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===4) {
				{
				this.state = 59;
				this.match(JexLangParser.GLOBAL);
				}
			}

			this.state = 62;
			_la = this._input.LA(1);
			if(!(_la===2 || _la===3)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 63;
			this.match(JexLangParser.IDENTIFIER);
			this.state = 66;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===20) {
				{
				this.state = 64;
				this.match(JexLangParser.ASSIGN);
				this.state = 65;
				this.singleExpression(0);
				}
			}

			this.state = 69;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 5, this._ctx) ) {
			case 1:
				{
				this.state = 68;
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
			this.state = 71;
			this.expressionSequence();
			this.state = 73;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				{
				this.state = 72;
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
			this.state = 75;
			this.singleExpression(0);
			this.state = 80;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===36) {
				{
				{
				this.state = 76;
				this.match(JexLangParser.COMMA);
				this.state = 77;
				this.singleExpression(0);
				}
				}
				this.state = 82;
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
			this.state = 115;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				localctx = new FunctionCallExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 84;
				this.match(JexLangParser.IDENTIFIER);
				this.state = 85;
				this.arguments();
				}
				break;
			case 2:
				{
				localctx = new PrefixExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 86;
				_la = this._input.LA(1);
				if(!(_la===10 || _la===11)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 87;
				this.singleExpression(21);
				}
				break;
			case 3:
				{
				localctx = new SquareRootExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 88;
				_la = this._input.LA(1);
				if(!(_la===1 || _la===13)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 89;
				this.singleExpression(20);
				}
				break;
			case 4:
				{
				localctx = new UnaryExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 90;
				_la = this._input.LA(1);
				if(!(_la===21 || _la===22)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 91;
				this.singleExpression(19);
				}
				break;
			case 5:
				{
				localctx = new AssignmentExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 92;
				this.match(JexLangParser.IDENTIFIER);
				this.state = 93;
				this.match(JexLangParser.ASSIGN);
				this.state = 94;
				this.singleExpression(8);
				}
				break;
			case 6:
				{
				localctx = new IfExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 95;
				this.match(JexLangParser.IF);
				this.state = 96;
				this.match(JexLangParser.LPAREN);
				this.state = 97;
				this.expressionSequence();
				this.state = 98;
				this.match(JexLangParser.RPAREN);
				this.state = 99;
				this.block();
				this.state = 101;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 8, this._ctx) ) {
				case 1:
					{
					this.state = 100;
					this.elseIfStatement();
					}
					break;
				}
				}
				break;
			case 7:
				{
				localctx = new RepeatExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 103;
				this.match(JexLangParser.REPEAT);
				this.state = 104;
				this.match(JexLangParser.LPAREN);
				this.state = 105;
				this.expressionSequence();
				this.state = 106;
				this.match(JexLangParser.RPAREN);
				this.state = 107;
				this.block();
				}
				break;
			case 8:
				{
				localctx = new ParenthesizedExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 109;
				this.match(JexLangParser.LPAREN);
				this.state = 110;
				this.expressionSequence();
				this.state = 111;
				this.match(JexLangParser.RPAREN);
				}
				break;
			case 9:
				{
				localctx = new LiteralExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 113;
				this.literal();
				}
				break;
			case 10:
				{
				localctx = new IdentifierExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 114;
				this.match(JexLangParser.IDENTIFIER);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 182;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 13, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 180;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 12, this._ctx) ) {
					case 1:
						{
						localctx = new PowerExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 117;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 118;
						_la = this._input.LA(1);
						if(!(_la===12 || _la===26)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 119;
						this.singleExpression(18);
						}
						break;
					case 2:
						{
						localctx = new MultiplicativeExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 120;
						if (!(this.precpred(this._ctx, 17))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 17)");
						}
						this.state = 121;
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 58720256) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 122;
						this.singleExpression(18);
						}
						break;
					case 3:
						{
						localctx = new AdditiveExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 123;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 124;
						_la = this._input.LA(1);
						if(!(_la===21 || _la===22)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 125;
						this.singleExpression(17);
						}
						break;
					case 4:
						{
						localctx = new RelationalExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 126;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 127;
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 402849792) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 128;
						this.singleExpression(16);
						}
						break;
					case 5:
						{
						localctx = new EqualityExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 129;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 130;
						_la = this._input.LA(1);
						if(!(_la===14 || _la===15)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 131;
						this.singleExpression(15);
						}
						break;
					case 6:
						{
						localctx = new LogicalAndExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 132;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 133;
						this.match(JexLangParser.AND);
						this.state = 134;
						this.singleExpression(14);
						}
						break;
					case 7:
						{
						localctx = new LogicalOrExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 135;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 136;
						this.match(JexLangParser.OR);
						this.state = 137;
						this.singleExpression(13);
						}
						break;
					case 8:
						{
						localctx = new TernaryExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 138;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 139;
						this.match(JexLangParser.QUESTION);
						this.state = 140;
						this.singleExpression(0);
						this.state = 141;
						this.match(JexLangParser.COLON);
						this.state = 142;
						this.singleExpression(10);
						}
						break;
					case 9:
						{
						localctx = new ShortTernaryExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 144;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 145;
						this.match(JexLangParser.QUESTION);
						this.state = 146;
						this.match(JexLangParser.COLON);
						this.state = 147;
						this.singleExpression(10);
						}
						break;
					case 10:
						{
						localctx = new BracketPropertyAssignmentContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 148;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 149;
						this.match(JexLangParser.LBRACKET);
						this.state = 150;
						this.expressionSequence();
						this.state = 151;
						this.match(JexLangParser.RBRACKET);
						this.state = 152;
						this.match(JexLangParser.ASSIGN);
						this.state = 153;
						this.singleExpression(7);
						}
						break;
					case 11:
						{
						localctx = new DotPropertyAssignmentContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 155;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 156;
						this.match(JexLangParser.DOT);
						this.state = 157;
						this.objectPropertyName();
						this.state = 158;
						this.match(JexLangParser.ASSIGN);
						this.state = 159;
						this.singleExpression(6);
						}
						break;
					case 12:
						{
						localctx = new MemberIndexExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 161;
						if (!(this.precpred(this._ctx, 25))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 25)");
						}
						this.state = 163;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===39) {
							{
							this.state = 162;
							this.match(JexLangParser.QUESTION);
							}
						}

						this.state = 165;
						this.match(JexLangParser.LBRACKET);
						this.state = 166;
						this.expressionSequence();
						this.state = 167;
						this.match(JexLangParser.RBRACKET);
						}
						break;
					case 13:
						{
						localctx = new MemberDotExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 169;
						if (!(this.precpred(this._ctx, 24))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 24)");
						}
						this.state = 171;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===39) {
							{
							this.state = 170;
							this.match(JexLangParser.QUESTION);
							}
						}

						this.state = 173;
						this.match(JexLangParser.DOT);
						this.state = 174;
						this.objectPropertyName();
						}
						break;
					case 14:
						{
						localctx = new PostfixExpressionContext(this, new SingleExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, JexLangParser.RULE_singleExpression);
						this.state = 175;
						if (!(this.precpred(this._ctx, 22))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 22)");
						}
						this.state = 176;
						_la = this._input.LA(1);
						if(!(_la===10 || _la===11)) {
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
						this.state = 177;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						this.state = 178;
						this.match(JexLangParser.PIPE);
						this.state = 179;
						this.match(JexLangParser.IDENTIFIER);
						}
						break;
					}
					}
				}
				this.state = 184;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 13, this._ctx);
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
	public elseIfStatement(): ElseIfStatementContext {
		let localctx: ElseIfStatementContext = new ElseIfStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, JexLangParser.RULE_elseIfStatement);
		try {
			this.state = 196;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 15, this._ctx) ) {
			case 1:
				localctx = new ElseIfClauseContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 185;
				this.match(JexLangParser.ELSE);
				this.state = 186;
				this.match(JexLangParser.IF);
				this.state = 187;
				this.match(JexLangParser.LPAREN);
				this.state = 188;
				this.expressionSequence();
				this.state = 189;
				this.match(JexLangParser.RPAREN);
				this.state = 190;
				this.block();
				this.state = 192;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 14, this._ctx) ) {
				case 1:
					{
					this.state = 191;
					this.elseIfStatement();
					}
					break;
				}
				}
				break;
			case 2:
				localctx = new ElseClauseContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 194;
				this.match(JexLangParser.ELSE);
				this.state = 195;
				this.block();
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
	public literal(): LiteralContext {
		let localctx: LiteralContext = new LiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, JexLangParser.RULE_literal);
		try {
			this.state = 204;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 43:
				localctx = new StringLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 198;
				this.match(JexLangParser.STRING);
				}
				break;
			case 41:
				localctx = new NumberLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 199;
				this.match(JexLangParser.NUMBER);
				}
				break;
			case 5:
				localctx = new BooleanLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 200;
				this.match(JexLangParser.BOOLEAN);
				}
				break;
			case 6:
				localctx = new NullLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 201;
				this.match(JexLangParser.NULL);
				}
				break;
			case 33:
				localctx = new ArrayLiteralExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 202;
				this.arrayLiteral();
				}
				break;
			case 31:
				localctx = new ObjectLiteralExpressionContext(this, localctx);
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 203;
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
		this.enterRule(localctx, 20, JexLangParser.RULE_arrayLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 206;
			this.match(JexLangParser.LBRACKET);
			this.state = 215;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2690657762) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1793) !== 0)) {
				{
				this.state = 207;
				this.arrayElement();
				this.state = 212;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===36) {
					{
					{
					this.state = 208;
					this.match(JexLangParser.COMMA);
					this.state = 209;
					this.arrayElement();
					}
					}
					this.state = 214;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 217;
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
		this.enterRule(localctx, 22, JexLangParser.RULE_arrayElement);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 219;
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
		this.enterRule(localctx, 24, JexLangParser.RULE_objectLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 221;
			this.match(JexLangParser.LBRACE);
			this.state = 230;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===2 || _la===6 || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1793) !== 0)) {
				{
				this.state = 222;
				this.objectProperty();
				this.state = 227;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===36) {
					{
					{
					this.state = 223;
					this.match(JexLangParser.COMMA);
					this.state = 224;
					this.objectProperty();
					}
					}
					this.state = 229;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 232;
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
		this.enterRule(localctx, 26, JexLangParser.RULE_objectProperty);
		try {
			this.state = 245;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 21, this._ctx) ) {
			case 1:
				localctx = new PropertyExpressionObjectPropertyContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 234;
				this.objectPropertyName();
				this.state = 235;
				this.match(JexLangParser.COLON);
				this.state = 236;
				this.singleExpression(0);
				}
				break;
			case 2:
				localctx = new ComputedPropertyExpressionObjectPropertyContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 238;
				this.match(JexLangParser.LBRACKET);
				this.state = 239;
				this.singleExpression(0);
				this.state = 240;
				this.match(JexLangParser.RBRACKET);
				this.state = 241;
				this.match(JexLangParser.COLON);
				this.state = 242;
				this.singleExpression(0);
				}
				break;
			case 3:
				localctx = new ShorthandPropertyExpressionObjectPropertyContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 244;
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
		this.enterRule(localctx, 28, JexLangParser.RULE_objectPropertyName);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 247;
			_la = this._input.LA(1);
			if(!(_la===2 || _la===6 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 7) !== 0))) {
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
		this.enterRule(localctx, 30, JexLangParser.RULE_arguments);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 249;
			this.match(JexLangParser.LPAREN);
			this.state = 261;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2690657762) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1793) !== 0)) {
				{
				this.state = 250;
				this.argument();
				this.state = 255;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 22, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 251;
						this.match(JexLangParser.COMMA);
						this.state = 252;
						this.argument();
						}
						}
					}
					this.state = 257;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 22, this._ctx);
				}
				this.state = 259;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===36) {
					{
					this.state = 258;
					this.match(JexLangParser.COMMA);
					}
				}

				}
			}

			this.state = 263;
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
		this.enterRule(localctx, 32, JexLangParser.RULE_argument);
		try {
			this.state = 267;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 265;
				this.singleExpression(0);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 266;
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
			return this.precpred(this._ctx, 18);
		case 1:
			return this.precpred(this._ctx, 17);
		case 2:
			return this.precpred(this._ctx, 16);
		case 3:
			return this.precpred(this._ctx, 15);
		case 4:
			return this.precpred(this._ctx, 14);
		case 5:
			return this.precpred(this._ctx, 13);
		case 6:
			return this.precpred(this._ctx, 12);
		case 7:
			return this.precpred(this._ctx, 10);
		case 8:
			return this.precpred(this._ctx, 9);
		case 9:
			return this.precpred(this._ctx, 7);
		case 10:
			return this.precpred(this._ctx, 6);
		case 11:
			return this.precpred(this._ctx, 25);
		case 12:
			return this.precpred(this._ctx, 24);
		case 13:
			return this.precpred(this._ctx, 22);
		case 14:
			return this.precpred(this._ctx, 11);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,46,270,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,1,0,
	5,0,36,8,0,10,0,12,0,39,9,0,1,0,1,0,1,1,1,1,1,1,1,1,3,1,47,8,1,1,2,1,2,
	5,2,51,8,2,10,2,12,2,54,9,2,1,2,1,2,1,3,1,3,1,4,3,4,61,8,4,1,4,1,4,1,4,
	1,4,3,4,67,8,4,1,4,3,4,70,8,4,1,5,1,5,3,5,74,8,5,1,6,1,6,1,6,5,6,79,8,6,
	10,6,12,6,82,9,6,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,
	7,1,7,1,7,1,7,1,7,3,7,102,8,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,
	7,1,7,3,7,116,8,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,
	7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,
	7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,3,7,164,8,7,1,
	7,1,7,1,7,1,7,1,7,1,7,3,7,172,8,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,5,7,181,8,
	7,10,7,12,7,184,9,7,1,8,1,8,1,8,1,8,1,8,1,8,1,8,3,8,193,8,8,1,8,1,8,3,8,
	197,8,8,1,9,1,9,1,9,1,9,1,9,1,9,3,9,205,8,9,1,10,1,10,1,10,1,10,5,10,211,
	8,10,10,10,12,10,214,9,10,3,10,216,8,10,1,10,1,10,1,11,1,11,1,12,1,12,1,
	12,1,12,5,12,226,8,12,10,12,12,12,229,9,12,3,12,231,8,12,1,12,1,12,1,13,
	1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,3,13,246,8,13,1,14,1,
	14,1,15,1,15,1,15,1,15,5,15,254,8,15,10,15,12,15,257,9,15,1,15,3,15,260,
	8,15,3,15,262,8,15,1,15,1,15,1,16,1,16,3,16,268,8,16,1,16,0,1,14,17,0,2,
	4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,0,9,1,0,2,3,1,0,10,11,2,0,1,1,
	13,13,1,0,21,22,2,0,12,12,26,26,1,0,23,25,2,0,16,17,27,28,1,0,14,15,3,0,
	2,2,6,6,41,43,306,0,37,1,0,0,0,2,46,1,0,0,0,4,48,1,0,0,0,6,57,1,0,0,0,8,
	60,1,0,0,0,10,71,1,0,0,0,12,75,1,0,0,0,14,115,1,0,0,0,16,196,1,0,0,0,18,
	204,1,0,0,0,20,206,1,0,0,0,22,219,1,0,0,0,24,221,1,0,0,0,26,245,1,0,0,0,
	28,247,1,0,0,0,30,249,1,0,0,0,32,267,1,0,0,0,34,36,3,2,1,0,35,34,1,0,0,
	0,36,39,1,0,0,0,37,35,1,0,0,0,37,38,1,0,0,0,38,40,1,0,0,0,39,37,1,0,0,0,
	40,41,5,0,0,1,41,1,1,0,0,0,42,47,3,10,5,0,43,47,3,8,4,0,44,47,3,4,2,0,45,
	47,3,6,3,0,46,42,1,0,0,0,46,43,1,0,0,0,46,44,1,0,0,0,46,45,1,0,0,0,47,3,
	1,0,0,0,48,52,5,31,0,0,49,51,3,2,1,0,50,49,1,0,0,0,51,54,1,0,0,0,52,50,
	1,0,0,0,52,53,1,0,0,0,53,55,1,0,0,0,54,52,1,0,0,0,55,56,5,32,0,0,56,5,1,
	0,0,0,57,58,5,35,0,0,58,7,1,0,0,0,59,61,5,4,0,0,60,59,1,0,0,0,60,61,1,0,
	0,0,61,62,1,0,0,0,62,63,7,0,0,0,63,66,5,42,0,0,64,65,5,20,0,0,65,67,3,14,
	7,0,66,64,1,0,0,0,66,67,1,0,0,0,67,69,1,0,0,0,68,70,5,35,0,0,69,68,1,0,
	0,0,69,70,1,0,0,0,70,9,1,0,0,0,71,73,3,12,6,0,72,74,5,35,0,0,73,72,1,0,
	0,0,73,74,1,0,0,0,74,11,1,0,0,0,75,80,3,14,7,0,76,77,5,36,0,0,77,79,3,14,
	7,0,78,76,1,0,0,0,79,82,1,0,0,0,80,78,1,0,0,0,80,81,1,0,0,0,81,13,1,0,0,
	0,82,80,1,0,0,0,83,84,6,7,-1,0,84,85,5,42,0,0,85,116,3,30,15,0,86,87,7,
	1,0,0,87,116,3,14,7,21,88,89,7,2,0,0,89,116,3,14,7,20,90,91,7,3,0,0,91,
	116,3,14,7,19,92,93,5,42,0,0,93,94,5,20,0,0,94,116,3,14,7,8,95,96,5,8,0,
	0,96,97,5,29,0,0,97,98,3,12,6,0,98,99,5,30,0,0,99,101,3,4,2,0,100,102,3,
	16,8,0,101,100,1,0,0,0,101,102,1,0,0,0,102,116,1,0,0,0,103,104,5,7,0,0,
	104,105,5,29,0,0,105,106,3,12,6,0,106,107,5,30,0,0,107,108,3,4,2,0,108,
	116,1,0,0,0,109,110,5,29,0,0,110,111,3,12,6,0,111,112,5,30,0,0,112,116,
	1,0,0,0,113,116,3,18,9,0,114,116,5,42,0,0,115,83,1,0,0,0,115,86,1,0,0,0,
	115,88,1,0,0,0,115,90,1,0,0,0,115,92,1,0,0,0,115,95,1,0,0,0,115,103,1,0,
	0,0,115,109,1,0,0,0,115,113,1,0,0,0,115,114,1,0,0,0,116,182,1,0,0,0,117,
	118,10,18,0,0,118,119,7,4,0,0,119,181,3,14,7,18,120,121,10,17,0,0,121,122,
	7,5,0,0,122,181,3,14,7,18,123,124,10,16,0,0,124,125,7,3,0,0,125,181,3,14,
	7,17,126,127,10,15,0,0,127,128,7,6,0,0,128,181,3,14,7,16,129,130,10,14,
	0,0,130,131,7,7,0,0,131,181,3,14,7,15,132,133,10,13,0,0,133,134,5,18,0,
	0,134,181,3,14,7,14,135,136,10,12,0,0,136,137,5,19,0,0,137,181,3,14,7,13,
	138,139,10,10,0,0,139,140,5,39,0,0,140,141,3,14,7,0,141,142,5,40,0,0,142,
	143,3,14,7,10,143,181,1,0,0,0,144,145,10,9,0,0,145,146,5,39,0,0,146,147,
	5,40,0,0,147,181,3,14,7,10,148,149,10,7,0,0,149,150,5,33,0,0,150,151,3,
	12,6,0,151,152,5,34,0,0,152,153,5,20,0,0,153,154,3,14,7,7,154,181,1,0,0,
	0,155,156,10,6,0,0,156,157,5,37,0,0,157,158,3,28,14,0,158,159,5,20,0,0,
	159,160,3,14,7,6,160,181,1,0,0,0,161,163,10,25,0,0,162,164,5,39,0,0,163,
	162,1,0,0,0,163,164,1,0,0,0,164,165,1,0,0,0,165,166,5,33,0,0,166,167,3,
	12,6,0,167,168,5,34,0,0,168,181,1,0,0,0,169,171,10,24,0,0,170,172,5,39,
	0,0,171,170,1,0,0,0,171,172,1,0,0,0,172,173,1,0,0,0,173,174,5,37,0,0,174,
	181,3,28,14,0,175,176,10,22,0,0,176,181,7,1,0,0,177,178,10,11,0,0,178,179,
	5,38,0,0,179,181,5,42,0,0,180,117,1,0,0,0,180,120,1,0,0,0,180,123,1,0,0,
	0,180,126,1,0,0,0,180,129,1,0,0,0,180,132,1,0,0,0,180,135,1,0,0,0,180,138,
	1,0,0,0,180,144,1,0,0,0,180,148,1,0,0,0,180,155,1,0,0,0,180,161,1,0,0,0,
	180,169,1,0,0,0,180,175,1,0,0,0,180,177,1,0,0,0,181,184,1,0,0,0,182,180,
	1,0,0,0,182,183,1,0,0,0,183,15,1,0,0,0,184,182,1,0,0,0,185,186,5,9,0,0,
	186,187,5,8,0,0,187,188,5,29,0,0,188,189,3,12,6,0,189,190,5,30,0,0,190,
	192,3,4,2,0,191,193,3,16,8,0,192,191,1,0,0,0,192,193,1,0,0,0,193,197,1,
	0,0,0,194,195,5,9,0,0,195,197,3,4,2,0,196,185,1,0,0,0,196,194,1,0,0,0,197,
	17,1,0,0,0,198,205,5,43,0,0,199,205,5,41,0,0,200,205,5,5,0,0,201,205,5,
	6,0,0,202,205,3,20,10,0,203,205,3,24,12,0,204,198,1,0,0,0,204,199,1,0,0,
	0,204,200,1,0,0,0,204,201,1,0,0,0,204,202,1,0,0,0,204,203,1,0,0,0,205,19,
	1,0,0,0,206,215,5,33,0,0,207,212,3,22,11,0,208,209,5,36,0,0,209,211,3,22,
	11,0,210,208,1,0,0,0,211,214,1,0,0,0,212,210,1,0,0,0,212,213,1,0,0,0,213,
	216,1,0,0,0,214,212,1,0,0,0,215,207,1,0,0,0,215,216,1,0,0,0,216,217,1,0,
	0,0,217,218,5,34,0,0,218,21,1,0,0,0,219,220,3,14,7,0,220,23,1,0,0,0,221,
	230,5,31,0,0,222,227,3,26,13,0,223,224,5,36,0,0,224,226,3,26,13,0,225,223,
	1,0,0,0,226,229,1,0,0,0,227,225,1,0,0,0,227,228,1,0,0,0,228,231,1,0,0,0,
	229,227,1,0,0,0,230,222,1,0,0,0,230,231,1,0,0,0,231,232,1,0,0,0,232,233,
	5,32,0,0,233,25,1,0,0,0,234,235,3,28,14,0,235,236,5,40,0,0,236,237,3,14,
	7,0,237,246,1,0,0,0,238,239,5,33,0,0,239,240,3,14,7,0,240,241,5,34,0,0,
	241,242,5,40,0,0,242,243,3,14,7,0,243,246,1,0,0,0,244,246,5,42,0,0,245,
	234,1,0,0,0,245,238,1,0,0,0,245,244,1,0,0,0,246,27,1,0,0,0,247,248,7,8,
	0,0,248,29,1,0,0,0,249,261,5,29,0,0,250,255,3,32,16,0,251,252,5,36,0,0,
	252,254,3,32,16,0,253,251,1,0,0,0,254,257,1,0,0,0,255,253,1,0,0,0,255,256,
	1,0,0,0,256,259,1,0,0,0,257,255,1,0,0,0,258,260,5,36,0,0,259,258,1,0,0,
	0,259,260,1,0,0,0,260,262,1,0,0,0,261,250,1,0,0,0,261,262,1,0,0,0,262,263,
	1,0,0,0,263,264,5,30,0,0,264,31,1,0,0,0,265,268,3,14,7,0,266,268,5,42,0,
	0,267,265,1,0,0,0,267,266,1,0,0,0,268,33,1,0,0,0,26,37,46,52,60,66,69,73,
	80,101,115,163,171,180,182,192,196,204,212,215,227,230,245,255,259,261,
	267];

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
	public IDENTIFIER(): TerminalNode {
		return this.getToken(JexLangParser.IDENTIFIER, 0);
	}
	public LET(): TerminalNode {
		return this.getToken(JexLangParser.LET, 0);
	}
	public CONST(): TerminalNode {
		return this.getToken(JexLangParser.CONST, 0);
	}
	public GLOBAL(): TerminalNode {
		return this.getToken(JexLangParser.GLOBAL, 0);
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
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitShortTernaryExpression) {
			return visitor.visitShortTernaryExpression(this);
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
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitTernaryExpression) {
			return visitor.visitTernaryExpression(this);
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
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitPowerExpression) {
			return visitor.visitPowerExpression(this);
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
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitLogicalOrExpression) {
			return visitor.visitLogicalOrExpression(this);
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
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitUnaryExpression) {
			return visitor.visitUnaryExpression(this);
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
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitFunctionCallExpression) {
			return visitor.visitFunctionCallExpression(this);
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
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitAssignmentExpression) {
			return visitor.visitAssignmentExpression(this);
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
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitMultiplicativeExpression) {
			return visitor.visitMultiplicativeExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
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
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitParenthesizedExpression) {
			return visitor.visitParenthesizedExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IfExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public IF(): TerminalNode {
		return this.getToken(JexLangParser.IF, 0);
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
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
	public elseIfStatement(): ElseIfStatementContext {
		return this.getTypedRuleContext(ElseIfStatementContext, 0) as ElseIfStatementContext;
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitIfExpression) {
			return visitor.visitIfExpression(this);
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
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitRelationalExpression) {
			return visitor.visitRelationalExpression(this);
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
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitBracketPropertyAssignment) {
			return visitor.visitBracketPropertyAssignment(this);
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
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitLiteralExpression) {
			return visitor.visitLiteralExpression(this);
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
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitMemberDotExpression) {
			return visitor.visitMemberDotExpression(this);
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
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitMemberIndexExpression) {
			return visitor.visitMemberIndexExpression(this);
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
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitIdentifierExpression) {
			return visitor.visitIdentifierExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RepeatExpressionContext extends SingleExpressionContext {
	constructor(parser: JexLangParser, ctx: SingleExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public REPEAT(): TerminalNode {
		return this.getToken(JexLangParser.REPEAT, 0);
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
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitRepeatExpression) {
			return visitor.visitRepeatExpression(this);
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
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitSquareRootExpression) {
			return visitor.visitSquareRootExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElseIfStatementContext extends ParserRuleContext {
	constructor(parser?: JexLangParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return JexLangParser.RULE_elseIfStatement;
	}
	public override copyFrom(ctx: ElseIfStatementContext): void {
		super.copyFrom(ctx);
	}
}
export class ElseClauseContext extends ElseIfStatementContext {
	constructor(parser: JexLangParser, ctx: ElseIfStatementContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ELSE(): TerminalNode {
		return this.getToken(JexLangParser.ELSE, 0);
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitElseClause) {
			return visitor.visitElseClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ElseIfClauseContext extends ElseIfStatementContext {
	constructor(parser: JexLangParser, ctx: ElseIfStatementContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ELSE(): TerminalNode {
		return this.getToken(JexLangParser.ELSE, 0);
	}
	public IF(): TerminalNode {
		return this.getToken(JexLangParser.IF, 0);
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
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
	public elseIfStatement(): ElseIfStatementContext {
		return this.getTypedRuleContext(ElseIfStatementContext, 0) as ElseIfStatementContext;
	}
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitElseIfClause) {
			return visitor.visitElseIfClause(this);
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
	// @Override
	public accept<Result>(visitor: JexLangVisitor<Result>): Result {
		if (visitor.visitArgument) {
			return visitor.visitArgument(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

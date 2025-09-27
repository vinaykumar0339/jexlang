// Generated from JexLang.g4 by ANTLR 4.13.2

    package com.jexlang.java.grammar;

import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue", "this-escape"})
public class JexLangParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.2", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, LET=2, CONST=3, GLOBAL=4, BOOLEAN=5, NULL=6, REPEAT=7, IF=8, ELSE=9, 
		INCREMENT=10, DECREMENT=11, POW=12, SQRT=13, EQ=14, NEQ=15, LTE=16, GTE=17, 
		AND=18, OR=19, ASSIGN=20, PLUS=21, MINUS=22, MULTIPLY=23, DIVIDE=24, MODULO=25, 
		POWER=26, LT=27, GT=28, LPAREN=29, RPAREN=30, LBRACE=31, RBRACE=32, LBRACKET=33, 
		RBRACKET=34, SEMICOLON=35, COMMA=36, DOT=37, PIPE=38, QUESTION=39, COLON=40, 
		NUMBER=41, IDENTIFIER=42, STRING=43, WS=44, LINE_COMMENT=45, BLOCK_COMMENT=46;
	public static final int
		RULE_program = 0, RULE_statement = 1, RULE_block = 2, RULE_emptyStatement = 3, 
		RULE_varDeclaration = 4, RULE_expressionStatement = 5, RULE_expressionSequence = 6, 
		RULE_singleExpression = 7, RULE_elseIfStatement = 8, RULE_literal = 9, 
		RULE_arrayLiteral = 10, RULE_arrayElement = 11, RULE_objectLiteral = 12, 
		RULE_objectProperty = 13, RULE_objectPropertyName = 14, RULE_arguments = 15, 
		RULE_argument = 16;
	private static String[] makeRuleNames() {
		return new String[] {
			"program", "statement", "block", "emptyStatement", "varDeclaration", 
			"expressionStatement", "expressionSequence", "singleExpression", "elseIfStatement", 
			"literal", "arrayLiteral", "arrayElement", "objectLiteral", "objectProperty", 
			"objectPropertyName", "arguments", "argument"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'sqrt'", "'let'", "'const'", "'global'", null, "'null'", "'repeat'", 
			"'if'", "'else'", "'++'", "'--'", "'**'", "'\\u221A'", "'=='", "'!='", 
			"'<='", "'>='", null, null, "'='", "'+'", "'-'", "'*'", "'/'", "'%'", 
			"'^'", "'<'", "'>'", "'('", "')'", "'{'", "'}'", "'['", "']'", "';'", 
			"','", "'.'", "'|'", "'?'", "':'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, "LET", "CONST", "GLOBAL", "BOOLEAN", "NULL", "REPEAT", "IF", 
			"ELSE", "INCREMENT", "DECREMENT", "POW", "SQRT", "EQ", "NEQ", "LTE", 
			"GTE", "AND", "OR", "ASSIGN", "PLUS", "MINUS", "MULTIPLY", "DIVIDE", 
			"MODULO", "POWER", "LT", "GT", "LPAREN", "RPAREN", "LBRACE", "RBRACE", 
			"LBRACKET", "RBRACKET", "SEMICOLON", "COMMA", "DOT", "PIPE", "QUESTION", 
			"COLON", "NUMBER", "IDENTIFIER", "STRING", "WS", "LINE_COMMENT", "BLOCK_COMMENT"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "JexLang.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public JexLangParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ProgramContext extends ParserRuleContext {
		public TerminalNode EOF() { return getToken(JexLangParser.EOF, 0); }
		public List<StatementContext> statement() {
			return getRuleContexts(StatementContext.class);
		}
		public StatementContext statement(int i) {
			return getRuleContext(StatementContext.class,i);
		}
		public ProgramContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_program; }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitProgram(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ProgramContext program() throws RecognitionException {
		ProgramContext _localctx = new ProgramContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_program);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(37);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 15438803119614L) != 0)) {
				{
				{
				setState(34);
				statement();
				}
				}
				setState(39);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(40);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class StatementContext extends ParserRuleContext {
		public ExpressionStatementContext expressionStatement() {
			return getRuleContext(ExpressionStatementContext.class,0);
		}
		public VarDeclarationContext varDeclaration() {
			return getRuleContext(VarDeclarationContext.class,0);
		}
		public BlockContext block() {
			return getRuleContext(BlockContext.class,0);
		}
		public EmptyStatementContext emptyStatement() {
			return getRuleContext(EmptyStatementContext.class,0);
		}
		public StatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_statement; }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitStatement(this);
			else return visitor.visitChildren(this);
		}
	}

	public final StatementContext statement() throws RecognitionException {
		StatementContext _localctx = new StatementContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_statement);
		try {
			setState(46);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(42);
				expressionStatement();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(43);
				varDeclaration();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(44);
				block();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(45);
				emptyStatement();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class BlockContext extends ParserRuleContext {
		public TerminalNode LBRACE() { return getToken(JexLangParser.LBRACE, 0); }
		public TerminalNode RBRACE() { return getToken(JexLangParser.RBRACE, 0); }
		public List<StatementContext> statement() {
			return getRuleContexts(StatementContext.class);
		}
		public StatementContext statement(int i) {
			return getRuleContext(StatementContext.class,i);
		}
		public BlockContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_block; }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitBlock(this);
			else return visitor.visitChildren(this);
		}
	}

	public final BlockContext block() throws RecognitionException {
		BlockContext _localctx = new BlockContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_block);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(48);
			match(LBRACE);
			setState(52);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 15438803119614L) != 0)) {
				{
				{
				setState(49);
				statement();
				}
				}
				setState(54);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(55);
			match(RBRACE);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class EmptyStatementContext extends ParserRuleContext {
		public TerminalNode SEMICOLON() { return getToken(JexLangParser.SEMICOLON, 0); }
		public EmptyStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_emptyStatement; }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitEmptyStatement(this);
			else return visitor.visitChildren(this);
		}
	}

	public final EmptyStatementContext emptyStatement() throws RecognitionException {
		EmptyStatementContext _localctx = new EmptyStatementContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_emptyStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(57);
			match(SEMICOLON);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class VarDeclarationContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(JexLangParser.IDENTIFIER, 0); }
		public TerminalNode LET() { return getToken(JexLangParser.LET, 0); }
		public TerminalNode CONST() { return getToken(JexLangParser.CONST, 0); }
		public TerminalNode GLOBAL() { return getToken(JexLangParser.GLOBAL, 0); }
		public TerminalNode ASSIGN() { return getToken(JexLangParser.ASSIGN, 0); }
		public SingleExpressionContext singleExpression() {
			return getRuleContext(SingleExpressionContext.class,0);
		}
		public TerminalNode SEMICOLON() { return getToken(JexLangParser.SEMICOLON, 0); }
		public VarDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_varDeclaration; }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitVarDeclaration(this);
			else return visitor.visitChildren(this);
		}
	}

	public final VarDeclarationContext varDeclaration() throws RecognitionException {
		VarDeclarationContext _localctx = new VarDeclarationContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_varDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(60);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==GLOBAL) {
				{
				setState(59);
				match(GLOBAL);
				}
			}

			setState(62);
			_la = _input.LA(1);
			if ( !(_la==LET || _la==CONST) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(63);
			match(IDENTIFIER);
			setState(66);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==ASSIGN) {
				{
				setState(64);
				match(ASSIGN);
				setState(65);
				singleExpression(0);
				}
			}

			setState(69);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,5,_ctx) ) {
			case 1:
				{
				setState(68);
				match(SEMICOLON);
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExpressionStatementContext extends ParserRuleContext {
		public ExpressionSequenceContext expressionSequence() {
			return getRuleContext(ExpressionSequenceContext.class,0);
		}
		public TerminalNode SEMICOLON() { return getToken(JexLangParser.SEMICOLON, 0); }
		public ExpressionStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expressionStatement; }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitExpressionStatement(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExpressionStatementContext expressionStatement() throws RecognitionException {
		ExpressionStatementContext _localctx = new ExpressionStatementContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_expressionStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(71);
			expressionSequence();
			setState(73);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,6,_ctx) ) {
			case 1:
				{
				setState(72);
				match(SEMICOLON);
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExpressionSequenceContext extends ParserRuleContext {
		public List<SingleExpressionContext> singleExpression() {
			return getRuleContexts(SingleExpressionContext.class);
		}
		public SingleExpressionContext singleExpression(int i) {
			return getRuleContext(SingleExpressionContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(JexLangParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(JexLangParser.COMMA, i);
		}
		public ExpressionSequenceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expressionSequence; }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitExpressionSequence(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExpressionSequenceContext expressionSequence() throws RecognitionException {
		ExpressionSequenceContext _localctx = new ExpressionSequenceContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_expressionSequence);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(75);
			singleExpression(0);
			setState(80);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(76);
				match(COMMA);
				setState(77);
				singleExpression(0);
				}
				}
				setState(82);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class SingleExpressionContext extends ParserRuleContext {
		public SingleExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_singleExpression; }
	 
		public SingleExpressionContext() { }
		public void copyFrom(SingleExpressionContext ctx) {
			super.copyFrom(ctx);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ShortTernaryExpressionContext extends SingleExpressionContext {
		public List<SingleExpressionContext> singleExpression() {
			return getRuleContexts(SingleExpressionContext.class);
		}
		public SingleExpressionContext singleExpression(int i) {
			return getRuleContext(SingleExpressionContext.class,i);
		}
		public TerminalNode QUESTION() { return getToken(JexLangParser.QUESTION, 0); }
		public TerminalNode COLON() { return getToken(JexLangParser.COLON, 0); }
		public ShortTernaryExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitShortTernaryExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class TernaryExpressionContext extends SingleExpressionContext {
		public List<SingleExpressionContext> singleExpression() {
			return getRuleContexts(SingleExpressionContext.class);
		}
		public SingleExpressionContext singleExpression(int i) {
			return getRuleContext(SingleExpressionContext.class,i);
		}
		public TerminalNode QUESTION() { return getToken(JexLangParser.QUESTION, 0); }
		public TerminalNode COLON() { return getToken(JexLangParser.COLON, 0); }
		public TernaryExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitTernaryExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class LogicalAndExpressionContext extends SingleExpressionContext {
		public List<SingleExpressionContext> singleExpression() {
			return getRuleContexts(SingleExpressionContext.class);
		}
		public SingleExpressionContext singleExpression(int i) {
			return getRuleContext(SingleExpressionContext.class,i);
		}
		public TerminalNode AND() { return getToken(JexLangParser.AND, 0); }
		public LogicalAndExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitLogicalAndExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class PowerExpressionContext extends SingleExpressionContext {
		public List<SingleExpressionContext> singleExpression() {
			return getRuleContexts(SingleExpressionContext.class);
		}
		public SingleExpressionContext singleExpression(int i) {
			return getRuleContext(SingleExpressionContext.class,i);
		}
		public TerminalNode POW() { return getToken(JexLangParser.POW, 0); }
		public TerminalNode POWER() { return getToken(JexLangParser.POWER, 0); }
		public PowerExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitPowerExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class LogicalOrExpressionContext extends SingleExpressionContext {
		public List<SingleExpressionContext> singleExpression() {
			return getRuleContexts(SingleExpressionContext.class);
		}
		public SingleExpressionContext singleExpression(int i) {
			return getRuleContext(SingleExpressionContext.class,i);
		}
		public TerminalNode OR() { return getToken(JexLangParser.OR, 0); }
		public LogicalOrExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitLogicalOrExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class UnaryExpressionContext extends SingleExpressionContext {
		public SingleExpressionContext singleExpression() {
			return getRuleContext(SingleExpressionContext.class,0);
		}
		public TerminalNode PLUS() { return getToken(JexLangParser.PLUS, 0); }
		public TerminalNode MINUS() { return getToken(JexLangParser.MINUS, 0); }
		public UnaryExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitUnaryExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class FunctionCallExpressionContext extends SingleExpressionContext {
		public TerminalNode IDENTIFIER() { return getToken(JexLangParser.IDENTIFIER, 0); }
		public ArgumentsContext arguments() {
			return getRuleContext(ArgumentsContext.class,0);
		}
		public FunctionCallExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitFunctionCallExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class AssignmentExpressionContext extends SingleExpressionContext {
		public TerminalNode IDENTIFIER() { return getToken(JexLangParser.IDENTIFIER, 0); }
		public TerminalNode ASSIGN() { return getToken(JexLangParser.ASSIGN, 0); }
		public SingleExpressionContext singleExpression() {
			return getRuleContext(SingleExpressionContext.class,0);
		}
		public AssignmentExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitAssignmentExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class EqualityExpressionContext extends SingleExpressionContext {
		public List<SingleExpressionContext> singleExpression() {
			return getRuleContexts(SingleExpressionContext.class);
		}
		public SingleExpressionContext singleExpression(int i) {
			return getRuleContext(SingleExpressionContext.class,i);
		}
		public TerminalNode EQ() { return getToken(JexLangParser.EQ, 0); }
		public TerminalNode NEQ() { return getToken(JexLangParser.NEQ, 0); }
		public EqualityExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitEqualityExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class MultiplicativeExpressionContext extends SingleExpressionContext {
		public List<SingleExpressionContext> singleExpression() {
			return getRuleContexts(SingleExpressionContext.class);
		}
		public SingleExpressionContext singleExpression(int i) {
			return getRuleContext(SingleExpressionContext.class,i);
		}
		public TerminalNode MULTIPLY() { return getToken(JexLangParser.MULTIPLY, 0); }
		public TerminalNode DIVIDE() { return getToken(JexLangParser.DIVIDE, 0); }
		public TerminalNode MODULO() { return getToken(JexLangParser.MODULO, 0); }
		public MultiplicativeExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitMultiplicativeExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ParenthesizedExpressionContext extends SingleExpressionContext {
		public TerminalNode LPAREN() { return getToken(JexLangParser.LPAREN, 0); }
		public ExpressionSequenceContext expressionSequence() {
			return getRuleContext(ExpressionSequenceContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(JexLangParser.RPAREN, 0); }
		public ParenthesizedExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitParenthesizedExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class IfExpressionContext extends SingleExpressionContext {
		public TerminalNode IF() { return getToken(JexLangParser.IF, 0); }
		public TerminalNode LPAREN() { return getToken(JexLangParser.LPAREN, 0); }
		public ExpressionSequenceContext expressionSequence() {
			return getRuleContext(ExpressionSequenceContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(JexLangParser.RPAREN, 0); }
		public BlockContext block() {
			return getRuleContext(BlockContext.class,0);
		}
		public ElseIfStatementContext elseIfStatement() {
			return getRuleContext(ElseIfStatementContext.class,0);
		}
		public IfExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitIfExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class AdditiveExpressionContext extends SingleExpressionContext {
		public List<SingleExpressionContext> singleExpression() {
			return getRuleContexts(SingleExpressionContext.class);
		}
		public SingleExpressionContext singleExpression(int i) {
			return getRuleContext(SingleExpressionContext.class,i);
		}
		public TerminalNode PLUS() { return getToken(JexLangParser.PLUS, 0); }
		public TerminalNode MINUS() { return getToken(JexLangParser.MINUS, 0); }
		public AdditiveExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitAdditiveExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class RelationalExpressionContext extends SingleExpressionContext {
		public List<SingleExpressionContext> singleExpression() {
			return getRuleContexts(SingleExpressionContext.class);
		}
		public SingleExpressionContext singleExpression(int i) {
			return getRuleContext(SingleExpressionContext.class,i);
		}
		public TerminalNode LT() { return getToken(JexLangParser.LT, 0); }
		public TerminalNode GT() { return getToken(JexLangParser.GT, 0); }
		public TerminalNode LTE() { return getToken(JexLangParser.LTE, 0); }
		public TerminalNode GTE() { return getToken(JexLangParser.GTE, 0); }
		public RelationalExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitRelationalExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class BracketPropertyAssignmentContext extends SingleExpressionContext {
		public List<SingleExpressionContext> singleExpression() {
			return getRuleContexts(SingleExpressionContext.class);
		}
		public SingleExpressionContext singleExpression(int i) {
			return getRuleContext(SingleExpressionContext.class,i);
		}
		public TerminalNode LBRACKET() { return getToken(JexLangParser.LBRACKET, 0); }
		public ExpressionSequenceContext expressionSequence() {
			return getRuleContext(ExpressionSequenceContext.class,0);
		}
		public TerminalNode RBRACKET() { return getToken(JexLangParser.RBRACKET, 0); }
		public TerminalNode ASSIGN() { return getToken(JexLangParser.ASSIGN, 0); }
		public BracketPropertyAssignmentContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitBracketPropertyAssignment(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class DotPropertyAssignmentContext extends SingleExpressionContext {
		public List<SingleExpressionContext> singleExpression() {
			return getRuleContexts(SingleExpressionContext.class);
		}
		public SingleExpressionContext singleExpression(int i) {
			return getRuleContext(SingleExpressionContext.class,i);
		}
		public TerminalNode DOT() { return getToken(JexLangParser.DOT, 0); }
		public ObjectPropertyNameContext objectPropertyName() {
			return getRuleContext(ObjectPropertyNameContext.class,0);
		}
		public TerminalNode ASSIGN() { return getToken(JexLangParser.ASSIGN, 0); }
		public DotPropertyAssignmentContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitDotPropertyAssignment(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class LiteralExpressionContext extends SingleExpressionContext {
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public LiteralExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitLiteralExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class MemberDotExpressionContext extends SingleExpressionContext {
		public SingleExpressionContext singleExpression() {
			return getRuleContext(SingleExpressionContext.class,0);
		}
		public TerminalNode DOT() { return getToken(JexLangParser.DOT, 0); }
		public ObjectPropertyNameContext objectPropertyName() {
			return getRuleContext(ObjectPropertyNameContext.class,0);
		}
		public TerminalNode QUESTION() { return getToken(JexLangParser.QUESTION, 0); }
		public MemberDotExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitMemberDotExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class MemberIndexExpressionContext extends SingleExpressionContext {
		public SingleExpressionContext singleExpression() {
			return getRuleContext(SingleExpressionContext.class,0);
		}
		public TerminalNode LBRACKET() { return getToken(JexLangParser.LBRACKET, 0); }
		public ExpressionSequenceContext expressionSequence() {
			return getRuleContext(ExpressionSequenceContext.class,0);
		}
		public TerminalNode RBRACKET() { return getToken(JexLangParser.RBRACKET, 0); }
		public TerminalNode QUESTION() { return getToken(JexLangParser.QUESTION, 0); }
		public MemberIndexExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitMemberIndexExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class IdentifierExpressionContext extends SingleExpressionContext {
		public TerminalNode IDENTIFIER() { return getToken(JexLangParser.IDENTIFIER, 0); }
		public IdentifierExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitIdentifierExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class RepeatExpressionContext extends SingleExpressionContext {
		public TerminalNode REPEAT() { return getToken(JexLangParser.REPEAT, 0); }
		public TerminalNode LPAREN() { return getToken(JexLangParser.LPAREN, 0); }
		public ExpressionSequenceContext expressionSequence() {
			return getRuleContext(ExpressionSequenceContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(JexLangParser.RPAREN, 0); }
		public BlockContext block() {
			return getRuleContext(BlockContext.class,0);
		}
		public RepeatExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitRepeatExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class TransformExpressionContext extends SingleExpressionContext {
		public SingleExpressionContext singleExpression() {
			return getRuleContext(SingleExpressionContext.class,0);
		}
		public TerminalNode PIPE() { return getToken(JexLangParser.PIPE, 0); }
		public TerminalNode IDENTIFIER() { return getToken(JexLangParser.IDENTIFIER, 0); }
		public TransformExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitTransformExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class PrefixExpressionContext extends SingleExpressionContext {
		public SingleExpressionContext singleExpression() {
			return getRuleContext(SingleExpressionContext.class,0);
		}
		public TerminalNode INCREMENT() { return getToken(JexLangParser.INCREMENT, 0); }
		public TerminalNode DECREMENT() { return getToken(JexLangParser.DECREMENT, 0); }
		public PrefixExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitPrefixExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class PostfixExpressionContext extends SingleExpressionContext {
		public SingleExpressionContext singleExpression() {
			return getRuleContext(SingleExpressionContext.class,0);
		}
		public TerminalNode INCREMENT() { return getToken(JexLangParser.INCREMENT, 0); }
		public TerminalNode DECREMENT() { return getToken(JexLangParser.DECREMENT, 0); }
		public PostfixExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitPostfixExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class SquareRootExpressionContext extends SingleExpressionContext {
		public SingleExpressionContext singleExpression() {
			return getRuleContext(SingleExpressionContext.class,0);
		}
		public TerminalNode SQRT() { return getToken(JexLangParser.SQRT, 0); }
		public SquareRootExpressionContext(SingleExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitSquareRootExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final SingleExpressionContext singleExpression() throws RecognitionException {
		return singleExpression(0);
	}

	private SingleExpressionContext singleExpression(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		SingleExpressionContext _localctx = new SingleExpressionContext(_ctx, _parentState);
		SingleExpressionContext _prevctx = _localctx;
		int _startState = 14;
		enterRecursionRule(_localctx, 14, RULE_singleExpression, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(115);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,9,_ctx) ) {
			case 1:
				{
				_localctx = new FunctionCallExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(84);
				match(IDENTIFIER);
				setState(85);
				arguments();
				}
				break;
			case 2:
				{
				_localctx = new PrefixExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(86);
				_la = _input.LA(1);
				if ( !(_la==INCREMENT || _la==DECREMENT) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(87);
				singleExpression(21);
				}
				break;
			case 3:
				{
				_localctx = new SquareRootExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(88);
				_la = _input.LA(1);
				if ( !(_la==T__0 || _la==SQRT) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(89);
				singleExpression(20);
				}
				break;
			case 4:
				{
				_localctx = new UnaryExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(90);
				_la = _input.LA(1);
				if ( !(_la==PLUS || _la==MINUS) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(91);
				singleExpression(19);
				}
				break;
			case 5:
				{
				_localctx = new AssignmentExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(92);
				match(IDENTIFIER);
				setState(93);
				match(ASSIGN);
				setState(94);
				singleExpression(8);
				}
				break;
			case 6:
				{
				_localctx = new IfExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(95);
				match(IF);
				setState(96);
				match(LPAREN);
				setState(97);
				expressionSequence();
				setState(98);
				match(RPAREN);
				setState(99);
				block();
				setState(101);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,8,_ctx) ) {
				case 1:
					{
					setState(100);
					elseIfStatement();
					}
					break;
				}
				}
				break;
			case 7:
				{
				_localctx = new RepeatExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(103);
				match(REPEAT);
				setState(104);
				match(LPAREN);
				setState(105);
				expressionSequence();
				setState(106);
				match(RPAREN);
				setState(107);
				block();
				}
				break;
			case 8:
				{
				_localctx = new ParenthesizedExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(109);
				match(LPAREN);
				setState(110);
				expressionSequence();
				setState(111);
				match(RPAREN);
				}
				break;
			case 9:
				{
				_localctx = new LiteralExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(113);
				literal();
				}
				break;
			case 10:
				{
				_localctx = new IdentifierExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(114);
				match(IDENTIFIER);
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(182);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,13,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(180);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,12,_ctx) ) {
					case 1:
						{
						_localctx = new PowerExpressionContext(new SingleExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_singleExpression);
						setState(117);
						if (!(precpred(_ctx, 18))) throw new FailedPredicateException(this, "precpred(_ctx, 18)");
						setState(118);
						_la = _input.LA(1);
						if ( !(_la==POW || _la==POWER) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(119);
						singleExpression(18);
						}
						break;
					case 2:
						{
						_localctx = new MultiplicativeExpressionContext(new SingleExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_singleExpression);
						setState(120);
						if (!(precpred(_ctx, 17))) throw new FailedPredicateException(this, "precpred(_ctx, 17)");
						setState(121);
						_la = _input.LA(1);
						if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 58720256L) != 0)) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(122);
						singleExpression(18);
						}
						break;
					case 3:
						{
						_localctx = new AdditiveExpressionContext(new SingleExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_singleExpression);
						setState(123);
						if (!(precpred(_ctx, 16))) throw new FailedPredicateException(this, "precpred(_ctx, 16)");
						setState(124);
						_la = _input.LA(1);
						if ( !(_la==PLUS || _la==MINUS) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(125);
						singleExpression(17);
						}
						break;
					case 4:
						{
						_localctx = new RelationalExpressionContext(new SingleExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_singleExpression);
						setState(126);
						if (!(precpred(_ctx, 15))) throw new FailedPredicateException(this, "precpred(_ctx, 15)");
						setState(127);
						_la = _input.LA(1);
						if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 402849792L) != 0)) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(128);
						singleExpression(16);
						}
						break;
					case 5:
						{
						_localctx = new EqualityExpressionContext(new SingleExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_singleExpression);
						setState(129);
						if (!(precpred(_ctx, 14))) throw new FailedPredicateException(this, "precpred(_ctx, 14)");
						setState(130);
						_la = _input.LA(1);
						if ( !(_la==EQ || _la==NEQ) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(131);
						singleExpression(15);
						}
						break;
					case 6:
						{
						_localctx = new LogicalAndExpressionContext(new SingleExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_singleExpression);
						setState(132);
						if (!(precpred(_ctx, 13))) throw new FailedPredicateException(this, "precpred(_ctx, 13)");
						setState(133);
						match(AND);
						setState(134);
						singleExpression(14);
						}
						break;
					case 7:
						{
						_localctx = new LogicalOrExpressionContext(new SingleExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_singleExpression);
						setState(135);
						if (!(precpred(_ctx, 12))) throw new FailedPredicateException(this, "precpred(_ctx, 12)");
						setState(136);
						match(OR);
						setState(137);
						singleExpression(13);
						}
						break;
					case 8:
						{
						_localctx = new TernaryExpressionContext(new SingleExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_singleExpression);
						setState(138);
						if (!(precpred(_ctx, 10))) throw new FailedPredicateException(this, "precpred(_ctx, 10)");
						setState(139);
						match(QUESTION);
						setState(140);
						singleExpression(0);
						setState(141);
						match(COLON);
						setState(142);
						singleExpression(10);
						}
						break;
					case 9:
						{
						_localctx = new ShortTernaryExpressionContext(new SingleExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_singleExpression);
						setState(144);
						if (!(precpred(_ctx, 9))) throw new FailedPredicateException(this, "precpred(_ctx, 9)");
						setState(145);
						match(QUESTION);
						setState(146);
						match(COLON);
						setState(147);
						singleExpression(10);
						}
						break;
					case 10:
						{
						_localctx = new BracketPropertyAssignmentContext(new SingleExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_singleExpression);
						setState(148);
						if (!(precpred(_ctx, 7))) throw new FailedPredicateException(this, "precpred(_ctx, 7)");
						setState(149);
						match(LBRACKET);
						setState(150);
						expressionSequence();
						setState(151);
						match(RBRACKET);
						setState(152);
						match(ASSIGN);
						setState(153);
						singleExpression(7);
						}
						break;
					case 11:
						{
						_localctx = new DotPropertyAssignmentContext(new SingleExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_singleExpression);
						setState(155);
						if (!(precpred(_ctx, 6))) throw new FailedPredicateException(this, "precpred(_ctx, 6)");
						setState(156);
						match(DOT);
						setState(157);
						objectPropertyName();
						setState(158);
						match(ASSIGN);
						setState(159);
						singleExpression(6);
						}
						break;
					case 12:
						{
						_localctx = new MemberIndexExpressionContext(new SingleExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_singleExpression);
						setState(161);
						if (!(precpred(_ctx, 25))) throw new FailedPredicateException(this, "precpred(_ctx, 25)");
						setState(163);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==QUESTION) {
							{
							setState(162);
							match(QUESTION);
							}
						}

						setState(165);
						match(LBRACKET);
						setState(166);
						expressionSequence();
						setState(167);
						match(RBRACKET);
						}
						break;
					case 13:
						{
						_localctx = new MemberDotExpressionContext(new SingleExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_singleExpression);
						setState(169);
						if (!(precpred(_ctx, 24))) throw new FailedPredicateException(this, "precpred(_ctx, 24)");
						setState(171);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==QUESTION) {
							{
							setState(170);
							match(QUESTION);
							}
						}

						setState(173);
						match(DOT);
						setState(174);
						objectPropertyName();
						}
						break;
					case 14:
						{
						_localctx = new PostfixExpressionContext(new SingleExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_singleExpression);
						setState(175);
						if (!(precpred(_ctx, 22))) throw new FailedPredicateException(this, "precpred(_ctx, 22)");
						setState(176);
						_la = _input.LA(1);
						if ( !(_la==INCREMENT || _la==DECREMENT) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						}
						break;
					case 15:
						{
						_localctx = new TransformExpressionContext(new SingleExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_singleExpression);
						setState(177);
						if (!(precpred(_ctx, 11))) throw new FailedPredicateException(this, "precpred(_ctx, 11)");
						setState(178);
						match(PIPE);
						setState(179);
						match(IDENTIFIER);
						}
						break;
					}
					} 
				}
				setState(184);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,13,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ElseIfStatementContext extends ParserRuleContext {
		public ElseIfStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_elseIfStatement; }
	 
		public ElseIfStatementContext() { }
		public void copyFrom(ElseIfStatementContext ctx) {
			super.copyFrom(ctx);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ElseClauseContext extends ElseIfStatementContext {
		public TerminalNode ELSE() { return getToken(JexLangParser.ELSE, 0); }
		public BlockContext block() {
			return getRuleContext(BlockContext.class,0);
		}
		public ElseClauseContext(ElseIfStatementContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitElseClause(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ElseIfClauseContext extends ElseIfStatementContext {
		public TerminalNode ELSE() { return getToken(JexLangParser.ELSE, 0); }
		public TerminalNode IF() { return getToken(JexLangParser.IF, 0); }
		public TerminalNode LPAREN() { return getToken(JexLangParser.LPAREN, 0); }
		public ExpressionSequenceContext expressionSequence() {
			return getRuleContext(ExpressionSequenceContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(JexLangParser.RPAREN, 0); }
		public BlockContext block() {
			return getRuleContext(BlockContext.class,0);
		}
		public ElseIfStatementContext elseIfStatement() {
			return getRuleContext(ElseIfStatementContext.class,0);
		}
		public ElseIfClauseContext(ElseIfStatementContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitElseIfClause(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ElseIfStatementContext elseIfStatement() throws RecognitionException {
		ElseIfStatementContext _localctx = new ElseIfStatementContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_elseIfStatement);
		try {
			setState(196);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,15,_ctx) ) {
			case 1:
				_localctx = new ElseIfClauseContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(185);
				match(ELSE);
				setState(186);
				match(IF);
				setState(187);
				match(LPAREN);
				setState(188);
				expressionSequence();
				setState(189);
				match(RPAREN);
				setState(190);
				block();
				setState(192);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,14,_ctx) ) {
				case 1:
					{
					setState(191);
					elseIfStatement();
					}
					break;
				}
				}
				break;
			case 2:
				_localctx = new ElseClauseContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(194);
				match(ELSE);
				setState(195);
				block();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class LiteralContext extends ParserRuleContext {
		public LiteralContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_literal; }
	 
		public LiteralContext() { }
		public void copyFrom(LiteralContext ctx) {
			super.copyFrom(ctx);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class StringLiteralContext extends LiteralContext {
		public TerminalNode STRING() { return getToken(JexLangParser.STRING, 0); }
		public StringLiteralContext(LiteralContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitStringLiteral(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ObjectLiteralExpressionContext extends LiteralContext {
		public ObjectLiteralContext objectLiteral() {
			return getRuleContext(ObjectLiteralContext.class,0);
		}
		public ObjectLiteralExpressionContext(LiteralContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitObjectLiteralExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class BooleanLiteralContext extends LiteralContext {
		public TerminalNode BOOLEAN() { return getToken(JexLangParser.BOOLEAN, 0); }
		public BooleanLiteralContext(LiteralContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitBooleanLiteral(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ArrayLiteralExpressionContext extends LiteralContext {
		public ArrayLiteralContext arrayLiteral() {
			return getRuleContext(ArrayLiteralContext.class,0);
		}
		public ArrayLiteralExpressionContext(LiteralContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitArrayLiteralExpression(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class NullLiteralContext extends LiteralContext {
		public TerminalNode NULL() { return getToken(JexLangParser.NULL, 0); }
		public NullLiteralContext(LiteralContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitNullLiteral(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class NumberLiteralContext extends LiteralContext {
		public TerminalNode NUMBER() { return getToken(JexLangParser.NUMBER, 0); }
		public NumberLiteralContext(LiteralContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitNumberLiteral(this);
			else return visitor.visitChildren(this);
		}
	}

	public final LiteralContext literal() throws RecognitionException {
		LiteralContext _localctx = new LiteralContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_literal);
		try {
			setState(204);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case STRING:
				_localctx = new StringLiteralContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(198);
				match(STRING);
				}
				break;
			case NUMBER:
				_localctx = new NumberLiteralContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(199);
				match(NUMBER);
				}
				break;
			case BOOLEAN:
				_localctx = new BooleanLiteralContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(200);
				match(BOOLEAN);
				}
				break;
			case NULL:
				_localctx = new NullLiteralContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(201);
				match(NULL);
				}
				break;
			case LBRACKET:
				_localctx = new ArrayLiteralExpressionContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(202);
				arrayLiteral();
				}
				break;
			case LBRACE:
				_localctx = new ObjectLiteralExpressionContext(_localctx);
				enterOuterAlt(_localctx, 6);
				{
				setState(203);
				objectLiteral();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArrayLiteralContext extends ParserRuleContext {
		public TerminalNode LBRACKET() { return getToken(JexLangParser.LBRACKET, 0); }
		public TerminalNode RBRACKET() { return getToken(JexLangParser.RBRACKET, 0); }
		public List<ArrayElementContext> arrayElement() {
			return getRuleContexts(ArrayElementContext.class);
		}
		public ArrayElementContext arrayElement(int i) {
			return getRuleContext(ArrayElementContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(JexLangParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(JexLangParser.COMMA, i);
		}
		public ArrayLiteralContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_arrayLiteral; }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitArrayLiteral(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ArrayLiteralContext arrayLiteral() throws RecognitionException {
		ArrayLiteralContext _localctx = new ArrayLiteralContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_arrayLiteral);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(206);
			match(LBRACKET);
			setState(215);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 15404443381218L) != 0)) {
				{
				setState(207);
				arrayElement();
				setState(212);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==COMMA) {
					{
					{
					setState(208);
					match(COMMA);
					setState(209);
					arrayElement();
					}
					}
					setState(214);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
			}

			setState(217);
			match(RBRACKET);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArrayElementContext extends ParserRuleContext {
		public SingleExpressionContext singleExpression() {
			return getRuleContext(SingleExpressionContext.class,0);
		}
		public ArrayElementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_arrayElement; }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitArrayElement(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ArrayElementContext arrayElement() throws RecognitionException {
		ArrayElementContext _localctx = new ArrayElementContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_arrayElement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(219);
			singleExpression(0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ObjectLiteralContext extends ParserRuleContext {
		public TerminalNode LBRACE() { return getToken(JexLangParser.LBRACE, 0); }
		public TerminalNode RBRACE() { return getToken(JexLangParser.RBRACE, 0); }
		public List<ObjectPropertyContext> objectProperty() {
			return getRuleContexts(ObjectPropertyContext.class);
		}
		public ObjectPropertyContext objectProperty(int i) {
			return getRuleContext(ObjectPropertyContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(JexLangParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(JexLangParser.COMMA, i);
		}
		public ObjectLiteralContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_objectLiteral; }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitObjectLiteral(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ObjectLiteralContext objectLiteral() throws RecognitionException {
		ObjectLiteralContext _localctx = new ObjectLiteralContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_objectLiteral);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(221);
			match(LBRACE);
			setState(230);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 15401752723524L) != 0)) {
				{
				setState(222);
				objectProperty();
				setState(227);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==COMMA) {
					{
					{
					setState(223);
					match(COMMA);
					setState(224);
					objectProperty();
					}
					}
					setState(229);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
			}

			setState(232);
			match(RBRACE);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ObjectPropertyContext extends ParserRuleContext {
		public ObjectPropertyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_objectProperty; }
	 
		public ObjectPropertyContext() { }
		public void copyFrom(ObjectPropertyContext ctx) {
			super.copyFrom(ctx);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ShorthandPropertyExpressionObjectPropertyContext extends ObjectPropertyContext {
		public TerminalNode IDENTIFIER() { return getToken(JexLangParser.IDENTIFIER, 0); }
		public ShorthandPropertyExpressionObjectPropertyContext(ObjectPropertyContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitShorthandPropertyExpressionObjectProperty(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class PropertyExpressionObjectPropertyContext extends ObjectPropertyContext {
		public ObjectPropertyNameContext objectPropertyName() {
			return getRuleContext(ObjectPropertyNameContext.class,0);
		}
		public TerminalNode COLON() { return getToken(JexLangParser.COLON, 0); }
		public SingleExpressionContext singleExpression() {
			return getRuleContext(SingleExpressionContext.class,0);
		}
		public PropertyExpressionObjectPropertyContext(ObjectPropertyContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitPropertyExpressionObjectProperty(this);
			else return visitor.visitChildren(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ComputedPropertyExpressionObjectPropertyContext extends ObjectPropertyContext {
		public TerminalNode LBRACKET() { return getToken(JexLangParser.LBRACKET, 0); }
		public List<SingleExpressionContext> singleExpression() {
			return getRuleContexts(SingleExpressionContext.class);
		}
		public SingleExpressionContext singleExpression(int i) {
			return getRuleContext(SingleExpressionContext.class,i);
		}
		public TerminalNode RBRACKET() { return getToken(JexLangParser.RBRACKET, 0); }
		public TerminalNode COLON() { return getToken(JexLangParser.COLON, 0); }
		public ComputedPropertyExpressionObjectPropertyContext(ObjectPropertyContext ctx) { copyFrom(ctx); }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitComputedPropertyExpressionObjectProperty(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ObjectPropertyContext objectProperty() throws RecognitionException {
		ObjectPropertyContext _localctx = new ObjectPropertyContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_objectProperty);
		try {
			setState(245);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,21,_ctx) ) {
			case 1:
				_localctx = new PropertyExpressionObjectPropertyContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(234);
				objectPropertyName();
				setState(235);
				match(COLON);
				setState(236);
				singleExpression(0);
				}
				break;
			case 2:
				_localctx = new ComputedPropertyExpressionObjectPropertyContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(238);
				match(LBRACKET);
				setState(239);
				singleExpression(0);
				setState(240);
				match(RBRACKET);
				setState(241);
				match(COLON);
				setState(242);
				singleExpression(0);
				}
				break;
			case 3:
				_localctx = new ShorthandPropertyExpressionObjectPropertyContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(244);
				match(IDENTIFIER);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ObjectPropertyNameContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(JexLangParser.IDENTIFIER, 0); }
		public TerminalNode STRING() { return getToken(JexLangParser.STRING, 0); }
		public TerminalNode LET() { return getToken(JexLangParser.LET, 0); }
		public TerminalNode NUMBER() { return getToken(JexLangParser.NUMBER, 0); }
		public TerminalNode NULL() { return getToken(JexLangParser.NULL, 0); }
		public ObjectPropertyNameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_objectPropertyName; }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitObjectPropertyName(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ObjectPropertyNameContext objectPropertyName() throws RecognitionException {
		ObjectPropertyNameContext _localctx = new ObjectPropertyNameContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_objectPropertyName);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(247);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 15393162788932L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArgumentsContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(JexLangParser.LPAREN, 0); }
		public TerminalNode RPAREN() { return getToken(JexLangParser.RPAREN, 0); }
		public List<ArgumentContext> argument() {
			return getRuleContexts(ArgumentContext.class);
		}
		public ArgumentContext argument(int i) {
			return getRuleContext(ArgumentContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(JexLangParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(JexLangParser.COMMA, i);
		}
		public ArgumentsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_arguments; }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitArguments(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ArgumentsContext arguments() throws RecognitionException {
		ArgumentsContext _localctx = new ArgumentsContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_arguments);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(249);
			match(LPAREN);
			setState(261);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 15404443381218L) != 0)) {
				{
				setState(250);
				argument();
				setState(255);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,22,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(251);
						match(COMMA);
						setState(252);
						argument();
						}
						} 
					}
					setState(257);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,22,_ctx);
				}
				setState(259);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==COMMA) {
					{
					setState(258);
					match(COMMA);
					}
				}

				}
			}

			setState(263);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArgumentContext extends ParserRuleContext {
		public SingleExpressionContext singleExpression() {
			return getRuleContext(SingleExpressionContext.class,0);
		}
		public TerminalNode IDENTIFIER() { return getToken(JexLangParser.IDENTIFIER, 0); }
		public ArgumentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_argument; }
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof JexLangVisitor ) return ((JexLangVisitor<? extends T>)visitor).visitArgument(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ArgumentContext argument() throws RecognitionException {
		ArgumentContext _localctx = new ArgumentContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_argument);
		try {
			setState(267);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,25,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(265);
				singleExpression(0);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(266);
				match(IDENTIFIER);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 7:
			return singleExpression_sempred((SingleExpressionContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean singleExpression_sempred(SingleExpressionContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 18);
		case 1:
			return precpred(_ctx, 17);
		case 2:
			return precpred(_ctx, 16);
		case 3:
			return precpred(_ctx, 15);
		case 4:
			return precpred(_ctx, 14);
		case 5:
			return precpred(_ctx, 13);
		case 6:
			return precpred(_ctx, 12);
		case 7:
			return precpred(_ctx, 10);
		case 8:
			return precpred(_ctx, 9);
		case 9:
			return precpred(_ctx, 7);
		case 10:
			return precpred(_ctx, 6);
		case 11:
			return precpred(_ctx, 25);
		case 12:
			return precpred(_ctx, 24);
		case 13:
			return precpred(_ctx, 22);
		case 14:
			return precpred(_ctx, 11);
		}
		return true;
	}

	public static final String _serializedATN =
		"\u0004\u0001.\u010e\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0002"+
		"\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007\u0002"+
		"\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b\u0002"+
		"\f\u0007\f\u0002\r\u0007\r\u0002\u000e\u0007\u000e\u0002\u000f\u0007\u000f"+
		"\u0002\u0010\u0007\u0010\u0001\u0000\u0005\u0000$\b\u0000\n\u0000\f\u0000"+
		"\'\t\u0000\u0001\u0000\u0001\u0000\u0001\u0001\u0001\u0001\u0001\u0001"+
		"\u0001\u0001\u0003\u0001/\b\u0001\u0001\u0002\u0001\u0002\u0005\u0002"+
		"3\b\u0002\n\u0002\f\u00026\t\u0002\u0001\u0002\u0001\u0002\u0001\u0003"+
		"\u0001\u0003\u0001\u0004\u0003\u0004=\b\u0004\u0001\u0004\u0001\u0004"+
		"\u0001\u0004\u0001\u0004\u0003\u0004C\b\u0004\u0001\u0004\u0003\u0004"+
		"F\b\u0004\u0001\u0005\u0001\u0005\u0003\u0005J\b\u0005\u0001\u0006\u0001"+
		"\u0006\u0001\u0006\u0005\u0006O\b\u0006\n\u0006\f\u0006R\t\u0006\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0003"+
		"\u0007f\b\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0003\u0007t\b\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0003\u0007\u00a4\b\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0003\u0007\u00ac\b\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001"+
		"\u0007\u0005\u0007\u00b5\b\u0007\n\u0007\f\u0007\u00b8\t\u0007\u0001\b"+
		"\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0003\b\u00c1\b\b\u0001"+
		"\b\u0001\b\u0003\b\u00c5\b\b\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0001"+
		"\t\u0003\t\u00cd\b\t\u0001\n\u0001\n\u0001\n\u0001\n\u0005\n\u00d3\b\n"+
		"\n\n\f\n\u00d6\t\n\u0003\n\u00d8\b\n\u0001\n\u0001\n\u0001\u000b\u0001"+
		"\u000b\u0001\f\u0001\f\u0001\f\u0001\f\u0005\f\u00e2\b\f\n\f\f\f\u00e5"+
		"\t\f\u0003\f\u00e7\b\f\u0001\f\u0001\f\u0001\r\u0001\r\u0001\r\u0001\r"+
		"\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0003\r\u00f6"+
		"\b\r\u0001\u000e\u0001\u000e\u0001\u000f\u0001\u000f\u0001\u000f\u0001"+
		"\u000f\u0005\u000f\u00fe\b\u000f\n\u000f\f\u000f\u0101\t\u000f\u0001\u000f"+
		"\u0003\u000f\u0104\b\u000f\u0003\u000f\u0106\b\u000f\u0001\u000f\u0001"+
		"\u000f\u0001\u0010\u0001\u0010\u0003\u0010\u010c\b\u0010\u0001\u0010\u0000"+
		"\u0001\u000e\u0011\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014"+
		"\u0016\u0018\u001a\u001c\u001e \u0000\t\u0001\u0000\u0002\u0003\u0001"+
		"\u0000\n\u000b\u0002\u0000\u0001\u0001\r\r\u0001\u0000\u0015\u0016\u0002"+
		"\u0000\f\f\u001a\u001a\u0001\u0000\u0017\u0019\u0002\u0000\u0010\u0011"+
		"\u001b\u001c\u0001\u0000\u000e\u000f\u0003\u0000\u0002\u0002\u0006\u0006"+
		")+\u0132\u0000%\u0001\u0000\u0000\u0000\u0002.\u0001\u0000\u0000\u0000"+
		"\u00040\u0001\u0000\u0000\u0000\u00069\u0001\u0000\u0000\u0000\b<\u0001"+
		"\u0000\u0000\u0000\nG\u0001\u0000\u0000\u0000\fK\u0001\u0000\u0000\u0000"+
		"\u000es\u0001\u0000\u0000\u0000\u0010\u00c4\u0001\u0000\u0000\u0000\u0012"+
		"\u00cc\u0001\u0000\u0000\u0000\u0014\u00ce\u0001\u0000\u0000\u0000\u0016"+
		"\u00db\u0001\u0000\u0000\u0000\u0018\u00dd\u0001\u0000\u0000\u0000\u001a"+
		"\u00f5\u0001\u0000\u0000\u0000\u001c\u00f7\u0001\u0000\u0000\u0000\u001e"+
		"\u00f9\u0001\u0000\u0000\u0000 \u010b\u0001\u0000\u0000\u0000\"$\u0003"+
		"\u0002\u0001\u0000#\"\u0001\u0000\u0000\u0000$\'\u0001\u0000\u0000\u0000"+
		"%#\u0001\u0000\u0000\u0000%&\u0001\u0000\u0000\u0000&(\u0001\u0000\u0000"+
		"\u0000\'%\u0001\u0000\u0000\u0000()\u0005\u0000\u0000\u0001)\u0001\u0001"+
		"\u0000\u0000\u0000*/\u0003\n\u0005\u0000+/\u0003\b\u0004\u0000,/\u0003"+
		"\u0004\u0002\u0000-/\u0003\u0006\u0003\u0000.*\u0001\u0000\u0000\u0000"+
		".+\u0001\u0000\u0000\u0000.,\u0001\u0000\u0000\u0000.-\u0001\u0000\u0000"+
		"\u0000/\u0003\u0001\u0000\u0000\u000004\u0005\u001f\u0000\u000013\u0003"+
		"\u0002\u0001\u000021\u0001\u0000\u0000\u000036\u0001\u0000\u0000\u0000"+
		"42\u0001\u0000\u0000\u000045\u0001\u0000\u0000\u000057\u0001\u0000\u0000"+
		"\u000064\u0001\u0000\u0000\u000078\u0005 \u0000\u00008\u0005\u0001\u0000"+
		"\u0000\u00009:\u0005#\u0000\u0000:\u0007\u0001\u0000\u0000\u0000;=\u0005"+
		"\u0004\u0000\u0000<;\u0001\u0000\u0000\u0000<=\u0001\u0000\u0000\u0000"+
		"=>\u0001\u0000\u0000\u0000>?\u0007\u0000\u0000\u0000?B\u0005*\u0000\u0000"+
		"@A\u0005\u0014\u0000\u0000AC\u0003\u000e\u0007\u0000B@\u0001\u0000\u0000"+
		"\u0000BC\u0001\u0000\u0000\u0000CE\u0001\u0000\u0000\u0000DF\u0005#\u0000"+
		"\u0000ED\u0001\u0000\u0000\u0000EF\u0001\u0000\u0000\u0000F\t\u0001\u0000"+
		"\u0000\u0000GI\u0003\f\u0006\u0000HJ\u0005#\u0000\u0000IH\u0001\u0000"+
		"\u0000\u0000IJ\u0001\u0000\u0000\u0000J\u000b\u0001\u0000\u0000\u0000"+
		"KP\u0003\u000e\u0007\u0000LM\u0005$\u0000\u0000MO\u0003\u000e\u0007\u0000"+
		"NL\u0001\u0000\u0000\u0000OR\u0001\u0000\u0000\u0000PN\u0001\u0000\u0000"+
		"\u0000PQ\u0001\u0000\u0000\u0000Q\r\u0001\u0000\u0000\u0000RP\u0001\u0000"+
		"\u0000\u0000ST\u0006\u0007\uffff\uffff\u0000TU\u0005*\u0000\u0000Ut\u0003"+
		"\u001e\u000f\u0000VW\u0007\u0001\u0000\u0000Wt\u0003\u000e\u0007\u0015"+
		"XY\u0007\u0002\u0000\u0000Yt\u0003\u000e\u0007\u0014Z[\u0007\u0003\u0000"+
		"\u0000[t\u0003\u000e\u0007\u0013\\]\u0005*\u0000\u0000]^\u0005\u0014\u0000"+
		"\u0000^t\u0003\u000e\u0007\b_`\u0005\b\u0000\u0000`a\u0005\u001d\u0000"+
		"\u0000ab\u0003\f\u0006\u0000bc\u0005\u001e\u0000\u0000ce\u0003\u0004\u0002"+
		"\u0000df\u0003\u0010\b\u0000ed\u0001\u0000\u0000\u0000ef\u0001\u0000\u0000"+
		"\u0000ft\u0001\u0000\u0000\u0000gh\u0005\u0007\u0000\u0000hi\u0005\u001d"+
		"\u0000\u0000ij\u0003\f\u0006\u0000jk\u0005\u001e\u0000\u0000kl\u0003\u0004"+
		"\u0002\u0000lt\u0001\u0000\u0000\u0000mn\u0005\u001d\u0000\u0000no\u0003"+
		"\f\u0006\u0000op\u0005\u001e\u0000\u0000pt\u0001\u0000\u0000\u0000qt\u0003"+
		"\u0012\t\u0000rt\u0005*\u0000\u0000sS\u0001\u0000\u0000\u0000sV\u0001"+
		"\u0000\u0000\u0000sX\u0001\u0000\u0000\u0000sZ\u0001\u0000\u0000\u0000"+
		"s\\\u0001\u0000\u0000\u0000s_\u0001\u0000\u0000\u0000sg\u0001\u0000\u0000"+
		"\u0000sm\u0001\u0000\u0000\u0000sq\u0001\u0000\u0000\u0000sr\u0001\u0000"+
		"\u0000\u0000t\u00b6\u0001\u0000\u0000\u0000uv\n\u0012\u0000\u0000vw\u0007"+
		"\u0004\u0000\u0000w\u00b5\u0003\u000e\u0007\u0012xy\n\u0011\u0000\u0000"+
		"yz\u0007\u0005\u0000\u0000z\u00b5\u0003\u000e\u0007\u0012{|\n\u0010\u0000"+
		"\u0000|}\u0007\u0003\u0000\u0000}\u00b5\u0003\u000e\u0007\u0011~\u007f"+
		"\n\u000f\u0000\u0000\u007f\u0080\u0007\u0006\u0000\u0000\u0080\u00b5\u0003"+
		"\u000e\u0007\u0010\u0081\u0082\n\u000e\u0000\u0000\u0082\u0083\u0007\u0007"+
		"\u0000\u0000\u0083\u00b5\u0003\u000e\u0007\u000f\u0084\u0085\n\r\u0000"+
		"\u0000\u0085\u0086\u0005\u0012\u0000\u0000\u0086\u00b5\u0003\u000e\u0007"+
		"\u000e\u0087\u0088\n\f\u0000\u0000\u0088\u0089\u0005\u0013\u0000\u0000"+
		"\u0089\u00b5\u0003\u000e\u0007\r\u008a\u008b\n\n\u0000\u0000\u008b\u008c"+
		"\u0005\'\u0000\u0000\u008c\u008d\u0003\u000e\u0007\u0000\u008d\u008e\u0005"+
		"(\u0000\u0000\u008e\u008f\u0003\u000e\u0007\n\u008f\u00b5\u0001\u0000"+
		"\u0000\u0000\u0090\u0091\n\t\u0000\u0000\u0091\u0092\u0005\'\u0000\u0000"+
		"\u0092\u0093\u0005(\u0000\u0000\u0093\u00b5\u0003\u000e\u0007\n\u0094"+
		"\u0095\n\u0007\u0000\u0000\u0095\u0096\u0005!\u0000\u0000\u0096\u0097"+
		"\u0003\f\u0006\u0000\u0097\u0098\u0005\"\u0000\u0000\u0098\u0099\u0005"+
		"\u0014\u0000\u0000\u0099\u009a\u0003\u000e\u0007\u0007\u009a\u00b5\u0001"+
		"\u0000\u0000\u0000\u009b\u009c\n\u0006\u0000\u0000\u009c\u009d\u0005%"+
		"\u0000\u0000\u009d\u009e\u0003\u001c\u000e\u0000\u009e\u009f\u0005\u0014"+
		"\u0000\u0000\u009f\u00a0\u0003\u000e\u0007\u0006\u00a0\u00b5\u0001\u0000"+
		"\u0000\u0000\u00a1\u00a3\n\u0019\u0000\u0000\u00a2\u00a4\u0005\'\u0000"+
		"\u0000\u00a3\u00a2\u0001\u0000\u0000\u0000\u00a3\u00a4\u0001\u0000\u0000"+
		"\u0000\u00a4\u00a5\u0001\u0000\u0000\u0000\u00a5\u00a6\u0005!\u0000\u0000"+
		"\u00a6\u00a7\u0003\f\u0006\u0000\u00a7\u00a8\u0005\"\u0000\u0000\u00a8"+
		"\u00b5\u0001\u0000\u0000\u0000\u00a9\u00ab\n\u0018\u0000\u0000\u00aa\u00ac"+
		"\u0005\'\u0000\u0000\u00ab\u00aa\u0001\u0000\u0000\u0000\u00ab\u00ac\u0001"+
		"\u0000\u0000\u0000\u00ac\u00ad\u0001\u0000\u0000\u0000\u00ad\u00ae\u0005"+
		"%\u0000\u0000\u00ae\u00b5\u0003\u001c\u000e\u0000\u00af\u00b0\n\u0016"+
		"\u0000\u0000\u00b0\u00b5\u0007\u0001\u0000\u0000\u00b1\u00b2\n\u000b\u0000"+
		"\u0000\u00b2\u00b3\u0005&\u0000\u0000\u00b3\u00b5\u0005*\u0000\u0000\u00b4"+
		"u\u0001\u0000\u0000\u0000\u00b4x\u0001\u0000\u0000\u0000\u00b4{\u0001"+
		"\u0000\u0000\u0000\u00b4~\u0001\u0000\u0000\u0000\u00b4\u0081\u0001\u0000"+
		"\u0000\u0000\u00b4\u0084\u0001\u0000\u0000\u0000\u00b4\u0087\u0001\u0000"+
		"\u0000\u0000\u00b4\u008a\u0001\u0000\u0000\u0000\u00b4\u0090\u0001\u0000"+
		"\u0000\u0000\u00b4\u0094\u0001\u0000\u0000\u0000\u00b4\u009b\u0001\u0000"+
		"\u0000\u0000\u00b4\u00a1\u0001\u0000\u0000\u0000\u00b4\u00a9\u0001\u0000"+
		"\u0000\u0000\u00b4\u00af\u0001\u0000\u0000\u0000\u00b4\u00b1\u0001\u0000"+
		"\u0000\u0000\u00b5\u00b8\u0001\u0000\u0000\u0000\u00b6\u00b4\u0001\u0000"+
		"\u0000\u0000\u00b6\u00b7\u0001\u0000\u0000\u0000\u00b7\u000f\u0001\u0000"+
		"\u0000\u0000\u00b8\u00b6\u0001\u0000\u0000\u0000\u00b9\u00ba\u0005\t\u0000"+
		"\u0000\u00ba\u00bb\u0005\b\u0000\u0000\u00bb\u00bc\u0005\u001d\u0000\u0000"+
		"\u00bc\u00bd\u0003\f\u0006\u0000\u00bd\u00be\u0005\u001e\u0000\u0000\u00be"+
		"\u00c0\u0003\u0004\u0002\u0000\u00bf\u00c1\u0003\u0010\b\u0000\u00c0\u00bf"+
		"\u0001\u0000\u0000\u0000\u00c0\u00c1\u0001\u0000\u0000\u0000\u00c1\u00c5"+
		"\u0001\u0000\u0000\u0000\u00c2\u00c3\u0005\t\u0000\u0000\u00c3\u00c5\u0003"+
		"\u0004\u0002\u0000\u00c4\u00b9\u0001\u0000\u0000\u0000\u00c4\u00c2\u0001"+
		"\u0000\u0000\u0000\u00c5\u0011\u0001\u0000\u0000\u0000\u00c6\u00cd\u0005"+
		"+\u0000\u0000\u00c7\u00cd\u0005)\u0000\u0000\u00c8\u00cd\u0005\u0005\u0000"+
		"\u0000\u00c9\u00cd\u0005\u0006\u0000\u0000\u00ca\u00cd\u0003\u0014\n\u0000"+
		"\u00cb\u00cd\u0003\u0018\f\u0000\u00cc\u00c6\u0001\u0000\u0000\u0000\u00cc"+
		"\u00c7\u0001\u0000\u0000\u0000\u00cc\u00c8\u0001\u0000\u0000\u0000\u00cc"+
		"\u00c9\u0001\u0000\u0000\u0000\u00cc\u00ca\u0001\u0000\u0000\u0000\u00cc"+
		"\u00cb\u0001\u0000\u0000\u0000\u00cd\u0013\u0001\u0000\u0000\u0000\u00ce"+
		"\u00d7\u0005!\u0000\u0000\u00cf\u00d4\u0003\u0016\u000b\u0000\u00d0\u00d1"+
		"\u0005$\u0000\u0000\u00d1\u00d3\u0003\u0016\u000b\u0000\u00d2\u00d0\u0001"+
		"\u0000\u0000\u0000\u00d3\u00d6\u0001\u0000\u0000\u0000\u00d4\u00d2\u0001"+
		"\u0000\u0000\u0000\u00d4\u00d5\u0001\u0000\u0000\u0000\u00d5\u00d8\u0001"+
		"\u0000\u0000\u0000\u00d6\u00d4\u0001\u0000\u0000\u0000\u00d7\u00cf\u0001"+
		"\u0000\u0000\u0000\u00d7\u00d8\u0001\u0000\u0000\u0000\u00d8\u00d9\u0001"+
		"\u0000\u0000\u0000\u00d9\u00da\u0005\"\u0000\u0000\u00da\u0015\u0001\u0000"+
		"\u0000\u0000\u00db\u00dc\u0003\u000e\u0007\u0000\u00dc\u0017\u0001\u0000"+
		"\u0000\u0000\u00dd\u00e6\u0005\u001f\u0000\u0000\u00de\u00e3\u0003\u001a"+
		"\r\u0000\u00df\u00e0\u0005$\u0000\u0000\u00e0\u00e2\u0003\u001a\r\u0000"+
		"\u00e1\u00df\u0001\u0000\u0000\u0000\u00e2\u00e5\u0001\u0000\u0000\u0000"+
		"\u00e3\u00e1\u0001\u0000\u0000\u0000\u00e3\u00e4\u0001\u0000\u0000\u0000"+
		"\u00e4\u00e7\u0001\u0000\u0000\u0000\u00e5\u00e3\u0001\u0000\u0000\u0000"+
		"\u00e6\u00de\u0001\u0000\u0000\u0000\u00e6\u00e7\u0001\u0000\u0000\u0000"+
		"\u00e7\u00e8\u0001\u0000\u0000\u0000\u00e8\u00e9\u0005 \u0000\u0000\u00e9"+
		"\u0019\u0001\u0000\u0000\u0000\u00ea\u00eb\u0003\u001c\u000e\u0000\u00eb"+
		"\u00ec\u0005(\u0000\u0000\u00ec\u00ed\u0003\u000e\u0007\u0000\u00ed\u00f6"+
		"\u0001\u0000\u0000\u0000\u00ee\u00ef\u0005!\u0000\u0000\u00ef\u00f0\u0003"+
		"\u000e\u0007\u0000\u00f0\u00f1\u0005\"\u0000\u0000\u00f1\u00f2\u0005("+
		"\u0000\u0000\u00f2\u00f3\u0003\u000e\u0007\u0000\u00f3\u00f6\u0001\u0000"+
		"\u0000\u0000\u00f4\u00f6\u0005*\u0000\u0000\u00f5\u00ea\u0001\u0000\u0000"+
		"\u0000\u00f5\u00ee\u0001\u0000\u0000\u0000\u00f5\u00f4\u0001\u0000\u0000"+
		"\u0000\u00f6\u001b\u0001\u0000\u0000\u0000\u00f7\u00f8\u0007\b\u0000\u0000"+
		"\u00f8\u001d\u0001\u0000\u0000\u0000\u00f9\u0105\u0005\u001d\u0000\u0000"+
		"\u00fa\u00ff\u0003 \u0010\u0000\u00fb\u00fc\u0005$\u0000\u0000\u00fc\u00fe"+
		"\u0003 \u0010\u0000\u00fd\u00fb\u0001\u0000\u0000\u0000\u00fe\u0101\u0001"+
		"\u0000\u0000\u0000\u00ff\u00fd\u0001\u0000\u0000\u0000\u00ff\u0100\u0001"+
		"\u0000\u0000\u0000\u0100\u0103\u0001\u0000\u0000\u0000\u0101\u00ff\u0001"+
		"\u0000\u0000\u0000\u0102\u0104\u0005$\u0000\u0000\u0103\u0102\u0001\u0000"+
		"\u0000\u0000\u0103\u0104\u0001\u0000\u0000\u0000\u0104\u0106\u0001\u0000"+
		"\u0000\u0000\u0105\u00fa\u0001\u0000\u0000\u0000\u0105\u0106\u0001\u0000"+
		"\u0000\u0000\u0106\u0107\u0001\u0000\u0000\u0000\u0107\u0108\u0005\u001e"+
		"\u0000\u0000\u0108\u001f\u0001\u0000\u0000\u0000\u0109\u010c\u0003\u000e"+
		"\u0007\u0000\u010a\u010c\u0005*\u0000\u0000\u010b\u0109\u0001\u0000\u0000"+
		"\u0000\u010b\u010a\u0001\u0000\u0000\u0000\u010c!\u0001\u0000\u0000\u0000"+
		"\u001a%.4<BEIPes\u00a3\u00ab\u00b4\u00b6\u00c0\u00c4\u00cc\u00d4\u00d7"+
		"\u00e3\u00e6\u00f5\u00ff\u0103\u0105\u010b";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}
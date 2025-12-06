// Generated from JexLang.g4 by ANTLR 4.13.2
import Antlr4

open class JexLangParser: Parser {

	internal static var _decisionToDFA: [DFA] = {
          var decisionToDFA = [DFA]()
          let length = JexLangParser._ATN.getNumberOfDecisions()
          for i in 0..<length {
            decisionToDFA.append(DFA(JexLangParser._ATN.getDecisionState(i)!, i))
           }
           return decisionToDFA
     }()

	internal static let _sharedContextCache = PredictionContextCache()

	public
	enum Tokens: Int {
		case EOF = -1, T__0 = 1, LET = 2, CONST = 3, GLOBAL = 4, BOOLEAN = 5, 
                 NULL = 6, REPEAT = 7, IF = 8, ELSE = 9, INCREMENT = 10, 
                 DECREMENT = 11, POW = 12, SQRT = 13, EQ = 14, NEQ = 15, 
                 LTE = 16, GTE = 17, AND = 18, OR = 19, ASSIGN = 20, PLUS = 21, 
                 MINUS = 22, MULTIPLY = 23, DIVIDE = 24, MODULO = 25, POWER = 26, 
                 LT = 27, GT = 28, NOT = 29, LPAREN = 30, RPAREN = 31, LBRACE = 32, 
                 RBRACE = 33, LBRACKET = 34, RBRACKET = 35, SEMICOLON = 36, 
                 COMMA = 37, DOT = 38, PIPE = 39, QUESTION = 40, COLON = 41, 
                 NUMBER = 42, IDENTIFIER = 43, STRING = 44, WS = 45, LINE_COMMENT = 46, 
                 BLOCK_COMMENT = 47
	}

	public
	static let RULE_program = 0, RULE_statement = 1, RULE_block = 2, RULE_emptyStatement = 3, 
            RULE_varDeclaration = 4, RULE_expressionStatement = 5, RULE_expressionSequence = 6, 
            RULE_singleExpression = 7, RULE_elseIfStatement = 8, RULE_literal = 9, 
            RULE_arrayLiteral = 10, RULE_arrayElement = 11, RULE_objectLiteral = 12, 
            RULE_objectProperty = 13, RULE_objectPropertyName = 14, RULE_arguments = 15, 
            RULE_argument = 16

	public
	static let ruleNames: [String] = [
		"program", "statement", "block", "emptyStatement", "varDeclaration", "expressionStatement", 
		"expressionSequence", "singleExpression", "elseIfStatement", "literal", 
		"arrayLiteral", "arrayElement", "objectLiteral", "objectProperty", "objectPropertyName", 
		"arguments", "argument"
	]

	private static let _LITERAL_NAMES: [String?] = [
		nil, "'sqrt'", "'let'", "'const'", "'global'", nil, "'null'", "'repeat'", 
		"'if'", "'else'", "'++'", "'--'", "'**'", "'\\u{221A}'", "'=='", "'!='", 
		"'<='", "'>='", nil, nil, "'='", "'+'", "'-'", "'*'", "'/'", "'%'", "'^'", 
		"'<'", "'>'", "'!'", "'('", "')'", "'{'", "'}'", "'['", "']'", "';'", 
		"','", "'.'", "'|'", "'?'", "':'"
	]
	private static let _SYMBOLIC_NAMES: [String?] = [
		nil, nil, "LET", "CONST", "GLOBAL", "BOOLEAN", "NULL", "REPEAT", "IF", 
		"ELSE", "INCREMENT", "DECREMENT", "POW", "SQRT", "EQ", "NEQ", "LTE", "GTE", 
		"AND", "OR", "ASSIGN", "PLUS", "MINUS", "MULTIPLY", "DIVIDE", "MODULO", 
		"POWER", "LT", "GT", "NOT", "LPAREN", "RPAREN", "LBRACE", "RBRACE", "LBRACKET", 
		"RBRACKET", "SEMICOLON", "COMMA", "DOT", "PIPE", "QUESTION", "COLON", 
		"NUMBER", "IDENTIFIER", "STRING", "WS", "LINE_COMMENT", "BLOCK_COMMENT"
	]
	public
	static let VOCABULARY = Vocabulary(_LITERAL_NAMES, _SYMBOLIC_NAMES)

	override open
	func getGrammarFileName() -> String { return "JexLang.g4" }

	override open
	func getRuleNames() -> [String] { return JexLangParser.ruleNames }

	override open
	func getSerializedATN() -> [Int] { return JexLangParser._serializedATN }

	override open
	func getATN() -> ATN { return JexLangParser._ATN }


	override open
	func getVocabulary() -> Vocabulary {
	    return JexLangParser.VOCABULARY
	}

	override public
	init(_ input:TokenStream) throws {
	    RuntimeMetaData.checkVersion("4.13.2", RuntimeMetaData.VERSION)
		try super.init(input)
		_interp = ParserATNSimulator(self,JexLangParser._ATN,JexLangParser._decisionToDFA, JexLangParser._sharedContextCache)
	}


	public class ProgramContext: ParserRuleContext {
			open
			func EOF() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.EOF.rawValue, 0)
			}
			open
			func statement() -> [StatementContext] {
				return getRuleContexts(StatementContext.self)
			}
			open
			func statement(_ i: Int) -> StatementContext? {
				return getRuleContext(StatementContext.self, i)
			}
		override open
		func getRuleIndex() -> Int {
			return JexLangParser.RULE_program
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitProgram(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitProgram(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	@discardableResult
	 open func program() throws -> ProgramContext {
		var _localctx: ProgramContext
		_localctx = ProgramContext(_ctx, getState())
		try enterRule(_localctx, 0, JexLangParser.RULE_program)
		var _la: Int = 0
		defer {
	    		try! exitRule()
	    }
		do {
		 	try enterOuterAlt(_localctx, 1)
		 	setState(37)
		 	try _errHandler.sync(self)
		 	_la = try _input.LA(1)
		 	while (((Int64(_la) & ~0x3f) == 0 && ((Int64(1) << _la) & 30878136806910) != 0)) {
		 		setState(34)
		 		try statement()


		 		setState(39)
		 		try _errHandler.sync(self)
		 		_la = try _input.LA(1)
		 	}
		 	setState(40)
		 	try match(JexLangParser.Tokens.EOF.rawValue)

		}
		catch ANTLRException.recognition(let re) {
			_localctx.exception = re
			_errHandler.reportError(self, re)
			try _errHandler.recover(self, re)
		}

		return _localctx
	}

	public class StatementContext: ParserRuleContext {
			open
			func expressionStatement() -> ExpressionStatementContext? {
				return getRuleContext(ExpressionStatementContext.self, 0)
			}
			open
			func varDeclaration() -> VarDeclarationContext? {
				return getRuleContext(VarDeclarationContext.self, 0)
			}
			open
			func block() -> BlockContext? {
				return getRuleContext(BlockContext.self, 0)
			}
			open
			func emptyStatement() -> EmptyStatementContext? {
				return getRuleContext(EmptyStatementContext.self, 0)
			}
		override open
		func getRuleIndex() -> Int {
			return JexLangParser.RULE_statement
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitStatement(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitStatement(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	@discardableResult
	 open func statement() throws -> StatementContext {
		var _localctx: StatementContext
		_localctx = StatementContext(_ctx, getState())
		try enterRule(_localctx, 2, JexLangParser.RULE_statement)
		defer {
	    		try! exitRule()
	    }
		do {
		 	setState(46)
		 	try _errHandler.sync(self)
		 	switch(try getInterpreter().adaptivePredict(_input,1, _ctx)) {
		 	case 1:
		 		try enterOuterAlt(_localctx, 1)
		 		setState(42)
		 		try expressionStatement()

		 		break
		 	case 2:
		 		try enterOuterAlt(_localctx, 2)
		 		setState(43)
		 		try varDeclaration()

		 		break
		 	case 3:
		 		try enterOuterAlt(_localctx, 3)
		 		setState(44)
		 		try block()

		 		break
		 	case 4:
		 		try enterOuterAlt(_localctx, 4)
		 		setState(45)
		 		try emptyStatement()

		 		break
		 	default: break
		 	}
		}
		catch ANTLRException.recognition(let re) {
			_localctx.exception = re
			_errHandler.reportError(self, re)
			try _errHandler.recover(self, re)
		}

		return _localctx
	}

	public class BlockContext: ParserRuleContext {
			open
			func LBRACE() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.LBRACE.rawValue, 0)
			}
			open
			func RBRACE() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.RBRACE.rawValue, 0)
			}
			open
			func statement() -> [StatementContext] {
				return getRuleContexts(StatementContext.self)
			}
			open
			func statement(_ i: Int) -> StatementContext? {
				return getRuleContext(StatementContext.self, i)
			}
		override open
		func getRuleIndex() -> Int {
			return JexLangParser.RULE_block
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitBlock(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitBlock(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	@discardableResult
	 open func block() throws -> BlockContext {
		var _localctx: BlockContext
		_localctx = BlockContext(_ctx, getState())
		try enterRule(_localctx, 4, JexLangParser.RULE_block)
		var _la: Int = 0
		defer {
	    		try! exitRule()
	    }
		do {
		 	try enterOuterAlt(_localctx, 1)
		 	setState(48)
		 	try match(JexLangParser.Tokens.LBRACE.rawValue)
		 	setState(52)
		 	try _errHandler.sync(self)
		 	_la = try _input.LA(1)
		 	while (((Int64(_la) & ~0x3f) == 0 && ((Int64(1) << _la) & 30878136806910) != 0)) {
		 		setState(49)
		 		try statement()


		 		setState(54)
		 		try _errHandler.sync(self)
		 		_la = try _input.LA(1)
		 	}
		 	setState(55)
		 	try match(JexLangParser.Tokens.RBRACE.rawValue)

		}
		catch ANTLRException.recognition(let re) {
			_localctx.exception = re
			_errHandler.reportError(self, re)
			try _errHandler.recover(self, re)
		}

		return _localctx
	}

	public class EmptyStatementContext: ParserRuleContext {
			open
			func SEMICOLON() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.SEMICOLON.rawValue, 0)
			}
		override open
		func getRuleIndex() -> Int {
			return JexLangParser.RULE_emptyStatement
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitEmptyStatement(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitEmptyStatement(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	@discardableResult
	 open func emptyStatement() throws -> EmptyStatementContext {
		var _localctx: EmptyStatementContext
		_localctx = EmptyStatementContext(_ctx, getState())
		try enterRule(_localctx, 6, JexLangParser.RULE_emptyStatement)
		defer {
	    		try! exitRule()
	    }
		do {
		 	try enterOuterAlt(_localctx, 1)
		 	setState(57)
		 	try match(JexLangParser.Tokens.SEMICOLON.rawValue)

		}
		catch ANTLRException.recognition(let re) {
			_localctx.exception = re
			_errHandler.reportError(self, re)
			try _errHandler.recover(self, re)
		}

		return _localctx
	}

	public class VarDeclarationContext: ParserRuleContext {
			open
			func IDENTIFIER() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.IDENTIFIER.rawValue, 0)
			}
			open
			func LET() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.LET.rawValue, 0)
			}
			open
			func CONST() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.CONST.rawValue, 0)
			}
			open
			func GLOBAL() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.GLOBAL.rawValue, 0)
			}
			open
			func ASSIGN() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.ASSIGN.rawValue, 0)
			}
			open
			func singleExpression() -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, 0)
			}
			open
			func SEMICOLON() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.SEMICOLON.rawValue, 0)
			}
		override open
		func getRuleIndex() -> Int {
			return JexLangParser.RULE_varDeclaration
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitVarDeclaration(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitVarDeclaration(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	@discardableResult
	 open func varDeclaration() throws -> VarDeclarationContext {
		var _localctx: VarDeclarationContext
		_localctx = VarDeclarationContext(_ctx, getState())
		try enterRule(_localctx, 8, JexLangParser.RULE_varDeclaration)
		var _la: Int = 0
		defer {
	    		try! exitRule()
	    }
		do {
		 	try enterOuterAlt(_localctx, 1)
		 	setState(60)
		 	try _errHandler.sync(self)
		 	_la = try _input.LA(1)
		 	if (_la == JexLangParser.Tokens.GLOBAL.rawValue) {
		 		setState(59)
		 		try match(JexLangParser.Tokens.GLOBAL.rawValue)

		 	}

		 	setState(62)
		 	_la = try _input.LA(1)
		 	if (!(_la == JexLangParser.Tokens.LET.rawValue || _la == JexLangParser.Tokens.CONST.rawValue)) {
		 	try _errHandler.recoverInline(self)
		 	}
		 	else {
		 		_errHandler.reportMatch(self)
		 		try consume()
		 	}
		 	setState(63)
		 	try match(JexLangParser.Tokens.IDENTIFIER.rawValue)
		 	setState(66)
		 	try _errHandler.sync(self)
		 	_la = try _input.LA(1)
		 	if (_la == JexLangParser.Tokens.ASSIGN.rawValue) {
		 		setState(64)
		 		try match(JexLangParser.Tokens.ASSIGN.rawValue)
		 		setState(65)
		 		try singleExpression(0)

		 	}

		 	setState(69)
		 	try _errHandler.sync(self)
		 	switch (try getInterpreter().adaptivePredict(_input,5,_ctx)) {
		 	case 1:
		 		setState(68)
		 		try match(JexLangParser.Tokens.SEMICOLON.rawValue)

		 		break
		 	default: break
		 	}

		}
		catch ANTLRException.recognition(let re) {
			_localctx.exception = re
			_errHandler.reportError(self, re)
			try _errHandler.recover(self, re)
		}

		return _localctx
	}

	public class ExpressionStatementContext: ParserRuleContext {
			open
			func expressionSequence() -> ExpressionSequenceContext? {
				return getRuleContext(ExpressionSequenceContext.self, 0)
			}
			open
			func SEMICOLON() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.SEMICOLON.rawValue, 0)
			}
		override open
		func getRuleIndex() -> Int {
			return JexLangParser.RULE_expressionStatement
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitExpressionStatement(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitExpressionStatement(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	@discardableResult
	 open func expressionStatement() throws -> ExpressionStatementContext {
		var _localctx: ExpressionStatementContext
		_localctx = ExpressionStatementContext(_ctx, getState())
		try enterRule(_localctx, 10, JexLangParser.RULE_expressionStatement)
		defer {
	    		try! exitRule()
	    }
		do {
		 	try enterOuterAlt(_localctx, 1)
		 	setState(71)
		 	try expressionSequence()
		 	setState(73)
		 	try _errHandler.sync(self)
		 	switch (try getInterpreter().adaptivePredict(_input,6,_ctx)) {
		 	case 1:
		 		setState(72)
		 		try match(JexLangParser.Tokens.SEMICOLON.rawValue)

		 		break
		 	default: break
		 	}

		}
		catch ANTLRException.recognition(let re) {
			_localctx.exception = re
			_errHandler.reportError(self, re)
			try _errHandler.recover(self, re)
		}

		return _localctx
	}

	public class ExpressionSequenceContext: ParserRuleContext {
			open
			func singleExpression() -> [SingleExpressionContext] {
				return getRuleContexts(SingleExpressionContext.self)
			}
			open
			func singleExpression(_ i: Int) -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, i)
			}
			open
			func COMMA() -> [TerminalNode] {
				return getTokens(JexLangParser.Tokens.COMMA.rawValue)
			}
			open
			func COMMA(_ i:Int) -> TerminalNode? {
				return getToken(JexLangParser.Tokens.COMMA.rawValue, i)
			}
		override open
		func getRuleIndex() -> Int {
			return JexLangParser.RULE_expressionSequence
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitExpressionSequence(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitExpressionSequence(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	@discardableResult
	 open func expressionSequence() throws -> ExpressionSequenceContext {
		var _localctx: ExpressionSequenceContext
		_localctx = ExpressionSequenceContext(_ctx, getState())
		try enterRule(_localctx, 12, JexLangParser.RULE_expressionSequence)
		var _la: Int = 0
		defer {
	    		try! exitRule()
	    }
		do {
		 	try enterOuterAlt(_localctx, 1)
		 	setState(75)
		 	try singleExpression(0)
		 	setState(80)
		 	try _errHandler.sync(self)
		 	_la = try _input.LA(1)
		 	while (_la == JexLangParser.Tokens.COMMA.rawValue) {
		 		setState(76)
		 		try match(JexLangParser.Tokens.COMMA.rawValue)
		 		setState(77)
		 		try singleExpression(0)


		 		setState(82)
		 		try _errHandler.sync(self)
		 		_la = try _input.LA(1)
		 	}

		}
		catch ANTLRException.recognition(let re) {
			_localctx.exception = re
			_errHandler.reportError(self, re)
			try _errHandler.recover(self, re)
		}

		return _localctx
	}


	public class SingleExpressionContext: ParserRuleContext {
		override open
		func getRuleIndex() -> Int {
			return JexLangParser.RULE_singleExpression
		}
	}
	public class ShortTernaryExpressionContext: SingleExpressionContext {
			open
			func singleExpression() -> [SingleExpressionContext] {
				return getRuleContexts(SingleExpressionContext.self)
			}
			open
			func singleExpression(_ i: Int) -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, i)
			}
			open
			func QUESTION() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.QUESTION.rawValue, 0)
			}
			open
			func COLON() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.COLON.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitShortTernaryExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitShortTernaryExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class TernaryExpressionContext: SingleExpressionContext {
			open
			func singleExpression() -> [SingleExpressionContext] {
				return getRuleContexts(SingleExpressionContext.self)
			}
			open
			func singleExpression(_ i: Int) -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, i)
			}
			open
			func QUESTION() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.QUESTION.rawValue, 0)
			}
			open
			func COLON() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.COLON.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitTernaryExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitTernaryExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class LogicalAndExpressionContext: SingleExpressionContext {
			open
			func singleExpression() -> [SingleExpressionContext] {
				return getRuleContexts(SingleExpressionContext.self)
			}
			open
			func singleExpression(_ i: Int) -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, i)
			}
			open
			func AND() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.AND.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitLogicalAndExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitLogicalAndExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class PowerExpressionContext: SingleExpressionContext {
			open
			func singleExpression() -> [SingleExpressionContext] {
				return getRuleContexts(SingleExpressionContext.self)
			}
			open
			func singleExpression(_ i: Int) -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, i)
			}
			open
			func POW() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.POW.rawValue, 0)
			}
			open
			func POWER() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.POWER.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitPowerExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitPowerExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class LogicalOrExpressionContext: SingleExpressionContext {
			open
			func singleExpression() -> [SingleExpressionContext] {
				return getRuleContexts(SingleExpressionContext.self)
			}
			open
			func singleExpression(_ i: Int) -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, i)
			}
			open
			func OR() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.OR.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitLogicalOrExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitLogicalOrExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class UnaryExpressionContext: SingleExpressionContext {
			open
			func singleExpression() -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, 0)
			}
			open
			func PLUS() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.PLUS.rawValue, 0)
			}
			open
			func MINUS() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.MINUS.rawValue, 0)
			}
			open
			func NOT() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.NOT.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitUnaryExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitUnaryExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class FunctionCallExpressionContext: SingleExpressionContext {
			open
			func IDENTIFIER() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.IDENTIFIER.rawValue, 0)
			}
			open
			func arguments() -> ArgumentsContext? {
				return getRuleContext(ArgumentsContext.self, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitFunctionCallExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitFunctionCallExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class AssignmentExpressionContext: SingleExpressionContext {
			open
			func IDENTIFIER() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.IDENTIFIER.rawValue, 0)
			}
			open
			func ASSIGN() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.ASSIGN.rawValue, 0)
			}
			open
			func singleExpression() -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitAssignmentExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitAssignmentExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class EqualityExpressionContext: SingleExpressionContext {
			open
			func singleExpression() -> [SingleExpressionContext] {
				return getRuleContexts(SingleExpressionContext.self)
			}
			open
			func singleExpression(_ i: Int) -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, i)
			}
			open
			func EQ() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.EQ.rawValue, 0)
			}
			open
			func NEQ() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.NEQ.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitEqualityExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitEqualityExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class MultiplicativeExpressionContext: SingleExpressionContext {
			open
			func singleExpression() -> [SingleExpressionContext] {
				return getRuleContexts(SingleExpressionContext.self)
			}
			open
			func singleExpression(_ i: Int) -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, i)
			}
			open
			func MULTIPLY() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.MULTIPLY.rawValue, 0)
			}
			open
			func DIVIDE() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.DIVIDE.rawValue, 0)
			}
			open
			func MODULO() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.MODULO.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitMultiplicativeExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitMultiplicativeExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class ParenthesizedExpressionContext: SingleExpressionContext {
			open
			func LPAREN() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.LPAREN.rawValue, 0)
			}
			open
			func expressionSequence() -> ExpressionSequenceContext? {
				return getRuleContext(ExpressionSequenceContext.self, 0)
			}
			open
			func RPAREN() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.RPAREN.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitParenthesizedExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitParenthesizedExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class IfExpressionContext: SingleExpressionContext {
			open
			func IF() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.IF.rawValue, 0)
			}
			open
			func LPAREN() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.LPAREN.rawValue, 0)
			}
			open
			func expressionSequence() -> ExpressionSequenceContext? {
				return getRuleContext(ExpressionSequenceContext.self, 0)
			}
			open
			func RPAREN() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.RPAREN.rawValue, 0)
			}
			open
			func block() -> BlockContext? {
				return getRuleContext(BlockContext.self, 0)
			}
			open
			func elseIfStatement() -> ElseIfStatementContext? {
				return getRuleContext(ElseIfStatementContext.self, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitIfExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitIfExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class AdditiveExpressionContext: SingleExpressionContext {
			open
			func singleExpression() -> [SingleExpressionContext] {
				return getRuleContexts(SingleExpressionContext.self)
			}
			open
			func singleExpression(_ i: Int) -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, i)
			}
			open
			func PLUS() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.PLUS.rawValue, 0)
			}
			open
			func MINUS() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.MINUS.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitAdditiveExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitAdditiveExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class RelationalExpressionContext: SingleExpressionContext {
			open
			func singleExpression() -> [SingleExpressionContext] {
				return getRuleContexts(SingleExpressionContext.self)
			}
			open
			func singleExpression(_ i: Int) -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, i)
			}
			open
			func LT() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.LT.rawValue, 0)
			}
			open
			func GT() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.GT.rawValue, 0)
			}
			open
			func LTE() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.LTE.rawValue, 0)
			}
			open
			func GTE() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.GTE.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitRelationalExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitRelationalExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class BracketPropertyAssignmentContext: SingleExpressionContext {
			open
			func singleExpression() -> [SingleExpressionContext] {
				return getRuleContexts(SingleExpressionContext.self)
			}
			open
			func singleExpression(_ i: Int) -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, i)
			}
			open
			func LBRACKET() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.LBRACKET.rawValue, 0)
			}
			open
			func expressionSequence() -> ExpressionSequenceContext? {
				return getRuleContext(ExpressionSequenceContext.self, 0)
			}
			open
			func RBRACKET() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.RBRACKET.rawValue, 0)
			}
			open
			func ASSIGN() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.ASSIGN.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitBracketPropertyAssignment(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitBracketPropertyAssignment(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class DotPropertyAssignmentContext: SingleExpressionContext {
			open
			func singleExpression() -> [SingleExpressionContext] {
				return getRuleContexts(SingleExpressionContext.self)
			}
			open
			func singleExpression(_ i: Int) -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, i)
			}
			open
			func DOT() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.DOT.rawValue, 0)
			}
			open
			func objectPropertyName() -> ObjectPropertyNameContext? {
				return getRuleContext(ObjectPropertyNameContext.self, 0)
			}
			open
			func ASSIGN() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.ASSIGN.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitDotPropertyAssignment(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitDotPropertyAssignment(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class LiteralExpressionContext: SingleExpressionContext {
			open
			func literal() -> LiteralContext? {
				return getRuleContext(LiteralContext.self, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitLiteralExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitLiteralExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class MemberDotExpressionContext: SingleExpressionContext {
			open
			func singleExpression() -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, 0)
			}
			open
			func DOT() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.DOT.rawValue, 0)
			}
			open
			func objectPropertyName() -> ObjectPropertyNameContext? {
				return getRuleContext(ObjectPropertyNameContext.self, 0)
			}
			open
			func QUESTION() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.QUESTION.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitMemberDotExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitMemberDotExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class MemberIndexExpressionContext: SingleExpressionContext {
			open
			func singleExpression() -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, 0)
			}
			open
			func LBRACKET() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.LBRACKET.rawValue, 0)
			}
			open
			func expressionSequence() -> ExpressionSequenceContext? {
				return getRuleContext(ExpressionSequenceContext.self, 0)
			}
			open
			func RBRACKET() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.RBRACKET.rawValue, 0)
			}
			open
			func QUESTION() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.QUESTION.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitMemberIndexExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitMemberIndexExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class IdentifierExpressionContext: SingleExpressionContext {
			open
			func IDENTIFIER() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.IDENTIFIER.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitIdentifierExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitIdentifierExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class RepeatExpressionContext: SingleExpressionContext {
			open
			func REPEAT() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.REPEAT.rawValue, 0)
			}
			open
			func LPAREN() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.LPAREN.rawValue, 0)
			}
			open
			func expressionSequence() -> ExpressionSequenceContext? {
				return getRuleContext(ExpressionSequenceContext.self, 0)
			}
			open
			func RPAREN() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.RPAREN.rawValue, 0)
			}
			open
			func block() -> BlockContext? {
				return getRuleContext(BlockContext.self, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitRepeatExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitRepeatExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class TransformExpressionContext: SingleExpressionContext {
			open
			func singleExpression() -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, 0)
			}
			open
			func PIPE() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.PIPE.rawValue, 0)
			}
			open
			func IDENTIFIER() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.IDENTIFIER.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitTransformExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitTransformExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class PrefixExpressionContext: SingleExpressionContext {
			open
			func singleExpression() -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, 0)
			}
			open
			func INCREMENT() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.INCREMENT.rawValue, 0)
			}
			open
			func DECREMENT() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.DECREMENT.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitPrefixExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitPrefixExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class PostfixExpressionContext: SingleExpressionContext {
			open
			func singleExpression() -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, 0)
			}
			open
			func INCREMENT() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.INCREMENT.rawValue, 0)
			}
			open
			func DECREMENT() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.DECREMENT.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitPostfixExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitPostfixExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class SquareRootExpressionContext: SingleExpressionContext {
			open
			func singleExpression() -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, 0)
			}
			open
			func SQRT() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.SQRT.rawValue, 0)
			}

		public
		init(_ ctx: SingleExpressionContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitSquareRootExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitSquareRootExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}

	 public final  func singleExpression( ) throws -> SingleExpressionContext   {
		return try singleExpression(0)
	}
	@discardableResult
	private func singleExpression(_ _p: Int) throws -> SingleExpressionContext   {
		let _parentctx: ParserRuleContext? = _ctx
		let _parentState: Int = getState()
		var _localctx: SingleExpressionContext
		_localctx = SingleExpressionContext(_ctx, _parentState)
		var _prevctx: SingleExpressionContext = _localctx
		let _startState: Int = 14
		try enterRecursionRule(_localctx, 14, JexLangParser.RULE_singleExpression, _p)
		var _la: Int = 0
		defer {
	    		try! unrollRecursionContexts(_parentctx)
	    }
		do {
			var _alt: Int
			try enterOuterAlt(_localctx, 1)
			setState(115)
			try _errHandler.sync(self)
			switch(try getInterpreter().adaptivePredict(_input,9, _ctx)) {
			case 1:
				_localctx = FunctionCallExpressionContext(_localctx)
				_ctx = _localctx
				_prevctx = _localctx

				setState(84)
				try match(JexLangParser.Tokens.IDENTIFIER.rawValue)
				setState(85)
				try arguments()

				break
			case 2:
				_localctx = PrefixExpressionContext(_localctx)
				_ctx = _localctx
				_prevctx = _localctx
				setState(86)
				_la = try _input.LA(1)
				if (!(_la == JexLangParser.Tokens.INCREMENT.rawValue || _la == JexLangParser.Tokens.DECREMENT.rawValue)) {
				try _errHandler.recoverInline(self)
				}
				else {
					_errHandler.reportMatch(self)
					try consume()
				}
				setState(87)
				try singleExpression(21)

				break
			case 3:
				_localctx = SquareRootExpressionContext(_localctx)
				_ctx = _localctx
				_prevctx = _localctx
				setState(88)
				_la = try _input.LA(1)
				if (!(_la == JexLangParser.Tokens.T__0.rawValue || _la == JexLangParser.Tokens.SQRT.rawValue)) {
				try _errHandler.recoverInline(self)
				}
				else {
					_errHandler.reportMatch(self)
					try consume()
				}
				setState(89)
				try singleExpression(20)

				break
			case 4:
				_localctx = UnaryExpressionContext(_localctx)
				_ctx = _localctx
				_prevctx = _localctx
				setState(90)
				_la = try _input.LA(1)
				if (!(((Int64(_la) & ~0x3f) == 0 && ((Int64(1) << _la) & 543162368) != 0))) {
				try _errHandler.recoverInline(self)
				}
				else {
					_errHandler.reportMatch(self)
					try consume()
				}
				setState(91)
				try singleExpression(19)

				break
			case 5:
				_localctx = AssignmentExpressionContext(_localctx)
				_ctx = _localctx
				_prevctx = _localctx
				setState(92)
				try match(JexLangParser.Tokens.IDENTIFIER.rawValue)
				setState(93)
				try match(JexLangParser.Tokens.ASSIGN.rawValue)
				setState(94)
				try singleExpression(8)

				break
			case 6:
				_localctx = IfExpressionContext(_localctx)
				_ctx = _localctx
				_prevctx = _localctx
				setState(95)
				try match(JexLangParser.Tokens.IF.rawValue)
				setState(96)
				try match(JexLangParser.Tokens.LPAREN.rawValue)
				setState(97)
				try expressionSequence()
				setState(98)
				try match(JexLangParser.Tokens.RPAREN.rawValue)
				setState(99)
				try block()
				setState(101)
				try _errHandler.sync(self)
				switch (try getInterpreter().adaptivePredict(_input,8,_ctx)) {
				case 1:
					setState(100)
					try elseIfStatement()

					break
				default: break
				}

				break
			case 7:
				_localctx = RepeatExpressionContext(_localctx)
				_ctx = _localctx
				_prevctx = _localctx
				setState(103)
				try match(JexLangParser.Tokens.REPEAT.rawValue)
				setState(104)
				try match(JexLangParser.Tokens.LPAREN.rawValue)
				setState(105)
				try expressionSequence()
				setState(106)
				try match(JexLangParser.Tokens.RPAREN.rawValue)
				setState(107)
				try block()

				break
			case 8:
				_localctx = ParenthesizedExpressionContext(_localctx)
				_ctx = _localctx
				_prevctx = _localctx
				setState(109)
				try match(JexLangParser.Tokens.LPAREN.rawValue)
				setState(110)
				try expressionSequence()
				setState(111)
				try match(JexLangParser.Tokens.RPAREN.rawValue)

				break
			case 9:
				_localctx = LiteralExpressionContext(_localctx)
				_ctx = _localctx
				_prevctx = _localctx
				setState(113)
				try literal()

				break
			case 10:
				_localctx = IdentifierExpressionContext(_localctx)
				_ctx = _localctx
				_prevctx = _localctx
				setState(114)
				try match(JexLangParser.Tokens.IDENTIFIER.rawValue)

				break
			default: break
			}
			_ctx!.stop = try _input.LT(-1)
			setState(182)
			try _errHandler.sync(self)
			_alt = try getInterpreter().adaptivePredict(_input,13,_ctx)
			while (_alt != 2 && _alt != ATN.INVALID_ALT_NUMBER) {
				if ( _alt==1 ) {
					if _parseListeners != nil {
					   try triggerExitRuleEvent()
					}
					_prevctx = _localctx
					setState(180)
					try _errHandler.sync(self)
					switch(try getInterpreter().adaptivePredict(_input,12, _ctx)) {
					case 1:
						_localctx = PowerExpressionContext(  SingleExpressionContext(_parentctx, _parentState))
						try pushNewRecursionContext(_localctx, _startState, JexLangParser.RULE_singleExpression)
						setState(117)
						if (!(precpred(_ctx, 18))) {
						    throw ANTLRException.recognition(e:FailedPredicateException(self, "precpred(_ctx, 18)"))
						}
						setState(118)
						_la = try _input.LA(1)
						if (!(_la == JexLangParser.Tokens.POW.rawValue || _la == JexLangParser.Tokens.POWER.rawValue)) {
						try _errHandler.recoverInline(self)
						}
						else {
							_errHandler.reportMatch(self)
							try consume()
						}
						setState(119)
						try singleExpression(18)

						break
					case 2:
						_localctx = MultiplicativeExpressionContext(  SingleExpressionContext(_parentctx, _parentState))
						try pushNewRecursionContext(_localctx, _startState, JexLangParser.RULE_singleExpression)
						setState(120)
						if (!(precpred(_ctx, 17))) {
						    throw ANTLRException.recognition(e:FailedPredicateException(self, "precpred(_ctx, 17)"))
						}
						setState(121)
						_la = try _input.LA(1)
						if (!(((Int64(_la) & ~0x3f) == 0 && ((Int64(1) << _la) & 58720256) != 0))) {
						try _errHandler.recoverInline(self)
						}
						else {
							_errHandler.reportMatch(self)
							try consume()
						}
						setState(122)
						try singleExpression(18)

						break
					case 3:
						_localctx = AdditiveExpressionContext(  SingleExpressionContext(_parentctx, _parentState))
						try pushNewRecursionContext(_localctx, _startState, JexLangParser.RULE_singleExpression)
						setState(123)
						if (!(precpred(_ctx, 16))) {
						    throw ANTLRException.recognition(e:FailedPredicateException(self, "precpred(_ctx, 16)"))
						}
						setState(124)
						_la = try _input.LA(1)
						if (!(_la == JexLangParser.Tokens.PLUS.rawValue || _la == JexLangParser.Tokens.MINUS.rawValue)) {
						try _errHandler.recoverInline(self)
						}
						else {
							_errHandler.reportMatch(self)
							try consume()
						}
						setState(125)
						try singleExpression(17)

						break
					case 4:
						_localctx = RelationalExpressionContext(  SingleExpressionContext(_parentctx, _parentState))
						try pushNewRecursionContext(_localctx, _startState, JexLangParser.RULE_singleExpression)
						setState(126)
						if (!(precpred(_ctx, 15))) {
						    throw ANTLRException.recognition(e:FailedPredicateException(self, "precpred(_ctx, 15)"))
						}
						setState(127)
						_la = try _input.LA(1)
						if (!(((Int64(_la) & ~0x3f) == 0 && ((Int64(1) << _la) & 402849792) != 0))) {
						try _errHandler.recoverInline(self)
						}
						else {
							_errHandler.reportMatch(self)
							try consume()
						}
						setState(128)
						try singleExpression(16)

						break
					case 5:
						_localctx = EqualityExpressionContext(  SingleExpressionContext(_parentctx, _parentState))
						try pushNewRecursionContext(_localctx, _startState, JexLangParser.RULE_singleExpression)
						setState(129)
						if (!(precpred(_ctx, 14))) {
						    throw ANTLRException.recognition(e:FailedPredicateException(self, "precpred(_ctx, 14)"))
						}
						setState(130)
						_la = try _input.LA(1)
						if (!(_la == JexLangParser.Tokens.EQ.rawValue || _la == JexLangParser.Tokens.NEQ.rawValue)) {
						try _errHandler.recoverInline(self)
						}
						else {
							_errHandler.reportMatch(self)
							try consume()
						}
						setState(131)
						try singleExpression(15)

						break
					case 6:
						_localctx = LogicalAndExpressionContext(  SingleExpressionContext(_parentctx, _parentState))
						try pushNewRecursionContext(_localctx, _startState, JexLangParser.RULE_singleExpression)
						setState(132)
						if (!(precpred(_ctx, 13))) {
						    throw ANTLRException.recognition(e:FailedPredicateException(self, "precpred(_ctx, 13)"))
						}
						setState(133)
						try match(JexLangParser.Tokens.AND.rawValue)
						setState(134)
						try singleExpression(14)

						break
					case 7:
						_localctx = LogicalOrExpressionContext(  SingleExpressionContext(_parentctx, _parentState))
						try pushNewRecursionContext(_localctx, _startState, JexLangParser.RULE_singleExpression)
						setState(135)
						if (!(precpred(_ctx, 12))) {
						    throw ANTLRException.recognition(e:FailedPredicateException(self, "precpred(_ctx, 12)"))
						}
						setState(136)
						try match(JexLangParser.Tokens.OR.rawValue)
						setState(137)
						try singleExpression(13)

						break
					case 8:
						_localctx = TernaryExpressionContext(  SingleExpressionContext(_parentctx, _parentState))
						try pushNewRecursionContext(_localctx, _startState, JexLangParser.RULE_singleExpression)
						setState(138)
						if (!(precpred(_ctx, 10))) {
						    throw ANTLRException.recognition(e:FailedPredicateException(self, "precpred(_ctx, 10)"))
						}
						setState(139)
						try match(JexLangParser.Tokens.QUESTION.rawValue)
						setState(140)
						try singleExpression(0)
						setState(141)
						try match(JexLangParser.Tokens.COLON.rawValue)
						setState(142)
						try singleExpression(10)

						break
					case 9:
						_localctx = ShortTernaryExpressionContext(  SingleExpressionContext(_parentctx, _parentState))
						try pushNewRecursionContext(_localctx, _startState, JexLangParser.RULE_singleExpression)
						setState(144)
						if (!(precpred(_ctx, 9))) {
						    throw ANTLRException.recognition(e:FailedPredicateException(self, "precpred(_ctx, 9)"))
						}
						setState(145)
						try match(JexLangParser.Tokens.QUESTION.rawValue)
						setState(146)
						try match(JexLangParser.Tokens.COLON.rawValue)
						setState(147)
						try singleExpression(10)

						break
					case 10:
						_localctx = BracketPropertyAssignmentContext(  SingleExpressionContext(_parentctx, _parentState))
						try pushNewRecursionContext(_localctx, _startState, JexLangParser.RULE_singleExpression)
						setState(148)
						if (!(precpred(_ctx, 7))) {
						    throw ANTLRException.recognition(e:FailedPredicateException(self, "precpred(_ctx, 7)"))
						}
						setState(149)
						try match(JexLangParser.Tokens.LBRACKET.rawValue)
						setState(150)
						try expressionSequence()
						setState(151)
						try match(JexLangParser.Tokens.RBRACKET.rawValue)
						setState(152)
						try match(JexLangParser.Tokens.ASSIGN.rawValue)
						setState(153)
						try singleExpression(7)

						break
					case 11:
						_localctx = DotPropertyAssignmentContext(  SingleExpressionContext(_parentctx, _parentState))
						try pushNewRecursionContext(_localctx, _startState, JexLangParser.RULE_singleExpression)
						setState(155)
						if (!(precpred(_ctx, 6))) {
						    throw ANTLRException.recognition(e:FailedPredicateException(self, "precpred(_ctx, 6)"))
						}
						setState(156)
						try match(JexLangParser.Tokens.DOT.rawValue)
						setState(157)
						try objectPropertyName()
						setState(158)
						try match(JexLangParser.Tokens.ASSIGN.rawValue)
						setState(159)
						try singleExpression(6)

						break
					case 12:
						_localctx = MemberIndexExpressionContext(  SingleExpressionContext(_parentctx, _parentState))
						try pushNewRecursionContext(_localctx, _startState, JexLangParser.RULE_singleExpression)
						setState(161)
						if (!(precpred(_ctx, 25))) {
						    throw ANTLRException.recognition(e:FailedPredicateException(self, "precpred(_ctx, 25)"))
						}
						setState(163)
						try _errHandler.sync(self)
						_la = try _input.LA(1)
						if (_la == JexLangParser.Tokens.QUESTION.rawValue) {
							setState(162)
							try match(JexLangParser.Tokens.QUESTION.rawValue)

						}

						setState(165)
						try match(JexLangParser.Tokens.LBRACKET.rawValue)
						setState(166)
						try expressionSequence()
						setState(167)
						try match(JexLangParser.Tokens.RBRACKET.rawValue)

						break
					case 13:
						_localctx = MemberDotExpressionContext(  SingleExpressionContext(_parentctx, _parentState))
						try pushNewRecursionContext(_localctx, _startState, JexLangParser.RULE_singleExpression)
						setState(169)
						if (!(precpred(_ctx, 24))) {
						    throw ANTLRException.recognition(e:FailedPredicateException(self, "precpred(_ctx, 24)"))
						}
						setState(171)
						try _errHandler.sync(self)
						_la = try _input.LA(1)
						if (_la == JexLangParser.Tokens.QUESTION.rawValue) {
							setState(170)
							try match(JexLangParser.Tokens.QUESTION.rawValue)

						}

						setState(173)
						try match(JexLangParser.Tokens.DOT.rawValue)
						setState(174)
						try objectPropertyName()

						break
					case 14:
						_localctx = PostfixExpressionContext(  SingleExpressionContext(_parentctx, _parentState))
						try pushNewRecursionContext(_localctx, _startState, JexLangParser.RULE_singleExpression)
						setState(175)
						if (!(precpred(_ctx, 22))) {
						    throw ANTLRException.recognition(e:FailedPredicateException(self, "precpred(_ctx, 22)"))
						}
						setState(176)
						_la = try _input.LA(1)
						if (!(_la == JexLangParser.Tokens.INCREMENT.rawValue || _la == JexLangParser.Tokens.DECREMENT.rawValue)) {
						try _errHandler.recoverInline(self)
						}
						else {
							_errHandler.reportMatch(self)
							try consume()
						}

						break
					case 15:
						_localctx = TransformExpressionContext(  SingleExpressionContext(_parentctx, _parentState))
						try pushNewRecursionContext(_localctx, _startState, JexLangParser.RULE_singleExpression)
						setState(177)
						if (!(precpred(_ctx, 11))) {
						    throw ANTLRException.recognition(e:FailedPredicateException(self, "precpred(_ctx, 11)"))
						}
						setState(178)
						try match(JexLangParser.Tokens.PIPE.rawValue)
						setState(179)
						try match(JexLangParser.Tokens.IDENTIFIER.rawValue)

						break
					default: break
					}
			 
				}
				setState(184)
				try _errHandler.sync(self)
				_alt = try getInterpreter().adaptivePredict(_input,13,_ctx)
			}

		}
		catch ANTLRException.recognition(let re) {
			_localctx.exception = re
			_errHandler.reportError(self, re)
			try _errHandler.recover(self, re)
		}

		return _localctx;
	}

	public class ElseIfStatementContext: ParserRuleContext {
		override open
		func getRuleIndex() -> Int {
			return JexLangParser.RULE_elseIfStatement
		}
	}
	public class ElseClauseContext: ElseIfStatementContext {
			open
			func ELSE() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.ELSE.rawValue, 0)
			}
			open
			func block() -> BlockContext? {
				return getRuleContext(BlockContext.self, 0)
			}

		public
		init(_ ctx: ElseIfStatementContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitElseClause(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitElseClause(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class ElseIfClauseContext: ElseIfStatementContext {
			open
			func ELSE() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.ELSE.rawValue, 0)
			}
			open
			func IF() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.IF.rawValue, 0)
			}
			open
			func LPAREN() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.LPAREN.rawValue, 0)
			}
			open
			func expressionSequence() -> ExpressionSequenceContext? {
				return getRuleContext(ExpressionSequenceContext.self, 0)
			}
			open
			func RPAREN() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.RPAREN.rawValue, 0)
			}
			open
			func block() -> BlockContext? {
				return getRuleContext(BlockContext.self, 0)
			}
			open
			func elseIfStatement() -> ElseIfStatementContext? {
				return getRuleContext(ElseIfStatementContext.self, 0)
			}

		public
		init(_ ctx: ElseIfStatementContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitElseIfClause(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitElseIfClause(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	@discardableResult
	 open func elseIfStatement() throws -> ElseIfStatementContext {
		var _localctx: ElseIfStatementContext
		_localctx = ElseIfStatementContext(_ctx, getState())
		try enterRule(_localctx, 16, JexLangParser.RULE_elseIfStatement)
		defer {
	    		try! exitRule()
	    }
		do {
		 	setState(196)
		 	try _errHandler.sync(self)
		 	switch(try getInterpreter().adaptivePredict(_input,15, _ctx)) {
		 	case 1:
		 		_localctx =  ElseIfClauseContext(_localctx);
		 		try enterOuterAlt(_localctx, 1)
		 		setState(185)
		 		try match(JexLangParser.Tokens.ELSE.rawValue)
		 		setState(186)
		 		try match(JexLangParser.Tokens.IF.rawValue)
		 		setState(187)
		 		try match(JexLangParser.Tokens.LPAREN.rawValue)
		 		setState(188)
		 		try expressionSequence()
		 		setState(189)
		 		try match(JexLangParser.Tokens.RPAREN.rawValue)
		 		setState(190)
		 		try block()
		 		setState(192)
		 		try _errHandler.sync(self)
		 		switch (try getInterpreter().adaptivePredict(_input,14,_ctx)) {
		 		case 1:
		 			setState(191)
		 			try elseIfStatement()

		 			break
		 		default: break
		 		}

		 		break
		 	case 2:
		 		_localctx =  ElseClauseContext(_localctx);
		 		try enterOuterAlt(_localctx, 2)
		 		setState(194)
		 		try match(JexLangParser.Tokens.ELSE.rawValue)
		 		setState(195)
		 		try block()

		 		break
		 	default: break
		 	}
		}
		catch ANTLRException.recognition(let re) {
			_localctx.exception = re
			_errHandler.reportError(self, re)
			try _errHandler.recover(self, re)
		}

		return _localctx
	}

	public class LiteralContext: ParserRuleContext {
		override open
		func getRuleIndex() -> Int {
			return JexLangParser.RULE_literal
		}
	}
	public class StringLiteralContext: LiteralContext {
			open
			func STRING() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.STRING.rawValue, 0)
			}

		public
		init(_ ctx: LiteralContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitStringLiteral(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitStringLiteral(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class ObjectLiteralExpressionContext: LiteralContext {
			open
			func objectLiteral() -> ObjectLiteralContext? {
				return getRuleContext(ObjectLiteralContext.self, 0)
			}

		public
		init(_ ctx: LiteralContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitObjectLiteralExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitObjectLiteralExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class BooleanLiteralContext: LiteralContext {
			open
			func BOOLEAN() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.BOOLEAN.rawValue, 0)
			}

		public
		init(_ ctx: LiteralContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitBooleanLiteral(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitBooleanLiteral(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class ArrayLiteralExpressionContext: LiteralContext {
			open
			func arrayLiteral() -> ArrayLiteralContext? {
				return getRuleContext(ArrayLiteralContext.self, 0)
			}

		public
		init(_ ctx: LiteralContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitArrayLiteralExpression(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitArrayLiteralExpression(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class NullLiteralContext: LiteralContext {
			open
			func NULL() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.NULL.rawValue, 0)
			}

		public
		init(_ ctx: LiteralContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitNullLiteral(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitNullLiteral(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class NumberLiteralContext: LiteralContext {
			open
			func NUMBER() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.NUMBER.rawValue, 0)
			}

		public
		init(_ ctx: LiteralContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitNumberLiteral(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitNumberLiteral(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	@discardableResult
	 open func literal() throws -> LiteralContext {
		var _localctx: LiteralContext
		_localctx = LiteralContext(_ctx, getState())
		try enterRule(_localctx, 18, JexLangParser.RULE_literal)
		defer {
	    		try! exitRule()
	    }
		do {
		 	setState(204)
		 	try _errHandler.sync(self)
		 	switch (JexLangParser.Tokens(rawValue: try _input.LA(1))!) {
		 	case .STRING:
		 		_localctx =  StringLiteralContext(_localctx);
		 		try enterOuterAlt(_localctx, 1)
		 		setState(198)
		 		try match(JexLangParser.Tokens.STRING.rawValue)

		 		break

		 	case .NUMBER:
		 		_localctx =  NumberLiteralContext(_localctx);
		 		try enterOuterAlt(_localctx, 2)
		 		setState(199)
		 		try match(JexLangParser.Tokens.NUMBER.rawValue)

		 		break

		 	case .BOOLEAN:
		 		_localctx =  BooleanLiteralContext(_localctx);
		 		try enterOuterAlt(_localctx, 3)
		 		setState(200)
		 		try match(JexLangParser.Tokens.BOOLEAN.rawValue)

		 		break

		 	case .NULL:
		 		_localctx =  NullLiteralContext(_localctx);
		 		try enterOuterAlt(_localctx, 4)
		 		setState(201)
		 		try match(JexLangParser.Tokens.NULL.rawValue)

		 		break

		 	case .LBRACKET:
		 		_localctx =  ArrayLiteralExpressionContext(_localctx);
		 		try enterOuterAlt(_localctx, 5)
		 		setState(202)
		 		try arrayLiteral()

		 		break

		 	case .LBRACE:
		 		_localctx =  ObjectLiteralExpressionContext(_localctx);
		 		try enterOuterAlt(_localctx, 6)
		 		setState(203)
		 		try objectLiteral()

		 		break
		 	default:
		 		throw ANTLRException.recognition(e: NoViableAltException(self))
		 	}
		}
		catch ANTLRException.recognition(let re) {
			_localctx.exception = re
			_errHandler.reportError(self, re)
			try _errHandler.recover(self, re)
		}

		return _localctx
	}

	public class ArrayLiteralContext: ParserRuleContext {
			open
			func LBRACKET() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.LBRACKET.rawValue, 0)
			}
			open
			func RBRACKET() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.RBRACKET.rawValue, 0)
			}
			open
			func arrayElement() -> [ArrayElementContext] {
				return getRuleContexts(ArrayElementContext.self)
			}
			open
			func arrayElement(_ i: Int) -> ArrayElementContext? {
				return getRuleContext(ArrayElementContext.self, i)
			}
			open
			func COMMA() -> [TerminalNode] {
				return getTokens(JexLangParser.Tokens.COMMA.rawValue)
			}
			open
			func COMMA(_ i:Int) -> TerminalNode? {
				return getToken(JexLangParser.Tokens.COMMA.rawValue, i)
			}
		override open
		func getRuleIndex() -> Int {
			return JexLangParser.RULE_arrayLiteral
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitArrayLiteral(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitArrayLiteral(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	@discardableResult
	 open func arrayLiteral() throws -> ArrayLiteralContext {
		var _localctx: ArrayLiteralContext
		_localctx = ArrayLiteralContext(_ctx, getState())
		try enterRule(_localctx, 20, JexLangParser.RULE_arrayLiteral)
		var _la: Int = 0
		defer {
	    		try! exitRule()
	    }
		do {
		 	try enterOuterAlt(_localctx, 1)
		 	setState(206)
		 	try match(JexLangParser.Tokens.LBRACKET.rawValue)
		 	setState(215)
		 	try _errHandler.sync(self)
		 	_la = try _input.LA(1)
		 	if (((Int64(_la) & ~0x3f) == 0 && ((Int64(1) << _la) & 30809417330146) != 0)) {
		 		setState(207)
		 		try arrayElement()
		 		setState(212)
		 		try _errHandler.sync(self)
		 		_la = try _input.LA(1)
		 		while (_la == JexLangParser.Tokens.COMMA.rawValue) {
		 			setState(208)
		 			try match(JexLangParser.Tokens.COMMA.rawValue)
		 			setState(209)
		 			try arrayElement()


		 			setState(214)
		 			try _errHandler.sync(self)
		 			_la = try _input.LA(1)
		 		}

		 	}

		 	setState(217)
		 	try match(JexLangParser.Tokens.RBRACKET.rawValue)

		}
		catch ANTLRException.recognition(let re) {
			_localctx.exception = re
			_errHandler.reportError(self, re)
			try _errHandler.recover(self, re)
		}

		return _localctx
	}

	public class ArrayElementContext: ParserRuleContext {
			open
			func singleExpression() -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, 0)
			}
		override open
		func getRuleIndex() -> Int {
			return JexLangParser.RULE_arrayElement
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitArrayElement(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitArrayElement(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	@discardableResult
	 open func arrayElement() throws -> ArrayElementContext {
		var _localctx: ArrayElementContext
		_localctx = ArrayElementContext(_ctx, getState())
		try enterRule(_localctx, 22, JexLangParser.RULE_arrayElement)
		defer {
	    		try! exitRule()
	    }
		do {
		 	try enterOuterAlt(_localctx, 1)
		 	setState(219)
		 	try singleExpression(0)

		}
		catch ANTLRException.recognition(let re) {
			_localctx.exception = re
			_errHandler.reportError(self, re)
			try _errHandler.recover(self, re)
		}

		return _localctx
	}

	public class ObjectLiteralContext: ParserRuleContext {
			open
			func LBRACE() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.LBRACE.rawValue, 0)
			}
			open
			func RBRACE() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.RBRACE.rawValue, 0)
			}
			open
			func objectProperty() -> [ObjectPropertyContext] {
				return getRuleContexts(ObjectPropertyContext.self)
			}
			open
			func objectProperty(_ i: Int) -> ObjectPropertyContext? {
				return getRuleContext(ObjectPropertyContext.self, i)
			}
			open
			func COMMA() -> [TerminalNode] {
				return getTokens(JexLangParser.Tokens.COMMA.rawValue)
			}
			open
			func COMMA(_ i:Int) -> TerminalNode? {
				return getToken(JexLangParser.Tokens.COMMA.rawValue, i)
			}
		override open
		func getRuleIndex() -> Int {
			return JexLangParser.RULE_objectLiteral
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitObjectLiteral(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitObjectLiteral(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	@discardableResult
	 open func objectLiteral() throws -> ObjectLiteralContext {
		var _localctx: ObjectLiteralContext
		_localctx = ObjectLiteralContext(_ctx, getState())
		try enterRule(_localctx, 24, JexLangParser.RULE_objectLiteral)
		var _la: Int = 0
		defer {
	    		try! exitRule()
	    }
		do {
		 	try enterOuterAlt(_localctx, 1)
		 	setState(221)
		 	try match(JexLangParser.Tokens.LBRACE.rawValue)
		 	setState(230)
		 	try _errHandler.sync(self)
		 	_la = try _input.LA(1)
		 	if (((Int64(_la) & ~0x3f) == 0 && ((Int64(1) << _la) & 30803505446980) != 0)) {
		 		setState(222)
		 		try objectProperty()
		 		setState(227)
		 		try _errHandler.sync(self)
		 		_la = try _input.LA(1)
		 		while (_la == JexLangParser.Tokens.COMMA.rawValue) {
		 			setState(223)
		 			try match(JexLangParser.Tokens.COMMA.rawValue)
		 			setState(224)
		 			try objectProperty()


		 			setState(229)
		 			try _errHandler.sync(self)
		 			_la = try _input.LA(1)
		 		}

		 	}

		 	setState(232)
		 	try match(JexLangParser.Tokens.RBRACE.rawValue)

		}
		catch ANTLRException.recognition(let re) {
			_localctx.exception = re
			_errHandler.reportError(self, re)
			try _errHandler.recover(self, re)
		}

		return _localctx
	}

	public class ObjectPropertyContext: ParserRuleContext {
		override open
		func getRuleIndex() -> Int {
			return JexLangParser.RULE_objectProperty
		}
	}
	public class ShorthandPropertyExpressionObjectPropertyContext: ObjectPropertyContext {
			open
			func IDENTIFIER() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.IDENTIFIER.rawValue, 0)
			}

		public
		init(_ ctx: ObjectPropertyContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitShorthandPropertyExpressionObjectProperty(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitShorthandPropertyExpressionObjectProperty(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class PropertyExpressionObjectPropertyContext: ObjectPropertyContext {
			open
			func objectPropertyName() -> ObjectPropertyNameContext? {
				return getRuleContext(ObjectPropertyNameContext.self, 0)
			}
			open
			func COLON() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.COLON.rawValue, 0)
			}
			open
			func singleExpression() -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, 0)
			}

		public
		init(_ ctx: ObjectPropertyContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitPropertyExpressionObjectProperty(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitPropertyExpressionObjectProperty(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	public class ComputedPropertyExpressionObjectPropertyContext: ObjectPropertyContext {
			open
			func LBRACKET() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.LBRACKET.rawValue, 0)
			}
			open
			func singleExpression() -> [SingleExpressionContext] {
				return getRuleContexts(SingleExpressionContext.self)
			}
			open
			func singleExpression(_ i: Int) -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, i)
			}
			open
			func RBRACKET() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.RBRACKET.rawValue, 0)
			}
			open
			func COLON() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.COLON.rawValue, 0)
			}

		public
		init(_ ctx: ObjectPropertyContext) {
			super.init()
			copyFrom(ctx)
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitComputedPropertyExpressionObjectProperty(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitComputedPropertyExpressionObjectProperty(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	@discardableResult
	 open func objectProperty() throws -> ObjectPropertyContext {
		var _localctx: ObjectPropertyContext
		_localctx = ObjectPropertyContext(_ctx, getState())
		try enterRule(_localctx, 26, JexLangParser.RULE_objectProperty)
		defer {
	    		try! exitRule()
	    }
		do {
		 	setState(245)
		 	try _errHandler.sync(self)
		 	switch(try getInterpreter().adaptivePredict(_input,21, _ctx)) {
		 	case 1:
		 		_localctx =  PropertyExpressionObjectPropertyContext(_localctx);
		 		try enterOuterAlt(_localctx, 1)
		 		setState(234)
		 		try objectPropertyName()
		 		setState(235)
		 		try match(JexLangParser.Tokens.COLON.rawValue)
		 		setState(236)
		 		try singleExpression(0)

		 		break
		 	case 2:
		 		_localctx =  ComputedPropertyExpressionObjectPropertyContext(_localctx);
		 		try enterOuterAlt(_localctx, 2)
		 		setState(238)
		 		try match(JexLangParser.Tokens.LBRACKET.rawValue)
		 		setState(239)
		 		try singleExpression(0)
		 		setState(240)
		 		try match(JexLangParser.Tokens.RBRACKET.rawValue)
		 		setState(241)
		 		try match(JexLangParser.Tokens.COLON.rawValue)
		 		setState(242)
		 		try singleExpression(0)

		 		break
		 	case 3:
		 		_localctx =  ShorthandPropertyExpressionObjectPropertyContext(_localctx);
		 		try enterOuterAlt(_localctx, 3)
		 		setState(244)
		 		try match(JexLangParser.Tokens.IDENTIFIER.rawValue)

		 		break
		 	default: break
		 	}
		}
		catch ANTLRException.recognition(let re) {
			_localctx.exception = re
			_errHandler.reportError(self, re)
			try _errHandler.recover(self, re)
		}

		return _localctx
	}

	public class ObjectPropertyNameContext: ParserRuleContext {
			open
			func IDENTIFIER() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.IDENTIFIER.rawValue, 0)
			}
			open
			func STRING() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.STRING.rawValue, 0)
			}
			open
			func LET() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.LET.rawValue, 0)
			}
			open
			func NUMBER() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.NUMBER.rawValue, 0)
			}
			open
			func NULL() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.NULL.rawValue, 0)
			}
		override open
		func getRuleIndex() -> Int {
			return JexLangParser.RULE_objectPropertyName
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitObjectPropertyName(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitObjectPropertyName(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	@discardableResult
	 open func objectPropertyName() throws -> ObjectPropertyNameContext {
		var _localctx: ObjectPropertyNameContext
		_localctx = ObjectPropertyNameContext(_ctx, getState())
		try enterRule(_localctx, 28, JexLangParser.RULE_objectPropertyName)
		var _la: Int = 0
		defer {
	    		try! exitRule()
	    }
		do {
		 	try enterOuterAlt(_localctx, 1)
		 	setState(247)
		 	_la = try _input.LA(1)
		 	if (!(((Int64(_la) & ~0x3f) == 0 && ((Int64(1) << _la) & 30786325577796) != 0))) {
		 	try _errHandler.recoverInline(self)
		 	}
		 	else {
		 		_errHandler.reportMatch(self)
		 		try consume()
		 	}

		}
		catch ANTLRException.recognition(let re) {
			_localctx.exception = re
			_errHandler.reportError(self, re)
			try _errHandler.recover(self, re)
		}

		return _localctx
	}

	public class ArgumentsContext: ParserRuleContext {
			open
			func LPAREN() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.LPAREN.rawValue, 0)
			}
			open
			func RPAREN() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.RPAREN.rawValue, 0)
			}
			open
			func argument() -> [ArgumentContext] {
				return getRuleContexts(ArgumentContext.self)
			}
			open
			func argument(_ i: Int) -> ArgumentContext? {
				return getRuleContext(ArgumentContext.self, i)
			}
			open
			func COMMA() -> [TerminalNode] {
				return getTokens(JexLangParser.Tokens.COMMA.rawValue)
			}
			open
			func COMMA(_ i:Int) -> TerminalNode? {
				return getToken(JexLangParser.Tokens.COMMA.rawValue, i)
			}
		override open
		func getRuleIndex() -> Int {
			return JexLangParser.RULE_arguments
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitArguments(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitArguments(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	@discardableResult
	 open func arguments() throws -> ArgumentsContext {
		var _localctx: ArgumentsContext
		_localctx = ArgumentsContext(_ctx, getState())
		try enterRule(_localctx, 30, JexLangParser.RULE_arguments)
		var _la: Int = 0
		defer {
	    		try! exitRule()
	    }
		do {
			var _alt:Int
		 	try enterOuterAlt(_localctx, 1)
		 	setState(249)
		 	try match(JexLangParser.Tokens.LPAREN.rawValue)
		 	setState(261)
		 	try _errHandler.sync(self)
		 	_la = try _input.LA(1)
		 	if (((Int64(_la) & ~0x3f) == 0 && ((Int64(1) << _la) & 30809417330146) != 0)) {
		 		setState(250)
		 		try argument()
		 		setState(255)
		 		try _errHandler.sync(self)
		 		_alt = try getInterpreter().adaptivePredict(_input,22,_ctx)
		 		while (_alt != 2 && _alt != ATN.INVALID_ALT_NUMBER) {
		 			if ( _alt==1 ) {
		 				setState(251)
		 				try match(JexLangParser.Tokens.COMMA.rawValue)
		 				setState(252)
		 				try argument()

		 		 
		 			}
		 			setState(257)
		 			try _errHandler.sync(self)
		 			_alt = try getInterpreter().adaptivePredict(_input,22,_ctx)
		 		}
		 		setState(259)
		 		try _errHandler.sync(self)
		 		_la = try _input.LA(1)
		 		if (_la == JexLangParser.Tokens.COMMA.rawValue) {
		 			setState(258)
		 			try match(JexLangParser.Tokens.COMMA.rawValue)

		 		}


		 	}

		 	setState(263)
		 	try match(JexLangParser.Tokens.RPAREN.rawValue)

		}
		catch ANTLRException.recognition(let re) {
			_localctx.exception = re
			_errHandler.reportError(self, re)
			try _errHandler.recover(self, re)
		}

		return _localctx
	}

	public class ArgumentContext: ParserRuleContext {
			open
			func singleExpression() -> SingleExpressionContext? {
				return getRuleContext(SingleExpressionContext.self, 0)
			}
			open
			func IDENTIFIER() -> TerminalNode? {
				return getToken(JexLangParser.Tokens.IDENTIFIER.rawValue, 0)
			}
		override open
		func getRuleIndex() -> Int {
			return JexLangParser.RULE_argument
		}
		override open
		func accept<T>(_ visitor: ParseTreeVisitor<T>) -> T? {
			if let visitor = visitor as? JexLangVisitor {
			    return visitor.visitArgument(self)
			}
			else if let visitor = visitor as? JexLangBaseVisitor {
			    return visitor.visitArgument(self)
			}
			else {
			     return visitor.visitChildren(self)
			}
		}
	}
	@discardableResult
	 open func argument() throws -> ArgumentContext {
		var _localctx: ArgumentContext
		_localctx = ArgumentContext(_ctx, getState())
		try enterRule(_localctx, 32, JexLangParser.RULE_argument)
		defer {
	    		try! exitRule()
	    }
		do {
		 	setState(267)
		 	try _errHandler.sync(self)
		 	switch(try getInterpreter().adaptivePredict(_input,25, _ctx)) {
		 	case 1:
		 		try enterOuterAlt(_localctx, 1)
		 		setState(265)
		 		try singleExpression(0)

		 		break
		 	case 2:
		 		try enterOuterAlt(_localctx, 2)
		 		setState(266)
		 		try match(JexLangParser.Tokens.IDENTIFIER.rawValue)

		 		break
		 	default: break
		 	}
		}
		catch ANTLRException.recognition(let re) {
			_localctx.exception = re
			_errHandler.reportError(self, re)
			try _errHandler.recover(self, re)
		}

		return _localctx
	}

	override open
	func sempred(_ _localctx: RuleContext?, _ ruleIndex: Int,  _ predIndex: Int)throws -> Bool {
		switch (ruleIndex) {
		case  7:
			return try singleExpression_sempred(_localctx?.castdown(SingleExpressionContext.self), predIndex)
	    default: return true
		}
	}
	private func singleExpression_sempred(_ _localctx: SingleExpressionContext!,  _ predIndex: Int) throws -> Bool {
		switch (predIndex) {
		    case 0:return precpred(_ctx, 18)
		    case 1:return precpred(_ctx, 17)
		    case 2:return precpred(_ctx, 16)
		    case 3:return precpred(_ctx, 15)
		    case 4:return precpred(_ctx, 14)
		    case 5:return precpred(_ctx, 13)
		    case 6:return precpred(_ctx, 12)
		    case 7:return precpred(_ctx, 10)
		    case 8:return precpred(_ctx, 9)
		    case 9:return precpred(_ctx, 7)
		    case 10:return precpred(_ctx, 6)
		    case 11:return precpred(_ctx, 25)
		    case 12:return precpred(_ctx, 24)
		    case 13:return precpred(_ctx, 22)
		    case 14:return precpred(_ctx, 11)
		    default: return true
		}
	}

	static let _serializedATN:[Int] = [
		4,1,47,270,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,
		7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,
		2,15,7,15,2,16,7,16,1,0,5,0,36,8,0,10,0,12,0,39,9,0,1,0,1,0,1,1,1,1,1,
		1,1,1,3,1,47,8,1,1,2,1,2,5,2,51,8,2,10,2,12,2,54,9,2,1,2,1,2,1,3,1,3,1,
		4,3,4,61,8,4,1,4,1,4,1,4,1,4,3,4,67,8,4,1,4,3,4,70,8,4,1,5,1,5,3,5,74,
		8,5,1,6,1,6,1,6,5,6,79,8,6,10,6,12,6,82,9,6,1,7,1,7,1,7,1,7,1,7,1,7,1,
		7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,3,7,102,8,7,1,7,1,7,1,7,
		1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,3,7,116,8,7,1,7,1,7,1,7,1,7,1,7,1,
		7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,
		1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,
		7,1,7,1,7,1,7,1,7,1,7,3,7,164,8,7,1,7,1,7,1,7,1,7,1,7,1,7,3,7,172,8,7,
		1,7,1,7,1,7,1,7,1,7,1,7,1,7,5,7,181,8,7,10,7,12,7,184,9,7,1,8,1,8,1,8,
		1,8,1,8,1,8,1,8,3,8,193,8,8,1,8,1,8,3,8,197,8,8,1,9,1,9,1,9,1,9,1,9,1,
		9,3,9,205,8,9,1,10,1,10,1,10,1,10,5,10,211,8,10,10,10,12,10,214,9,10,3,
		10,216,8,10,1,10,1,10,1,11,1,11,1,12,1,12,1,12,1,12,5,12,226,8,12,10,12,
		12,12,229,9,12,3,12,231,8,12,1,12,1,12,1,13,1,13,1,13,1,13,1,13,1,13,1,
		13,1,13,1,13,1,13,1,13,3,13,246,8,13,1,14,1,14,1,15,1,15,1,15,1,15,5,15,
		254,8,15,10,15,12,15,257,9,15,1,15,3,15,260,8,15,3,15,262,8,15,1,15,1,
		15,1,16,1,16,3,16,268,8,16,1,16,0,1,14,17,0,2,4,6,8,10,12,14,16,18,20,
		22,24,26,28,30,32,0,10,1,0,2,3,1,0,10,11,2,0,1,1,13,13,2,0,21,22,29,29,
		2,0,12,12,26,26,1,0,23,25,1,0,21,22,2,0,16,17,27,28,1,0,14,15,3,0,2,2,
		6,6,42,44,306,0,37,1,0,0,0,2,46,1,0,0,0,4,48,1,0,0,0,6,57,1,0,0,0,8,60,
		1,0,0,0,10,71,1,0,0,0,12,75,1,0,0,0,14,115,1,0,0,0,16,196,1,0,0,0,18,204,
		1,0,0,0,20,206,1,0,0,0,22,219,1,0,0,0,24,221,1,0,0,0,26,245,1,0,0,0,28,
		247,1,0,0,0,30,249,1,0,0,0,32,267,1,0,0,0,34,36,3,2,1,0,35,34,1,0,0,0,
		36,39,1,0,0,0,37,35,1,0,0,0,37,38,1,0,0,0,38,40,1,0,0,0,39,37,1,0,0,0,
		40,41,5,0,0,1,41,1,1,0,0,0,42,47,3,10,5,0,43,47,3,8,4,0,44,47,3,4,2,0,
		45,47,3,6,3,0,46,42,1,0,0,0,46,43,1,0,0,0,46,44,1,0,0,0,46,45,1,0,0,0,
		47,3,1,0,0,0,48,52,5,32,0,0,49,51,3,2,1,0,50,49,1,0,0,0,51,54,1,0,0,0,
		52,50,1,0,0,0,52,53,1,0,0,0,53,55,1,0,0,0,54,52,1,0,0,0,55,56,5,33,0,0,
		56,5,1,0,0,0,57,58,5,36,0,0,58,7,1,0,0,0,59,61,5,4,0,0,60,59,1,0,0,0,60,
		61,1,0,0,0,61,62,1,0,0,0,62,63,7,0,0,0,63,66,5,43,0,0,64,65,5,20,0,0,65,
		67,3,14,7,0,66,64,1,0,0,0,66,67,1,0,0,0,67,69,1,0,0,0,68,70,5,36,0,0,69,
		68,1,0,0,0,69,70,1,0,0,0,70,9,1,0,0,0,71,73,3,12,6,0,72,74,5,36,0,0,73,
		72,1,0,0,0,73,74,1,0,0,0,74,11,1,0,0,0,75,80,3,14,7,0,76,77,5,37,0,0,77,
		79,3,14,7,0,78,76,1,0,0,0,79,82,1,0,0,0,80,78,1,0,0,0,80,81,1,0,0,0,81,
		13,1,0,0,0,82,80,1,0,0,0,83,84,6,7,-1,0,84,85,5,43,0,0,85,116,3,30,15,
		0,86,87,7,1,0,0,87,116,3,14,7,21,88,89,7,2,0,0,89,116,3,14,7,20,90,91,
		7,3,0,0,91,116,3,14,7,19,92,93,5,43,0,0,93,94,5,20,0,0,94,116,3,14,7,8,
		95,96,5,8,0,0,96,97,5,30,0,0,97,98,3,12,6,0,98,99,5,31,0,0,99,101,3,4,
		2,0,100,102,3,16,8,0,101,100,1,0,0,0,101,102,1,0,0,0,102,116,1,0,0,0,103,
		104,5,7,0,0,104,105,5,30,0,0,105,106,3,12,6,0,106,107,5,31,0,0,107,108,
		3,4,2,0,108,116,1,0,0,0,109,110,5,30,0,0,110,111,3,12,6,0,111,112,5,31,
		0,0,112,116,1,0,0,0,113,116,3,18,9,0,114,116,5,43,0,0,115,83,1,0,0,0,115,
		86,1,0,0,0,115,88,1,0,0,0,115,90,1,0,0,0,115,92,1,0,0,0,115,95,1,0,0,0,
		115,103,1,0,0,0,115,109,1,0,0,0,115,113,1,0,0,0,115,114,1,0,0,0,116,182,
		1,0,0,0,117,118,10,18,0,0,118,119,7,4,0,0,119,181,3,14,7,18,120,121,10,
		17,0,0,121,122,7,5,0,0,122,181,3,14,7,18,123,124,10,16,0,0,124,125,7,6,
		0,0,125,181,3,14,7,17,126,127,10,15,0,0,127,128,7,7,0,0,128,181,3,14,7,
		16,129,130,10,14,0,0,130,131,7,8,0,0,131,181,3,14,7,15,132,133,10,13,0,
		0,133,134,5,18,0,0,134,181,3,14,7,14,135,136,10,12,0,0,136,137,5,19,0,
		0,137,181,3,14,7,13,138,139,10,10,0,0,139,140,5,40,0,0,140,141,3,14,7,
		0,141,142,5,41,0,0,142,143,3,14,7,10,143,181,1,0,0,0,144,145,10,9,0,0,
		145,146,5,40,0,0,146,147,5,41,0,0,147,181,3,14,7,10,148,149,10,7,0,0,149,
		150,5,34,0,0,150,151,3,12,6,0,151,152,5,35,0,0,152,153,5,20,0,0,153,154,
		3,14,7,7,154,181,1,0,0,0,155,156,10,6,0,0,156,157,5,38,0,0,157,158,3,28,
		14,0,158,159,5,20,0,0,159,160,3,14,7,6,160,181,1,0,0,0,161,163,10,25,0,
		0,162,164,5,40,0,0,163,162,1,0,0,0,163,164,1,0,0,0,164,165,1,0,0,0,165,
		166,5,34,0,0,166,167,3,12,6,0,167,168,5,35,0,0,168,181,1,0,0,0,169,171,
		10,24,0,0,170,172,5,40,0,0,171,170,1,0,0,0,171,172,1,0,0,0,172,173,1,0,
		0,0,173,174,5,38,0,0,174,181,3,28,14,0,175,176,10,22,0,0,176,181,7,1,0,
		0,177,178,10,11,0,0,178,179,5,39,0,0,179,181,5,43,0,0,180,117,1,0,0,0,
		180,120,1,0,0,0,180,123,1,0,0,0,180,126,1,0,0,0,180,129,1,0,0,0,180,132,
		1,0,0,0,180,135,1,0,0,0,180,138,1,0,0,0,180,144,1,0,0,0,180,148,1,0,0,
		0,180,155,1,0,0,0,180,161,1,0,0,0,180,169,1,0,0,0,180,175,1,0,0,0,180,
		177,1,0,0,0,181,184,1,0,0,0,182,180,1,0,0,0,182,183,1,0,0,0,183,15,1,0,
		0,0,184,182,1,0,0,0,185,186,5,9,0,0,186,187,5,8,0,0,187,188,5,30,0,0,188,
		189,3,12,6,0,189,190,5,31,0,0,190,192,3,4,2,0,191,193,3,16,8,0,192,191,
		1,0,0,0,192,193,1,0,0,0,193,197,1,0,0,0,194,195,5,9,0,0,195,197,3,4,2,
		0,196,185,1,0,0,0,196,194,1,0,0,0,197,17,1,0,0,0,198,205,5,44,0,0,199,
		205,5,42,0,0,200,205,5,5,0,0,201,205,5,6,0,0,202,205,3,20,10,0,203,205,
		3,24,12,0,204,198,1,0,0,0,204,199,1,0,0,0,204,200,1,0,0,0,204,201,1,0,
		0,0,204,202,1,0,0,0,204,203,1,0,0,0,205,19,1,0,0,0,206,215,5,34,0,0,207,
		212,3,22,11,0,208,209,5,37,0,0,209,211,3,22,11,0,210,208,1,0,0,0,211,214,
		1,0,0,0,212,210,1,0,0,0,212,213,1,0,0,0,213,216,1,0,0,0,214,212,1,0,0,
		0,215,207,1,0,0,0,215,216,1,0,0,0,216,217,1,0,0,0,217,218,5,35,0,0,218,
		21,1,0,0,0,219,220,3,14,7,0,220,23,1,0,0,0,221,230,5,32,0,0,222,227,3,
		26,13,0,223,224,5,37,0,0,224,226,3,26,13,0,225,223,1,0,0,0,226,229,1,0,
		0,0,227,225,1,0,0,0,227,228,1,0,0,0,228,231,1,0,0,0,229,227,1,0,0,0,230,
		222,1,0,0,0,230,231,1,0,0,0,231,232,1,0,0,0,232,233,5,33,0,0,233,25,1,
		0,0,0,234,235,3,28,14,0,235,236,5,41,0,0,236,237,3,14,7,0,237,246,1,0,
		0,0,238,239,5,34,0,0,239,240,3,14,7,0,240,241,5,35,0,0,241,242,5,41,0,
		0,242,243,3,14,7,0,243,246,1,0,0,0,244,246,5,43,0,0,245,234,1,0,0,0,245,
		238,1,0,0,0,245,244,1,0,0,0,246,27,1,0,0,0,247,248,7,9,0,0,248,29,1,0,
		0,0,249,261,5,30,0,0,250,255,3,32,16,0,251,252,5,37,0,0,252,254,3,32,16,
		0,253,251,1,0,0,0,254,257,1,0,0,0,255,253,1,0,0,0,255,256,1,0,0,0,256,
		259,1,0,0,0,257,255,1,0,0,0,258,260,5,37,0,0,259,258,1,0,0,0,259,260,1,
		0,0,0,260,262,1,0,0,0,261,250,1,0,0,0,261,262,1,0,0,0,262,263,1,0,0,0,
		263,264,5,31,0,0,264,31,1,0,0,0,265,268,3,14,7,0,266,268,5,43,0,0,267,
		265,1,0,0,0,267,266,1,0,0,0,268,33,1,0,0,0,26,37,46,52,60,66,69,73,80,
		101,115,163,171,180,182,192,196,204,212,215,227,230,245,255,259,261,267
	]

	public
	static let _ATN = try! ATNDeserializer().deserialize(_serializedATN)
}
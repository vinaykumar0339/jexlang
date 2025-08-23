// Generated from JexLang.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class JexLangLexer extends Lexer {
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
	public static readonly IDENTIFIER = 13;
	public static readonly WS = 14;
	public static readonly LINE_COMMENT = 15;
	public static readonly BLOCK_COMMENT = 16;
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: (string | null)[] = [ null, "'+'", 
                                                            "'-'", "'*'", 
                                                            "'/'", "'%'", 
                                                            null, "'='", 
                                                            "'('", "')'", 
                                                            "';'", "','" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "PLUS", 
                                                             "MINUS", "MULTIPLY", 
                                                             "DIVIDE", "MODULO", 
                                                             "POW", "ASSIGN", 
                                                             "LPAREN", "RPAREN", 
                                                             "SEMICOLON", 
                                                             "COMMA", "NUMBER", 
                                                             "IDENTIFIER", 
                                                             "WS", "LINE_COMMENT", 
                                                             "BLOCK_COMMENT" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"PLUS", "MINUS", "MULTIPLY", "DIVIDE", "MODULO", "POW", "ASSIGN", "LPAREN", 
		"RPAREN", "SEMICOLON", "COMMA", "NUMBER", "INTEGER_PART", "EXPONENT_PART", 
		"DIGIT", "IDENTIFIER", "WS", "LINE_COMMENT", "BLOCK_COMMENT",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, JexLangLexer._ATN, JexLangLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "JexLang.g4"; }

	public get literalNames(): (string | null)[] { return JexLangLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return JexLangLexer.symbolicNames; }
	public get ruleNames(): string[] { return JexLangLexer.ruleNames; }

	public get serializedATN(): number[] { return JexLangLexer._serializedATN; }

	public get channelNames(): string[] { return JexLangLexer.channelNames; }

	public get modeNames(): string[] { return JexLangLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,16,147,6,-1,2,0,
	7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,
	7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,
	16,2,17,7,17,2,18,7,18,1,0,1,0,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,1,5,1,5,
	1,5,3,5,53,8,5,1,6,1,6,1,7,1,7,1,8,1,8,1,9,1,9,1,10,1,10,1,11,1,11,1,11,
	4,11,68,8,11,11,11,12,11,69,3,11,72,8,11,1,11,3,11,75,8,11,1,11,1,11,4,
	11,79,8,11,11,11,12,11,80,1,11,3,11,84,8,11,3,11,86,8,11,1,12,1,12,1,12,
	5,12,91,8,12,10,12,12,12,94,9,12,3,12,96,8,12,1,13,1,13,3,13,100,8,13,1,
	13,4,13,103,8,13,11,13,12,13,104,1,14,1,14,1,15,1,15,5,15,111,8,15,10,15,
	12,15,114,9,15,1,16,4,16,117,8,16,11,16,12,16,118,1,16,1,16,1,17,1,17,1,
	17,1,17,5,17,127,8,17,10,17,12,17,130,9,17,1,17,1,17,1,18,1,18,1,18,1,18,
	5,18,138,8,18,10,18,12,18,141,9,18,1,18,1,18,1,18,1,18,1,18,1,139,0,19,
	1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,21,11,23,12,25,0,27,0,29,
	0,31,13,33,14,35,15,37,16,1,0,8,1,0,49,57,2,0,69,69,101,101,2,0,43,43,45,
	45,1,0,48,57,3,0,65,90,95,95,97,122,4,0,48,57,65,90,95,95,97,122,3,0,9,
	10,13,13,32,32,2,0,10,10,13,13,158,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,
	0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,
	0,0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,31,1,0,0,0,0,33,1,0,0,0,0,
	35,1,0,0,0,0,37,1,0,0,0,1,39,1,0,0,0,3,41,1,0,0,0,5,43,1,0,0,0,7,45,1,0,
	0,0,9,47,1,0,0,0,11,52,1,0,0,0,13,54,1,0,0,0,15,56,1,0,0,0,17,58,1,0,0,
	0,19,60,1,0,0,0,21,62,1,0,0,0,23,85,1,0,0,0,25,95,1,0,0,0,27,97,1,0,0,0,
	29,106,1,0,0,0,31,108,1,0,0,0,33,116,1,0,0,0,35,122,1,0,0,0,37,133,1,0,
	0,0,39,40,5,43,0,0,40,2,1,0,0,0,41,42,5,45,0,0,42,4,1,0,0,0,43,44,5,42,
	0,0,44,6,1,0,0,0,45,46,5,47,0,0,46,8,1,0,0,0,47,48,5,37,0,0,48,10,1,0,0,
	0,49,53,5,94,0,0,50,51,5,42,0,0,51,53,5,42,0,0,52,49,1,0,0,0,52,50,1,0,
	0,0,53,12,1,0,0,0,54,55,5,61,0,0,55,14,1,0,0,0,56,57,5,40,0,0,57,16,1,0,
	0,0,58,59,5,41,0,0,59,18,1,0,0,0,60,61,5,59,0,0,61,20,1,0,0,0,62,63,5,44,
	0,0,63,22,1,0,0,0,64,71,3,25,12,0,65,67,5,46,0,0,66,68,3,29,14,0,67,66,
	1,0,0,0,68,69,1,0,0,0,69,67,1,0,0,0,69,70,1,0,0,0,70,72,1,0,0,0,71,65,1,
	0,0,0,71,72,1,0,0,0,72,74,1,0,0,0,73,75,3,27,13,0,74,73,1,0,0,0,74,75,1,
	0,0,0,75,86,1,0,0,0,76,78,5,46,0,0,77,79,3,29,14,0,78,77,1,0,0,0,79,80,
	1,0,0,0,80,78,1,0,0,0,80,81,1,0,0,0,81,83,1,0,0,0,82,84,3,27,13,0,83,82,
	1,0,0,0,83,84,1,0,0,0,84,86,1,0,0,0,85,64,1,0,0,0,85,76,1,0,0,0,86,24,1,
	0,0,0,87,96,5,48,0,0,88,92,7,0,0,0,89,91,3,29,14,0,90,89,1,0,0,0,91,94,
	1,0,0,0,92,90,1,0,0,0,92,93,1,0,0,0,93,96,1,0,0,0,94,92,1,0,0,0,95,87,1,
	0,0,0,95,88,1,0,0,0,96,26,1,0,0,0,97,99,7,1,0,0,98,100,7,2,0,0,99,98,1,
	0,0,0,99,100,1,0,0,0,100,102,1,0,0,0,101,103,3,29,14,0,102,101,1,0,0,0,
	103,104,1,0,0,0,104,102,1,0,0,0,104,105,1,0,0,0,105,28,1,0,0,0,106,107,
	7,3,0,0,107,30,1,0,0,0,108,112,7,4,0,0,109,111,7,5,0,0,110,109,1,0,0,0,
	111,114,1,0,0,0,112,110,1,0,0,0,112,113,1,0,0,0,113,32,1,0,0,0,114,112,
	1,0,0,0,115,117,7,6,0,0,116,115,1,0,0,0,117,118,1,0,0,0,118,116,1,0,0,0,
	118,119,1,0,0,0,119,120,1,0,0,0,120,121,6,16,0,0,121,34,1,0,0,0,122,123,
	5,47,0,0,123,124,5,47,0,0,124,128,1,0,0,0,125,127,8,7,0,0,126,125,1,0,0,
	0,127,130,1,0,0,0,128,126,1,0,0,0,128,129,1,0,0,0,129,131,1,0,0,0,130,128,
	1,0,0,0,131,132,6,17,0,0,132,36,1,0,0,0,133,134,5,47,0,0,134,135,5,42,0,
	0,135,139,1,0,0,0,136,138,9,0,0,0,137,136,1,0,0,0,138,141,1,0,0,0,139,140,
	1,0,0,0,139,137,1,0,0,0,140,142,1,0,0,0,141,139,1,0,0,0,142,143,5,42,0,
	0,143,144,5,47,0,0,144,145,1,0,0,0,145,146,6,18,0,0,146,38,1,0,0,0,16,0,
	52,69,71,74,80,83,85,92,95,99,104,112,118,128,139,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!JexLangLexer.__ATN) {
			JexLangLexer.__ATN = new ATNDeserializer().deserialize(JexLangLexer._serializedATN);
		}

		return JexLangLexer.__ATN;
	}


	static DecisionsToDFA = JexLangLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}
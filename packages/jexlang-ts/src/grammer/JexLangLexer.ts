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
	public static readonly STRING = 14;
	public static readonly WS = 15;
	public static readonly LINE_COMMENT = 16;
	public static readonly BLOCK_COMMENT = 17;
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
                                                             "STRING", "WS", 
                                                             "LINE_COMMENT", 
                                                             "BLOCK_COMMENT" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"PLUS", "MINUS", "MULTIPLY", "DIVIDE", "MODULO", "POW", "ASSIGN", "LPAREN", 
		"RPAREN", "SEMICOLON", "COMMA", "NUMBER", "INTEGER_PART", "EXPONENT_PART", 
		"DIGIT", "IDENTIFIER", "STRING", "WS", "LINE_COMMENT", "BLOCK_COMMENT",
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

	public static readonly _serializedATN: number[] = [4,0,17,171,6,-1,2,0,
	7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,
	7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,
	16,2,17,7,17,2,18,7,18,2,19,7,19,1,0,1,0,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,
	4,1,5,1,5,1,5,3,5,55,8,5,1,6,1,6,1,7,1,7,1,8,1,8,1,9,1,9,1,10,1,10,1,11,
	1,11,1,11,4,11,70,8,11,11,11,12,11,71,3,11,74,8,11,1,11,3,11,77,8,11,1,
	11,1,11,4,11,81,8,11,11,11,12,11,82,1,11,3,11,86,8,11,3,11,88,8,11,1,12,
	1,12,1,12,5,12,93,8,12,10,12,12,12,96,9,12,3,12,98,8,12,1,13,1,13,3,13,
	102,8,13,1,13,4,13,105,8,13,11,13,12,13,106,1,14,1,14,1,15,1,15,5,15,113,
	8,15,10,15,12,15,116,9,15,1,16,1,16,1,16,1,16,5,16,122,8,16,10,16,12,16,
	125,9,16,1,16,1,16,1,16,1,16,1,16,5,16,132,8,16,10,16,12,16,135,9,16,1,
	16,3,16,138,8,16,1,17,4,17,141,8,17,11,17,12,17,142,1,17,1,17,1,18,1,18,
	1,18,1,18,5,18,151,8,18,10,18,12,18,154,9,18,1,18,1,18,1,19,1,19,1,19,1,
	19,5,19,162,8,19,10,19,12,19,165,9,19,1,19,1,19,1,19,1,19,1,19,1,163,0,
	20,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,21,11,23,12,25,0,27,0,
	29,0,31,13,33,14,35,15,37,16,39,17,1,0,10,1,0,49,57,2,0,69,69,101,101,2,
	0,43,43,45,45,1,0,48,57,3,0,65,90,95,95,97,122,4,0,48,57,65,90,95,95,97,
	122,4,0,10,10,13,13,34,34,92,92,4,0,10,10,13,13,39,39,92,92,3,0,9,10,13,
	13,32,32,2,0,10,10,13,13,187,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,
	0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,0,
	19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,31,1,0,0,0,0,33,1,0,0,0,0,35,1,0,
	0,0,0,37,1,0,0,0,0,39,1,0,0,0,1,41,1,0,0,0,3,43,1,0,0,0,5,45,1,0,0,0,7,
	47,1,0,0,0,9,49,1,0,0,0,11,54,1,0,0,0,13,56,1,0,0,0,15,58,1,0,0,0,17,60,
	1,0,0,0,19,62,1,0,0,0,21,64,1,0,0,0,23,87,1,0,0,0,25,97,1,0,0,0,27,99,1,
	0,0,0,29,108,1,0,0,0,31,110,1,0,0,0,33,137,1,0,0,0,35,140,1,0,0,0,37,146,
	1,0,0,0,39,157,1,0,0,0,41,42,5,43,0,0,42,2,1,0,0,0,43,44,5,45,0,0,44,4,
	1,0,0,0,45,46,5,42,0,0,46,6,1,0,0,0,47,48,5,47,0,0,48,8,1,0,0,0,49,50,5,
	37,0,0,50,10,1,0,0,0,51,55,5,94,0,0,52,53,5,42,0,0,53,55,5,42,0,0,54,51,
	1,0,0,0,54,52,1,0,0,0,55,12,1,0,0,0,56,57,5,61,0,0,57,14,1,0,0,0,58,59,
	5,40,0,0,59,16,1,0,0,0,60,61,5,41,0,0,61,18,1,0,0,0,62,63,5,59,0,0,63,20,
	1,0,0,0,64,65,5,44,0,0,65,22,1,0,0,0,66,73,3,25,12,0,67,69,5,46,0,0,68,
	70,3,29,14,0,69,68,1,0,0,0,70,71,1,0,0,0,71,69,1,0,0,0,71,72,1,0,0,0,72,
	74,1,0,0,0,73,67,1,0,0,0,73,74,1,0,0,0,74,76,1,0,0,0,75,77,3,27,13,0,76,
	75,1,0,0,0,76,77,1,0,0,0,77,88,1,0,0,0,78,80,5,46,0,0,79,81,3,29,14,0,80,
	79,1,0,0,0,81,82,1,0,0,0,82,80,1,0,0,0,82,83,1,0,0,0,83,85,1,0,0,0,84,86,
	3,27,13,0,85,84,1,0,0,0,85,86,1,0,0,0,86,88,1,0,0,0,87,66,1,0,0,0,87,78,
	1,0,0,0,88,24,1,0,0,0,89,98,5,48,0,0,90,94,7,0,0,0,91,93,3,29,14,0,92,91,
	1,0,0,0,93,96,1,0,0,0,94,92,1,0,0,0,94,95,1,0,0,0,95,98,1,0,0,0,96,94,1,
	0,0,0,97,89,1,0,0,0,97,90,1,0,0,0,98,26,1,0,0,0,99,101,7,1,0,0,100,102,
	7,2,0,0,101,100,1,0,0,0,101,102,1,0,0,0,102,104,1,0,0,0,103,105,3,29,14,
	0,104,103,1,0,0,0,105,106,1,0,0,0,106,104,1,0,0,0,106,107,1,0,0,0,107,28,
	1,0,0,0,108,109,7,3,0,0,109,30,1,0,0,0,110,114,7,4,0,0,111,113,7,5,0,0,
	112,111,1,0,0,0,113,116,1,0,0,0,114,112,1,0,0,0,114,115,1,0,0,0,115,32,
	1,0,0,0,116,114,1,0,0,0,117,123,5,34,0,0,118,119,5,92,0,0,119,122,9,0,0,
	0,120,122,8,6,0,0,121,118,1,0,0,0,121,120,1,0,0,0,122,125,1,0,0,0,123,121,
	1,0,0,0,123,124,1,0,0,0,124,126,1,0,0,0,125,123,1,0,0,0,126,138,5,34,0,
	0,127,133,5,39,0,0,128,129,5,92,0,0,129,132,9,0,0,0,130,132,8,7,0,0,131,
	128,1,0,0,0,131,130,1,0,0,0,132,135,1,0,0,0,133,131,1,0,0,0,133,134,1,0,
	0,0,134,136,1,0,0,0,135,133,1,0,0,0,136,138,5,39,0,0,137,117,1,0,0,0,137,
	127,1,0,0,0,138,34,1,0,0,0,139,141,7,8,0,0,140,139,1,0,0,0,141,142,1,0,
	0,0,142,140,1,0,0,0,142,143,1,0,0,0,143,144,1,0,0,0,144,145,6,17,0,0,145,
	36,1,0,0,0,146,147,5,47,0,0,147,148,5,47,0,0,148,152,1,0,0,0,149,151,8,
	9,0,0,150,149,1,0,0,0,151,154,1,0,0,0,152,150,1,0,0,0,152,153,1,0,0,0,153,
	155,1,0,0,0,154,152,1,0,0,0,155,156,6,18,0,0,156,38,1,0,0,0,157,158,5,47,
	0,0,158,159,5,42,0,0,159,163,1,0,0,0,160,162,9,0,0,0,161,160,1,0,0,0,162,
	165,1,0,0,0,163,164,1,0,0,0,163,161,1,0,0,0,164,166,1,0,0,0,165,163,1,0,
	0,0,166,167,5,42,0,0,167,168,5,47,0,0,168,169,1,0,0,0,169,170,6,19,0,0,
	170,40,1,0,0,0,21,0,54,71,73,76,82,85,87,94,97,101,106,114,121,123,131,
	133,137,142,152,163,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!JexLangLexer.__ATN) {
			JexLangLexer.__ATN = new ATNDeserializer().deserialize(JexLangLexer._serializedATN);
		}

		return JexLangLexer.__ATN;
	}


	static DecisionsToDFA = JexLangLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}
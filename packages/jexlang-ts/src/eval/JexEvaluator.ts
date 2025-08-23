import { CharStreams, CommonTokenStream } from "antlr4";
import { EvalVisitor } from "./EvalVisitor";
import { Context, FuncImpl, JexValue } from "../types";
import JexLangLexer from "../grammer/JexLangLexer";
import JexLangParser from "../grammer/JexLangParser";

export class JexEvaluator {
  private visitor: EvalVisitor;
  
  constructor(private context: Context = {}, private funcs: Record<string, FuncImpl> = {}) {
    this.visitor = new EvalVisitor(context, this.funcs);
  }

  evaluate(expr: string): JexValue {
    const chars = CharStreams.fromString(expr);
    const lexer = new JexLangLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new JexLangParser(tokens);

    const tree = parser.program();
    return this.visitor.visit(tree);
  }

  setContext(context: Context): void {
    this.context = context;
    this.visitor.setContext(context);
  }

  getContext(): Context {
    return this.context;
  }

  setFunction(name: string, func: FuncImpl): void {
    this.funcs[name] = func;
    this.visitor.setFunction(name, func);
  }

  setFunctions(funcs: Record<string, FuncImpl>): void {
    this.funcs = funcs;
    for (const [name, func] of Object.entries(funcs)) {
      this.visitor.setFunction(name, func);
    }
  }
}

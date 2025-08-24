import { CharStreams, CommonTokenStream } from "antlr4";
import { EvalVisitor } from "./EvalVisitor";
import { Context, FuncImpl, JexValue, TransformImpl } from "../types";
import JexLangLexer from "../grammer/JexLangLexer";
import JexLangParser, { ProgramContext } from "../grammer/JexLangParser";

export class JexEvaluator {
  private visitor: EvalVisitor;
  private cacheParsedTrees: Map<string, ProgramContext> = new Map();

  constructor(
    private context: Context = {},
    private funcs: Record<string, FuncImpl> = {},
    private transformsMap: Record<string, TransformImpl> = {},
    private cacheExpressions: boolean = false
  ) {
    this.visitor = new EvalVisitor(context, this.funcs, this.transformsMap);
  }

  private parseExpression(expr: string): ProgramContext {
    if (this.cacheParsedTrees.has(expr) && this.cacheExpressions) {
      const cachedTree = this.cacheParsedTrees.get(expr);
      if (cachedTree) {
        return cachedTree;
      }
    }

    const chars = CharStreams.fromString(expr);
    const lexer = new JexLangLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new JexLangParser(tokens);
    const tree = parser.program();

    if (this.cacheExpressions) {
      this.cacheParsedTrees.set(expr, tree);
    }
    return tree;
  }


  setCacheExpressions(value: boolean): void {
    this.cacheExpressions = value;
  }

  getCacheExpressions(): boolean {
    return this.cacheExpressions;
  }

  evaluate(expr: string): JexValue {
    const tree = this.parseExpression(expr);
    return this.visitor.visit(tree);
  }

  setContext(context: Context): void {
    this.context = context;
    this.visitor.setContext(context);
  }

  getContext(): Context {
    return this.context;
  }

  addFunction(name: string, func: FuncImpl): void {
    this.funcs[name] = func;
    this.visitor.addFunction(name, func);
  }

  addFunctions(funcs: Record<string, FuncImpl>): void {
    this.funcs = funcs;
    for (const [name, func] of Object.entries(funcs)) {
      this.visitor.addFunction(name, func);
    }
  }

  addTransform(name: string, transform: TransformImpl): void {
    this.transformsMap[name] = transform;
    this.visitor.addTransform(name, transform);
  }

  addTransforms(transforms: Record<string, TransformImpl>): void {
    this.transformsMap = transforms;
    for (const [name, transform] of Object.entries(transforms)) {
      this.visitor.addTransform(name, transform);
    }
  }

  clearCachedParsedExpressions(): void {
    this.cacheParsedTrees.clear();
  }

}

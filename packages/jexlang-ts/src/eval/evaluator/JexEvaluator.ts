import { CharStreams, CommonTokenStream } from "antlr4";
import { JexLangErrorListener } from "../listeners/JexLangErrorListener";
import { EvalVisitor } from "../visitors/EvalVisitor";
import type { Context, FuncImpl, JexValue, TransformImpl } from "../../types";
import JexLangLexer from "../../grammar/JexLangLexer";
import JexLangParser, { ProgramContext } from "../../grammar/JexLangParser";
import { createGlobalScope } from "../../utils";
import type { Scope } from "../scopes";
import { JexLangRuntimeError } from "../errors";

export class JexEvaluator {
  private visitor: EvalVisitor;
  private errorListener: JexLangErrorListener;
  private cacheParsedTrees: Map<string, ProgramContext> = new Map();
  private cacheExpressions: boolean = false;

  private funcs: Record<string, FuncImpl>;
  private transformsMap: Record<string, TransformImpl>;
  private globalScope: Scope = createGlobalScope();
  private context: Context = {};

  private addAllContextValuesIntoGlobalScope(context: Context): void {
    for (const [key, value] of Object.entries(context)) {
      this.globalScope.declareVariable(key, value);
    }
  }

  constructor(
    context: Context = {},
    funcs: Record<string, FuncImpl> = {},
    transformsMap: Record<string, TransformImpl> = {}
  ) {
    this.context = context;
    this.addAllContextValuesIntoGlobalScope(this.context);
    this.funcs = funcs;
    this.transformsMap = transformsMap;
    this.visitor = new EvalVisitor(this.globalScope, this.funcs, this.transformsMap);
    this.errorListener = new JexLangErrorListener();
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

    // Remove the default console error listener
    lexer.removeErrorListeners();

    // Add our custom error listener
    this.errorListener.clear();
    lexer.addErrorListener(this.errorListener);


    // Remove default console error listener from parser too
    parser.removeErrorListeners();
    parser.addErrorListener(this.errorListener);

    // Parse the expression
    const tree = parser.program();

    // Check if we have any syntax errors
    if (this.errorListener.hasErrors()) {
      // Throw the first error
      throw this.errorListener.getErrors()[0];
    }

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

  evaluate(
    expr: string,
    programScopeContext: Context = {}
  ): Promise<JexValue> | JexValue {
    const tree = this.parseExpression(expr);
    // Pass the program scope context to the visitor
    this.visitor.setProgramScopeContext(programScopeContext);
    return this.visitor.visit(tree);
  }

  evaluateSync(expr: string, programScopeContext: Context = {}): JexValue {
    const tree = this.parseExpression(expr);
    // Pass the program scope context to the visitor
    this.visitor.setProgramScopeContext(programScopeContext);
    const result =  this.visitor.visit(tree);
    if (result instanceof Promise) {
      throw new JexLangRuntimeError("Synchronous evaluation cannot handle promises if you want generic evaluation. please use evaluate() method.");
    }
    return result;
  }

  evaluateAsync(expr: string): Promise<JexValue> {
    const tree = this.parseExpression(expr);
    const result = this.visitor.visit(tree);
    if (result instanceof Promise) {
      return result;
    }
    return Promise.resolve(result);
  }

  setContextValue(key: string, value: JexValue): void {
    this.context[key] = value;
    this.globalScope.assignVariable(key, value);
  }

  declareContextValue(key: string, value: JexValue, isConst = false): void {
    this.context[key] = value;
    this.globalScope.declareVariable(key, value, isConst);
  }

  getContextValue(key: string): JexValue {
    const value = this.context[key];
    if (value === undefined) {
      return null;
    }
    return value;
  }

  getGlobalScopeVariables(): Record<string, JexValue> {
    return this.visitor.getGlobalScopeVariables();
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

  getAllFunctions(): Record<string, FuncImpl> {
    return this.visitor.getAllFunctions();
  }

  hasFunction(name: string): boolean {
    return this.visitor.hasFunction(name);
  }

  getAllTransforms(): Record<string, TransformImpl> {
    return this.visitor.getAllTransforms();
  }
  
  hasTransform(name: string): boolean {
    return this.visitor.hasTransform(name);
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

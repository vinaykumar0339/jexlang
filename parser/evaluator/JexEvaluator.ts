import { Program } from "../ast";
import { JexLangRuntimeError } from "../errors";
import { Parser } from "../parser";
import { Scope } from "../scope";
import { FuncImpl, TransformImpl, JexValue, Context } from "../types";
import { createGlobalScope } from "../utils";
import { Evaluate } from "../evaluate";

export class JexEvaluator {
  private evaluator: Evaluate;
  private cacheParsedTrees: Map<string, Program> = new Map();
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
    this.evaluator = new Evaluate(this.globalScope, this.funcs, this.transformsMap);
  }

  private parseExpression(expr: string): Program {
    if (this.cacheParsedTrees.has(expr) && this.cacheExpressions) {
      const cachedTree = this.cacheParsedTrees.get(expr);
      if (cachedTree) {
        return cachedTree;
      }
    }

    const parser = new Parser(expr);

    // Parse the expression
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

  evaluate(expr: string): Promise<JexValue> | JexValue {
    const tree = this.parseExpression(expr);
    return this.evaluator.evaluate(tree);
  }

  evaluateSync(expr: string): JexValue {
    const tree = this.parseExpression(expr);
    const result =  this.evaluator.evaluate(tree);
    if (result instanceof Promise) {
      throw new JexLangRuntimeError("Synchronous evaluation cannot handle promises if you want generic evaluation. please use evaluate() method.");
    }
    return result;
  }

  evaluateAsync(expr: string): Promise<JexValue> {
    const tree = this.parseExpression(expr);
    const result = this.evaluator.evaluate(tree);
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

  addFunction(name: string, func: FuncImpl): void {
    this.funcs[name] = func;
    this.evaluator.addFunction(name, func);
  }

  addFunctions(funcs: Record<string, FuncImpl>): void {
    this.funcs = funcs;
    for (const [name, func] of Object.entries(funcs)) {
      this.evaluator.addFunction(name, func);
    }
  }

  addTransform(name: string, transform: TransformImpl): void {
    this.transformsMap[name] = transform;
    this.evaluator.addTransform(name, transform);
  }

  addTransforms(transforms: Record<string, TransformImpl>): void {
    this.transformsMap = transforms;
    for (const [name, transform] of Object.entries(transforms)) {
      this.evaluator.addTransform(name, transform);
    }
  }

  clearCachedParsedExpressions(): void {
    this.cacheParsedTrees.clear();
  }
}

export type JexValue = number | boolean | string | null | JexValue[] | { [k: string]: JexValue }

export type MaybePromise<T> = T | Promise<T>;

export type Context = Record<string, JexValue>;

export type FuncImpl = (...args: JexValue[]) => MaybePromise<JexValue>;

export type TransformImpl = (input: JexValue) => MaybePromise<JexValue>;

export interface FuncRegistry {
  has(name: string): boolean;
  call(name: string, args: JexValue[]): MaybePromise<JexValue>;
}

export interface TransformRegistry {
  has(name: string): boolean;
  transform(name: string, input: JexValue): MaybePromise<JexValue>;
}

export class MapFuncRegistry implements FuncRegistry {
  private readonly map = new Map<string, FuncImpl>();
  constructor(init?: Record<string, FuncImpl>) {
    if (init) {
      for (const [k, v] of Object.entries(init)) this.map.set(k, v);
    }
  }
  getAll(): Record<string, FuncImpl> {
    return Object.fromEntries(this.map);
  }
  set(name: string, fn: FuncImpl) {
    this.map.set(name, fn);
  }
  remove(name: string) {
    this.map.delete(name);
  }
  has(name: string) {
    return this.map.has(name);
  }
  call(name: string, args: JexValue[]) {
    const fn = this.map.get(name);
    if (!fn) throw new Error(`Unknown function: ${name}`);
    return fn(...args);
  }
}

export class MapTransformRegistry implements TransformRegistry {
  private readonly map = new Map<string, TransformImpl>();
  constructor(init?: Record<string, TransformImpl>) {
    if (init) {
      for (const [k, v] of Object.entries(init)) this.map.set(k, v);
    }
  }
  getAll(): Record<string, TransformImpl> {
    return Object.fromEntries(this.map);
  }
  set(name: string, fn: TransformImpl) {
    this.map.set(name, fn);
  }
  remove(name: string) {
    this.map.delete(name);
  }
  has(name: string) {
    return this.map.has(name);
  }
  transform(name: string, input: JexValue) {
    const fn = this.map.get(name);
    if (!fn) throw new Error(`Unknown transform: ${name}`);
    return fn(input);
  }
}
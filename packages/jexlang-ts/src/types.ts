export type JexValue = number | boolean | string | null | JexValue[] | { [k: string]: JexValue }

export type Context = Record<string, JexValue>;

export type FuncImpl = (...args: JexValue[]) => JexValue;


export interface FuncRegistry {
  has(name: string): boolean;
  call(name: string, args: JexValue[]): JexValue;
}

export class MapFuncRegistry implements FuncRegistry {
  private readonly map = new Map<string, FuncImpl>();
  constructor(init?: Record<string, FuncImpl>) {
    if (init) {
      for (const [k, v] of Object.entries(init)) this.map.set(k, v);
    }
  }
  set(name: string, fn: FuncImpl) {
    this.map.set(name, fn);
    return this;
  }
  has(name: string) {
    return this.map.has(name);
  }
  call(name: string, args: JexValue[]) {
    const fn = this.map.get(name);
    if (!fn) throw new Error(`Unknown function: ${name}`);
    const out = fn(...args);
    if (!Number.isFinite(out)) {
      throw new Error(`Function ${name} returned non-finite value`);
    }
    return out;
  }
}
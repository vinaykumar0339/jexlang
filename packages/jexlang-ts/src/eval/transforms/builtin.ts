import type { TransformImpl } from "../../types";
import { toBoolean, toFloat, toInt, toNumber, toString } from "../../utils";

export const BUILT_IN_TRANSFORMS: Record<string, TransformImpl> = {
  // String transforms
  upper: (val) => {
    return toString(val).toUpperCase();
  },
  lower: (val) => {
    return toString(val).toLowerCase();
  },
  capitalize: (val) => {
    return toString(val).split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
  },
  trim: (val) => {
    return toString(val).trim();
  },
  
  // Numeric transforms
  abs: (val) => {
    return Math.abs(Number(val));
  },
  floor: (val) => {
    return Math.floor(Number(val));
  },
  ceil: (val) => {
    return Math.ceil(Number(val));
  },
  round: (val) => {
    return Math.round(Number(val));
  },
  
  // Array transforms
  length: (val) => {
    if (Array.isArray(val)) {
      return val.length;
    } else if (typeof val === 'string') {
      return val.length;
    } else if (val && typeof val === 'object') {
      return Object.keys(val).length;
    }
    return 0;
  },
  
  // Type transforms
  number: (val) => {
    return toNumber(val);
  },

  string: (val) => {
    return toString(val);
  },

  boolean: (val) => {
    return toBoolean(val);
  },

  int: (val) => toInt(val),

  float: (val) => {
    return toFloat(val);
  },

  double: (val) => {
    return toFloat(val);
  }
};

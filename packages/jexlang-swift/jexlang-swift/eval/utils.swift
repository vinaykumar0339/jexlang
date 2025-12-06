//
//  utils.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/10/25.
//

import Foundation

public func getJexValueType(value: JexValue?) -> String {
    guard let value = value else {
        return "nil"
    }
    return value.getType();
}

public func toNumber(value: JexValue, ctx: String) throws -> NSNumber {
    switch value {
    case is JexNil:
        return NSNumber(value: 0.0)
    case is JexNumber:
        return try value.asNumber(context: ctx)
    case is JexBoolean:
        let boolVal = try value.asBoolean(context: ctx)
        return NSNumber(value: boolVal ? 1.0 : 0.0)
        
    case is JexInteger:
        return NSNumber(value: try value.asInteger(context: ctx))
        
    case is JexDouble:
        return NSNumber(value: try value.asDouble(context: ctx))
        
    case is JexString:
        if let stringValue = value as? JexString {
            let str = stringValue.asString(context: ctx)
            if let num = Double(str), !num.isNaN {
                return NSNumber(value: num)
            }
        }
        fallthrough
        
    default:
        throw TypeMismatchError(
            operation: "number conversion",
            expected: "number",
            actual: getJexValueType(value: value)
        )
    }
}

public func toBoolean(value: JexValue, ctx: String) throws -> Bool {
    if value is JexNil {
        return false
    }
    
    if value is JexBoolean {
        return try value.asBoolean(context: ctx)
    }
    
    if value is JexInteger {
        return try value.asInteger(context: ctx) != 0
    }
    
    if value is JexDouble {
        let d = try value.asDouble(context: ctx)
        return d != 0.0 && !d.isNaN
    }
    
    if value is JexNumber {
        let d = try value.asNumber(context: ctx).doubleValue;
        return d != 0.0 && !d.isNaN
    }
    
    if (value is JexString) {
        return !(try value.asString(context: ctx).isEmpty)
    }
    
    if (value is JexArray) {
        return !(try value.asArray(context: ctx).isEmpty)
    }
    
    if (value is JexObject) {
        return !(try value.asObject(context: ctx).isEmpty)
    }
    
    return false
}


public func toString(value: JexValue, ctx: String) throws -> String {
    switch value {
    case is JexInteger:
        return String(try value.asInteger(context: ctx))
    case is JexNil:
        return "nil"
    default:
        throw TypeMismatchError(operation: "string conversion", expected: "string", actual: getJexValueType(value: value));
    }
}

public func createGlobalScope() -> Scope {
    let scope = Scope(scopeType: .global)
    
    let ln2 = Darwin.log(2.0)
    let ln10 = Darwin.log(10.0)
    let log2e = 1.0 / Darwin.log(2.0)
    let log10e = 1.0 / Darwin.log(10.0)
    let sqrtHalf = Darwin.sqrt(0.5)
    let sqrt2 = Darwin.sqrt(2.0)
    
    try! scope.declareVariable("PI", value: JexNumber(value: NSNumber(value: Double.pi)), isConst: true)
    try! scope.declareVariable("E", value: JexNumber(value: NSNumber(value: Darwin.M_E)), isConst: true)
    try! scope.declareVariable("LN2", value: JexNumber(value: NSNumber(value: ln2)), isConst: true)
    try! scope.declareVariable("LN10", value: JexNumber(value: NSNumber(value: ln10)), isConst: true)
    try! scope.declareVariable("LOG2E", value: JexNumber(value: NSNumber(value: log2e)), isConst: true)
    try! scope.declareVariable("LOG10E", value: JexNumber(value: NSNumber(value: log10e)), isConst: true)
    try! scope.declareVariable("SQRT1_2", value: JexNumber(value: NSNumber(value: sqrtHalf)), isConst: true)
    try! scope.declareVariable("SQRT2", value: JexNumber(value: NSNumber(value: sqrt2)), isConst: true)
    try! scope.declareVariable("VERSION", value: JexString(value: Version.value), isConst: true)
    try! scope.declareVariable("__CLIENT_LANGUAGE", value: JexString(value: "swift"), isConst: true)
    
    return scope;
}



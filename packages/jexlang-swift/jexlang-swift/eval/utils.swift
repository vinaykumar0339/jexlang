//
//  utils.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/10/25.
//

import Foundation

public typealias Unary = (_ x: Double) -> Double
public typealias Binary = (_ a: Double, _ b: Double) -> Double
public typealias Ternary = (_ a: Double, _ b: Double, _ c: Double) -> Double

@inline(__always)
public func integer(_ v: Int) -> JexValue {
    JexInteger(value: v)
}

@inline(__always)
public func doubleValue(_ v: Double) -> JexValue {
    JexDouble(value: v)
}

@inline(__always)
public func doubleValue(_ v: Int) -> JexValue {
    JexDouble(value: Double(v))
}

@inline(__always)
public func doubleValue(_ v: Float) -> JexValue {
    JexDouble(value: Double(v))
}

@inline(__always)
public func num(_ v: Double) -> JexValue {
    JexValueFactory.from(v)
}

@inline(__always)
public func num(_ v: Int) -> JexValue {
    JexValueFactory.from(v)
}

@inline(__always)
public func str(_ s: String) -> JexValue {
    JexValueFactory.from(s)
}

@inline(__always)
public func bool(_ b: Bool) -> JexValue {
    JexValueFactory.from(b)
}

@inline(__always)
public func nilValue() -> JexValue {
    JexNil()
}

@inline(__always)
public func arr(_ vs: [JexValue]) -> JexValue {
    JexValueFactory.from(vs)
}

@inline(__always)
public func obj(_ m: [String: JexValue]) -> JexValue {
    JexValueFactory.from(m)
}


@inline(__always)
public func assertFinite(_ name: String, _ x: Double) throws {
    if !x.isFinite {
        throw JexLangRuntimeError(message: "\(name) produced non-finite result")
    }
}


func n1(_ f: @escaping Unary, _ ctxName: String) -> FuncImpl {
    return { _, args in
        let xValue = args.count > 0 ? args[0] : JexValueFactory.from(0)
        let x = toNumber(value: xValue, ctx: ctxName).doubleValue
        let v = f(x)
        try! assertFinite(ctxName, v)
        return num(v)
    }
}

func n2(_ f: @escaping Binary, _ aCtx: String, _ bCtx: String) -> FuncImpl {
    return { _, args in
        let aValue = args.count > 0 ? args[0] : JexValueFactory.from(0)
        let bValue = args.count > 1 ? args[1] : JexValueFactory.from(0)

        let a = toNumber(value: aValue, ctx: aCtx).doubleValue
        let b = toNumber(value: bValue, ctx: bCtx).doubleValue

        let v = f(a, b)
        try! assertFinite("\(aCtx), \(bCtx)", v)
        return num(v)
    }
}

func n3(
    _ f: @escaping Ternary,
    _ aCtx: String,
    _ bCtx: String,
    _ cCtx: String
) -> FuncImpl {
    return { _, args in
        let aValue = args.count > 0 ? args[0] : JexValueFactory.from(0)
        let bValue = args.count > 1 ? args[1] : JexValueFactory.from(0)
        let cValue = args.count > 2 ? args[2] : JexValueFactory.from(0)

        let a = toNumber(value: aValue, ctx: aCtx).doubleValue
        let b = toNumber(value: bValue, ctx: bCtx).doubleValue
        let c = toNumber(value: cValue, ctx: cCtx).doubleValue

        let v = f(a, b, c)
        try! assertFinite("\(aCtx), \(bCtx), \(cCtx)", v)
        return num(v)
    }
}

public func getJexValueType(value: JexValue?) -> String {
    guard let value = value else {
        return "nil"
    }
    return value.getType();
}

public func toNumber(value: JexValue, ctx: String) -> NSNumber {
    do {
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
    } catch let error as JexLangRuntimeError {
        NSException.raise(jexLangError: error)
        return NSNumber(value: 0) // unreachable, required for Swift
    } catch {
        NSException.raise(
            jexLangError: JexLangRuntimeError(message: error.localizedDescription)
        )
        return NSNumber(value: 0) // unreachable
    }
}


public func toBoolean(value: JexValue, ctx: String) -> Bool {
    do {
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
    } catch {
        return false
    }
}

public func toString(value: JexValue, ctx: String) -> String {
    do {
        switch value {
        case is JexNil:
            return "nil"
        case is JexString:
            return try value.asString(context: ctx)
        case is JexInteger:
            return String(describing: try value.asInteger(context: ctx))
        case is JexDouble:
            return String(describing: try value.asDouble(context: ctx))
        case is JexNumber:
            return String(describing: try value.asNumber(context: ctx))
        case is JexBoolean:
            return try value.asBoolean(context: ctx) ? "true" : "false"
        case is JexArray:
            let arr = try value.asArray(context: ctx)
            let items = arr.map { toString(value: $0, ctx: ctx) }
            return "[\(items.joined(separator: ", "))]"
        case is JexObject:
            let obj = try value.asObject(context: ctx)
            
            var parts: [String] = []
            for (key, val) in obj {
                let valStr = toString(value: val, ctx: ctx)
                parts.append("\"\(key)\": \"\(valStr)\"")
            }
            
            return "{\(parts.joined(separator: ", "))}"
        default:
            throw TypeMismatchError(operation: "string conversion", expected: "string", actual: getJexValueType(value: value));
        }
    } catch {
        return ""
    }
}

public func isEqual(_ lhs: JexValue, _ rhs: JexValue) -> Bool {
    
    do {
        // 1. If both are null → true
        if lhs.isNil() && rhs.isNil() { return true }
        
        // 2. null == undefined behavior (you can choose if you support undefined)
        //        // For now: null is only equal to null in JexLang.
        if lhs.isNil() || rhs.isNil() { return false }
        
        
        // 3. If types match → direct compare
        if lhs.isString() && rhs.isString() {
            return try lhs.asString(context: "equality") ==
                   rhs.asString(context: "equality")
        }
        
        if lhs.isBoolean() && rhs.isBoolean() {
            return try lhs.asBoolean(context: "equality") ==
                   rhs.asBoolean(context: "equality")
        }
        
        if lhs.isNumber() && rhs.isNumber() {
            return try lhs.asNumber(context: "equality").doubleValue ==
                   rhs.asNumber(context: "equality").doubleValue
        }
        
        // 4. boolean → number conversion
        if (lhs.isBoolean()) {
            return jexlang_swift.isEqual(JexValueFactory.fromNumber(int: (try lhs.asBoolean(context: "==") ? 1 : 0)), rhs)
        }
        if (rhs.isBoolean()) {
            return jexlang_swift.isEqual(lhs, JexValueFactory.fromNumber(int: (try rhs.asBoolean(context: "==") ? 1 : 0)))
        }
        
        // 5. string ↔ number conversion
        if (lhs.isString() && rhs.isNumber()) {
            if let num = Double(try lhs.asString(context: "==")) {
                return jexlang_swift.isEqual(JexValueFactory.fromNumber(double: num), rhs)
            }
            return false
        }
        if (lhs.isNumber() && rhs.isString()) {
            if let num = Double(try rhs.asString(context: "==")) {
                return jexlang_swift.isEqual(lhs, JexValueFactory.fromNumber(double: num))
            }
            return false
        }
        
        // 6. array → primitive conversion (like JS ToPrimitive)
        if (lhs.isArray() && !rhs.isArray()) {
            return jexlang_swift.isEqual(toPrimitive(value: lhs), rhs)
        }
        if (!lhs.isArray() && rhs.isArray()) {
            return jexlang_swift.isEqual(lhs, toPrimitive(value: rhs))
        }
        // 7. array reference equality
        if lhs.isArray() && rhs.isArray() {
            return lhs === rhs
        }
        
        // 8. object → primitive conversion (like JS ToPrimitive)
        if (lhs.isObject() && !rhs.isObject()) {
            return jexlang_swift.isEqual(toPrimitive(value: lhs), rhs)
        }
        if (!lhs.isObject() && rhs.isObject()) {
            return jexlang_swift.isEqual(lhs, toPrimitive(value: rhs))
        }
        
        // 9. object reference equality
        if lhs.isObject() && rhs.isObject() {
            return lhs === rhs        // same instance
        }

        return false
    } catch {
        return  false
    }
}

public func isLessThan(
    lhs: JexValue,
    rhs: JexValue,
    alsoEqual: Bool = false
) -> Bool {
    
    var isLess = false
    
    if lhs.getType() != rhs.getType() {
        
        // If either is a number → try numeric compare
        if lhs.isNumber() || rhs.isNumber() {
            do {
                try catchNSException {
                    let num1 = toNumber(value: lhs, ctx: "comparison")
                    let num2 = toNumber(value: rhs, ctx: "comparison")
                    
                    if alsoEqual {
                        isLess = num1.doubleValue <= num2.doubleValue
                    } else {
                        isLess = num1.doubleValue < num2.doubleValue
                    }
                }
            } catch {
                isLess = false
            }
        } else {
            isLess = false
        }
        
        return isLess
    }

    if lhs.isNumber() && rhs.isNumber() {
        do {
            let a = try lhs.asNumber(context: "comparison").doubleValue
            let b = try rhs.asNumber(context: "comparison").doubleValue
            
            if alsoEqual {
                return a <= b
            } else {
                return a < b
            }
        } catch {
            return false
        }
    }
    
    if lhs.isString() && rhs.isString() {
        do {
            let a = try lhs.asString(context: "comparison")
            let b = try rhs.asString(context: "comparison")
            
            if alsoEqual {
                return a <= b
            } else {
                return a < b
            }
        } catch {
            return false
        }
    }
    
    if lhs.isBoolean() && rhs.isBoolean() {
        do {
            let a = try lhs.asBoolean(context: "comparison")
            let b = try rhs.asBoolean(context: "comparison")
            
            // Bool.compare equivalent: false < true
            if alsoEqual {
                return (!a && b) || (a == b)
            } else {
                return (!a && b)
            }
        } catch {
            return false
        }
    }
    
    return false
}

public func isGreaterThan(
    lhs: JexValue,
    rhs: JexValue,
    alsoEqual: Bool = false
) -> Bool {
    
    var isGreater = false

    if lhs.getType() != rhs.getType() {
        
        // If either side is number → try numeric compare
        if lhs.isNumber() || rhs.isNumber() {
            do {
                try catchNSException {
                    let num1 = toNumber(value: lhs, ctx: "comparison")
                    let num2 = toNumber(value: rhs, ctx: "comparison")
                    
                    if alsoEqual {
                        isGreater = num1.doubleValue >= num2.doubleValue
                    } else {
                        isGreater = num1.doubleValue > num2.doubleValue
                    }
                }
                
            } catch {
                isGreater = false
            }
        } else {
            isGreater = false
        }
        
        return isGreater
    }
    
    if lhs.isNumber() && rhs.isNumber() {
        do {
            let a = try lhs.asNumber(context: "comparison").doubleValue
            let b = try rhs.asNumber(context: "comparison").doubleValue
            
            if alsoEqual {
                return a >= b
            } else {
                return a > b
            }
        } catch {
            return false
        }
    }
    
    if lhs.isString() && rhs.isString() {
        do {
            let a = try lhs.asString(context: "comparison")
            let b = try rhs.asString(context: "comparison")
            
            if alsoEqual {
                return a >= b
            } else {
                return a > b
            }
        } catch {
            return false
        }
    }
    
    if lhs.isBoolean() && rhs.isBoolean() {
        do {
            let a = try lhs.asBoolean(context: "comparison")
            let b = try rhs.asBoolean(context: "comparison")
            
            // Bool.compare equivalent: true > false
            if alsoEqual {
                return (a && !b) || (a == b)
            } else {
                return (a && !b)
            }
        } catch {
            return false
        }
    }
    
    // Any other type → false
    return false
}

public func toPrimitive(value: JexValue) -> JexValue {
    if (
        value.isString()
        || value.isNumber()
        || value.isBoolean()
        || value.isNil()
        || value.isInteger()
        || value.isDouble()
    ) {
        return value
    }
    
    if value.isArray() {
        var result: [JexValue] = []
        for element in try! value.asArray(context: "ToPrimitive") {
            result.append(toPrimitive(value: element))
        }
        return JexValueFactory.fromArray(array: result)
    }
    
    if value.isObject() {
        return JexValueFactory.fromString(string: "[object Object]")
    }
    
    return JexValueFactory.fromString(string: value.description)
}

public enum JSRelationalOp: String {
    case LESS_THAN
    case GREATER_THAN
    case LESS_THAN_EQUAL
    case GREATER_THAN_EQUAL
}

public func jsToNumberForRelOp(
    value: JexValue
) -> Double {
    do {
        if (value.isNil()) {
            return 0
        }
        
        if (value.isBoolean()) {
            return try value.asBoolean(context: "relOp") ? 1 : 0
        }
        
        if (value.isNumber()) {
            return try value.asNumber(context: "relOp").doubleValue
        }
        
        if (value.isInteger()) {
            return Double(try value.asInteger(context: "relOp"))
        }
        
        if (value.isDouble()) {
            return try value.asDouble(context: "relOp")
        }
        
        if (value.isString()) {
            return Double(String(try value.asString(context: "relOp"))) ?? Double.nan
        }
        
        return Double.nan
    } catch {
        return Double.nan
    }
    
}

public func jsRelational(
    left: JexValue,
    right: JexValue,
    op: JSRelationalOp
) -> Bool {
    // 1. JS ToPrimitive
    let a = toPrimitive(value: left)
    let b = toPrimitive(value: right)
    
    // 2. If both primitives are strings → lexicographical comparison
    if (
        a.isString() && b.isString()
    ) {
        let cmp = try! a.asString(context: "relOp").compare(try! b.asString(context: "relOp"))
        
        switch(op) {
        case .LESS_THAN:
            return cmp == .orderedAscending
        case .GREATER_THAN:
            return cmp == .orderedDescending
        case .LESS_THAN_EQUAL:
            return cmp == .orderedAscending || cmp == .orderedSame
        case .GREATER_THAN_EQUAL:
            return cmp == .orderedDescending || cmp == .orderedSame
        }
    }
    
    // 3. Otherwise → convert both to number
    let numA = jsToNumberForRelOp(value: left)
    let numB = jsToNumberForRelOp(value: right)
    
    // 4. If either is NaN → comparison returns false
    if (
        numA.isNaN || numB.isNaN
    ) {
        return false
    }
    
    switch(op) {
    case .LESS_THAN:
        return numA < numB
    case .GREATER_THAN:
        return numA > numB
    case .LESS_THAN_EQUAL:
        return numA <= numB
    case .GREATER_THAN_EQUAL:
        return numA >= numB
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



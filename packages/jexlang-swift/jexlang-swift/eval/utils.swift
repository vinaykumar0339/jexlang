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

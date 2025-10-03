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

public func toNumber(value: JexValue, ctx: String) throws -> Int {
    switch value {
    case is JexInteger:
        return try value.asInteger(context: ctx)
    case is JexNil:
        return 0
    default:
        throw TypeMismatchError(operation: "number conversion", expected: "number", actual: getJexValueType(value: value));
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

//
//  JexValue.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

public protocol JexValue: AnyObject, CustomStringConvertible {
    func isInteger() -> Bool
    func isDouble() -> Bool
    func isNumber() -> Bool
    func isBoolean() -> Bool
    func isString() -> Bool
    func isNil() -> Bool
    func isArray() -> Bool
    func isObject() -> Bool
    
    func getType() -> String
    
    func toObject() -> AnyObject?
    
    func asDouble(context: String) throws -> Double
    func asInteger(context: String) throws -> Int
    func asNumber(context: String) throws -> NSNumber
    func asBoolean(context: String) throws -> Bool
    func asString(context: String) throws -> String
    func asArray(context: String) throws -> [JexValue]
    func asObject(context: String) throws -> [String: JexValue]
    
    // Equals
    func equals(_ other: JexValue) -> Bool
    
}

public class JexValueFactory {
    static func typeError(
        want: String,
        ctx: String,
        actualValue: JexValue
    ) -> JexLangRuntimeError {
        return JexLangRuntimeError(message: "Expected \(want) in \(ctx) but got type \(actualValue.getType()) of value \(actualValue)")
    }
    
    static func fromInteger(integer: Int) -> JexInteger {
        return JexInteger(value: integer)
    }
    
    static func fromNumber(number: NSNumber) -> JexNumber {
        return JexNumber(value: number)
    }
    
    static func fromNumber(double: Double) -> JexNumber {
        return JexNumber(value: NSNumber(value: double))
    }
    
    static func fromNumer(int: Int) -> JexNumber {
        return JexNumber(value: NSNumber(value: int))
    }
    
    static func fromDouble(double: Double) -> JexDouble {
        return JexDouble(value: double)
    }
    
    static func fromString(string: String) -> JexString {
        return JexString(value: string)
    }
    
    static func fromString(char: Character) -> JexString {
        return JexString(value: "\(char)")
    }
    
    static func fromBoolean(value: Bool) -> JexBoolean {
        return JexBoolean(value: value)
    }
    
    static func fromArray(array: [JexValue]) -> JexArray {
        return JexArray(value: array)
    }
    
    static func fromObject(object: [String: JexValue]) -> JexObject {
        return JexObject(value: object)
    }
    
    static func fromArray(value: [AnyObject]) -> JexArray {
        let jexList = value.map { from($0) }
        return fromArray(array: jexList)
    }

    static func fromObject(value: Any) -> JexObject {
        guard let map = value as? [String: AnyObject] else {
            fatalError("Unsupported object type: \(type(of: value))")
        }

        var jexMap: [String: JexValue] = [:]
        for (key, val) in map {
            jexMap[key] = from(val)
        }
        return fromObject(object: jexMap)
    }
    
    static func fromNil() -> JexNil {
        return JexNil()
    }
    
    static func from(_ value: AnyObject?) -> JexValue {
            guard let value = value else {
                return fromNil()
            }

            switch value {
            case let num as NSNumber:
                // NSNumber can also represent Bool, so check that first
                if CFGetTypeID(num) == CFBooleanGetTypeID() {
                    return fromBoolean(value: num.boolValue)
                } else {
                    return fromNumber(number: num)
                }

            case let intVal as Int:
                return fromInteger(integer: intVal)

            case let doubleVal as Double:
                return fromDouble(double: doubleVal)

            case let boolVal as Bool:
                return fromBoolean(value: boolVal)

            case let str as String:
                return fromString(string: str)

            case let list as [AnyObject]:
                return fromArray(value: list)

            case let map as [String: Any]:
                return fromObject(value: map)

            default:
                fatalError("Unsupported type: \(type(of: value)). Supported types: nil, NSNumber, Int, Double, Bool, String, [Any], [String: Any]")
            }
        }
}

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
    func isNull() -> Bool
    func isArray() -> Bool
    func isObject() -> Bool
    
    func getType() -> String
    
    func toObject() -> Any
    
    func asDouble(context: String) throws -> Double
    func asInteger(context: String) throws -> Int
    func asNumber(context: String) throws -> NSNumber
    func asBoolean(context: String) throws -> Bool
    func asString(context: String) throws -> String
    func asArray(context: String) throws -> [JexValue]
    func asObject(context: String) throws -> [String: JexValue]
    
    func isEqual(to other: JexValue) -> Bool
    
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
    
    static func fromNumber(int: Int) -> JexNumber {
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
    
    static func fromArray(value: [Any]) -> JexArray {
        let jexList = value.map { from($0) }
        return fromArray(array: jexList)
    }

    static func fromObject(value: Any) -> JexObject {
        guard let map = value as? [String: Any] else {
            NSException.raise(jexLangError: JexLangRuntimeError(message: "Unsupported object type: \(type(of: value)). expected [String: Any]"))
            return fromObject(object: [:])
        }

        var jexMap: [String: JexValue] = [:]
        for (key, val) in map {
            jexMap[key] = from(val)
        }
        return fromObject(object: jexMap)
    }
    
    static func fromNil() -> JexNull {
        return JexNull()
    }
    
    private static func unwrapAllOptionals(_ value: Any?) -> Any? {
        var current: Any? = value

        while true {
            guard let unwrapped = current else {
                return nil
            }

            let mirror = Mirror(reflecting: unwrapped)

            guard mirror.displayStyle == .optional else {
                return unwrapped
            }

            if let child = mirror.children.first {
                current = child.value
            } else {
                return nil
            }
        }
    }

    
    static func from(_ value: Any?) -> JexValue {
        guard let value = unwrapAllOptionals(value) else {
           return fromNil()
       }

        switch value {

        case let intVal as Int:
            return fromNumber(int: intVal)

        case let doubleVal as Double:
            return fromNumber(double: doubleVal)
            
        // NOTE: Make sure bool check is before NSNumber and after Int or Double other wise true or false and yes or no captured by NSNumber causing it converting bool into NSNumber.
        case let boolVal as Bool:
            return fromBoolean(value: boolVal)
            
        case let num as NSNumber:
            return fromNumber(number: num)

        case let str as String:
            return fromString(string: str)

        case let list as [Any]:
            return fromArray(value: list)

        case let map as [String: Any]:
            return fromObject(value: map)
        
        case _ as NSNull:
            return fromNil()
            
        case let jexValue as JexValue:
            return jexValue

        default:
            fatalError("Unsupported type: \(type(of: value)). Supported types: nil, NSNumber, Int, Double, Bool, String, [Any], [String: Any]")
        }
    }

}

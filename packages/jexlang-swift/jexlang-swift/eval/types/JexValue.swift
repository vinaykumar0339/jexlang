//
//  JexValue.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

public protocol JexValue {
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
    
    static func fromDouble(double: Double) -> JexDouble {
        return JexDouble(value: double)
    }
    
    static func fromString(string: String) -> JexString {
        return JexString(value: string)
    }
    
    static func from(value: AnyObject?) throws -> JexValue {
        if (value == nil) {
            return JexNil()
        }
        if let intValue = value as? Int {
            return fromInteger(integer: intValue)
        }
        
        throw JexLangRuntimeError(message: "Unsupported type: \(String(describing: value.self)) Supported types are: null, Integer, Double, Boolean, String, List, Dictionary")
    }
}

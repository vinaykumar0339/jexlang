//
//  JexNumber.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 02/11/25.
//

import Foundation

public class JexNumber: JexValue {
    
    private let value: NSNumber
    
    public init(value: NSNumber) {
        self.value = value
    }
    
    public func isInteger() -> Bool {
        return false
    }
    
    public func isDouble() -> Bool {
        return false
    }
    
    public func isNumber() -> Bool {
        return true
    }
    
    public func isBoolean() -> Bool {
        return false
    }
    
    public func isString() -> Bool {
        return false
    }
    
    public func isNil() -> Bool {
        return false
    }
    
    public func isArray() -> Bool {
        return false
    }
    
    public func isObject() -> Bool {
        return false
    }
    
    public func getType() -> String {
        return "number"
    }
    
    public var description: String {
        return "\(value)"
    }
    
    public func toObject() -> AnyObject? {
        return value
    }
    
    public func asNumber(context: String) throws -> NSNumber {
        return value
    }
    
    public func asDouble(context: String) throws -> Double {
        throw JexValueFactory.typeError(want: "double", ctx: context, actualValue: self)
    }
    
    public func asInteger(context: String) throws -> Int {
        throw JexValueFactory.typeError(want: "integer", ctx: context, actualValue: self)
    }
    
    public func asBoolean(context: String) throws -> Bool {
        throw JexValueFactory.typeError(want: "boolean", ctx: context, actualValue: self)
    }
    
    public func asString(context: String) throws -> String {
        return description
    }
    
    public func asArray(context: String) throws -> [JexValue] {
        throw JexValueFactory.typeError(want: "array", ctx: context, actualValue: self)
    }
    
    public func asObject(context: String) throws -> [String : JexValue] {
        throw JexValueFactory.typeError(want: "object", ctx: context, actualValue: self)
    }
}

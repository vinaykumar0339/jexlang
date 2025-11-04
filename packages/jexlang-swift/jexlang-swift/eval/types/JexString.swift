//
//  JexString.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/10/25.
//

import Foundation

public class JexString: JexValue {
    
    private let value: String
    
    public init(value: String) {
        self.value = value
    }
    
    public func isInteger() -> Bool {
        return false
    }
    
    public func isDouble() -> Bool {
        return false
    }
    
    public func isNumber() -> Bool {
        return false
    }
    
    public func isBoolean() -> Bool {
        return false
    }
    
    public func isString() -> Bool {
        return true
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
        return "string"
    }
    
    public func toObject() -> AnyObject? {
        return value as AnyObject
    }
    
    public func asDouble(context: String) throws -> Double {
        throw JexValueFactory.typeError(want: "double", ctx: context, actualValue: self)
    }
    
    public func asInteger(context: String) throws -> Int {
        throw JexValueFactory.typeError(want: "double", ctx: context, actualValue: self)
    }
    
    public func asNumber(context: String) throws -> NSNumber {
        throw JexValueFactory.typeError(want: "number", ctx: context, actualValue: self)
    }
    
    public func asBoolean(context: String) throws -> Bool {
        throw JexValueFactory.typeError(want: "boolean", ctx: context, actualValue: self)
    }
    
    public func asString(context: String) -> String {
        return value;
    }
    
    public func asArray(context: String) throws -> [JexValue] {
        throw JexValueFactory.typeError(want: "array", ctx: context, actualValue: self)
    }
    
    public func asObject(context: String) throws -> [String : JexValue] {
        throw JexValueFactory.typeError(want: "object", ctx: context, actualValue: self)
    }
    
    public var description: String {
        return value
    }
}

//
//  JexBoolean.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 02/11/25.
//

import Foundation

public class JexBoolean: JexValue {
    public func isInteger() -> Bool {
        return false
    }
    
    public func isDouble() -> Bool {
        return false
    }
    
    public func isBoolean() -> Bool {
        return true
    }
    
    public func isNumber() -> Bool {
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
        return "boolean"
    }
    
    public func toObject() -> AnyObject? {
        return value as AnyObject
    }
    
    public func asDouble(context: String) throws -> Double {
        throw JexValueFactory.typeError(want: "double", ctx: context, actualValue: self)    }
    
    public func asInteger(context: String) throws -> Int {
        throw JexValueFactory.typeError(want: "double", ctx: context, actualValue: self)
    }
    
    public func asNumber(context: String) throws -> NSNumber {
        throw JexValueFactory.typeError(want: "number", ctx: context, actualValue: self)
    }
    
    public func asBoolean(context: String) throws -> Bool {
        return value
    }
    
    public func asString(context: String) throws -> String {
        throw JexValueFactory.typeError(want: "string", ctx: context, actualValue: self)
    }
    
    public func asArray(context: String) throws -> [any JexValue] {
        throw JexValueFactory.typeError(want: "array", ctx: context, actualValue: self)
    }
    
    public func asObject(context: String) throws -> [String : any JexValue] {
        throw JexValueFactory.typeError(want: "object", ctx: context, actualValue: self)
    }
    
    private let value: Bool
    
    internal init(value: Bool) {
        self.value = value
    }
    
    public var description: String {
        return "\(value)"
    }
    
    public func equals(_ other: JexValue) -> Bool {
        guard other.isBoolean() else { return false }
        return (try? other.asBoolean(context: "equals")) == value
    }
}

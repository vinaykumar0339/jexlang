//
//  JexInteger.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

public class JexInteger: JexValue, CustomStringConvertible {
    
    private var value: Int
    
    public init(value: Int) {
        self.value = value
    }
    
    public func isInteger() -> Bool {
        return true
    }
    
    public func isDouble() -> Bool {
        return false
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
        return "integer"
    }
    
    public var description: String {
        return "\(value)"
    }
    
    public func toObject() -> AnyObject? {
        return value as AnyObject;
    }
    
    public func asDouble(context: String) throws -> Double {
        throw JexValueFactory.typeError(want: "double", ctx: context, actualValue: self)
    }
    
    public func asInteger(context: String) -> Int {
        return value
    }
    
    public func asBoolean(context: String) throws -> Bool {
        throw JexValueFactory.typeError(want: "boolean", ctx: context, actualValue: self)
    }
    
    public func asString(context: String) throws -> String {
        throw JexValueFactory.typeError(want: "string", ctx: context, actualValue: self)
    }
    
    public func asArray(context: String) throws -> [JexValue] {
        throw JexValueFactory.typeError(want: "array", ctx: context, actualValue: self)
    }
    
    public func asObject(context: String) throws -> [String : JexValue] {
        throw JexValueFactory.typeError(want: "object", ctx: context, actualValue: self)
    }
}

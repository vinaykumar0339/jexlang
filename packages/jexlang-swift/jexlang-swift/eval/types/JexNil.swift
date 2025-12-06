//
//  JexNull.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

public class JexNil: JexValue {
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
        return false
    }
    
    public func isNil() -> Bool {
        return true
    }
    
    public func isArray() -> Bool {
        return false
    }
    
    public func isObject() -> Bool {
        return false
    }
    
    public func toObject() -> AnyObject? {
        return nil
    }
    
    public func asDouble(context: String) throws -> Double {
        throw JexValueFactory.typeError(want: "double", ctx: context, actualValue: self)
    }
    
    public func asInteger(context: String) throws -> Int {
        throw JexValueFactory.typeError(want: "integer", ctx: context, actualValue: self)
    }
    
    public func asNumber(context: String) throws -> NSNumber {
        throw JexValueFactory.typeError(want: "number", ctx: context, actualValue: self)
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
    
    public func getType() -> String {
        return "nil"
    }
    
    public var description: String {
        return "nil"
    }
    
    public func equals(_ other: JexValue) -> Bool {
        return other.isNil()
    }
}

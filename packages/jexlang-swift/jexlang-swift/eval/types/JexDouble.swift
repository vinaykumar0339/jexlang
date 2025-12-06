//
//  JexInteger.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

public class JexDouble: JexValue {
    
    private let value: Double
    
    public init(value: Double) {
        self.value = value
    }
    
    public func isInteger() -> Bool {
        return false
    }
    
    public func isDouble() -> Bool {
        return true
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
        return false
    }
    
    public func isArray() -> Bool {
        return false
    }
    
    public func isObject() -> Bool {
        return false
    }
    
    public func getType() -> String {
        return "double"
    }
    
    public var description: String {
        return "\(value)"
    }
    
    public func toObject() -> AnyObject? {
        return value as AnyObject;
    }
    
    public func asDouble(context: String) -> Double {
        return value
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
    
    public func equals(_ other: JexValue) -> Bool {
        if other.isDouble() {
            return (try? other.asDouble(context: "equals")) == value
        }
        if other.isNumber() {
            return (try? other.asNumber(context: "equals")).map { $0.doubleValue == value } ?? false
        }
        if other.isInteger() {
            return (try? other.asInteger(context: "equals")).map { Double($0) == value } ?? false
        }
        return false
    }
}


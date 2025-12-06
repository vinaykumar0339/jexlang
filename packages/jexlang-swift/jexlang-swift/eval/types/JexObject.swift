//
//  JexObject.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/11/25.
//

import Foundation

public class JexObject: JexValue {
    
    public func asArray(context: String) throws -> [any JexValue] {
        throw JexValueFactory.typeError(want: "array", ctx: context, actualValue: self)
    }
    
    public func asObject(context: String) -> [String : any JexValue] {
        return value
    }
    
    
    private let value: [String: JexValue]
    
    init(value: [String : JexValue]) {
        self.value = value
    }
    
    public func getType() -> String {
        return "object"
    }
    
    public var description: String {
        return "{\(value.map { "\($0.key): \($0.value)" }.joined(separator: ", "))}"
    }
    
    public func toObject() -> AnyObject? {
        var map: [String: AnyObject] = [:]
        for (key, val) in value {
            map[key] = val.toObject();
        }
        return map as NSDictionary
    }
    
    public func asInteger(context: String) throws -> Int {
        throw JexValueFactory.typeError(want: "integer", ctx: context, actualValue: self)
    }
    
    public func asDouble(context: String) throws -> Double {
        throw JexValueFactory.typeError(want: "double", ctx: context, actualValue: self)
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
    
    public func isNil() -> Bool {
        return false;
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
        return false
    }
    
    public func isArray() -> Bool {
        return false
    }
    
    public func isObject() -> Bool {
        return true
    }
    
}

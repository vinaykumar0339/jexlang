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
    
    
    private var value: [String: JexValue]
    
    public func get(_ key: String) -> JexValue? {
        return value[key]
    }

    public func set(_ key: String, _ newValue: JexValue) {
        value[key] = newValue
    }

    public func remove(_ key: String) {
        value.removeValue(forKey: key)
    }

    public func contains(_ key: String) -> Bool {
        value[key] != nil
    }

    public var keys: [String] {
        Array(value.keys)
    }

    public var count: Int {
        value.count
    }
    
    init(value: [String : JexValue]) {
        self.value = value
    }
    
    public func getType() -> String {
        return "object"
    }
    
    public var description: String {
        return "{\(value.map { "\($0.key): \($0.value)" }.joined(separator: ", "))}"
    }
    
    public func toObject() -> Any {
        var map: [String: Any] = [:]
        for (key, val) in value {
            map[key] = val.toObject();
        }
        return map
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
    
    public func isNull() -> Bool {
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
    
    public func isEqual(to other: any JexValue) -> Bool {
        // For Object, it should reference equality
        if (!other.isObject()) {
            return false
        }
        return self === other;
    }
    
}

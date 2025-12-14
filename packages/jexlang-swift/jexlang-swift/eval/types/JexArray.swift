//
//  JexArray.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/11/25.
//

import Foundation

public class JexArray: JexValue {
    private var value: [JexValue]
    
    init(value: [JexValue]) {
        self.value = value
    }
    
    public func get(_ index: Int) -> JexValue {
        return value[index]
    }

    public func set(_ index: Int, _ newValue: JexValue) {
        value[index] = newValue
    }

    public var count: Int {
        value.count
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
    
    public func isNil() -> Bool {
        return false
    }
    
    public func isArray() -> Bool {
        return true
    }
    
    public func isObject() -> Bool {
        return false
    }
    
    public func getType() -> String {
        return "array"
    }
    
    public var description: String {
        return "[\(value.map(\.description).joined(separator: ", "))]"
    }
    
    public func toObject() -> Any {
        var list = [Any]()
        for item in value {
            list.append(item.toObject())
        }
        return list
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
    
    public func asArray(context: String) -> [JexValue] {
        return value
    }
    
    public func asObject(context: String) throws -> [String : JexValue] {
        throw JexValueFactory.typeError(want: "object", ctx: context, actualValue: self)
    }
    
    public func isEqual(to other: any JexValue) -> Bool {
        // For Array, it should reference equality
        if (!other.isArray()) {
            return false
        }
        return self === other
    }
    
}

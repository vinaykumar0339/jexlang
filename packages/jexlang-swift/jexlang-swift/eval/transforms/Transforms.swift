//
//  Transforms.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/11/25.
//

import Foundation

public class Transforms {
    public static func makeBuiltins() -> [String: TransformImpl] {
        var transforms: [String: TransformImpl] = [:]
        
        // String transforms
        transforms["upper"] = { (v, ctx) in
            str(toString(value: v, ctx: "upper transform").uppercased())
        }
        transforms["lower"] = { (v, ctx) in
            str(toString(value: v, ctx: "upper transform").lowercased())
        }
        transforms["capitalize"] = { (v, ctx) in
            str(toString(value: v, ctx: "capitalize transform").capitalized)
        }
        transforms["trim"] = { (v, ctx) in
            str(toString(value: v, ctx: "trim transform").trimmingCharacters(in: .whitespacesAndNewlines))
        }
        
        // Numeric transforms
        transforms["abs"] = { (v, ctx) in
            num(abs(toNumber(value: v, ctx: "abs transform").doubleValue))
        }
        transforms["round"] = { (v, ctx) in
            num(round(toNumber(value: v, ctx: "abs transform").doubleValue))
        }
        transforms["floor"] = { (v, ctx) in
            num(floor(toNumber(value: v, ctx: "abs transform").doubleValue))
        }
        transforms["ceil"] = { (v, ctx) in
            num(ceil(toNumber(value: v, ctx: "abs transform").doubleValue))
        }
        
        // Array/object/string length
        transforms["length"] = { (v, ctx) in
            if (v.isArray()) {
                return num((try! v.asArray(context: "length transform")).count)
            }
            if (v.isString()) {
                return num((try! v.asString(context: "length transform")).count)
            }
            if (v.isObject()) {
                return num((try! v.asObject(context: "length transform").count))
            }
            return num(0)
        }
        
        // Type transforms
        transforms["number"] = { (v, ctx) in
            return num(toNumber(value: v, ctx: "number transform").doubleValue)
        }
        transforms["string"] = { (v, ctx) in
            return str(try! v.asString(context: "string transform"))
        }
        transforms["boolean"] = { (v, ctx) in
            return bool(try! v.asBoolean(context: "boolean transform"))
        }
        transforms["int"] = { (v, ctx) in
            return integer(toNumber(value: v, ctx: "int transform").intValue)
        }
        transforms["float"] = { (v, ctx) in
            return doubleValue(toNumber(value: v, ctx: "float transform").floatValue)
        }
        transforms["double"] = { (v, ctx) in
            return doubleValue(toNumber(value: v, ctx: "float transform").doubleValue)
        }
        return transforms
    }
    
    public static func createDefaultFuncRegistry() -> MapTransformRegistry {
        return MapTransformRegistry(makeBuiltins())
    }
}

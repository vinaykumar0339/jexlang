//
//  MapFuncRegistry.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/11/25.
//

import Foundation

public final class MapFuncRegistry: FuncRegistry {
    private var map: [String: FuncImpl]

    public init(_ funcMap: [String: FuncImpl] = [:]) {
        self.map = funcMap
    }

    public func set(_ name: String, _ fn: @escaping FuncImpl) {
        map[name] = fn
    }

    public func getAll() -> [String: FuncImpl] {
        return map
    }

    public func has(_ name: String) -> Bool {
        return map[name] != nil
    }

    public func remove(_ name: String) {
        map.removeValue(forKey: name)
    }

    public func call(_ name: String, _ ctx: EvaluatorContext, _ args: [JexValue]) -> JexValue {
        guard let fn = map[name] else {
            fatalError("Unknown function: \(name)")
        }
        return fn(ctx, args)
    }
}

//
//  MapTransformRegistry.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/11/25.
//

import Foundation

public final class MapTransformRegistry: TransformRegistry {
    private var map: [String: TransformImpl]

    public init(_ transformMap: [String: TransformImpl] = [:]) {
        self.map = transformMap
    }

    public func set(_ name: String, _ fn: @escaping TransformImpl) {
        map[name] = fn
    }

    public func getAll() -> [String: TransformImpl] {
        map
    }

    public func has(_ name: String) -> Bool {
        map[name] != nil
    }

    public func remove(_ name: String) {
        map.removeValue(forKey: name)
    }

    public func transform(_ name: String, _ input: JexValue, _ ctx: EvaluatorContext) -> JexValue {
        guard let fn = map[name] else {
            fatalError("Unknown transform: \(name)")
        }
        return fn(input, ctx)
    }
}

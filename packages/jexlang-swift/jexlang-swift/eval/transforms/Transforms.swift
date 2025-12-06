//
//  Transforms.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/11/25.
//

import Foundation

public class Transforms {
    public static func makeBuiltins() -> [String: TransformImpl] {
        let transforms: [String: TransformImpl] = [:]
        return transforms
    }
    
    public static func createDefaultFuncRegistry() -> MapTransformRegistry {
        return MapTransformRegistry(makeBuiltins())
    }
}

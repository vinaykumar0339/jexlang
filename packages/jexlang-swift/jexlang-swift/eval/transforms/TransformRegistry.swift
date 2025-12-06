//
//  TransformRegistry.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/11/25.
//

import Foundation


public protocol TransformRegistry {
    func has(_ name: String) -> Bool
    func transform(_ name: String, _ input: JexValue, _ ctx: EvaluatorContext) -> JexValue
}

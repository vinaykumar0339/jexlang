//
//  FuncRegistry.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/11/25.
//

import Foundation

public protocol FuncRegistry {
    func has(_ name: String) -> Bool
    func call(_ name: String, _ args: [JexValue]) -> JexValue
}

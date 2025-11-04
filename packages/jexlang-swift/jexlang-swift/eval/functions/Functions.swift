//
//  Functions.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/11/25.
//

import Foundation

public class Functions {
    public static func makeBultins() -> [String: FuncImpl] {
        let functions: [String: FuncImpl] = [:]
        
        return functions;
    }
    
    public static func createDefaultFuncRegistry() -> MapFuncRegistry {
        return MapFuncRegistry(makeBultins())
    }
}

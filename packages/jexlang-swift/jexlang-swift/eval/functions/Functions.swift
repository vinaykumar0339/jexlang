//
//  Functions.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/11/25.
//

import Foundation

public class Functions {
    public static func makeBultins() -> [String: FuncImpl] {
        var functions: [String: FuncImpl] = [:]
        
        
        // String functions
        functions["length"] = { (ctx, args) in
            let value = args[0]
            if (value.isString()) {
                return JexValueFactory.from((try! value.asString(context: "length method")).count)
            } else if (value.isArray()) {
                return JexValueFactory.from((try! value.asArray(context: "length method")).count)
            }
            
            NSException.raise(jexLangError: TypeMismatchError(operation: "length", expected: "string or array", actual: value.getType()))
            return JexNil()
        }
        
        return functions;
    }
    
    public static func createDefaultFuncRegistry() -> MapFuncRegistry {
        return MapFuncRegistry(makeBultins())
    }
}

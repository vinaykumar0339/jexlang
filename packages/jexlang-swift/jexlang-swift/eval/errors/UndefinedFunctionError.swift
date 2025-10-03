//
//  UndefinedFunctionError.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

public class UndefinedFunctionError: JexLangRuntimeError {
    public let functionName: String
    
    init(functionName: String) {
        self.functionName = functionName
        super.init(message: "Undefined function: " + functionName)
    }
    
    public func getFunctionName() -> String {
        return self.functionName;
    }
}

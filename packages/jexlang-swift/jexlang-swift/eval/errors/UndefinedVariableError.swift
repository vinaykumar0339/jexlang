//
//  UndefinedVariableError.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

public class UndefinedVariableError: JexLangRuntimeError {
    public let variableName: String
    
    init(variableName: String) {
        self.variableName = variableName
        super.init(message: "Undefined variable: " + variableName)
    }
    
    public func getVariableName() -> String {
        return self.variableName;
    }
}

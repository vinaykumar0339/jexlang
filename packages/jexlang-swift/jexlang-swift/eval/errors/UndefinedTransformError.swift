//
//  UndefinedTransformError.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

public class UndefinedTransformError: JexLangRuntimeError {
    public let transformName: String
    
    init(transformName: String) {
        self.transformName = transformName
        super.init(message: "Undefined transform: " + transformName)
    }
    
    public func getTransformName() -> String {
        return self.transformName;
    }
}

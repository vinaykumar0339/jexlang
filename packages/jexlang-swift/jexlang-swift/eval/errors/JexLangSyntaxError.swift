//
//  JexLangSyntaxError.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

public class JexLangSyntaxError: JexLangRuntimeError {
    private let location: SyntaxErrorLocation
    
    public init(message: String, location: SyntaxErrorLocation) {
        self.location = location
        super.init(message: message)
    }
    
    public override func getName() -> String {
        return "JexLangSyntaxError"
    }
}

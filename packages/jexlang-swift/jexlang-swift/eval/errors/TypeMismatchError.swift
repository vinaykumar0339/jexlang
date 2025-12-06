//
//  TypeMismatchError.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

public class TypeMismatchError: JexLangRuntimeError {
    private let expected: String
    private let actual: String
    
    public init(operation: String, expected: String, actual: String) {
        self.expected = expected
        self.actual = actual
        super.init(message: "Type mismatch in operation '" + operation + "': expected " + expected + ", but got " + actual)
    }
    
    public func getExpected() -> String {
        return expected
    }
    
    public func getActual() -> String {
        return actual
    }
}

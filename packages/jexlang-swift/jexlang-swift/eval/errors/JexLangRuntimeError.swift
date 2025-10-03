//
//  JexLangRuntimeError.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

public class JexLangRuntimeError: Error {
    private let name: String
    private let message: String
    
    public init(message: String) {
        self.message = message
        self.name = "JexLangRuntimeError"
    }
    
    public func getName() -> String {
        return name
    }
}

extension JexLangRuntimeError: LocalizedError {
    public var errorDescription: String? {
        return message
    }
    
    public var failureReason: String? {
        return name
    }
}

extension JexLangRuntimeError: CustomStringConvertible {
    public var description: String {
        return "\(name): \(message)"
    }
}

//
//  DivisionByZeroError.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

public class DivisionByZeroError: JexLangRuntimeError {
    public init() {
        super.init(message: "Division by zero");
    }

    public override func getName() -> String {
        return "DivisionByZeroError";
    }
}

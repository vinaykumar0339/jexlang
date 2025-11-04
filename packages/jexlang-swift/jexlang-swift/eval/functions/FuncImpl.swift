//
//  FuncImpl.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/11/25.
//

import Foundation

public protocol FuncImpl {
    func apply(_ args: [JexValue]) -> JexValue
}


//
//  TransformImpl.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/11/25.
//

import Foundation

public protocol TransformImpl {
    func apply(_ input: JexValue) -> JexValue
}

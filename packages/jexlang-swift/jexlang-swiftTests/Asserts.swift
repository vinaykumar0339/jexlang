//
//  Asserts.swift
//  jexlang-swiftTests
//
//  Created by Vinay Kumar on 12/12/25.
//

import Foundation
import Testing

func assertEquals<T: Equatable>(_ expected: T, _ actual: Any?) {
    let success = (actual as? T) == expected
    #expect(success, "Expected \(expected), got \(String(describing: actual))")
}


func assertNil(_ actual: Any?, _ message: String = "") {
    #expect(actual == nil, "\(message)")
}

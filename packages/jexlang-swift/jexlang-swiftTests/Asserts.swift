//
//  Asserts.swift
//  jexlang-swiftTests
//
//  Created by Vinay Kumar on 12/12/25.
//

import Foundation
import Testing

/// Fails if both are not equals
func assertEquals<T: Equatable>(_ expected: T, _ actual: Any?) {
    let success = (actual as? T) == expected
    #expect(success, "Expected \(expected), got \(String(describing: actual))")
}

/// Fails if the expression is not nil
func assertNil(_ actual: Any?, _ message: String = "") {
    #expect(actual == nil, "\(message)")
}

/// Fails if the expression is nil
func assertNotNil(_ value: Any?, _ message: String = "") {
    if message.isEmpty {
        #expect(value != nil)
    } else {
        #expect(value != nil, "\(message)")
    }
}

/// Fails if the expression is false
func assertTrue(_ value: Bool, _ message: String = "") {
    if message.isEmpty {
        #expect(value)
    } else {
        #expect(value, "\(message)")
    }
}

/// Fails if the expression is true
func assertFalse(_ value: Bool, _ message: String = "") {
    if message.isEmpty {
        #expect(!value)
    } else {
        #expect(!value, "\(message)")
    }
}

/// Fails if the closure does NOT throw an error
func assertThrows<T>(_ closure: @autoclosure () throws -> T, _ message: String = "") {
    do {
        _ = try closure()
        if message.isEmpty {
            #expect(Bool(false)) // closure did NOT throw
        } else {
            #expect(Bool(false), "\(message)")
        }
    } catch {
        // success: error was thrown
        #expect(true)
    }
}

// MARK: - assertThrows (specific error type)
func assertThrows<T, E: Error>(
    _ expectedError: E.Type,
    _ closure: @autoclosure () throws -> T,
    _ message: String = ""
) {
    do {
        _ = try closure()
        if message.isEmpty {
            #expect(Bool(false)) // did NOT throw
        } else {
            #expect(Bool(false), "\(message)")
        }
    } catch _ as E {
        #expect(true) // success: threw correct error type
    } catch {
        // wrong type of error
        let message = message.isEmpty ? "Expected \(E.self), got \(type(of: error))" : message
        #expect(Bool(false),  "\(message)")
    }
}

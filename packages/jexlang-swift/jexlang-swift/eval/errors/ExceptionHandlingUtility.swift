//
//  ExceptionHandlingUtility.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 10/12/25.
//

import Foundation

public enum ExceptionError: Error {
    case nsException(exception: NSException)
    case underlyingError(Error)
}

// Update this function to call the ObjectiveCExceptionCatcher class method
public func catchNSException<T>(_ block: @escaping () throws -> T) throws -> T {
    var result: T? = nil
    var swiftError: Error? = nil
    
    let nsException = ObjectiveCExceptionCatcher.catchException {
        do {
            result = try block()
        } catch {
            swiftError = error
        }
    }
    
    if let nsException = nsException {
        throw ExceptionError.nsException(exception: nsException)
    }
    
    if let swiftError = swiftError {
        throw ExceptionError.underlyingError(swiftError)
    }
    
    guard let finalResult = result else {
        fatalError("catchNSException should have either returned a value or thrown an exception.")
    }
    
    return finalResult
}

//
//  NSException+Extensions.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 10/12/25.
//

import Foundation

extension NSException {
    
    /// A convenient way to raise a JexLangRuntimeError immediately as an NSException.
    /// This bypasses Swift's 'throws' checking in functions where it is disallowed.
    /// - Parameter error: The JexLangRuntimeError instance to convert and raise.
    @objc static func raise(jexLangError error: JexLangRuntimeError) {
        NSException(
            name: NSExceptionName(rawValue: error.getName()), // "JexLangRuntimeError"
            reason: error.localizedDescription,              // The error message
            userInfo: nil
        ).raise()
    }
}

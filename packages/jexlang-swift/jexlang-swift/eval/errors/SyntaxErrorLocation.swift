//
//  SyntaxErrorLocation.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 03/10/25.
//

import Foundation

public struct SyntaxErrorLocation: CustomStringConvertible {
    private var line: Int
    private var column: Int
    private var offendingSymbol: String?
    
    public init(line: Int, column: Int, offendingSymbol: String? = nil) {
        self.line = line
        self.column = column
        self.offendingSymbol = offendingSymbol
    }
    
    public func getLine() -> Int {
        return line
    }
    
    public mutating func setLine(line: Int) {
        self.line = line
    }
    
    public func getColumn() -> Int {
        return column;
    }

    public mutating func setColumn(column: Int) {
        self.column = column;
    }

    public func getOffendingSymbol() -> String? {
        return offendingSymbol;
    }

    public mutating func setOffendingSymbol(offendingSymbol: String) {
        self.offendingSymbol = offendingSymbol;
    }
    
    public var description: String {
        return "SyntaxErrorLocation(line: \(line), column: \(column), offendingSymbol: \(String(describing: offendingSymbol)))"
    }
    
    
}

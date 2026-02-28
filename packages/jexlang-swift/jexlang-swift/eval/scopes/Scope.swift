//
//  Scope.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 04/11/25.
//

import Foundation

public final class Scope {

    // MARK: - ScopeType Enum
    public enum ScopeType {
        case global
        case program
        case block
    }

    // MARK: - Properties
    private let parentScope: Scope?
    private var variables: [String: JexValue]
    private var constants: Set<String>
    private let scopeType: ScopeType

    // MARK: - Initializer
    public init(parentScope: Scope? = nil, scopeType: ScopeType) {
        self.parentScope = parentScope
        self.scopeType = scopeType
        self.variables = [:]
        self.constants = []
    }

    // MARK: - Scope Access
    public func getParentScope() -> Scope? {
        return parentScope
    }

    // MARK: - Variable Declaration
    public func declareVariable(_ name: String, value: JexValue, isConst: Bool) {
        let isGlobalScope = (self.scopeType == .global)

        if variables[name] != nil && !isGlobalScope {
            NSException.raise(jexLangError: JexLangRuntimeError(message: "Variable '\(name)' is already declared."))
            return
        }

        variables[name] = value

        if isConst {
            constants.insert(name)
        } else if !isConst && constants.contains(name) && isGlobalScope {
            // Delete from constants if re-declared as non-const for the same variable in global scope
            constants.remove(name)
        }
    }

    // MARK: - Variable Assignment
    public func assignVariable(_ name: String, value: JexValue) {
        guard let scope = resolveScope(for: name) else {
            NSException.raise(jexLangError: JexLangRuntimeError(message: "Variable '\(name)' is not declared."))
            return
        }

        if scope.constants.contains(name) {
            NSException.raise(jexLangError: JexLangRuntimeError(message: "Variable '\(name)' is a constant and cannot be re-declared or modified."))
            return
        }

        scope.variables[name] = value
    }

    // MARK: - Declare or Assign
    public func declareAndAssignVariable(_ name: String, value: JexValue, isConst: Bool) {
        if variables[name] != nil {
            assignVariable(name, value: value)
        } else {
            declareVariable(name, value: value, isConst: isConst)
        }
    }

    // MARK: - Scope Resolution
    public func resolveScope(for name: String) -> Scope? {
        if variables[name] != nil {
            return self
        } else if let parent = parentScope {
            return parent.resolveScope(for: name)
        } else {
            return nil
        }
    }

    public func resolveScope(ofType type: ScopeType) -> Scope? {
        if self.scopeType == type {
            return self
        } else if let parent = parentScope {
            return parent.resolveScope(ofType: type)
        } else {
            return nil
        }
    }

    // MARK: - Accessors
    public func getAllVariables() -> [String: JexValue] {
        return variables
    }

    public func getVariable(_ name: String) -> JexValue {
        if let val = variables[name] {
            return val
        }

        if let parent = parentScope {
            return parent.getVariable(name)
        }

        return JexNull()
    }

    public func hasVariable(_ name: String) -> Bool {
        return resolveScope(for: name) != nil
    }
}


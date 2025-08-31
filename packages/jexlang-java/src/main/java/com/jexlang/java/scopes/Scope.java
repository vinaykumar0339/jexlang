package com.jexlang.java.scopes;

import com.jexlang.java.eval.errors.JexLangRuntimeError;
import com.jexlang.java.types.JexNull;
import com.jexlang.java.types.JexValue;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

public class Scope {

    public enum ScopeType {
        GLOBAL,
        PROGRAM,
        BLOCK
    }

    private final Scope parentScope;

    private final Map<String, JexValue> variables;
    private final Set<String> constants;
    private final ScopeType scopeType;

    public Scope(
            Scope parentScope,
            ScopeType scopeType
    ) {
        this.parentScope = parentScope;
        this.scopeType = Objects.requireNonNullElse(scopeType, ScopeType.PROGRAM);
        this.variables = new HashMap<>();
        this.constants = new java.util.HashSet<>();
    }

    public Scope getParentScope() {
        return parentScope;
    }

    public void declareVariable(String name, JexValue value, boolean isConst) {
        if (this.variables.containsKey(name)) {
            throw new JexLangRuntimeError("Variable '" + name + "' is already declared.");
        }
        this.variables.put(name, value);
        if (isConst) {
            this.constants.add(name);
        }
    }

    public void assignVariable(String name, JexValue value) {
        Scope scope = this.resolveScope(name);
        if (scope == null) {
            throw new JexLangRuntimeError("Variable '" + name + "' is not declared.");
        }
        if (scope.constants.contains(name)) {
            throw new JexLangRuntimeError("Variable '" + name + "' is a constant and cannot be re-declared or modified.");
        }
        scope.variables.put(name, value);
    }

    public Scope resolveScope(String name) {
        if (this.variables.containsKey(name)) {
            return this;
        } else if (this.parentScope != null) {
            return this.parentScope.resolveScope(name);
        } else {
            return null;
        }
    }

    public Scope resolveScope(ScopeType scopeType) {
        if (this.scopeType == scopeType) {
            return this;
        } else if (this.parentScope != null) {
            return this.parentScope.resolveScope(scopeType);
        } else {
            return null;
        }
    }

    public JexValue getVariable(String name) {
        if (this.variables.containsKey(name)) {
            return this.variables.get(name);
        }

        // If not in this scope, check parent scope.
        if (this.parentScope != null) {
            return this.parentScope.getVariable(name);
        }

        return new JexNull();
    }

    public boolean hasVariable(String name) {
        return this.resolveScope(name) != null;
    }
}

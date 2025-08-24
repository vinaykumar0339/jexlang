package com.jexlang.java.scopes;

import com.jexlang.java.types.JexValue;

import java.util.ArrayList;
import java.util.Collections;

public class ScopeStack {
    private ArrayList<Scope> scopes = new ArrayList<>(Collections.singletonList(new Scope())); // Start with global scope

    public Scope pushScope() {
        Scope scope = new Scope();
        scopes.add(scope);
        return scope;
    }

    public Scope popScope() {
        if (this.scopes.size() <= 1) {
            return null; // Keep at least one scope
        }
        return scopes.remove(scopes.size() - 1);
    }

    public Scope currentScope() {
        if (scopes.isEmpty()) {
            throw new RuntimeException("No current scope");
        }
        return scopes.get(scopes.size() - 1);
    }

    public void set(String name, JexValue value) {
        currentScope().set(name, value);
    }

    public JexValue get(String name) {
        for (int i = scopes.size() - 1; i >= 0; i--) {
            Scope scope = scopes.get(i);
            if (scope.has(name)) {
                return scope.get(name);
            }
        }
        return null;
    }

    public boolean has(String name) {
        for (int i = scopes.size() - 1; i >= 0; i--) {
            Scope scope = scopes.get(i);
            if (scope.has(name)) {
                return true;
            }
        }
        return false;
    }
}

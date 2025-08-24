package com.jexlang.java.types;

public class JexObject implements JexValue {
    private final java.util.Map<String, JexValue> value;
    public JexObject(java.util.Map<String, JexValue> value) { this.value = value; }
    public boolean isNumber() { return false; }
    public boolean isBoolean() { return false; }
    public boolean isString() { return false; }
    public boolean isNull() { return false; }
    public boolean isArray() { return false; }
    public boolean isObject() { return true; }
    public Number asNumber(String ctx) { throw JexValue.typeError("number", ctx); }
    public boolean asBoolean(String ctx) { throw JexValue.typeError("boolean", ctx); }
    public String asString(String ctx) { throw JexValue.typeError("string", ctx); }
    public java.util.List<JexValue> asArray(String ctx) { throw JexValue.typeError("array", ctx); }
    public java.util.Map<String, JexValue> asObject(String ctx) { return value; }
}

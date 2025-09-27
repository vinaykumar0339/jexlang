package com.jexlang.java.types;

public class JexString implements JexValue {
    private final String value;
    public JexString(String value) { this.value = value; }

    @Override
    public String getType() {
        return "string";
    }

    @Override
    public String toString() {
        return "\"" + value.replace("\"", "\\\"") + "\""; // Escape quotes for JSON-like representation
    }

    @Override
    public Object toObject() {
        return value; // Represents the string value in Java
    }

    public boolean isInteger() { return false; }
    public boolean isDouble() { return false; }
    public boolean isNumber() { return false; }
    public boolean isBoolean() { return false; }
    public boolean isString() { return true; }
    public boolean isNull() { return false; }
    public boolean isArray() { return false; }
    public boolean isObject() { return false; }
    public Integer asInteger(String ctx) { throw JexValue.typeError("integer", ctx, this); }
    public Double asDouble(String ctx) { throw JexValue.typeError("double", ctx, this); }
    public Number asNumber(String ctx) { throw JexValue.typeError("number", ctx, this); }
    public boolean asBoolean(String ctx) { throw JexValue.typeError("boolean", ctx, this); }
    public String asString(String ctx) { return value; }
    public java.util.List<JexValue> asArray(String ctx) { throw JexValue.typeError("array", ctx, this); }
    public java.util.Map<String, JexValue> asObject(String ctx) { throw JexValue.typeError("object", ctx, this); }
}

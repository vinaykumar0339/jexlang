package com.jexlang.java.types;

public class JexInteger implements JexValue {
    private final Integer value;
    public JexInteger(Integer value) { this.value = value; }

    @Override
    public String getType() {
        return "integer";
    }

    @Override
    public String toString() {
        return value.toString();
    }

    @Override
    public Object toObject() {
        return value; // Represents the integer value in Java
    }

    public boolean isInteger() { return true; }
    public boolean isDouble() { return false; }
    public boolean isNumber() { return false; }
    public boolean isBoolean() { return false; }
    public boolean isString() { return false; }
    public boolean isNull() { return false; }
    public boolean isArray() { return false; }
    public boolean isObject() { return false; }
    public Integer asInteger(String ctx) { return value; }
    public Double asDouble(String ctx) { throw JexValue.typeError("double", ctx, this); }
    public Number asNumber(String ctx) { throw JexValue.typeError("number", ctx, this); }
    public boolean asBoolean(String ctx) { throw JexValue.typeError("boolean", ctx, this); }
    public String asString(String ctx) { throw JexValue.typeError("string", ctx, this); }
    public java.util.List<JexValue> asArray(String ctx) { throw JexValue.typeError("array", ctx, this); }
    public java.util.Map<String, JexValue> asObject(String ctx) { throw JexValue.typeError("object", ctx, this); }
}

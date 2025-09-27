package com.jexlang.java.types;

public class JexDouble implements JexValue {
    private final Double value;
    public JexDouble(Double value) { this.value = value; }

    @Override
    public String getType() {
        return "double";
    }

    @Override
    public String toString() {
        return String.format("%.2f", value);
    }

    @Override
    public Object toObject() {
        return value; // Represents the double value in Java
    }

    public boolean isInteger() { return false; }
    public boolean isDouble() { return true; }
    public boolean isNumber() { return false; }
    public boolean isBoolean() { return false; }
    public boolean isString() { return false; }
    public boolean isNull() { return false; }
    public boolean isArray() { return false; }
    public boolean isObject() { return false; }
    public Integer asInteger(String ctx) { throw JexValue.typeError("integer", ctx, this); }
    public Double asDouble(String ctx) { return value; }
    public Number asNumber(String ctx) { throw JexValue.typeError("number", ctx, this); }
    public boolean asBoolean(String ctx) { throw JexValue.typeError("boolean", ctx, this); }
    public String asString(String ctx) { throw JexValue.typeError("string", ctx, this); }
    public java.util.List<JexValue> asArray(String ctx) { throw JexValue.typeError("array", ctx, this); }
    public java.util.Map<String, JexValue> asObject(String ctx) { throw JexValue.typeError("object", ctx, this); }
}

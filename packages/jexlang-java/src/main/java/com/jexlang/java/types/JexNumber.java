package com.jexlang.java.types;

public class JexNumber implements JexValue {
    private final Number value;
    public JexNumber(Number value) { this.value = value; }

    @Override
    public String getType() {
        return "number";
    }

    @Override
    public String toString() {
        if (value instanceof Double || value instanceof Float) {
            return String.format("%.2f", value.doubleValue());
        } else {
            return value.toString();
        }
    }

    @Override
    public Object toObject() {
        return value; // Represents the number value in Java
    }

    public boolean isInteger() { return false; }
    public boolean isDouble() { return false; }
    public boolean isNumber() { return true; }
    public boolean isBoolean() { return false; }
    public boolean isString() { return false; }
    public boolean isNull() { return false; }
    public boolean isArray() { return false; }
    public boolean isObject() { return false; }
    public Number asNumber(String ctx) { return value; }
    public Integer asInteger(String ctx) { throw JexValue.typeError("integer", ctx, this); }
    public Double asDouble(String ctx) { throw JexValue.typeError("double", ctx, this); }
    public boolean asBoolean(String ctx) { throw JexValue.typeError("boolean", ctx, this); }
    public String asString(String ctx) { throw JexValue.typeError("string", ctx, this); }
    public java.util.List<JexValue> asArray(String ctx) { throw JexValue.typeError("array", ctx, this); }
    public java.util.Map<String, JexValue> asObject(String ctx) { throw JexValue.typeError("object", ctx, this); }
}

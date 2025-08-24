package com.jexlang.java.types;

public class JexNumber implements JexValue {
    private final Number value;
    public JexNumber(Number value) { this.value = value; }

    @Override
    public String getType() {
        return "number";
    }

    public boolean isNumber() { return true; }
    public boolean isBoolean() { return false; }
    public boolean isString() { return false; }
    public boolean isNull() { return false; }
    public boolean isArray() { return false; }
    public boolean isObject() { return false; }
    public Number asNumber(String ctx) { return value; }
    public boolean asBoolean(String ctx) { throw JexValue.typeError("boolean", ctx); }
    public String asString(String ctx) { throw JexValue.typeError("string", ctx); }
    public java.util.List<JexValue> asArray(String ctx) { throw JexValue.typeError("array", ctx); }
    public java.util.Map<String, JexValue> asObject(String ctx) { throw JexValue.typeError("object", ctx); }
}

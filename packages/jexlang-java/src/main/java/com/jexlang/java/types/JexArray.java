package com.jexlang.java.types;

public class JexArray implements JexValue {
    private final java.util.List<JexValue> value;
    public JexArray(java.util.List<JexValue> value) { this.value = value; }

    @Override
    public String getType() {
        return "array";
    }

    public boolean isNumber() { return false; }
    public boolean isBoolean() { return false; }
    public boolean isString() { return false; }
    public boolean isNull() { return false; }
    public boolean isArray() { return true; }
    public boolean isObject() { return false; }
    public Number asNumber(String ctx) { throw JexValue.typeError("number", ctx); }
    public boolean asBoolean(String ctx) { throw JexValue.typeError("boolean", ctx); }
    public String asString(String ctx) { throw JexValue.typeError("string", ctx); }
    public java.util.List<JexValue> asArray(String ctx) { return value; }
    public java.util.Map<String, JexValue> asObject(String ctx) { throw JexValue.typeError("object", ctx); }
}

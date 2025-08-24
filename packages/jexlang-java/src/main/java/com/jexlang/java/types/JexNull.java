package com.jexlang.java.types;

public class JexNull implements JexValue {
    public JexNull() {}

    @Override
    public String getType() {
        return "null";
    }

    public boolean isNumber() { return false; }
    public boolean isBoolean() { return false; }
    public boolean isString() { return false; }
    public boolean isNull() { return true; }
    public boolean isArray() { return false; }
    public boolean isObject() { return false; }
    public Number asNumber(String ctx) { throw JexValue.typeError("number", ctx); }
    public boolean asBoolean(String ctx) { throw JexValue.typeError("boolean", ctx); }
    public String asString(String ctx) { throw JexValue.typeError("string", ctx); }
    public java.util.List<JexValue> asArray(String ctx) { throw JexValue.typeError("array", ctx); }
    public java.util.Map<String, JexValue> asObject(String ctx) { throw JexValue.typeError("object", ctx); }
}

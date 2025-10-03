package io.github.vinaykumar0339.types;

public class JexNull implements JexValue {
    public JexNull() {}

    @Override
    public String getType() {
        return "null";
    }

    @Override
    public String toString() {
        return "null";
    }

    @Override
    public Object toObject() {
        return null; // Represents the null value in Java
    }

    public boolean isInteger() { return false; }
    public boolean isDouble() { return false; }
    public boolean isNumber() { return false; }
    public boolean isBoolean() { return false; }
    public boolean isString() { return false; }
    public boolean isNull() { return true; }
    public boolean isArray() { return false; }
    public boolean isObject() { return false; }
    public Integer asInteger(String ctx) { throw JexValue.typeError("integer", ctx, this); }
    public Double asDouble(String ctx) { throw JexValue.typeError("double", ctx, this); }
    public Number asNumber(String ctx) { throw JexValue.typeError("number", ctx, this); }
    public boolean asBoolean(String ctx) { throw JexValue.typeError("boolean", ctx, this); }
    public String asString(String ctx) { throw JexValue.typeError("string", ctx, this); }
    public java.util.List<JexValue> asArray(String ctx) { throw JexValue.typeError("array", ctx, this); }
    public java.util.Map<String, JexValue> asObject(String ctx) { throw JexValue.typeError("object", ctx, this); }
}

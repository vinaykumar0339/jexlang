package com.jexlang.java.types;

public class JexObject implements JexValue {
    private final java.util.Map<String, JexValue> value;
    public JexObject(java.util.Map<String, JexValue> value) { this.value = value; }

    @Override
    public String getType() {
        return "object";
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("{");
        int i = 0;
        for (java.util.Map.Entry<String, JexValue> entry : value.entrySet()) {
            sb.append("\"").append(entry.getKey()).append("\": ").append(entry.getValue().toString());
            if (i < value.size() - 1) {
                sb.append(", ");
            }
            i++;
        }
        sb.append("}");
        return sb.toString();
    }

    @Override
    public Object toObject() {
        java.util.Map<String, Object> map = new java.util.HashMap<>();
        for (java.util.Map.Entry<String, JexValue> entry : value.entrySet()) {
            map.put(entry.getKey(), entry.getValue().toObject());
        }
        return map;
    }

    public boolean isInteger() { return false; }
    public boolean isDouble() { return false; }
    public boolean isNumber() { return false; }
    public boolean isBoolean() { return false; }
    public boolean isString() { return false; }
    public boolean isNull() { return false; }
    public boolean isArray() { return false; }
    public boolean isObject() { return true; }
    public Integer asInteger(String ctx) { throw JexValue.typeError("integer", ctx, this); }
    public Double asDouble(String ctx) { throw JexValue.typeError("double", ctx, this); }
    public Number asNumber(String ctx) { throw JexValue.typeError("number", ctx, this); }
    public boolean asBoolean(String ctx) { throw JexValue.typeError("boolean", ctx, this); }
    public String asString(String ctx) { throw JexValue.typeError("string", ctx, this); }
    public java.util.List<JexValue> asArray(String ctx) { throw JexValue.typeError("array", ctx, this); }
    public java.util.Map<String, JexValue> asObject(String ctx) { return value; }
}

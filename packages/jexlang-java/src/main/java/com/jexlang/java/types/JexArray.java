package com.jexlang.java.types;

public class JexArray implements JexValue {
    private final java.util.List<JexValue> value;
    public JexArray(java.util.List<JexValue> value) { this.value = value; }

    @Override
    public String getType() {
        return "array";
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < value.size(); i++) {
            sb.append(value.get(i).toString());
            if (i < value.size() - 1) {
                sb.append(", ");
            }
        }
        sb.append("]");
        return sb.toString();
    }

    public boolean isNumber() { return false; }
    public boolean isBoolean() { return false; }
    public boolean isString() { return false; }
    public boolean isNull() { return false; }
    public boolean isArray() { return true; }
    public boolean isObject() { return false; }
    public Number asNumber(String ctx) { throw JexValue.typeError("number", ctx, this); }
    public boolean asBoolean(String ctx) { throw JexValue.typeError("boolean", ctx, this); }
    public String asString(String ctx) { throw JexValue.typeError("string", ctx, this); }
    public java.util.List<JexValue> asArray(String ctx) { return value; }
    public java.util.Map<String, JexValue> asObject(String ctx) { throw JexValue.typeError("object", ctx, this); }
}

package io.github.vinaykumar0339.types;

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

    @Override
    public Object toObject() {
        java.util.List<Object> list = new java.util.ArrayList<>();
        for (JexValue item : value) {
            list.add(item.toObject());
        }
        return list;
    }

    public boolean isInteger() { return false; }
    public boolean isDouble() { return false; }
    public boolean isNumber() { return false; }
    public boolean isBoolean() { return false; }
    public boolean isString() { return false; }
    public boolean isNull() { return false; }
    public boolean isArray() { return true; }
    public boolean isObject() { return false; }
    public Integer asInteger(String ctx) { throw JexValue.typeError("integer", ctx, this); }
    public Double asDouble(String ctx) { throw JexValue.typeError("double", ctx, this); }
    public Number asNumber(String ctx) { throw JexValue.typeError("number", ctx, this); }
    public boolean asBoolean(String ctx) { throw JexValue.typeError("boolean", ctx, this); }
    public String asString(String ctx) { throw JexValue.typeError("string", ctx, this); }
    public java.util.List<JexValue> asArray(String ctx) { return value; }
    public java.util.Map<String, JexValue> asObject(String ctx) { throw JexValue.typeError("object", ctx, this); }

    @Override
    public boolean isEqual(JexValue other) {
        // For Array, it should reference equality
        return this == other || this.value == other.asArray("comparison isEqual in JexArray");
    }
}

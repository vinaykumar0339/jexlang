package com.jexlang.java.types;


public interface JexValue {
    boolean isNumber();
    boolean isBoolean();
    boolean isString();
    boolean isNull();
    boolean isArray();
    boolean isObject();

    double asNumber(String context) throws Exception;
    boolean asBoolean(String context) throws Exception;
    String asString(String context) throws Exception;
    java.util.List<JexValue> asArray(String context) throws Exception;
    java.util.Map<String, JexValue> asObject(String context) throws Exception;

    static RuntimeException typeError(String want, String ctx) {
        return new RuntimeException("Expected " + want + " in " + ctx);
    }
}

final class JexNumber implements JexValue {
    private final double value;
    JexNumber(double value) { this.value = value; }
    public boolean isNumber() { return true; }
    public boolean isBoolean() { return false; }
    public boolean isString() { return false; }
    public boolean isNull() { return false; }
    public boolean isArray() { return false; }
    public boolean isObject() { return false; }
    public double asNumber(String ctx) { return value; }
    public boolean asBoolean(String ctx) { throw JexValue.typeError("boolean", ctx); }
    public String asString(String ctx) { throw JexValue.typeError("string", ctx); }
    public java.util.List<JexValue> asArray(String ctx) { throw JexValue.typeError("array", ctx); }
    public java.util.Map<String, JexValue> asObject(String ctx) { throw JexValue.typeError("object", ctx); }
}

final class JexBoolean implements JexValue {
    private final boolean value;
    JexBoolean(boolean value) { this.value = value; }
    public boolean isNumber() { return false; }
    public boolean isBoolean() { return true; }
    public boolean isString() { return false; }
    public boolean isNull() { return false; }
    public boolean isArray() { return false; }
    public boolean isObject() { return false; }
    public double asNumber(String ctx) { throw JexValue.typeError("number", ctx); }
    public boolean asBoolean(String ctx) { return value; }
    public String asString(String ctx) { throw JexValue.typeError("string", ctx); }
    public java.util.List<JexValue> asArray(String ctx) { throw JexValue.typeError("array", ctx); }
    public java.util.Map<String, JexValue> asObject(String ctx) { throw JexValue.typeError("object", ctx); }
}

final class JexString implements JexValue {
    private final String value;
    JexString(String value) { this.value = value; }
    public boolean isNumber() { return false; }
    public boolean isBoolean() { return false; }
    public boolean isString() { return true; }
    public boolean isNull() { return false; }
    public boolean isArray() { return false; }
    public boolean isObject() { return false; }
    public double asNumber(String ctx) { throw JexValue.typeError("number", ctx); }
    public boolean asBoolean(String ctx) { throw JexValue.typeError("boolean", ctx); }
    public String asString(String ctx) { return value; }
    public java.util.List<JexValue> asArray(String ctx) { throw JexValue.typeError("array", ctx); }
    public java.util.Map<String, JexValue> asObject(String ctx) { throw JexValue.typeError("object", ctx); }
}

final class JexNull implements JexValue {
    JexNull() {}
    public boolean isNumber() { return false; }
    public boolean isBoolean() { return false; }
    public boolean isString() { return false; }
    public boolean isNull() { return true; }
    public boolean isArray() { return false; }
    public boolean isObject() { return false; }
    public double asNumber(String ctx) { throw JexValue.typeError("number", ctx); }
    public boolean asBoolean(String ctx) { throw JexValue.typeError("boolean", ctx); }
    public String asString(String ctx) { throw JexValue.typeError("string", ctx); }
    public java.util.List<JexValue> asArray(String ctx) { throw JexValue.typeError("array", ctx); }
    public java.util.Map<String, JexValue> asObject(String ctx) { throw JexValue.typeError("object", ctx); }
}

final class JexArray implements JexValue {
    private final java.util.List<JexValue> value;
    JexArray(java.util.List<JexValue> value) { this.value = value; }
    public boolean isNumber() { return false; }
    public boolean isBoolean() { return false; }
    public boolean isString() { return false; }
    public boolean isNull() { return false; }
    public boolean isArray() { return true; }
    public boolean isObject() { return false; }
    public double asNumber(String ctx) { throw JexValue.typeError("number", ctx); }
    public boolean asBoolean(String ctx) { throw JexValue.typeError("boolean", ctx); }
    public String asString(String ctx) { throw JexValue.typeError("string", ctx); }
    public java.util.List<JexValue> asArray(String ctx) { return value; }
    public java.util.Map<String, JexValue> asObject(String ctx) { throw JexValue.typeError("object", ctx); }
}

final class JexObject implements JexValue {
    private final java.util.Map<String, JexValue> value;
    JexObject(java.util.Map<String, JexValue> value) { this.value = value; }
    public boolean isNumber() { return false; }
    public boolean isBoolean() { return false; }
    public boolean isString() { return false; }
    public boolean isNull() { return false; }
    public boolean isArray() { return false; }
    public boolean isObject() { return true; }
    public double asNumber(String ctx) { throw JexValue.typeError("number", ctx); }
    public boolean asBoolean(String ctx) { throw JexValue.typeError("boolean", ctx); }
    public String asString(String ctx) { throw JexValue.typeError("string", ctx); }
    public java.util.List<JexValue> asArray(String ctx) { throw JexValue.typeError("array", ctx); }
    public java.util.Map<String, JexValue> asObject(String ctx) { return value; }
}


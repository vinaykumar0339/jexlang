package com.jexlang.java.types;


public interface JexValue {
    boolean isNumber();
    boolean isBoolean();
    boolean isString();
    boolean isNull();
    boolean isArray();
    boolean isObject();

    String getType();

    Number asNumber(String context);
    boolean asBoolean(String context);
    String asString(String context);
    java.util.List<JexValue> asArray(String context);
    java.util.Map<String, JexValue> asObject(String context);

    static RuntimeException typeError(String want, String ctx) {
        return new RuntimeException("Expected " + want + " in " + ctx);
    }
}


package com.jexlang.java.types;


public interface JexValue {
    boolean isNumber();
    boolean isBoolean();
    boolean isString();
    boolean isNull();
    boolean isArray();
    boolean isObject();

    Number asNumber(String context) throws Exception;
    boolean asBoolean(String context) throws Exception;
    String asString(String context) throws Exception;
    java.util.List<JexValue> asArray(String context) throws Exception;
    java.util.Map<String, JexValue> asObject(String context) throws Exception;

    static RuntimeException typeError(String want, String ctx) {
        return new RuntimeException("Expected " + want + " in " + ctx);
    }
}


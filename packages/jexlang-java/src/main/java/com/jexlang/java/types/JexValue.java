package com.jexlang.java.types;


public interface JexValue {
    boolean isNumber();
    boolean isBoolean();
    boolean isString();
    boolean isNull();
    boolean isArray();
    boolean isObject();

    String getType();

    Object toObject();

    Number asNumber(String context);
    boolean asBoolean(String context);
    String asString(String context);
    java.util.List<JexValue> asArray(String context);
    java.util.Map<String, JexValue> asObject(String context);

    static RuntimeException typeError(String want, String ctx, JexValue actualValue) {
        return new RuntimeException("Expected " + want + " in '" + ctx +
                "', but got type '" + actualValue.getType() + "' of value " + actualValue);
    }

    static JexNumber fromNumber(Number number) {
        return new JexNumber(number);
    }

    static JexBoolean fromBoolean(boolean value) {
        return new JexBoolean(value);
    }

    static JexString fromString(String value) {
        return new JexString(value);
    }

    static JexArray fromArray(java.util.List<JexValue> array) {
        return new JexArray(array);
    }

    static JexObject fromObject(java.util.Map<String, JexValue> object) {
        return new JexObject(object);
    }

    static JexNull fromNull() {
        return new JexNull();
    }

    static JexObject fromObject(Object value) {
        if (value instanceof java.util.Map<?, ?> map) {
            java.util.Map<String, JexValue> jexMap = new java.util.HashMap<>();
            for (java.util.Map.Entry<?, ?> entry : map.entrySet()) {
                if (entry.getKey() instanceof String key) {
                    jexMap.put(key, from(entry.getValue()));
                } else {
                    throw new IllegalArgumentException("Object keys must be strings");
                }
            }
            return fromObject(jexMap);
        }
        throw new IllegalArgumentException("Unsupported object type: " + value.getClass().getName());
    }

    static JexArray fromArray(Object value) {
        if (value instanceof java.util.List<?> list) {
            java.util.List<JexValue> jexList = new java.util.ArrayList<>();
            for (Object item : list) {
                jexList.add(from(item));
            }
            return fromArray(jexList);
        }
        throw new IllegalArgumentException("Unsupported array type: " + value.getClass().getName());
    }

    static JexValue from(Object value) {
        if (value == null) {
            return fromNull();
        } else if (value instanceof Number) {
            return fromNumber((Number) value);
        } else if (value instanceof Boolean) {
            return fromBoolean((Boolean) value);
        } else if (value instanceof String) {
            return fromString((String) value);
        } else if (value instanceof java.util.List<?>) {
            return fromArray(value);
        } else if (value instanceof java.util.Map<?, ?>) {
            return fromObject(value);
        }
        throw new IllegalArgumentException("Unsupported type: " + value.getClass().getName());
    }
}


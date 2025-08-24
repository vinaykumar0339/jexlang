package com.jexlang.java.types;

public final class Values {
    private Values() {}
    public static JexValue num(double v) { return new JexNumber(v); }
    public static JexValue bool(boolean v) { return new JexBoolean(v); }
    public static JexValue str(String v) { return new JexString(v); }
    public static JexValue nil() { return new JexNull(); }
    public static JexValue arr(java.util.List<JexValue> vs) { return new JexArray(vs); }
    public static JexValue obj(java.util.Map<String,JexValue> m) { return new JexObject(m); }
}

package io.github.vinaykumar0339.functions;

import io.github.vinaykumar0339.context.EvaluatorContext;
import io.github.vinaykumar0339.types.JexValue;

@FunctionalInterface
public interface FuncImpl {
    JexValue apply(EvaluatorContext ctx, JexValue... args);
}


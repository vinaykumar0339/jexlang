package io.github.vinaykumar0339.context;

import io.github.vinaykumar0339.evaluator.JexEvaluator;

public class EvaluatorContext {
    private final JexEvaluator jexEvaluator;

    public  EvaluatorContext(JexEvaluator jexEvaluator) {
        this.jexEvaluator = jexEvaluator;
    }

    public JexEvaluator getJexEvaluator() {
        return jexEvaluator;
    }
}

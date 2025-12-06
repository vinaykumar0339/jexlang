//
//  EvaluatorContext.swift
//  jexlang-swift
//
//  Created by Vinay Kumar on 06/12/25.
//

import Foundation

public class EvaluatorContext {
    private final let jexEvaluator: JexEvaluator;
    
    init(jexEvaluator: JexEvaluator) {
        self.jexEvaluator = jexEvaluator
    }
    
    public func getJexEvaluator() -> JexEvaluator {
        return jexEvaluator
    }
}

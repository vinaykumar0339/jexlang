export * from "./eval/JexEvaluator";

import { JexEvaluator } from "./eval/JexEvaluator";

const jexEvaluator = new JexEvaluator();

const result = jexEvaluator.evaluate(`
    "Hello world" | capitalize
`);
console.log(result);

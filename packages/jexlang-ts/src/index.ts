import { JexEvaluator } from "./eval/JexEvaluator";

const jexEvaluator = new JexEvaluator();

const output = jexEvaluator.evaluate("round(2)");

console.log(output);


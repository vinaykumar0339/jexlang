import { JexEvaluator } from "./eval/JexEvaluator";
import { toString } from "./utils";

const jexEvaluator = new JexEvaluator();

const output = jexEvaluator.evaluate(`
        upper('Hello, World!')
    `);

console.log(output);


import { JexEvaluator } from "./eval/JexEvaluator";

const jexEvaluator = new JexEvaluator({
    x: 40
});

const output = jexEvaluator.evaluate(`
        age = 23 + x;
        height = 30;
        age + height - 2;`);

console.log(output);


import { JexEvaluator } from "./eval/JexEvaluator";

const jexEvaluator = new JexEvaluator({
    x: 40,
    user: {
        age: 10
    }
});

const output = jexEvaluator.evaluate(`
        age = 'age';
        height = 30;
        user[age]
`);

console.log(output);


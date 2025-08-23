import { JexEvaluator } from "./eval/JexEvaluator";

const jexEvaluator = new JexEvaluator({
    x: 40,
    user: {
        age: 10
    }
});

jexEvaluator.setFunction('max', (...args) => {
    console.log(args);
    return Math.max(...args as number[]);
});

const output = jexEvaluator.evaluate(`
        max(x, user.age, 50) > 60 ? 10 : 30
`);

console.log(output);


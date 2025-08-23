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
    con = {
        "name": "vinay"
    }
    con.name = "vinay2"
    con

    ar = [1, 2, 3]
    ar[1] = 20
    ar
`);

console.log(output);


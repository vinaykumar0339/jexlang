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
        ar = ["1", 2, 3, 4, 5]
        ar[0]
        con = {
            "1": "one",
            "2": "two",
            "3": "three",
            "4": "four",
            "5": "five"
        }
        con[ar[0]]
`);

console.log(output);


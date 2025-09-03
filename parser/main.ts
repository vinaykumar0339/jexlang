import { Evaluate } from './evaluate.ts';
import { Parser } from './parser.ts';

const parse = () => {
    const code = `-"2" + 2`;

    const parser = new Parser(code);
    const program = parser.program();
    console.log(program);
    
    const evaluate = new Evaluate();

    const result = evaluate.evaluate(program);
    console.log(result);

}

const times: number[] = [];
for (let i = 0; i < 1; i++) {
    const start = Date.now();
    parse();
    const end = Date.now();
    times.push(end - start);
}

const total = times.reduce((acc, curr) => acc + curr, 0);
console.log(`Average program parsing took ${total / times.length} milliseconds, ${total / times.length / 1000} seconds.\n total: ${total} milliseconds, ${total / 1000} seconds`);
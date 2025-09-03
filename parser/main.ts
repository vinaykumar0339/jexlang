import { Evaluate } from './evaluate.ts';
import { JexEvaluator } from './evaluator';
import { Parser } from './parser.ts';
import { toNumber } from './utils.ts';
import { context } from "./info";
import { lookUps } from "./lookups";
import { newFormulas, newFormulasFormat2 } from "./new_formulas";
import { planMasters } from "./plan_masters";
import { rateMasters } from "./rate_masters";

const jexEvaluator = new JexEvaluator({
    user: {
        name: "vinay",
        age: 30,
        address: {
            street: "nellore"
        }
    }
});

jexEvaluator.addFunction('roundOf', (number, places = 2) => {
    number = toNumber(number);
    places = toNumber(places);
    const roundedValue = (Math.round(parseFloat((number as any))*Math.pow(10, places))/(Math.pow(10, places))).toFixed(places);
    const value = Number(roundedValue);
    if (isNaN(value)) {
      return value;
    }
    return value;
});

const parse = () => {
    const code = `roundOf(-123.4567, 2)`;

    const result = jexEvaluator.evaluate(code);
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

// jexEvaluator.declareContextValue('session', context['session']);
// jexEvaluator.declareContextValue('form', context['form']);
// jexEvaluator.declareContextValue('vos', context['vos']);

// // Filter an array asynchronously...
// const run = async () => {
//   for (const formula of newFormulasFormat2) {
//     jexEvaluator.setContextValue('form', context['form']);
//     jexEvaluator.setContextValue('vos', context['vos']);
//     jexEvaluator.setContextValue('session', context['session']);
//     try {
//         const res = await jexEvaluator.evaluate(formula.formula.expression);
//         if (formula.type === 'lookup') {
//         // find the object from the loopup array and based on the info load bo's
//         const lookup = lookUps.find(lu => lu.lookupId === res);
//         if (lookup) {
//             if (lookup.boType === 'plan_masters') {
//             const info = planMasters.find(pm => pm.code === lookup.boId);
//             context['vos'][formula.variable] = info;
//             } else if (lookup.boType === 'rate_masters') {
//             const info = rateMasters.find(rm => rm.code === lookup.boId);
//             context['vos'][formula.variable] = info;
//             }
//         }
//         } else {
//         (context['form'][formula.variable]) = res;
//         }
//     } catch (error) {
//         console.log(`error at formula ${formula.variable}: ${error}`);
//     }

//   }
//   // console.log(context.form);
//   // console.log('----------------------------------');
//   // console.log('Number of formulas executed:', newFormulas.length);
// }

// const main = async () => {
//     const times: number[] = [];
//     for (let i = 0; i < 1; i++) {
//         console.log(`Iteration ${i + 1}`);
//         const start = performance.now();
//         await run();
//         const end = performance.now();
//         times.push(end - start);
//         console.log(`Execution time for iteration ${i + 1}: ${end - start} ms, ${(end - start) / 1000} s, ${(end - start) / 1000 / 60} min.`);
//     }
//     const total = times.reduce((acc, curr) => acc + curr, 0);
//     const average = total / times.length;
//     console.log(`Average execution time: ${average} ms, ${average / 1000} s ${(average / 1000) / 60} min.\nbut total time ${total} ms, ${total / 1000} s ${(total / 1000) / 60} min.`);
// }

// main();
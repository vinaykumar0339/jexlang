// import { JexEvaluator } from "./eval";
// import { context } from "./info";
// import { lookUps } from "./lookups";
// import { newFormulasFormat2 } from "./new_formulas";
// import { planMasters } from "./plan_masters";
// import { rateMasters } from "./rate_masters";
// import { toNumber } from "./utils";

export * from "./eval";
export * from './types';
export * from './utils';

// const jexEvaluator = new JexEvaluator();

// jexEvaluator.setCacheExpressions(true);

// const times: number[] = [];
// for (let i = 0; i < 10000; i++) {
//     const start = Date.now();
//     const result = jexEvaluator.evaluate(`
//        global
//     `);
//     console.log(result);
//     const end = Date.now();
//     times.push(end - start);
// }

// const total = times.reduce((acc, curr) => acc + curr, 0);
// console.log(`Average program parsing took ${total / times.length} milliseconds, ${total / times.length / 1000} seconds.\n total: ${total} milliseconds, ${total / 1000} seconds`);


// jexEvaluator.addFunction('httpGet', async (url: JexValue) => {
//     const response = await fetch(toString(url));
//     return await response.json();
// });

// jexEvaluator.addFunction('setTimeout', async (ms: JexValue) => {
//     return await new Promise<string>((resolve) => setTimeout(() => resolve("hello"), toNumber(ms)));
// });


// jexEvaluator.addFunction('getAsyncValueForSetTimeout', async (ms: JexValue) => {
//     return await new Promise<number>((resolve) => setTimeout(() => resolve(toNumber(ms)), 1000));
// });

// jexEvaluator.addTransform('asyncTest', async (ms: JexValue) => {
//     await new Promise((resolve) => setTimeout(() => resolve(true), toNumber(ms)));
//     return toString(ms) + " transformed";
// })

// const run = async () => {
//     const start = performance.now();
//     const result = jexEvaluator.evaluateSync(`
//         // setTimeout(5000)
//         user.afsdf.sdfsf.sffsafsa > 100`);
//     console.log(result);
//     const end = performance.now();
//     console.log(`Evaluation took ${end - start} milliseconds.`);
// }

// run();

// const jexEvaluator = new JexEvaluator({
// //   x: 3,
// //   y: 4,
// //   user: {
// //     name: "Alice",
// //     age: 30
// //   }
// });

// // jexEvaluator.setCacheExpressions(true);

// jexEvaluator.declareContextValue('session', context['session']);
// jexEvaluator.declareContextValue('form', context['form']);
// jexEvaluator.declareContextValue('vos', context['vos']);

// // console.log(jexEvaluator.evaluate("user.name + ' is ' + user.age + ' years old.'"));

// // transformers
// jexEvaluator.addTransform('toUpper', (val) => {
//   if (typeof val === 'string') {
//     return val.toUpperCase();
//   }
//   return val;
// });

// jexEvaluator.addTransform('lowerOf', (val) => {
//   if (typeof val === 'string') {
//     return val.toLowerCase();
//   }
//   return val;
// });

// jexEvaluator.addTransform('booleanOf', (val) => {
//   return Boolean(val);
// });

// jexEvaluator.addTransform('numberOf', (val) => {
//   const convertedVal = Number(val);
//   if (!isNaN(convertedVal)) {
//     return convertedVal;
//   }
//   return val;
// });

// jexEvaluator.addTransform('stringOf', (val) => {
//   if (val === null || val === undefined) {
//     return '';
//   }
//   return String(val);
// });

// // functions
// jexEvaluator.addFunction("concat", (value, delimiter) => {
//   if (typeof value === 'string') {
//     return value.split('').join((delimiter as any));
//   } else if (Array.isArray(value)) {
//     return value.join((delimiter as any));
//   }
//   return '';
// });

// jexEvaluator.addFunction("toString", (value) => {
//   if (value === null || value === undefined) {
//     return '';
//   }
//   return String(value);
// });


// jexEvaluator.addFunction('roundOf', (number, places = 2) => {
//     number = toNumber(number);
//     places = toNumber(places);
//     const roundedValue = (Math.round(parseFloat((number as any))*Math.pow(10, places))/(Math.pow(10, places))).toFixed(places);
//     const value = Number(roundedValue);
//     if (isNaN(value)) {
//       return value;
//     }
//     return value;
// });

// // Filter an array asynchronously...
// const run = async () => {
//   for (const formula of newFormulasFormat2) {
//     jexEvaluator.setContextValue('form', context['form']);
//     jexEvaluator.setContextValue('vos', context['vos']);
//     jexEvaluator.setContextValue('session', context['session']);
//     const res = await jexEvaluator.evaluate(formula.formula.expression);
//     if (formula.type === 'lookup') {
//       // find the object from the loopup array and based on the info load bo's
//       const lookup = lookUps.find(lu => lu.lookupId === res);
//       if (lookup) {
//         if (lookup.boType === 'plan_masters') {
//           const info = planMasters.find(pm => pm.code === lookup.boId);
//           context['vos'][formula.variable] = info;
//         } else if (lookup.boType === 'rate_masters') {
//           const info = rateMasters.find(rm => rm.code === lookup.boId);
//           context['vos'][formula.variable] = info;
//         }
//       }
//     } else {
//       (context['form'][formula.variable]) = res;
//     }
//   }
//   // console.log(context.form);
//   // console.log('----------------------------------');
//   // console.log('Number of formulas executed:', newFormulas.length);
// }

// const main = async () => {
//     const times = [];
//     for (let i = 0; i < 1000; i++) {
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
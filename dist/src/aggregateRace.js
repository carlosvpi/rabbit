"use strict";
/**
 *
 * Combines multiple asynchronous generators into a single generator.
 *
 * Yields the list of the latest values from each generator every time any generator yields.
 *
 * Returns the value returned by the first generator that returns.
 *
 * @example
 * ```typescript
 * clock              0   1   2   3   4   5   6   7   8   9
 * a                 «a   b           e           h   i | y»
 * b                 «        c   d       f   g | x»
 * aggregateAll      «a-  b-  bc  bd  ed  ef  eg| x»
 * ```
 * @see aggregateAll
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param gs Array of asynchronous generators
 * @returns aggregated generator
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregateRace = aggregateRace;
async function* aggregateRace(...gs) {
    const stored = [];
    stored.push = stored.push.bind(stored);
    let next;
    let values = [];
    let freeLocks = gs.map(() => () => { });
    let resolver;
    gs.forEach(async (g, i) => {
        let iterator;
        while (!(iterator = await g.next(next)).done) {
            freeLocks[i](next);
            values = [...values];
            values[i] = iterator.value;
            resolver({ value: values, done: false });
            resolver = stored.push;
            await new Promise(resolve => freeLocks[i] = resolve);
        }
        resolver({ value: iterator.value, done: true });
    });
    let iterator;
    while (!(iterator = await new Promise(resolve => {
        if (stored.length) {
            resolve(stored.splice(0, 1)[0]);
        }
        else {
            resolver = resolve;
        }
    })).done) {
        next = yield iterator.value;
        freeLocks.forEach(freeLock => freeLock(next));
    }
    return iterator.value;
}

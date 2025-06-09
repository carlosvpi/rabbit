"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transposeAll = transposeAll;
async function* asyncTransposeAll(...gs) {
    let next;
    let done = false;
    const returnValues = Array(gs.length).fill(null);
    while (!done) {
        done = true;
        const value = await Promise.all(gs.map(async (g, i) => {
            const iterator = await g.next(next);
            if (iterator.done) {
                returnValues[i] || (returnValues[i] = iterator.value);
                return undefined;
            }
            done = false;
            return iterator.value;
        }));
        if (done)
            return returnValues;
        next = yield value;
    }
}
function* syncTransposeAll(...gs) {
    let next;
    let done = false;
    const returnValues = Array(gs.length).fill(null);
    while (!done) {
        done = true;
        const value = gs.map((g, i) => {
            const iterator = g.next(next);
            if (iterator.done) {
                returnValues[i] || (returnValues[i] = iterator.value);
                return undefined;
            }
            done = false;
            return iterator.value;
        });
        if (done)
            return returnValues;
        next = yield value;
    }
}
function transposeAll(...gs) {
    if (gs.length === 0)
        return;
    if (gs[0][Symbol.asyncIterator]) {
        return asyncTransposeAll(...gs);
    }
    return syncTransposeAll(...gs);
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transposeRace = transposeRace;
async function* asyncTransposeRace(...gs) {
    let done = false;
    let next;
    const returnValue = Array(gs.length).fill(undefined);
    while (!done) {
        const value = await Promise.all(gs.map(async (g, i) => {
            const iteratorResult = await g.next(next);
            if (!iteratorResult.done)
                return iteratorResult.value;
            done = true;
            returnValue[i] = iteratorResult.value;
        }));
        if (done)
            return returnValue;
        next = yield value;
    }
}
function* syncTransposeRace(...gs) {
    let done = false;
    let next;
    const returnValue = Array(gs.length).fill(undefined);
    while (!done) {
        const value = gs.map((g, i) => {
            const iteratorResult = g.next(next);
            if (!iteratorResult.done)
                return iteratorResult.value;
            done = true;
            returnValue[i] = iteratorResult.value;
        });
        if (done)
            return returnValue;
        next = yield value;
    }
}
function transposeRace(...gs) {
    if (gs.length === 0)
        return;
    if (gs[0][Symbol.asyncIterator]) {
        return asyncTransposeRace(...gs);
    }
    return syncTransposeRace(...gs);
}

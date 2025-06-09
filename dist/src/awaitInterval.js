"use strict";
/**
 *
 * `awaitInterval(ms, checkStop)` emits an item every `ms` milliseconds. The item emitted is the Date.now() value at the moment of emision.
 *
 * `checkStop` is a function that receives `stop`, the last item generated, its index and the `next` value passed to it. When this function calls `stop` with any value `v`, `awaitEvent` removes the event listener and returns `v`.
 *
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param ms interval milliseconds
 * @param checkStop function called on every item to check if the interval should stop
 * @returns the asynchronous generator
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitInterval = awaitInterval;
async function* awaitInterval(ms, checkStop = () => { }) {
    let next;
    let i = 0;
    let returnValue;
    let iterate = true;
    let item;
    let f;
    let currentEach;
    const stop = (result) => {
        iterate = false;
        returnValue = result;
    };
    const token = setInterval(() => {
        const now = Date.now();
        f(now, i++, next);
        currentEach === null || currentEach === void 0 ? void 0 : currentEach(now, i);
    }, ms);
    checkStop(stop, (each) => { currentEach = each; });
    while (iterate) {
        next = yield item = await new Promise(r => {
            f = r;
        });
    }
    clearInterval(token);
    return returnValue;
}

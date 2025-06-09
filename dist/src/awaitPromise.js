"use strict";
/**
 *
 * `awaitPromise(promiseFactory, checStop)` emits the result of consecutive calls to the promiseFactory.
 *
 * `promiseFactory` is passed the current index and the `next` value passed to `awaitPromise`.
 *
 * `checkStop` is a function that receives `stop`, the last item generated, its index and the `next` value passed to it. When this function calls `stop` with any value `v`, `awaitEvent` removes the event listener and returns `v`.
 *
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param promiseFactory The factory of promises to await
 * @param checkStop The function called on every emitted event to check whether to continue
 * @returns the asynchronous generator
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitPromise = awaitPromise;
async function* awaitPromise(promiseFactory, checkStop = () => { }) {
    let next;
    let i = 0;
    let returnValue;
    let iterate = true;
    let currentEach;
    const stop = (result) => {
        iterate = false;
        returnValue = result;
    };
    checkStop(stop, (each) => { currentEach = each; });
    while (iterate) {
        const item = await promiseFactory(i++, next);
        currentEach === null || currentEach === void 0 ? void 0 : currentEach(item, i);
        next = yield item;
    }
    return returnValue;
}

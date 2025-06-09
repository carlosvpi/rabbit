"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitEvent = awaitEvent;
/**
 * `awaitEvent(target, eventName, options, checkStop)` adds an eventListener to the `target` and every time the event fires it is generated asynchronously by `awaitEvent`.
 *
 * `checkStop` is a function that receives `stop`, the last item generated, its index and the `next` value passed to it. When this function calls `stop` with any value `v`, `awaitEvent` removes the event listener and returns `v`.
 *
 * Emits every click event until the 10th one, when it returns `'end'`
 *
 * @example
 * ```typescript
 * awaitEvent(button, 'click', {}, (stop, _, i) => i === 10 && stop('end')))
 * ```
 *
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param target The target element to listen to
 * @param eventName The name of the event
 * @param options Options for addEventListener
 * @param checkStop Function called on every item to check if the listener should be removed
 * @returns the asynchronous generator
 */
async function* awaitEvent(target, eventName, options = {}, checkStop = () => { }) {
    let next;
    let i = 0;
    let iterator;
    let items = [];
    let isPromiseFree = true;
    let f;
    let currentEach;
    const stop = (result) => {
        var _a;
        if ((_a = items.at(-1)) === null || _a === void 0 ? void 0 : _a.done)
            return;
        items.push({ value: result, done: true });
    };
    const handler = (value) => {
        var _a;
        if (!((_a = items.at(-1)) === null || _a === void 0 ? void 0 : _a.done)) {
            items.push({ value, done: false });
        }
        if (isPromiseFree) {
            f(items.splice(0, 1)[0]);
            isPromiseFree = false;
        }
        currentEach === null || currentEach === void 0 ? void 0 : currentEach(value, i++);
    };
    target.addEventListener(eventName, handler, options);
    checkStop(stop, (each) => { currentEach = each; });
    while (!(iterator = await new Promise(r => {
        if (items.length) {
            r(items.splice(0, 1)[0]);
        }
        else {
            f = r;
            isPromiseFree = true;
        }
    })).done) {
        next = yield Promise.resolve(iterator.value);
    }
    target.removeEventListener(eventName, handler);
    return iterator.value;
}

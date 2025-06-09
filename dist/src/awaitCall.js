"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitCall = awaitCall;
/**
 *
 * Use "push(value)" to make the async generator yield a value.
 *
 * Use "stop(value)" to make the async generator return a value.
 *
 * "push(value)" returns a promise resolved with the value used to generate the next one.
 *
 * @example `awaitCall(([g, push, stop]) => {push(1); push(2); stop(3)})`
 * @example `const [g, push, stop] = new Promise(awaitCall); push(1); push(2); stop(3)`
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param caller function passed "generator", "push" and "stop"
 * @returns the asynchronous generator
 */
function awaitCall(caller) {
    let next;
    let returnValue;
    let iterate = true;
    let resolver;
    let lastPush = [];
    let items = [];
    const g = (async function* () {
        while (iterate) {
            const item = await new Promise(resolve => {
                if (items.length) {
                    resolve(items.splice(0, 1)[0]);
                    return;
                }
                resolver = resolve;
            });
            if (lastPush.length)
                lastPush.splice(0, 1)[0](next = yield item);
        }
        while (items.length) {
            lastPush.splice(0, 1)[0](next = yield items.splice(0, 1)[0]);
        }
        return returnValue;
    })();
    caller([
        g,
        (value) => {
            if (!iterate)
                return Promise.resolve(null);
            items.push(value);
            if (resolver) {
                resolver(items.splice(0, 1)[0]);
                resolver = null;
            }
            return new Promise(resolve => lastPush.push((v) => resolve(v)));
        },
        (result) => {
            iterate = false;
            returnValue = result;
            if (resolver)
                resolver(result);
        }
    ]);
    return g;
}

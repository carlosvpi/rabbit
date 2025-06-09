"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = throttle;
function awaitThrottle(ms, asyncGenerator, next) {
    return new Promise(resolve => {
        let locked = true;
        const resolver = (iteratorResult) => {
            if (locked) {
                asyncGenerator.next(next).then(resolver);
            }
            else {
                resolve(iteratorResult);
            }
        };
        setTimeout(() => {
            locked = false;
        }, ms);
        asyncGenerator.next(next).then(resolver);
    });
}
function throttle(ms) {
    return async function* (g) {
        let next;
        let iterator = await g.next(next);
        if (iterator.done)
            return iterator.value;
        next = yield Promise.resolve(iterator.value);
        while (!(iterator = await awaitThrottle(ms, g, next)).done) {
            next = yield Promise.resolve(iterator.value);
        }
        return iterator.value;
    };
}

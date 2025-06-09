"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.take = take;
function asyncTake(n = 1, returnValue) {
    return async function* (g) {
        let next;
        let i;
        while (n-- && !(i = await g.next(next)).done) {
            next = yield i.value;
        }
        if (i.done) {
            return i.value;
        }
        return returnValue;
    };
}
function syncTake(n = 1, returnValue) {
    return function* (g) {
        let next;
        let i;
        while (n-- && !(i = g.next(next)).done) {
            next = yield i.value;
        }
        if (i.done) {
            return i.value;
        }
        return returnValue;
    };
}
/**
 * `take(n)(g)` generates the first `n` (**default** 1) items of `g`
 *
 * If `g` runs out before reaching `n` elements, `take(n, value)(g)` returns the return value of `g`. Otherwise, it returns `value`.
 *
 * **Example** `take(5)(range())` generates 0, 1, 2, 3, 4
 * @param {number} [n = 1] The amount of items to generate
 * @param {TReturn} [returnValue] The value to return if `g` runs out
 */
function take(n = 1, returnValue) {
    const asyncFunctor = asyncTake(n, returnValue);
    const syncFunctor = syncTake(n, returnValue);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

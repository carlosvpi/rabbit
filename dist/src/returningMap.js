"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returningMap = returningMap;
function asyncReturningMap(returnMap) {
    return async function* (g) {
        let next;
        let i = 0;
        let iterator;
        while (!(iterator = await g.next(next)).done) {
            i++;
            next = yield iterator.value;
        }
        return returnMap(iterator.value, i, next);
    };
}
function syncReturningMap(returnMap) {
    return function* (g) {
        let next;
        let i = 0;
        let iterator;
        while (!(iterator = g.next(next)).done) {
            i++;
            next = yield iterator.value;
        }
        return returnMap(iterator.value, i, next);
    };
}
/**
 *
 * `returningMap(f)(g)` generates the same as `g`, and when `g` returns `value`, `returningMap(f)(g)` returns `f(value, i, next)` (with `i` the length of `g` and `next` the value used to generate it)
 *
 * @param returnMap the function to apply. It takes the return value of `g`, the length of `g` and the last `next` value.
 * @returns
 */
function returningMap(returnMap) {
    const asyncFunctor = asyncReturningMap(returnMap);
    const syncFunctor = syncReturningMap(returnMap);
    function functor(g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    }
    return functor;
}

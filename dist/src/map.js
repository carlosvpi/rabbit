"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = map;
function asyncMap(f) {
    return async function* (g) {
        let i = 0;
        let iterator;
        let next;
        while (!(iterator = await g.next(next)).done) {
            next = yield f(iterator.value, i++, next);
        }
        return iterator.value;
    };
}
function syncMap(f) {
    return function* (g) {
        let i = 0;
        let iterator;
        let next;
        while (!(iterator = g.next(next)).done) {
            next = yield f(iterator.value, i++, next);
        }
        return iterator.value;
    };
}
/**
 * `map(f)(g)` generates items `f(e, i, n)` where `e` are items of `g`, `i` is the index of `e` in `g` and `n` is the `next` passed to get `e`.
 *
 * `map(f)(g)` returns the same value as `g`.
 *
 * **Example** `map(x => x * 2)(range(0, 5))` generates 0, 2, 4, 6, 8
 * @param {function} [f] The function to apply to elements of `g`
 */
function map(f) {
    const asyncFunctor = asyncMap(f);
    const syncFunctor = syncMap(f);
    function functor(g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    }
    return functor;
}

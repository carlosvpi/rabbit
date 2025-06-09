"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = reduce;
function asyncReduce(f, u) {
    return async function* (g) {
        let next;
        let iterator;
        let i = 0;
        while (!(iterator = await g.next(next)).done) {
            next = yield u = f(u, iterator.value, i++, next);
        }
        return iterator.value;
    };
}
function syncReduce(f, u) {
    return function* (g) {
        let next;
        let iterator;
        let i = 0;
        while (!(iterator = g.next(next)).done) {
            next = yield u = f(u, iterator.value, i++, next);
        }
        return iterator.value;
    };
}
/**
 * `reduce(f, dflt)(g)` generates items `r[i] = f(r[i-1], e)`, and `r[0] = d` and returns the return value of `g`
 *
 * **Example** `reduce((acc, x) => acc + x, 0)(range(0, 5))` generates 0, 1, 3, 6, 10
 * @param {function} [f] The function to apply to combine elements of `g`
 * @param {function} [u] The default value. If `undefined`, the first item of `g` is taken as default.
 */
function reduce(f, u) {
    const asyncFunctor = asyncReduce(f, u);
    const syncFunctor = syncReduce(f, u);
    function functor(g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    }
    return functor;
}

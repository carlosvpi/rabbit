"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = filter;
function asyncFilter(p) {
    return async function* (g) {
        let i = 0;
        let iterator;
        let next;
        while (!(iterator = await g.next(next)).done) {
            if (p(iterator.value, i++, next)) {
                next = yield iterator.value;
            }
        }
        return iterator.value;
    };
}
function syncFilter(p) {
    return function* (g) {
        let i = 0;
        let iterator;
        let next;
        while (!(iterator = g.next(next)).done) {
            if (p(iterator.value, i++, next)) {
                next = yield iterator.value;
            }
        }
        return iterator.value;
    };
}
/**
 * `filter(p)(g)` generates the items `e` of `g` that pass the predicate `p(e, i)`, where `i` is the index of `e` in `g`.
 *
 * `p` is passed each item and the index of the item.
 *
 * `filter(p)(g)` returns the same value as `g` regardless of whether it passes `p`.
 *
 * **Example** `filter(x => x % 2 === 0)(range(0, 10))` generates 0, 2, 4, 6, 8
 * @param {generator} [p] the filtering predicate
 */
function filter(p) {
    const asyncFunctor = asyncFilter(p);
    const syncFunctor = syncFilter(p);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

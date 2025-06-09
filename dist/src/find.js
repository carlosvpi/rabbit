"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = find;
function asyncFind(p) {
    return async function (g) {
        let i = 0;
        let iterator;
        let next;
        while (!(iterator = await g.next(next)).done) {
            if (p(iterator.value, i++, next))
                return iterator.value;
        }
        return null;
    };
}
function syncFind(p) {
    return function (g) {
        let i = 0;
        let iterator;
        let next;
        while (!(iterator = g.next(next)).done) {
            if (p(iterator.value, i++, next))
                return iterator.value;
        }
        return null;
    };
}
/**
 * `find(p)(g)` finds the item in `g` that fulfils `p` (if none does, returns `null`)
 *
 * `p` is passed each item, the index of the item and the `next` value used to get it.
 *
 * The return value of `g` is ignored.
 *
 * **Example** `find(x => x % 5 === 4)(range(0, 5))` returns 4
 * @param {function} [p] The predicate that characterizes the solution, or null if no solution is found
 */
function find(p) {
    const asyncFunctor = asyncFind(p);
    const syncFunctor = syncFind(p);
    function functor(g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    }
    return functor;
}

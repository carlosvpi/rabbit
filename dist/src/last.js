"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.last = last;
function asyncLast(size = 1) {
    return async function* (g) {
        let next;
        let iterator;
        let tuple = [];
        while (!(iterator = await g.next(next)).done) {
            tuple.push(iterator.value);
            next = yield [...tuple];
            if (tuple.length < size)
                continue;
            tuple = tuple.slice(1);
        }
        return iterator.value;
    };
}
function syncLast(size = 1) {
    return function* (g) {
        let next;
        let iterator;
        let tuple = [];
        while (!(iterator = g.next(next)).done) {
            tuple.push(iterator.value);
            next = yield [...tuple];
            if (tuple.length < size)
                continue;
            tuple = tuple.slice(1);
        }
        return iterator.value;
    };
}
/**
 * `last(size)(g)` generates arrays of `size` elements with the last elements generated of `g` (generating always one more). It returns the same as `g`.
 *
 * **Example** `last(3)(range())` generates [0], [0, 1], [0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], ...
 *
 * @param {number} [size=1] The size of the tuples to generate
 */
function last(size = 1) {
    const asyncFunctor = asyncLast(size);
    const syncFunctor = syncLast(size);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropWhile = dropWhile;
function asyncDropWhile(p, returnValue) {
    return async function* (g) {
        let next;
        let iterator;
        let i = 0;
        while (!(iterator = await g.next(next)).done && p(iterator.value, i++)) { }
        if (iterator.done)
            return returnValue !== null && returnValue !== void 0 ? returnValue : iterator.value;
        next = yield iterator.value;
        while (!(iterator = await g.next(next)).done) {
            next = yield iterator.value;
        }
        return returnValue !== null && returnValue !== void 0 ? returnValue : iterator.value;
    };
}
function syncDropWhile(p, returnValue) {
    return function* (g) {
        let next;
        let iterator;
        let i = 0;
        while (!(iterator = g.next(next)).done && p(iterator.value, i++)) { }
        if (iterator.done)
            return returnValue !== null && returnValue !== void 0 ? returnValue : iterator.value;
        next = yield iterator.value;
        while (!(iterator = g.next(next)).done) {
            next = yield iterator.value;
        }
        return returnValue !== null && returnValue !== void 0 ? returnValue : iterator.value;
    };
}
/**
 * `dropWhile(p)(g)` drops items `e` of `g` as long `p(e, i)` holds (`i` is the index of `e` in `g`).
 *
 * After dropping the items, it generates the same as `g` and returns either the specified value or, if not specified, the same as `g`.
 *
 * **Example** `dropWhile(x => x % 6 !== 5)(range(0, 10))` generates 5, 6, 7, 8, 9
 * @param {Function} [p] The predicate that is checked against items of `g`
 */
function dropWhile(p, returnValue) {
    const asyncFunctor = asyncDropWhile(p, returnValue);
    const syncFunctor = syncDropWhile(p, returnValue);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

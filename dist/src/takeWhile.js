"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeWhile = takeWhile;
function asyncTakeWhile(p, returnValue) {
    return async function* (g) {
        let i = 0;
        let next;
        let iterator;
        while (!(iterator = await g.next(next)).done) {
            if (!p(iterator.value, i++, next))
                return returnValue;
            next = yield iterator.value;
        }
        if (iterator.done)
            return iterator.value;
        return returnValue;
    };
}
function syncTakeWhile(p, returnValue) {
    return function* (g) {
        let i = 0;
        let next;
        let iterator;
        while (!(iterator = g.next(next)).done) {
            if (!p(iterator.value, i++, next))
                return returnValue;
            next = yield iterator.value;
        }
        if (iterator.done)
            return iterator.value;
        return returnValue;
    };
}
/**
 * `takeWhile(p)(g)` generates items `e` of `g` as long `p(e, index, next)` holds (`index` is the index of `e` in `g` and `next` is the next value used to generate it)
 *
 * If `g` finishes before finsing the item that fulfils `p`, `takeWhile(p, v)(g)` returns `v`
 *
 * **Example** `takeWhile(x => x % 6 !== 5)(range())` generates 0, 1, 2, 3, 4
 * @param {Function} [p] The predicate that is checked against items of `g`, their indexes and the previous next value.
 * @param {TReturn} [returnValue] The value to return if g runs out
 */
function takeWhile(p, returnValue) {
    const asyncFunctor = asyncTakeWhile(p, returnValue);
    const syncFunctor = syncTakeWhile(p, returnValue);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

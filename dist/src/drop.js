"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drop = drop;
function asyncDrop(n = 0, returnValue) {
    return async function* (g) {
        let next;
        let iterator;
        while (n-- > 0 && !(iterator === null || iterator === void 0 ? void 0 : iterator.done)) {
            iterator = await g.next(next);
        }
        if (iterator === null || iterator === void 0 ? void 0 : iterator.done)
            return returnValue !== null && returnValue !== void 0 ? returnValue : iterator === null || iterator === void 0 ? void 0 : iterator.value;
        while (!(iterator = await g.next(next)).done) {
            next = yield iterator.value;
        }
        return returnValue !== null && returnValue !== void 0 ? returnValue : iterator.value;
    };
}
function syncDrop(n = 0, returnValue) {
    return function* (g) {
        let next;
        let iterator;
        while (n-- > 0 && !(iterator === null || iterator === void 0 ? void 0 : iterator.done)) {
            iterator = g.next(next);
        }
        if (iterator === null || iterator === void 0 ? void 0 : iterator.done)
            return returnValue !== null && returnValue !== void 0 ? returnValue : iterator === null || iterator === void 0 ? void 0 : iterator.value;
        while (!(iterator = g.next(next)).done) {
            next = yield iterator.value;
        }
        return returnValue !== null && returnValue !== void 0 ? returnValue : iterator.value;
    };
}
/**
 * `drop(n)(g)` drops `n` items `e` of `g`. After dropping the items, it generates the same as `g` and returns the same as `g`.
 *
 * If `g` is shorter than `n`, `drop` returns `g`'s return value when it ends.
 *
 * **Example** `drop(5)(range(0, 10))` generates 5, 6, 7, 8, 9
 * @param {number} [n] The amount of items to drop
 */
function drop(n = 0, returnValue) {
    const asyncFunctor = asyncDrop(n, returnValue);
    const syncFunctor = syncDrop(n, returnValue);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

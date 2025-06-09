"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncChangesOnly = asyncChangesOnly;
exports.syncChangesOnly = syncChangesOnly;
exports.changesOnly = changesOnly;
function asyncChangesOnly(diff) {
    return async function* (g) {
        let next;
        let iterator;
        let last = (iterator = await g.next(next)).value;
        if (iterator.done)
            return iterator.value;
        next = yield last;
        while (!(iterator = await g.next(next)).done) {
            if (diff(last, iterator.value) === 0) {
                continue;
            }
            last = iterator.value;
            next = yield last;
        }
        return iterator.value;
    };
}
function syncChangesOnly(diff) {
    return function* (g) {
        let next;
        let iterator;
        let last = (iterator = g.next(next)).value;
        if (iterator.done)
            return iterator.value;
        next = yield last;
        while (!(iterator = g.next(next)).done) {
            if (diff(last, iterator.value) === 0) {
                continue;
            }
            last = iterator.value;
            next = yield last;
        }
        return iterator.value;
    };
}
/**
 * changesOnly returns a generator that yields a value only if it is different from the last yielded value
 *
 * Example: `changesOnly((a, b) => a - b)(fromArray([1, 1, 2, 1, 3, 3]))` generates 1, 2, 1, 3
 *
 * @param diff a function that returns 0 if the two values are equal, and a non-zero value otherwise
 * @returns
 */
function changesOnly(diff) {
    const asyncFunctor = asyncChangesOnly(diff);
    const syncFunctor = syncChangesOnly(diff);
    return function (g) {
        if (typeof g[Symbol.asyncIterator] === 'function') {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

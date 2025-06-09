"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncOnlyChanges = asyncOnlyChanges;
exports.syncOnlyChanges = syncOnlyChanges;
exports.onlyChanges = onlyChanges;
function asyncOnlyChanges(diff) {
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
function syncOnlyChanges(diff) {
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
 * onlyChanges is a generator that filters out duplicate values.
 *
 * Example: `onlyChanges((a, b) => a - b)(fromArray([1, 1, 2, 1, 3, 3]))` generates 1, 2, 1, 3
 *
 * @param diff
 * @returns
 */
function onlyChanges(diff) {
    const asyncFunctor = asyncOnlyChanges(diff);
    const syncFunctor = syncOnlyChanges(diff);
    return function (g) {
        if (typeof g[Symbol.asyncIterator] === 'function') {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

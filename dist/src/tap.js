"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tap = tap;
function asyncTap(f) {
    return async function* (g) {
        let i = 0;
        let iterator;
        let next;
        while (!(iterator = await g.next(next)).done) {
            f(iterator.value, i++, next);
            next = yield iterator.value;
        }
        return iterator.value;
    };
}
function syncTap(f) {
    return function* (g) {
        let i = 0;
        let iterator;
        let next;
        while (!(iterator = g.next(next)).done) {
            f(iterator.value, i++, next);
            next = yield iterator.value;
        }
        return iterator.value;
    };
}
/**
 * `tap(f)(g)` applies `f(e)` where `e` are items of `g`, and generates `e` unchanged. It returns the same as `g`.
 *
 * @param {function} [f] The function to apply to elements of `g`
 */
function tap(f) {
    const asyncFunctor = asyncTap(f);
    const syncFunctor = syncTap(f);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

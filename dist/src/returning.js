"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returning = returning;
function asyncReturning(returnValue) {
    return async function* (g) {
        let next;
        let i;
        while (!(i = await g.next(next)).done) {
            next = yield i.value;
        }
        return returnValue;
    };
}
function syncReturning(returnValue) {
    return function* (g) {
        let next;
        let i;
        while (!(i = g.next(next)).done) {
            next = yield i.value;
        }
        return returnValue;
    };
}
/**
 *
 * `returning(value)(g)` generates the same as `g`, and when `g` ends, returns `value`
 *
 * @param returnValue The value to return
 * @returns
 */
function returning(returnValue) {
    const asyncFunctor = asyncReturning(returnValue);
    const syncFunctor = syncReturning(returnValue);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

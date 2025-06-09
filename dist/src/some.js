"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.some = some;
function asyncSome(p) {
    return async function* (g) {
        let i = 0;
        let iterator;
        let next;
        let value = false;
        while (!(iterator = await g.next(next)).done) {
            value || (value = p(iterator.value, i++, next));
            next = yield value;
            if (value)
                return iterator.value;
        }
        return iterator.value;
    };
}
function syncSome(p) {
    return function* (g) {
        let i = 0;
        let iterator;
        let next;
        let value = false;
        while (!(iterator = g.next(next)).done) {
            value || (value = p(iterator.value, i++, next));
            next = yield value;
            if (value)
                return iterator.value;
        }
        return iterator.value;
    };
}
/**
 *
 * `some(p)(g)` generates false until an element of `g` satisfies a predicate, in which case it generates true.
 *
 * It returns the value that fulfilled `p`, if some did, or the value that returns `g`.
 *
 * `some` does not apply `p` to the return value of `g`.
 *
 * @param p The predicate that is checked against items `e` of `g`, the index of `e` and the `next` value used.
 * @returns
 */
function some(p) {
    const asyncFunctor = asyncSome(p);
    const syncFunctor = syncSome(p);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

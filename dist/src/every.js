"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.every = every;
function asyncEvery(p) {
    return async function* (g) {
        let i = 0;
        let iterator;
        let next;
        let value = true;
        while (!(iterator = await g.next(next)).done) {
            value && (value = p(iterator.value, i++, next));
            next = yield value;
            if (!value)
                return iterator.value;
        }
        return iterator.value;
    };
}
function syncEvery(p) {
    return function* (g) {
        let i = 0;
        let iterator;
        let next;
        let value = true;
        while (!(iterator = g.next(next)).done) {
            value && (value = p(iterator.value, i++, next));
            next = yield value;
            if (!value)
                return iterator.value;
        }
        return iterator.value;
    };
}
/**
 *
 * `every(p)(g)` generates true until an element of `g` no longer satisfies a predicate, in which case it generates false.
 *
 * It returns the value that did not fulfil `p`, if some, or the value that returns `g`.
 *
 * `every` does not apply `p` to the return value of `g`.
 *
 * @param p The predicate that is checked against items `e` of `g`, the index of `e` and the `next` value used.
 * @returns
 */
function every(p) {
    const asyncFunctor = asyncEvery(p);
    const syncFunctor = syncEvery(p);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

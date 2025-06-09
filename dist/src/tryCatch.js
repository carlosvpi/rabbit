"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatch = tryCatch;
function asyncTryCatch(onCatch, doFinally) {
    return async function* (g) {
        let iterator;
        let next;
        try {
            while (!(iterator = await g.next(next)).done) {
                next = yield iterator.value;
            }
            return [iterator.value, null];
        }
        catch (err) {
            return [null, onCatch(err)];
        }
        finally {
            if (typeof doFinally === 'function') {
                doFinally();
            }
        }
    };
}
function syncTryCatch(onCatch, doFinally) {
    return function* (g) {
        let iterator;
        let next;
        try {
            while (!(iterator = g.next(next)).done) {
                next = yield iterator.value;
            }
            return [iterator.value, null];
        }
        catch (err) {
            return [null, onCatch(err)];
        }
        finally {
            if (typeof doFinally === 'function') {
                doFinally();
            }
        }
    };
}
/**
 * `tryCatch(onCatch)(«1, 2, throw 'Error 1', 3, throw 'Error 2' | 'A'») = «1, 2 | [null, 'Error 2']»
 *
 * `tryCatch(onCatch)(«1, 2, 3 | 'A'») = «1, 2, 3 | ['A', null]»
 *
 * @param onCatch
 * @returns
 */
function tryCatch(onCatch, doFinally) {
    const asyncFunctor = asyncTryCatch(onCatch, doFinally);
    const syncFunctor = syncTryCatch(onCatch, doFinally);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

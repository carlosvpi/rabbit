"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = pick;
function asyncPick(indexes, returnValue) {
    return async function* (g) {
        let generation = [];
        let next;
        let iterator;
        for (let index of indexes) {
            while (!(iterator === null || iterator === void 0 ? void 0 : iterator.done) && index >= generation.length) {
                iterator = await g.next(next);
                if (iterator.done) {
                    returnValue || (returnValue = iterator.value);
                }
                else {
                    generation.push(iterator.value);
                }
            }
            next = yield index >= generation.length ? undefined : generation[index];
        }
        return returnValue;
    };
}
function syncPick(indexes, returnValue) {
    return function* (g) {
        let generation = [];
        let next;
        let iterator;
        for (let index of indexes) {
            while (!(iterator === null || iterator === void 0 ? void 0 : iterator.done) && index >= generation.length) {
                iterator = g.next(next);
                if (iterator.done) {
                    returnValue || (returnValue = iterator.value);
                }
                else {
                    generation.push(iterator.value);
                }
            }
            next = yield index >= generation.length ? undefined : generation[index];
        }
        return returnValue;
    };
}
/**
 * The `i`-th element of `pick(indexes)(g)` is the `j`-th item of `g` (potentially `undefined`, if `g` does not have `j` items), where `j` is the `i`-th item in `indexes`
 *
 * `pick(indexes)(g)` passes down to `g` the `next` value passed to `pick` for each `i` in `indexes`, which does not correspond to the items generated by `g`.
 *
 * `pick(indexes)(g)` returns the returning value of `g` if it finished.
 *
 * `pick(indexes, returnValue)(g)` returns `returnValue` when either `indexes` or `g` end.
 *
 * **Example** `pick([1, 0, 0, 2])(range())` generates 1, 0, 0, 2
 * @param {array} [indexes] the array of indexes
 * @param {array} [returnValue] the return value
 */
function pick(indexes, returnValue) {
    const asyncFunctor = asyncPick(indexes, returnValue);
    const syncFunctor = syncPick(indexes, returnValue);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

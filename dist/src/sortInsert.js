"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortInsert = sortInsert;
function asyncSortInsert(item, sort) {
    return async function* (g) {
        let next;
        let previousNext;
        let iterator;
        let inserted = false;
        while (!(iterator = await g.next(next)).done) {
            if (sort(item, iterator.value) <= 0) {
                next = yield item;
                inserted = true;
                break;
            }
            next = yield iterator.value;
        }
        if (!inserted) {
            yield item;
            return iterator.value;
        }
        previousNext = next;
        next = yield iterator.value;
        while (!(iterator = await g.next(previousNext)).done) {
            previousNext = next;
            next = yield iterator.value;
        }
        return iterator.value;
    };
}
function syncSortInsert(item, sort) {
    return function* (g) {
        let next;
        let previousNext;
        let iterator;
        let inserted = false;
        while (!(iterator = g.next(next)).done) {
            if (sort(item, iterator.value) <= 0) {
                next = yield item;
                inserted = true;
                break;
            }
            next = yield iterator.value;
        }
        if (!inserted) {
            yield item;
            return iterator.value;
        }
        previousNext = next;
        next = yield iterator.value;
        while (!(iterator = g.next(previousNext)).done) {
            previousNext = next;
            next = yield iterator.value;
        }
        return iterator.value;
    };
}
/**
 * If `g` is a sorted generator (according to `sort`), then `sortInsert(item, sort)(g)` generates the items of `g` including `item` following order given by `sort`.
 *
 * `sortInsert(item, sort)(g)` provides to `g` consecutive `next` values, irrespective of the insertion of the item.
 *
 * **Example** `sortInsert(5, (a, b) => a - b)(range(0, 10, 2))` generates 0, 2, 4, 5, 6, 8
 *
 * @param {T} [item] The item to insert in the generated output
 * @param {function} [sort] The sorting function. `sort(a, b) < 0` iff a < b. `sort(a, b) == 0` if a = b. `sort(a, b) > 0` if a > b.
 */
function sortInsert(item, sort) {
    const asyncFunctor = asyncSortInsert(item, sort);
    const syncFunctor = syncSortInsert(item, sort);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

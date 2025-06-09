"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunks = chunks;
function asyncChunks(size = 1) {
    return async function* (g) {
        let iterator;
        let next;
        let tuple = [];
        while (!(iterator = await g.next(next)).done) {
            tuple.push(iterator.value);
            if (tuple.length < size)
                continue;
            next = yield tuple;
            tuple = [];
        }
        if (tuple.length > 0 && tuple.length < size) {
            yield tuple;
        }
        return iterator.value;
    };
}
function syncChunks(size = 1) {
    return function* (g) {
        let iterator;
        let next;
        let tuple = [];
        while (!(iterator = g.next(next)).done) {
            tuple.push(iterator.value);
            if (tuple.length < size)
                continue;
            next = yield tuple;
            tuple = [];
        }
        if (tuple.length > 0 && tuple.length < size) {
            yield tuple;
        }
        return iterator.value;
    };
}
/**
 * Divides a generator in chunks of a given size
 *
 * Returns the same value as the generator
 *
 * @example `chunks(3)(range())` generates [0, 1, 2], [3, 4, 5], [6, 7, 8], ...
 * @template T The type of values yielded by the generators.
 * @template TReturn The type of the return value of the generators.
 * @template TNext The type of the value that can be passed to the generators' `next` method.
 * @param {number} [size=1] The size of the chunks to generate
 * @returns chunk generator
 */
function chunks(size = 1) {
    const asyncFunctor = asyncChunks(size);
    const syncFunctor = syncChunks(size);
    return function (g) {
        if (g[Symbol.asyncIterator]) {
            return asyncFunctor(g);
        }
        return syncFunctor(g);
    };
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortMerge = sortMerge;
function asyncSortMerge(h, sort) {
    return async function* (g) {
        let next = [];
        let gNextIndex = 0;
        let hNextIndex = 0;
        let gIterator = await g.next(next[gNextIndex]);
        let hIterator = await h.next(next[hNextIndex]);
        while (!gIterator.done && !hIterator.done) {
            if (sort(gIterator.value, hIterator.value) <= 0) {
                next.push(yield gIterator.value);
                gIterator = await g.next(next[gNextIndex++]);
            }
            else {
                next.push(yield hIterator.value);
                hIterator = await h.next(next[hNextIndex++]);
            }
        }
        if (!gIterator.done)
            next.push(yield gIterator.value);
        if (!hIterator.done)
            next.push(yield hIterator.value);
        while (!gIterator.done && !(gIterator = await g.next(next[gNextIndex++])).done) {
            next.push(yield gIterator.value);
        }
        while (!hIterator.done && !(hIterator = await h.next(next[hNextIndex++])).done) {
            next.push(yield hIterator.value);
        }
        return [gIterator.value, hIterator.value];
    };
}
function syncSortMerge(h, sort) {
    return function* (g) {
        let next = [];
        let gNextIndex = 0;
        let hNextIndex = 0;
        let gIterator = g.next(next[gNextIndex]);
        let hIterator = h.next(next[hNextIndex]);
        while (!gIterator.done && !hIterator.done) {
            if (sort(gIterator.value, hIterator.value) <= 0) {
                next.push(yield gIterator.value);
                gIterator = g.next(next[gNextIndex++]);
            }
            else {
                next.push(yield hIterator.value);
                hIterator = h.next(next[hNextIndex++]);
            }
        }
        if (!gIterator.done)
            next.push(yield gIterator.value);
        if (!hIterator.done)
            next.push(yield hIterator.value);
        while (!gIterator.done && !(gIterator = g.next(next[gNextIndex++])).done) {
            next.push(yield gIterator.value);
        }
        while (!hIterator.done && !(hIterator = h.next(next[hNextIndex++])).done) {
            next.push(yield hIterator.value);
        }
        return [gIterator.value, hIterator.value];
    };
}
function sortMerge(h, sort) {
    if (h[Symbol.asyncIterator]) {
        return asyncSortMerge(h, sort);
    }
    return syncSortMerge(h, sort);
}

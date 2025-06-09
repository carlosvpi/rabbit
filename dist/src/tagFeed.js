"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagFeed = tagFeed;
async function* asyncTagFeed(g) {
    let next;
    let iterator;
    while (!(iterator = await g.next(next)).done) {
        next = yield [iterator.value, next];
    }
    return [iterator.value, next];
}
function* syncTagFeed(g) {
    let next;
    let iterator;
    while (!(iterator = g.next(next)).done) {
        next = yield [iterator.value, next];
    }
    return [iterator.value, next];
}
function tagFeed(g) {
    if (g[Symbol.asyncIterator]) {
        return asyncTagFeed(g);
    }
    return syncTagFeed(g);
}

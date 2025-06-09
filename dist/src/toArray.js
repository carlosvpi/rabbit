"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = toArray;
async function asyncToArray(g) {
    let iterator;
    let result = [];
    while (!(iterator = await g.next()).done) {
        result.push(iterator.value);
    }
    return result;
}
function syncToArray(g) {
    let iterator;
    let result = [];
    while (!(iterator = g.next()).done) {
        result.push(iterator.value);
    }
    return result;
}
function toArray(g) {
    if (g[Symbol.asyncIterator]) {
        return asyncToArray(g);
    }
    return syncToArray(g);
}

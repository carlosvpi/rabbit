"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yieldReturnValue = yieldReturnValue;
async function* asyncYieldReturnValue(g) {
    let next;
    let i;
    while (!(i = await g.next(next)).done) {
        next = yield i.value;
    }
    yield i.value;
}
function* syncYieldReturnValue(g) {
    let next;
    let i;
    while (!(i = g.next(next)).done) {
        next = yield i.value;
    }
    yield i.value;
}
function yieldReturnValue(g) {
    if (g[Symbol.asyncIterator]) {
        return asyncYieldReturnValue(g);
    }
    return syncYieldReturnValue(g);
}

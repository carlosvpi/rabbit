"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returns = returns;
async function asyncReturns(g) {
    let i;
    while (!(i = await g.next()).done) { }
    return i.value;
}
function syncReturns(g) {
    let i;
    while (!(i = g.next()).done) { }
    return i.value;
}
function returns(g) {
    if (g[Symbol.asyncIterator]) {
        return asyncReturns(g);
    }
    return syncReturns(g);
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = debounce;
function debounce(ms) {
    return async function* (g) {
        let next;
        let iterator;
        let promised;
        let p;
        let timeout;
        let timedout;
        p = g.next(next);
        while (!(iterator = await p).done) {
            p = g.next(next);
            timeout = new Promise(r => timedout = r);
            while (promised = await Promise.race([p, new Promise(r => setTimeout(() => { r(); timedout(); }, ms))])) {
                if (promised.done) {
                    await timeout;
                    yield iterator.value;
                    return promised.value;
                }
                iterator = promised;
                timeout = new Promise(r => timedout = r);
                p = g.next(next);
            }
            yield iterator.value;
        }
        return iterator.value;
    };
}

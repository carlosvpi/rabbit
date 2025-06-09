"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveMulticast = liveMulticast;
function* liveMulticastAsync(g) {
    const stored = [];
    let done = false;
    let result;
    while (true) {
        const constructor = async function* (i) {
            let iterator;
            while (true) {
                if (i === stored.length) {
                    if (done)
                        return result;
                    iterator = await g.next();
                    if (done = iterator.done)
                        return result || (result = iterator.value);
                    stored.push(iterator.value);
                }
                yield stored[i++];
            }
        };
        yield constructor(stored.length);
    }
}
function* liveMulticastSync(g) {
    const stored = [];
    let done = false;
    let result;
    while (true) {
        const constructor = function* (i) {
            let iterator;
            while (true) {
                if (i === stored.length) {
                    if (done)
                        return result;
                    iterator = g.next();
                    if (done = iterator.done)
                        return result || (result = iterator.value);
                    stored.push(iterator.value);
                }
                yield stored[i++];
            }
        };
        yield constructor(stored.length);
    }
}
function liveMulticast(g) {
    if (g[Symbol.asyncIterator]) {
        return liveMulticastAsync(g);
    }
    return liveMulticastSync(g);
}

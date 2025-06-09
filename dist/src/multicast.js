"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multicast = multicast;
function* multicastAsync(g) {
    const stored = [];
    let done = false;
    let result;
    const resolvers = [];
    const constructor = async function* () {
        let i = 0;
        let iterator;
        while (true) {
            if (i === stored.length) {
                if (done)
                    return result;
                iterator = await new Promise(resolve => resolvers.push(resolve));
                if (done = iterator.done)
                    return result || (result = iterator.value);
            }
            if (stored[i].done)
                return stored[i].value;
            yield stored[i++].value;
        }
    };
    (async () => {
        let iterator;
        while (true) {
            iterator = await g.next();
            stored.push(iterator);
            while (resolvers.length) {
                resolvers.splice(0, 1)[0](iterator);
            }
            if (iterator.done)
                return;
        }
    })();
    while (true) {
        yield constructor();
    }
}
function* multicastSync(g) {
    const stored = [];
    let done = false;
    let result;
    while (true) {
        const constructor = function* () {
            let i = 0;
            let iterator;
            while (true) {
                if (i === stored.length) {
                    if (done)
                        return result;
                    iterator = g.next();
                    if (done = iterator.done)
                        return result || (result = iterator.value);
                    stored.push(iterator);
                }
                if (stored[i].done)
                    return stored[i].value;
                yield stored[i++].value;
            }
        };
        yield constructor();
    }
}
function multicast(g) {
    if (g[Symbol.asyncIterator]) {
        return multicastAsync(g);
    }
    return multicastSync(g);
}

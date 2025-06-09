"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.append = append;
function asyncAppend(object) {
    return async function* (g) {
        let iterator;
        let next;
        while (!(iterator = await g.next(next)).done) {
            next = yield iterator.value;
        }
        while (!(iterator = await object.next(next)).done) {
            next = yield iterator.value;
        }
        return iterator.value;
    };
}
function syncAppend(object) {
    return function* (g) {
        let iterator;
        let next;
        while (!(iterator = g.next(next)).done) {
            next = yield iterator.value;
        }
        while (!(iterator = object.next(next)).done) {
            next = yield iterator.value;
        }
        return iterator.value;
    };
}
function append(object) {
    return object[Symbol.asyncIterator]
        ? asyncAppend(object)
        : syncAppend(object);
}

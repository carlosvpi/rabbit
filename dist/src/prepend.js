"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepend = prepend;
function asyncPrepend(object) {
    return async function* (g) {
        let iterator;
        let next;
        while (!(iterator = await object.next(next)).done) {
            next = yield iterator.value;
        }
        while (!(iterator = await g.next(next)).done) {
            next = yield iterator.value;
        }
        return iterator.value;
    };
}
function syncPrepend(object) {
    return function* (g) {
        let iterator;
        let next;
        while (!(iterator = object.next(next)).done) {
            next = yield iterator.value;
        }
        while (!(iterator = g.next(next)).done) {
            next = yield iterator.value;
        }
        return iterator.value;
    };
}
function prepend(object) {
    return object[Symbol.asyncIterator]
        ? asyncPrepend(object)
        : syncPrepend(object);
}

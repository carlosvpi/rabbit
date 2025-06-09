"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feed = feed;
function asyncFeed(feeder) {
    return async function* (g) {
        let gCursor;
        let feedCursor;
        let next;
        do {
            gCursor = await g.next(feedCursor === null || feedCursor === void 0 ? void 0 : feedCursor.value);
            if (!gCursor.done)
                next = yield gCursor.value;
            feedCursor = await feeder.next(next);
        } while (!gCursor.done && !(feedCursor === null || feedCursor === void 0 ? void 0 : feedCursor.done));
        return [gCursor.done ? gCursor.value : null, feedCursor.done ? feedCursor.value : null];
    };
}
function syncFeed(feeder) {
    return function* (g) {
        let gCursor;
        let feedCursor;
        let next;
        do {
            gCursor = g.next(feedCursor === null || feedCursor === void 0 ? void 0 : feedCursor.value);
            if (!gCursor.done)
                next = yield gCursor.value;
            feedCursor = feeder.next(next);
        } while (!gCursor.done && !(feedCursor === null || feedCursor === void 0 ? void 0 : feedCursor.done));
        return [gCursor.done ? gCursor.value : null, feedCursor.done ? feedCursor.value : null];
    };
}
function feed(feeder) {
    const f = feeder[Symbol.asyncIterator]
        ? asyncFeed(feeder)
        : syncFeed(feeder);
    return feeder[Symbol.asyncIterator]
        ? (function (g) {
            return f(g);
        })
        : (function (g) {
            return f(g);
        });
}

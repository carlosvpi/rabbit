"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedback = feedback;
function asyncFeedback(feeder) {
    return async function* (g) {
        let gCursor;
        let feedCursor;
        do {
            gCursor = await g.next(feedCursor === null || feedCursor === void 0 ? void 0 : feedCursor.value);
            if (!gCursor.done)
                yield gCursor.value;
            feedCursor = await feeder.next(gCursor.value);
        } while (!gCursor.done && !feedCursor.done);
        return [gCursor.done ? gCursor.value : null, feedCursor.done ? feedCursor.value : null];
    };
}
function syncFeedback(feeder) {
    return function* (g) {
        let gCursor;
        let feedCursor;
        do {
            gCursor = g.next(feedCursor === null || feedCursor === void 0 ? void 0 : feedCursor.value);
            if (!gCursor.done)
                yield gCursor.value;
            feedCursor = feeder.next(gCursor.value);
        } while (!gCursor.done && !feedCursor.done);
        return [gCursor.done ? gCursor.value : null, feedCursor.done ? feedCursor.value : null];
    };
}
function feedback(feeder) {
    const f = feeder[Symbol.asyncIterator]
        ? asyncFeedback(feeder)
        : syncFeedback(feeder);
    return feeder[Symbol.asyncIterator]
        ? (function (g) {
            return f(g);
        })
        : (function (g) {
            return f(g);
        });
}

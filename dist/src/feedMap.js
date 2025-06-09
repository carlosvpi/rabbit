"use strict";
/**
 * FeedMap creates a generator whose values depend on its *next* parameter.
 *
 * The first call: `feedMap(f, first).next().value` = `f(first)`,
 *
 * The next calls: `feedMap(f, _).next(n).value` = `f(n)`,
 *
 * `feedMap(f, first)` never returns.
 *
 * @param {generator} [f] the function to apply to the *next* parameter
 * @param {generator} [first] the first element to generate
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedMap = feedMap;
function* feedMap(f, first) {
    let i = 0;
    let next = yield f(first, i++);
    while (true) {
        next = yield f(next, i++);
    }
}

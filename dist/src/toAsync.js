"use strict";
/**
 * ```typescript
 * toAsync(«1, 2 | 'A'») = [Promise.resolve(1), Promise.resolve(2) | 'A']
 * ```
 *
 * `toAsync(g)` takes a synchronous generators and generates its items asynchronously. It returns the same value as `g`.
 *
 * @param g a synchronous generator
 * @returns the equivalent asynchronous generator
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAsync = toAsync;
async function* toAsync(g) {
    let next;
    let iterator;
    while (!(iterator = g.next(next)).done) {
        next = yield await Promise.resolve(iterator.value);
    }
    return iterator.value;
}

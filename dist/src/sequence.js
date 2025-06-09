"use strict";
/**
 * `sequence(f, ...initialValues)` generates, first, the initial values and, after, the values produced by the function f over the last values generated
 *
 * **Example** sequence((a, b) => a + b, 1, 1) generates the fibonacci sequence
 *
 * @param {Function} [f] the sequence function. It takes the last `n` items generated and returns the next one
 * @param {array} [initialValues] the first values to generate (initialValues.length >= n)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequence = sequence;
function* sequence(f, ...initialValues) {
    let args = [];
    for (let item of initialValues) {
        yield item;
        args.push(item);
    }
    args = args.splice(args.length - f.length);
    while (true) {
        const item = f(...args);
        yield item;
        args.push(item);
        args.splice(0, 1);
    }
}

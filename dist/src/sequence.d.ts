/**
 * `sequence(f, ...initialValues)` generates, first, the initial values and, after, the values produced by the function f over the last values generated
 *
 * **Example** sequence((a, b) => a + b, 1, 1) generates the fibonacci sequence
 *
 * @param {Function} [f] the sequence function. It takes the last `n` items generated and returns the next one
 * @param {array} [initialValues] the first values to generate (initialValues.length >= n)
 */
export declare function sequence<T>(f: (..._: T[]) => T, ...initialValues: T[]): Generator<T, void, unknown>;

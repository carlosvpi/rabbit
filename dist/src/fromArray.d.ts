/**
 * Yield the items of an array
 *
 * Return the second argument
 *
 * @example `fromArray([0, 1, 2, 3, 4], 100)` generates 0, 1, 2, 3, 4 and returns 100
 * @template T The type of values yielded by the generators
 * @template TReturn The type of the return value of the generators
 * @param array the array to yield
 * @param returnValue the value to return
 * @returns the generator
 */
export declare function fromArray<T, TReturn = any>(array: T[], returnValue?: TReturn): Generator<T, TReturn, void>;

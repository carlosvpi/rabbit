/**
 * `find(p)(g)` finds the item in `g` that fulfils `p` (if none does, returns `null`)
 *
 * `p` is passed each item, the index of the item and the `next` value used to get it.
 *
 * The return value of `g` is ignored.
 *
 * **Example** `find(x => x % 5 === 4)(range(0, 5))` returns 4
 * @param {function} [p] The predicate that characterizes the solution, or null if no solution is found
 */
export declare function find<T, TNext>(p: (_0: T, _1: number, _2: TNext) => boolean): {
    (g: AsyncGenerator<T, any, TNext>): Promise<T | null>;
    (g: Generator<T, any, TNext>): T | null;
};

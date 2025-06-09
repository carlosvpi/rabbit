/**
 * `takeWhile(p)(g)` generates items `e` of `g` as long `p(e, index, next)` holds (`index` is the index of `e` in `g` and `next` is the next value used to generate it)
 *
 * If `g` finishes before finsing the item that fulfils `p`, `takeWhile(p, v)(g)` returns `v`
 *
 * **Example** `takeWhile(x => x % 6 !== 5)(range())` generates 0, 1, 2, 3, 4
 * @param {Function} [p] The predicate that is checked against items of `g`, their indexes and the previous next value.
 * @param {TReturn} [returnValue] The value to return if g runs out
 */
export declare function takeWhile<T, TReturn = any, TNext = any>(p: (_0: T, _1: number, _2: TNext) => boolean, returnValue?: TReturn): <G extends Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>>(g: G) => G;

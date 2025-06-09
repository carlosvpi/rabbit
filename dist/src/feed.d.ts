export type FeedReturn<TReturn, TFeederReturn> = (TReturn | TFeederReturn | null)[];
/**
 * `feed(feeder)(g)` => `g.next()`, `g.next(feeder.next())`, `g.next(feeder.next())`, ...
 *
 * If the generator `g` returns `value`, `feed(feeder)(g)` returns `[value, null]`
 *
 * If the `feeder` returns `value`, `feed(feeder)(g)` returns `[null, value]`
 *
 * If both the generator `g` and `feeder` return `value1` and `value2` at the same time, `feed(feeder)(g)` returns `[value1, value2]`
 *
 * @param {generator} [feeder] the feeding generator
 */
export declare function feed<T, TReturn = any, TFeederReturn = any, TNext = any, TFeederNext = any>(feeder: AsyncGenerator<TNext, any, TFeederNext>): (g: AsyncGenerator<T, any, TNext>) => AsyncGenerator<T, FeedReturn<TReturn, TFeederReturn>, TFeederNext>;
export declare function feed<T, TReturn = any, TFeederReturn = any, TNext = any, TFeederNext = any>(feeder: Generator<TNext, any, TFeederNext>): (g: Generator<T, any, TNext>) => Generator<T, FeedReturn<TReturn, TFeederReturn>, TFeederNext>;

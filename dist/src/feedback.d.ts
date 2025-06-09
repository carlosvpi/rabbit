import { FeedReturn } from "./feed";
/**
 * `feedback(feeder)(g)` => `e1 = g.next()`, `e2 = g.next(feeder.next(e1))`, `e3 = g.next(feeder.next(e2))`, ...
 *
 * If the generator `g` returns `value`, `feed(feeder)(g)` returns `[value, null]`
 *
 * If the `feeder` returns `value`, `feed(feeder)(g)` returns `[null, value]`
 *
 * If both the generator `g` and `feeder` return `value1` and `value2` at the same time, `feed(feeder)(g)` returns `[value1, value2]`
 *
 * @param {generator} [feeder] the feeding generator
 */
export declare function feedback<T, TReturn = any, TFeederReturn = any, TNext = any, TFeederNext = any>(feeder: AsyncGenerator<TNext, any, TFeederNext>): (g: AsyncGenerator<T, any, TNext>) => AsyncGenerator<T, FeedReturn<TReturn, TFeederReturn>, TFeederNext>;
export declare function feedback<T, TReturn = any, TFeederReturn = any, TNext = any, TFeederNext = any>(feeder: Generator<TNext, any, TFeederNext>): (g: Generator<T, any, TNext>) => Generator<T, FeedReturn<TReturn, TFeederReturn>, TFeederNext>;

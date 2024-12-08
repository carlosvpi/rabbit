/**
 * 
 * `tagFeed(g)` returns the items of `g`, together with the input used to generate them
 * 
 * **Example** `tagFeed(feed(range(0, 10))(feedMap(x => x * 2, 0)))`
 * 
 * @param g the generator whose feed is to be tagged
 * @returns 
 */

export function* tagFeed<T, I = T>(g: Generator<T, any, I>): Generator<(T | undefined)[], any, I> {
  let tag = undefined
  while (true) {
    const result = g.next(tag)

    if (result.done) return
    tag = yield [result.value, tag]
  }
}

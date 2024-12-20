/**
 * `fromNowMulticastAsync(g)` generates independent copies of asynchronous g.
 * 
 * `g` is required to not have a type of `next`
 * 
 * The return value of each copy is the same as that of the original generator `g` (but does not replay all previous items generated by `g`).
 * 
 * `fromNowMulticastAsync(g)` never returns.
 * 
 * @param {number} [g] the generator to fromNowMulticastAsync
 */

export function* fromNowMulticastAsync<T, TReturn = any> (g: AsyncGenerator<T, TReturn>): Generator<AsyncGenerator<T, TReturn>, never> {
  const stored = []
  let done: boolean = false
  let result: TReturn
  while (true) {
    const constructor = async function* (i: number) {
      let iterator: IteratorResult<T, TReturn>
      while (true) {
        if (i === stored.length) {
          if (done) return result
          iterator = await g.next()
          if (done = iterator.done) return result ||= iterator.value
          stored.push(iterator.value)
        }
        yield stored[i++]
      }
    }
    yield constructor(stored.length)
  }
}

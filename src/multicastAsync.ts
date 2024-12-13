/**
 * `multicastAsync(g)` generates independent copies of asynchronous g.
 * 
 * `g` is required to not have a type of `next`
 * 
 * The return value of each copy is the same as that of the original generator `g`.
 * 
 * `multicastAsync(g)` never returns.
 * 
 * @param {number} [g] the asynchronous generator to multicast
 */

export function* multicastAsync<T, TReturn = any> (g: AsyncGenerator<T, TReturn>): Generator<AsyncGenerator<T, TReturn>, never> {
  const stored = []
  let done: boolean = false
  let result: TReturn
  while (true) {
    const constructor = async function* () {
      let i = 0
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
    yield constructor()
  }
}

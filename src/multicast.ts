function* multicastAsync<T, TReturn = any> (g: AsyncGenerator<T, TReturn>): Generator<AsyncGenerator<T, TReturn>, never> {
  const stored: IteratorResult<T, TReturn>[] = []
  let done: boolean = false
  let result: TReturn
  const resolvers: ((_: IteratorResult<T, TReturn>) => void)[] = []
  const constructor = async function* (): AsyncGenerator<T, TReturn> {
    let i = 0
    let iterator: IteratorResult<T, TReturn>
    while (true) {
      if (i === stored.length) {
        if (done) return result
        iterator = await new Promise(resolve => resolvers.push(resolve))
        if (done = iterator.done) return result ||= iterator.value
      }
      if (stored[i].done) return stored[i].value as TReturn
      yield stored[i++].value as T
    }
  }
  ;(async () => {
    let iterator: IteratorResult<T, TReturn>
    while (true) {
      iterator = await g.next()
      stored.push(iterator)
      while (resolvers.length) {
        resolvers.splice(0, 1)[0](iterator)
      }
      if (iterator.done) return
    }
  })()
  while (true) {
    yield constructor()
  }
}

function* multicastSync<T, TReturn = any> (g: Generator<T, TReturn>): Generator<Generator<T, TReturn>, never> {
  const stored: IteratorResult<T, TReturn>[] = []
  let done: boolean = false
  let result: TReturn
  while (true) {
    const constructor = function* (): Generator<T, TReturn> {
      let i = 0
      let iterator: IteratorResult<T, TReturn>
      while (true) {
        if (i === stored.length) {
          if (done) return result
          iterator = g.next()
          if (done = iterator.done) return result ||= iterator.value
          stored.push(iterator)
        }
        if (stored[i].done) return stored[i].value as TReturn
        yield stored[i++].value as T
      }
    }
    yield constructor()
  }
}

/**
 * `multicast(g)` generates independent copies of g.
 * 
 * `g` is required to not have a type of `next`
 * 
 * The return value of each copy is the same as that of the original generator `g`.
 * 
 * `multicast(g)` never returns.
 * 
 * **Example** If `[c1, c2] = [...take(2)(multicast(2)(range()))]`, then we can consume all elements of c1 (thus consuming g) without consuming the elements of c2.
 * 
 * @param {number} [g] the generator to multicast
 */

export function multicast<T, TReturn = any> (g: Generator<T, TReturn>): Generator<Generator<T, TReturn>, never>
export function multicast<T, TReturn = any> (g: AsyncGenerator<T, TReturn>): Generator<AsyncGenerator<T, TReturn>, never>

export function multicast<T, TReturn = any> (g: Generator<T, TReturn> | AsyncGenerator<T, TReturn>): Generator<Generator<T, TReturn> | AsyncGenerator<T, TReturn>, never> {
  if (g[Symbol.asyncIterator]) {
    return multicastAsync(g as AsyncGenerator<T, any>) as Generator<AsyncGenerator<T, TReturn>, never>;
  }
  return multicastSync(g as Generator<T, any>) as Generator<Generator<T, TReturn>, never>;
}

/**
 * `asyncFlatMap(f)(g)`, where `g` is a generator and `f(e, i)`, for each item `e` of `g` and index `i` of `e`, is another generator, generates (flattening) each value from each `f(e)`.
 * 
 * All the returning values of the generators created by `g` are put into a list and returned by `asyncFlatMap(f)(g)`, preceded by the return value of `f` itself.
 * 
 * @param {generator} [f] the function from item to generator
 */

export function asyncFlatMap<T, U, TReturn = any, UReturn = any, TNext = any> (f: (_: T, _1: number) => AsyncGenerator<U, UReturn, TNext>) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>) {
    const returnValue: (TReturn | UReturn)[] = []
    let gIterator: IteratorResult<T, TReturn>
    let next: TNext
    let i: number = 0
    while (!(gIterator = await g.next(next)).done) {
      let eIterator: IteratorResult<U, UReturn>
      const e = f(gIterator.value as T, i++)
      while (!(eIterator = await e.next(next)).done) {
        next = yield(eIterator.value)
      }
      returnValue.push(eIterator.value)
    }
    return [gIterator.value, ...returnValue]
  }
}

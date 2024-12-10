/**
 * 
 * `toAsync(f)` is a function that applies to an asynchronous generator `g` so that a non asynchronous operator `f` can operate with the values of `g`.
 * 
 * If `g` is an asynchronous generator, then `toAsync(f)(g)` is also an asynchronous generator.
 * 
 * **Example** `toAsync(head(10))` takes the first 10 items of an asynchronous generator
 * 
 * @beta
 * @param ms 
 */

export function toAsync<T, TReturn = any, TNext = any> (h: (_: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>): AsyncGenerator<T, TReturn, TNext> {
    let next: TNext | undefined = undefined
    let iterator: IteratorResult<T, TReturn>
    let syntheticIterator: IteratorResult<T, TReturn>
    let value: T | TReturn | undefined
    let done: boolean = false
    const syntheticGenerator = h({
      next: (n: TNext) => {
        next = n;
        return { value, done }
      }
    } as Generator<T, TReturn, TNext>)
    while (!(iterator = await g.next(next)).done) {
      value = iterator.value as T
      done = iterator.done
      syntheticIterator = syntheticGenerator.next(next)
      if (syntheticIterator.done) {
        return syntheticIterator.value
      }
      next = yield syntheticIterator.value as T
    }
    value = iterator.value as TReturn
    done = iterator.done
    syntheticIterator = syntheticGenerator.next(next)
    if (syntheticIterator.done) {
      return syntheticIterator.value
    }
    next = yield syntheticIterator.value as T
    value = undefined
    while (!(syntheticIterator = syntheticGenerator.next(next)).done) {
      next = yield syntheticIterator.value as T
    }
    return syntheticIterator.value
  }
}

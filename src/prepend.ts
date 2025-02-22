function asyncPrepend<T, TReturn = any, TNext = any> (object: AsyncGenerator<T, TReturn, TNext>) {
  return async function* (g: AsyncGenerator<T, TReturn, TNext>) {
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    while (!(iterator = await object.next(next)).done) {
      next = yield iterator.value
    }
    while (!(iterator = await g.next(next)).done) {
      next = yield iterator.value
    }
    return iterator.value
  }
}

function syncPrepend<T, TReturn = any, TNext = any> (object: Generator<T, TReturn, TNext>) {
  return function* (g: Generator<T, TReturn, TNext>) {
    let iterator: IteratorResult<T, TReturn>
    let next: TNext
    while (!(iterator = object.next(next)).done) {
      next = yield iterator.value
    }
    while (!(iterator = g.next(next)).done) {
      next = yield iterator.value
    }
    return iterator.value
  }
}

/**
 * `prepend(g1)(g2)` generates, first, all items from `g1`, and then all items from `g2`
 * 
 * `next` values passed to `prepend(g1)(g2)` are passed down to `g1`, first, and `g2`, after.
 * 
 * The return value of `g1` is ignored. The return value of `prepend(g1)(g2)` is that of `g2`.
 * 
 * @param {generator} [object] the generator to prepend
 */

export function prepend<T, TReturn = any, TNext = any> (object: AsyncGenerator<T, TReturn, TNext>): (g: AsyncGenerator<T, TReturn, TNext>) => AsyncGenerator<T, TReturn, TNext>;
export function prepend<T, TReturn = any, TNext = any> (object: Generator<T, TReturn, TNext>): (g: Generator<T, TReturn, TNext>) => Generator<T, TReturn, TNext>;

export function prepend<T, TReturn = any, TNext = any> (object: Generator<T, TReturn, TNext> | AsyncGenerator<T, TReturn, TNext>) {
  return object[Symbol.asyncIterator]
    ? asyncPrepend(object as AsyncGenerator<T, TReturn, TNext>)
    : syncPrepend(object as Generator<T, TReturn, TNext>)
}

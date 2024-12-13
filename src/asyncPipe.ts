/**
 * `asyncPipe(...c)(g)` generates items of asynchronous `g` and passes them through the generator constructors `c_i`
 * 
 * **Example** `pipe(asyncDrop(5), asyncTake(10), asyncFilter(x => x % 2 === 0))(toAsync(range()))` generates 6, 8, 10, 12, 14
 * @param {Array} [constructors] The generator constructors
 */

export function asyncPipe<T>(...constructors: ((_: AsyncGenerator<T>) => AsyncGenerator<T>)[]) {
  return function(generator: AsyncGenerator<T>) {
    for (let constructor of constructors) {
      generator = constructor(generator)
    }
    return generator
  }
}

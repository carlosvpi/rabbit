/**
 * `pipe(...c)(g)` generates items of `g` and passes them through the generator constructors `c_i`
 * 
 * **Example** `pipe(skip(5), head(10), filter(x => x % 2 === 0))(range())` generates 6, 8, 10, 12, 14
 * @param {Array} [constructors] The generator constructors
 */

export function pipe<N>(...constructors: ((_: Generator<N>) => Generator<N>)[]) {
  return function(generator: Generator<N>) {
    for (let constructor of constructors) {
      generator = constructor(generator)
    }
    return generator
  }
}

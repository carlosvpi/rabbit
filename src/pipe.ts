/**
 * `pipe(g, ...c)` generates items of `g` and passes them through the generator constructors `c_i`
 * **Example** `pipe(range(), skip(5), head(10), filter(x => x % 2 === 0))` generates 6, 8, 10, 12, 14
 * @param {number} [n = 1] The amount of items to generate
 */

export function pipe<N>(generator: Generator<N>, ...constructors: ((_: Generator<N>) => Generator<N>)[]) {
  for (let constructor of constructors) {
    generator = constructor(generator)
  }
  return generator
}

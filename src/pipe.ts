export function pipe<N>(generator: Generator<N>, ...constructors: ((_: Generator<N>) => Generator<N>)[]) {
  for (let constructor of constructors) {
    generator = constructor(generator)
  }
  return generator
}

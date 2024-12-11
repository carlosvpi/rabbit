<div align="center">

![logo](https://github.com/carlosvpi/rabbit/blob/main/docs/assets/Rabbit.svg?raw=true)

_Generator utilities_

# Rabbit

Utility javascript library for generators

[Documentation](https://github.com/carlosvpi/rabbit/blob/main/docs/documentation.md)

</div>

## Install

Install @carlosvpi/rabbit:

```bash
npm install @carlosvpi/rabbit
```

or

```bash
yarn add @carlosvpi/rabbit
```

@carlosvpi/rabbit is ready to be tree-shaken. In order to only use a specific function (for example, `head`), you can import like so:

```typescript
import { head } from '@carlosvpi/rabbit/head'
```

## Examples

This gives us the fibonacci sequence

```typescript
sequence((a, b) => a + b, 1, 1)

=> 1, 1, 2, 3, 5, 8, 13, 21, 34, 55... // inifinte sequence
```

As is, the sequence is inifinite, so let's take only the 10 first items

```typescript
[...head(10)(sequence((a, b) => a + b, 1, 1))]

=> [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

Now let's group them in tuples of 2 consecutive items

```typescript
[...runningTuples(2)(head(10)(sequence((a, b) => a + b, 1, 1)))]

=> [
  [ 1, 1 ], [ 1, 2 ],
  [ 2, 3 ], [ 3, 5 ],
  [ 5, 8 ], [ 8, 13 ],
  [ 13, 21 ], [ 21, 34 ],
  [ 34, 55 ]
]
```

That is a bit cumbersome to write. We can do the same `pipe`:

```typescript
[...pipe(
  head(10),
  runningTuples(2)
)(sequence((a, b) => a + b, 1, 1))]

=> [
  [ 1, 1 ], [ 1, 2 ],
  [ 2, 3 ], [ 3, 5 ],
  [ 5, 8 ], [ 8, 13 ],
  [ 13, 21 ], [ 21, 34 ],
  [ 34, 55 ]
]
```

Let's divide the items in the tuples to find the ratio of each two consecutive elements in the sequence
```typescript
[...pipe(
  head(10),
  runningTuples(2),
  map(([a, b]) => b / a)
)(sequence((a, b) => a + b, 1, 1))]

=> [
  1,
  2,
  1.5,
  1.6666666666666667,
  1.6,
  1.625,
  1.6153846153846154,
  1.619047619047619,
  1.6176470588235294
]
```

Now we can approximate the golden ratio picking the `n`-th (for a large `n`) pair in the sequence
```typescript
[...pipe(
  slice(1000, 1002),
  runningTuples(2),
  map(([a, b]) => b / a)
)(sequence((a, b) => a + b, 1, 1))]

=> [1.618033988749895]
```
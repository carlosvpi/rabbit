export function deferPromise () {
  let res, rej
  const p = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })
  return [p, res, rej]
}

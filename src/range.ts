export function* range(start: number = 0, end: number = Infinity, step: number = 1) {
  if ((end - start) * step === 0) return
  if ((end - start) * step <= 0) step = -step
  for (let i = start; step > 0 ? i < end : i > end; i+= step) {
    yield i
  }
}
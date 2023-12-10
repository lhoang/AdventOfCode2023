import { performance } from 'node:perf_hooks'

export function time(wrapped: () => void, second = false) {
  let unit = 'ms'
  let div = 1
  if (second) {
    unit = 's'
    div = 1000
  }
  const startTime = performance.now()
  wrapped()
  const endTime = performance.now()
  console.log(`Time: ${(endTime - startTime) / div} ${unit}`)
}

import { range, transpose } from '../../../utils/array'

type ReflectorDish = string[][]

export const parseDish = (input: string[]): ReflectorDish =>
  input.map(l => [...l])

/**
 * Tilt on West.
 */
export const tilt = (line: string[]): string[] =>
  line
    .join('')
    .split('#')
    .map(x => x.replace(/\./g, '').padEnd(x.length, '.'))
    .join('#')
    .split('')

export const rotateLeft = (dish: ReflectorDish): ReflectorDish =>
  transpose(dish.map(l => l.reverse()))

export const rotateRight = (dish: ReflectorDish): ReflectorDish =>
  transpose(dish).map(l => l.reverse())

export const tiltNorth = (dish: ReflectorDish): ReflectorDish =>
  rotateRight(rotateLeft(dish).map(tilt))

export const tiltWest = (dish: ReflectorDish): ReflectorDish => dish.map(tilt)

export const tiltEast = (dish: ReflectorDish): ReflectorDish =>
  rotateRight(rotateRight(rotateLeft(rotateLeft(dish)).map(tilt)))

export const tiltSouth = (dish: ReflectorDish): ReflectorDish =>
  rotateLeft(rotateRight(dish).map(tilt))

export const totalLoad = (dish: ReflectorDish): number => {
  const numbers = dish.map(
    (l, i) => l.filter(c => c == 'O').length * (dish.length - i),
  )
  return numbers.reduce((a, b) => a + b)
}

export const tiltCycle = (dish: ReflectorDish, n: number): ReflectorDish =>
  range(1, n).reduce(res => tiltEast(tiltSouth(tiltWest(tiltNorth(res)))), dish)

export const findRepeatingCycle = (arr: number[]): [number, number] | null => {
  const l = arr.length
  if (l < 2) {
    return null
  }

  let foundIndex = -1
  let patternSize = 0
  const joinedArr = arr.join(',')
  for (let i = 2; i < l; i++) {
    const pattern = Array(3).fill(arr.slice(-i).join(`,`)).join(',')
    const foundStrIndex = joinedArr.indexOf(pattern)
    if (foundStrIndex > -1) {
      foundIndex = joinedArr.slice(0, foundStrIndex).replace(/\d/g, '').length
      patternSize = i
      break
    }
  }
  return foundIndex >= 0 ? [foundIndex, patternSize] : null
}

export const titleCycleLoad = (input: string[], n: number): number => {
  const record: number[] = []

  let currentDish: ReflectorDish = parseDish(input)
  let repeatCycle: [number, number] = null
  for (let i = 0; i < n; i++) {
    currentDish = tiltEast(tiltSouth(tiltWest(tiltNorth(currentDish))))
    record.push(totalLoad(currentDish))
    repeatCycle = findRepeatingCycle(record)
    if (repeatCycle) {
      break
    }
  }
  const [start, length] = repeatCycle
  const loop = record.slice(start, start + length)
  return loop.at((n % length) - start - 1)
}

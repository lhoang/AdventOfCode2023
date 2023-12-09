import { range } from '../../../utils/array.js'

export const parseLine = (line: string): number[] => line.split(' ').map(Number)

const deriveLine = (line: number[]) => {
  const derive = (arr: number[]) =>
    range(0, arr.length - 2).map(i => arr[i + 1] - arr[i])

  let current = line
  const derived: number[][] = [line]
  while (current.some(i => i !== 0)) {
    current = derive(current)
    derived.push(current)
  }
  return derived.reverse()
}

export const findNextValue = (line: number[]): number =>
  deriveLine(line).reduce((add, l) => add + l.at(-1), 0)

export const addAllNextValues = (input: string[]): number =>
  input
    .map(parseLine)
    .map(findNextValue)
    .reduce((a, b) => a + b)

export const findPreviousValue = (line: number[]): number =>
  deriveLine(line).reduce((add, l) => {
    return l.at(0) - add
  }, 0)

export const addAllPreviousValues = (input: string[]): number =>
  input
    .map(parseLine)
    .map(findPreviousValue)
    .reduce((a, b) => a + b)

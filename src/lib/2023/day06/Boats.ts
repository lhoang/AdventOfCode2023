import { range } from '../../../utils/array.js'

type Boat = [number, number]

export const parseBoats = (input: string[]): Boat[] => {
  const [time, distance] = input.map(s =>
    s
      .replace(/\w+:\s+/, '')
      .split(/\s+/)
      .map(Number),
  )

  return time.map((t, i) => [t, distance[i]])
}

export const countRecords = ([T, D]: Boat): number =>
  range(0, T)
    .map(t => t * (T - t))
    .filter(d => d > D).length

export const countAllRecords = (input: string[]): number =>
  parseBoats(input)
    .map(countRecords)
    .reduce((a, b) => a * b)

export const parseSingleRace = (input: string[]): Boat => {
  const [t, d] = input.map(s => s.replace(/[A-Z:\s]/gi, '')).map(Number)
  return [t, d]
}

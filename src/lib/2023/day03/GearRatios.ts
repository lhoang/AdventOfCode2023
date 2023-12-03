import { range } from '../../../utils/array.js'

const { min, max } = Math

export interface PartNumber {
  x: number
  y: number
  length: number
  value: number
}

export interface Gear {
  id: string
  value: number
}

export const findNumbers = (map: string[]): PartNumber[] => {
  return map.flatMap(
    (line, j) =>
      line
        .split(/[\D]+/)
        .filter(Boolean)
        .reduce<[PartNumber[], number]>(
          ([acc, index], i) => {
            const x = line.indexOf(i, index)
            return [
              [
                ...acc,
                {
                  x,
                  y: j,
                  length: i.length,
                  value: +i,
                },
              ],
              x + i.length,
            ]
          },
          [[], 0],
        )[0],
  )
}

export const getAdjacentSymbols = (
  { x, y, length }: PartNumber,
  map: string[],
): string[] => {
  const x1 = max(x - 1, 0)
  const x2 = min(x + length, map[0].length - 1)
  const top = y > 0 ? range(x1, x2).map(i => map[y - 1][i]) : []
  const center = [
    ...(x > 0 ? [map[y][x1]] : []),
    ...(x + length < map[0].length ? [map[y][x2]] : []),
  ]
  const bottom = y < map.length - 1 ? range(x1, x2).map(i => map[y + 1][i]) : []

  return [...top, ...center, ...bottom].filter(c => /[^.\d]/.test(c))
}

export const findPartNumbers = (map: string[]) =>
  findNumbers(map)
    .filter(n => getAdjacentSymbols(n, map).length)
    .reduce((acc, n) => acc + n.value, 0)

export const getAdjacentGears = (
  { x, y, length, value }: PartNumber,
  map: string[],
): Gear[] => {
  const newGear = (j: number, i: number): Gear | null =>
    map[j][i] === '*'
      ? {
          id: [i, j].join('-'),
          value,
        }
      : null

  const x1 = max(x - 1, 0)
  const x2 = min(x + length, map[0].length - 1)
  const top = y > 0 ? range(x1, x2).map(i => newGear(y - 1, i)) : []
  const center = [
    ...(x > 0 ? [newGear(y, x1)] : []),
    ...(x + length < map[0].length ? [newGear(y, x2)] : []),
  ]
  const bottom =
    y < map.length - 1 ? range(x1, x2).map(i => newGear(y + 1, i)) : []

  return [...top, ...center, ...bottom].flat().filter(Boolean)
}

export const addGearRatios = (map: string[]) => {
  const partNumbers = findNumbers(map)
  const gears = partNumbers
    .flatMap(n => getAdjacentGears(n, map))
    .reduce<Record<string, number[]>>((acc, { id, value }) => {
      acc[id] ? acc[id].push(value) : (acc[id] = [value])
      return acc
    }, {})

  return Object.entries(gears)
    .filter(([_, numbers]) => numbers.length == 2)
    .reduce((acc, [_, numbers]) => acc + numbers[0] * numbers[1], 0)
}

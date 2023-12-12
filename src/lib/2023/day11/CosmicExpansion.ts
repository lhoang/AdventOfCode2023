import { range, transpose } from '../../../utils/array.js'

type Universe = string[]

interface Point {
  x: number
  y: number
}

type GalaxyMap = Map<number, Point>

export const expandUniverse = (input: Universe): Universe => {
  const tempRes = input.flatMap(line =>
    line.includes('#') ? [line] : [line, line],
  )

  return transpose(
    transpose(tempRes.map(l => [...l])).flatMap(line =>
      line.includes('#') ? [line] : [line, line],
    ),
  ).map(line => line.join(''))
}

export const findGalaxies = (universe: Universe): GalaxyMap => {
  const galaxies = new Map<number, Point>()
  let count = 0
  range(0, universe.length - 1).forEach(j =>
    range(0, universe[0].length - 1).forEach(i => {
      if (universe[j][i] === '#') {
        galaxies.set(count++, { x: i, y: j })
      }
    }),
  )
  return galaxies
}

export const shortestPaths = (galaxies: GalaxyMap): Record<string, number> => {
  const res: Record<string, number> = {}

  range(0, galaxies.size - 1).forEach(i => {
    const { x: xA, y: yA } = galaxies.get(i)
    range(i + 1, galaxies.size - 1).forEach(j => {
      const { x: xB, y: yB } = galaxies.get(j)
      res[i + '_' + j] = Math.abs(xB - xA) + Math.abs(yB - yA)
    })
  })

  return res
}

export const sumShortestPaths = (input: Universe): number => {
  const universe = expandUniverse(input)
  const galaxies = findGalaxies(universe)
  const paths = shortestPaths(galaxies)
  return Object.entries(paths)
    .map(([_, value]) => value)
    .reduce((a, b) => a + b)
}

type Expandables = [number[], number[]]

export const findExpandables = (input: Universe): Expandables => {
  const horizontalEmptyLines = input
    .map((line, i) => (line.includes('#') ? null : i))
    .filter(i => i !== null)

  const verticalEmptyLines = transpose(input.map(l => [...l]))
    .map((line, i) => (line.includes('#') ? null : i))
    .filter(i => i !== null)

  return [horizontalEmptyLines, verticalEmptyLines]
}

export const shortestPaths2 = (
  galaxies: GalaxyMap,
  [horizExp, vertExp]: Expandables,
  offset: number,
): Record<string, number> => {
  const res: Record<string, number> = {}

  const hasExpandables = (
    x1: number,
    x2: number,
    expandables: number[],
  ): number =>
    expandables.filter(i => Math.min(x1, x2) < i && i < Math.max(x1, x2)).length

  range(0, galaxies.size - 1).forEach(i => {
    const { x: xA, y: yA } = galaxies.get(i)
    range(i + 1, galaxies.size - 1).forEach(j => {
      const { x: xB, y: yB } = galaxies.get(j)
      const distX =
        Math.abs(xB - xA) + hasExpandables(xB, xA, vertExp) * (offset - 1)
      const distY =
        Math.abs(yB - yA) + hasExpandables(yB, yA, horizExp) * (offset - 1)
      res[i + '_' + j] = distX + distY
    })
  })

  return res
}

export const sumShortestPaths2 = (input: Universe, factor: number): number => {
  const galaxies = findGalaxies(input)
  const expandables = findExpandables(input)
  const paths = shortestPaths2(galaxies, expandables, factor)
  return Object.entries(paths)
    .map(([_, value]) => value)
    .reduce((a, b) => a + b)
}

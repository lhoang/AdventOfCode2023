import { range, transpose } from '../../../utils/array'

type Mirrors = string[][]

export const parseMap = (input: string[]): Mirrors => input.map(l => [...l])

export const findVerticalSymmetry = (mirrors: Mirrors): number => {
  const w = mirrors[0].length
  const lineSymPoints = (points: number[], line: string[]): number[] =>
    points.filter(i => {
      const left = line.slice(0, i)
      const right = line.slice(i)
      const min = Math.min(left.length, right.length)
      const L = left.slice(left.length - min).join('')
      const R = right.slice(0, min).reverse().join('')
      return L === R
    })
  const points = mirrors.reduce(lineSymPoints, range(1, w - 1))

  return points.length ? points[0] : 0
}

export const findHorizontalSymmetry = (mirrors: Mirrors): number =>
  findVerticalSymmetry(transpose(mirrors))

export const sumSymmetryPoints = (input: string[][]): number => {
  const mirrors: Mirrors[] = input.map(parseMap)
  const vertPoints = mirrors.map(findVerticalSymmetry)
  const horizPoints = mirrors.map(findHorizontalSymmetry)

  return (
    vertPoints.reduce((acc, i) => acc + i, 0) +
    horizPoints.reduce((acc, i) => acc + i * 100, 0)
  )
}

export const findSmudge = (points: number[][]): number => {
  const counts = points.flat().reduce<Record<string, number>>((acc, i) => {
    acc[i] ? acc[i]++ : (acc[i] = 1)
    return acc
  }, {})
  return +(
    Object.entries(counts).find(
      ([, count]) => count == points.length - 1,
    )?.[0] ?? 0
  )
}

export const findVerticalSymmetry2 = (mirrors: Mirrors): number => {
  const w = mirrors[0].length
  const lineSymPoints = (points: number[], line: string[]): number[] =>
    points.filter(i => {
      const left = line.slice(0, i)
      const right = line.slice(i)
      const min = Math.min(left.length, right.length)
      const L = left.slice(left.length - min).join('')
      const R = right.slice(0, min).reverse().join('')
      return L === R
    })
  const r = range(1, w - 1)
  const points = mirrors.map(l => lineSymPoints(r, l))

  return findSmudge(points)
}

export const findHorizontalSymmetry2 = (mirrors: Mirrors): number =>
  findVerticalSymmetry2(transpose(mirrors))

export const findSumdgeSymmetry = (mirror: Mirrors): number => {
  const vert = findVerticalSymmetry2(mirror)
  const horiz = findHorizontalSymmetry2(mirror)

  return vert + horiz * 100
}

export const sumSymmetryPointsSmudge = (input: string[][]): number =>
  input
    .map(parseMap)
    .map(findSumdgeSymmetry)
    .reduce((a, b) => a + b)

import {
  readFileAsLines,
  split,
  splitByEmptyLine,
} from '../../../utils/input.js'
import {
  findHorizontalSymmetry,
  findHorizontalSymmetry2,
  findSmudge,
  findSumdgeSymmetry,
  findVerticalSymmetry,
  parseMap,
  sumSymmetryPoints,
  sumSymmetryPointsSmudge,
} from './PointOfIncidence'
import { expect } from 'vitest'
const realInput = readFileAsLines('2023/day13/input.txt')

const input = split`
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.
`

const input2 = split`
#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`

const input3 = split`
...###.##..
###.#...#..
..##.#...#.
..#.#.#..##
...#.....##
...#..#..##
..#.#.#..##
..##.#...#.
###.#...#..
...###.##..
....#..#.##
...#....#..
..##......#
..#.#.#...#
..#..#.##.#
..##......#
##..####...
`

const input4 = split`
#.##...
####...
.##.#.#
.###..#
#..#.##
.###..#
.###..#
`

describe('PointOfIncidence', () => {
  it('should find vertical symmetry', () => {
    expect(findVerticalSymmetry(parseMap(input))).toEqual(5)
  })

  it('should find horizontal symmetry', () => {
    expect(findHorizontalSymmetry(parseMap(input2))).toEqual(4)
  })

  it('should find sum of symmetry points', () => {
    expect(sumSymmetryPoints([input, input2])).toEqual(405)
  })

  it('should find symmetry - edge case', () => {
    expect(findVerticalSymmetry(parseMap(input3))).toEqual(1)
    expect(findHorizontalSymmetry(parseMap(input4))).toEqual(6)
  })

  it('should solve part 1 ⭐️', () => {
    expect(sumSymmetryPoints(splitByEmptyLine(realInput))).toEqual(34889)
  })

  it('should find smudge', () => {
    expect(
      findSmudge([
        [1, 2, 3],
        [2, 3, 4],
        [6, 3, 5],
      ]),
    ).toEqual(2)
    expect(
      findSmudge([
        [1, 6, 3],
        [2, 3, 4],
        [8, 3, 5],
      ]),
    ).toEqual(0)
  })

  it('should find horizontal , part 2', () => {
    expect(findHorizontalSymmetry2(parseMap(input))).toEqual(3)
    expect(findHorizontalSymmetry2(parseMap(input2))).toEqual(1)
  })

  it('should find smudge symmetry score', () => {
    expect(findSumdgeSymmetry(parseMap(input))).toEqual(300)
    expect(findSumdgeSymmetry(parseMap(input2))).toEqual(100)
  })

  it('should solve part 2 ⭐️', () => {
    expect(sumSymmetryPointsSmudge(splitByEmptyLine(realInput))).toEqual(34224)
  })
})

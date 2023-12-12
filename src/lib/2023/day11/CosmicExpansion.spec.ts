import { readFileAsLines, split } from '../../../utils/input.js'
import { expect } from 'vitest'
import {
  expandUniverse,
  findExpandables,
  findGalaxies,
  shortestPaths,
  sumShortestPaths,
  sumShortestPaths2,
} from './CosmicExpansion.js'

const realInput = readFileAsLines('2023/day11/input.txt')

const input = split`
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`

describe('CosmicExpansion', () => {
  it('should expand universe', () => {
    expect(expandUniverse(input)).toEqual(split`
            ....#........
            .........#...
            #............
            .............
            .............
            ........#....
            .#...........
            ............#
            .............
            .............
            .........#...
            #....#.......`)
  })

  it('should find galaxies', () => {
    const galaxies = findGalaxies(expandUniverse(input))
    expect(galaxies.size).toEqual(9)
    expect(galaxies.get(4)).toEqual({ x: 1, y: 6 })
  })

  it('should find shortest paths', () => {
    const universe = expandUniverse(input)
    const galaxies = findGalaxies(universe)

    const res = shortestPaths(galaxies)
    expect(Object.entries(res).length).toEqual(36)
  })

  it('should sum shortest paths', () => {
    expect(sumShortestPaths(input)).toEqual(374)
  })

  it('should solve part 1 ⭐️', () => {
    expect(sumShortestPaths(realInput)).toEqual(9947476)
  })

  it('should find expandables', () => {
    expect(findExpandables(input)).toEqual([
      [3, 7],
      [2, 5, 8],
    ])
  })

  it('should find shortest Paths2', () => {
    expect(sumShortestPaths2(input, 2)).toEqual(374)
    expect(sumShortestPaths2(input, 10)).toEqual(1030)
    expect(sumShortestPaths2(input, 100)).toEqual(8410)
  })

  it('should solve part 12⭐️', () => {
    expect(sumShortestPaths2(realInput, 1e6)).toEqual(519939907614)
  })
})

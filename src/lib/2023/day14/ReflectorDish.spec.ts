import { readFileAsLines, split } from '../../../utils/input.js'
import { expect, it } from 'vitest'
import {
  findRepeatingCycle,
  parseDish,
  rotateLeft,
  rotateRight,
  tilt,
  tiltCycle,
  tiltEast,
  tiltNorth,
  tiltSouth,
  tiltWest,
  titleCycleLoad,
  totalLoad,
} from './ReflectorDish'

const realInput = readFileAsLines('2023/day14/input.txt')

const input = split`
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`

const s = (x: string | TemplateStringsArray): string[] => [...x]
describe('ReflectorDish', () => {
  it('should tilt line', () => {
    expect(tilt(s`O.#..O.#.#`).join('')).toEqual('O.#O...#.#')
    expect(tilt(s`..O..#O..O`).join('')).toEqual('O....#OO..')
    expect(tilt(s`.O.....O#.`).join('')).toEqual('OO......#.')
  })

  it('should rotate', () => {
    expect(rotateLeft(parseDish(input)).map(l => l.join('')))
      .toMatchInlineSnapshot(`
          [
            ".#.O.#O...",
            "....#.....",
            "....O#.O#.",
            "..#...O.#.",
            "#.#..O#.##",
            ".#.O......",
            ".O.#......",
            ".O...#O..O",
            "...OO....O",
            "OO.O.O..##",
          ]
        `)
    expect(rotateRight(parseDish(input)).map(l => l.join('')))
      .toMatchInlineSnapshot(`
          [
            "##..O.O.OO",
            "O....OO...",
            "O..O#...O.",
            "......#.O.",
            "......O.#.",
            "##.#O..#.#",
            ".#.O...#..",
            ".#O.#O....",
            ".....#....",
            "...O#.O.#.",
          ]
        `)
  })

  it('should tilt North', () => {
    expect(tiltNorth(parseDish(input)).map(l => l.join('')))
      .toMatchInlineSnapshot(`
         [
           "OOOO.#.O..",
           "OO..#....#",
           "OO..O##..O",
           "O..#.OO...",
           "........#.",
           "..#....#.#",
           "..O..#.O.O",
           "..O.......",
           "#....###..",
           "#....#....",
         ]
       `)
  })

  it('should tilt west', () => {
    expect(tiltWest(parseDish(input)).map(l => l.join('')))
      .toMatchInlineSnapshot(`
          [
            "O....#....",
            "OOO.#....#",
            ".....##...",
            "OO.#OO....",
            "OO......#.",
            "O.#O...#.#",
            "O....#OO..",
            "O.........",
            "#....###..",
            "#OO..#....",
          ]
        `)
  })

  it('should tilt east', () => {
    expect(tiltEast(parseDish(input)).map(l => l.join('')))
      .toMatchInlineSnapshot(`
          [
            "....O#....",
            ".OOO#....#",
            ".....##...",
            ".OO#....OO",
            "......OO#.",
            ".O#...O#.#",
            "....O#..OO",
            ".........O",
            "#....###..",
            "#..OO#....",
          ]
        `)
  })
  it('should tilt south', () => {
    expect(tiltSouth(parseDish(input)).map(l => l.join('')))
      .toMatchInlineSnapshot(`
          [
            ".....#....",
            "....#....#",
            "...O.##...",
            "...#......",
            "O.O....O#O",
            "O.#..O.#.#",
            "O....#....",
            "OO....OO..",
            "#OO..###..",
            "#OO.O#...O",
          ]
        `)
  })

  it('should get total load', () => {
    expect(totalLoad(tiltNorth(parseDish(input)))).toEqual(136)
  })

  it('should solve part 1 ⭐️', () => {
    expect(totalLoad(tiltNorth(parseDish(realInput)))).toEqual(108792)
  })

  it('should run tilt cycle', () => {
    expect(tiltCycle(parseDish(input), 1).map(l => l.join(''))).toEqual(split`
        .....#....
        ....#...O#
        ...OO##...
        .OO#......
        .....OOO#.
        .O#...O#.#
        ....O#....
        ......OOOO
        #...O###..
        #..OO#....
        `)
    expect(tiltCycle(parseDish(input), 3).map(l => l.join(''))).toEqual(split`
        .....#....
        ....#...O#
        .....##...
        ..O#......
        .....OOO#.
        .O#...O#.#
        ....O#...O
        .......OOO
        #...O###.O
        #.OOO#...O
        `)
  })

  it('should find repeating cycle', () => {
    const arr = [
      87, 69, 69, 69, 65, 64, 65, 63, 68, 69, 69, 65, 64, 65, 63, 68, 69, 69,
      65, 64, 65, 63, 68,
    ]
    const arrIncomplete = [
      87, 69, 69, 69, 65, 64, 65, 63, 68, 69, 69, 65, 64, 65, 63, 68, 69, 69,
      65, 64, 65, 63,
    ]

    expect(findRepeatingCycle(arr)).toEqual([2, 7])
    expect(findRepeatingCycle(arrIncomplete)).toBeNull()
    expect(findRepeatingCycle(arrIncomplete.slice(0, 2))).toBeNull()
  })

  it('should find cyclic loac', () => {
    expect(titleCycleLoad(input, 35)).toEqual(65)
    expect(titleCycleLoad(input, 1e9)).toEqual(64)
  })

  it('should solve part 2 ⭐️', () => {
    expect(titleCycleLoad(realInput, 1e9)).toEqual(99118)
  })
})

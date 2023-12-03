import { readFileAsLines, split } from '../../../utils/input.js'
import {
  addGearRatios,
  findNumbers,
  findPartNumbers,
  getAdjacentSymbols,
} from './GearRatios.js'

const realInput = readFileAsLines('2023/day03/input.txt')

const input = split`
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`

const input2 = split`
........
.24..4..
......*.
`

describe('GearRatios', () => {
  it('should find numbers in map', () => {
    expect(findNumbers(input)).toMatchInlineSnapshot(`
      [
        {
          "length": 3,
          "value": 467,
          "x": 0,
          "y": 0,
        },
        {
          "length": 3,
          "value": 114,
          "x": 5,
          "y": 0,
        },
        {
          "length": 2,
          "value": 35,
          "x": 2,
          "y": 2,
        },
        {
          "length": 3,
          "value": 633,
          "x": 6,
          "y": 2,
        },
        {
          "length": 3,
          "value": 617,
          "x": 0,
          "y": 4,
        },
        {
          "length": 2,
          "value": 58,
          "x": 7,
          "y": 5,
        },
        {
          "length": 3,
          "value": 592,
          "x": 2,
          "y": 6,
        },
        {
          "length": 3,
          "value": 755,
          "x": 6,
          "y": 7,
        },
        {
          "length": 3,
          "value": 664,
          "x": 1,
          "y": 9,
        },
        {
          "length": 3,
          "value": 598,
          "x": 5,
          "y": 9,
        },
      ]
    `)
  })

  it('should get adjacent symbols', () => {
    expect(
      getAdjacentSymbols(
        {
          length: 3,
          value: 467,
          x: 0,
          y: 0,
        },
        input,
      ),
    ).toEqual(['*'])

    expect(
      getAdjacentSymbols(
        {
          length: 4,
          value: 598,
          x: 5,
          y: 9,
        },
        input,
      ),
    ).toEqual(['*'])
  })

  it('should find numbers -  edge case', () => {
    expect(findNumbers(input2)).toMatchInlineSnapshot(`
      [
        {
          "length": 2,
          "value": 24,
          "x": 1,
          "y": 1,
        },
        {
          "length": 1,
          "value": 4,
          "x": 5,
          "y": 1,
        },
      ]
    `)
  })

  it('should find Part Numbers', () => {
    expect(findPartNumbers(input)).toEqual(4361)
    expect(findPartNumbers(input2)).toEqual(4)
  })

  it('should solve part 1 ⭐️', () => {
    expect(findPartNumbers(realInput)).toEqual(537732)
  })

  it('should find gears', () => {
    expect(addGearRatios(input)).toEqual(467835)
  })

  it('should solve part 2 ⭐️', () => {
    expect(addGearRatios(realInput)).toEqual(84883664)
  })
})

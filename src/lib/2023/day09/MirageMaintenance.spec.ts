import { readFileAsLines, split } from '../../../utils/input.js'
import {
  addAllNextValues,
  addAllPreviousValues,
  findNextValue,
  findPreviousValue,
  parseLine,
} from './MirageMaintenance.js'
import { expect } from 'vitest'
const realInput = readFileAsLines('2023/day09/input.txt')

const input = split`
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`

describe('MirageMaintenance', () => {
  it('should find next value', () => {
    const line = parseLine(input[2])
    expect(findNextValue(line)).toEqual(68)
  })

  it('should sum extrapolated values', () => {
    expect(addAllNextValues(input)).toEqual(114)
  })

  it('should solve part 1 ⭐️', () => {
    expect(addAllNextValues(realInput)).toEqual(2174807968)
  })

  it('should find previous value', () => {
    const line = parseLine(input[2])
    expect(findPreviousValue(line)).toEqual(5)
  })

  it('should solve part 2 ⭐️', () => {
    expect(addAllPreviousValues(realInput)).toEqual(1208)
  })
})

import { readFileAsLines, split } from '../../../utils/input.js'
import {
  countAllRecords,
  countRecords,
  parseBoats,
  parseSingleRace,
} from './Boats.js'
import { expect } from 'vitest'
const realInput = readFileAsLines('2023/day06/input.txt')

const input = split`
Time:      7  15   30
Distance:  9  40  200
`

describe('Boats', () => {
  it('should parse boats', () => {
    expect(parseBoats(input)).toEqual([
      [7, 9],
      [15, 40],
      [30, 200],
    ])
  })

  it('should count records', () => {
    expect(countRecords([7, 9])).toEqual(4)
  })

  it('should count all records and multiply', () => {
    expect(countAllRecords(input)).toEqual(288)
  })

  it('should solve part 1 ⭐️', () => {
    expect(countAllRecords(realInput)).toEqual(170000)
  })

  it('should count records for single race', () => {
    const boat = parseSingleRace(input)
    expect(boat).toEqual([71530, 940200])
    expect(countRecords(boat)).toEqual(71503)
  })

  it('should solve part 2 ⭐️', () => {
    const boat = parseSingleRace(realInput)
    expect(countRecords(boat)).toEqual(20537782)
  })
})

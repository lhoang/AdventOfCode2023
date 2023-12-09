import { readFileAsLines, split } from '../../../utils/input.js'
import {
  countGhostSteps,
  countSteps,
  parseMovingInstructions,
} from './HauntedWasteland.js'
import { expect } from 'vitest'

const realInput = readFileAsLines('2023/day08/input.txt')

const input = split`
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`

const input2 = split`
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`

const input3 = split`
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`

describe('HauntedWasteland', () => {
  it('should parse instructions', () => {
    const res = parseMovingInstructions(input)
    expect(res.moves).toEqual('RL')
    expect(res.network['CCC']).toEqual(['ZZZ', 'GGG'])
  })

  it('should count steps', () => {
    expect(countSteps(input)).toEqual(2)
    expect(countSteps(input2)).toEqual(6)
  })

  it('should solve part 1 ⭐️', () => {
    expect(countSteps(realInput)).toEqual(20569)
  })

  it('should count ghost steps', () => {
    expect(countGhostSteps(input3)).toEqual(6)
  })

  it('should solve part 2 ⭐️', () => {
    expect(countGhostSteps(realInput)).toEqual(21366921060721)
  })
})

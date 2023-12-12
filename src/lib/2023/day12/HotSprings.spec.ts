import { readFileAsLines, split } from '../../../utils/input.js'
import { expect } from 'vitest'
import {
  canValidate,
  countPossibilities,
  countPossibleArrangementsBrutForce,
  countPossibleArrangementsUnfolded,
  genPossibilities,
  parseOnsen,
  unfoldOnsen,
  validate,
} from './HotSprings.js'
const realInput = readFileAsLines('2023/day12/input.txt')

const input = split`
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`

describe('HotSprings', () => {
  it('should validate expression', () => {
    expect(validate('#.#.###', '1,1,3')).toBeTruthy()
    expect(validate('.#...#....###.', '1,1,3')).toBeTruthy()
    expect(validate('.#.###.#.######', '1,3,1,6')).toBeTruthy()
  })

  it('should generate all possibilities', () => {
    expect(genPossibilities('?###???.?').length).toEqual(32)
  })

  it('should count possible arrangements', () => {
    expect(countPossibleArrangementsBrutForce(input)).toEqual(21)
  })

  it('should solve part 1 ⭐️', () => {
    expect(countPossibleArrangementsBrutForce(realInput)).toEqual(7110)
  })

  it('should indicate if string can validate', () => {
    expect(canValidate('.??..??...?##.', '1,1,3')).toEqual(4)
  })

  it('should count possibilities', () => {
    const [str, damaged] = parseOnsen(input[1])
    expect(countPossibilities(str, damaged)).toEqual(4)
    const all = input
      .map(parseOnsen)
      .map(([str, dam]) => countPossibilities(str, dam))
    expect(all).toEqual([1, 4, 1, 1, 4, 10])
  })

  it('should count possibilities of unfold onsen', () => {
    const [str, damaged] = unfoldOnsen(input[1])
    expect(countPossibilities(str, damaged)).toEqual(16384)
    expect(countPossibleArrangementsUnfolded(input)).toEqual(525152)
  })

  it('should count - edge cases', () => {
    const [str, damaged] = unfoldOnsen('.??????#???#??????? 2,7,1,1')
    expect(countPossibilities(str, damaged)).toEqual(11327940700)
  })

  it('should solve part 2 ⭐️', () => {
    expect(countPossibleArrangementsUnfolded(realInput)).toEqual(1566786613613)
  })
})

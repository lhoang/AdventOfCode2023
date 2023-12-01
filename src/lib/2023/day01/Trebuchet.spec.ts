import { readFileAsLines, split } from '../../../utils/input.js'
import { calibrate, realCalibrate, transformNumbers } from './Trebuchet.js'
const realInput = readFileAsLines('2023/day01/input.txt')

const input = split`
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`

const input2 = split`
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`

describe('Trebuchet', () => {
  it('should calibrate', () => {
    expect(calibrate(input)).toEqual(142)
  })

  it('should get part 1', () => {
    expect(calibrate(realInput)).toEqual(54601)
  })

  it('should parse spelled numbers', () => {
    expect(input2.map(transformNumbers)).toMatchInlineSnapshot(`
      [
        "2o19e",
        "8two3e",
        "abc1e23exyz",
        "x2one34r",
        "49e8t7n2",
        "z1eight234",
        "7pqrst6xteen",
      ]
    `)
  })

  it('should really calibrate ', () => {
    expect(realCalibrate(input2)).toEqual(281)
  })

  it('should get part 2', () => {
    expect(realCalibrate(realInput)).toEqual(54078)
  })
})

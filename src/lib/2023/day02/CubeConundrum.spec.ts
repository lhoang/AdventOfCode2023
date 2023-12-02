import { readFileAsLines, split } from '../../../utils/input.js'
import {
  addIdsOfPossibleGames,
  addPowerOfGames,
  findPossibleGames,
  getPower,
  parseGame,
} from './CubeConundrum.js'

const realInput = readFileAsLines('2023/day02/input.txt')

const input = split`
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`

describe('CubeConundrum', () => {
  it('should parse Game', () => {
    expect(parseGame(input[0])).toEqual({ id: 1, r: 4, g: 2, b: 6 })
  })

  it('should find possible Games', () => {
    const ids = findPossibleGames({ r: 12, g: 13, b: 14 }, input).map(g => g.id)
    expect(ids).toEqual([1, 2, 5])

    expect(addIdsOfPossibleGames({ r: 12, g: 13, b: 14 }, input)).toEqual(8)
  })

  it('should get part 1 ⭐️', () => {
    expect(addIdsOfPossibleGames({ r: 12, g: 13, b: 14 }, realInput)).toEqual(
      2278,
    )
  })
  it('should find power of game', () => {
    const res = input.map(parseGame).map(getPower)
    expect(res).toEqual([48, 12, 1560, 630, 36])
  })

  it('should get part 2 ⭐️⭐️', () => {
    expect(addPowerOfGames(realInput)).toEqual(67953)
  })
})

import { readFileAsLines, split } from '../../../utils/input.js'
import {
  cardSort,
  cardSort2,
  getType,
  JokerCard,
  parseCards,
  toJokerCard,
  totalWinnings,
  totalWinnings2,
} from './CamelCards.js'
import { expect } from 'vitest'

const realInput = readFileAsLines('2023/day07/input.txt')

const input = split`
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`

describe('CamelCards', () => {
  it('should detect card types', () => {
    expect(getType('AAAAA')).toEqual(0)
    expect(getType('AAAA1')).toEqual(1)
    expect(getType('AAA11')).toEqual(2)
    expect(getType('AA11A')).toEqual(2)
    expect(getType('TTAAA')).toEqual(2)
    expect(getType('1AAA3')).toEqual(3)
    expect(getType('AA233')).toEqual(4)
    expect(getType('45331')).toEqual(5)
    expect(getType('23456')).toEqual(6)
  })

  it('should sort cards', () => {
    const cards = parseCards(input)
      .sort(([a], [b]) => cardSort(a, b))
      .reverse()
    expect(cards).toMatchInlineSnapshot(`
      [
        [
          "32T3K",
          765,
        ],
        [
          "KTJJT",
          220,
        ],
        [
          "KK677",
          28,
        ],
        [
          "T55J5",
          684,
        ],
        [
          "QQQJA",
          483,
        ],
      ]
    `)
  })

  it('should compute total winnings', () => {
    expect(totalWinnings(input)).toEqual(6440)
  })

  it('should solve part 1 ⭐️', () => {
    expect(totalWinnings(realInput)).toEqual(248105065)
  })

  it('should transform to Joker Card', () => {
    expect(toJokerCard('KTJJT').best).toEqual('KTTTT')
    expect(toJokerCard('QQQJA').best).toEqual('QQQAQ')
    expect(toJokerCard('22AAJ').best).toEqual('22AAA')
    expect(toJokerCard('AA22J').best).toEqual('AA22A')
    expect(toJokerCard('4433J').best).toEqual('44334')
    expect(toJokerCard('2345J').best).toEqual('23455')
  })

  it('should sort cards with new rules', () => {
    const cards = parseCards(input)
      .map(([card, bid]) => [toJokerCard(card), bid] as [JokerCard, number])
      .sort(([a], [b]) => cardSort2(a, b))
      .reverse()
    expect(cards).toMatchInlineSnapshot(`
      [
        [
          {
            "best": "32T3K",
            "original": "32T3K",
            "type": 5,
          },
          765,
        ],
        [
          {
            "best": "KK677",
            "original": "KK677",
            "type": 4,
          },
          28,
        ],
        [
          {
            "best": "T5555",
            "original": "T55J5",
            "type": 1,
          },
          684,
        ],
        [
          {
            "best": "QQQAQ",
            "original": "QQQJA",
            "type": 1,
          },
          483,
        ],
        [
          {
            "best": "KTTTT",
            "original": "KTJJT",
            "type": 1,
          },
          220,
        ],
      ]
    `)
  })

  it('should compute new total winning', () => {
    expect(totalWinnings2(input)).toEqual(5905)
  })

  it('should solve part 2 ⭐️', () => {
    expect(totalWinnings2(realInput)).toEqual(249515436)
  })
})

import { range } from '../../../utils/array.js'

export interface Card {
  id: number
  winning: number[]
  numbers: number[]
}

const parse = /Card\s+(?<id>\d+): (?<winningStr>[ \d]+) \| (?<numStr>[ \d]+)$/
export const parseCard = (line: string): Card => {
  const { groups: { id, winningStr, numStr } = {} } = parse.exec(line)
  const split = (s: string): number[] =>
    s.split(/\s+/).filter(Boolean).map(Number)

  const winning = split(winningStr)
  const numbers = split(numStr)

  return { id: +id, winning, numbers }
}

export const countWinningNumbers = ({ winning, numbers }: Card): number =>
  numbers.filter(i => winning.includes(i)).length

export const countPoints = (card: Card): number => {
  const found = countWinningNumbers(card) - 1
  return found >= 0 ? 2 ** found : 0
}

export const addCardPoints = (input: string[]) => {
  return input
    .map(parseCard)
    .map(countPoints)
    .reduce((a, b) => a + b)
}

export const countCard = (input: string[]) => {
  const cards = input.map(parseCard)
  const cardRef: Record<number, number> = Object.fromEntries(
    cards.map(card => [card.id, 1]),
  )

  cards.map(card => {
    const wins = countWinningNumbers(card)
    const newCards = range(card.id + 1, card.id + wins)
    const mult = cardRef[card.id]
    newCards.forEach(i => {
      if (cardRef[i]) {
        cardRef[i] += mult
      } else {
        cardRef[i] = mult
      }
    })
  })

  return Object.entries(cardRef).reduce((acc, i) => acc + i[1], 0)
}

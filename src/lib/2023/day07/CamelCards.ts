type Card = string

const cardTypes = [
  'FiveKind',
  'FourKind',
  'Full',
  'ThreeKind',
  'TwoPairs',
  'OnePair',
  'HighCard',
]
const cardOrder = 'AKQJT98765432'
const newCardOrder = 'AKQT98765432J'

type CardBid = [string, number]
export interface JokerCard {
  original: string
  best: string
  type: number
}

export const parseCards = (input: string[]): CardBid[] =>
  input.map(s => {
    const [card, bid] = s.split(' ')
    return [card, +bid]
  })

export const getType = (unsortedCard: Card): number => {
  const card = [...unsortedCard].sort().join('')
  let typeName = 'HighCard'
  if (/(.)\1\1\1\1/.test(card)) {
    typeName = 'FiveKind'
  } else if (/(.)\1\1\1/.test(card)) {
    typeName = 'FourKind'
  } else if (/(.)\1\1(.)\2/.test(card) || /(.)\1(.)\2\2/.test(card)) {
    typeName = 'Full'
  } else if (/(.)\1\1/.test(card)) {
    typeName = 'ThreeKind'
  } else if (/(.)\1.?(.)\2/.test(card)) {
    typeName = 'TwoPairs'
  } else if (/(.)\1/.test(card)) {
    typeName = 'OnePair'
  }
  return cardTypes.indexOf(typeName)
}

export const cardSort = (a: Card, b: Card): number => {
  const typeA = getType(a)
  const typeB = getType(b)
  if (typeA !== typeB) {
    return typeA - typeB
  } else {
    let order = 0
    let i = 0
    while (order === 0 && i < 5) {
      order = cardOrder.indexOf(a[i]) - cardOrder.indexOf(b[i])
      i++
    }
    return order
  }
}

export const totalWinnings = (input: string[]): number =>
  parseCards(input)
    .sort(([a], [b]) => cardSort(a, b))
    .reverse()
    .reduce((acc, [_, bid], i) => acc + (i + 1) * bid, 0)

export const toJokerCard = (card: Card): JokerCard => {
  const Js = card.replace(/[^J]/g, '').length
  const remaining = card.replace(/J/g, '')

  const allPossibilities = [...'AKQT98765432']
    .map(c => remaining + c.repeat(Js))
    .map(s => ({
      original: card,
      best: s,
      type: getType(s),
    }))
    .sort((a, b) => a.type - b.type)

  return allPossibilities[0]
}

export const cardSort2 = (a: JokerCard, b: JokerCard): number => {
  const { type: typeA, original: originalA } = a
  const { type: typeB, original: originalB } = b
  if (typeA !== typeB) {
    return typeA - typeB
  } else {
    let order = 0
    let i = 0
    while (order === 0 && i < 5) {
      order =
        newCardOrder.indexOf(originalA[i]) - newCardOrder.indexOf(originalB[i])
      i++
    }
    return order
  }
}

export const totalWinnings2 = (input: string[]): number =>
  parseCards(input)
    .map(([card, bid]) => [toJokerCard(card), bid] as [JokerCard, number])
    .sort(([a], [b]) => cardSort2(a, b))
    .reverse()
    .reduce((acc, [_, bid], i) => acc + (i + 1) * bid, 0)

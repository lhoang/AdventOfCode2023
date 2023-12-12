export const validate = (s: string, expr: string): boolean =>
  s
    .split(/\./)
    .filter(Boolean)
    .map(i => i.length)
    .join(',') === expr

export const parseOnsen = (s: string): [string, string] => {
  const [a, b] = s.split(' ')
  return [a, b]
}

export const genPossibilities = (s: string): string[] => {
  const t = [...s].reduce(
    (acc, i) => {
      if (i === '?') {
        return acc.flatMap<string[]>(x => [[x + '#'], [x + '.']])
      } else {
        return acc.map(x => x + i)
      }
    },
    [''],
  )

  return t.flat()
}

export const countPossibleArrangementsBrutForce = (input: string[]): number => {
  const possibilities = input
    .map(parseOnsen)
    .map(
      ([s, expr]) => genPossibilities(s).filter(i => validate(i, expr)).length,
    )
  return possibilities.reduce((a, b) => a + b)
}

const cache = new Map<string, number>()

export const countPossibilities = (str: string, expr: string): number => {
  const damaged = expr.split(',').map(Number)
  const getKey = (s: string, damaged: number[]): string =>
    `${s};${damaged.join(',')}`
  const countRec = (s: string, dam: number[]): number => {
    const key = getKey(s, dam)

    if (cache.has(key)) {
      return cache.get(key)
    }

    // Exit condition 1 : no more string
    if (s.length === 0) {
      const res = dam.length === 0 ? 1 : 0
      cache.set(key, res)
      return res
    }

    // Exit condition 2 : no more damaged
    if (dam.length === 0) {
      const res = s.includes('#') ? 0 : 1
      cache.set(key, res)
      return res
    }

    // Exit condition 3 : not enough string
    if (dam.reduce((a, b) => a + b) + dam.length - 1 > s.length) {
      cache.set(key, 0)
      return 0
    }

    const head = s[0]
    if (head === '.') {
      // continue
      const res = countRec(s.slice(1), dam)
      cache.set(key, res)
      return res
    }

    if (head === '#') {
      const currentDam = dam[0]
      if (s.slice(0, currentDam).includes('.') || s[currentDam] === '#') {
        cache.set(key, 0)
        return 0
      }
      const res = countRec(s.slice(currentDam + 1), dam.slice(1))
      cache.set(key, res)
      return res
    }

    // case '?' : 2 possibilities
    const res =
      countRec('.' + s.slice(1), dam) + countRec('#' + s.slice(1), dam)
    cache.set(key, res)
    return res
  }

  return countRec(str, damaged)
}

export const unfoldOnsen = (input: string) => {
  const [str, dam] = parseOnsen(input)
  return [Array(5).fill(str).join('?'), Array(5).fill(dam).join(',')]
}

export const countPossibleArrangementsUnfolded = (input: string[]): number =>
  input
    .map(unfoldOnsen)
    .map(([str, dam]) => {
      return countPossibilities(str, dam)
    })
    .reduce((a, b) => a + b)

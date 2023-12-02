export interface Config {
  r: number
  g: number
  b: number
}

export interface Game extends Config {
  id: number
}

export const parseGame = (s: string = ''): Game => {
  const [game = '', subsets = ''] = s.split(': ')
  const id = +game.split(' ')[1]
  const {
    red: r,
    blue: b,
    green: g,
  } = subsets
    .split('; ')
    .flatMap(set => set.split(', ').map(cube => cube.split(' ')))
    .reduce(
      (acc, [n, color]) => {
        const found = acc[color]
        if (!found || found < +n) {
          acc[color] = +n
        }
        return acc
      },
      {} as Record<string, number>,
    )
  return { id, r, g, b }
}

export const findPossibleGames = (config: Config, input: string[]): Game[] =>
  input
    .map(parseGame)
    .filter(({ r, g, b }) => r <= config.r && g <= config.g && b <= config.b)

export const addIdsOfPossibleGames = (
  config: Config,
  input: string[],
): number => findPossibleGames(config, input).reduce((a, b) => a + b.id, 0)

export const getPower = ({ r, b, g }: Game) => r * g * b

export const addPowerOfGames = (input: string[]): number =>
  input
    .map(parseGame)
    .map(getPower)
    .reduce((a, b) => a + b)

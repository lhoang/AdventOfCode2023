import { splitByEmptyLine } from '../../../utils/input.js'
import { lcm } from '../../../utils/math.js'

export type Node = [string, string]

export interface Instructions {
  moves: string
  network: Record<string, Node>
}

const parse = /(?<name>.{3}) = \((?<left>.{3}), (?<right>.{3})\)/
export const parseMovingInstructions = (input: string[]): Instructions => {
  const [moves, lines] = splitByEmptyLine(input)

  return {
    moves: moves[0],
    network: Object.fromEntries(
      lines.map(line => {
        const { groups: { name = '', left = '', right = '' } = {} } =
          parse.exec(line) ?? {}
        return [name, [left, right]]
      }),
    ),
  }
}

export const countSteps = (input: string[]): number => {
  const { moves, network } = parseMovingInstructions(input)

  let index = 0
  let currentStep = 'AAA'
  while (currentStep !== 'ZZZ') {
    const move = moves[index % moves.length]
    currentStep =
      move === 'L' ? network[currentStep][0] : network[currentStep][1]
    index++
  }
  return index
}

export const countGhostSteps = (input: string[]): number => {
  const { moves, network } = parseMovingInstructions(input)

  const starts = Object.entries(network)
    .map(([name]) => name)
    .filter(name => name.endsWith('A'))

  const count = (start: string): number => {
    let index = 0
    let currentStep = start
    while (!currentStep.endsWith('Z')) {
      const move = moves[index % moves.length]
      currentStep =
        move === 'L' ? network[currentStep][0] : network[currentStep][1]
      index++
    }
    return index
  }

  const counts = starts.map(count)
  return counts.reduce(lcm)
}

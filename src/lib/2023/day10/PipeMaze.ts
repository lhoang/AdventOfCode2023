import { range } from '../../../utils/array.js'

type Maze = string[]

export interface Point {
  x: number
  y: number
}

export interface Pipe extends Point {
  value: string
  order: number
}

export const findStart = (input: Maze): Pipe => {
  let x = -1
  const y = range(0, input.length - 1).find(j => {
    x = input[j].indexOf('S')
    return x !== -1
  })
  return {
    x,
    y,
    value: 'S',
    order: 0,
  }
}

export const getId = ({ x, y }: Pipe): string => [x, y].join('_')

export const findValidPipes = (
  { x, y, value, order }: Pipe,
  maze: Maze,
  existingPipes: Map<string, number>,
) => {
  const xMax = maze[0].length - 1
  const yMax = maze.length - 1

  const neighbours: Pipe[] = []
  // top
  if ('S|LJ'.includes(value) && y > 0 && '|F7'.includes(maze[y - 1][x])) {
    neighbours.push({
      x,
      y: y - 1,
      value: maze[y - 1][x],
      order: order + 1,
    })
  }

  // bottom
  if ('S|F7'.includes(value) && y < yMax && '|LJ'.includes(maze[y + 1][x])) {
    neighbours.push({
      x,
      y: y + 1,
      value: maze[y + 1][x],
      order: order + 1,
    })
  }

  // left
  if ('S-J7'.includes(value) && x > 0 && '-LF'.includes(maze[y][x - 1])) {
    neighbours.push({
      x: x - 1,
      y,
      value: maze[y][x - 1],
      order: order + 1,
    })
  }

  // right
  if ('S-FL'.includes(value) && x < xMax && '-J7'.includes(maze[y][x + 1])) {
    neighbours.push({
      x: x + 1,
      y,
      value: maze[y][x + 1],
      order: order + 1,
    })
  }

  return neighbours.filter(p => !existingPipes.has(getId(p)))
}

export const buildLoop = (maze: Maze): Map<string, number> => {
  const foundPipes = new Map<string, number>()
  const start = findStart(maze)
  foundPipes.set(getId(start), start.order)

  let currentPipes: Pipe[] = [start]
  while (currentPipes.length) {
    const validPipes = currentPipes.flatMap(current =>
      findValidPipes(current, maze, foundPipes),
    )
    validPipes.forEach(p => foundPipes.set(getId(p), p.order))
    currentPipes = validPipes
  }

  return foundPipes
}

const getKey = (x: number, y: number): string => [x, y].join('_')

export const findEnclosedTitles = (
  maze: Maze,
  loop: Map<string, number>,
): Set<string> => {
  const enclosed = new Set<string>()

  range(0, maze.length - 2).map(j => {
    let walls = 0
    let prev: string = undefined
    range(0, maze[0].length - 2).forEach(i => {
      const isPipe = loop.get(getKey(i, j)) !== undefined
      const current = maze[j][i]
      if (isPipe) {
        if ('FL'.includes(current)) {
          walls++
          prev = current
        } else if (current === 'J') {
          if ('L'.includes(prev)) {
            walls++
          }
          prev = current
        } else if (current === '7') {
          if ('F'.includes(prev)) {
            walls++
          }
          prev = current
        } else if ('S|'.includes(current)) {
          walls++
          prev = current
        }
      } else {
        if (walls % 2 == 1) {
          enclosed.add(getKey(i, j))
        }
      }
    })
  })
  return enclosed
}

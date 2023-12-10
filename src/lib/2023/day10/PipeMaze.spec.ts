import { readFileAsLines, split } from '../../../utils/input.js'
import { expect } from 'vitest'
import {
  buildLoop,
  findEnclosedTitles,
  findStart,
  findValidPipes,
  getId,
} from './PipeMaze.js'
const realInput = readFileAsLines('2023/day10/input.txt')

const input = split`
-L|F7
7S-7|
L|7||
-L-J|
L|-JF
`

const input2 = split`
7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ
`

const input3 = split`
..........
.S------7.
.|F----7|.
.||OOOO||.
.||OOOO||.
.|L-7F-J|.
.|II||II|.
.L--JL--J.
..........
`

describe('PipeMaze', () => {
  it('should find start', () => {
    expect(findStart(input)).toEqual({
      x: 1,
      y: 1,
      value: 'S',
      order: 0,
    })
  })

  it('should find valid neighbouring pipes', () => {
    const foundPipes = new Map<string, number>()
    const pipeS = { x: 1, y: 1, value: 'S', order: 0 }
    const validPipes = findValidPipes(pipeS, input, foundPipes)
    expect(validPipes).toEqual([
      {
        order: 1,
        value: '|',
        x: 1,
        y: 2,
      },
      {
        order: 1,
        value: '-',
        x: 2,
        y: 1,
      },
    ])
    validPipes.forEach(p => foundPipes.set(getId(p), p.order))
    const validPipes2 = findValidPipes(validPipes[0], input, foundPipes)
    expect(validPipes2).toEqual([
      {
        order: 2,
        value: 'L',
        x: 1,
        y: 3,
      },
    ])
  })

  it('should build the loop', () => {
    const loop = buildLoop(input)
    expect(loop.size).toEqual(8)
    expect(loop.get('3_3')).toEqual(4)

    const loop2 = buildLoop(input2)
    expect(loop2.size).toEqual(16)
    expect(loop2.get('4_2')).toEqual(8)
  })

  it('should solve part 1 ⭐️', () => {
    const loop = buildLoop(realInput)
    expect(loop.size / 2).toEqual(6599)
  })

  it('should find enclosed titles', () => {
    const loop = buildLoop(input3)
    const titles = [...findEnclosedTitles(input3, loop)]
    expect(titles).toEqual(['2_6', '3_6', '6_6', '7_6'])
  })

  it('should solve part 2 ⭐️', () => {
    const loop = buildLoop(realInput)
    const enclosed = findEnclosedTitles(realInput, loop)
    expect(enclosed.size).toEqual(477)
  })
})

import fs from 'node:fs'
import path from 'node:path'
import dedent from 'dedent-js'

/**
 * Read file as array of lines
 * @param filename path from src/
 */
export function readFileAsLines(filename: string): Array<string> {
  return readFile(filename).replace(/\n$/, '').split('\n')
}

/**
 * Read file as simple string
 * @param filename path from src/
 */
export function readFile(filename: string): string {
  const __dirname = path.dirname(new URL(import.meta.url).pathname)
  return fs.readFileSync(path.resolve(__dirname, '../lib', filename), {
    encoding: 'utf-8',
  })
}

/**
 * Read file as simple string
 * @param filename path from src/
 */
export function readFileAsNumArray(filename: string): number[] {
  return readFile(filename)
    .split(',')
    .map(i => +i)
}

/**
 * Split template string into string array (removes indentation).
 * Useful to copy paste examples from description.
 * @param str template string
 */
export function split(str: string | TemplateStringsArray): Array<string> {
  return dedent(str).split('\n')
}

export function splitByEmptyLine(arr: Array<string>): Array<Array<string>> {
  return arr
    .reduce(
      (acc, line) => {
        if (line === '') {
          acc.push([])
        } else {
          acc?.[acc.length - 1]?.push(line)
        }
        return acc
      },
      [[] as string[]],
    )
    .filter(d => d.length)
}

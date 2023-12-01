export const calibrate = (lines: string[]): number => {
  return lines
    .map(line => line.replaceAll(/[a-z]/g, ''))
    .map(line => +((line.at(0) ?? '') + (line?.at(-1) ?? '')))
    .reduce((a, b) => a + b)
}

const digits = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]
const regex = new RegExp(digits.join('|'), 'g')
export const transformNumbers = (line: string): string => {
  return line.replaceAll(
    regex,
    found => String(digits.indexOf(found) + 1) + found.at(-1),
  )
}

export const realCalibrate = (lines: string[]): number =>
  // Apply transform twice for overlapping numbers
  calibrate(lines.map(transformNumbers).map(transformNumbers))

# Advent of Code 2023

https://adventofcode.com/

## Stack

- Node 21
- pnpm (npm compatible)
- Typescript
- Vitest

## Install

```shell
pnpm i

# Install zx for the input fetching script
pnpm i -g zx
chmod +x createDay.mjs
```

Create a `cookie.mjs` with your http cookie.
ex:

```ts
export const cookie = 'session=mycookie'
```

## Fetch input and create new file for a daily challenge

```shell
./createDay.mjs
```

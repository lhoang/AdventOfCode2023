<script lang="ts">
  import { readFileAsLines } from "../../utils/input.js";
  import { buildLoop, findEnclosedTitles, getId } from "$lib/2023/day10/PipeMaze.js";
  import { range } from "../../utils/array.js";

  const input = readFileAsLines("2023/day10/input.txt");

  const loop = buildLoop(input)
  const enclosed = findEnclosedTitles(input, loop)
  const maze = range(0, input.length - 2).map(j =>
    range(0, input[0].length - 2).map(i => {
      const found = loop.get(i+'_'+j)

      return found !== undefined ?
        {
          value: input[j][i]
            .replace('F', '▛')
            .replace('J', '▟')
            .replace('|', '▐')
            .replace('-', '▃')
            .replace('7', '▜')
            .replace('L', '▙')
          ,
          loop: true,
          enclosed: false
        }:
        {
          value: input[j][i],
          loop: false,
          enclosed: enclosed.has(i+'_'+j)
        }

    })
  )


</script>

<h1>Advent of Code 2023 - Day 10 : Pipe Maze</h1>

<div class="maze">
  {#each maze as line}
    <div class="row">
      {#each line as { value, loop, enclosed}}
        <div class="cell" class:loop class:enclosed>{value}</div>
      {/each}
    </div>
  {/each}

</div>


<style>
    .maze {
        display: grid;
        grid-auto-flow: row;

        font-size: 13px;
    }

    .row {
        display: grid;
        grid-template-columns: repeat( 140, 1fr );
    }

    .cell.loop {
        background-color: lightblue;
    }
    .cell.enclosed {
        background-color: red;
    }
</style>

<template>
<div>
  <div v-if="gameOver()">Game over!</div>
  <div>{{message}}</div>
 <table>
  <tr v-for="(row, rowindex) in grid.row" :key="rowindex">
  <td v-for="(cell, colindex) in row.cell" :key="colindex" @click="toggleCell(rowindex, colindex)">
    <span class="field">{{content(rowindex, colindex)}}</span>
  </td>
 </tr>
</table>
</div>
</template>

<script>
import GameEngine from './GameEngine';
import { Cell } from './Grid';
var engine = new GameEngine();
export default {
  name: 'HelloWorld',
  data() {
    return {
      message: "Let's play Tic Tac Toe!",
      grid: engine.grid,
      gameOver: function() {
        return engine.gameOver;
      },
      content: function(rowindex, colindex) {
        let cell = engine.grid.row[rowindex].cell[colindex];
        if (cell === Cell.EMPTY) return '';
        if (cell === Cell.X) return 'X';
        return 'O';
      }
    };
  },
  methods: {
    toggleCell: function(rowindex, colindex) {
      this.message = engine.toggleCell(rowindex, colindex);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  border-collapse: collapse;
}

table td,
table th {
  border: 5px solid darkgreen;
  width: 130px;
  height: 130px;
  text-align: center;
}

.field {
  font-size: 72pt;
}

tr:first-child th,
tr:first-child td {
  border-top: 0;
}

tr:last-child td {
  border-bottom: 0;
}

tr td:first-child,
tr th:first-child {
  border-left: 0;
}

tr td:last-child,
tr th:last-child {
  border-right: 0;
}
</style>

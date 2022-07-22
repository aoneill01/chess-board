<template>
  <main>
    <Players :game="game" />
    <Board :position="positions[positionIndex]" />
    <div class="game-description" v-if="game">
      <div>{{ details.dateAsString() }}</div>
      <div class="result">{{ details.result() }}</div>
    </div>
  </main>
</template>

<script>
import { positionsForPgn } from "./helpers/positionHelpers";
import { getRandomGMGame } from "./helpers/chessComClient";
import Board from "./components/Board";
import Players from "./components/Players";

export default {
  data() {
    return {
      positions: [],
      positionIndex: 0,
      intervalId: null,
      game: null,
      details: null,
    };
  },
  components: {
    Board,
    Players,
  },
  methods: {
    async newGame() {
      this.game = await getRandomGMGame();
      const { positions, details } = positionsForPgn(this.game.pgn);
      this.positions = positions;
      this.details = details;

      this.intervalId = setInterval(() => {
        if (this.positionIndex < this.positions.length - 1) {
          this.positionIndex++;
        } else {
          clearInterval(this.intervalId);
          this.positions = [];
          this.positionIndex = 0;
          this.game = null;
          this.details = null;
          this.newGame();
        }
      }, 1000);
    },
  },
  async created() {
    await this.newGame();
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  display: block;
  margin: 10px auto 0 auto;
  width: max(min(calc(100vw - 20px), calc(100vh - 105px)), 400px);
}

.game-description {
  margin-top: 8px;
  justify-content: center;
  display: flex;
  font-size: 20px;
  gap: 16px;
}

.result {
  font-weight: bold;
}

@media only screen and (max-width: 667px) {
  .game-description {
    margin-top: 4px;
    font-size: 14px;
  }
}
</style>
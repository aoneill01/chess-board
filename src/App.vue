<template>
  <main>
    <Players :game="game" />
    <Board :pgn="pgn" @complete="newGame" />
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
      pgn: null,
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
      try {
        this.game = await getRandomGMGame();
        const { details } = positionsForPgn(this.game.pgn);
        this.pgn = this.game.pgn;
        this.details = details;
      } catch {
        this.newGame();
      }
    },
  },
  async created() {
    await this.newGame();
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
  width: min(calc(100vw - 20px), calc(100vh - 105px));
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

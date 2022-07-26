<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100" height="100" fill="#779952" rx=".8" />
    <rect x="1.5" y="1.5" width="97" height="97" fill="#edeed1" rx=".6" />
    <rect
      v-for="square in squares"
      :key="square.row * 8 + square.col"
      :x="2.1 + 12 * (square.col - 1)"
      :y="2.1 + 12 * (square.row - 1)"
      :width="11.8"
      :height="11.8"
      :fill="square.isWhite ? lightColor : darkColor"
      rx=".5"
    />
    <text
      v-for="(col, i) of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']"
      :key="col"
      :fill="i % 2 === 0 ? lightColor : darkColor"
      :x="11.5 + 12 * i"
      y="97"
      font-size="3px"
    >
      {{ col }}
    </text>
    <text
      v-for="(row, i) of ['1', '2', '3', '4', '5', '6', '7', '8'].reverse()"
      :key="'sq' + row"
      :fill="i % 2 === 0 ? darkColor : lightColor"
      :y="5 + 12 * i"
      x="2.5"
      font-size="3px"
    >
      {{ row }}
    </text>

    <Piece
      v-for="{ square, piece, key } of pieces"
      :piece="piece"
      :position="square"
      :key="key"
      ref="pRef"
    />
  </svg>
</template>

<script>
import Piece from "./pieces/Piece.vue";
import { componentForPiece, animateGame } from "../helpers/positionHelpers";

export default {
  props: ["pgn", "onComplete"],
  components: {
    Piece,
  },
  data() {
    const squares = [];
    for (let row = 1; row <= 8; row++) {
      for (let col = 1; col <= 8; col++) {
        squares.push({
          row,
          col,
          isWhite: (row + col) % 2 === 0,
          isHovered: false,
        });
      }
    }
    return {
      squares,
      pieces: [
        { square: "a1", piece: "wr", key: "w1", originalOrder: 0 },
        { square: "b1", piece: "wn", key: "w2", originalOrder: 1 },
        { square: "c1", piece: "wb", key: "w3", originalOrder: 2 },
        { square: "d1", piece: "wq", key: "w4", originalOrder: 3 },
        { square: "e1", piece: "wk", key: "w5", originalOrder: 4 },
        { square: "f1", piece: "wb", key: "w6", originalOrder: 5 },
        { square: "g1", piece: "wn", key: "w7", originalOrder: 6 },
        { square: "h1", piece: "wr", key: "w8", originalOrder: 7 },
        { square: "a2", piece: "wp", key: "w9", originalOrder: 8 },
        { square: "b2", piece: "wp", key: "w10", originalOrder: 9 },
        { square: "c2", piece: "wp", key: "w11", originalOrder: 10 },
        { square: "d2", piece: "wp", key: "w12", originalOrder: 11 },
        { square: "e2", piece: "wp", key: "w13", originalOrder: 12 },
        { square: "f2", piece: "wp", key: "w14", originalOrder: 13 },
        { square: "g2", piece: "wp", key: "w15", originalOrder: 14 },
        { square: "h2", piece: "wp", key: "w16", originalOrder: 15 },
        { square: "a8", piece: "br", key: "b1", originalOrder: 16 },
        { square: "b8", piece: "bn", key: "b2", originalOrder: 17 },
        { square: "c8", piece: "bb", key: "b3", originalOrder: 18 },
        { square: "d8", piece: "bq", key: "b4", originalOrder: 19 },
        { square: "e8", piece: "bk", key: "b5", originalOrder: 20 },
        { square: "f8", piece: "bb", key: "b6", originalOrder: 21 },
        { square: "g8", piece: "bn", key: "b7", originalOrder: 22 },
        { square: "h8", piece: "br", key: "b8", originalOrder: 23 },
        { square: "a7", piece: "bp", key: "b9", originalOrder: 24 },
        { square: "b7", piece: "bp", key: "b10", originalOrder: 25 },
        { square: "c7", piece: "bp", key: "b11", originalOrder: 26 },
        { square: "d7", piece: "bp", key: "b12", originalOrder: 27 },
        { square: "e7", piece: "bp", key: "b13", originalOrder: 28 },
        { square: "f7", piece: "bp", key: "b14", originalOrder: 29 },
        { square: "g7", piece: "bp", key: "b15", originalOrder: 30 },
        { square: "h7", piece: "bp", key: "b16", originalOrder: 31 },
      ],
      lightColor: "#edeed1",
      darkColor: "#779952",
    };
  },
  methods: {
    componentForPiece,
  },
  watch: {
    pgn: {
      immediate: true,
      handler: function () {
        try {
          animateGame(this.pgn, this.pieces, this.$refs, () =>
            this.$emit("complete")
          );
        } catch {
          this.$emit("complete");
        }
      },
    },
  },
};
</script>

<style scoped>
svg {
  display: block;
  margin: 0 auto;
  width: 100%;
}
</style>

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

    <component
      v-for="{ position, piece } of pieces"
      :is="componentForPiece(piece)"
      :position="position"
      :key="position + piece"
    />
  </svg>
</template>

<script>
import * as pieces from "./pieces";
import { componentForPiece } from "../helpers/positionHelpers";

export default {
  props: ["position"],
  components: {
    ...pieces,
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
      lightColor: "#edeed1",
      darkColor: "#779952",
    };
  },
  methods: {
    componentForPiece,
  },
  computed: {
    pieces() {
      const result = [];
      if (!this.position) return result;
      for (let row = 1; row <= 8; row++) {
        for (const col of ["a", "b", "c", "d", "e", "f", "g", "h"]) {
          const position = `${col}${row}`;
          const piece = this.position.square(position);
          if (piece === "-") continue;
          result.push({ position, piece });
        }
      }
      return result;
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
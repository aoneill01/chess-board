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
import kokopu from "kokopu";
import gsap from "gsap";
import Piece from "./pieces/Piece.vue";
import { componentForPiece, locationFor } from "../helpers/positionHelpers";

export default {
  props: ["pgn"],
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
        { square: "a1", piece: "wr", key: "w1" },
        { square: "b1", piece: "wn", key: "w2" },
        { square: "c1", piece: "wb", key: "w3" },
        { square: "d1", piece: "wq", key: "w4" },
        { square: "e1", piece: "wk", key: "w5" },
        { square: "f1", piece: "wb", key: "w6" },
        { square: "g1", piece: "wn", key: "w7" },
        { square: "h1", piece: "wr", key: "w8" },
        { square: "a2", piece: "wp", key: "w9" },
        { square: "b2", piece: "wp", key: "w10" },
        { square: "c2", piece: "wp", key: "w11" },
        { square: "d2", piece: "wp", key: "w12" },
        { square: "e2", piece: "wp", key: "w13" },
        { square: "f2", piece: "wp", key: "w14" },
        { square: "g2", piece: "wp", key: "w15" },
        { square: "h2", piece: "wp", key: "w16" },
        { square: "a8", piece: "br", key: "b1" },
        { square: "b8", piece: "bn", key: "b2" },
        { square: "c8", piece: "bb", key: "b3" },
        { square: "d8", piece: "bq", key: "b4" },
        { square: "e8", piece: "bk", key: "b5" },
        { square: "f8", piece: "bb", key: "b6" },
        { square: "g8", piece: "bn", key: "b7" },
        { square: "h8", piece: "br", key: "b8" },
        { square: "a7", piece: "bp", key: "b9" },
        { square: "b7", piece: "bp", key: "b10" },
        { square: "c7", piece: "bp", key: "b11" },
        { square: "d7", piece: "bp", key: "b12" },
        { square: "e7", piece: "bp", key: "b13" },
        { square: "f7", piece: "bp", key: "b14" },
        { square: "g7", piece: "bp", key: "b15" },
        { square: "h7", piece: "bp", key: "b16" },
      ],
      lightColor: "#edeed1",
      darkColor: "#779952",
    };
  },
  methods: {
    componentForPiece,
  },
  computed: {
    // pieces() {
    //   const result = [];
    //   if (!this.position) return result;
    //   forEachSquare((square) => {
    //     const piece = this.position.square(square);
    //     if (piece !== "-") result.push({ position: square, piece });
    //   })
    //   return result;
    // },
  },
  mounted() {
    // setTimeout(() => (this.pieces[0].piece = "bk"), 1000);
    // gsap.to(
    //   this.$refs.pRef.map(({ $el }) => $el),
    //   {
    //     x: "2",
    //     y: "-=12",
    //     duration: 3,
    //   }
    // );
  },
  watch: {
    pgn: {
      immediate: true,
      handler: function () {
        console.log({ pgn: this.pgn, pRef: this.$refs.pRef });
        if (!this.pgn) return;

        const map = {};
        for (let i in this.pieces) {
          const piece = this.pieces[i];
          const ref = this.$refs.pRef[i];
          map[piece.square] = { el: ref.$el, piece };
        }

        const timeline = gsap.timeline();

        const database = kokopu.pgnRead(this.pgn);
        const game = database.game(0);
        const mainVariation = game.mainVariation();
        let labelIndex = 0;
        for (let node = mainVariation.first(); node; node = node.next()) {
          const md = node._info.moveDescriptor;
          const from = md.from();
          const to = md.to();
          const rookFrom = md.isCastling() && md.rookFrom();
          const rookTo = md.isCastling() && md.rookTo();
          if (map[from]) {
            const piece = map[from].piece;
            const label = `l${labelIndex}`;
            timeline.to(map[from].el, {
              scale: 1.1,
              transformOrigin: "50%",
              duration: 0.2,
              onStart: () => {
                this.pieces = this.pieces.sort((a, b) => {
                  if (a === piece) return 1;
                  if (b === piece) return -1;
                  return 0;
                });
              },
            });
            timeline.addLabel(label);
            if (map[to]) {
              timeline.to(map[to].el, { opacity: 0, duration: 0.3 }, label);
            }

            timeline.to(
              map[from].el,
              {
                ...locationFor(to),
                duration: 0.6,
              },
              label
            );
            timeline.to(map[from].el, {
              scale: 1,
              transformOrigin: "50%",
              duration: 0.2,
            });
            if (map[rookFrom]) {
              timeline.to(
                map[rookFrom].el,
                { ...locationFor(rookTo), duration: 0.6 },
                label
              );
              map[rookTo] = map[rookFrom];
              delete map[rookFrom];
            }
            map[to] = map[from];
            delete map[from];
            labelIndex++;
          }
        }
      },
    },

    // for (let node = mainVariation.first(); node; node = node.next()) {
    //   positions.push(node.position());
    // }
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

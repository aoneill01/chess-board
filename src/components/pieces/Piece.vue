<template>
  <g :transform="transform">
    <g transform="scale(3.78)">
      <component :is="component" />
    </g>
  </g>
</template>

<script>
import { componentForPiece } from "../../helpers/positionHelpers";

export default {
  props: ["position", "piece"],
  computed: {
    transform() {
      const [col, row] = this.position.split("");

      return `translate(${
        2 + (col.charCodeAt(0) - "a".charCodeAt("a")) * 12
      }, ${2 + 12 * (8 - row)})`;
    },
    component() {
      return componentForPiece(this.piece);
    },
  },
};
</script>

<style></style>

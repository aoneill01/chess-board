<template>
  <g :transform="transform">
    <slot></slot>
  </g>
</template>

<script>
export default {
  props: ["position"],
  computed: {
    transform() {
      const [col, row] = this.position.split("");

      return `translate(${
        2 + (col.charCodeAt(0) - "a".charCodeAt("a")) * 12
      }, ${2 + 12 * (8 - row)}) scale(3.78)`;
    },
  },
};
</script>

<style>
</style>
<template>
  <Piece :position="position">
    <WhitePawnGroup />
  </Piece>
</template>

<script>
import Piece from "./Piece";
import WhitePawnGroup from "./WhitePawnGroup";

export default {
  components: {
    Piece,
    WhitePawnGroup,
  },
  props: ["position"],
};
</script>
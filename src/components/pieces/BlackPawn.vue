<template>
  <Piece :position="position">
    <BlackPawnGroup />
  </Piece>
</template>

<script>
import Piece from "./Piece";
import BlackPawnGroup from "./BlackPawnGroup";

export default {
  components: {
    Piece,
    BlackPawnGroup,
  },
  props: ["position"],
};
</script>
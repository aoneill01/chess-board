<template>
  <div class="container">
    <PlayerDescription v-if="game" :isWhite="true" :player="game.white" />
    <PlayerDescription v-if="game" :isWhite="false" :player="game.black" />
  </div>
</template>

<script>
import PlayerDescription from "./PlayerDescription.vue";

export default {
  components: { PlayerDescription },
  props: ["game"],
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  min-height: 56px;
}

@media only screen and (max-width: 667px) {
  .container {
    display: flex;
    justify-content: space-between;
    min-height: 36px;
  }
}
</style>
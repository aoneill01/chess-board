<template>
  <div :class="['player', isWhite ? 'white' : 'black']">
    <WhitePawnIcon class="pawn" v-if="isWhite" />
    <BlackPawnIcon class="pawn" v-if="!isWhite" />
    <img v-if="avatar" class="avatar" :src="avatar" />
    <div v-if="!avatar" class="avatar">&nbsp;</div>
    <div class="name">
      <a v-if="url" :href="url" target="_blank">{{ player.username }}</a
      ><span v-else>{{ player.username }}</span>
    </div>
    <div class="rating">{{ player.rating }}</div>
  </div>
</template>

<script>
import WhitePawnIcon from "./pieces/WhitePawnIcon";
import BlackPawnIcon from "./pieces/BlackPawnIcon";

export default {
  data() {
    return {
      avatar: null,
      url: null,
    };
  },
  components: {
    WhitePawnIcon,
    BlackPawnIcon,
  },
  props: ["isWhite", "player"],
  watch: {
    player: {
      handler: async function () {
        await this.fetchAvatar();
      },
      immediate: true,
    },
  },
  methods: {
    async fetchAvatar() {
      if (!this.player || !this.player["@id"]) return;
      for (let retry = 0; retry < 5; retry++) {
        try {
          const response = await fetch(this.player["@id"]);
          const data = await response.json();
          this.avatar = data.avatar;
          this.url = data.url;
          return;
        } catch {}
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    },
  },
};
</script> 

<style scoped>
.player {
  display: grid;
  grid-template-columns: 48px 48px 1fr;
  margin-bottom: 8px;
}

.player.black {
  grid-template-columns: 1fr 48px 48px;
  text-align: right;
}

.pawn {
  grid-row-start: 1;
  grid-row-end: 3;
  width: 46px;
}

.black .pawn {
  grid-column-start: 3;
}

.black .avatar {
  grid-column-start: 2;
}

.black .name {
  grid-column-start: 1;
}

.avatar {
  width: 100%;
  grid-row-start: 1;
  grid-row-end: 3;
}

div.avatar {
  background-color: #ddd;
}

.name {
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
  margin: 0 8px;
}

.rating {
  color: #555;
  font-size: 16px;
  margin: 0 8px;
}

a {
  color: black;
  text-decoration: none;
}

@media only screen and (max-width: 667px) {
  .name {
    font-size: 12px;
  }

  .rating {
    font-size: 10px;
  }

  .player {
    grid-template-columns: 32px 32px 1fr;
    margin-bottom: 4px;
  }

  .player.black {
    grid-template-columns: 1fr 32px 32px;
  }

  .pawn {
    width: 30px;
  }
}
</style>
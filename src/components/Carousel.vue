<template>
  <v-carousel
      cycle
      hide-delimiter-background

      show-arrows="hover"
      style="height: 100%"
  >
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet
          :style="{ backgroundImage: 'url(' + slide + ')', backgroundSize: 'cover' }"
          class="d-flex flex-column justify-center align-center "
          height="100%"
      >

      </v-sheet>
    </v-carousel-item>
  </v-carousel>
  <Import v-model="dialogOpen"></Import>
</template>

<script>
import Import from "./Import.vue";

export default {
  data() {
    return {
      slides: [
        require("@/assets/img/img1.jpeg"),
        require("@/assets/img/img2.jpeg"),
      ],
      dialogOpen: false,
    };
  },
  components: {
    Import,
  },
  methods: {
    openDialog() {
      this.dialogOpen = true;
    },
  },
};
</script>

<style scoped>
.start-button {
  margin-top: 16px;
  align-self: center;
  border-radius: 25px;
  padding: 20px 40px;
  border-color: green;
  color: green;
  align-content: center;
}

.text-h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: white;
  text-align: center;
}

.version {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-size: 16px;
}

.icons {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
}

.info-icon {
  font-size: 24px;
  color: white;
  margin-right: 8px;
}

.help-icon {
  font-size: 24px;
  color: green;
  background-color: white;
  border-radius: 50%;
  padding: 4px;
  margin-right: 8px;
}

.healing-icon {
  font-size: 24px;
  color: white;
}

.slide-text {
  font-size: 20px;
  margin-top: 16px;
}

/* Responsive Styles */

@media (max-width: 600px) {
  .text-h2 {
    font-size: 18px;
  }

  .version {
    font-size: 14px;
  }

  .icons {
    bottom: 10px;
    right: 10px;
  }

  .info-icon,
  .help-icon,
  .healing-icon {
    font-size: 20px;
  }

  .start-button {
    margin-top: 10px;
    padding: 12px 24px;
  }
}
</style>

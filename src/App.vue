<script setup>
import {ref} from "vue";
import eventBus from "./eventBus";

const isOpened = ref(false);
const componentInDrawer = ref("div");
const drawerREF = ref();

const openDrawer = (eventDatas) => {
  drawerREF.value = Math.random()
  isOpened.value = true;
  componentInDrawer.value = eventDatas.component;
};
eventBus.$on("open-drawer", openDrawer);
eventBus.$on("close-drawer", () => isOpened.value = false);
</script>
<template>
  <div>
    <v-layout row wrap>
      <v-navigation-drawer
          v-model="isOpened"
          style="
          background-color: transparent;
          height: fit-content;
          bottom: 60px;
          max-height: calc(100vh - 70px);
          top: unset;
        "
          temporary=""
          width="400"
      >
        <div class="bg-green-500 text-white p-3">
          <component :is="componentInDrawer" :key="drawerREF"></component>
        </div>
      </v-navigation-drawer>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

* {
  padding: 0;
  margin: 0;
}
</style>

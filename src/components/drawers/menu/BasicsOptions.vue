<script setup>
import {useStore} from 'vuex';

const store = useStore();
const selects = store.state?.settingsOptions?.basics
</script>

<template>
  <div>
    <div v-for="(config, key) in selects" :key="key">
      <v-select
          :flat="false"
          :items="config.options"
          :label="config.label"
          :model-value=" store.state?.visualizerSettings?.[config.param]"
          item-title="text"
          item-value="value"
          variant="outlined"
      ></v-select>
    </div>
    <div></div>
    <div></div>
  </div>
</template>

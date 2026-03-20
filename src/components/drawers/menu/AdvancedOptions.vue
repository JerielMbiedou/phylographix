<script setup>
import {ref} from 'vue'

const selects = ref()
</script>

<template>
  <div>
    <div v-for="(config, key) in selects" :key="key">
      <v-select
          :flat="false"
          :items="config.options"
          :label="config.label"
          item-title="text"
          item-value="value"
          variant="outlined"
      ></v-select>
    </div>
    <div></div>
    <div></div>
  </div>
</template>

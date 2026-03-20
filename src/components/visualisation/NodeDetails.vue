<template>
  <v-card color="white" dark>
    <div class="flex justify-between items-center bg-green-500 p-1">
      <div class="text-white">Node: {{ nodeSelected?.data?.name }}</div>
      <v-btn color="danger" icon size="20" @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <v-card-text>
      <div>
        <strong>Root: {{ nodeSelected?.depth === 0 ? 'Yes' : 'No' }}</strong>
      </div>
      <div>
        <strong>Leaf: {{ nodeSelected?.data?.children?.length === 0 ? 'Yes' : 'No' }}</strong>
      </div>
      <div>
        <strong>Descendant number: {{ nodeSelected?.data?.childCount}}</strong>
      </div>
      <div>
        <strong>Similarity: {{ nodeSelected?.data?._height || 0 }}%</strong>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {defineEmits, defineProps, watch} from 'vue';

const emits = defineEmits(['closeDetails']);

const props = defineProps({
  nodeSelected: {
    type: Object,
    required: true,
  },
});

watch(props, () => {

});

const close = () => {
  emits('closeDetails');
};
</script>

<style scoped>
.v-card {
  margin-bottom: 16px;
}

.v-card__title {
  font-size: 18px;
  font-weight: 500;
}

.v-img {
  margin-top: 16px;
}
</style>

<template>
  <div class="uppercase font-semibold mb-5">import dataset</div>
  <div class="">
    <p class="text-xs mb-2">
      <span class="font-semibold">Note:</span>
      <span class="text-light">accepted file formats are...</span>
      <span class="font-semibold">json</span>
    </p>
    <v-form @submit.prevent="visualizeFile">
      <div class="flex flex-wrap gap-3 items-center">
        <v-text-field
            v-model="fileName"
            class="flex-1"
            dense
            label="Name your tree..."
            outlined
            @input="(e)=> datas.name = e.target.value"
        ></v-text-field>
        <v-btn class="bg-white h-full p-2" text @click="fileInput.click()">
          <v-icon>mdi-folder-open</v-icon>
        </v-btn>
        <input
            ref="fileInput"
            accept=".json"
            hidden
            name="file"
            type="file"
            @input="upLoadFile"
        >
        <v-btn
            v-if="file && canVisualize"
            class="bg-white w-full p-2"
            type="submit"
        >
          Visualize
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script setup>
import {useStore} from 'vuex';
import {ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import eventBus from '@/eventBus';

import {useToast} from "vue-toastification";

const toast = useToast()

const store = useStore();
const router = useRouter();
const route = useRoute();
const fileName = ref(null);
const file = ref(null);
const fileInput = ref();
const canVisualize = ref(false);

const datas = ref({})

const upLoadFile = (event) => {
  file.value = event.target.files[0];
  if (!fileName.value) fileName.value = file.value.name.split('.json')[0];

  const reader = new FileReader();
  reader.onload = (e) => {
    const fileContents = e.target.result;
    const jsonData = JSON.parse(fileContents);
    if (jsonData[0]?.nodes) {
      datas.value = {
        json: jsonData,
        name: fileName.value
      }
      canVisualize.value = true;
    } else {
      toast.error("The file ins't in the good format")
    }
  };
  reader.readAsText(file.value);
};

const visualizeFile = () => {
  store.commit('setDataTooVisualize', datas.value);
  if (route.name != 'visualisation') {
    router.push({name: 'visualisation'});
  } else {
    eventBus.$emit('rerender-visualizer')
  }
  eventBus.$emit('close-drawer')
};
</script>

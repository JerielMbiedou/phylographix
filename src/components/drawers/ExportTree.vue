<script setup>
import {ref} from 'vue';
import {useStore} from 'vuex';
import eventBus from "@/eventBus";

const store = useStore();
const exportTypes = ['txt', 'json', 'png', 'svg', 'pdf']
const filename = ref(store.state.treeName)
const selectedType = ref('png')

const exportTree = () => {
  if (selectedType.value === 'txt' || selectedType.value === 'json') {
    const data = store.state.dataToVisualize

    const jsonData = JSON.stringify(data, null, 2); // Convertit les données en format JSON avec une indentation de 2 espaces

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData));
    element.setAttribute('download', `${filename.value}.${selectedType.value.toLowerCase()}`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
    eventBus.$emit('close-drawer')

  } else {
    const datas = {
      name: filename.value,
      type: selectedType.value
    }
    eventBus.$emit('export-tree', datas)
  }
}
</script>

<template>
  <div class="uppercase font-semibold mb-5">Export Tree</div>
  <div>
    <p class="text-xs mb-2"><span class="font-semibold">Note :</span> <span class="text-light"> accepted file formats are...</span>
      <span class="font-semibold">jpg, jpeg, ...</span></p>
    <v-form @submit.prevent="exportTree">
      <div class="flex gap-5 items-center flex-wrap ">
        <select id="" v-model="selectedType" class="w-full bg-white p-2" name="">
          <option v-for="(eposrtType, key) in exportTypes" :key="key" :value="eposrtType" class="bg-white p-2 ">
            {{ eposrtType.toUpperCase() }}
          </option>
        </select>
        <input id="" v-model="filename" class="flex-1 bg-white p-2" name="" placeholder="Name your tree..." type="text">
        <button v-if="filename" class="bg-white h-full  p-2">
          <v-icon>mdi-download</v-icon>
        </button>
      </div>
    </v-form>
  </div>
</template>
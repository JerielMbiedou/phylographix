<script setup>
import Visualizer from '@/components/visualisation/Visualizer.vue'
// import useVisualizerStore from '@/stores/useVisualizerStore.js'
import eventBus from '@/eventBus';
import ImportTree from "@/components/drawers/ImportTree.vue"
import ExportTree from "@/components/drawers/ExportTree.vue"
import SearchAndFilter from '@/components/visualisation/SearchAndFilter.vue';
import {onMounted, ref} from 'vue';


const openImport = () => {
  eventBus.$emit('open-drawer', {
    title: '',
    component: ImportTree
  })
}

const openExport = () => {
  eventBus.$emit('open-drawer', {
    title: '',
    component: ExportTree
  })
}
const visualizerRef = ref()

onMounted(() => {
  eventBus.$on('rerender-visualizer', () => {
    visualizerRef.value = Math.random()
  })
})
</script>

<template>
  <div class="flex flex-col h-screen w-screen">
    <div class="bg-green-500 h-[50px] w-full  top-0 flex items-center text-white px-3">

      <div class="hidden md:flex gap-5 ">
        <v-icon class="cursor-pointer" @click="$router.push('/')">mdi-home-circle</v-icon>
      </div>
      <div class="flex-1 flex justify-center py-[5px] pl-3">
        <SearchAndFilter :key="visualizerRef"/>
      </div>
      <div class="flex gap-3">

        <div class="hidden md:block">
          <v-icon class="cursor-pointer" @click="openImport">mdi-folder-open</v-icon>
        </div>
        <div class="hidden md:block">
          <v-icon class="cursor-pointer " @click="openExport">mdi-download</v-icon>
        </div>
      </div>

    </div>
    <div class="flex-1">
      <Visualizer :key="visualizerRef"/>
    </div>
    <div class="text-xl py-2 px-4 shadow-sm border-b">
      Dendrogram - {{ $store.state.treeName }}
    </div>
  </div>
</template>
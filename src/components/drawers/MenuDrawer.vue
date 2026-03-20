<template>
  <div class="flex flex-col" style="height: calc(100vh - 130px)">
    <div class="uppercase font-semibold mb-3">
      <v-icon>mdi-folder-open</v-icon>
      <span>Menu</span>
    </div>
    <div class="flex-1 bg-[#EBF6FD] flex flex-col">

      <div class="flex gap-5 md:hidden">

        <div class="hidden md:block">
          <v-icon class="cursor-pointer" @click="openImport">mdi-folder-open</v-icon>
        </div>
        <div class="hidden md:block">
          <v-icon class="cursor-pointer " @click="openExport">mdi-download</v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from 'vuex';
import {ref} from 'vue';
import BasicsOptions from "@/components/drawers/menu/BasicsOptions.vue"
import AdvancedOptions from "@/components/drawers/menu/AdvancedOptions.vue"
import eventBus from '@/eventBus';
import ImportTree from "@/components/drawers/ImportTree.vue"
import ExportTree from "@/components/drawers/ExportTree.vue"

const store = useStore();

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
const updateSimulation = () => {
  console.log('on hydrate le visualiseur avec : ', store.state?.visualizerSettings)
}
</script>

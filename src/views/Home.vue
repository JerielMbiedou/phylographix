<script setup>
import Carousel from '../components/Carousel.vue'
import eventBus from '@/eventBus';
import ImportTree from "@/components/drawers/ImportTree.vue"

const openImport = () => {
  eventBus.$emit('open-drawer', {
    title: '',
    component: ImportTree
  })
  // router.push({name: 'visualisation'})
}
</script>

<template>
  <div class="h-screen  w-screen relative overflow-hidden text-white">
    <div class="h-full w-full bg-green-800 absolute z-10 bg-opacity-30 flex flex-col p-2">
      <div class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <p class="text-xs mb-3">welcome to</p>
          <div class="text-4xl md:text-6xl font-semibold uppercase">PHILOGRAPHIX</div>
          <div class="mt-6"
          >
            <button class="bg-white rounded-full text-green-300  uppercase py-2 px-8 " @click="openImport">
              Start visualization
            </button>
          </div>
          <div>
            <div class="text-xs mt-6 ">Version 1.0</div>
          </div>
        </div>
      </div>
      <!-- <div class=" flex items-end justify-center md:!justify-between text-center md:text-end">
        <div class="hidden md:block">Version 1.0</div>
      </div> -->
    </div>
    <Carousel></Carousel>
  </div>
</template>

<style scoped>

</style>
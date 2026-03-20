<script setup>
import {computed, ref} from 'vue';
import eventBus from "@/eventBus";
import appStore from '@/stores/appStore';
import parserService from '@/services/parserService';

const searchInput = ref(null)
const filters = ref(null)
const isFilterOpened = ref(false)
const nodeDatas = appStore.state.dataToVisualize ? appStore.state.dataToVisualize[0].nodes : []
const edges = appStore.state.dataToVisualize ? appStore.state.dataToVisualize[0].edges : []
nodeDatas.forEach(node => {
  let name = ''
  if (node.elements) {
    node.elements.forEach((element, i) => {
      name += element.label
      if (i < node.elements.length - 1) name += ' / '
    });
  } else {
    name = node._key
  }

  node.name = name
  node.__height = parserService.calculatePercentageFromHeight(node.height)
  node.children = edges.filter((edge) => edge._from === node._id)
})
const makeSearch = () => {
  const datas = {
    input: searchInput.value,
    filterOptions: filters.value,
  }
  eventBus.$emit("make-node-search", datas)
}
const openFilter = () => {
  isFilterOpened.value = !isFilterOpened.value
  eventBus.$emit("open-search-menu", true)
}
const opendetails = (node) => {

  const theNode = {data: node}
  eventBus.$emit('node_selected', theNode, true)
  eventBus.$emit('search_node_selected', node.name)
}
const searchReseault = computed(() => searchInput.value ?
    nodeDatas.filter(node =>
        node.name.includes(searchInput.value) ||
        node.__height.toString().includes(searchInput.value)
    )
    : nodeDatas)

function wrapSubstringWithTag(text, substring = searchInput.value) {
  const tag = "span"
  const className = "text-white bg-green-400"
  if (substring) {
    const regex = new RegExp(substring, 'g');
    return text.replace(regex, `<${tag} class="${className}">$&</${tag}>`);
  } else return text
}


</script>

<template>
  <form class="relative max-w-[800px] h-full flex-1 flex justify-center gap-0 items-center bg-white rounded-full py-2 "
        @submit.prevent="makeSearch">
    <div v-if="isFilterOpened"
         :class="isFilterOpened?'h-36': ''"
         class="border  overflow-auto shadow-lg absolute bg-white w-full -top-2 rounded-xl px-6 py-2 transition-all duration-300 ease-in-out z-10">
      <div class="pt-10 overflow-auto">
        <template v-for="(node, i) in searchReseault ">
          <div class="cursor-pointer  hover:text-green-500" @click="opendetails(node)">
            <span v-html="wrapSubstringWithTag(node.name)"></span> <span
              v-html="`(${wrapSubstringWithTag(node.__height.toString())}%)`"></span>
          </div>
          <div v-if="i<searchReseault.length" class="w-full border-b"></div>
        </template>
        <div v-if="!searchReseault.length" class="text-center">
          <span>No node found...</span>
        </div>
      </div>
    </div>
    <div class="overflow-hidden absolute w-full flex bottom bg-white rounded-full items-center border z-10"
         @click="openFilter">
      <v-icon class="cursor-pointer py-4 px-6 hover:bg-gray-300 hover:bg-opacity-50 h-full rounded-full" type="submit">
        mdi-filter-outline
      </v-icon>
      <input v-model="searchInput" class="flex-1 !outline-0  pr-1 z-50 bg-white"
             placeholder="Type some node key or height to make a fast search..."
             type="text">
      <!-- <button class="flex gap-2 bg-blue-500 px-6 py-2  rounded-full text-white z-50" >
        <v-icon type="submit" class="cursor-pointer" >mdi-magnify</v-icon> 
        <span class="hidden md:block">Rechercher</span>
      </button> -->
    </div>
  </form>
</template>
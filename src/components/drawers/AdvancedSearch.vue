<script setup>
import {computed, ref} from 'vue';
import eventBus from "@/eventBus";
import appStore from '@/stores/appStore';
import parserService from '@/services/parserService';

const opendetails = (node) => {

  const theNode = {data: node}
  eventBus.$emit('node_selected', theNode, true)
  eventBus.$emit('search_node_selected', node.name)
}

const searchOptions = [
  {
    title: 'Label/key',
    value: 'name'
  },
  {
    title: 'Similarity',
    value: '__height'
  },
  {
    title: 'Nb. of descendants',
    value: 'descendants'
  },

]
const opérators = [
  {
    title: "=",
    value: "equ"
  },
  {
    title: "&gt;=",
    value: "sup_equ"
  },
  {
    title: "&lt;=",
    value: "inf_equ"
  },
  {
    title: "&gt;",
    value: "sup"
  },
  {
    title: "&lt;",
    value: "inf"
  }
]

const searchQuery = ref([
  {
    key: 'name',
    operator: 'inc',
    query: '',
    active: true
  },
  {
    key: '__height',
    operator: 'equ',
    query: '',
    active: true
  },
  {
    key: 'descendants',
    operator: 'equ',
    query: '',
    active: true
  },
])

const availableSearchOptions = computed(() => {
  const tempOptions = searchOptions
  // const tempOptions = []
  // searchOptions.forEach(opt => {
  //   if(searchQuery.value.find(q => q.key == opt.value))  {}
  //   else tempOptions.push(opt)
  // })
  return tempOptions
})


const nodeDatas = appStore.state.dataToVisualize ? appStore.state.dataToVisualize[0].nodes : []
const edges = appStore.state.dataToVisualize ? appStore.state.dataToVisualize[0].edges : []
edges.forEach(e => {
  e.nodeFromm = nodeDatas.find(n => n._id == e._from)
})
const countDescendants = (nodeId) => {
  const childEdges = edges.filter((edge) => edge._from === nodeId);
  let count = childEdges.length; // Initialiser avec le nombre d'enfants directs

  for (const edge of childEdges) {
    count += countDescendants(edge._to); // Récursivement compter les descendants
  }

  return count;
};

nodeDatas.forEach(node => {
  let name = '';
  if (node.elements) {
    node.elements.forEach((element, i) => {
      name += element.label;
      if (i < node.elements.length - 1) name += ' / ';
    });
  } else {
    name = node._key;
  }

  node.name = name;
  node.__height = parserService.calculatePercentageFromHeight(node.height);
  node.children = edges.filter((edge) => edge._from === node._id);

  // Calculer le nombre de descendants
  node.descendants = countDescendants(node._id);
});

const NodeFound = ref(nodeDatas)

const makeSearch = () => {
  let temp = nodeDatas
  searchQuery.value.forEach(opt => {
    if (opt.active && opt.query) {
      temp = temp.filter(node => {
        if (opt.operator == 'equ') return node [opt.key] == opt.query
        if (opt.operator == 'inc') return node [opt.key].toLowerCase().includes(opt.query.toLowerCase())
        if (opt.operator == 'sup_equ') return node [opt.key] >= opt.query
        if (opt.operator == 'inf_equ') return node [opt.key] <= opt.query
        if (opt.operator == 'inf') return node [opt.key] < opt.query
        if (opt.operator == 'sup') return node [opt.key] > opt.query
      })

    }
  })
  console.log('ok :', temp)
  NodeFound.value = temp
}

</script>

<template>
  <div class="flex gap-3 uppercase w-full p-2 border-b-2 text-green-500 border-b-green-500">
    <v-icon class="p-3 rounded-full border border-transparent  hover:border-green-500 hover:shadow transtion-all duration-300 "
            size="20">
      mdi-arrow-left
    </v-icon>
    <div>Advanced search Engine</div>
  </div>
  <div class="p-2 flex-1 flex flex-col gap-4 h-full">
    <div class="text-sm text-gray-500">
      <span class="text-green-500">{{ NodeFound.length }}</span> nodes founds
    </div>
    <div class="">
      <h3 class="captalize font-semibold">Search Options</h3>
      <div class="!text-sm flex flex-col gap-5 ">
        <div class="flex gap-2 items-center">
          <input id="" v-model="searchQuery[0].active" checked class="border  focus:outline-green-500" name=""
                 type="checkbox">
          <select id="" class="border px-2 py-1 focus:outline-green-500" disabled name="" value="name">
            <option v-for="option in availableSearchOptions" :key="option.title" :value="option.value">{{ option.title
              }}
            </option>
          </select>
          <input id="" v-model="searchQuery[0].query" class="border px-2 py-1 focus:outline-green-500" name=""
                 type="text">
          <!-- <v-icon size="20" class="p-3 rounded-full border border-transparent  hover:border-green-500 hover:shadow transtion-all duration-300 " >mdi-bin</v-icon>  -->
        </div>
        <div class="flex gap-2 items-center">
          <input id="" v-model="searchQuery[1].active" checked class="border  focus:outline-green-500" name=""
                 type="checkbox">
          <select id="" class="border px-2 py-1 focus:outline-green-500" disabled name="" value="__height">
            <option v-for="option in availableSearchOptions" :key="option.title" :value="option.value">{{ option.title
              }}
            </option>
          </select>
          <select id="" v-model="searchQuery[1].operator" class="border px-2 py-1 focus:outline-green-500" name="">
            <option v-for="op in opérators" :value="op.value" v-html="op.title"></option>
          </select>
          <input id="" v-model="searchQuery[1].query" class="border px-2 py-1 w-36 focus:outline-green-500" name=""
                 type="number">
          <!-- <v-icon size="20" class="p-3 rounded-full border border-transparent  hover:border-green-500 hover:shadow transtion-all duration-300 " >mdi-bin</v-icon>  -->
        </div>
        <div class="flex gap-2 items-center">
          <input id="" v-model="searchQuery[2].active" checked class="border  focus:outline-green-500" name=""
                 type="checkbox">
          <select id="" class="border px-2 py-1 focus:outline-green-500" disabled name="" value="descendants">
            <option v-for="option in availableSearchOptions" :key="option.title" :value="option.value">{{ option.title
              }}
            </option>
          </select>
          <select id="" v-model="searchQuery[2].operator" class="border px-2 py-1 focus:outline-green-500" name="">
            <option v-for="op in opérators" :value="op.value" v-html="op.title"></option>
          </select>
          <input id="" v-model="searchQuery[2].query" class="border px-2 py-1 w-36 focus:outline-green-500" name=""
                 type="number">
          <!-- <v-icon size="20" class="p-3 rounded-full border border-transparent  hover:border-green-500 hover:shadow transtion-all duration-300 " >mdi-bin</v-icon>  -->
        </div>
      </div>
    </div>
    <div>
      <v-btn class="btn m-auto" @click="makeSearch">Make Search</v-btn>
    </div>
    <div class="flex-1 border-t-2 overflow-y-scroll overflow-x-hidden py-2">
      <template v-for="node in NodeFound">
        <div class="p-1 px-2 text-sm hover:text-green-500 cursor-pointer" @click="opendetails(node)">
          <div>{{ node.name }}</div>
          <div class="border"></div>
        </div>
      </template>
    </div>
  </div>
</template>
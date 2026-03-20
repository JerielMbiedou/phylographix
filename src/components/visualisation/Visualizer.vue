<template>
  <div class="relative h-full w-screen overflow-hidden flex flex-col p-0 box-border" flat>
    <div class="flex-1 relative">
      <div class="absolute bottom-3 right-3 flex flex-col-reverse gap-3 items-end  z-[500]">
        <v-btn icon size="30" @click="exportTree">
          <v-icon size="20">mdi-download</v-icon>
        </v-btn>
        <v-btn icon size="30" @click="reCenter">
          <v-icon size="20">mdi-fit-to-screen</v-icon>
        </v-btn>
        <v-btn icon size="30" @click="zoomOut">
          <v-icon size="20">mdi-magnify-minus</v-icon>
        </v-btn>
        <v-btn icon size="30" @click="zoomIn">
          <v-icon size="20">mdi-magnify-plus</v-icon>
        </v-btn>

        <div
            :class="panModeEnabled? 'block' :'hidden'"
            class="grid grid-cols-4 bg-white p-1 rounded border shadow-sm transition-all duration-300 ease-in-out"
        >
          <div class="col-span-4 flex items-center justify-center hover:bg-gray-200  cursor-pointer">top</div>
          <div class="hover:bg-gray-200  cursor-pointer flex items-center justify-center">left</div>
          <div class="col-span-2 ">
            <div class="h-16 w-full bg-red"></div>
          </div>
          <div class="hover:bg-gray-200  cursor-pointer flex items-center justify-center">right</div>
          <div class="col-span-4 flex items-center justify-center hover:bg-gray-200  cursor-pointer">bottom</div>
        </div>

        <div class="">
          <div v-if="nodeSelected" id="nodeDetailViewer" class=" min-w-[250px]">
            <NodeDetails :nodeSelected=nodeSelected @closeDetails="nodeSelected = null"/>
          </div>
        </div>
      </div>
      <div class="flex flex-1 h-full">
        <div
            :class="'h-[calc(100vh-100px)] }}'"
            class="bg-white w-fit shadow transition-all duration-300"
        >
          <div
              :class="` ${isMenuOpened ? '!w-96 opacity-100' : 'opacity-0 w-0 p-0' } `"
              class="transition-all duration-300 flex flex-col h-full"
          >
            <AdvancedSearch/>
          </div>
        </div>
        <div class="h-full flex-1 relative bg-gray-200">
          <div id="dendrogram" ref="visualizationField" class="bg-gray-200  h-full mx-8"></div>
          <Draggable class=" group rounded shadow  absolute  top-6 bg-gray-100  overflow-hidden  right-6 !w-fit">
            <template #header>
              <div
                  :class="`${!isOverviewClosed? 'h-1 ':'h-8'}`"
                  class="flex justify-between items-center w-full !bg-green-500 text-white px-1 overflow-hidden p-1 group-hover:h-12 transition-all duration-500 bg-opacity-0 group-hover:bg-opacity-100"
              >
                <span :class="`${!isOverviewClosed? 'opacity-0':'opacity-1'}`"
                      class=" group-hover:opacity-100 transition-all duration-300">Overview</span>
                <v-icon
                    :class="`${!isOverviewClosed? 'opacity-0':'opacity-1 rotate-180'}`"
                    class="transition-all duration-300  group-hover:opacity-100"
                    @click="()=>{
                      isOverviewClosed = !isOverviewClosed;
                      eventBus.$emit('update-boundings', !isOverviewClosed)
                    }"
                >mdi-arrow-down-drop-circle-outline
                </v-icon>
              </div>
            </template>
            <template #default>
              <div :class="`${!isOverviewClosed? 'h-fit':'h-0'}`">
                <div id="dendrogramcontext" class="aspect-square w-64"></div>
              </div>
            </template>
          </Draggable>
          <!-- <div class="group rounded shadow  absolute right-3 top-6 bg-gray-100 flex-1 overflow-hidden cursor-grab">
              <div  
                class="flex justify-between items-center w-full !bg-green-500 text-white px-1 overflow-hidden p-1 group-hover:h-12 transition-all duration-500 bg-opacity-0 group-hover:bg-opacity-100"
                :class="`${!isOverviewClosed? 'h-1 ':'h-8'}`"
                >
                <span class=" group-hover:opacity-100 transition-all duration-300" :class="`${!isOverviewClosed? 'opacity-0':'opacity-1'}`">Overview</span>
                <v-icon @click="isOverviewClosed = !isOverviewClosed" class="transition-all duration-300  group-hover:opacity-100" :class="`${!isOverviewClosed? 'opacity-0':'opacity-1 rotate-180'}`">mdi-arrow-down-drop-circle-outline</v-icon>
              </div>
              <div :class="`${!isOverviewClosed? 'h-fit':'h-0'}`">
                <div id="dendrogramcontext"  class="aspect-square w-64"></div>
              </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import TreeData from "@/assets/json/log_distance_tree_S20.json";
import TreeData from "@/assets/json/examples/log_distance_tree_Tru.json"; // log_distance_tree_Tru
//import TreeVisualiserService from "@/services/TreeVisualiserService";
import TreeVisualiserService from "@/services/TreeVisualiser2Service";

import TreeInteractionService from "@/services/TreeInteractionService";
import parserService from "@/services/parserService";
import eventBus from "@/eventBus";
import NodeDetails from "./NodeDetails.vue";
import ExportTree from "@/components/drawers/ExportTree.vue"
import AdvancedSearch from "@/components/drawers/AdvancedSearch.vue"
import Draggable from "@/components/generals/Draggable.vue"

import {toPng, toSvg} from 'html-to-image';
import {saveAs} from 'file-saver';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// import { ref, onMounted } from 'vue';

function getTransformValue(transformString) {
  let match = transformString.match(/translate\(([^,]+),([^)]+)\) scale\(([^)]+)\)/);
  if (!match) match = transformString.match(/translate\(([^,]+),([^)]+)\)/);
  if (match) {
    const x = parseFloat(match[1]);
    const y = parseFloat(match[2]);
    const k = parseFloat(match[3]);
    return { x, y, k };
  }
  return null;
}

export default {
  components: {NodeDetails, Draggable, AdvancedSearch},
  data() {
    return {
      treeData: TreeData,
      nodeSelected: null,
      panModeEnabled: false,
      svg: null,
      isOverviewClosed: false,
      isMenuOpened: false,
      eventBus
    };
  },
  computed: {
    nodes() {

      return this.treeData.nodes;
    },
    edges() {

      return this.treeData.edges;
    },
  },

  mounted() {
    eventBus.$on('node_selected', this.displayNodeDetails)
    eventBus.$on('make-node-search', this.makeSearchOrFilter)
    eventBus.$on('export-tree', this.makeExportation)
    eventBus.$on("open-search-menu", this.openMenuDiv)

    this.treeData = this.$store.state.dataToVisualize
    if (this.treeData) {
      const dendrogram = parserService.convertToDendrogram(this.treeData);
      if (dendrogram) {
        this.svg = TreeVisualiserService.drawDendrogram(dendrogram, TreeInteractionService.handleNodeSelection);
      }
    } else {
      this.$router.replace('/') //  s'il n'y a pas de données on le renvoit à l'accueil.
    }


    /**
     * 
     * Le code pour écouter les modifications du transfrom de la vue de détail
     * 
     */
    const nodeDetailViewer = document.querySelector('#dendrogram svg>g');
    let oldTransformValue = getTransformValue(nodeDetailViewer?.getAttribute('transform')|| '');

    const detailViewObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'transform') {
          const transformValue = getTransformValue(nodeDetailViewer.getAttribute('transform'));
          if(oldTransformValue && transformValue ) {
            const move = {
              x: transformValue.x - oldTransformValue.x,
              y: transformValue.y - oldTransformValue.y,
              k: transformValue.k ,
            }
            TreeInteractionService.moveOverviewCursor(move)
          }
          oldTransformValue = transformValue
        }
      });
    });
    
    document.querySelector('#dendrogram svg')?.addEventListener('mouseenter', ()=>{
      detailViewObserver.observe(nodeDetailViewer, { attributes: true });
    });
    document.querySelector('#dendrogram svg')?.addEventListener('mouseleave', ()=>{
      detailViewObserver.disconnect()
    });


    /**
     *
     * LE CODE POUR ECOUTER LES MODIFICATIONS DU TRANSFORM DE LA VUE D'ENSEMBLE (Oui j'ai dupliqué le code précédent pour le moment...)
     *   
     */ 

    const nodeOverview = document.querySelector('#dendrogramcontext svg>rect');
    let oldTransformValueOverview = getTransformValue(nodeOverview?.getAttribute('transform')|| '');

    const overviewObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'x' || mutation.attributeName === 'y') {
          const transformValue = {
            x: nodeOverview.getAttribute('x'),
            y: nodeOverview.getAttribute('y'),
          };
          console.log('le curseur: ', transformValue)
          if(oldTransformValueOverview && transformValue ) {
            const move = {
              x: transformValue.x - oldTransformValueOverview.x,
              y: transformValue.y - oldTransformValueOverview.y,
              // k: transformValue.k ,
            }
            // ICI ON VA PLUTOT DEPLACER LA VIE DE DETAIL (fontion que tu vas creer de l'autre coté.)
            // TreeInteractionService.moveOverviewCursor(move)
            
          }
          oldTransformValueOverview = transformValue
        }
      });
    });
    
    document.querySelector('#dendrogramcontext svg')?.addEventListener('mouseenter', ()=>{
      overviewObserver.observe(nodeOverview, { attributes: true });
    });
    document.querySelector('#dendrogramcontext svg')?.addEventListener('mouseleave', ()=>{
      overviewObserver.disconnect()
    });

  },


  methods: {

    openMenuDiv(event) {
      this.isMenuOpened = !this.isMenuOpened
    },
    displayNodeDetails(node, status) {

      if (!status) this.nodeSelected = null
      else this.nodeSelected = node
    },
    makeSearchOrFilter(datas) {
      //data contient "input" (le chanp de recherche) et "filters" (les différents options de filtre...) tu peux les utiliser pour faire ta recherche dans ton arbre.
      // alert("on va faire la recherche sur : " + datas.input + " !!!") // just for tests.
    },
    zoomIn() {
      TreeInteractionService.zoomIn(this.svg);
    },
    reCenter() {
      eventBus.$emit('rerender-visualizer')
    },
    zoomOut() {
      TreeInteractionService.zoomOut(this.svg);
    },

    togglePanMode() {
      this.panModeEnabled = !this.panModeEnabled
      if (this.panModeEnabled) {
        TreeInteractionService.enableZoomAndPan(this.svg)
        TreeInteractionService.reCenter(this.svg, document.getElementById('dendrogram').querySelector("svg"))
      } else {
        TreeInteractionService.reCenter(this.svg, document.getElementById('dendrogram').querySelector("svg"))
        TreeInteractionService.disableZoomAndPan(this.svg)

      }
    },

    exportTree() {
      //On ouvre la boite qui permet de spécifier les infos d'exportation, ce composant va ensuite appeler la foncion makeDownload ci apres.
      eventBus.$emit('open-drawer', {
        title: '',
        component: ExportTree
      })
    },

    makeExportation(datas) {

      if (datas.type === 'svg') {
        toSvg(this.$refs.visualizationField)
            .then((dataUrl) => {
              saveAs(dataUrl, datas.name + '.svg');
            })
            .catch((error) => {
              console.error('Error exporting to SVG:', error);
            });
      }
      if (datas.type === 'png') {
        toPng(this.$refs.visualizationField)
            .then((dataUrl) => {
              saveAs(dataUrl, datas.name + '.png');
            })
            .catch((error) => {
              console.error('Error exporting to PNG:', error);
            });
      }
      if (datas.type === 'pdf') {
        toPng(this.$refs.visualizationField)
            .then((dataUrl) => {
              // saveAs(dataUrl, datas.name+'.png');
              const pdfContent = {
                content: [
                  {image: dataUrl, width: 500},
                ],
              };

              pdfMake.createPdf(pdfContent, null, pdfFonts.vfs).download(datas.name + '.pdf');
            })
            .catch((error) => {
              console.error('Error exporting to pdf:', error);
            });
      }
      eventBus.$emit('close-drawer')
    }

  },

};
</script>

<style>

/*
#dendrogram {
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
*/
div.tooltip-donut {
  position: absolute;
  background: #FFFFFF;
  border-radius: 8px;
  pointer-events: none;
  font-size: 1.3rem;
}


.node {
  cursor: pointer;
}

.overlay {
  /* background-color: #EEE; */
}

.node circle {
  fill: #fff;
  stroke: steelblue;
  stroke-width: 1.5px;
}

.node text {
  font-size: 10px;
  font-family: sans-serif;
}

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}

.link-overview {
  fill: none;
  stroke: black;
  stroke-width: 1.5px;
}

.templink {
  fill: none;
  stroke: red;
  stroke-width: 3px;
}

.ghostCircle.show {
  display: block;
}

.ghostCircle, .activeDrag .ghostCircle {
  display: none;
}
</style>
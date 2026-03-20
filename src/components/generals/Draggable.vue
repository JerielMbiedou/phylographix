<template>
  <div id="mydragaglediv" ref="draggableElement">
    <!-- Le header (s'il existe) est utilisé pour déplacer l'élément -->
    <div @mousedown="dragMouseDown">
      <slot name="header"></slot>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import eventBus from "@/eventBus";

export default {
  data() {
    return {
      pos1: 0,
      pos2: 0,
      pos3: 0,
      pos4: 0,
    };
  },
  mounted() {
    eventBus.$on('update-boundings', e => this.calculateDragLimits(e))
    this.calculateDragLimits();
  },
  computed: {
    hasHeader() {
      return Boolean(this.$refs.header);
    },
  },
  methods: {
    dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      this.pos1 = e.clientX;
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      document.onmouseup = this.closeDragElement;
      document.onmousemove = this.elementDrag;

    },
    calculateDragLimits(status=true) {
      const refElement = document.getElementById('mydragaglediv')
      const parent = refElement?.parentElement;
      const boundingRect = parent.getBoundingClientRect();
      const elementRect = refElement?.getBoundingClientRect();
      if(status == false) {
        console.log('status ', status)
        elementRect.height = 32
      }
      console.log('on ', elementRect)
      this.maxX = boundingRect.width - elementRect.width;
      this.maxY = boundingRect.height - elementRect.height;
    },
    elementDrag(e) {
      e = e || window.event;
      e.preventDefault();

      this.pos1 = this.pos3 - e.clientX;
      this.pos2 = this.pos4 - e.clientY;
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;

      const newTop = this.$refs.draggableElement.offsetTop - this.pos2;
      const newLeft = this.$refs.draggableElement.offsetLeft - this.pos1;

      this.$refs.draggableElement.style.top = `${Math.min(Math.max(newTop, 0), this.maxY)}px`;
      this.$refs.draggableElement.style.left = `${Math.min(Math.max(newLeft, 0), this.maxX)}px`;
    },
    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    },
  },
};
</script>

<style scoped>
#mydragaglediv {
  position: absolute;
  cursor: move;
}

#mydragagledivheader {
  z-index: 10;
}
</style>

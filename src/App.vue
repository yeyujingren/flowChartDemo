<script setup lang="ts">
import Flow from './components/flow.vue';
import Bus from './utils/eventBus';
import { inject } from 'vue';
const eventBus: Bus = inject('$bus')!;
function click() {
  eventBus.emit('ButtonSetup');
}
</script>

<template>
  <Flow/>
  <button @click="click">hahahah</button>
</template>

<style>
@import url(./custom-bpmn/assets/style);
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
}
[v-cloak] {
  display: none;
}
</style>

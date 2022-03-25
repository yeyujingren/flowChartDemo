<script setup lang="ts">
import Flow from './components/flow.vue';
</script>

<template>
  <Flow />
</template>

<style>
@import url(./font/iconfont.css);
.icon-custom-circle {
      background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%23ffc800%22%20viewBox%3D%220%200%20120%20120%22%3E%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2240%22%2F%3E%3C%2Fsvg%3E');
    }
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
}
</style>

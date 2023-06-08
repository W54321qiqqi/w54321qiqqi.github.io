<template>
  <div id="bubble" class="overflow-hidden">
    <canvas id="bubble-canvas" class="bubble-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import * as pageBubble from '/@/utils/pageBubble'
let timer: number
onMounted(() => {
  timer = window.setTimeout(() => {
    pageBubble.init()
  }, 1000)
})

onBeforeUnmount(() => {
  clearTimeout(timer)
  pageBubble.removeListeners()
})
</script>

<style scoped lang="scss"></style>

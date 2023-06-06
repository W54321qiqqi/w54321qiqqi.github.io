<script setup lang="ts">
</script>

<template>
  <div id="search" class="searching" >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
#search {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  visibility: hidden;
  background-image: radial-gradient(transparent 1px, rgb(0 0 0 / 30%) 1px);
  background-size: 4px 4px;
  opacity: 0;
  transition: all 0.2s;
  backdrop-filter: saturate(50%) blur(4px);

  &.searching {
    visibility: visible;
    opacity: 1;
  }
}
</style>

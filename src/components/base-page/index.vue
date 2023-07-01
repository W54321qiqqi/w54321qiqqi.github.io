<template>
  <div class="h-[calc(100vh-116px)] overflow-y-hidden">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BasePage',
})
</script>

<style scoped></style>

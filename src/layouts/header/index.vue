<template>
  <el-header
    class="layout-shadow-rounded layout-filter layout-header-fixed"
  ></el-header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@tailwind components;

@layer components {
  .layout-filter {
    @apply bg-radial bg-4px backdrop-blur-sm;
  }

  .layout-header-fixed {
    @apply fixed left-4 top-0 z-50 h-[50px] w-[calc(100vw-32px)] leading-[50px];
  }
}
</style>

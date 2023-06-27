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
    @apply fixed left-0 top-0 z-[12] h-[50px] w-screen leading-[50px];
  }
}
</style>

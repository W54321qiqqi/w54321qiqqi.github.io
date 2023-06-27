<template>
  <el-main class="layout-main">
    <router-view></router-view>
  </el-main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@tailwind components;
@layer components {
  .layout-main {
    @apply box-border  w-full pl-[316px] pt-[66px];
  }
}
</style>

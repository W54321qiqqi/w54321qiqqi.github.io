<template>
  <div>
    <el-container>
      <el-aside
        class="layout-shadow-rounded mb-4 ml-4 mt-4 h-[calc(100vh-32px)]"
        width="300px"
      >
        <el-scrollbar
          class="menu-scrollbar"
          :wrap-style="{ backgroundColor: '#2d3a4b' }"
        ></el-scrollbar>
      </el-aside>
      <el-container class="h-screen">
        <el-header class="layout-header">
          <div
            class="layout-shadow-rounded fixed h-[50px] w-full leading-[50px]"
          ></div>
        </el-header>
        <el-scrollbar>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
// import subItem from './subItem.vue'
</script>

<style scoped lang="scss">
@tailwind components;
@layer components {
  .layout-header {
    @apply relative h-[50px] bg-white p-0;
  }
}
</style>

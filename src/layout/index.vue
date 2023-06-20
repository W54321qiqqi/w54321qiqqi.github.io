<template>
  <div>
    <el-container>
      <el-aside
        class="layout-shadow-rounded mb-4 ml-4 mt-4 h-[calc(100vh-32px)]"
        width="300px"
      >
        <el-menu default-active="2" @open="handleOpen" @close="handleClose">
          <el-sub-menu index="1">
            <template #title>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="layout-header">
          <div
            class="layout-shadow-rounded ml-4 mr-4 mt-5 h-[50px] leading-[50px]"
          >
            Header
          </div>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped lang="scss">
@tailwind components;
@layer components {
  .layout-header {
    @apply h-auto p-0;
  }
}
</style>

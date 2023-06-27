<template>
  <el-aside width="300px" class="layout-side">
    <el-scrollbar>
      <el-menu
        :default-active="$route.path"
        unique-opened
        router
        class="layout-menu layout-shadow-rounded"
      >
        <side-bar-item
          v-for="route in permissionStore.route"
          :key="route.path"
          :item="route"
        />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts" setup>
import SideBarItem from './side-bar-item.vue'
import { usePermissionStoreWithOut } from '/@/store/modules/permission'
const permissionStore = usePermissionStoreWithOut()
</script>

<style lang="scss" scoped>
@tailwind components;

@layer components {
  .layout-side {
    @apply fixed left-0 top-0  box-border h-screen;
  }

  .layout-menu {
    @apply ml-4 mt-[66px] h-[calc(100vh-82px)];
  }
}
</style>

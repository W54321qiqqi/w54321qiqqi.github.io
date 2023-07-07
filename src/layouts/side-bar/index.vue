<template>
  <el-aside :width="`${sideBarWidth}px`" class="layout-side">
    <el-scrollbar class="layout-shadow-rounded">
      <el-menu
        :default-active="$route.path"
        :mode="getMode"
        :collapse="getCollapse"
        :collapse-transition="false"
        unique-opened
        router
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
import { useMenuSetting } from '../hooks/useMenuSetting'
import { usePermissionStoreWithOut } from '/@/store/modules/permission'
const permissionStore = usePermissionStoreWithOut()
const { getCollapse, getMode, getSideWidth, getSideCollapsed } =
  useMenuSetting()
const sideBarWidth = computed(() => {
  return unref(getCollapse) ? unref(getSideCollapsed) : unref(getSideWidth)
})
</script>

<style lang="scss">
@media (max-width: 992px) {
  .layout-side {
    display: none;
  }
}
</style>

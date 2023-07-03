<template>
  <main class="w-full">
    <div class="layout-main">
      <router-view>
        <template #default="{ Component, route }">
          <transition name="el-fade-in-linear" mode="out-in">
            <component :is="Component" :key="route.fullPath" />
          </transition>
        </template>
      </router-view>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useMenuSetting } from '../hooks/useMenuSetting'
const { getSideWidth, getCollapse, getSideCollapsed } = useMenuSetting()
const paddingLeft = computed(() => {
  const padding = 16
  const sideWidth = unref(getCollapse)
    ? unref(getSideCollapsed)
    : unref(getSideWidth)
  return `${(sideWidth as number) + padding}px`
})
</script>

<style scoped lang="scss">
.layout-main {
  padding-left: v-bind(paddingLeft);
}
</style>

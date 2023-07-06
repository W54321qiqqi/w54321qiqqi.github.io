<template>
  <main class="w-full">
    <div :class="getTagFullscreen ? 'layout-main-fullscreen' : 'layout-main'">
      <router-view>
        <template #default="{ Component, route }">
          <keep-alive :include="getCacheTagList">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </template>
      </router-view>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useMenuSetting } from '/@/layouts/hooks/useMenuSetting'
import { useTagViewSetting } from '/@/layouts/hooks/useTagViewSetting'
const { getCacheTagList, getTagFullscreen } = useTagViewSetting()
const { getSideWidth, getCollapse, getSideCollapsed } = useMenuSetting()
const paddingLeft = computed(() => {
  const padding = 16
  const sideWidth = unref(getCollapse)
    ? unref(getSideCollapsed)
    : unref(getSideWidth)
  const res = `${(sideWidth as number) + padding}px`
  return res
})
</script>

<style scoped lang="scss">
.layout-main {
  padding-left: v-bind(paddingLeft);
}

@media (max-width: 992px) {
  .layout-main {
    padding-left: 16px;
  }
}
</style>

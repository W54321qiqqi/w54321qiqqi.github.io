<template>
  <div
    class="layout-tag-wrapper layout-filter bg-white/75 shadow-[0_0_12px_rgba(0,0,0,.12)]"
  ></div>
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
.layout-tag-wrapper {
  width: calc(100% - v-bind(paddingLeft));
}
@media (max-width: 992px) {
  .layout-tag-wrapper {
    width: 100%;
  }
}
</style>

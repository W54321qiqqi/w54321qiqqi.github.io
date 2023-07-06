<template>
  <div :class="getTagFullscreen ? 'layout-page-fullscreen' : 'layout-page'">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useTagViewSetting } from '/@/layouts/hooks/useTagViewSetting'

defineOptions({
  name: 'BasePage',
})
const { getTagFullscreen } = useTagViewSetting()
</script>

<style scoped lang="scss">
@tailwind components;
@layer components {
  .layout-page {
    @apply h-[calc(100vh-116px)] overflow-y-auto;
  }
  .layout-page-fullscreen {
    @extend .layout-page;
    @apply h-[calc(100vh-66px)];
  }
}
</style>

<template>
  <base-icon
    :name="getTagFullscreen ? 'local-fullOutScreen' : 'local-fullScreen'"
    @click="toggleFullscreen"
    class="tag-fullscreen"
  />
</template>

<script lang="ts" setup>
import { useTagViewSetting } from '../hooks/useTagViewSetting'

const { toggleFullscreen, getTagFullscreen } = useTagViewSetting()
</script>

<style scoped>
.tag-fullscreen {
  border-left: 1px solid rgba(175, 175, 175, 0.3);
  border-right: 1px solid rgba(175, 175, 175, 0.3);
}
</style>

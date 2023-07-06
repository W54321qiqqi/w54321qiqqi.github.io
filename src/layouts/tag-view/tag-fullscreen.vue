<template>
  <base-icon
    :name="getTagFullscreen ? 'local-fullOutScreen' : 'local-fullScreen'"
    @click="toggleFullscreen"
    class="tag-fullscreen-border cursor-pointe"
  />
</template>

<script lang="ts" setup>
import { useTagViewSetting } from '../hooks/useTagViewSetting'
const { toggleFullscreen, getTagFullscreen } = useTagViewSetting()
</script>

<style scoped></style>

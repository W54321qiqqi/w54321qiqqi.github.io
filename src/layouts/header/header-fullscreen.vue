<template>
  <el-tooltip placement="bottom" content="全屏">
    <div
      class="action-item box-hover flex cursor-pointer items-center"
      @click="toggleFullScreen"
    >
      <base-icon
        :name="isFullscreen ? 'local-fullOutScreen' : 'local-fullScreen'"
      />
    </div>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'

const { toggle: toggleFullScreen, isFullscreen } = useFullscreen()
</script>

<style scoped></style>

<template>
  <div
    class="mx-4 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded border border-gray-200"
    @click="toggle"
  >
    <base-icon :name="isDark ? 'local-dark' : 'local-light'"></base-icon>
  </div>
</template>

<script setup lang="ts">
import { useDark } from '/@/hooks'

const { toggle, isDark } = useDark()
</script>

<style scoped lang="scss"></style>

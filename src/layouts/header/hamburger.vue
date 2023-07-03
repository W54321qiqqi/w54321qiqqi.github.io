<template>
  <div
    class="h-full cursor-pointer px-3 hover:bg-slate-100"
    @click="toggleCollapse(!getCollapse)"
  >
    <base-icon :name="getCollapse ? 'local-unfold' : 'local-fold'" />
  </div>
</template>

<script setup lang="ts">
import { useMenuSetting } from '../hooks/useMenuSetting'
const { getCollapse, toggleCollapse } = useMenuSetting()
</script>

<style scoped></style>

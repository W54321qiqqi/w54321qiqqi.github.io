<template>
  <router-link
    class="tag-item pointer relative flex items-center justify-center"
    :to="tag!.path"
    :class="{ active: $route.fullPath === tag!.fullPath }"
  >
    <span class="tag-title">{{ tag?.meta?.title }}</span>
    <base-icon
      name="el-icon-Close"
      size="12"
      @click.prevent.stop="emit('close', tag)"
      v-if="!tag?.meta?.affix && closed"
      :class="$route.fullPath === tag!.fullPath?'text-[#55a9ff]':''"
    />
  </router-link>
</template>

<script lang="ts" setup>
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { PropType } from 'vue'
defineProps({
  tag: {
    type: Object as PropType<RouteLocationNormalizedLoaded>,
  },
  closed: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['close'])
</script>

<style scoped lang="scss">
.tag-item {
  border: 1px solid var(--base-tag-border);
  border-radius: 4px;
  padding: 7px 8px;
  margin-right: 10px;
  font-size: var(--el-font-size-base);
  color: var(--el-text-color-regular);
  transition: all 0.3s;
  &.active {
    border: none;
    padding-left: 20px;
    background-color: #ebf5ff;
    color: #409eff;
    &::before {
      position: absolute;
      left: 7px;
      top: 50%;
      transform: translateY(-50%);
      content: '';
      background: var(--el-menu-active-color);
      height: 8px;
      width: 8px;
      border-radius: 50%;
    }
  }
}
</style>

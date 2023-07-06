<template>
  <router-link
    class="tag-item pointer relative flex items-center justify-center"
    :to="tag!.path"
    :class="{ active: $route.fullPath === tag!.fullPath }"
  >
    <span class="mr-1 w-auto">{{ tag?.meta?.title }}</span>
    <div
      v-if="!tag?.meta?.affix && closed"
      class="group flex h-3 w-3 items-center justify-center rounded-full hover:bg-blue-300"
    >
      <base-icon
        name="el-icon-Close"
        size="12"
        class="group-hover:text-white"
        @click.prevent.stop="emit('close', tag)"
        :class="$route.fullPath === tag!.fullPath ?'text-[#55a9ff]':''"
      />
    </div>
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

<style scoped lang="scss"></style>

<template>
  <svg class="base-icon" aria-hidden="true" :style="iconStyle">
    <use :href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue'
interface Props {
  name: string
  size: string
  color: string
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  size: '18px',
  color: '#000000',
  class: 'base-icon',
})
const fontSize = unref(computed(() => `${props.size.replace('px', '')}px`))
const iconName = computed(() => `#${props.name}`)
const iconStyle = computed((): CSSProperties => {
  return {
    color: props.color,
    fontSize,
  }
})
</script>

<style scoped lang="scss"></style>

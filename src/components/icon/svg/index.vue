<template>
  <svg class="svg-icon icon" :style="iconStyle">
    <use :href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from 'vue'
interface Props {
  name: string
  size: string
  color: string
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  size: '18px',
  color: '#000000',
})

const fontSize = `${props.size.replace('px', '')}px`
const iconName = computed(() => `#${props.name}`)
const iconStyle = computed((): CSSProperties => {
  return {
    color: props.color,
    fontSize,
  }
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  fill: currentColor;
}
</style>

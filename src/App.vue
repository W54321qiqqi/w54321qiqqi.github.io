<script setup lang="ts">
import iconfontInit from './utils/iconfont'
import hotkeys from 'hotkeys-js'
const isShowIconSelector = ref(false)
onMounted(() => {
  iconfontInit()
  hotkeys('alt+s', (e) => {
    e.preventDefault()
    isShowIconSelector.value = true
  })
  hotkeys('esc', (e) => {
    e.preventDefault()
    isShowIconSelector.value = false
  })
})
const onCommitMenuDefaultIcon = (iconName: string) => {
  copyValue(iconName)
}
const copyValue = (value: string) => {
  const dealValue = `<Icon name="${value}" color="#000" size="18px" />`
  navigator.clipboard.writeText(dealValue).then(
    () => {
      ElMessage.success(`复制 成功`)
    },
    () => {
      ElMessage.error(`复制 失败`)
    },
  )
}
</script>

<template>
  <IconSelector
    @change="onCommitMenuDefaultIcon($event)"
    size="large"
    v-if="isShowIconSelector"
  />
</template>

<style scoped></style>

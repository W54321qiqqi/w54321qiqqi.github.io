<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import iconfontInit from '/@/utils/iconfont'
onMounted(() => {
  iconfontInit()
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>

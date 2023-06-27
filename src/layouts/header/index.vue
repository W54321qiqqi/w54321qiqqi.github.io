<template>
  <el-header class="layout-filter layout-header-fixed">
    <el-button @click="handleLoginOut">退出登录</el-button>
  </el-header>
  <div
    class="layout-filter layout-shadow-rounded fixed left-[316px] right-0 top-[50px] z-10 h-[34px]"
  ></div>
</template>

<script setup lang="ts">
import { useUserStoreWithOut } from '/@/store/modules/user'
const router = useRouter()
const userStore = useUserStoreWithOut()
const handleLoginOut = () => {
  userStore.logout(router)
}
</script>

<style scoped lang="scss">
@tailwind components;

@layer components {
  .layout-filter {
    @apply bg-radial bg-4px backdrop-blur-sm;
  }

  .layout-header-fixed {
    @apply fixed left-0 right-0 top-0 z-10 h-[50px] border-[1px] border-slate-200 bg-white/75 leading-[50px];
  }
}
</style>

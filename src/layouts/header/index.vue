<template>
  <div class="layout-filter layout-header-fixed">
    <el-button @click="handleLoginOut">退出登录</el-button>
  </div>
  <tag />
</template>

<script setup lang="ts">
import { useUserStoreWithOut } from '/@/store/modules/user'
import tag from '../tag/index.vue'
const router = useRouter()
const userStore = useUserStoreWithOut()
const handleLoginOut = () => {
  userStore.logout(router)
}
</script>

<style scoped lang="scss"></style>

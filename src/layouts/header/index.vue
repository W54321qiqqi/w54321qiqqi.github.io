<template>
  <header class="layout-filter layout-header-fixed">
    <Logo title="V3 Template" />
    <Hamburger></Hamburger>
    <Breadcrumb></Breadcrumb>
    <el-button @click="handleLoginOut">退出登录</el-button>
  </header>
</template>

<script setup lang="ts">
import { useUserStoreWithOut } from '/@/store/modules/user'
import Breadcrumb from './breadcrumb.vue'
import Logo from './logo.vue'
import Hamburger from './hamburger.vue'
const router = useRouter()
const userStore = useUserStoreWithOut()
const handleLoginOut = () => {
  userStore.logout(router)
}
</script>

<style scoped lang="scss"></style>

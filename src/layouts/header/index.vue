<template>
  <header class="layout-filter layout-header-fixed">
    <Logo title="V3 Template" />
    <div class="flex flex-grow items-center justify-between">
      <div class="flex items-center justify-between">
        <Hamburger></Hamburger>
        <Breadcrumb></Breadcrumb>
      </div>
      <div class="flex items-center justify-between">
        <NavSwitch></NavSwitch>
        <el-button @click="handleLoginOut">退出登录</el-button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStoreWithOut } from '/@/store/modules/user'
import Breadcrumb from './breadcrumb.vue'
import Logo from './logo.vue'
import Hamburger from './hamburger.vue'
import NavSwitch from './nav-switch.vue'

const router = useRouter()
const userStore = useUserStoreWithOut()
const handleLoginOut = () => {
  userStore.logout(router)
}
</script>

<style scoped lang="scss"></style>

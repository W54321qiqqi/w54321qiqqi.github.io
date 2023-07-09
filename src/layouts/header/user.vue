<template>
  <el-dropdown class="pointer box-hover action-item" trigger="hover">
    <div class="flex items-center">
      <el-avatar :size="36" :src="headImg" />
      <span class="ml-3">{{ getUserInfo.username }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleGoAddress">
          <base-icon name="local-location" class="mr-1" />
          项目地址
        </el-dropdown-item>
        <el-dropdown-item divided @click="handleLoginOut">
          <base-icon name="local-exit" class="mr-1" />
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import headImg from '/@/assets/images/avatar.jpg'
import { useUserStoreWithOut } from '/@/store/modules/user'
const router = useRouter()
const userStore = useUserStoreWithOut()
const handleLoginOut = () => {
  userStore.logout(router)
}
const getUserInfo = computed(() => userStore.userInfo)
const handleGoAddress = () => {
  window.open('https://gitee.com/menon-qiqi/simple_admin_template')
}
</script>

<style scoped></style>

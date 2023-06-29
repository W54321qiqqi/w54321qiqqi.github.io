<template>
  <div class="bg-[#afcffb]">
    <div id="bubble" class="h-screen w-screen overflow-hidden">
      <canvas id="bubble-canvas" class="bubble-canvas"></canvas>
    </div>
    <div
      class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center"
    >
      <div class="overflow-hidden rounded border shadow-md shadow-slate-400">
        <div
          class="flex h-14 items-center border-b bg-white shadow-lg shadow-slate-400"
        >
          <img :src="loginPic.logo" class="ml-5 w-16" />
          <h1 class="m-0 mr-5 align-middle">V3 Template</h1>
        </div>
        <div class="box-border flex h-[500px] w-full">
          <!-- 登录框左侧 -->
          <div
            class="relative flex h-full w-0 items-center justify-center bg-[#e4efff] sm:w-0 md:w-0 lg:w-[700px]"
          >
            <img :src="loginPic.loginLeftPic" class="h-5/6 w-5/6" />
          </div>
          <!-- 登录 -->
          <div
            class="flex w-[300px] flex-grow flex-col justify-center bg-white p-5 sm:w-[300px] md:w-[400px] lg:w-[300px]"
          >
            <div>
              <h2 class="mb-5 text-center text-2xl">Welcome back</h2>
              <el-form
                ref="loginFormRef"
                label-position="top"
                :rules="loginRules"
                :model="loginForm"
              >
                <el-form-item prop="username" label="用户名">
                  <base-input
                    type="text"
                    size="large"
                    placeholder="请输入用户名(admin or test)"
                    tabindex="1"
                    clearable
                    autocomplete="on"
                    v-model="loginForm.username"
                    @keyup.enter="goPassword"
                  >
                    <template #prefix>
                      <Icon name="el-icon-User"></Icon>
                    </template>
                  </base-input>
                </el-form-item>
                <el-form-item type="text" prop="password" label="密码">
                  <base-input
                    type="password"
                    size="large"
                    show-password
                    placeholder="请输入密码(123456)"
                    v-model="loginForm.password"
                    tabindex="2"
                    clearable
                    autocomplete="on"
                    ref="passwordRef"
                    @keyup.enter="handleLogin"
                  >
                    <template #prefix>
                      <Icon name="el-icon-Lock"></Icon>
                    </template>
                  </base-input>
                </el-form-item>
                <el-form-item>
                  <el-checkbox
                    v-model="loginForm.remember"
                    :true-label="1"
                    :false-label="0"
                  >
                    记住我
                  </el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    size="large"
                    class="w-full"
                    @click="handleLogin"
                  >
                    <span>登录</span>
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-divider>
              <span class="text-slate-400">其他登录</span>
            </el-divider>
            <div class="flex justify-center">
              <el-tag
                v-for="item in items"
                :key="item.label"
                :type="item.type"
                class="mx-1 cursor-pointer hover:opacity-50"
                effect="dark"
              >
                {{ item.label }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as pageBubble from '/@/utils/pageBubble'
import loginLeftPic from '/@/assets/images/login-pics/loginLeftPic.png'
import logo from '/@/assets/images/login-pics/logo.png'
import { useUserStoreWithOut } from '/@/store/modules/user'
let timer: number
const loginPic = reactive({
  loginLeftPic,
  logo,
})
import type { TagProps } from 'element-plus'
type Item = { type: TagProps['type']; label: string }

const items = ref<Array<Item>>([
  { type: '', label: 'admin' },
  { type: 'success', label: 'test' },
])
const userStore = useUserStoreWithOut()

const router = useRouter()

const loginFormRef = ref()
const passwordRef = ref()
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
  remember: 0,
})
const loginRules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: ['blur', 'change'],
    },
  ],
}
const handleLogin = async () => {
  await unref(loginFormRef).validate(async (valid: boolean) => {
    if (!valid) return
    try {
      loading.value = true
      await userStore.login(loginForm)
      setTimeout(() => {
        router.push({
          path: '/',
        })
      }, 100)
    } finally {
      loading.value = false
    }
  })
}

const goPassword = () => {
  unref(passwordRef).instance.focus()
}
onMounted(() => {
  timer = window.setTimeout(() => {
    pageBubble.init()
  }, 1000)
})

onBeforeUnmount(() => {
  clearTimeout(timer)
  pageBubble.removeListeners()
})
</script>

<style scoped lang="scss"></style>

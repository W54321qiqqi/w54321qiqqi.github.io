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
          <img :src="loginPic.logo" class="ml-5 w-8" />
          <h1 class="ml-2 align-middle font-bold text-[#4468f3]">
            V3 Template
          </h1>
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
                    placeholder="请输入用户名"
                    tabindex="1"
                    clearable
                    autocomplete="on"
                    v-model="loginForm.username"
                    @keyup.enter="goPassword"
                  >
                    <template #prefix>
                      <base-icon name="el-icon-User"></base-icon>
                    </template>
                  </base-input>
                </el-form-item>
                <el-form-item type="text" prop="password" label="密码">
                  <base-input
                    type="password"
                    size="large"
                    show-password
                    placeholder="请输入密码"
                    v-model="loginForm.password"
                    tabindex="2"
                    clearable
                    autocomplete="on"
                    ref="passwordRef"
                    @keyup.enter="handleLogin"
                  >
                    <template #prefix>
                      <base-icon name="el-icon-Lock"></base-icon>
                    </template>
                  </base-input>
                </el-form-item>
                <el-form-item>
                  <div class="flex w-full justify-between">
                    <el-checkbox
                      v-model="loginForm.remember"
                      :true-label="1"
                      :false-label="0"
                      class="text-slate-500"
                    >
                      记住我
                    </el-checkbox>
                    <span class="cursor-pointer text-slate-500">忘记密码?</span>
                  </div>
                </el-form-item>
                <el-form-item>
                  <base-button
                    type="primary"
                    size="large"
                    class="w-full"
                    @click="handleLogin"
                    :loading="loading"
                  >
                    <span>登录</span>
                  </base-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="mb-2 text-center text-xs text-slate-500">
              还没有账号？立即
              <span class="ml-1 font-bold text-[#4468f3]">注册</span>
            </div>
            <el-divider>
              <span class="text-slate-500">其他登录</span>
            </el-divider>
            <div class="flex justify-center">
              <base-icon
                v-for="item in icons"
                :key="item.name"
                :name="`${item.type}-${item.name}`"
                size="25"
                class="mx-1 cursor-pointer"
              ></base-icon>
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
interface Item {
  type: string
  name: string
}

const icons = reactive<Array<Item>>([
  { type: 'local', name: 'github' },
  { type: 'local', name: 'gitee' },
  { type: 'local', name: 'weixin' },
  { type: 'local', name: 'qq' },
  { type: 'local', name: 'zhifubao' },
])
const userStore = useUserStoreWithOut()

const router = useRouter()

const loginFormRef = ref()
const passwordRef = ref()
const loading = ref(false)

const loginForm = reactive({
  username: 'admin',
  password: '123456',
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

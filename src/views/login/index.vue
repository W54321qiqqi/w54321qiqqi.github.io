<template>
  <div id="bubble" class="overflow-hidden">
    <canvas id="bubble-canvas" class="bubble-canvas"></canvas>
  </div>
  <div
    class="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
  >
    <div
      class="h-[500px] flex box-border shadow-neutral-300 overflow-hidden rounded border"
    >
      <div
        class="w-[400px] relative bg-slate-200 h-full flex items-center justify-center"
      >
        <img :src="loginPic.loginLeftPic" class="w-5/6" />
      </div>
      <div class="w-[400px] p-5 flex flex-col justify-between bg-white">
        <div class="w-32 m-auto">
          <img :src="loginPic.logo" alt="logo" />
        </div>
        <div class="h-3/5">
          <h4 class="text-slate-500 text-lg text-center mb-4">simple-admin</h4>
          <el-form ref="loginFormRef">
            <el-form-item prop="phone">
              <el-input
                type="text"
                size="large"
                placeholder="手机号"
                tabindex="1"
                clearable
                autocomplete="on"
              >
                <template #prefix>
                  <el-icon></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item type="text" prop="password">
              <el-input
                type="password"
                size="large"
                show-password
                placeholder="密码"
                tabindex="2"
                clearable
                autocomplete="on"
              >
                <template #prefix>
                  <el-icon></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <div class="flex-bar">
              <el-checkbox>记住我</el-checkbox>
            </div>
            <el-form-item>
              <el-button type="primary" size="large" class="w-full">
                <span>登录</span>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as pageBubble from '/@/utils/pageBubble'
import loginLeftPic from '/@/assets/images/login-pics/loginLeftPic.png'
import logo from '/@/assets/images/login-pics/logo.png'
let timer: number
const loginPic = reactive({
  loginLeftPic,
  logo,
})
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

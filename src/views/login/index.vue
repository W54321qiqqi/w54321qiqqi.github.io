<template>
  <div class="bg-[#afcffb]">
    <div id="bubble" class="overflow-hidden w-screen h-screen">
      <canvas id="bubble-canvas" class="bubble-canvas"></canvas>
    </div>
    <div
      class="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
    >
      <div class="shadow-md shadow-slate-400 overflow-hidden rounded border">
        <div
          class="bg-white border-b shadow-lg shadow-slate-400 h-14 flex items-center"
        >
          <img :src="loginPic.logo" class="w-16 ml-5" />
          <h1 class="m-0 mr-5 align-middle">V3 Admin</h1>
        </div>
        <div class="w-full h-[500px] flex box-border">
          <!-- 登录框左侧 -->
          <div
            class="w-0 sm:w-0 md:w-0 lg:w-[700px] relative bg-[#e4efff] h-full flex items-center justify-center"
          >
            <img :src="loginPic.loginLeftPic" class="w-5/6 h-5/6" />
          </div>
          <!-- 登录 -->
          <div
            class="flex-grow w-[300px] sm:w-[300px] md:w-[400px] lg:w-[300px] p-5 flex flex-col justify-center bg-white"
          >
            <div>
              <h2 class="text-2xl text-center mb-5">Welcome back</h2>
              <el-form ref="loginFormRef" label-position="top">
                <el-form-item prop="phone" label="用户名">
                  <el-input
                    type="text"
                    size="large"
                    placeholder="请输入用户名"
                    tabindex="1"
                    clearable
                    autocomplete="on"
                  >
                    <template #prefix>
                      <Icon name="el-icon-User"></Icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item type="text" prop="password" label="密码">
                  <el-input
                    type="password"
                    size="large"
                    show-password
                    placeholder="请输入密码"
                    tabindex="2"
                    clearable
                    autocomplete="on"
                  >
                    <template #prefix>
                      <Icon name="el-icon-Lock"></Icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-checkbox>记住我</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="large" class="w-full">
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

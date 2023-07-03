<template>
  <router-link to="/" class="logo-link">
    <img :src="logo" class="h-8 w-8" />
    <div class="ml-2 font-bold text-[#4468f3]">
      {{ title }}
    </div>
  </router-link>
</template>

<script setup lang="ts">
import logo from '/@/assets/images/login-pics/logo.png'
withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: '',
  },
)
import { useMenuSetting } from '../hooks/useMenuSetting'
const { getSideWidth } = useMenuSetting()
const sideBarWidth = computed(() => {
  return `${unref(getSideWidth)}px`
})
</script>

<style scoped>
.logo-link {
  width: v-bind(sideBarWidth);
}
</style>

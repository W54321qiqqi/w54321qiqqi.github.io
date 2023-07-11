<template>
  <base-box :loading="props.loading" hover title="待办事项">
    <div class="lg:flex">
      <el-avatar :src="avatar" :size="72" class="!mx-auto !block" />
      <div class="mt-2 flex flex-col justify-center md:ml-6 md:mt-0">
        <h1 class="text-base md:text-lg">
          {{ formatAxis(new Date()) }}{{ getUserInfo.username }} ,
          开始您的工作吧！
        </h1>
        <span class="text-sm">
          今日
          <i :class="`qi-${state.icon}`"></i>
          {{ state.text }}，{{ state.temp }}℃！
        </span>
      </div>
      <div class="mt-4 flex flex-1 justify-end md:mt-0">
        <div class="flex flex-col justify-center text-right">
          <span class="text-sm">待办</span>
          <span class="text-2xl">2/10</span>
        </div>
        <div class="mx-12 flex flex-col justify-center text-right md:mx-16">
          <span class="text-sm">项目</span>
          <span class="text-2xl">8</span>
        </div>
        <div class="mr-4 flex flex-col justify-center text-right md:mr-10">
          <span class="text-sm">团队</span>
          <span class="text-2xl">300</span>
        </div>
      </div>
    </div>
  </base-box>
</template>

<script lang="ts" setup>
import avatar from '/@/assets/images/avatar.jpg'
import { useUserStoreWithOut } from '/@/store/modules/user'
import { WeatherKey, WeatherLocation } from '/@/constant/keys'
import { getWeatherInfo } from '/@/api/common'
import { formatAxis } from '/@/utils/common'
interface State {
  text: string
  temp: string
  icon: string
}
const userStore = useUserStoreWithOut()
const getUserInfo = computed(() => userStore.userInfo)
const data = {
  location: WeatherLocation,
  key: WeatherKey,
}
let state = reactive<Record<string, never> | State>({})
async function getWeather() {
  const {
    now: { text, temp, icon },
  } = await getWeatherInfo(data)
  state = Object.assign({}, { text, temp, icon })
}
onMounted(() => {
  getWeather()
})
const props = defineProps({
  loading: {
    type: Boolean,
    default: true,
  },
})
</script>

<style lang="scss" scoped></style>

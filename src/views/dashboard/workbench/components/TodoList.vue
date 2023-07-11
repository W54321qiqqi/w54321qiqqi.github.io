<template>
  <base-box :loading="props.loading" hover title="待办事项">
    <div class="lg:flex">
      <el-avatar :src="avatar" :size="72" class="!mx-auto !block" />
      <div class="mt-2 flex flex-col justify-center md:ml-6 md:mt-0">
        <h1 class="text-base md:text-lg">
          早安,{{ getUserInfo.username }} , 开始您一天的工作吧！
        </h1>
        <span class="text-sm">
          今日晴，{{ startTemp }}℃ - {{ endTemp.toFixed(2) }}℃！
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
import { WeatherKey, Location } from '/@/constant/keys'
import { getWeatherInfo } from '/@/api/common'
const userStore = useUserStoreWithOut()
const getUserInfo = computed(() => userStore.userInfo)
const startTemp = ref(10 + Math.random() * 10)
const endTemp = ref(20 + Math.random() * 15)
const data = {
  location: Location,
  key: WeatherKey,
}
async function getWeather() {
  const {
    now: { text, temp, feelsLike },
  } = await getWeatherInfo(data)
  console.log(
    '🚀 ~ file: TodoList.vue:46 ~ getWeather ~ res:',
    text,
    temp,
    feelsLike,
  )
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

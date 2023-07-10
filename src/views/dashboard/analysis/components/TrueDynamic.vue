<template>
  <base-seam-scroll :data="dynamicData" :options="scrollOption">
    <div
      v-for="(item, index) in dynamicData"
      :key="item.name"
      class="dynamic-item flex items-center"
    >
      <div>
        <base-icon :name="item.icon" size="28" v-if="index < 3" />
        <div v-else class="w-7 text-center">{{ index + 1 }}</div>
      </div>
      <div class="ml-5 flex-auto">
        <div class="flex items-center justify-between">
          <span>{{ item.name }}</span>
          <span class="dynamic-item-time">
            {{ item.time }}
          </span>
        </div>
        <div class="dynamic-item-content mt-2">
          恭喜成功卖出
          <span class="dynamic-item-value">
            {{ item.value }}
          </span>
          元商品
        </div>
      </div>
    </div>
  </base-seam-scroll>
</template>

<script lang="ts" setup>
const dynamicData = ref([
  {
    name: '成都武侯分店',
    value: '8888',
    time: '刚刚',
    icon: 'local-first',
  },
  {
    name: '成都双流分店',
    value: '6688',
    time: '3分钟前',
    icon: 'local-second',
  },
  {
    name: '成都高新分店',
    value: '2000',
    time: '5分钟前',
    icon: 'local-three',
  },
  {
    name: '成都锦江分店',
    value: '1314',
    time: '10分钟前',
  },
  {
    name: '成都成华分店',
    value: '666',
    time: '12分钟前',
  },
])

const scrollOption = ref({
  step: 0.6,
  autoPlay: true,
})
</script>

<style lang="scss" scoped>
.dynamic-item {
  background-color: var(--el-fill-color);
  box-sizing: border-box;
  padding: 10px 15px;
  margin-bottom: 15px;
  border-radius: 6px;

  .dynamic-item-time {
    font-size: var(--el-font-size-base);
    color: rgb(140, 150, 167);
  }
  .dynamic-item-content {
    font-size: var(--el-font-size-base);
    color: rgb(140, 150, 167);
    .dynamic-item-value {
      margin: 0 2px;
      color: var(--el-text-color-primary);
    }
  }
}
</style>

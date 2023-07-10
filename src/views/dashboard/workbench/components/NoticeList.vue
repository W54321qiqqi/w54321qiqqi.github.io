<template>
  <base-box title="我的通知" :loading="loading">
    <template #extra>
      <base-button type="primary" link>更多</base-button>
    </template>
    <div
      class="notice-item flex items-center justify-center"
      v-for="(item, index) in noticeList"
      :key="index"
    >
      <el-tag :type="item.type === '消息' ? 'warning' : ''">
        {{ item.type }}
      </el-tag>
      <div
        class="notice-item-content ml-3 flex-auto overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {{ item.content }}
      </div>
    </div>
  </base-box>
</template>

<script lang="ts" setup>
import { noticeList } from '../data'
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.notice-item {
  margin-bottom: 12px;
  &:last-of-type {
    margin-bottom: 0;
  }
  .notice-item-content {
    font-size: 14px;
    color: var(--el-text-color-regular);
    cursor: pointer;
  }
}
</style>
../data

<template>
  <el-tooltip placement="bottom" content="消息">
    <div
      class="action-item box-hover flex h-full cursor-pointer items-center justify-center"
    >
      <div class="h-[20px]">
        <el-badge
          :value="count"
          class="flex h-full items-center justify-center"
        >
          <base-icon name="local-remind" class="cursor-pointer" size="20" />
        </el-badge>
      </div>
    </div>
  </el-tooltip>
</template>

<script lang="ts" setup>
const count = ref(6)
</script>

<style scoped></style>

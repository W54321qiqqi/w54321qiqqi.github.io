<template>
  <el-tooltip placement="bottom" content="主题">
    <div
      class="box-hover flex h-[50px] cursor-pointer items-center justify-center"
      @click="toggleTheme"
    >
      <div
        class="header-switch flex cursor-pointer items-center justify-center"
      >
        <div class="header-switch-action absolute" :class="{ dark: isDark }">
          <base-icon
            :name="isDark ? 'local-dark' : 'local-light'"
            size="16px"
          />
        </div>
      </div>
    </div>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { useDark } from '/@/hooks'

const { isDark, toggleTheme } = useDark()
</script>

<style lang="scss" scoped>
.transition {
  transition: all 0.3s;
}
.header-switch {
  margin: 0 8px;
  position: relative;
  width: 40px;
  height: 20px;
  border: 1px solid var(--el-border-color);
  border-radius: 10px;
  @extend .transition;
  .header-switch-action {
    left: 1px;
    top: 0.5px;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    transform: translateX(0);
    background-color: var(--el-bg-color);
    @extend .transition;
    &.dark {
      transform: translateX(20px);
    }
    .base-icon {
      position: absolute;
      left: 1px;
      bottom: 0px;
    }
  }
}
</style>

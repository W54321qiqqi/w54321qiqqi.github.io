<template>
  <div
    class="base-box-container base-box-bg"
    :class="{ shadow, hover }"
    ref="baseBoxRef"
  >
    <div class="base-box-header" v-if="title || $slots.title">
      <div class="flex-row-center justify-between">
        <div
          class="base-box-title flex-row-center flex items-center"
          v-if="!$slots.title"
        >
          {{ title }}
          <el-tooltip
            effect="dark"
            :content="helpText"
            placement="right"
            v-if="showHelp"
          >
            <base-icon
              name="local-help"
              class="base-icon ml-3 cursor-pointer"
            />
          </el-tooltip>
        </div>
        <div class="base-box-extra tr">
          <slot name="extra"></slot>
        </div>
      </div>

      <slot name="title"></slot>
    </div>
    <div class="base-box-content">
      <el-scrollbar :style="getStyle">
        <base-skeleton :loading="loading" is-box>
          <slot></slot>
        </base-skeleton>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isString } from '/@/utils/is'
defineOptions({
  name: 'BaseBox',
})
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  shadow: {
    type: Boolean,
    default: false,
  },
  hover: {
    type: Boolean,
    default: false,
  },
  showHelp: {
    type: Boolean,
    default: false,
  },
  helpIcon: {
    type: String,
    default: 'svg-help',
  },
  helpText: {
    type: String,
    default: '提示',
  },
  maxHeight: {
    type: [Number, String],
  },
  height: {
    type: [Number, String],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const baseBoxRef = ref()

const getStyle = computed(() => {
  const { height, maxHeight } = props
  return {
    height: isString(height) ? height : `${height}px`,
    maxHeight: isString(maxHeight) ? maxHeight : `${maxHeight}px`,
  }
})

defineExpose({
  instance: baseBoxRef,
})
</script>

<style lang="scss" scoped>
.base-box-container {
  overflow: hidden;
  border: 1px solid var(--base-tag-border);
  border-radius: 4px;
  transition: var(--el-transition-duration);

  &.hover:hover,
  &.shadow {
    box-shadow: var(--el-box-shadow-light);
  }

  & + .base-box-container {
    margin-top: 16px;
  }

  .base-box-header {
    padding: 16px 24px;
    font-size: 16px;
    font-weight: 500;
    color: var(--el-text-color-primary);
    border-bottom: 1px solid rgb(175 175 175 / 30%);
  }

  .base-box-content {
    box-sizing: border-box;
    padding: 25px;
  }
}
</style>

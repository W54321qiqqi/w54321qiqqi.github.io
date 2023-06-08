<template>
  <div id="icon-selector-mask" :class="{ masking: show }">
    <div class="icon-selector-wrapper">
      <div class="tips">
        <div class="tip">
          <el-tag type="info" size="large">Alt + S</el-tag>
          <el-tag type="info" size="large">唤醒图标选择器</el-tag>
        </div>
        <div class="tip">
          <el-tag type="info" size="large">ESC</el-tag>
          <el-tag type="info" size="large">退出</el-tag>
        </div>
      </div>
      <el-popover
        :placement="placement"
        trigger="focus"
        :hide-after="0"
        :width="state.selectorWidth"
        :visible="state.popoverVisible"
      >
        <div
          @mouseover.stop="state.iconSelectorMouseover = true"
          @mouseout.stop="state.iconSelectorMouseover = false"
          class="icon-selector"
        >
          <transition name="el-zoom-in-center">
            <div class="icon-selector-box">
              <div class="selector-header">
                <div class="selector-title">
                  {{ title ? title : '请选择图标' }}
                </div>
                <div class="selector-tab">
                  <span
                    title="Element Puls 图标"
                    @click="onChangeTab('ele')"
                    :class="{ acive: state.iconType == 'ele' }"
                  >
                    ele
                  </span>
                  <span
                    title="Font Awesome 图标"
                    @click="onChangeTab('awe')"
                    :class="{ acive: state.iconType == 'awe' }"
                  >
                    awe
                  </span>
                  <span
                    title="阿里 Iconfont 图标"
                    @click="onChangeTab('ali')"
                    :class="{ acive: state.iconType == 'ali' }"
                  >
                    ali
                  </span>
                  <span
                    title="本地图标:/src/assets/icons中的.svg"
                    @click="onChangeTab('local')"
                    :class="{ acive: state.iconType == 'local' }"
                  >
                    local
                  </span>
                </div>
              </div>
              <div class="selector-body">
                <el-scrollbar ref="selectorScrollbarRef">
                  <div v-if="renderFontIconNames.length > 0">
                    <div
                      class="icon-selector-item"
                      :title="item"
                      @click="onIcon(item)"
                      v-for="(item, key) in renderFontIconNames"
                      :key="key"
                    >
                      <Icon :name="item" />
                    </div>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </transition>
        </div>
        <template #reference>
          <el-input
            v-model="state.inputValue"
            :size="size"
            :disabled="disabled"
            placeholder="搜索图标"
            ref="selectorInput"
            @focus="onInputFocus"
            @blur="onInputBlur"
            :class="'size-' + size"
          >
            <template #prepend>
              <div class="icon-prepend">
                <Icon
                  :key="'icon' + state.iconKey"
                  :name="
                    state.prependIcon
                      ? state.prependIcon
                      : state.defaultModelValue
                  "
                />
                <div v-if="showIconName" class="name">
                  {{
                    state.prependIcon
                      ? state.prependIcon
                      : state.defaultModelValue
                  }}
                </div>
              </div>
            </template>
            <template #append>
              <Icon @click="onInputRefresh" name="el-icon-RefreshRight" />
            </template>
          </el-input>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { reactive, ref, onMounted, nextTick, watch, computed } from 'vue'
import {
  getAwesomeIconfontNames,
  getIconfontNames,
  getElementPlusIconfontNames,
  getLocalIconfontNames,
} from '/@/utils/iconfont'
import { useEventListener } from '@vueuse/core'
import { Placement } from 'element-plus'

type IconType = 'ele' | 'awe' | 'ali' | 'local'

interface Props {
  show: boolean
  size?: 'default' | 'small' | 'large'
  disabled?: boolean
  title?: string
  type?: IconType
  placement?: Placement
  modelValue?: string
  showIconName?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  show: false,
  size: 'default',
  disabled: false,
  title: '',
  type: 'ele',
  placement: 'bottom',
  modelValue: '',
  showIconName: false,
})

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const selectorInput = ref()
const selectorScrollbarRef = ref()
const state: {
  iconType: IconType
  selectorWidth: number
  popoverVisible: boolean
  inputFocus: boolean
  iconSelectorMouseover: boolean
  fontIconNames: string[]
  inputValue: string
  prependIcon: string
  defaultModelValue: string
  iconKey: number
} = reactive({
  iconType: props.type,
  selectorWidth: 0,
  popoverVisible: false,
  inputFocus: false,
  iconSelectorMouseover: false,
  fontIconNames: [],
  inputValue: '',
  prependIcon: props.modelValue,
  defaultModelValue: props.modelValue || 'el-icon-Minus',
  iconKey: 0, // 给icon标签准备个key，以随时使用 h 函数重新生成元素
})

const onInputFocus = () => {
  state.inputFocus = state.popoverVisible = true
}
const onInputBlur = () => {
  state.inputFocus = false
  state.popoverVisible = state.iconSelectorMouseover
}
const onInputRefresh = () => {
  state.iconKey++
  state.prependIcon = state.defaultModelValue
  state.inputValue = ''
  emits('update:modelValue', state.defaultModelValue)
  emits('change', state.defaultModelValue)
}
const onChangeTab = (name: IconType) => {
  state.iconType = name
  state.fontIconNames = []
  if (name == 'ele') {
    getElementPlusIconfontNames().then((res) => {
      state.fontIconNames = res
    })
  } else if (name == 'awe') {
    getAwesomeIconfontNames().then((res) => {
      state.fontIconNames = res.map((name) => `fa ${name}`)
    })
  } else if (name == 'ali') {
    getIconfontNames().then((res) => {
      state.fontIconNames = res.map((name) => `iconfont ${name}`)
    })
  } else if (name == 'local') {
    getLocalIconfontNames().then((res) => {
      state.fontIconNames = res
    })
  }
}
const onIcon = (icon: string) => {
  state.iconSelectorMouseover = state.popoverVisible = false
  state.iconKey++
  state.prependIcon = icon
  state.inputValue = ''
  emits('update:modelValue', icon)
  emits('change', icon)
  nextTick(() => {
    selectorInput.value.blur()
  })
}

const renderFontIconNames = computed(() => {
  if (!state.inputValue) return state.fontIconNames

  let inputValue = state.inputValue.trim().toLowerCase()
  return state.fontIconNames.filter((icon: string) => {
    if (icon.toLowerCase().indexOf(inputValue) !== -1) {
      return icon
    }
  })
})

// 获取 input 的宽度
const getInputWidth = () => {
  nextTick(() => {
    state.selectorWidth =
      selectorInput.value.$el.offsetWidth < 260
        ? 260
        : selectorInput.value.$el.offsetWidth
    console.log(
      '🚀 ~ file: iconSelector.vue:236 ~ nextTick ~ state.selectorWidth:',
      state.selectorWidth,
    )
  })
}

const popoverVisible = () => {
  state.popoverVisible =
    state.inputFocus || state.iconSelectorMouseover ? true : false
}

watch(
  () => props.modelValue,
  () => {
    state.iconKey++
    if (props.modelValue != state.prependIcon)
      state.defaultModelValue = props.modelValue
    if (props.modelValue == '') state.defaultModelValue = 'el-icon-Minus'
    state.prependIcon = props.modelValue
  },
)
onMounted(() => {
  getInputWidth()
  useEventListener(document, 'click', popoverVisible)
  getElementPlusIconfontNames().then((res) => {
    state.fontIconNames = res
  })
})
</script>

<style scoped lang="scss">
.icon-selector-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
  margin: 10vh auto;
}

.size-small {
  height: 24px;
}

.size-large {
  height: 40px;
}

.size-default {
  height: 32px;
}

.icon-prepend {
  display: flex;
  align-items: center;
  justify-content: center;

  .name {
    padding-left: 5px;
  }
}

.selector-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.selector-tab {
  margin-left: auto;

  span {
    padding: 0 5px;
    cursor: pointer;
    user-select: none;

    &.active,
    &:hover {
      color: var(--el-color-primary);
      text-decoration: underline;
    }
  }
}

.selector-body {
  height: 500px;
}

.icon-selector-item {
  display: inline-block;
  padding: 10px 10px 6px;
  margin: 3px;
  font-size: 18px;
  cursor: pointer;
  border: 1px solid var(--ba-border-color);
  border-radius: var(--el-border-radius-base);

  .icon {
    width: 18px;
    height: 18px;
  }

  &:hover {
    outline: 1px solid var(--el-color-primary);
  }

  :deep(.el-input-group__prepend) {
    padding: 0 10px;
  }

  :deep(.el-input-group__append) {
    padding: 0 10px;
  }
}

#icon-selector-mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  visibility: hidden;
  background-image: radial-gradient(transparent 1px, rgb(0 0 0 / 30%) 1px);
  background-size: 4px 4px;
  opacity: 0;
  transition: all 0.2s;
  backdrop-filter: saturate(50%) blur(4px);

  &.masking {
    visibility: visible;
    opacity: 1;
  }
}
.tips {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  font-weight: bold;
  .tip {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 20px;

    .el-tag {
      margin: 0 5px;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>

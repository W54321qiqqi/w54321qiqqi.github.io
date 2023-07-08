<template>
  <div
    :class="
      getTagFullscreen ? 'layout-tag-wrapper-fullscreen' : 'layout-tag-wrapper'
    "
    class="layout-filter"
  >
    <div class="tag-view-content flex flex-auto">
      <!-- 左箭头 -->
      <base-icon
        :name="leftIcon"
        class="tag-arrow tag-shadow"
        :class="{ disabled: leftDisabled }"
        v-if="initArrow"
        @click="handleScroll(number)"
      />
      <div
        class="scroll-outer flex-auto"
        :class="{ 'no-arrow': !initArrow }"
        ref="scrollOuterRef"
        @mousewheel="handleMouseWheel"
      >
        <div
          class="scroll-body absolute flex h-full items-center justify-center"
          ref="scrollBodyRef"
          :style="{ transform: `translateX(${tagBodyLeft}px)` }"
        >
          <slot name="item"></slot>
        </div>
      </div>
      <!-- 右箭头 -->
      <base-icon
        :name="rightIcon"
        class="tag-arrow tag-shadow"
        :class="{ disabled: rightDisabled }"
        v-if="initArrow"
        @click="handleScroll(-number)"
      />
    </div>
    <!-- tag的操作插槽 -->
    <slot name="action"></slot>
  </div>
</template>

<script lang="ts" setup>
import { useMenuSetting } from '../hooks/useMenuSetting'
import { useTagViewSetting } from '../hooks/useTagViewSetting'
const { getSideWidth, getCollapse, getSideCollapsed } = useMenuSetting()
const { getTagFullscreen } = useTagViewSetting()
const paddingLeft = computed(() => {
  const padding = 16
  const sideWidth = unref(getCollapse)
    ? unref(getSideCollapsed)
    : unref(getSideWidth)
  return `${(sideWidth as number) + padding}px`
})
const props = defineProps({
  // 是否开启
  iconScroll: {
    type: Boolean,
    default: true,
  },
  leftIcon: {
    type: String,
    default: 'el-icon-ArrowLeft',
  },
  rightIcon: {
    type: String,
    default: 'el-icon-ArrowRight',
  },
  // 鼠标滚动是否开启
  wheelScroll: {
    type: Boolean,
    default: true,
  },
  number: {
    type: Number,
    default: 240,
  },
})

const router = useRouter()

const scrollOuterRef = ref()

const scrollBodyRef = ref()

// 根据这个去移动tag的位置
const tagBodyLeft = ref(0)

const showArrow = ref(false)
// if(unref(getTagFullscreen)){

// }
const initArrow = computed(() => {
  return unref(showArrow) && props.iconScroll
})

/**
 * 向左 disabled
 */
const leftDisabled = computed(() => {
  return unref(tagBodyLeft) === 0
})

/**
 * 向右 disabled
 */
const rightDisabled = computed(() => {
  return (
    unref(tagBodyLeft) <=
    unref(scrollOuterRef)?.offsetWidth - unref(scrollBodyRef)?.offsetWidth
  )
})

/**
 * 滚动
 * @param {Number} val
 */
const handleScroll = (val: number) => {
  if (val > 0 && unref(leftDisabled)) {
    return
  }
  if (val < 0 && unref(rightDisabled)) {
    return
  }
  if (val > 0) {
    setBodyLeft(Math.min(0, unref(tagBodyLeft) + val))
  } else {
    setBodyLeft(
      Math.max(
        unref(tagBodyLeft) + val,
        unref(scrollOuterRef)?.offsetWidth - unref(scrollBodyRef)?.offsetWidth,
      ),
    )
  }
}

const setBodyLeft = (val: number) => {
  tagBodyLeft.value = val
}

/**
 * 移动tag
 */
const moveToTag = async ({
  tagList,
  refList,
}: {
  tagList: any[]
  refList: any[]
}) => {
  const index = tagList.findIndex(
    (item) => item.path === unref(router.currentRoute).path,
  )
  if (index === -1) return

  showArrow.value =
    unref(scrollBodyRef)?.offsetWidth >= unref(scrollOuterRef)?.offsetWidth
  if (!unref(showArrow)) {
    setBodyLeft(0)
    return
  }

  await nextTick()
  const scrollOuterWidth = unref(scrollOuterRef)?.offsetWidth
  const scrollBodyWidth = unref(scrollBodyRef)?.offsetWidth

  // 当前是第一个
  if (index === 0) {
    setBodyLeft(0)
    return
  }

  // 当前是最后一个
  if (index === refList.length - 1) {
    setBodyLeft(scrollOuterWidth - scrollBodyWidth)
    return
  }

  const currentTag = refList[index]

  const eleLeft = refList.slice(0, index).reduce((t, c) => {
    return t + parseFloat(c?.$el?.offsetWidth + 12)
  }, 0)

  const eleWidth = eleLeft + currentTag?.$el?.offsetWidth

  // close icon width
  if (eleWidth > scrollOuterWidth) {
    setBodyLeft(Math.max(-eleLeft, scrollOuterWidth - scrollBodyWidth - 20))
  } else {
    setBodyLeft(0)
  }
}

/**
 * 鼠标滚动
 * @param {Event} e
 */
const handleMouseWheel = (e: any) => {
  if (!unref(showArrow) || !props.wheelScroll) return
  handleScroll(e.wheelDelta / 2)
  preventDefaultMouseWheel(e)
}
const preventDefaultMouseWheel = (event: TouchEvent) => {
  event.preventDefault()
}
onMounted(() => {
  document.addEventListener('touchmove', preventDefaultMouseWheel, false)
})
onBeforeUnmount(() => {
  document.removeEventListener('touchmove', preventDefaultMouseWheel, false)
})
// 绑定事件;/
defineExpose({
  moveToTag,
  setBodyLeft,
})
</script>

<style lang="scss" scoped>
.layout-tag-wrapper {
  width: calc(100% - v-bind(paddingLeft));
}
@media (max-width: 992px) {
  .layout-tag-wrapper {
    width: 100%;
  }
}
</style>

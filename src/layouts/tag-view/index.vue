<template>
  <tag-scroll ref="tagScrollRef">
    <template #item>
      <tag-action
        trigger="contextmenu"
        v-for="item in getTagList"
        :key="item.fullPath"
        :tag-item="item"
        is-tab
        :ref="setTagActionRef"
        @close-all="handleCloseTagAction"
      >
        <tag-item
          :tag="item"
          :ref="setTagWrapperRef"
          :closed="!isAffix(item) || getTagList.length !== 1"
          @close="closeTag"
        ></tag-item>
      </tag-action>
    </template>
    <template #action>
      <div class="tag-action tag-shadow flex items-center justify-center">
        <tag-fullscreen />
        <tag-action><base-icon name="el-icon-ArrowDown" /></tag-action>
      </div>
    </template>
  </tag-scroll>
</template>
<script setup lang="ts">
import { useTagViewSetting } from '../hooks/useTagViewSetting'
import { useResizeObserver, useDebounceFn } from '@vueuse/core'
import tagScroll from './tag-scroll.vue'
import tagItem from './tag-item.vue'
import tagAction from './tag-action.vue'
import tagFullscreen from './tag-fullscreen.vue'
const route = useRoute()
const tagScrollRef = ref()
const { getTagList, closeTag, addTag, initTags } = useTagViewSetting()
const isAffix = (route: any) => route.meta && route.meta.affix
const tagWrapperRefList = ref<any[]>([])
const tagActionRefList = ref<any[]>([])
initTags()
const setTagWrapperRef = (el: any) => {
  tagWrapperRefList.value.push(el)
}
const setTagActionRef = (el: any) => {
  tagActionRefList.value.push(el)
}
async function handleMoveTag() {
  await nextTick()

  unref(tagScrollRef).moveToTag({
    tagList: unref(getTagList),
    refList: unref(tagWrapperRefList),
  })
}

const handleCloseTagAction = () => {
  tagActionRefList.value.forEach((item) => {
    item?.close?.()
  })
}
useResizeObserver(
  tagScrollRef,
  useDebounceFn(() => {
    handleMoveTag()
  }, 200),
)
watch(
  () => route.path,
  () => {
    addTag(route)
    handleMoveTag()
  },
  {
    deep: true,
    immediate: true,
  },
)
watch(
  getTagList,
  () => {
    handleMoveTag()
  },
  {
    deep: true,
  },
)
</script>

<style scoped lang="scss">
.tag-action {
  height: 100%;
  :deep(.base-icon) {
    height: 100%;
    width: 36px;
  }
  :deep(.base-icon:first-of-type) {
    padding: 0 9px;
  }
}
</style>

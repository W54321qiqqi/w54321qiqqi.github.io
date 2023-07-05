<template>
  <tag-scroll ref="tagScrollRef">
    <template #item>
      <div v-for="item in getTagList" :key="item.fullPath">
        <tag-item
          :tag="item"
          :ref="setTagWrapperRef"
          :closed="!isAffix(item) || getTagList.length !== 1"
          @close="closeTag"
        ></tag-item>
      </div>
    </template>
  </tag-scroll>
</template>
<script setup lang="ts">
import { useTagViewSetting } from '../hooks/useTagViewSetting'
import { useResizeObserver, useDebounceFn } from '@vueuse/core'
import tagScroll from './tag-scroll.vue'
import tagItem from './tag-item.vue'
const route = useRoute()
const tagScrollRef = ref()
const { getTagList, closeTag, addTag, initTags } = useTagViewSetting()
const isAffix = (route: any) => route.meta && route.meta.affix
initTags()
const tagWrapperRefList = ref<any[]>([])
const setTagWrapperRef = (el: any) => {
  tagWrapperRefList.value.push(el)
}

async function handleMoveTag() {
  await nextTick()

  unref(tagScrollRef).moveToTag({
    tagList: unref(getTagList),
    refList: unref(tagWrapperRefList),
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

<style scoped lang="scss"></style>

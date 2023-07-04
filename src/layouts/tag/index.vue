<template>
  <tag-scroll>
    <template #item>
      <div v-for="item in getTagList" :key="item.fullPath">
        <tag-item
          :tag="item"
          :ref="setTagWrapperRef"
          :closed="getTagList.length !== 1"
          @close="closeTag"
        ></tag-item>
      </div>
    </template>
  </tag-scroll>
</template>
<script setup lang="ts">
import tagScroll from './tag-scroll.vue'
import tagItem from './tag-item.vue'
import { useTagViewSetting } from '../hooks/useTagViewSetting'
const route = useRoute()
const setTagWrapperRef = ref()
const { getTagList, closeTag, addTag } = useTagViewSetting()
watch(
  () => route.path,
  () => {
    addTag(route)
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<style scoped lang="scss"></style>

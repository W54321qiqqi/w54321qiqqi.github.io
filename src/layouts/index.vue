<template>
  <el-container class="layout-container">
    <layout-header v-show="!getTagFullscreen" />
    <tag-view />
    <side-bar v-show="!getTagFullscreen"></side-bar>
    <el-container>
      <layout-main />
    </el-container>
  </el-container>
  <base-backtop :bottom="60" />
</template>

<script lang="ts" setup>
import sideBar from './side-bar/index.vue'
import layoutHeader from './header/index.vue'
import layoutMain from './main/index.vue'
import tagView from './tag-view/index.vue'
import { useTagViewSetting } from '/@/layouts/hooks/useTagViewSetting'
const { getTagFullscreen } = useTagViewSetting()
</script>

<style scoped lang="scss">
.layout-container {
  flex-direction: column;
}
</style>

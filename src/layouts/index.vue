<template>
  <el-container>
    <layout-header />
    <el-container>
      <side-bar></side-bar>
      <layout-main />
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import sideBar from './side-bar/index.vue'
import layoutHeader from './header/index.vue'
import layoutMain from './main/index.vue'
</script>

<style scoped lang="scss"></style>

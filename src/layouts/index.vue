<template>
  <el-container>
    <layout-header />
    <side-bar></side-bar>
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
</script>

<style scoped lang="scss"></style>

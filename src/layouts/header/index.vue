<template>
  <header class="layout-filter layout-header-fixed">
    <Logo title="V3 Template" />
    <div class="flex flex-grow items-center justify-between">
      <div class="flex items-center justify-between">
        <Hamburger></Hamburger>
        <Breadcrumb></Breadcrumb>
      </div>
      <div class="flex h-[50px] items-center justify-between">
        <header-search></header-search>
        <Notification></Notification>
        <header-fullscreen></header-fullscreen>
        <header-switch></header-switch>
        <User />
        <!-- TODO:setting -->
        <base-icon
          name="local-setting"
          color="#000"
          size="18px"
          class="mx-3 cursor-pointer"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb.vue'
import Logo from './logo.vue'
import Hamburger from './hamburger.vue'
import HeaderSwitch from './header-switch.vue'
import HeaderFullscreen from './header-fullscreen.vue'
import HeaderSearch from './header-search/index.vue'
import Notification from './notification.vue'
import User from './user.vue'
</script>

<style scoped lang="scss">
:deep(.action-item) {
  padding: 0 12px;
}
:deep(.box-hover) {
  height: 100%;
  &:hover {
    background: var(--base-header-box-hover);
  }
}
</style>

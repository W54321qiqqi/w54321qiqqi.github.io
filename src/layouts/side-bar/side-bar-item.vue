<template>
  <!-- 单级菜单 -->
  <template v-if="!item?.children || item?.meta?.hideChildren">
    <el-menu-item
      :index="resolvePath(item.redirect ?? item.path)"
      :title="item?.meta?.title"
      v-if="!item?.meta?.hidden"
      @click="handleMenuClick(item)"
    >
      <template #title>
        <base-icon :name="item?.meta?.icon" style="margin-right: 6px" />
        <span class="text-hidden">{{ item?.meta?.title }}</span>
      </template>
    </el-menu-item>
  </template>
  <!-- 多级菜单 -->
  <el-sub-menu
    v-else
    :index="resolvePath(item.path)"
    :title="item?.meta?.title"
    :show-timeout="0"
    :hide-timeout="0"
  >
    <template #title>
      <base-icon :name="item?.meta?.icon" style="margin-right: 6px" />
      <span class="text-hidden">{{ item?.meta?.title }}</span>
    </template>
    <side-bar-item
      v-for="child in item.children"
      :key="child.path"
      :item="child"
      :base-path="resolvePath(item?.path)"
    />
  </el-sub-menu>
</template>

<script lang="ts" setup>
import { AppRouteType } from '/@/router/types'
import pathBrowserify from 'path-browserify'
import { isExternal } from '/@/utils/common'
import { PropType } from 'vue'
const props = defineProps({
  item: {
    type: Object as PropType<AppRouteType>,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {},
  },
  basePath: {
    type: String,
    default: '',
  },
})

const resolvePath = (path: string): string => {
  if (isExternal(path as string)) {
    return path
  }
  if (props.basePath) {
    return pathBrowserify.join(props.basePath, path)
  }

  return path
}

const handleMenuClick = (val: AppRouteType) => {
  if (isExternal(val.path)) {
    window.open(val.path)
  }
}
</script>

<style scoped lang="scss"></style>

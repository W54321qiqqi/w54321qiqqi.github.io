<template>
  <div class="icons-wrapper">
    <base-box title="图标选择器" showHelp helpText="选择图标可复制代码">
      <div class="w-[300px]"><icon-selector @change="selectIcon" /></div>
    </base-box>
    <base-box title="Element Puls 图标" showHelp helpText="点击图标可复制代码">
      <div class="icon-list">
        <div
          class="icon-item"
          v-for="(item, index) in state.eleIcon"
          :key="index"
          @click="selectIcon(item)"
          :title="item"
        >
          <base-icon :name="item" />
        </div>
      </div>
    </base-box>
    <base-box
      title="本地图标:/src/assets/icons中的.svg"
      showHelp
      helpText="点击图标可复制代码"
    >
      <div class="icon-list">
        <div
          class="icon-item"
          v-for="(item, key) in state.localIcon"
          :key="key"
          @click="selectIcon(item)"
        >
          <base-icon :name="item" />
        </div>
      </div>
    </base-box>
    <base-box title="阿里 Iconfont 图标" showHelp helpText="点击图标可复制代码">
      <div class="icon-list">
        <div
          class="icon-item"
          v-for="(item, key) in state.iconfontIcon"
          :key="key"
          @click="selectIcon(item)"
          :title="item"
        >
          <base-icon :name="item" />
        </div>
      </div>
    </base-box>
    <base-box title="Font Awesome 图标" showHelp helpText="点击图标可复制代码">
      <div class="icon-list">
        <div
          class="icon-item"
          v-for="(item, key) in state.awesomeIcon"
          :key="key"
          @click="selectIcon(item)"
          :title="item"
        >
          <base-icon :name="item" />
        </div>
      </div>
    </base-box>
  </div>
</template>

<script setup lang="ts">
import iconSelector from '/@/components/base-icon/icon-selector.vue'
import {
  getAwesomeIconfontNames,
  getIconfontNames,
  getElementPlusIconfontNames,
  getLocalIconfontNames,
} from '/@/utils/iconfont'
interface IconNames {
  localIcon: string[]
  iconfontIcon: string[]
  awesomeIcon: string[]
  eleIcon: string[]
}
const state = reactive<IconNames>({
  localIcon: [],
  iconfontIcon: [],
  awesomeIcon: [],
  eleIcon: [],
})

getLocalIconfontNames().then((res) => {
  state.localIcon = res
})
getIconfontNames().then((res) => {
  state.iconfontIcon = res.map((name) => `iconfont ${name}`)
})
getAwesomeIconfontNames().then((res) => {
  state.awesomeIcon = res.map((name) => `fa ${name}`)
})
getElementPlusIconfontNames().then((res) => {
  state.eleIcon = res
})
const selectIcon = (iconName: string) => {
  copyValue(iconName)
}
const copyValue = (value: string) => {
  const dealValue = `<base-icon name="${value}" color="#000" size="18px" />`
  navigator.clipboard.writeText(dealValue).then(
    () => {
      ElMessage.success(`${dealValue}`)
    },
    () => {
      ElMessage.error(`复制 失败`)
    },
  )
}
</script>

<style scoped lang="scss">
.icon-list {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 92px;
  border-top: 1px solid var(--el-border-color);
  border-left: 1px solid var(--el-border-color);
  border-radius: 4px;

  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--el-text-color-regular);
    cursor: pointer;
    border-right: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
    transition: all 0.2s;

    &:hover {
      color: var(--el-text-color-primary);
      background-color: var(--el-border-color-extra-light);
    }
  }
}
</style>

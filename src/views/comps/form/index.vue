<template>
  <base-page>
    <base-box title="默认form">
      <base-form
        :columns="FormColumn"
        :model="options"
        inline
        :colProps="{ span: 6 }"
      >
        <template #slot>
          <el-color-picker v-model="options.color" />
        </template>
      </base-form>
    </base-box>
    <base-box title="收缩自适应form">
      <base-filter :columns="FormColumn" :search-info="options" show-open>
        <template #slot>
          <el-color-picker v-model="options.color" />
        </template>
      </base-filter>
    </base-box>
    <base-box title="动态form">
      <base-form
        :columns="FormColumn2"
        :model="options"
        inline
        :colProps="{ span: 6 }"
      >
        <template #slot>
          <el-color-picker v-model="options.color" />
        </template>
      </base-form>
    </base-box>
  </base-page>
</template>

<script lang="ts" setup>
import { FormColumn, FormColumn2 } from './formColums'

const options = reactive({
  color: '',
})
</script>

<style lang="scss" scoped></style>

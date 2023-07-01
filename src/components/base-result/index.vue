<template>
  <el-result :title="title" :sub-title="subTitle" :icon="status">
    <template #icon v-if="isSlot">
      <slot name="icon"></slot>
    </template>
    <template #extra>
      <slot name="extra"></slot>
      <base-button v-if="!$slots.extra" type="primary" @click="goRedirect">
        {{ goHome ? '返回首页' : returnText }}
      </base-button>
    </template>
  </el-result>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'BaseResult',
})
const props = withDefaults(
  defineProps<{
    status?: 'success' | 'warning' | 'info' | 'error'
    title?: string
    subTitle?: string
    returnText?: string
    goHome?: boolean
    isSlot?: boolean
  }>(),
  {
    status: 'info',
    title: '',
    subTitle: '',
    returnText: '返回上一页',
    goHome: false,
    isSlot: false,
  },
)

const router = useRouter()

const goRedirect = () => {
  if (props.goHome) {
    router.replace('/')
  } else {
    router.go(-1)
  }
}
</script>

<style scoped></style>

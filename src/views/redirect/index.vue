<template>
  <base-page>
    <div class="page-redirect-container"></div>
  </base-page>
</template>

<script lang="ts" setup>
import { omit } from '/@/utils/common'
import { useLoading } from '/@/hooks'

const route = useRoute()
const router = useRouter()

const { open, close } = useLoading({ modal: false })
open()

setTimeout(() => {
  close()
  router.replace({
    path: route.query.path as string,
    query: {
      ...omit(route.query, 'path'),
    },
  })
}, 700)
</script>

<style scoped></style>

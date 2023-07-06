<template>
  <base-icon
    name="el-icon-RefreshRight"
    class="tag-refresh-border cursor-pointer"
    @click="refreshPage"
  />
</template>

<script lang="ts" setup>
import { useTagStoreWithOut } from '/@/store/modules/tagView'
const tagStore = useTagStoreWithOut()
const router = useRouter()
const refreshPage = async () => {
  await tagStore.refreshPage(router)
}
</script>

<style scoped></style>

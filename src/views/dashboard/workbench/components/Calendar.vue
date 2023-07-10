<template>
  <base-box title="任务日历" :loading="loading">
    <el-calendar v-model="value" class="custom-calendar" ref="calendarRef">
      <template #header="{ date }">
        <div class="flex w-full justify-between">
          <div>
            <base-icon
              name="el-icon-DArrowLeft"
              class="cursor-pointer"
              @click="selectDate('prev-year')"
            />
            <base-icon
              name="el-icon-ArrowLeft"
              class="ml5 cursor-pointer"
              @click="selectDate('prev-month')"
            />
          </div>
          {{ date }}
          <div>
            <base-icon
              name="el-icon-ArrowRight"
              class="mr5 cursor-pointer"
              @click="selectDate('next-month')"
            />
            <base-icon
              name="el-icon-DArrowRight"
              class="cursor-pointer"
              @click="selectDate('next-year')"
            />
          </div>
        </div>
      </template>
      <template #date-cell="{ data }">
        <div>
          {{ data.day.split('-')[2] }}
        </div>
      </template>
    </el-calendar>
  </base-box>
</template>

<script lang="ts" setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const calendarRef = ref()

const value = ref(new Date())

const selectDate = (val: string) => {
  calendarRef.value.selectDate(val)
}
</script>

<style lang="scss" scoped>
.custom-calendar {
  :deep(.el-calendar-table tr td) {
    border: 0;
  }
  :deep(.el-calendar-table .el-calendar-day) {
    height: 38px;
    padding: 8px 14px;
  }
}
</style>

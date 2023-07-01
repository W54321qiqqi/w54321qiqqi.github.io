<template>
  <el-backtop v-bind="props" @click="click">
    <div class="left"></div>
    <div class="right"></div>
    <div class="bottom"></div>
  </el-backtop>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BaseBacktop',
})
const props = withDefaults(
  defineProps<{
    bottom?: number
    right?: number
    target?: string
    visibilityHeight?: number
  }>(),
  {
    bottom: 40,
    target: '',
    right: 40,
    visibilityHeight: 200,
  },
)
const emit = defineEmits(['click'])
const click = (evt: MouseEvent) => {
  emit('click', evt)
}
</script>

<style scoped lang="scss">
.el-backtop {
  width: 25px;
  height: 40px;
  background: linear-gradient(whitesmoke, darkgray);
  border-radius: 50% / 70% 70% 5% 5%;
  .bottom {
    position: absolute;
    width: 15px;
    height: 5px;
    top: 38px;
    left: 5px;
    background-color: #8a6b6a;
    border-radius: 20%;
    &::before {
      content: '';
      position: absolute;
      top: 90%;
      left: 0;
      width: 15px;
      height: 15px;
      border-radius: 0 0 100% 100%;
      background-image: linear-gradient(
        to bottom,
        rgb(255, 255, 0),
        transparent 70%
      );
    }
  }
  .left {
    position: absolute;
    width: 5px;
    height: 10px;
    top: 45%;
    left: -10%;
    background: #ec2825;
    border-radius: 12px 0 50% 100%;
  }
  .right {
    position: absolute;
    width: 5px;
    height: 10px;
    top: 45%;
    right: -10%;
    background: #ec2825;
    border-radius: 0 12px 100% 50%;
  }
}
</style>

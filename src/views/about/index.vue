<!-- eslint-disable no-undef -->
<template>
  <base-page>
    <base-box title="项目描述">
      <div class="description">
        <span class="text-[#4468f3]">V3-Template</span>
        使用Vue3+Element-Plus+Vite4+TypeScript+Pinia搭建的后台管理系统，内置了许多开箱即用的组件，持续更新中，欢迎的你的使用和提出意见。
      </div>
    </base-box>

    <base-box title="项目信息">
      <el-descriptions :column="3" border>
        <el-descriptions-item label="系统名称">
          {{ pkg.name }}
        </el-descriptions-item>
        <el-descriptions-item label="版本">
          <el-tag>{{ pkg.version }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="最后打包时间">
          <el-tag>{{ lastBuildTime }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="预览地址">
          <a
            href="https://gist006.gitee.io/vue3-basic-admin"
            target="_blank"
            class="color-primary"
          >
            预览地址
          </a>
        </el-descriptions-item>
        <el-descriptions-item label="github地址">
          <a
            href="https://github.com/W54321qiqqi/V3-Template"
            target="_blank"
            class="color-primary"
          >
            查看地址
          </a>
        </el-descriptions-item>
        <el-descriptions-item label="gitee地址">
          <a
            href="https://gitee.com/menon-qiqi/simple_admin_template"
            target="_blank"
            class="color-primary"
          >
            查看地址
          </a>
        </el-descriptions-item>
      </el-descriptions>
    </base-box>

    <base-box title="开发环境依赖">
      <el-descriptions :column="3" border>
        <el-descriptions-item
          v-for="item in devDependencies"
          :key="item.fieldDesc"
          :label="item.fieldDesc"
        >
          {{ item.fieldName }}
        </el-descriptions-item>
      </el-descriptions>
    </base-box>

    <base-box title="生产环境依赖">
      <el-descriptions :column="3" border>
        <el-descriptions-item
          v-for="item in dependencies"
          :key="item.fieldDesc"
          :label="item.fieldDesc"
        >
          {{ item.fieldName }}
        </el-descriptions-item>
      </el-descriptions>
    </base-box>
  </base-page>
</template>

<script lang="ts" setup>
// eslint-disable-next-line no-undef
const { pkg, lastBuildTime } = __APP_INFO__

const devDependencies: any[] = []
const dependencies: any[] = []

Object.keys(pkg.devDependencies).forEach((key) => {
  devDependencies.push({ fieldName: pkg.devDependencies[key], fieldDesc: key })
})

Object.keys(pkg.dependencies).forEach((key) => {
  dependencies.push({ fieldName: pkg.dependencies[key], fieldDesc: key })
})
</script>

<style lang="scss" scoped>
.description {
  line-height: 28px;
}
.color-primary {
  color: var(--el-color-primary);
}
</style>

import type { PluginOption, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from './autoImportPlugin'
import Components from './componentsPlugin'
import VueDevTools from 'vite-plugin-vue-devtools'
import { createWarmup } from './warmupPligin'
import { svgBuildPlugin } from './svgBuildPlugin'
import { configMockPlugin } from './mock'
import { viteBuildInfo } from './viteBuildInfo'
import { createVisualizer } from './visualizer'
import { createCompression } from './compression'
import { createImagemin } from './imagemin'
export default function createVitePlugins(
  viteEnv: Record<string, string>,
  isBuild = false,
) {
  const { VITE_BUILD_IMAGEMIN, VITE_BUILD_REPORT } = viteEnv
  const isReport = VITE_BUILD_REPORT === 'true'
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    VueDevTools(),
    vueJsx({}),
    AutoImport,
    Components,
    // 预加载
    createWarmup(),
    // svg插件
    svgBuildPlugin('./src/assets/icons/'),
    configMockPlugin(isBuild),
    // 打包信息插件
    viteBuildInfo(),
  ]
  // gizp,br打包压缩
  if (isBuild) {
    vitePlugins.push(createCompression(viteEnv))
    VITE_BUILD_IMAGEMIN === 'true' && vitePlugins.push(createImagemin())
  }

  if (isReport) {
    // 打包分析
    vitePlugins.push(createVisualizer() as Plugin)
  }
  return vitePlugins
}

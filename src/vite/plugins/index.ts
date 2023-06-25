import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from './autoImportPlugin'
import Components from './componentsPlugin'
import { svgBuildPlugin } from './svgBuildPlugin'
import { configMockPlugin } from './mock'
export default function createVitePlugins(
  viteEnv: Record<string, string>,
  isBuild = false,
) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    AutoImport,
    Components,
    svgBuildPlugin('./src/assets/icons/'),
    configMockPlugin(isBuild),
  ]
  return vitePlugins
}

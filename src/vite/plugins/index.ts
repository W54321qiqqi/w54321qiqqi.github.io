import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from './autoImportPlugin'
import Components from './componentsPlugin'
import { svgBuilder } from '/@/components/icon/svg/index'
import { configMockPlugin } from './mock'
export default function createVitePlugins(
  viteEnv: Record<string, string>,
  isBuild = false,
) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    AutoImport,
    Components,
    svgBuilder('./src/assets/icons/'),
    configMockPlugin(isBuild),
  ]
  return vitePlugins
}

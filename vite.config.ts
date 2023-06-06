import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import type { UserConfig } from 'vite'
import { svgBuilder } from '/@/components/icon/svg/index'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { AutoImport, Components } from '/@/vite/plugins'
const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}

// https://vitejs.cn/config/
const viteConfig = (): UserConfig => {
  const alias: Record<string, string> = {
    '/@': pathResolve('./src/'),
    assets: pathResolve('./src/assets'),
  }
  return {
    plugins: [
      vue(),
      svgBuilder('./src/assets/icons/'),
      AutoImport,
      Components,
      // AutoImport({
      //   eslintrc: {
      //     enabled: true,
      //     filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      //     globalsPropValue: true,
      //   },
      //   resolvers: [ElementPlusResolver()],
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()],
      // }),
    ],
    resolve: { alias },
  }
}

export default viteConfig

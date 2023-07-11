import { resolve } from 'path'
import type { UserConfig, ConfigEnv } from 'vite'
import path from 'path'
import { loadEnv } from 'vite'
import dayjs from 'dayjs'
import pkg from './package.json'
import createVitePlugins from './vite/plugins'
const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}
const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}
// https://vitejs.cn/config/
const viteConfig = ({ mode, command }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  const alias: Record<string, string> = {
    '~/': `${path.resolve(__dirname, 'src')}/`,
    '/@': pathResolve('./src/'),
  }
  return {
    plugins: createVitePlugins(env, command === 'build'),
    resolve: { alias },
    server: {
      port: 9000,
    },
    build: {
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        // 静态资源分类打包
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    define: {
      // 解决打包报错
      __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
      // 系统信息
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  }
}

export default viteConfig

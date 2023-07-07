import { resolve } from 'path'
import type { UserConfig, ConfigEnv } from 'vite'
import path from 'path'
import { loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'
const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
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
  }
}

export default viteConfig

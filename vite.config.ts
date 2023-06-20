import { resolve } from 'path'
import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import createVitePlugins from '/@/vite/plugins'
const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}

// https://vitejs.cn/config/
const viteConfig = ({ mode, command }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  const alias: Record<string, string> = {
    '/@': pathResolve('./src/'),
  }
  return {
    plugins: createVitePlugins(env, command === 'build'),
    // plugins: createVitePlugins(env, command === 'build'),
    resolve: { alias },
  }
}

export default viteConfig

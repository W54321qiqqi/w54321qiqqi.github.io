import type { App } from 'vue'
import * as elIcons from '@element-plus/icons-vue'
// import baseIcon from '/@/components/base-icon/index.vue'

export function registerIcons(app: App) {
  /*
   * 全局注册 Icon
   * 使用方式: <Icon name="name" size="size" color="color" />
   * 详见<待完善>
   */
  // app.component('Icon', Icon)

  /*
   * 全局注册element Plus的icon
   */
  const icons = elIcons as any
  for (const i in icons) {
    app.component(`el-icon-${icons[i].name}`, icons[i])
  }
}

/**
 * 加载网络css文件
 * @param url css资源url
 */
export function loadCss(url: string): void {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = url
  link.crossOrigin = 'anonymous'
  document.getElementsByTagName('head')[0].appendChild(link)
}

/**
 * 加载网络js文件
 * @param url js资源url
 */
export function loadJs(url: string): void {
  const link = document.createElement('script')
  link.src = url
  document.body.appendChild(link)
}

/**
 * 是否是外部链接
 * @param path
 */
export function isExternal(path: string): boolean {
  return /^(https?|ftp|mailto|tel):/.test(path)
}

/**
 * 排除掉obj里面的key值
 * @param {object} obj
 * @param {Array|string} args
 * @returns {object}
 */
export function omit<T extends Record<string, any>, P extends keyof T>(
  obj: T,
  args: string | string[],
) {
  if (!args) return obj
  const newObj = {} as Omit<T, P>
  const isString = typeof args === 'string'
  const keys = Object.keys(obj).filter((item) => {
    if (isString) {
      return item !== args
    }
    return !(<P[]>args).includes(item as P)
  }) as Exclude<keyof T, P>[]

  keys.forEach((key) => {
    if (obj[key] !== undefined) newObj[key] = obj[key]
  })
  return newObj
}

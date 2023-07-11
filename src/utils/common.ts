import type { App } from 'vue'
import * as elIcons from '@element-plus/icons-vue'
import { isObject } from './is'
export function registerIcons(app: App) {
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

/**
 * 深拷贝
 * @param {*} source
 * @returns {*}
 */
export function deepClone(source: any, hash = new WeakMap()) {
  if (!source && typeof source !== 'object') {
    return source
  }
  if (hash.get(source)) return hash.get(source)
  const targetObj = source.constructor === Array ? [] : {}
  hash.set(source, targetObj)
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      ;(targetObj as any)[keys] = deepClone(source[keys])
    } else {
      ;(targetObj as any)[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 深度合并
 * @param {*} src
 * @param {*} target
 * @returns {*}
 */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(target[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key])
  }
  return src
}
/**
 * 时间问候语
 * @param param 当前时间，new Date() 格式
 * @description param 调用 `formatAxis(new Date())` 输出 `上午好`
 * @returns 返回拼接后的时间字符串
 */
export function formatAxis(param: Date): string {
  const hour: number = new Date(param).getHours()
  if (hour < 6) return '凌晨好'
  else if (hour < 9) return '早上好'
  else if (hour < 12) return '上午好'
  else if (hour < 14) return '中午好'
  else if (hour < 17) return '下午好'
  else if (hour < 19) return '傍晚好'
  else if (hour < 22) return '晚上好'
  else return '夜里好'
}

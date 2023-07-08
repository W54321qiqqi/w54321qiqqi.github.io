import { addClass, removeClass } from '/@/utils/dom'
import { StorageEnum } from '/@/enums/storageEnum'
import { useStorage } from './useStorage'
const { getItem, setItem } = useStorage('local')
const cureentTheme = getItem(StorageEnum.THEME_MODE)
const isDark = ref<boolean>(cureentTheme === 'dark')
const root = document.documentElement
export const useDark = () => {
  const initTheme = (isDark: boolean) => {
    if (!cureentTheme) {
      setItem(StorageEnum.THEME_MODE, 'light')
    } else {
      // 已经有主题 主动添加主题 刷新后不丢失
      addClass(root, isDark ? 'dark' : '')
      setItem(StorageEnum.THEME_MODE, isDark ? 'dark' : 'light')
    }
  }
  initTheme(isDark.value)
  const toggleTheme = (event: MouseEvent) => {
    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )
    const transition = (document as any).startViewTransition(() => {
      if (!unref(isDark)) {
        addClass(root, 'dark')
      } else {
        removeClass(root, 'dark')
      }
      setItem(StorageEnum.THEME_MODE, unref(isDark) ? 'dark' : 'light')
      notifyIsDarkChange(isDark.value)
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]

      document.documentElement.animate(
        {
          clipPath: !unref(isDark) ? clipPath.reverse() : clipPath,
        },
        {
          duration: 200,
          easing: 'ease-in',
          pseudoElement: !unref(isDark)
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
  }
  // 订阅promise内部参数
  const notifyIsDarkChange = (notifyData: boolean) => {
    isDark.value = !notifyData
    setItem(StorageEnum.THEME_MODE, unref(isDark) ? 'dark' : 'light')
  }

  return { isDark, toggleTheme }
}

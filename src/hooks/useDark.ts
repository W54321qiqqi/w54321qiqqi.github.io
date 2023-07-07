import { StorageEnum } from '/@/enums/storageEnum'
import { useStorage } from './useStorage'
import { addClass, removeClass } from '/@/utils/dom'

const { getItem, setItem } = useStorage('local')

const isDark = ref<boolean>(getItem(StorageEnum.THEME_MODE) === 'dark')

export const useDark = () => {
  const htmlEle = document.documentElement
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const toggle = (event: MouseEvent) => {
    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const transition = document.startViewTransition(() => {
      if (!unref(isDark)) {
        addClass(htmlEle, 'dark')
      } else {
        removeClass(htmlEle, 'dark')
      }
      setItem(StorageEnum.THEME_MODE, unref(isDark) ? 'dark' : 'light')
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: unref(isDark) ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 1000,
          easing: 'ease-in',
          pseudoElement: unref(isDark)
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
  }
  return { toggle, isDark }
}

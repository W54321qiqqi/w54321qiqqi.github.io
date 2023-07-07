import { addClass, removeClass } from '/@/utils/dom'
export const useDark = () => {
  const root = document.documentElement
  const isDark = ref()
  const toggleTheme = (event: MouseEvent) => {
    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )

    const isDark = root.classList.contains('dark')

    const transition = (document as any).startViewTransition(() => {
      addClass(root, isDark ? '' : 'dark')
      removeClass(root, isDark ? 'dark' : '')
      notifyIsDarkChange(isDark)
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]

      document.documentElement.animate(
        {
          clipPath: isDark ? clipPath.reverse() : clipPath,
        },
        {
          duration: 200,
          easing: 'ease-in',
          pseudoElement: isDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
  }
  // 订阅promise内部参数
  function notifyIsDarkChange(notifyData: boolean) {
    isDark.value = !notifyData
  }
  return { isDark, toggleTheme }
}

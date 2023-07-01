/* eslint-disable @typescript-eslint/no-inferrable-types */
import { LoadingEnum } from '/@/enums/loadingEnum'
import baseLoading from '/@/components/base-loading/index.vue'

type LoadingType = {
  text?: string
  textColor?: string
  background?: string
  spin?: LoadingEnum
  minTime?: number
  modal?: boolean
}

export function useLoading(config: LoadingType = {}) {
  const loadingConstructor = createApp(baseLoading, { ...config })
  let instance: any = null
  let startTime: number = 0
  let endTime: number = 0
  const minTime = config.minTime || 0

  const open = (target: HTMLElement = document.body) => {
    if (!instance) {
      instance = loadingConstructor.mount(document.createElement('div'))
    }
    if (!instance || !instance.$el) return
    target?.appendChild?.(instance.$el)
    startTime = performance.now()
  }

  const close = () => {
    if (!instance || !instance.$el) return
    endTime = performance.now()
    if (endTime - startTime < minTime) {
      setTimeout(() => {
        instance.$el.parentNode?.removeChild(instance.$el)
      }, Math.floor(minTime - (endTime - startTime)))
    } else {
      instance.$el.parentNode?.removeChild(instance.$el)
    }
  }

  return {
    open,
    close,
  }
}

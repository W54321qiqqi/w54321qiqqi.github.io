import pulseSpin from '/@/components/loading/spin/pulseSpin.vue'
import rectSpin from '/@/components/loading/spin/rectSpin.vue'
import planeSpin from '/@/components/loading/spin/planeSpin.vue'
import cubeSpin from '/@/components/loading/spin/cubeSpin.vue'
import preloaderSpin from '/@/components/loading/spin/preloaderSpin.vue'
import chaseSpin from '/@/components/loading/spin/chaseSpin.vue'
import dotSpin from '/@/components/loading/spin/dotSpin.vue'

export enum LoadingEnum {
  PULSE = 'pulse',
  RECT = 'rect',
  PLANE = 'plane',
  CUBE = 'cube',
  PRELOADER = 'preloader',
  CHASE = 'chase',
  DOT = 'dot',
  LOADING = 'loading',
}

const loadingMap = new Map<LoadingEnum, Component>()

loadingMap.set(LoadingEnum.PULSE, pulseSpin)
loadingMap.set(LoadingEnum.RECT, rectSpin)
loadingMap.set(LoadingEnum.PLANE, planeSpin)
loadingMap.set(LoadingEnum.CUBE, cubeSpin)
loadingMap.set(LoadingEnum.PRELOADER, preloaderSpin)
loadingMap.set(LoadingEnum.CHASE, chaseSpin)
loadingMap.set(LoadingEnum.DOT, dotSpin)

export { loadingMap }

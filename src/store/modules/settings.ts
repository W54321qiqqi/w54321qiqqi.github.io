import { defineStore } from 'pinia'
import type { Mode } from '/@/enums/layoutEnum'
import type { SizeEnum } from '/@/enums/sizeEnum'
import { store } from '../index'
import { deepMerge } from '/@/utils/common'

export interface MenuSetting {
  mode?: Mode
  collapse?: boolean
  sideWidth?: number
  sideCollapsed?: number
}

export interface HeaderConfig {
  pageSize?: `${SizeEnum}`
}

interface AppState {
  menuConfig?: MenuSetting
  headerConfig?: HeaderConfig
}

export const useAppStore = defineStore({
  id: 'app',
  persist: true,
  state: (): AppState => ({
    menuConfig: {
      mode: 'vertical',
      collapse: false,
      sideWidth: 240,
      sideCollapsed: 64,
    },
    headerConfig: {
      pageSize: 'default',
    },
  }),
  getters: {},
  actions: {
    setAppConfig(config: AppState): void {
      this.$state = deepMerge(this.$state, config)
    },
  },
})

// 便于外部使用
export const useAppStoreWithOut = () => {
  return useAppStore(store)
}

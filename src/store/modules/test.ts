import { store } from '../index'
export const useTest = defineStore({
  // 唯一ID
  id: 'test',

  state: () => ({}),
  getters: {},
  actions: {},
})

// 便于外部使用
export const useTestStoreWithOut = () => {
  return useTest(store)
}

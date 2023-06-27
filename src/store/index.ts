import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { usePermissionStoreWithOut } from '/@/store/modules/permission'
import { useUserStoreWithOut } from '/@/store/modules/user'
import { App } from 'vue'
const store = createPinia()

export function setupPinia(app: App<Element>) {
  store.use(piniaPluginPersistedstate)
  app.use(store)
}
export function storeReset() {
  const permissionStore = usePermissionStoreWithOut()
  const userStore = useUserStoreWithOut()
  permissionStore.$reset()
  userStore.$reset()
}
export { store }

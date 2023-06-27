import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { usePermissionStoreWithOut } from '/@/store/modules/permission'
const store = createPinia()

export function setupPinia(app: App<Element>) {
  store.use(piniaPluginPersistedstate)
  app.use(store)
}
export function storeReset() {
  const permissionStore = usePermissionStoreWithOut()
  permissionStore.$reset()
}
export { store }

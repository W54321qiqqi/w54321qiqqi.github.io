import { createApp } from 'vue'
import App from './App.vue'
import { registerIcons } from '/@/utils/common'
import router from '/@/router'
import '/@/styles/index.scss'
import { setupRouterGuard } from '/@/router/guard'
import { setupPinia } from '/@/store'
function start() {
  const app = createApp(App)
  registerIcons(app) // icons
  // 注册pinia
  setupPinia(app)
  // 注册路由守卫
  setupRouterGuard(router)
  app.use(router)
  app.mount('#app')
}
start()

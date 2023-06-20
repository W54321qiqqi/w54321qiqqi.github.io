import { createApp } from 'vue'
import App from './App.vue'
import { registerIcons } from '/@/utils/common'
import router from '/@/router'
import '/@/styles/index.scss'
function start() {
  const app = createApp(App)
  registerIcons(app) // icons
  app.use(router)
  app.use(ElementPlus)
  app.mount('#app')
}
start()

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { registerIcons } from './utils/common'

function start() {
  const app = createApp(App)
  registerIcons(app) // icons
  app.use(ElementPlus)
  app.mount('#app')
}
start()

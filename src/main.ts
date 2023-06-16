import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { registerIcons } from '/@/utils/common'
import router from '/@/router'
import '/@/styles/index.scss'
// 引入样式清除
import 'normalize.css/normalize.css'
function start() {
  const app = createApp(App)
  registerIcons(app) // icons
  app.use(router)
  app.use(ElementPlus)
  app.mount('#app')
}
start()

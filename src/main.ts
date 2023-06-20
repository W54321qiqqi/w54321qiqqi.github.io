import { createApp } from 'vue'
import App from './App.vue'
import { registerIcons } from '/@/utils/common'
import router from '/@/router'
import '/@/styles/index.scss'
import axios from 'axios'
axios.post('/basic-api/login', { username: 'admin', password: '123456' })
function start() {
  const app = createApp(App)
  registerIcons(app) // icons
  app.use(router)
  app.mount('#app')
}
start()

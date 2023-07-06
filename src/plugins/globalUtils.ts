import {
  messageSuccess,
  messageWarning,
  messageInfo,
  messageError,
  messageBox,
} from '/@/utils/message'
import type { App } from 'vue'

export default (app: App<Element>) => {
  app.config.globalProperties.$messageBox = messageBox as any
  app.config.globalProperties.$messageSuccess = messageSuccess
  app.config.globalProperties.$messageWarning = messageWarning
  app.config.globalProperties.$messageInfo = messageInfo
  app.config.globalProperties.$messageError = messageError
}

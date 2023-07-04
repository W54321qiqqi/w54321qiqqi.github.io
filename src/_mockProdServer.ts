import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import log from '../mock/sys/log'
import user from '../mock/sys/user'
const modules: any[] = [...log, ...user]
/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(modules)
}

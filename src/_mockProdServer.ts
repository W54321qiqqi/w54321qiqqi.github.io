import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import log from '../mock/sys/log'
import user from '../mock/sys/user'
import system from '../mock/sys/system'
const modules: any[] = [...log, ...user, ...system]
/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(modules)
}

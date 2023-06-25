import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
const modules = import.meta.glob('./**/*.ts')

const mockModules: any[] = []
Object.keys(modules).forEach(async (key) => {
  if (key.includes('/_')) {
    return
  }
  const module = await modules[key]()
  mockModules.push(module)
})

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules)
}

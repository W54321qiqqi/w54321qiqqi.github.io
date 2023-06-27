import { Router } from 'vue-router'
import { createPermission } from './permission'

export function setupRouterGuard(router: Router) {
  createPermission(router)
}

import { defineStore } from 'pinia'
import { AppRouteType } from '/@/router/types'
import { asyncRoutes } from '/@/router/basic'
import { store } from '../index'
interface PermissionState {
  route: AppRouteType[]
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    route: [],
  }),
  getters: {
    getRoute(): AppRouteType[] {
      return this.route
    },
  },
  actions: {
    setRoute(routeList: AppRouteType[]) {
      this.route = routeList
    },

    async initRoute() {
      const routeList = asyncRoutes
      sortRoute(routeList)
      this.setRoute(routeList)
      return routeList
    },
  },
})

function sortRoute(route: AppRouteType[]) {
  route.sort((a, b) => {
    return a.meta!.sort! - b.meta!.sort!
  })
  route.forEach((item) => {
    if (item.children) {
      sortRoute(item.children)
    }
  })
}
// 便于外部使用
export const usePermissionStoreWithOut = () => {
  return usePermissionStore(store)
}

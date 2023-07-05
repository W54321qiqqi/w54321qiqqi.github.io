import type { AppRouteType } from '/@/router/types'

const comps: AppRouteType[] = [
  {
    path: '/comps',
    name: 'Comps',
    component: () => import('/@/layouts/index.vue'),
    redirect: '/comps/icon',
    meta: {
      title: '组件',
      icon: 'local-comp',
      sort: 4,
      permission: 'admin_components',
    },
    children: [
      {
        path: 'icon',
        name: 'Icon',
        component: () => import('/@/views/comps/icon.vue'),
        meta: {
          title: 'icon',
          sort: 1,
          icon: '',
          permission: 'admin_components_icon',
        },
      },
      {
        path: 'loading',
        name: 'Loading',
        component: () => import('/@/views/comps/loading.vue'),
        meta: {
          title: 'loading',
          sort: 2,
          icon: '',
          permission: 'admin_components_loading',
        },
      },
    ],
  },
]
export default comps

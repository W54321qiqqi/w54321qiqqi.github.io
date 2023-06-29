import type { AppRouteType } from '/@/router/types'

const comps: AppRouteType[] = [
  {
    path: '/components',
    name: 'ComponentsPage',
    component: () => import('/@/layouts/index.vue'),
    redirect: '/components/icon',
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
    ],
  },
]
export default comps

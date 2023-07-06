import type { AppRouteType } from '/@/router/types'

const func: AppRouteType[] = [
  {
    path: '/func',
    name: 'Func',
    component: () => import('/@/layouts/index.vue'),
    redirect: '/func/axios',
    meta: {
      title: '功能',
      icon: 'local-func',
      sort: 6,
      permission: 'admin_func',
    },
    children: [
      {
        path: 'axios',
        name: 'Axios',
        component: () => import('/@/views/func/axios/index.vue'),
        meta: {
          title: 'axios',
          sort: 1,
          permission: 'admin_func_axios',
          icon: '',
        },
      },
    ],
  },
]

export default func

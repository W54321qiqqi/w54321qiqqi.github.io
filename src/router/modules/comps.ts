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
        component: () => import('/@/views/comps/icon/index.vue'),
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
        component: () => import('/@/views/comps/loading/index.vue'),
        meta: {
          title: 'loading',
          sort: 2,
          icon: '',
          permission: 'admin_components_loading',
        },
      },
      {
        path: 'button',
        name: 'Button',
        component: () => import('/@/views/comps/button/index.vue'),
        meta: {
          title: 'button',
          sort: 3,
          icon: '',
          permission: 'admin_components_button',
        },
      },
      {
        path: 'dialog',
        name: 'Dialog',
        component: () => import('/@/views/comps/dialog/index.vue'),
        meta: {
          title: 'dialog',
          sort: 4,
          icon: '',
          permission: 'admin_components_dialog',
        },
      },
      {
        path: 'form',
        name: 'Form',
        component: () => import('/@/views/comps/form/index.vue'),
        meta: {
          title: 'form',
          sort: 5,
          icon: '',
          permission: '',
        },
      },
    ],
  },
]
export default comps

import type { AppRouteType } from '/@/router/types'

const test: AppRouteType[] = [
  {
    path: '/test',
    name: 'Test',
    component: () => import('/@/layouts/index.vue'),
    redirect: '/test/index',
    meta: {
      title: '测试',
      icon: 'local-click',
      sort: 3,
      hideChildren: true,
      permission: 'admin_test',
    },
    children: [
      {
        path: 'index',
        name: 'TestIndex',
        component: () => import('/@/views/test/index.vue'),
        meta: {
          title: '测试',
          sort: 1,
          icon: '',
        },
      },
    ],
  },
]
// <Icon name="" color="#000" size="18px" />
export default test

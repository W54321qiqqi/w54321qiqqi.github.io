import type { AppRouteType } from '/@/router/types'

const dashboard: AppRouteType[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('/@/layouts/index.vue'),
    redirect: '/dashboard/analysis',
    meta: {
      title: '首页',
      icon: 'local-dashboard',
      sort: 1,
      permission: 'admin_dashboard',
    },
    children: [
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('/@/views/dashboard/analysis/index.vue'),
        meta: {
          title: '分析页',
          sort: 1,
          icon: '',
          affix: true,
          permission: 'admin_dashboard_analysis',
        },
      },
      {
        path: 'workbench',
        name: 'Workbench',
        component: () => import('/@/views/dashboard/workbench/index.vue'),
        meta: {
          title: '工作台',
          sort: 2,
          icon: '',
          permission: 'admin_dashboard_workbench',
        },
      },
    ],
  },
]
export default dashboard

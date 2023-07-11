import avatar from '/@/assets/images/avatar.jpg'
import avatar01 from '/@/assets/images/avatar01.jpg'
import avatar02 from '/@/assets/images/avatar02.jpg'

type TodoType = {
  title: string
  value: number
  icon: string
}

type QuickType = {
  title: string
  path: string
  icon: string
}

type DynamicType = {
  time: string
  name: string
  type: 'image' | 'text'
  remark: string
  content: string | string[]
  headImg: string
}

type NoticeType = {
  type: string
  content: string
}

export const todoList: TodoType[] = [
  {
    title: '风险预警',
    value: 5,
    icon: 'local-warning',
  },
  {
    title: '待反馈',
    value: 5,
    icon: 'local-feedback',
  },
  {
    title: '待审批',
    value: 16,
    icon: 'local-approval',
  },
  {
    title: '待阅读',
    value: 14,
    icon: 'local-read',
  },
]

export const quickList: QuickType[] = [
  {
    title: '组件',
    icon: 'local-comp',
    path: '/comps',
  },
  {
    title: '错误日志',
    icon: 'local-log',
    path: '/comps',
  },
  {
    title: '权限控制',
    icon: 'local-permission',
    path: '/comps',
  },
  {
    title: '功能',
    icon: 'local-func',
    path: '/comps',
  },
  {
    title: '角色管理',
    icon: 'local-setting',
    path: '/comps',
  },
  {
    title: '菜单管理',
    icon: 'local-setting',
    path: '/comps',
  },
]

export const dynamicList: DynamicType[] = [
  {
    name: '一个小瘪三',
    type: 'text',
    time: '刚刚',
    remark: '发布了一条动态',
    content: '宝剑锋从磨砺出，梅花香自苦寒来。',
    headImg: avatar01,
  },
  {
    name: '不知名用户',
    type: 'text',
    time: '15分钟前',
    remark: '关注了一个小瘪三',
    content: '',
    headImg: avatar02,
  },
  {
    name: '马保国',
    type: 'image',
    time: '20分钟前',
    remark: '发布了一组照片',
    content: [
      'https://img1.baidu.com/it/u=962503013,598294385&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
      'https://img1.baidu.com/it/u=901475605,1506635237&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
      'https://img2.baidu.com/it/u=4075901265,1581553886&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
    ],
    headImg: avatar02,
  },
  {
    name: '李白',
    type: 'text',
    time: '35分钟前',
    remark: '发布了《清平调·其一》',
    content: `云想衣裳花想容，春风拂槛露华浓。
                  若非群玉山头见，会向瑶台月下逢。`,
    headImg: avatar02,
  },
  {
    name: '王勃',
    type: 'text',
    time: '35分钟前',
    remark: '发布了一条动态',
    content: '落霞与孤鹜齐飞，秋水共长天一色。',
    headImg: avatar01,
  },
  {
    name: 'Admin',
    type: 'text',
    time: '45分钟前',
    remark: '实现了系统基本功能',
    content: '基础功能已经实现，欢迎使用或提bug啊~',
    headImg: avatar,
  },
]

export const noticeList: NoticeType[] = [
  {
    type: '通知',
    content: '系统基础功能开发完成，欢迎使用啊~',
  },
  {
    type: '消息',
    content: '您申请的切换权限已经通过审批，请重新登录查看~',
  },
  {
    type: '通知',
    content: '你们什么身份啊，和我用一样的系统~',
  },
  {
    type: '通知',
    content: '不能喝坐小朋友那桌~',
  },
  {
    type: '消息',
    content: '您有一条OA提交未通过审核，未通过原因：信息不完整。',
  },
  {
    type: '消息',
    content: '【马保国】邀请你加入浑圆形意太极门',
  },
]

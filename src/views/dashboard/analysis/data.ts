type CardDataType = {
  title: string
  extraValue: number | string
  extraTitle: string
  value: number
  icon: string
  prefix: string
  suffix: string
}

export const cardListData: CardDataType[] = [
  {
    title: '今日收益',
    value: 10500,
    extraTitle: '总收益',
    extraValue: 17500,
    prefix: '¥',
    suffix: '',
    icon: 'local-tongji',
  },
  {
    title: '本月任务',
    value: 168,
    extraTitle: '总任务',
    extraValue: 2860,
    prefix: '',
    suffix: '个',
    icon: 'local-renwuchaxun',
  },
  {
    title: '访问量',
    value: 626,
    extraTitle: '总浏览',
    extraValue: 1679,
    prefix: '',
    suffix: '人',
    icon: 'local-shujutongji',
  },
  {
    title: '通过率',
    value: 98,
    extraTitle: '同期对比',
    extraValue: '+3.25%',
    prefix: '',
    suffix: '%',
    icon: 'local-zhangzi',
  },
]

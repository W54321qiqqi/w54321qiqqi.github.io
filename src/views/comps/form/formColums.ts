import { FormColumnType } from '/@/components/base-form/type'
import { FormTypeEnum } from '/@/enums/componentEnum'
import { getAllRoleList } from '/@/api/system/role'
import { StatusData } from './constant'

export const FormColumn: FormColumnType[] = [
  {
    fieldName: 'name',
    fieldDesc: 'input输入',
    fieldType: FormTypeEnum.INPUT,
  },
  {
    fieldName: 'age',
    fieldDesc: 'number输入',
    fieldType: FormTypeEnum.NUMBER,
  },
  {
    fieldName: 'birthday',
    fieldDesc: '日期选择',
    fieldType: FormTypeEnum.DATE,
  },
  {
    fieldName: 'icon',
    fieldDesc: '图标选择',
    fieldType: FormTypeEnum.ICON,
  },
  {
    fieldName: 'status',
    fieldDesc: 'select下拉',
    fieldType: FormTypeEnum.SELECT,
    config: {
      options: StatusData,
    },
  },
  {
    fieldName: 'role',
    fieldDesc: 'ApiSelect',
    fieldType: FormTypeEnum.SELECT,
    config: {
      api: getAllRoleList,
      labelKey: 'roleName',
      valueKey: 'role',
    },
  },

  {
    fieldName: 'slot',
    fieldDesc: '自定义slot',
    fieldType: FormTypeEnum.SLOT,
  },
]

export const FormColumn2: FormColumnType[] = [
  {
    fieldName: 'status',
    fieldDesc: 'select下拉',
    fieldType: FormTypeEnum.SELECT,
    config: {
      options: StatusData,
    },
  },
  {
    fieldName: 'icon',
    fieldDesc: '图标选择',
    fieldType: FormTypeEnum.ICON,
    show: (params: any) => {
      return params.model.status === 1
    },
  },
  {
    fieldName: 'slot',
    fieldDesc: '自定义slot',
    fieldType: FormTypeEnum.SLOT,
    show: (params: any) => {
      return params.model.status === 0
    },
  },
]

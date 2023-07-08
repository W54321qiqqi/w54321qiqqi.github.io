import { FormTypeEnum } from '/@/enums/componentEnum'

export type FormColumnType = {
  fieldName: string
  fieldDesc: string
  fieldType: FormTypeEnum
  active?: boolean
  required?: boolean
  rules?: any
  sort?: number
  config?: any
  colProps?: any
  // eslint-disable-next-line @typescript-eslint/ban-types
  show?: Function | boolean
}

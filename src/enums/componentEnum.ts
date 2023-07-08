import BaseInput from '/@/components/base-input/index.vue'
import BaseSelect from '/@/components/base-select/index.vue'
import BaseInputNumber from '/@/components/base-input-number/index.vue'
import BaseIconSelector from '/@/components/base-icon/icon-selector.vue'
import BaseDatePicker from '/@/components/base-date-picker/index.vue'
import { ElSwitch, ElColorPicker } from 'element-plus'
import type { Component } from 'vue'

/**
 * formType 自定义类型
 */
export enum FormTypeEnum {
  INPUT = 'input',
  NUMBER = 'number',
  DATE = 'date',
  SWITCH = 'switch',
  SELECT = 'select',
  TREE_SELECT = 'tree-select',
  TAG = 'tag',
  SLOT = 'slot',
  OPERATION = 'operation',
  TINYMCE = 'tinymce',
  VDITOR = 'vditor',
  ICON = 'icon',
  COLOR = 'color',
}

const componentMap = new Map<FormTypeEnum, Component>()

componentMap.set(FormTypeEnum.INPUT, BaseInput)
componentMap.set(FormTypeEnum.NUMBER, BaseInputNumber)
componentMap.set(FormTypeEnum.SELECT, BaseSelect)
componentMap.set(FormTypeEnum.SWITCH, ElSwitch)
componentMap.set(FormTypeEnum.ICON, BaseIconSelector)
componentMap.set(FormTypeEnum.DATE, BaseDatePicker)
componentMap.set(FormTypeEnum.COLOR, ElColorPicker)

export { componentMap }

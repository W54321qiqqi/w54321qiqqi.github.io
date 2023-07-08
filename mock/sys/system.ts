import { MockMethod } from 'vite-plugin-mock'
import { roleData } from '../_constant'
import { resultSuccess } from '../_utils'

export default [
  {
    url: '/api/role/getAllRoleList',
    method: 'get',
    response: () => {
      return resultSuccess(roleData)
    },
  },
] as MockMethod[]

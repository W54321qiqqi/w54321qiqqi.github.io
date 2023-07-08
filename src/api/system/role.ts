import request from '/@/utils/request'

export enum Api {
  ROLE_ALL_LIST = '/role/getAllRoleList',
}
export const getAllRoleList = () => request.get(Api.ROLE_ALL_LIST)

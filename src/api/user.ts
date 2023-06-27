import request from '/@/utils/request'

export enum Api {
  LOGIN = '/login',
}

export const login = (data?: any) => request.post(Api.LOGIN, data)

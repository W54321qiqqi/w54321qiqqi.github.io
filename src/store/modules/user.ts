import { defineStore } from 'pinia'
import { store } from '../index'
import { login } from '/@/api/user'

interface UserState {
  token: string
  roleIds: string[]
  userInfo: any
}

interface LoginParams {
  username: string
  password: string
}

export const useUserStore = defineStore({
  id: 'user',
  persist: true,
  state: (): UserState => ({
    token: '',
    roleIds: [],
    userInfo: {},
  }),
  getters: {
    getToken(): string {
      return this.token
    },
    getRoleIds(): string[] {
      return this.roleIds
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setRoleId(ids: string[]) {
      this.roleIds = ids
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
    async login(params: LoginParams) {
      const res = await login(params)
      this.setToken(res.data.token)
    },
  },
})

// 便于外部使用
export const useUserStoreWithOut = () => {
  return useUserStore(store)
}

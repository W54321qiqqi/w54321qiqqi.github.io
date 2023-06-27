import { MockMethod } from 'vite-plugin-mock'
import { userData } from '../_constant'
import { Random } from 'mockjs'
import { resultError, resultSuccess } from '../_util'
export default [
  // mock user login
  {
    url: '/api/login',
    timeout: 200,
    method: 'post',
    response: ({ body }: { body: Record<string, string> }) => {
      const { username, password } = body
      const checkUser = userData.find(
        (item) => item.username === username && password === item.password,
      )
      if (!checkUser) {
        return resultError('Incorrect account or password！')
      }
      const { id, username: _username, desc, role } = checkUser
      const token = Random.string(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-.123456789',
        180,
      )
      return resultSuccess({
        token,
        role,
        id,
        username: _username,
        desc,
      })
    },
  },
] as MockMethod[]

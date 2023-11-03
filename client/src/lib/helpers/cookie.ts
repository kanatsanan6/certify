import Cookies from 'js-cookie'
import { AUTH_COOKIE } from '../constants'

export const setAccessToken = (token: string) => {
  return Cookies.set(AUTH_COOKIE, token)
}

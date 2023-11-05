import axios, {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios'
import envObj from '../env'

type FetchParams = {
  url?: string
  prefix?: string
  path: string
} & Omit<AxiosRequestConfig, 'baseURL'>

const _axios = axios.create()

_axios.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
    } as AxiosRequestHeaders,
  }
})

export const fetch = <T = any>({
  url = envObj.API_URL,
  path,
  ...options
}: FetchParams) => {
  return _axios.request<T>({
    baseURL: url + path,
    ...options,
  })
}

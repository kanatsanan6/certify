import { AxiosError } from 'axios'

declare global {
  type ErrorResponse = AxiosError<{ error: string | string[] }>
}

export {}

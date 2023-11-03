import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

import { fetch } from '@/lib/api'
import { getErrorMsg, setAccessToken } from '@/lib/helpers'
import { SignInResponse } from '../types'

type Payload = {
  email: string
  password: string
}

const signIn = async (payload: Payload): Promise<string> => {
  const response = await fetch<SignInResponse>({
    path: '/auth/sign_in',
    method: 'POST',
    data: { ...payload },
  })

  return response.data.accessToken
}

export const useSignIn = () => {
  return useMutation<string, ErrorResponse, Payload>(signIn, {
    onSuccess: (token) => {
      setAccessToken(token)
      toast.success('Sign in successfully')
    },
    onError: (error) => {
      toast.error(getErrorMsg(error))
    },
  })
}

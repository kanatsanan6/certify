import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

import { fetch } from '@/lib/api'
import { getErrorMsg, setAccessToken } from '@/lib/helpers'
import { SignInFormInput, SignInResponse } from '../types'

const signIn = async (payload: SignInFormInput): Promise<string> => {
  const response = await fetch<SignInResponse>({
    path: '/auth/sign_in',
    method: 'POST',
    data: { ...payload },
  })

  return response.data.accessToken
}

export const useSignIn = () => {
  return useMutation<string, ErrorResponse, SignInFormInput>(signIn, {
    onSuccess: (token) => {
      setAccessToken(token)
      toast.success('Sign in successfully')
    },
    onError: (error) => {
      toast.error(getErrorMsg(error))
    },
  })
}

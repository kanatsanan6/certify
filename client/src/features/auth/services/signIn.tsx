import { fetch } from '@/lib/api'
import { SignInResponse } from '../types'
import { useMutation } from 'react-query'

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
      console.log(token)

      console.log('success')
    },
    onError: (error) => {
      console.log(error)
    },
  })
}

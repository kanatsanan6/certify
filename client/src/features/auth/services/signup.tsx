import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

import { fetch } from '@/lib/api'
import { getErrorMsg } from '@/lib/helpers'
import { SignUpFormInput } from '../types'

const signUp = async (payload: SignUpFormInput) => {
  await fetch<SignUpFormInput>({
    path: '/auth/sign_up',
    method: 'POST',
    data: { ...payload },
  })
}

export const useSignUp = () => {
  return useMutation<void, ErrorResponse, SignUpFormInput>(signUp, {
    onSuccess: () => {
      toast.success('Sign up successfully')
    },
    onError: (error) => {
      toast.error(getErrorMsg(error))
    },
  })
}

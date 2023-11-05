import { useState } from 'react'
import {
  Button,
  FormControl,
  PasswordComplexity,
  PasswordInput,
} from '@/components'
import { useForm } from 'react-hook-form'

import { SignUpFormInput } from '../types'

type Props = {
  onSubmit: (data: SignUpFormInput) => void
  isLoading: boolean
}

export const SignUpForm = (props: Props) => {
  const { onSubmit, isLoading } = props
  const { register, handleSubmit, watch } = useForm<SignUpFormInput>()
  const [focus, setFocus] = useState<boolean>(false)
  const password = watch('password')

  return (
    <form className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
      <FormControl label="Company Name" required>
        <input
          type="text"
          placeholder="Company name"
          className="input input-bordered input-md"
          required
          {...register('companyName')}
        />
      </FormControl>

      <FormControl label="Email" required>
        <input
          type="email"
          placeholder="example@email.com"
          className="input input-bordered input-md"
          required
          {...register('email')}
        />
      </FormControl>

      <FormControl label="Password" required>
        <PasswordComplexity password={password} focus={focus}>
          <PasswordInput
            placeholder="••••••••••"
            required
            onFocus={() => setFocus(true)}
            register={register('password', {
              onBlur: () => setFocus(false),
            })}
          />
        </PasswordComplexity>
      </FormControl>

      <FormControl label="Confirmation Password" required>
        <PasswordInput
          placeholder="••••••••••"
          required
          register={register('passwordConfirmation')}
        />
      </FormControl>

      <FormControl>
        <div className="flex items-center space-x-2  my-3">
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-xs rounded-sm"
          />
          <p className="text-xs">
            Agree to{' '}
            <a
              href="#"
              className="text-right text-xs text-primary font-semibold"
            >
              Terms of Use
            </a>{' '}
            and{' '}
            <a
              href="#"
              className="text-right text-xs text-primary font-semibold"
            >
              Privacy Policy.
            </a>
          </p>
        </div>
      </FormControl>

      <Button type="submit" isLoading={isLoading}>
        Sign Up
      </Button>
    </form>
  )
}

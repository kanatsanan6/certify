import { useForm } from 'react-hook-form'

import { Button, FormControl } from '@/components'

import { SignInFormInput } from '../types'

type Props = {
  onSubmit: (data: SignInFormInput) => void
  isLoading: boolean
}

export const SignInForm = (props: Props) => {
  const { onSubmit, isLoading } = props
  const { register, handleSubmit } = useForm<SignInFormInput>()

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
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
        <input
          type="password"
          placeholder="••••••••••"
          className="input input-bordered input-md"
          required
          {...register('password')}
        />
      </FormControl>

      <FormControl>
        <div className="flex my-1 justify-between items-center w-[100%]">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-xs rounded-sm"
              {...register('rememberMe')}
            />
            <p className="text-xs">Remember me</p>
          </div>

          <a className="text-right text-xs" href="#">
            Forget password?
          </a>
        </div>
      </FormControl>

      <Button type="submit" isLoading={isLoading}>
        Sign In
      </Button>
    </form>
  )
}

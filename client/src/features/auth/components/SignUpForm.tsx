import { FormControl } from '@/components'
import { SignUpFormInput } from '../types'
import { useForm } from 'react-hook-form'

type Props = {
  onSubmit: (data: SignUpFormInput) => void
}

export const SignUpForm = (props: Props) => {
  const { onSubmit } = props
  const { register, handleSubmit } = useForm<SignUpFormInput>()

  return (
    <form className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
      <FormControl label="Company Name" required>
        <input
          type="text"
          placeholder="Enter company name"
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
        <input
          type="password"
          placeholder="••••••••••"
          className="input input-bordered input-md"
          required
          {...register('password')}
        />
      </FormControl>

      <FormControl label="Confirmation Password" required>
        <input
          type="password"
          placeholder="••••••••••"
          className="input input-bordered input-md"
          required
          {...register('password')}
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

      <button className="btn btn-primary w-full text-white" type="submit">
        Sign Up
      </button>
    </form>
  )
}

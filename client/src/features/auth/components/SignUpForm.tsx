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
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
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
          className="input input-bordered input-md mb-3"
          required
          {...register('password')}
        />
      </FormControl>

      <button className="btn btn-primary w-full text-white" type="submit">
        Sign Up
      </button>
    </form>
  )
}

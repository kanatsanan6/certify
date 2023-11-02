import { FormControl } from '@/components'

export const SignInForm = () => {
  return (
    <form className="space-y-2">
      <FormControl label="Email" required>
        <input
          type="email"
          placeholder="example@email.com"
          className="input input-bordered input-md"
          required
        />
      </FormControl>

      <FormControl label="Password" required>
        <input
          type="password"
          placeholder="••••••••••"
          className="input input-bordered input-md"
          required
        />
      </FormControl>

      <FormControl>
        <div className="flex my-1 justify-between items-center w-[100%]">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-xs rounded-sm"
            />
            <p className="text-xs">Remember me</p>
          </div>

          <a className="text-right text-xs" href="#">
            Forget password?
          </a>
        </div>
      </FormControl>

      <button className="btn btn-primary w-full text-white">Login</button>
    </form>
  )
}

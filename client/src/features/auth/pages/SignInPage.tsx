'use client'

import { GithubButton, GoogleButton, SignInForm } from '../components'
import routes from '@/routes'
import { useSignIn } from '../services'

const SignInPage = () => {
  const { mutateAsync: signIn } = useSignIn()

  return (
    <div className="hero min-h-screen bg-white">
      <div className="flex w-full">
        {/* Image section */}
        <div className="flex-1 hidden h-screen lg:flex justify-center items-center p-4 bg-blue-50">
          <img
            src="/images/sign-in-hero.png"
            alt="Sign in hero"
            className="max-w-2xl max-h-full"
          />
        </div>

        {/* Sign-in form section */}
        <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="card flex-shrink-0 w-full max-w-xl">
            <div className="card-body space-y-1">
              <h2 className="text-2xl font-semibold">Sign In</h2>
              <p className=" text-sm">
                New to Certify?{' '}
                <a href={routes.auth.signUp} className="text-primary">
                  Create an account
                </a>
              </p>
              <SignInForm onSubmit={signIn} />
              <div className="divider text-xs text-gray-400 py-3">OR</div>
              <GithubButton />
              <GoogleButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage

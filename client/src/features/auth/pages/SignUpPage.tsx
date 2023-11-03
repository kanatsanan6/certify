'use client'

import routes from '@/routes'
import { GithubButton, GoogleButton, SignUpForm } from '../components'
import { useSignUp } from '../services/signup'

const SignUpPage = () => {
  const { mutateAsync: signUp } = useSignUp()

  return (
    <div className="hero min-h-screen bg-white">
      <div className="flex w-full">
        {/* Image section */}
        <div className="flex-1 hidden h-screen lg:flex justify-center items-center p-4 bg-blue-50">
          <img
            src="/images/sign-up-hero.png"
            alt="Sign up hero"
            className="max-w-2xl max-h-full"
          />
        </div>

        {/* Sign-up form section */}
        <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="card flex-shrink-0 w-full max-w-xl">
            <div className="card-body space-y-1">
              <h2 className="text-2xl font-semibold">Sign Up</h2>
              <p className=" text-sm">
                Already join Certify?{' '}
                <a href={routes.auth.signIn} className="text-primary">
                  Sign in to an account
                </a>
              </p>
              <SignUpForm onSubmit={signUp} />
              <div className="divider text-xs text-gray-400 py-3">OR</div>
              <GithubButton action="signup" />
              <GoogleButton action="signup" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage

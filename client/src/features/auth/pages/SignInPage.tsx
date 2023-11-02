'use client'

import { useState } from 'react'
import { GithubButton, GoogleButton, SignInForm } from '../components'

const SignInPage = () => {
  return (
    <div className="hero min-h-screen bg-white">
      <div className="card flex-shrink-0 w-full max-w-md">
        <div className="card-body space-y-1">
          {/* <h1 className="text-4xl text-center mb-8">Certify</h1> */}
          <h2 className="text-2xl font-semibold">Sign In</h2>
          <p className=" text-sm">
            New to Certify?{' '}
            <a href="#" className="text-primary">
              Create an account
            </a>
          </p>

          <SignInForm />
          <div className="divider text-xs text-gray-400 py-3">OR</div>
          <GithubButton />
          <GoogleButton />
        </div>
      </div>
    </div>
  )
}

export default SignInPage

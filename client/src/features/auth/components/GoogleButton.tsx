type Action = 'signin' | 'signup'

export const GoogleButton = ({ action = 'signin' }: { action?: Action }) => {
  return (
    <button className="btn btn-outline border border-gray-300">
      <img
        src="/images/google.png"
        alt="Github Logo"
        className="w-5 h-5 mr-2"
      />
      {`${action == 'signin' ? 'Sign in' : 'Sign up'} with Google`}
    </button>
  )
}

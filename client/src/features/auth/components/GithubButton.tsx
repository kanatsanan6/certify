import { useState } from 'react'

type Action = 'signin' | 'signup'

export const GithubButton = ({ action = 'signin' }: { action?: Action }) => {
  const [isHovering, setIsHovered] = useState(false)
  const onMouseEnter = () => setIsHovered(true)
  const onMouseLeave = () => setIsHovered(false)

  return (
    <button
      className="btn btn-outline border border-gray-300"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={
          isHovering ? '/images/github-white.png' : '/images/github-dark.png'
        }
        alt="Github Logo"
        className="w-5 h-5 mr-2"
      />
      {`${action == 'signin' ? 'Sign in' : 'Sign up'} with Github`}
    </button>
  )
}

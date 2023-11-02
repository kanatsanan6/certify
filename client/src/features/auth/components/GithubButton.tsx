import { useState } from 'react'

export const GithubButton = () => {
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
      Sign in with Github
    </button>
  )
}

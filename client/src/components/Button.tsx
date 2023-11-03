import React, { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  isDisabled?: boolean
  children: ReactNode
}

export const Button: React.FC<Props> = ({
  isLoading,
  isDisabled,
  children,
  ...rest
}) => (
  <button
    {...rest}
    className={`btn btn-primary w-full text-white cursor-pointer ${
      isDisabled ? 'btn-disabled' : ''
    }`}
    disabled={isDisabled}
  >
    {isLoading ? <span className="loading loading-spinner"></span> : children}
  </button>
)

import { InputHTMLAttributes, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai' // Make sure to import AiOutlineEyeInvisible for the hidden state

type Props = InputHTMLAttributes<HTMLInputElement>

export const PasswordInput = (props: Props) => {
  const { className, ...rest } = props
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const toggleShowPassword = () => setShowPassword(!showPassword)

  props.className

  return (
    <div className="flex">
      <input
        {...rest}
        className={`${className} input input-bordered input-md w-full -mr-7`}
        type={showPassword ? 'text' : 'password'}
      />
      <button
        onClick={toggleShowPassword}
        type="button"
        className="right-0 text-gray-400"
      >
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </button>
    </div>
  )
}

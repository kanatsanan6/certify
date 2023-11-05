import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegisterReturn<any>
}

export const PasswordInput = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const { className, register, ...rest } = props
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const toggleShowPassword = () => setShowPassword(!showPassword)

    return (
      <div className="flex w-full" ref={ref}>
        <input
          {...rest}
          {...register}
          className={`${className} input input-bordered input-md w-full -mr-7`}
          type={showPassword ? 'text' : 'password'}
        />
        <button
          onClick={toggleShowPassword}
          type="button"
          className="right-0 text-gray-400"
          tabIndex={-1}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
    )
  },
)

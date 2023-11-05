import { ReactNode } from 'react'
import { CheckmarkIcon } from 'react-hot-toast'

import { passwordSchema } from './schema'
import { HINTS } from './constants'

type Props = {
  children: ReactNode
  password: string | undefined
  focus?: boolean
}

export const PasswordComplexity = (props: Props) => {
  const { children, password = '', focus } = props
  const validateList = passwordSchema.validate(password, {
    list: true,
  }) as string[]

  return (
    <div
      className={`flex flex-col items-end w-full space-y-2 ${
        focus ? '-mb-[142px]' : ''
      }`}
    >
      {children}
      {focus && (
        <div className="border p-2 rounded-md text-xs space-y-1 z-50 bg-white">
          {Object.keys(HINTS).map((key) => {
            return (
              <PasswordCondition
                key={key}
                condition={HINTS[key][1]}
                success={!validateList.includes(key)}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

const PasswordCondition = ({
  condition,
  success,
}: {
  condition: string
  success: boolean
}) => {
  if (!!!window) return

  return (
    <div className="flex space-x-2 items-center">
      {success ? (
        <CheckmarkIcon />
      ) : (
        <div className="rounded-full border h-[20px] w-[20px] border-gray-300"></div>
      )}
      <p className="text-xs">{condition}</p>
    </div>
  )
}

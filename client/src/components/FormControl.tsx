import { ReactNode } from 'react'

type FormControlProps = {
  children: ReactNode
  errorMsg?: string
  label?: string
  required?: boolean
}

export const FormControl = (props: FormControlProps) => {
  const { children, errorMsg, label, required } = props

  return (
    <div className="form-control">
      {label && (
        <label className="flex label items-baseline justify-between w-full">
          <span className="label-text">
            {label}
            {required && <span className="text-error"> *</span>}
          </span>
          {errorMsg && (
            <p className="text-error text-xs text-right">{errorMsg}</p>
          )}
        </label>
      )}
      {children}
    </div>
  )
}

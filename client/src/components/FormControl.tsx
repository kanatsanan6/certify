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
        <label className="label">
          <span className="label-text">
            {label}
            {required && <span className="text-error"> *</span>}
          </span>
        </label>
      )}
      {children}
      {errorMsg && (
        <p tabIndex={0} className="mt-1 text-error text-sm">
          {errorMsg}
        </p>
      )}
    </div>
  )
}

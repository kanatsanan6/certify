import { passwordValidator } from '@/components/PasswordComplexity/schema'
import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
})

export const passwordConplexity = {
  password: z
    .string()
    .min(1, 'Required')
    .refine(passwordValidator, 'Password is too weak'),
}

export const signUpSchema = z
  .object({
    companyName: z.string().min(1, 'Required'),
    email: z.string().email().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
    passwordConfirmation: z.string().min(1, 'Required'),
  })
  .extend(passwordConplexity)
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'], // set path of error
  })

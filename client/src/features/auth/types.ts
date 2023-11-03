export type SignInResponse = {
  accessToken: string
}

export type SignInFormInput = {
  email: string
  password: string
  rememberMe?: boolean
}

export type SignUpFormInput = {
  email: string
  password: string
  companyName: string
}

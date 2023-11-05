import validator from 'password-validator'

const schema = new validator()

export const passwordSchema = schema
  .is()
  .min(8)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .symbols(1)
  .has()
  .digits(1)

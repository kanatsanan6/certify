export const getErrorMsg = (error: any) => {
  return error.response?.data?.message
}

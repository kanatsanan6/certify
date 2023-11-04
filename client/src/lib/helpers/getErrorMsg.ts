export const getErrorMsg = (error: any) => {
  const errorMsg = error.response?.data?.message

  if (!!!errorMsg) return

  if (errorMsg instanceof Array) {
    return errorMsg[0]
  } else {
    return errorMsg
  }
}

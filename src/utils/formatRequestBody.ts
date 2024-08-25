export const formatRequestBody = (data: any) => {
  if (!data) {
    return null
  }

  return JSON.stringify(data)
}

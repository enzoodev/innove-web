export const formatRequest = (data: any, formData = new FormData()) => {
  if (!data) {
    return null
  }

  formData.append('json', JSON.stringify(data))

  return formData
}

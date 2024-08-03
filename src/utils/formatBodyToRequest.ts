export const formatBodyToRequest = (
  json?: Record<string, unknown>,
  formData = new FormData(),
): FormData | null => {
  if (!json) {
    return null
  }

  formData.append('json', JSON.stringify(json))

  return formData
}

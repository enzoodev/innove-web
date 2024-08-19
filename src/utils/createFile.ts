type CreateFileParams = {
  base64String: string
  fileName: string
  fileType: string
}

export const createFile = async ({
  base64String,
  fileName,
  fileType,
}: CreateFileParams): Promise<File> => {
  const response = await fetch(base64String)
  const blob = await response.blob()
  return new File([blob], fileName, { type: fileType })
}

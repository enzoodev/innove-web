import { PhotoFormatter } from './PhotoFormatter'

type CreateFileParams = {
  base64String: string
  fileName: string
  fileType: string
}

export const createFile = ({
  base64String,
  fileName,
  fileType,
}: CreateFileParams): File => {
  const uri = PhotoFormatter.formatUri({
    filename: fileName,
    extension: fileType,
    file: base64String,
  })

  const arr = uri.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1]

  if (!mime) {
    throw new Error('Invalid file type')
  }

  const bstr = atob(arr[arr.length - 1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], fileName, { type: mime })
}

type CreateFileParams = {
  base64String: string
  fileName: string
  fileType: string
}

export class FileConverter {
  public static readonly base64ToFile = ({
    base64String,
    fileName,
    fileType,
  }: CreateFileParams): File => {
    const uri = this.formatUri({
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

  public static readonly fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1] ?? ''
        const fileType = file.type
        const fileName = file.name
        const uri = `data:${fileType};filename=${fileName};base64,${base64String}`
        resolve(uri)
      }
      reader.onerror = (error) => reject(error)
    })
  }

  public static readonly formatUri = (photo?: TFile) => {
    if (!photo) return ''

    const fileType = photo.extension.toLowerCase()
    return `data:${fileType};filename=${photo.filename};base64,${photo.file}`
  }

  public static readonly extractFileDataFromUri = (uri: string) => {
    const match = uri.match(/^data:(.*?);filename=(.*?);base64,(.*)$/)

    if (!match) {
      throw new Error('Invalid URI format')
    }

    const [, fileType, fileName, base64String] = match
    return { base64String, fileType, fileName }
  }
}

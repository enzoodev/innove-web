export class PhotoFormatter {
  public static readonly formatUri = (photo?: TFile) => {
    if (!photo) return ''

    const fileType = photo.extension.toLowerCase()
    return `data:${fileType};base64,${photo.file}`
  }
}

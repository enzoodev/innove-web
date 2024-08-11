export class RequestFormatter implements IRequestFormatter {
  public format = (data: any, formData = new FormData()) => {
    if (!data) {
      return null
    }

    formData.append('json', JSON.stringify(data))

    return formData
  }
}

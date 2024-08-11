interface IRequestFormatter {
  format(data: any, formData?: FormData): BodyInit | null
}

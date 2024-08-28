export const formatZipCode = (zipCode: string) =>
  zipCode.slice(0, 5) + '-' + zipCode.slice(5)

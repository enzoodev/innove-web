export const generateId = () => {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = charset.length
  for (let i = 0; i < 20; i++) {
    result += charset.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

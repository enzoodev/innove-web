interface IEncryptionService {
  encrypt(data: string, key: string): string
  decrypt(encryptedData: string, key: string): string
}

import CryptoJS from 'crypto-js'

export class EncryptionService {
  public static encrypt(data: string, key: string): string {
    return CryptoJS.AES.encrypt(data, key).toString()
  }

  public static decrypt(encryptedData: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key)
    return bytes.toString(CryptoJS.enc.Utf8)
  }
}

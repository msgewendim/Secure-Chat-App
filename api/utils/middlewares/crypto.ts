import CryptoJS from "crypto-js";

export const encrypt = (text: string, key: string) => {
  const encrypted = CryptoJS.AES.encrypt(text, key);
  return encrypted.toString();
}

export const decrypt = (text: string, key: string) => {  
  const decrypted = CryptoJS.AES.decrypt(text, key); 
  const originalText = decrypted.toString(CryptoJS.enc.Utf8);
  return originalText;
}

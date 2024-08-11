// src/utils/AES.js

import CryptoJS from 'crypto-js';

const k = 'uUXsN6okXYqsh0BB';

export function AES_Encrypt(data) {
  // 定义前端Key秘钥-需要注意 跟后端解密秘钥保持一致
  let key = k;
  key = CryptoJS.enc.Utf8.parse(key);
  let encrypted = CryptoJS.AES.encrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(encrypted.ciphertext.toString()));
}

export function AES_Decrypt(word) {
  let key = k;
  key = CryptoJS.enc.Utf8.parse(key);
  let decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr;
}

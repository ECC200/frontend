import CryptoJS from 'crypto-js';

// eslint-disable-next-line react-refresh/only-export-components
export const encryptPath = (path) => {
    const ciphertext = CryptoJS.AES.encrypt(path, 'secret-key').toString();
    return encodeURIComponent(ciphertext);
};

// eslint-disable-next-line react-refresh/only-export-components
export const decryptPath = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(decodeURIComponent(ciphertext), 'secret-key');
    const originalPath = bytes.toString(CryptoJS.enc.Utf8);
    return originalPath;
};

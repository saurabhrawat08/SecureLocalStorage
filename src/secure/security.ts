import JSEncrypt from 'jsencrypt';

const jsEncrypt = new JSEncrypt();
jsEncrypt.getKey();
const rsaPublicKey = jsEncrypt.getPublicKey();
const rsaPrivateKey = jsEncrypt.getPrivateKey();

const getEncryptData = (data: any, publicKey: string = rsaPublicKey): string | null => {
    if (data === null || data === undefined) {
        return null;
    }
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);

    const encrypted = typeof data === 'object' ? encrypt.encrypt(`obj_${JSON.stringify(data)}`): encrypt.encrypt(String(data));
    return encrypted || null;
};

const getDecryptData = (data: any, privateKey: string = rsaPrivateKey): any => {
    if (data === null || data === undefined) {
        return null;
    }

    const encrypt = new JSEncrypt();
    encrypt.setPrivateKey(privateKey);

    try {
        let decryptedData = encrypt.decrypt(data);
        if (decryptedData && decryptedData.startsWith('obj_')) {
            return JSON.parse(decryptedData.substring(4));
        }
        return decryptedData;
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
};

export { getEncryptData, getDecryptData };

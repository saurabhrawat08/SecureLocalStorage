import { getEncryptData, encryptData, parseAndDecryptData } from './security'; // Adjust the path to your encryption file

export const setEncryptedLocalStorage = async (key: string, value: string | Record<string, string>): Promise<void> => {
    try {
        const encryptedValue = await encryptData(value);
        if (encryptedValue) {
            const encryptedKey = getEncryptData(key);
            if (encryptedKey) {
                localStorage.setItem(encryptedKey, encryptedValue);
            } else {
                console.error('Error encrypting the key');
            }
        } else {
            console.error('Error encrypting the value');
        }
    } catch (error) {
        console.error('Error setting encrypted localStorage:', error);
    }
};


export const getDecryptedLocalStorage = async (key: string): Promise<Record<string, string> | string | null> => {
    try {
        const encryptedKey = getEncryptData(key);
        if (encryptedKey) {
            const encryptedValue = localStorage.getItem(encryptedKey);
            if (encryptedValue) {
                return await parseAndDecryptData(encryptedValue);
            } else {
                console.error('No data found for the given key');
                return null;
            }
        } else {
            console.error('Error encrypting the key');
            return null;
        }
    } catch (error) {
        console.error('Error getting decrypted localStorage:', error);
        return null;
    }
};

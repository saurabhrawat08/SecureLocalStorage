import { getEncryptData, getDecryptData } from '../security';

const setEncryptedSessionStorage = (key: string, value: any): void => {
    try {
        const encryptedValue = getEncryptData(value);
        if (encryptedValue) {
            sessionStorage.setItem(key, encryptedValue);
        } else {
            console.error('Error encrypting the value');
        }
    } catch (error) {
        console.error('Error setting encrypted sessionStorage:', error);
    }
};

const getDecryptedSessionStorage = (key: string): any | null => {
    try {
        const value = sessionStorage.getItem(key);
        if (value) {
            return getDecryptData(value);
        } else {
            console.error('No data found for the given key');
            return null;
        }
    } catch (error) {
        console.error('Error getting decrypted sessionStorage:', error);
        return null;
    }
};

export { setEncryptedSessionStorage, getDecryptedSessionStorage };
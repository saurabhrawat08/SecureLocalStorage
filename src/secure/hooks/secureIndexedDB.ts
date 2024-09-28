import { getEncryptData, getDecryptData } from '../security';

const setEncryptedIndexedDB = (dbName: string, storeName: string, key: string, value: any): Promise<void> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName);
        
        request.onerror = (event) => {
            reject('Error opening IndexedDB');
        };

        request.onsuccess = (event) => {
            const db = request.result;
            const transaction = db.transaction([storeName], 'readwrite');
            const objectStore = transaction.objectStore(storeName);

            try {
                const encryptedValue = getEncryptData(value);
                if (encryptedValue) {
                    const putRequest = objectStore.put(encryptedValue, key);
                    putRequest.onerror = () => {
                        reject('Error storing encrypted data in IndexedDB');
                    };
                    putRequest.onsuccess = () => {
                        resolve();
                    };
                } else {
                    reject('Error encrypting the value');
                }
            } catch (error) {
                reject(`Error setting encrypted IndexedDB: ${error}`);
            }
        };
    });
};

const getDecryptedIndexedDB = (dbName: string, storeName: string, key: string): Promise<any | null> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName);
        
        request.onerror = (event) => {
            reject('Error opening IndexedDB');
        };

        request.onsuccess = (event) => {
            const db = request.result;
            const transaction = db.transaction([storeName], 'readonly');
            const objectStore = transaction.objectStore(storeName);

            const getRequest = objectStore.get(key);

            getRequest.onerror = () => {
                reject('Error retrieving data from IndexedDB');
            };

            getRequest.onsuccess = () => {
                const value = getRequest.result;
                if (value) {
                    try {
                        resolve(getDecryptData(value));
                    } catch (error) {
                        reject(`Error decrypting data from IndexedDB: ${error}`);
                    }
                } else {
                    resolve(null);
                }
            };
        };
    });
};

export { setEncryptedIndexedDB, getDecryptedIndexedDB };
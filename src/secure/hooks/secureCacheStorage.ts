import { getEncryptData, getDecryptData } from '../security';

const setEncryptedCacheStorage = (cacheName: string, key: string, value: any): Promise<void> => {
    return new Promise((resolve, reject) => {
        caches.open(cacheName).then(cache => {
            try {
                const encryptedValue = getEncryptData(value);
                if (encryptedValue) {
                    const request = new Request(key);
                    const response = new Response(encryptedValue);
                    cache.put(request, response)
                        .then(() => resolve())
                        .catch(() => reject('Error storing encrypted data in CacheStorage'));
                } else {
                    reject('Error encrypting the value');
                }
            } catch (error) {
                reject(`Error setting encrypted CacheStorage: ${error}`);
            }
        }).catch(() => {
            reject('Error opening CacheStorage');
        });
    });
};

const getDecryptedCacheStorage = (cacheName: string, key: string): Promise<any | null> => {
    return new Promise((resolve, reject) => {
        caches.open(cacheName).then(cache => {
            cache.match(key).then(response => {
                if (response) {
                    response.text().then(value => {
                        try {
                            resolve(getDecryptData(value));
                        } catch (error) {
                            reject(`Error decrypting data from CacheStorage: ${error}`);
                        }
                    });
                } else {
                    resolve(null);
                }
            }).catch(() => {
                reject('Error retrieving data from CacheStorage');
            });
        }).catch(() => {
            reject('Error opening CacheStorage');
        });
    });
};

export { setEncryptedCacheStorage, getDecryptedCacheStorage };
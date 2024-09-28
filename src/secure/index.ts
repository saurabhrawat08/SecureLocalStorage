import { setEncryptedLocalStorage, getDecryptedLocalStorage } from './hooks/secureLocalstorage';
import { setEncryptedSessionStorage, getDecryptedSessionStorage } from './hooks/secureSessionStorage';
import { setEncryptedIndexedDB, getDecryptedIndexedDB } from './hooks/secureIndexedDB';
import { setEncryptedCacheStorage, getDecryptedCacheStorage } from './hooks/secureCacheStorage';

const secureStorify = {
    localStorage: {
        set: setEncryptedLocalStorage,
        get: getDecryptedLocalStorage
    },
    sessionStorage: {
        set: setEncryptedSessionStorage,
        get: getDecryptedSessionStorage
    },
    indexedDB: {
        set: setEncryptedIndexedDB,
        get: getDecryptedIndexedDB
    },
    cacheStorage: {
        set: setEncryptedCacheStorage,
        get: getDecryptedCacheStorage
    }
};

export { secureStorify };


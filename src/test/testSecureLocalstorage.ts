import { setEncryptedLocalStorage, getDecryptedLocalStorage } from '../secure/hooks/secureLocalstorage';

const saveData = async () => {
    const data = { username: 'Saurabh', token: 'exampleToken' };
    await setEncryptedLocalStorage('authData', data);
};

const loadData = async () => {
    const decryptedData = await getDecryptedLocalStorage('authData');
    console.log('Decrypted Data:', decryptedData);
};

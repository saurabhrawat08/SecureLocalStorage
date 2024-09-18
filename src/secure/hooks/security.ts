import JSEncrypt from 'jsencrypt';

// Public key type
const rsaPublicKey: string = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyf80Hbn+1zWq5VzKynlEQy6EzsrbsEcB3EuppQzpQZGnmonioeTcpwb4A93f8pNADXkX2EA62D4EoqXH5ypmq4QOMj2qJb19MO44Sl3V5akwZH1fL8PCq05jHD34a8bcsxeUyk9WlJNla79cUFOombhdBN18hg/F4iDsJFbRjHIqac4nDAWtxpyBnf2kBEEbwUV4SJ9eOtz/BGGzKnowveLHvYQXsyd1iaeFhfYIITIrSOibvNqEWs/J9Bz+EepJGaneTP7cK1HciitGYjb6pv4ZJvDhK4RARM03AjRtURBRwJHPl4yOuORCQ85G5eH4sgpvty+KGSEKY7HhK0NB3wIDAQAB`;

// Function to encrypt data using RSA
export const getEncryptData = (data: string, publicKey: string = rsaPublicKey): string | false => {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(data);
};

// Function to import encryption key
const importKey = async (): Promise<CryptoKey> => {
    const encodedKey = new TextEncoder().encode('12345678901234567890123456789012');
    return await crypto.subtle.importKey('raw', encodedKey, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
};

// Function to encrypt data using AES
export const encryptData = async (data: string | Record<string, string>): Promise<string | null> => {
    try {
        const encryptionKey = await importKey();
        if (typeof data === 'string') {
            const encodedText = new TextEncoder().encode(data);
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const ciphertextBuffer = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, encryptionKey, encodedText);
            const ciphertextArray = Array.from(new Uint8Array(ciphertextBuffer));
            const ciphertextBase64 = btoa(String.fromCharCode(...ciphertextArray));
            return `${btoa(String.fromCharCode(...iv))}:${ciphertextBase64}`;
        } else {
            const encryptedData: Record<string, string> = {};
            for (const [key, value] of Object.entries(data)) {
                const encodedKey = new TextEncoder().encode(key);
                const ivKey = crypto.getRandomValues(new Uint8Array(12));
                const encryptedKeyBuffer = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: ivKey }, encryptionKey, encodedKey);
                const encryptedKeyBase64 = btoa(String.fromCharCode(...Array.from(new Uint8Array(encryptedKeyBuffer))));

                const encodedValue = new TextEncoder().encode(value);
                const ivValue = crypto.getRandomValues(new Uint8Array(12));
                const encryptedValueBuffer = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: ivValue }, encryptionKey, encodedValue);
                const encryptedValueBase64 = btoa(String.fromCharCode(...Array.from(new Uint8Array(encryptedValueBuffer))));

                encryptedData[`${btoa(String.fromCharCode(...ivKey))}:${encryptedKeyBase64}`] = `${btoa(String.fromCharCode(...ivValue))}:${encryptedValueBase64}`;
            }
            return JSON.stringify(encryptedData);
        }
    } catch (error) {
        console.error('Encryption error:', error);
        return null;
    }
};

// Function to decrypt data
export const decryptData = async (SignInResponse: Record<string, string>): Promise<Record<string, string> | null> => {
    try {
        const encryptionKey = await importKey();
        const decryptedData: Record<string, string> = {};

        for (const [encryptedKey, value] of Object.entries(SignInResponse)) {
            const [ivKeyBase64, encryptedKeyBase64] = encryptedKey.split(':');
            const ivKey = new Uint8Array(Array.from(atob(ivKeyBase64), c => c.charCodeAt(0)));
            const encryptedKeyArray = new Uint8Array(Array.from(atob(encryptedKeyBase64), c => c.charCodeAt(0)));

            const decryptedKeyBuffer = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivKey }, encryptionKey, encryptedKeyArray);
            const decryptedKey = new TextDecoder().decode(decryptedKeyBuffer);

            if (decryptedKey !== 'userStatus') {
                const [ivBase64, ciphertextBase64] = value.split(':');
                const iv = new Uint8Array(Array.from(atob(ivBase64), c => c.charCodeAt(0)));
                const ciphertextArray = new Uint8Array(Array.from(atob(ciphertextBase64), c => c.charCodeAt(0)));
                const decryptedBuffer = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, encryptionKey, ciphertextArray);
                decryptedData[decryptedKey] = new TextDecoder().decode(decryptedBuffer);
            } else {
                decryptedData[decryptedKey] = value;
            }
        }

        return decryptedData;
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
};

export const parseAndDecryptData = async (dataParam: string): Promise<Record<string, string> | null> => {
    try {
        const sanitizedDataParam = dataParam.replace(/\+/g, '%2B');
        const decodedData = decodeURIComponent(sanitizedDataParam.replace(/ /g, '+'));
        const parsedData = JSON.parse(decodedData);
        return await decryptData(parsedData);
    } catch (error) {
        console.error('Failed to parse and decrypt data parameter:', error);
        return null;
    }
};

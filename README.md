# SecureStorify

**SecureStorify** is a library designed to enhance the security of web applications by providing encrypted browser storage functionality. It secures data in localStorage, sessionStorage, IndexedDB, and cache storage using the RSA (Rivest–Shamir–Adleman) encryption algorithm. This allows developers to securely store sensitive data without compromising security, offering peace of mind when handling private or sensitive user information.

With SecureStorify, data stored in the browser's storage systems is encrypted before being saved and automatically decrypted when retrieved. This makes it much harder for attackers to access or tamper with sensitive information stored on the client side.

## Features

- **RSA Encryption**: Asymmetric encryption used to securely exchange keys, adding an extra layer of security for key management.
- **Automatic Encryption & Decryption**: Data is encrypted before being saved to browser storage and decrypted when fetched, ensuring the encryption process is seamless and transparent to the user.
- **Security Focused**: Ensures that even if the browser storage is compromised, the stored data remains unintelligible without the encryption key.
- **Ease of Use**: Developers can use this library with minimal changes to how they currently interact with browser storage.

## How It Works

1. **Storing Data in Browser Storage**:
   - When saving data to storage (localStorage, sessionStorage, IndexedDB, or cache), SecureStorify encrypts the data using the RSA algorithm.
   - The RSA algorithm is used to securely exchange keys, ensuring that the key itself is protected.
   - The encrypted data is then stored in the appropriate browser storage.

2. **Retrieving Data from Browser Storage**:
   - When retrieving data, SecureStorify decrypts the data automatically using the RSA key.
   - The decrypted data is returned in its original form, allowing the application to use it as needed.

## Algorithm Used

- **RSA (Rivest–Shamir–Adleman)**:  
   An asymmetric encryption algorithm used for secure data transmission. In this project, RSA is primarily used to encrypt and securely exchange the keys, ensuring that sensitive data cannot be intercepted.

## Benefits

- **Improved Security**: Browser storage data is inherently insecure because it's stored in plaintext. SecureStorify ensures that even if a malicious actor accesses browser storage, they cannot read or manipulate sensitive data without the correct decryption key.
  
- **Easy Integration**: SecureStorify is designed to function as a drop-in replacement for the standard browser storage API, allowing developers to enhance their web applications' security without rewriting existing code.
  
- **Data Privacy**: Ideal for storing sensitive user data, such as tokens, user preferences, and other personal information, in compliance with privacy regulations and security best practices.

## Installation

To install SecureStorify, run the following command:

```bash
npm install secure-storify
```

### Importing

You can import SecureStorify into your project using the following statement:

```javascript
import { secureStorify } from 'secure-storify';
```

## Supported Storages

### 1. localStorage

Securely store and retrieve data in localStorage:

#### Set Encrypted Data:

```javascript
secureStorify.localStorage.set('YourKey', 'YourValue');
```
#### Set Encrypted Data:

```Get Decrypted Data:
const value = secureStorify.localStorage.get('YourKey');
```

### 2. sessionStorage

Store session-based data in sessionStorage with encryption:

#### Set Encrypted Data:

```javascript
secureStorify.sessionStorage.set('YourKey', 'YourValue');
```
#### Set Encrypted Data:

```Get Decrypted Data:
const value = secureStorify.sessionStorage.get('YourKey');
```

### 3. IndexedDB

Encrypt and store data in IndexedDB:

#### Set Encrypted Data:

```javascript
secureStorify.indexedDB.set('YourDBName', 'YourStoreName', 'YourKey', 'YourValue');
```
#### Set Encrypted Data:

```Get Decrypted Data:
const value = secureStorify.indexedDB.get('YourDBName', 'YourStoreName', 'YourKey');
```

### 4. CacheStorage

Encrypt and cache data in CacheStorage:

#### Set Encrypted Data:

```javascript
secureStorify.cacheStorage.set('YourCacheName', 'YourKey', 'YourValue');
```
#### Set Encrypted Data:

```Get Decrypted Data:
const value = secureStorify.cacheStorage.get('YourCacheName', 'YourKey');
```
### Example Usage
Here’s a simple example demonstrating how to use SecureStorify with different storage systems:

#### localStorage

```javascript
// Set encrypted data in localStorage
secureStorify.localStorage.set('userToken', '123456789');

// Get decrypted data from localStorage
const userToken = secureStorify.localStorage.get('userToken');
console.log(userToken);  // Output: 123456789
```
#### sessionStorage

```javascript
// Set encrypted data in sessionStorage
secureStorify.sessionStorage.set('sessionID', 'abcd-1234');

// Get decrypted data from sessionStorage
const sessionID = secureStorify.sessionStorage.get('sessionID');
console.log(sessionID);  // Output: abcd-1234

```

#### IndexedDB

```javascript
// Set encrypted data in IndexedDB
secureStorify.indexedDB.set('MyDatabase', 'MyStore', 'userID', '987654321');

// Get decrypted data from IndexedDB
const userID = secureStorify.indexedDB.get('MyDatabase', 'MyStore', 'userID');
userID.then(value => console.log(value));  // Output: 987654321

```

#### CacheStorage

```javascript
// Set encrypted data in CacheStorage
secureStorify.cacheStorage.set('MyCache', 'cacheKey', 'cacheValue');

// Get decrypted data from CacheStorage
const cacheValue = secureStorify.cacheStorage.get('MyCache', 'cacheKey');
cacheValue.then(value => console.log(value));  // Output: cacheValue

```
## Conclusion

SecureStorify offers a robust solution for securely managing sensitive data in various browser storage types. By utilizing RSA encryption, it ensures that your data remains protected, even in the event of a security breach. With its seamless integration into existing storage APIs, developers can easily enhance data security without extensive code changes, making it an essential tool for safeguarding user information.

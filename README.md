# SecureLocalStorage
Implemented encryption and decryption for localStorage to secure sensitive data in web applications

# SecureLocalStorage

**SecureLocalStorage** is a library designed to enhance the security of web applications by providing encrypted localStorage functionality using AES (Advanced Encryption Standard) and RSA (Rivest–Shamir–Adleman) encryption algorithms. This allows developers to securely store sensitive data in localStorage without compromising security, offering peace of mind when handling private or sensitive user information.

With SecureLocalStorage, data stored in the browser’s localStorage is encrypted before being saved and automatically decrypted when retrieved. This makes it much harder for attackers to access or tamper with sensitive information stored on the client side.

## Features

- **AES Encryption**: Fast and symmetric encryption used to encrypt localStorage data securely with a shared key.
- **RSA Encryption**: Asymmetric encryption used to securely exchange keys, adding an extra layer of security for key management.
- **Automatic Encryption & Decryption**: Data is encrypted before being saved to localStorage and decrypted when fetched, ensuring the encryption process is seamless and transparent to the user.
- **Security Focused**: Ensures that even if the localStorage is compromised, the stored data remains unintelligible without the encryption key.
- **Ease of Use**: Developers can use this library with minimal changes to how they currently interact with localStorage.

## How It Works

1. **Storing Data in localStorage**:
   - When saving data to localStorage, SecureLocalStorage first encrypts the data using the AES algorithm.
   - The AES encryption key is securely exchanged using the RSA algorithm, ensuring that the key itself is protected.
   - The encrypted data is then stored in localStorage.

2. **Retrieving Data from localStorage**:
   - When retrieving data, SecureLocalStorage decrypts the data automatically using the AES key.
   - The decrypted data is returned in its original form, allowing the application to use it as needed.

## Algorithms Used

- **AES (Advanced Encryption Standard)**:  
   A symmetric key encryption algorithm that is fast and effective for encrypting data. AES is widely used due to its high speed and security in both hardware and software environments.
  
- **RSA (Rivest–Shamir–Adleman)**:  
   An asymmetric encryption algorithm used for secure data transmission. In this project, RSA is primarily used to encrypt and securely exchange the AES key, ensuring that the key itself cannot be intercepted.

## Benefits

- **Improved Security**: LocalStorage data is inherently insecure because it's stored in plaintext. SecureLocalStorage ensures that even if a malicious actor accesses localStorage, they cannot read or manipulate sensitive data without the correct decryption key.
  
- **Easy Integration**: SecureLocalStorage is designed to function as a drop-in replacement for the standard localStorage API, allowing developers to enhance their web applications’ security without rewriting existing code.
  
- **Data Privacy**: Ideal for storing sensitive user data, such as tokens, user preferences, and other personal information, in compliance with privacy regulations and security best practices.

## Usage

1. **Encrypt and Save Data**:
   ```javascript
   SecureLocalStorage.setItem('userToken', 'your-sensitive-token');

## Conclusion
SecureLocalStorage ensures your application can store sensitive data in localStorage without exposing it to potential security threats. By utilizing AES for data encryption and RSA for secure key exchange, this library provides a robust solution for enhancing security in modern web applications. It makes sure that even if localStorage is compromised, the data remains protected and unreadable, significantly improving the overall security of your web application.

# Use of Cryptographic Controls Policy

This policy contains practical guidelines for the use of cryptographic controls. Data encryption is highly recommended by information security standards. Introducing a policy and communicating it within DVELP is one of the best ways to get started for new employees.

## Password generation and storage

Our policy doesn't allow employees to use weak passwords or the same password for all platforms. That's why using 1Password is required and included as one of the first steps in the onboarding programme for new employees.

### 1Password

1Password is a password manager developed by AgileBits Inc. It provides a place for users to store various passwords, software licenses, and other sensitive information in a virtual vault that is locked with a PBKDF2-guarded master password.

1Password integrates with desktop web browsers including Safari, Chrome, Firefox, Edge, and Opera. The extension can remember logins for websites, fill in website logins automatically, and generate random passwords for new websites.

On mobile devices, 1Password offers integrations with browsers and apps on iOS and Android devices using various methods.

## Device encryption and password policies

Just having a strong password is not enough if someone has physically lost a device. Swapping your hard disk into another PC, Mac or linux computer allows for direct data access if the contents are not encrypted. Device encryption is a solution for protecting all of the data and information on a device. It converts all of the data stored on your device into a format that can only be read with the correct credentials.

DVELP requires all employees to have encryption enabled on their laptops, PC and mobile devices. There is a [self-declaration sheet](https://docs.google.com/spreadsheets/d/1DV6c4mM0YExWZbqztMBWbKUqNlQjDYSBWLHTuvpn3ls/edit?ts=5c7d50ef#gid=90742438) for devices people are using for work. It includes a information about the devices' encryption.

## SSH key management

SSH key pairs provide users with the ability to connect safely without having to use the password of the remote account. This is a very useful tool if you want to connect to a remote server or push your code to the remote repository on a regular basis. The process of using this technology is the following: create a pair of keys, one private and one public. The private one stays on the machine you will connect from (usually the machine where it is created). The other key, the public key, is put into the remote end by the owner of that account (which may be you) or by the server administrator. To see more about how to generate SSH keys please [read this](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

## Encrypting sensitive data in DB's

In Order to protect sensitive data like passwords or secret tokens we hash or encrypt them before saving to the database.

### Data hashing

DVELP recommends data hashing in cases where we don't need to be able to later decrypt the value, for example users' passwords. Nobody should know that confidential information, that's why we use OpenBSD bcrypt password hashing algorithm, allowing us to easily store a secure hash of your users' passwords. It means we can compare hashes any time when a user tries to sign in.

### Data encryption

Data encryption is required if we store some sensitive data in the database and we need to use or pass it through an API, e.g. secret tokens, API keys, keyfiles, etc. We recommend to encrypt these kinds of information in the database. If someone tries to read confidential information, it will require the encryption key to decrypt the data. Encryption keys shouldn't be stored in same database.

## TLS certificates for web traffic

Protecting any sensitive information is paramount when using the web. Private information like passwords, credit cards credentials, internet bank logins, etc, shouldn't be passed into the wrong hands. That's why internet security measures like encryption are becoming must-haves, not nice-to-haves. DVELP highly recommends protecting all websites with a self-signed TLS/SSL certificates.

TLS (SSL) is a session layer protocol between the Application and Transport layers in an OSI (Open Systems Interaction) model. SSL (TLS) is a high-level encryption (instead of IPSec), meaning while an outside party may still access your data, it is encrypted and without a key it can’t be decrypted and read.

## Sharing sensitive documentation

Sharing sensitive information or documentation is very commonly done in our daily routine. To avoid capturing any information by 3rd parties we recommend to send sensitive documentation as password-protected zip file. The password should be sent in another channel. For example if the zip file was sent through Slack, the password should be passed through email. In this way all files will be encrypted and not available for reading by 3rd parties.

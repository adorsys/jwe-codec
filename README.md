# jwe-codec


[![NpmLicense](https://img.shields.io/npm/l/@adorsys/jwe-codec.svg)](https://www.npmjs.com/package/@adorsys/jwe-codec)
[![npm](https://img.shields.io/npm/v/@adorsys/jwe-codec.svg)](https://www.npmjs.com/package/@adorsys/jwe-codec)
[![npm](https://img.shields.io/npm/dt/@adorsys/jwe-codec.svg)](https://www.npmjs.com/package/@adorsys/jwe-codec)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://paypal.me/radzom)


<!-- 
[![Travis](https://img.shields.io/travis/adorsys/crypto-codecs.svg)](https://travis-ci.org/adorsys/crypto-codecs)

[![Coveralls](https://img.shields.io/coveralls/adorsys/crypto-codecs.svg)](https://coveralls.io/github/adorsys/crypto-codecs)

[![Dev Dependencies](https://david-dm.org/adorsys/crypto-codecs/dev-status.svg)](https://david-dm.org/adorsys/crypto-codecs?type=dev) 
-->


A library for encrypting/decrypting any JavaScript value as JsonWebEncryption (JWE)

### Features

 - Promise based interface
 - Encrypting/Decrypting anything from (number, string, boolean, array, date, regex, buffer, object)
 - TypeScript support
 - support for symetric JsonWebKeys { kty: 'oct' }
 - supported algorithms 'A256KW', 'A256GCM', 'A256GCMKW'


### Installation

```bash
npm install @adorsys/jwe-codec
```

### Usage


```js
const jwe = require('@adorsys/jwe-codec')

const key = {
  kty: 'oct',
    alg: 'A256GCM',
    use: 'enc',
    k: '123456789abcdefghijklmnopqrstuvwxyz12345678'
}

...
```

#### with async/await

```js
...

;(async () => {
    const codec = await jwe(key)
    const cipher = await codec.encrypt(42)
    // => eyJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiZGlyIiwia2lkIjoialpESEVqN0ZhR3N5OHNUSUZLRWlnejB4TjFEVWlBZWp0S1ZNcEl2Z3dqOCJ9..lipFQHmBiBhsTRqE.4rLjRCOj7JZIKOpToIhOp8cJgvfNWl4Yo__VnkO7yRIYjrCLdGRl5fcR.9S_DwYmkpdLap1yyYYq44A​​​​​
    const answer = await codec.decrypt(cipher) 
    // => 42
})()
``` 

#### with Promises

```js
...

jwe(key).then(codec => {
    codec.encrypt(42).then(cipher => {
        codec.decrypt(cipher).then(answer => {
            console.log(answer) // 42
        })
    })
})
```

## Credits

Made with :heart: by [radzom](https://github.com/radzom) and all these wonderful contributors ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| <img src="https://avatars.githubusercontent.com/u/1225651?v=3" width="100px;"/><br /><sub><b>Francis Pouatcha</b></sub><br />🤔 | | | | | | |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!

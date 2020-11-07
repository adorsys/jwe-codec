# :closed_lock_with_key: jwe-codec :closed_lock_with_key:
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->


[![Travis](https://img.shields.io/travis/adorsys/jwe-codec.svg)](https://travis-ci.org/adorsys/jwe-codec)
[![Coveralls](https://img.shields.io/coveralls/adorsys/jwe-codec.svg)](https://coveralls.io/github/adorsys/jwe-codec)
[![npm](https://img.shields.io/npm/v/@adorsys/jwe-codec.svg)](https://www.npmjs.com/package/@adorsys/jwe-codec)
[![npm](https://img.shields.io/npm/dt/@adorsys/jwe-codec.svg)](https://www.npmjs.com/package/@adorsys/jwe-codec)
[![Conventional Commits](https://img.shields.io/badge/Conventional_Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier#readme)
[![NpmLicense](https://img.shields.io/npm/l/@adorsys/jwe-codec.svg)](https://github.com/adorsys/jwe-codec/blob/master/LICENSE)


<!-- 

[![Dev Dependencies](https://david-dm.org/adorsys/crypto-codecs/dev-status.svg)](https://david-dm.org/adorsys/crypto-codecs?type=dev) 
-->


A library for encrypting/decrypting any JavaScript value as JsonWebEncryption (JWE)

### Features

 - Promise based interface
 - Encrypting/Decrypting anything from (number, string, boolean, array, date, regex, buffer, object)
 - TypeScript support
 - support for symetric JsonWebKeys { kty: 'oct' }
 - supported algorithms 'A256KW', 'A256GCM', 'A256GCMKW', 'A128CBC-HS256'
 - Continous integration with [Travis](https://travis-ci.org/adorsys/jwe-codec)

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

Made with :heart: by [radzom](https://github.com/radzom) and all these wonderful contributors ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/francis-pouatcha"><img src="https://avatars1.githubusercontent.com/u/1225651?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Francis Pouatcha</b></sub></a><br /><a href="#ideas-francis-pouatcha" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/jkroepke"><img src="https://avatars3.githubusercontent.com/u/1560587?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jan-Otto Kröpke</b></sub></a><br /><a href="#maintenance-jkroepke" title="Maintenance">🚧</a> <a href="#infra-jkroepke" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/adorsys/jwe-codec/issues?q=author%3Ajkroepke" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

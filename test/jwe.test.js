const test = require('ava')
const jwe = require('../src')

const validJwks = [
  {
    kty: 'oct',
    use: 'enc',
    alg: 'A256GCM',
    k: '1234567890123456789012345678901234567890123'
  },
  {
    kty: 'oct',
    use: 'enc',
    alg: 'A256GCMKW',
    k: '1234567890123456789012345678901234567890123'
  },
  {
    kty: 'oct',
    use: 'enc',
    alg: 'A256KW',
    k: '1234567890123456789012345678901234567890123'
  },
  {
    kty: 'oct',
    use: 'enc',
    alg: 'A128CBC-HS256',
    k: '1234567890123456789012345678901234567890123'
  }
]

const corruptJwks = [
  {
    kty: 'EC',
    use: 'enc',
    alg: 'A256GCM',
    k: '1234567890123456789012345678901234567890123'
  },
  {
    kty: 'oct',
    use: 'dec',
    alg: 'A256GCM',
    k: '1234567890123456789012345678901234567890123'
  },
  {
    kty: 'oct',
    use: 'enc',
    alg: 'A128KW',
    k: '1234567890123456789012345678901234567890123'
  },
  {
    kty: 'oct',
    use: 'enc',
    alg: 'A256GCM',
    k: '123456789012345678901234567890123456789012'
  },
  {
    kty: 'oct',
    use: 'enc',
    alg: 'A256GCM',
    k: '12345678901234567890123456789012345678901234'
  }
]

const testValues = [
  null,
  42,
  'fortytwo',
  new Date(42),
  /^fortytwo$/,
  Buffer.from('fortytwo'),
  [null, 42, 'fortytwo', new Date(42), /^fortytwo$/, Buffer.from('fortytwo')],
  {
    null: null,
    42: 42,
    fortytwo: 'fortytwo',
    date: new Date(42),
    regex: /^fortytwo/,
    buffer: Buffer.from('fortytwo'),
    array: [
      null,
      42,
      'fortytwo',
      new Date(42),
      /^fortytwo$/,
      Buffer.from('fortytwo')
    ]
  }
]

corruptJwks.forEach((jwk, i) => {
  test.cb(`checks jwk ${JSON.stringify(corruptJwks[i])}`, t => {
    ;(async () => {
      await t.throwsAsync(() => jwe(jwk), 'bad key', 'key is bad')
      t.end()
    })()
  })
})

validJwks.forEach((jwk, i) => {
  testValues.forEach((tv, i) => {
    test.cb(
      `encrypt/decrypt with ${jwk.alg} ${JSON.stringify(testValues[i])}`,
      t => {
        ;(async () => {
          const codec = await jwe(jwk)
          const cipher = await codec.encrypt(tv)
          t.is(typeof cipher, 'string', 'encrypt gives string')
          const parts = cipher.split('.')
          t.is(parts.length, 5, 'with 5 parts')
          parts.forEach(part => {
            t.regex(part, /^[A-Za-z0-9_-]*$/, 'of Base64 encoded values')
          })
          const value = await codec.decrypt(cipher)
          t.deepEqual(value, tv, 'decrypt gives correct value')
          t.end()
        })()
      }
    )
  })
})

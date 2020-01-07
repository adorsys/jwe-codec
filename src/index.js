const jose = require('node-jose')
const hydra = require('hydration')

function isKey (jwk) {
  return (
    ['oct'].includes(jwk.kty) &&
    ['A256KW', 'A256GCMKW', 'A256GCM', 'A128CBC-HS256', undefined].includes(jwk.alg) &&
    ['enc', undefined].includes(jwk.use) &&
    jwk.k.match(/^[A-Za-z0-9_-]{43}$/)
  )
}

async function jwe (jwk) {
  if (!isKey(jwk)) {
    throw new Error('bad key')
  }
  const key = await jose.JWK.asKey(jwk)

  async function encrypt (value) {
    const dehydratedData = hydra.dehydrate({ value })
    const cipher = await jose.JWE.createEncrypt({ format: 'compact' }, key).final(
      JSON.stringify(dehydratedData),
      'utf8'
    )
    return cipher
  }

  async function decrypt (cipher) {
    const { value } = await jose.JWE.createDecrypt(key.keystore)
      .decrypt(cipher)
      .then(res => res.payload.toString())
      .then(payload => hydra.hydrate(JSON.parse(payload)))
    return value
  }

  return {
    encrypt,
    decrypt
  }
}

jwe.default = jwe
module.exports = jwe

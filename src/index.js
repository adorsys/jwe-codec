const { importJWK, compactDecrypt, CompactEncrypt } = require('jose')
const hydra = require('hydration')

const encoder = new TextEncoder()

async function jwe (jwk) {
  const secretKey = await importJWK(jwk, jwk.alg, true)

  async function encrypt (value) {
    const dehydratedData = hydra.dehydrate({ value })
    const payload = JSON.stringify(dehydratedData)

    return await new CompactEncrypt(encoder.encode(payload))
      .setProtectedHeader({ alg: 'dir', enc: jwk.alg })
      .encrypt(secretKey)
  }

  async function decrypt (cipher) {
    const { plaintext } = await compactDecrypt(cipher, secretKey)
    const payload = new TextDecoder().decode(plaintext)

    const { value } = hydra.hydrate(JSON.parse(payload))
    return value
  }

  return {
    encrypt,
    decrypt
  }
}

jwe.default = jwe
module.exports = jwe

export interface JWK {
  kty: 'oct',
  kid?: string,
  alg?: 'A256KW' | 'A256GCM' | 'A256GCMKW' | 'A128CBC-HS256',
  use?: 'enc',
  k: string
}

export interface Codec {
  encrypt(value: any): Promise<string>,
  decrypt(cipher: string): Promise<any>
}

export default function jwe(key: JWK): Promise<Codec>

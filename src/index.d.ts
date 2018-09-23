interface JWK {
  kty: 'oct',
  kid?: string,
  alg?: 'A256KW' | 'A256GCM' | 'A256GCMKW',
  use?: 'enc',
  k: string
}

interface Codec {
  encrypt(value: any): Promise<string>,
  decrypt(cipher: string): Promise<any>
}

export default function jwe(key: JWK): Promise<Codec>

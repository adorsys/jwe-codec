interface JWK {
  kty: 'oct',
  kid?: string,
  alg?: 'A256KW' | 'A256GCM' | 'A256GCMKW',
  use?: 'enc',
  k: string
}

interface Codec {
  encrypt: (any) => Promise<string>,
  decrypt: (string) => Promise<any>
}

export declare const jwe: () => Promise<Codec>

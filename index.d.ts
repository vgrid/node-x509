export {};

declare module '@vgrid/x509' {
  export type CertificateAltNames = string[];

  export interface CertificateIssuer {
    countryName: string;
    stateOrProvinceName: string;
    localityName: string;
    organizationName: string;
    commonName: string;
    [key: string]: any;
  }

  export interface CertificateSubject {
    countryName: string;
    emailAddress?: string;
    postalCode: string;
    stateOrProvinceName: string;
    localityName: string;
    streetAddress: string;
    organizationName: string;
    organizationalUnitName: string;
    commonName: string;
    [key: string]: string | undefined;
  }

  export interface CertificateResult {
    issuer: CertificateIssuer;
    notAfter: string; // ISO Date String
    notBefore: string; // ISO Date String
    serial: string;
    subject: CertificateSubject;
    subjectHash: string;
    signatureAlgorithm: string;
    fingerPrint: string;
    publicKey: { algorithm: string; [key: string]: any };
    altNames: CertificateAltNames;
    extensions?: {
      keyUsage?: string;
      extendedKeyUsage?: string;
      basicConstraints?: string;
      subjectKeyIdentifier?: string;
      authorityKeyIdentifier?: string;
      subjectAlternativeName?: string;
      [key: string]: any;
    };
    version: number;
  }

  type VerifyCallback = (err: Error | null, result: boolean) => void;

  export const getAltNames: (fileOrPath: string) => CertificateAltNames;
  export const getIssuer: (fileOrPath: string) => CertificateIssuer;
  export const getSubject: (fileOrPath: string) => CertificateSubject;
  export const parseCert: (fileOrPath: string) => CertificateResult;
  export const verify: (cert: path, caBundle: path, callback: VerifyCallback) => void;
}

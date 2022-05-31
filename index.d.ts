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
    postalCode: string;
    stateOrProvinceName: string;
    localityName: string;
    streetAddress: string;
    organizationName: string;
    organizationalUnitName: string;
    commonName: string;
    [key: string]: any;
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

  export const getAltNames: (file: string) => CertificateAltNames;
  export const getIssuer: (file: string) => CertificateIssuer;
  export const getSubject: (file: string) => CertificateSubject;
  export const parseCert: (file: string) => CertificateResult;
}

export type KeystoreInfo = {
  file: File;
  pubkey: string;
};

export interface ApiParams {
  baseUrl: string;
  apiPath: string;
  authToken?: string;
  host?: string;
  certFilePath?: string;
}

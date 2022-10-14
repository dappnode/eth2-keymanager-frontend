export interface ApiParams {
  baseUrl: string;
  apiPath: string;
  consensusClient?: string;
  authToken?: string;
  host?: string;
  certFilePath?: string;
}

export enum AllowedRequestTypes {
  GET,
  POST,
}

export interface FeeRecipientPubkeyItem {
  network: string;
  consensusClient: string;
  feeRecipients: FeeRecipientPubkey[];
}

export interface FeeRecipientPubkey {
  pubkey: string;
  feeRecipient: string;
}

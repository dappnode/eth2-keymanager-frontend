export enum ImportStatus {
  Imported = "Imported",
  NotImported = "Not imported",
  Importing = "Importing...",
}

export enum BeaconchaUrlBuildingStatus {
  NotStarted,
  Success,
  Error,
  InProgress,
  NoIndexes,
}

export type Web3SignerStatus = "UP" | "DOWN" | "UNKNOWN" | "LOADING" | "ERROR";

export type KeystoreInfo = {
  file: File;
  pubkey: string;
};

export interface ApiParams {
  baseUrl: string;
  apiPath?: string;
  authToken?: string;
  host?: string;
}

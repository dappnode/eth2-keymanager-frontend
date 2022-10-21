export enum ImportStatus {
  IMPORTED = "Imported",
  NOT_IMPORTED = "Not imported",
  IMPORTING = "Importing...",
}

export enum BeaconchaUrlBuildingStatus {
  NOT_STARTED,
  SUCCESS,
  ERROR,
  IN_PROGRESS,
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

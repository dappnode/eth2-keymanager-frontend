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

export enum SignerStatus {
  UP = "UP",
  DOWN = "DOWN",
  LOADING = "LOADING",
  UNKNOWN = "UNKNOWN",
}

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

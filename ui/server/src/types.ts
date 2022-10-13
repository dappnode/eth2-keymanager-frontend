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

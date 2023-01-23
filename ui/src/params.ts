import { ApiParams } from "./types";

export const burnAddress = "0x0000000000000000000000000000000000000000";

export const beaconchaApiParamsMap = new Map<string, ApiParams>([
  ["mainnet", { baseUrl: "https://beaconcha.in", apiPath: "/api/v1/" }],
  ["prater", { baseUrl: "https://prater.beaconcha.in", apiPath: "/api/v1/" }],
  [
    "gnosis",
    { baseUrl: "https://beacon.gnosischain.com", apiPath: "/api/v1/" },
  ],
]);

export const availableNetworks = ["mainnet", "prater", "gnosis"]; //TODO chiado?
export const maxValidatorsPerRequest = 100; //For beaconcha.in --> TODO: is it the same for Gnosis?

export const validatorApiProxyUrl = "http://localhost:3001";

export const defaultNetwork = "prater";

export const defaultConsensusClient = "prysm";

export const validatorProxyApiParams = {
  baseUrl: "http://localhost:3001", //TODO: Have URL for validator proxy?
  apiPath: "/",
  //authToken:, TODO: add auth token to proxy?
};

export interface AppParams {
  network: string;
  signerUrl: string;
  signerAuthToken?: string;
  consensusClient?: string;
  executionClient?: string;
}
